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
    sdkLink: 'https://sdk.amazonaws.com/js/aws-sdk-2.82.0.min.js',

    // URL to download build time config JSON file
    configUrl: '/static/iframe/config.json',
  };

  /*
  The config field is initialized from the contents of OPTIONS.configUrl.
  It should contain the
  following keys:
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
  };

  var messageHandler = {};

  if (isSupported()) {
    // initialize iframe once the DOM is loaded
    document.addEventListener('DOMContentLoaded', main, false);
  } else {
    console.warn('chat bot not loaded - unsupported browser');
  }

  /**
   * Check if modern browser features used by chat bot are supported
   */
  function isSupported() {
    var features = [
      'localStorage',
      'Audio',
      'Blob',
      'Promise',
      'URL',
    ];
    return features.every(function(feature) {
      return feature in window;
    });
  }

  function main() {
    loadConfigFromJsonFile(OPTIONS.configUrl)
    .then(function loadConfigFromEventPromise(config) {
      if (!('iframeOrigin' in config || config.iframeOrigin) ||
        !('aws' in config || config.aws) ||
        !('cognitoPoolId' in config.aws || config.aws.cognitoPoolId)
      ) {
        return Promise.reject('config object is missing required fields');
      }
      botLoader.config = config;
      return Promise.resolve();
    })
    .then(function addContainerPromise() {
      return addContainer(OPTIONS.containerClass);
    })
    .then(function assignContainer(containerElement) {
      botLoader.containerElement = containerElement;
      return Promise.resolve();
    })
    .then(function addAwsSdkPromise() {
      return addAwsSdk(botLoader.containerElement);
    })
    .then(function initCredentialsPromise() {
      return initCredentials(botLoader.config.aws.region || 'us-east-1',
        botLoader.config.aws.cognitoPoolId
      );
    })
    .then(function addMessageHandler() {
      window.addEventListener('message', onMessage, false);
      return Promise.resolve();
    })
    .then(function addIframePromise() {
      if (!('iframeOrigin' in botLoader.config)) {
        return Promise.reject('iframeOrigin field not found in config');
      }
      return addIframe(
        botLoader.config.iframeOrigin, botLoader.containerElement
      );
    })
    .then(function assignIframe(iframeElement) {
      botLoader.iframeElement = iframeElement;
      return Promise.resolve();
    })
    .then(function sendParentReadyEvent() {
      if (!('contentWindow' in botLoader.iframeElement)) {
        return Promise.reject('invalid iframe element');
      }
      botLoader.iframeElement.contentWindow.postMessage(
        { event: 'parentReady' },
        botLoader.config.iframeOrigin
      );
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
  function addAwsSdk(divElement) {
    return new Promise(function addAwsSdkPromise(resolve, reject) {
      if (!('appendChild' in divElement)) {
        reject('invalid node element to append sdk');
      }
      var sdkScriptElement =
        document.querySelector('.' + OPTIONS.containerClass + ' script');
      if (sdkScriptElement || 'AWS' in window) {
        resolve(sdkScriptElement);
      }

      sdkScriptElement = document.createElement('script');
      sdkScriptElement.setAttribute('type', 'text/javascript');

      sdkScriptElement.onerror = function  sdkOnError() {
        reject('failed to load AWS SDK link:' + OPTIONS.sdkLink);
      };
      sdkScriptElement.onload = function  sdkOnLoad() {
        resolve(sdkScriptElement);
      };

      sdkScriptElement.setAttribute('src', OPTIONS.sdkLink);

      divElement.appendChild(sdkScriptElement);
    });
  }

  /**
   * Initializes credentials
   */
  function initCredentials(region, cognitoPoolId) {
    if (!'AWS' in window) {
      return Promise.reject('unable to find AWS object');
    }

    botLoader.credentials = new AWS.CognitoIdentityCredentials(
      { IdentityPoolId: cognitoPoolId },
      { region: region },
    );

    return botLoader.credentials.getPromise()
  }

  /**
   * Get Cognito credentials - cognito
   */
  function getCredentials() {
    var identityId = localStorage.getItem('cognitoid');

    if (identityId != null){
      console.log('[INFO] found existing identity ID: ', identityId);
    }

    if (!('getPromise' in botLoader.credentials)) {
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
      return Promise.resolve(botLoader.credentials);
    });
  }

  /**
   * Adds chat bot iframe under the application div container
   */
  function addIframe(origin, divElement) {
    var iframeElement =
      document.querySelector('.' + OPTIONS.containerClass + ' iframe');
    if (iframeElement) {
      return Promise.resolve(iframeElement);
    }
    if (!('appendChild' in divElement)) {
      reject('invalid node element to append iframe');
    }

    iframeElement = document.createElement('iframe');
    iframeElement.setAttribute('src', origin + OPTIONS.iframeSrcPath);
    iframeElement.setAttribute('frameBorder', '0');
    iframeElement.setAttribute('scrolling', 'no');

    divElement.appendChild(iframeElement);

    return new Promise(function loadIframePromise(resolve, reject) {
      var timeoutId = setTimeout(onIframeTimeout, 10000);
      iframeElement.addEventListener('load', onIframeLoaded, false);

      function onIframeLoaded(evt) {
        clearTimeout(timeoutId);
        iframeElement.removeEventListener('load', onIframeLoaded, false);
        toggleShowUi();
        return resolve(iframeElement);
      };

      function onIframeTimeout() {
        iframeElement.removeEventListener('load', onIframeLoaded, false);
        return reject('iframe load timeout');
      };
    });
  }

  /**
   * Toggle between showing/hiding chat bot ui
   */
  function toggleShowUi() {
    botLoader.containerElement.classList.toggle(
      OPTIONS.containerClass + '--show'
    );
  }

  /**
   * Message handler - receives postMessage events from iframe
   */
  function onMessage(evt) {
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

  messageHandler = {
    onGetCredentials: function onGetCredentials(evt) {
      return getCredentials()
      .then(function resolveGetCredentials(creds) {
        evt.ports[0].postMessage({
          event: 'resolve',
          type: 'getCredentials',
          data: creds,
        });
      })
      .catch(function onGetCredentialsError(error) {
        console.error('failed to get credentials', error);
        evt.ports[0].postMessage({
          event: 'reject',
          type: 'getCredentials',
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
          type: 'initIframeConfig',
          error: 'failed to obtain a valid iframe config',
        });
        console.error('failed to assign iframe config', e);
        return;
      }
      evt.ports[0].postMessage({
        event: 'resolve',
        type: 'initIframeConfig',
        data: iframeConfig,
      });
    },
    onToggleExpandUi: function onToggleExpandUi(evt) {
      botLoader.containerElement.classList.toggle(OPTIONS.containerClass + '--minimize');
      evt.ports[0].postMessage({ event: 'resolve', type: 'toggleShowUi' });
    },
    onUpdateLexState: function onUpdateLexState(evt) {
      // evt.data will contain the Lex state

      // send resolve ressponse to the chatbot ui
      evt.ports[0].postMessage({ event: 'resolve', type: 'updateLexState' });

      // relay event to parent
      var event = new CustomEvent('updatelexstate', { 'detail': evt.data });
      document.dispatchEvent(event);
    },
  };
})(document, window);
