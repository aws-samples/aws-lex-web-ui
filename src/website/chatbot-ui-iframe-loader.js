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

/*
 * Sample JavaScript code to dynamically add bot iframe, AWS SDK,
 * load credentials and add related event handlers
 *
 * It uses a Cognito identity pool to illustrate passing credentials to the
 * chat bot
 */

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* global AWS Promise */

/**
 * CustomEvent polyfill for IE11
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */
(function (window) {

  if (typeof window.CustomEvent === 'function') {
    return false;
  }

  function CustomEvent(event, params) {
    // eslint-disable-next-line
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})(window);

/**
 * Class used to load the bot as an iframe
 */
var LexWebUiIframe = (function (document, window, defaultOptions) {
  // default options - merged with options passed in the constructor
  var OPTIONS = {
    // div container class to insert iframe
    containerClass: 'lex-web-ui',

    // iframe source uri. use embed=true query string when loading as iframe
    iframeSrcPath: '/index.html#/?lexWebUiEmbed=true',

    // AWS SDK script dynamically added to the DOM
    // https://github.com/aws/aws-sdk-js
    sdkUrl: 'https://sdk.amazonaws.com/js/aws-sdk-2.141.0.min.js',

    // controls whether the AWS SDK is dynamically added to the DOM
    shouldAddAwsSdk: true,

    // URL to download config JSON file
    configUrl: '/chatbot-ui-iframe-loader-config.json',

    // controls whether the config should be downloaded from `configUrl`
    shouldLoadConfigFromJsonFile: true,

    // controls whether the config should be obtained using events
    shouldLoadConfigFromEvent: true,

    // controls whether the bot loader script should
    // automatically initialize and load the iframe.
    // If set to false, you should manually initialize
    // using the init() method
    shouldAutoLoad: true,
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

  // class used by this script
  function BotLoader(optionsParam) {
    this.options = Object.assign({}, OPTIONS, defaultOptions, optionsParam);
    this.config = {
      iframeOrigin: '',
      loadIframeMinimized: true,
      aws: {
        cognitoPoolId: ''
      },
      iframeConfig: {
        lex: { botName: '' }
      }
    };
    this.iframeElement = null;
    this.containerElement = null;
    this.credentials = null;
    this.isChatBotReady = false;
  }

  /**
   * Class attribute that controls whether the bot loader script should
   * automatically load the iframe
   */
  BotLoader.shouldAutoLoad = true;

  /**
   * Initializes the chatbot ui. This should be called when the DOM has
   * finished loading
   */
  BotLoader.prototype.init = function (configParam) {
    var self = this;

    Promise.resolve()
    .then(function initConfig() {
      return Promise.resolve()
        .then(function initConfigFromJsonFile() {
          return (self.options.shouldLoadConfigFromJsonFile) ?
            loadConfigFromJsonFile(self.options.configUrl) :
            Promise.resolve(self.config);
        })
        .then(function initConfigFromEvent(config) {
          return (self.options.shouldLoadConfigFromEvent) ?
            loadConfigFromEvent(config) :
            Promise.resolve(config);
        })
        .then(function assignConfig(config) {
          // merge config passed as an argument to init()
          var configFromInit = (configParam && Object.keys(configParam).length) ?
            mergeConfig(self.config, configParam) : self.config;
          var mergedConfig = (config && Object.keys(config).length) ?
            mergeConfig(configFromInit, config) : configFromInit;
          if (!('iframeOrigin' in mergedConfig) || !mergedConfig.iframeOrigin) {
            mergedConfig.iframeOrigin = window.location.origin;
          }
          if (!validateConfig(mergedConfig)) {
            return Promise.reject('config object is missing required fields');
          }
          self.config = mergedConfig;
          return Promise.resolve(self.config);
        });
    })
    .then(function initContainer() {
      return addContainer(self.options.containerClass)
        .then(function assignContainer(containerElement) {
          self.containerElement = containerElement;
          return containerElement;
        });
    })
    .then(function initSdk() {
      return (self.options.shouldAddAwsSdk) ?
        addAwsSdk(
          self.containerElement,
          self.options.containerClass,
          self.options.sdkUrl
        ) :
        Promise.resolve();
    })
    .then(function initCredentials() {
      return createCredentials(
        self.config.aws.region || 'us-east-1',
        self.config.aws.cognitoPoolId
      )
        .then(function assignCredentials(credentials) {
          self.credentials = credentials;
        });
    })
    .then(function addMessageFromIframeListener() {
      window.addEventListener(
        'message',
        self.onMessageFromIframe.bind(self),
        false
      );
    })
    .then(function initIframe() {
      if (!self.config.iframeOrigin || !self.containerElement) {
        return Promise.reject('missing fields when initializing iframe');
      }
      return addIframe(
        self.config.iframeOrigin,
        self.containerElement,
        self.options.containerClass,
        self.options.iframeSrcPath
      )
        .then(function assignIframe(iframeElement) {
          self.iframeElement = iframeElement;
        })
        .then(function waitForChatBot() {
          return self.waitForChatBotReady();
        });
    })
    .then(function displayIframe() {
      return Promise.resolve()
        .then(function minimizeUi() {
          return (self.config.loadIframeMinimized) ?
            self.sendMessageToIframe({ event: 'toggleMinimizeUi' }) :
            Promise.resolve();
        })
        .then(function showUi() {
          toggleShowUi(self.containerElement, self.options.containerClass);
        });
    })
    .then(function setupEvents() {
      return Promise.resolve()
        .then(function addParentToIframeListener() {
          document.addEventListener(
            'lexWebUiMessage',
            self.onMessageToIframe.bind(self),
            false
          );
        })
        .then(function sendReadyMessageToIframe() {
          return self.sendMessageToIframe({ event: 'parentReady' });
        })
        .then(function sendReadyMessageToParent() {
          var event = new CustomEvent('lexWebUiReady');
          document.dispatchEvent(event);
        });

    })
    .catch(function initError(error) {
      console.error('could not initialize chat bot -', error);
    });
  };

  /**************************************************************************
   * Init functions - the functions in this section are helpers used by the
   * BotLoader init() method.
  **************************************************************************/

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
          // ie11 does not support responseType
          if (typeof xhr.response === 'string') {
            try {
              var parsedResponse = JSON.parse(xhr.response);
              return resolve(parsedResponse);
            } catch (err) {
              return reject('unable to decode chat bot config object');
            }
          }
          return resolve(xhr.response);
        } else {
          return reject('failed to get chat bot config with status: ' + xhr.status);
        }
      };
      xhr.send();
    });
  }

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
        var event = new CustomEvent('receivelexconfig');
        document.dispatchEvent(event);
      }

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
      }

      function onConfigEventTimeout() {
        clearInterval(intervalId);
        document.removeEventListener('loadlexconfig', onConfigEventLoaded, false);
        return reject('config event timed out');
      }
    });
  }

  /**
   * Merges config objects. The initial set of keys to merge are driven by
   * the baseConfig. The srcConfig values override the baseConfig ones
   * unless the srcConfig value is empty
   */
  function mergeConfig(baseConfig, srcConfig) {
    function isEmpty(data) {
      if (typeof data === 'number' || typeof data === 'boolean') {
        return false;
      }
      if (typeof data === 'undefined' || data === null) {
        return true;
      }
      if (typeof data.length !== 'undefined') {
        return data.length === 0;
      }
      return Object.keys(data).length === 0;
    }

    // use the baseConfig first level keys as the base for merging
    return Object.keys(baseConfig)
      .map(function (key) {
        var mergedConfig = {};
        var value = baseConfig[key];
        // merge from source if its value is not empty
        if (key in srcConfig && !isEmpty(srcConfig[key])) {
          value = (typeof baseConfig[key] === 'object') ?
            // recursively merge sub-objects in both directions
            Object.assign(
              mergeConfig(srcConfig[key], baseConfig[key]),
              mergeConfig(baseConfig[key], srcConfig[key])
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
  }

  /**
   * Validate that the config has the expected structure
   */
  function validateConfig(config) {
    if (!('iframeOrigin' in config && config.iframeOrigin)) {
      console.error('missing iframeOrigin config field');
      return false;
    }
    if (!('aws' in config && config.aws)) {
      console.error('missing aws config field');
      return false;
    }
    if (!('cognitoPoolId' in config.aws && config.aws.cognitoPoolId)) {
      console.error('missing cognitoPoolId config field');
      return false;
    }
    return true;
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

      sdkScriptElement.onerror = function sdkOnError() {
        reject('failed to load AWS SDK link:' + sdkUrl);
      };
      sdkScriptElement.onload = function sdkOnLoad() {
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
      { region: region }
    );

    return credentials.getPromise()
      .then(function () {
        return credentials;
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
      return Promise.reject('invalid node element to append iframe');
    }

    iframeElement = document.createElement('iframe');
    iframeElement.setAttribute('src', origin + iframeSrcPath);
    iframeElement.setAttribute('frameBorder', '0');
    iframeElement.setAttribute('scrolling', 'no');
    iframeElement.setAttribute('title', 'chatbot');

    divElement.appendChild(iframeElement);

    return new Promise(function loadIframePromise(resolve, reject) {
      var timeoutInMs = 20000; // bail out on loading after this timeout
      var timeoutId = setTimeout(onIframeTimeout, timeoutInMs);
      iframeElement.addEventListener('load', onIframeLoaded, false);

      function onIframeLoaded() {
        clearTimeout(timeoutId);
        iframeElement.removeEventListener('load', onIframeLoaded, false);

        return resolve(iframeElement);
      }

      function onIframeTimeout() {
        iframeElement.removeEventListener('load', onIframeLoaded, false);
        return reject('iframe load timeout');
      }
    });
  }

  /**************************************************************************
   * iframe UI helpers
  **************************************************************************/

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

  /**************************************************************************
   * BotLoader Methods
  **************************************************************************/

  /**
   * Wait for the chatbot UI to send the 'ready' message indicating
   * that it has successfully initialized
   */
  BotLoader.prototype.waitForChatBotReady = function () {
    var self = this;
    return new Promise(function waitForReady(resolve, reject) {
      var timeoutInMs = 15000;
      var timeoutId = setTimeout(onConfigEventTimeout, timeoutInMs);
      var intervalId = setInterval(checkIsChatBotReady, 500);

      function checkIsChatBotReady() {
        if (self.isChatBotReady) {
          clearTimeout(timeoutId);
          clearInterval(intervalId);
          return resolve();
        }
      }

      function onConfigEventTimeout() {
        clearInterval(intervalId);
        return reject('chatbot loading time out');
      }
    });
  }

  /**
   * Get AWS credentials to pass to the chatbot UI
   */
  BotLoader.prototype.getCredentials = function () {
    var self = this;

    if (!self.credentials || !('getPromise' in self.credentials)) {
      console.error('getPromise not found in credentials');
      return Promise.reject('getPromise not found in credentials');
    }

    return self.credentials.getPromise()
      .then(function storeIdentityId() {
        localStorage.setItem('cognitoid', self.credentials.identityId);
      })
      .then(function getCredentialsPromise() {
        return self.credentials;
      });
  }

  /**
   * Send a message to the iframe using postMessage
   */
  BotLoader.prototype.sendMessageToIframe = function (message) {
    var self = this;
    if (!self.iframeElement ||
      !('contentWindow' in self.iframeElement) ||
      !('postMessage' in self.iframeElement.contentWindow)
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
            reject('iframe failed to handle message - ' + evt.data.error);
          }
        };
      self.iframeElement.contentWindow.postMessage(message,
        self.config.iframeOrigin, [messageChannel.port2]);
    });
  };

  BotLoader.prototype.onMessageToIframe = function (evt) {
    var self = this;

    if (!evt || !('detail' in evt) || !evt.detail ||
      !('message' in evt.detail)
    ) {
      console.error(
        'malformed message to iframe event: ' + JSON.stringify(evt)
      );
      return;
    }
    return self.sendMessageToIframe(evt.detail.message);
  };

  /**
   * Message handler - receives postMessage events from iframe
   */
  BotLoader.prototype.onMessageFromIframe = function (evt) {
    var self = this;
    var messageHandler = self.createIframeMessageHandlers();
    // security check
    if (evt.origin !== self.config.iframeOrigin) {
      console.warn('postMessage from invalid origin', evt.origin);
      return;
    }
    if (!evt.ports) {
      console.error('postMessage not sent over MessageChannel', evt);
      return;
    }

    // TODO convert events and handlers to a reducer
    switch (evt.data.event) {
      case 'ready':
        messageHandler.onReady(evt);
        break;
      case 'getCredentials':
        messageHandler.onGetCredentials(evt);
        break;
      case 'initIframeConfig':
        messageHandler.onInitIframeConfig(evt);
        break;
      case 'toggleMinimizeUi':
        messageHandler.onToggleMinimizeUi(evt);
        break;
      case 'updateLexState':
        messageHandler.onUpdateLexState(evt);
        break;
      default:
        console.error('unknown message in event', evt);
        break;
    }
  };

  /**
   * Creates an object containing the message handler functions
   * used by onMessageFromIframe
   */
  BotLoader.prototype.createIframeMessageHandlers = function () {
    var self = this;

    return {
      onReady: function onReady(evt) {
        self.isChatBotReady = true;
        evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });
      },
      onGetCredentials: function onGetCredentials(evt) {
        return self.getCredentials()
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
        var iframeConfig = self.config.iframeConfig;
        try {
          iframeConfig.cognito = {
            poolId: self.config.aws.cognitoPoolId,
          };
          iframeConfig.region = self.config.aws.region;
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
      onToggleMinimizeUi: function onToggleMinimizeUi(evt) {
        toggleMinimizeUi(self.containerElement, self.options.containerClass);
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
  };

  return BotLoader;
})(
  document,
  window,
  // options to override defaults passed in an existing LexWebUi.options var
  (LexWebUiIframe && LexWebUiIframe.options) ? LexWebUiIframe.options : null
);

/**
 * Instantiates the bot loader
*/
// eslint-disable-next-line no-unused-vars
var lexWebUi = (function (document, window, BotLoader) {
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
    return features.every(function (feature) {
      return feature in window;
    });
  }

  var botLoader = new BotLoader();

  if (!botLoader.options.shouldAutoLoad) {
    return botLoader;
  }

  if (isSupported()) {
    // initialize iframe once the DOM is loaded
    document.addEventListener(
      'DOMContentLoaded',
      function initBoloader() {
        botLoader.init();
      }.bind(this),
      false
    );
    return botLoader;
  } else {
    console.warn(
      'chatbot UI could not be be loaded - ' +
      'could not find require browser functions'
    );
  }
})(document, window, LexWebUiIframe);
