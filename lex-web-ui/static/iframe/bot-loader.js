/*
 Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */
'use strict';

/**
 * Sample JavaScript code to dynamically add bot iframe, AWS SDK,
 * load credentials and add related event handlers
 *
 * It uses a Cognito identity pool to illustrate passing credentials to the
 * chat bot
 */
(function (document, window) {
  var OPTIONS = {
    // div container class to insert iframe
    containerClass: 'lex-chat',

    // iframe source uri. use embed=true query string when loading as iframe
    iframeSrcPath: '/index.html#/?embed=true',

    // AWS SDK script dynamically added to the DOM
    // https://github.com/aws/aws-sdk-js
    sdkUrl: 'https://sdk.amazonaws.com/js/aws-sdk-2.82.0.min.js',

    // URL to download build time config JSON file
    configUrl: '/static/iframe/config.json',
  };

  /*
  The config field is initialized from the contents of OPTIONS.configUrl.
  At minimum, it should contain the following keys (see the README for details):
    # origin contains proto://host:port
    # port needed if not default 80 for htt or 443 for https
    iframeOrigin

    # AWS config
    aws:
      # AWS Region
      region:

      # Cognito Pool Id
      cognitoPoolId:
  */

  var botLoader = {
    config: {},
    iframeElement: null,
    containerElement: null,
    credentials: null,
    iframeMessageHandler: null,
  };

  if (isSupported()) {
    // initialize iframe once the DOM is loaded
    document.addEventListener('DOMContentLoaded', init, false);
  } else {
    console.warn('chat bot not loaded - unsupported browser');
  }

  /**
   * Check if modern browser features used by chat bot are supported
   */
  function isSupported() {
    var features = [
      'Audio',
      'Blob',
      'MessageChannel',
      'Promise',
      'URL',
      'localStorage',
      'postMessage',
    ];
    return features.every(function(feature) {
      return feature in window;
    });
  }

  /**
   * Initializes the chatbot ui
   */
  function init() {
    Promise.resolve()
    .then(function initConfig() {
      return loadConfigFromJsonFile(OPTIONS.configUrl)
        .then(function initConfigFromEvent(config) {
           return loadConfigFromEvent(config);
        })
        .then(function assignConfig(config) {
          if (!validateConfig(config)) {
            return Promise.reject('config object is missing required fields');
          }
          botLoader.config = config;
          return config;
        });
    })
    .then(function initContainer() {
      return addContainer(OPTIONS.containerClass)
        .then(function assignContainer(containerElement) {
          botLoader.containerElement = containerElement;
          return containerElement;
        });
    })
    .then(function initSdk() {
      return addAwsSdk(
        botLoader.containerElement, OPTIONS.containerClass, OPTIONS.sdkUrl
      );
    })
    .then(function initCredentials() {
      return createCredentials(
        botLoader.config.aws.region || 'us-east-1',
        botLoader.config.aws.cognitoPoolId
      )
        .then(function assignCredentials(credentials) {
          botLoader.credentials = credentials;
        });
    })
    .then(function initIframeMessageHandler() {
      botLoader.iframeMessageHandler = createIframeMessageHandlers();
      window.addEventListener('message', onMessageFromIframe, false)
      return botLoader.iframeMessageHandler;
    })
    .then(function initIframe() {
      if (!botLoader.config.iframeOrigin || !botLoader.containerElement) {
        return Promise.reject('missing fields when initializing iframe');
      }
      return addIframe(
        botLoader.config.iframeOrigin,
        botLoader.containerElement,
        OPTIONS.containerClass,
        OPTIONS.iframeSrcPath
      )
        .then(function assignIframe(iframeElement) {
          botLoader.iframeElement = iframeElement;
        })
        .then(function minimizeUi() {
          return (botLoader.config.loadIframeMinimized) ?
            sendMessageToIframe({ event: 'toggleExpandUi' }) :
            Promise.resolve();
        })
        .then(function showUi() {
          toggleShowUi(botLoader.containerElement, OPTIONS.containerClass);
        });
    })
    .then(function sendParentReadyEvent() {
      return sendMessageToIframe({ event: 'parentReady' });
    })
    .catch(function initError(error) {
      console.error('could not initialize chat bot -', error);
    });
  }

  /**
   * Loads the bot config from a JSON file URL
   */
  function loadConfigFromJsonFile(url) {
    return new Promise(function loadConfigFromJsonFilePromise(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'json';
      xhr.onerror = function configOnError() {
        reject('error getting chat bot config from url: ' + url);
      };
      xhr.onload = function configOnLoad() {
        if (xhr.status == 200) {
          if (xhr.response) {
            resolve(xhr.response);
          } else {
            reject('invalid chat bot config object');
          }
        } else {
          reject('failed to get chat bot config with status: ' + xhr.status);
        }
      };
      xhr.send();
    });
  };

  /**
   * Loads dynamic bot config from an event
   * Merges it with the config passed as parameter
   */
  function loadConfigFromEvent(conf) {
    return new Promise(function waitForConfigEvent(resolve, reject) {
      var timeoutInMs = conf.configEventTimeOutInMs || 10000;

      var timeoutId = setTimeout(onConfigEventTimeout, timeoutInMs);
      document.addEventListener('loadlexconfig', onConfigEventLoaded, false);

      var intervalId = setInterval(emitReceiveEvent, 500);
      // signal that we are ready to receive the dynamic config
      function emitReceiveEvent() {
        var event = new Event('receivelexconfig');
        document.dispatchEvent(event);
      };

      function onConfigEventLoaded(evt) {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
        document.removeEventListener('loadlexconfig', onConfigEventLoaded, false);

        if (evt && ('detail' in evt) && evt.detail && ('config' in evt.detail)) {
          var evtConfig = evt.detail.config;
          var mergedConfig = mergeConfig(conf, evtConfig);
          return resolve(mergedConfig);
        } else {
          return reject('malformed config event: ' + JSON.stringify(evt));
        }
      };

      function onConfigEventTimeout() {
        clearInterval(intervalId);
        document.removeEventListener('loadlexconfig', onConfigEventLoaded, false);
        return reject('config event timed out');
      };
    });

  }

  /**
   * Merges config objects. The initial set of keys to merge are driven by
   * the baseConfig. The srcConfig values override the baseConfig ones.
   */
  function mergeConfig(baseConfig, srcConfig) {
    // use the baseConfig first level keys as the base for merging
    return Object.keys(baseConfig)
      .map(function (key) {
        var mergedConfig = {};
        var value = baseConfig[key];
        if (key in srcConfig) {
          value = (typeof baseConfig[key] === 'object') ?
            // recursively merge sub-objects in both directions
            Object.assign(
              mergeConfig(srcConfig[key], baseConfig[key]),
              mergeConfig(baseConfig[key], srcConfig[key]),
            ) :
            srcConfig[key];
        }
        mergedConfig[key] = value;
        return mergedConfig;
      })
      .reduce(function (merged, configItem) {
          return Object.assign({}, merged, configItem);
        },
        {}
      );
  };

  /**
   * Validate that the config has the expected structure
   */
  function validateConfig(config) {
    return (
      ('iframeOrigin' in config && config.iframeOrigin) &&
      ('aws' in config && config.aws) &&
      ('cognitoPoolId' in config.aws && config.aws.cognitoPoolId)
    );
  }

  /**
   * Adds a div container to document body which will hold the chat bot iframe
   * and AWS SDK script
   */
  function addContainer(containerClass) {
    if (!containerClass) {
      return Promise.reject('invalid chat bot container class: ' + containerClass);
    }
    var divElement = document.querySelector('.' + containerClass);
    if (divElement) {
      return Promise.resolve(divElement);
    }
    divElement = document.createElement('div');
    divElement.classList.add(containerClass);
    document.body.appendChild(divElement);

    return Promise.resolve(divElement);
  }

  /**
   * Adds a script tag to dynamically load the AWS SDK under the application
   * div container. Avoids loading the SDK if the AWS SDK seems to be loaded
   * or the tag exists
   */
  function addAwsSdk(divElement, containerClass, sdkUrl) {
    return new Promise(function addAwsSdkPromise(resolve, reject) {
      if (!divElement || !divElement.appendChild) {
        reject('invalid node element in add sdk');
      }
      var sdkScriptElement =
        document.querySelector('.' + containerClass + ' script');
      if (sdkScriptElement || 'AWS' in window) {
        resolve(sdkScriptElement);
      }

      sdkScriptElement = document.createElement('script');
      sdkScriptElement.setAttribute('type', 'text/javascript');

      sdkScriptElement.onerror = function  sdkOnError() {
        reject('failed to load AWS SDK link:' + sdkUrl);
      };
      sdkScriptElement.onload = function  sdkOnLoad() {
        resolve(sdkScriptElement);
      };

      sdkScriptElement.setAttribute('src', sdkUrl);

      divElement.appendChild(sdkScriptElement);
    });
  }

  /**
   * Initializes credentials
   */
  function createCredentials(region, cognitoPoolId) {
    if (!('AWS' in window) ||
      !('CognitoIdentityCredentials' in window.AWS)
    ) {
      return Promise.reject('unable to find AWS SDK object');
    }

    var credentials = new AWS.CognitoIdentityCredentials(
      { IdentityPoolId: cognitoPoolId },
      { region: region },
    );

    return credentials.getPromise()
      .then(function () {
        return credentials;
      });
  }

  /**
   * Get Cognito credentials - cognito
   */
  function getCredentials() {
    var identityId = localStorage.getItem('cognitoid');

    if (identityId != null){
      console.log('[INFO] found existing identity ID: ', identityId);
    }

    if (!botLoader.credentials || !('getPromise' in botLoader.credentials)) {
      console.error('getPromise not found in credentials');
      return Promise.reject('getPromise not found in credentials');
    }

    return botLoader.credentials.getPromise()
      .then(function storeIdentityId() {
        console.log('[INFO] storing identity ID:',
          botLoader.credentials.identityId
        );
        localStorage.setItem('cognitoid', botLoader.credentials.identityId);
        identityId = localStorage.getItem('cognitoid');
      })
      .then(function getCredentialsPromise() {
        return botLoader.credentials;
      });
  }

  /**
   * Adds chat bot iframe under the application div container
   */
  function addIframe(origin, divElement, containerClass, iframeSrcPath) {
    var iframeElement =
      document.querySelector('.' + containerClass + ' iframe');
    if (iframeElement) {
      return Promise.resolve(iframeElement);
    }
    if (!('appendChild' in divElement)) {
      reject('invalid node element to append iframe');
    }

    iframeElement = document.createElement('iframe');
    iframeElement.setAttribute('src', origin + iframeSrcPath);
    iframeElement.setAttribute('frameBorder', '0');
    iframeElement.setAttribute('scrolling', 'no');

    divElement.appendChild(iframeElement);

    return new Promise(function loadIframePromise(resolve, reject) {
      var timeoutInMs = 20000; // bail out on loading after this timeout
      var timeoutId = setTimeout(onIframeTimeout, timeoutInMs);
      iframeElement.addEventListener('load', onIframeLoaded, false);

      function onIframeLoaded(evt) {
        clearTimeout(timeoutId);
        iframeElement.removeEventListener('load', onIframeLoaded, false);

        return resolve(iframeElement);
      };

      function onIframeTimeout() {
        iframeElement.removeEventListener('load', onIframeLoaded, false);
        return reject('iframe load timeout');
      };
    });
  }

  /**
   * Toggle between showing/hiding chatbot ui
   */
  function toggleShowUi(containerElement, containerClass) {
    containerElement.classList.toggle(
      containerClass + '--show'
    );
  }

  /**
   * Toggle between miminizing and expanding the chatbot ui
   */
  function toggleMinimizeUi(containerElement, containerClass) {
    containerElement.classList.toggle(
      containerClass + '--minimize'
    );
  }

  /**
   * Send a message to the iframe using postMessage
   */
  function sendMessageToIframe(message) {
    if (!botLoader.iframeElement ||
      !('contentWindow' in botLoader.iframeElement) ||
      !('postMessage' in botLoader.iframeElement.contentWindow)
    ) {
      return Promise.reject('invalid iframe element');
    }

    return new Promise(function sendMessageToIframePromise(resolve, reject) {
      var messageChannel = new MessageChannel();
      messageChannel.port1.onmessage =
        function sendMessageToIframeResolver(evt) {
          messageChannel.port1.close();
          messageChannel.port2.close();
          if (evt.data.event === 'resolve') {
            resolve(evt.data);
          } else {
            reject('iframe failed to handle message');
          }
        };
      botLoader.iframeElement.contentWindow.postMessage(message,
        botLoader.config.iframeOrigin, [messageChannel.port2]);
    });
  }

  /**
   * Message handler - receives postMessage events from iframe
   */
  function onMessageFromIframe(evt) {
    var messageHandler = botLoader.iframeMessageHandler;
    // security check
    if (evt.origin !== botLoader.config.iframeOrigin) {
      console.warn('postMessage from invalid origin', evt.origin);
      return;
    }
    if (!evt.ports) {
      console.error('postMessage not sent over MessageChannel', evt);
      return;
    }

    switch (evt.data.event) {
      case 'getCredentials':
        messageHandler.onGetCredentials(evt);
        break;
      case 'initIframeConfig':
        messageHandler.onInitIframeConfig(evt);
        break;
      case 'toggleExpandUi':
        messageHandler.onToggleExpandUi(evt);
        break;
      case 'updateLexState':
        messageHandler.onUpdateLexState(evt);
        break;
      default:
        console.error('unknown message in event', evt);
        break;
    }
  }

  /**
   * Creates an object containing the message handler functions
   * used by onMessageFromIframe
   */
  function createIframeMessageHandlers() {
    return {
      onGetCredentials: function onGetCredentials(evt) {
        return getCredentials()
          .then(function resolveGetCredentials(creds) {
            evt.ports[0].postMessage({
              event: 'resolve',
              type: evt.data.event,
              data: creds,
            });
          })
          .catch(function onGetCredentialsError(error) {
            console.error('failed to get credentials', error);
            evt.ports[0].postMessage({
              event: 'reject',
              type: evt.data.event,
              error: 'failed to get credentials',
            });
          });
      },
      onInitIframeConfig: function onInitIframeConfig(evt) {
        var iframeConfig = botLoader.config.iframeConfig;
        try {
          iframeConfig.cognito = {
            poolId: botLoader.config.aws.cognitoPoolId,
          };
          iframeConfig.region = botLoader.config.aws.region;
          // place dynamic initialization logic in here
        } catch (e) {
          evt.ports[0].postMessage({
            event: 'reject',
            type: evt.data.event,
            error: 'failed to obtain a valid iframe config',
          });
          console.error('failed to assign iframe config', e);
          return;
        }
        evt.ports[0].postMessage({
          event: 'resolve',
          type: evt.data.event,
          data: iframeConfig,
        });
      },
      onToggleExpandUi: function onToggleExpandUi(evt) {
        toggleMinimizeUi(botLoader.containerElement, OPTIONS.containerClass);
        evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });
      },
      onUpdateLexState: function onUpdateLexState(evt) {
        // evt.data will contain the Lex state

        // send resolve ressponse to the chatbot ui
        evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });

        // relay event to parent
        var event = new CustomEvent('updatelexstate', { 'detail': evt.data });
        document.dispatchEvent(event);
      },
    };
  }
})(document, window);
