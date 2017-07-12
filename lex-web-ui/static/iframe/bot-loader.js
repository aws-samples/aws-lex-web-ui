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
  };

  /*
  config variable loads from configUrl. It should contain the
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
  var config = {};
  var configUrl = '/static/iframe/config.json';

  var iframe;
  var container;
  var messageHandler = {};
  var credentials;

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
    loadConfigFromJsonFile(configUrl)
    .then(function loadConfigFromEventPromise(conf) {
        return loadConfigFromEvent(conf);
    })
    .then(function assignConfig(conf) {
      config = conf;
      return Promise.resolve();
    })
    .then(function addContainerPromise() {
      return addContainer(OPTIONS.containerClass);
    })
    .then(function assignContainer(containerParam) {
      container = containerParam;
      return Promise.resolve();
    })
    .then(function addAwsSdkPromise() {
      return addAwsSdk(container, config);
    })
    .then(function initCredentialsPromise() {
      return initCredentials(config);
    })
    .then(function getCredentialsPromise() {
      return getCredentials();
    })
    .then(function addMessageHandler() {
      window.addEventListener('message', onMessage, false);
      return Promise.resolve();
    })
    .then(function addIframePromise() {
      return addIframe(container);
    })
    .then(function assignIframe(iframeParam) {
      iframe = iframeParam;
      return Promise.resolve();
    })
    .then(function parentReady() {
      iframe.contentWindow.postMessage(
        { event: 'parentReady' },
        config.iframeOrigin
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
   * Adds a div container to document body which will wrap the chat bot iframe
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
  function initCredentials(config) {
    if (!'AWS' in window) {
      return Promise.reject('unable to find AWS object');
    }

    credentials = new AWS.CognitoIdentityCredentials(
      { IdentityPoolId: config.aws.cognitoPoolId },
      { region: config.aws.region },
    );

    return credentials.getPromise()
  }

  /**
   * Get credentials - cognito
   */
  function getCredentials() {
    var identityId = localStorage.getItem('cognitoid');

    if (identityId != null){
      console.log('[INFO] found existing identity ID: ', identityId);
    }

    if (!('getPromise' in credentials)) {
      console.error('getPromise not found in credentials');
      return Promise.reject('getPromise not found in credentials');
    }

    return credentials.getPromise()
    .then(function storeIdentityId() {
      console.log('[INFO] storing identity ID:',
        credentials.identityId
      );
      localStorage.setItem('cognitoid', credentials.identityId);
      identityId = localStorage.getItem('cognitoid');
    })
    .then(function getCredentialsPromise() {
      return Promise.resolve(credentials);
    });
  }

  /**
   * Adds chat bot iframe under the application div container
   */
  function addIframe(divElement) {
    var iframeElement =
      document.querySelector('.' + OPTIONS.containerClass + ' iframe');
    if (iframeElement) {
      return Promise.resolve(iframeElement);
    }

    iframeElement = document.createElement('iframe');
    iframeElement.setAttribute('src', config.iframeOrigin + OPTIONS.iframeSrcPath);
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
    container.classList.toggle(OPTIONS.containerClass + '--show');
  }

  /**
   * Message handler - receives postMessage events from iframe
   */
  function onMessage(evt) {
    // security check
    if (evt.origin !== config.iframeOrigin) {
      console.warn('postMessage frrom invalid origin', evt.origin);
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
      var iframeConfig = config.iframeConfig;
      try {
        iframeConfig.cognito = {
          poolId: config.aws.cognitoPoolId,
        };
        iframeConfig.region = config.aws.region;
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
      container.classList.toggle(OPTIONS.containerClass + '--minimize');
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
