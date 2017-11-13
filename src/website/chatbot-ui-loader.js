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

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* global aws_bots_config aws_cognito_identity_pool_id LexWebUi Promise Vue */

/**
 * Class used to to dynamically load the chatbot ui including its
 * dependencies and config
 */
var LexWebUiLoader = (function createLexWebUiLoader(document, window, defaultOptions) {
  // options are the configuration of the loader
  var OPTIONS = {
    // URL of JSON file containing bot configuration
    configUrl: './chatbot-ui-loader-config.json',

    // DOM element ID where the chatbot UI will be mounted
    elementId: 'lex-web-ui',

    // controls whether the local config should be ignored when running
    // embedded (e.g. iframe) in which case the parent page will pass the config
    shouldIgnoreConfigWhenEmbedded: true,

    // controls whether the config should be downloaded from `configUrl`
    shouldLoadConfigFromJsonFile: true,

    // controls whether the config should be downloaded from Mobile Hub aws-config.js
    shouldLoadConfigFromMobileHubFile: true,

    // Controls if it should load minimized production dependecies
    shouldLoadMinDeps: true
  };
  // run-time dependencies
  // URLs point to third-party CDN by default - may want to change for production
  OPTIONS.dependencies = getDependenciesOption(OPTIONS);

  function Loader(optionsParam) {
    this.options = Object.assign({}, OPTIONS, defaultOptions, optionsParam);
  }

  /**
   * Loads the dependencies and configuration plus renders the chatbot UI
   */
  Loader.prototype.load = function load(configParam) {
    var options = this.options;
    return loadDependencies(options)
      .then(function () {
        return loadConfig(options, configParam);
      })
      .then(function (config) {
        return loadLexWebUiComponent(config);
      })
      .then(function (lexWebUi) {
        return mountLexWebUiComponent(options.elementId, lexWebUi);
      })
      .catch(function catchLoadError(error) {
        console.error('unable to load chatbot UI - ', error);
      });
  };

  return Loader;

  /**
   * Generates the default dependencies option object
   * Used to centrally maintain the links to default dependencies
   */
  function getDependenciesOption(options) {

    // injects `.min` in URLs before extension
    function getMinUrl(url, useMin) {
      if (!useMin) {
        return url;
      }
      var lastDotPosition = url.lastIndexOf('.');
      if (lastDotPosition === -1) {
        return url + '.min';
      }
      return url.substring(0, lastDotPosition) + '.min' + url.substring(lastDotPosition);
    }

    /*
    Object contains a field for scripts and css dependencies. Each field points
    to an array of objects. The array of objects dictates the load sequence.
    Each object in the array contains the URL where the dependency resides.
    For scripts, the name field points to a variable in global namespace
    indicating if the script is loaded. It is also used in the element id.
    Dependencies with the field `optional` set to true are optional
    */
    return {
      script: [
        {
          // mobile hub generated aws config
          name: 'aws_bots_config',
          url: './aws-config.js',
          optional: true
        },
        {
          name: 'AWS',
          url: getMinUrl(
            'https://sdk.amazonaws.com/js/aws-sdk-2.149.0.js',
            options.shouldLoadMinDeps
          ),
        },
        {
          name: 'Vue',
          url: getMinUrl(
            'https://cdn.jsdelivr.net/npm/vue@2.5.3/dist/vue.js',
            options.shouldLoadMinDeps
          ),
        },
        {
          name: 'Vuex',
          url: getMinUrl(
            'https://unpkg.com/vuex@3.0.1/dist/vuex.js',
            options.shouldLoadMinDeps
          ),
        },
        {
          name: 'Vuetify',
          url: getMinUrl(
            'https://unpkg.com/vuetify@0.16.9/dist/vuetify.js',
            options.shouldLoadMinDeps
          ),
        },
        {
          name: 'LexWebUi',
          url: getMinUrl(
            './lex-web-ui.js',
            options.shouldLoadMinDeps
          ),
        },
      ],
      css: [
        {
          name: 'roboto-material-icons',
          url: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
        },
        {
          name: 'vuetify',
          url: getMinUrl(
            'https://unpkg.com/vuetify@0.16.9/dist/vuetify.css',
            options.shouldLoadMinDeps
          ),
        },
        {
          name: 'lex-web-ui',
          url: getMinUrl(
            './lex-web-ui.css',
            options.shouldLoadMinDeps
          ),
        },
        {
          name: 'chatbot-ui-loader',
          url: './chatbot-ui-loader.css'
        }
      ],
    };
  }

  /**
   * Sequentially loads the dependencies
   */
  function loadDependencies(options) {
    if (!('dependencies' in options) ||
      !('css' in options.dependencies) ||
      !('script' in options.dependencies)
    ) {
      return Promise.reject('missing fields in dependencies option');
    }
    var types = [
      'css',
      'script'
    ];

    return types.reduce(function (a, type) {
      return options.dependencies[type].reduce(function (promise, dependency) {
        return promise
          .then(function () {
            return addDependency(type, dependency);
          });
      }, Promise.resolve());
    }, Promise.resolve())
  }

  /**
   * Adds a tag script or link tag to dynamically load a Javascript/CSS dependency
   * Avoids adding script tags if the associated name exists in the global scope
   * or if the associated element id exists.
   * Returns a promise that resolves when the dependency is loaded
   */
  function addDependency(type, dependency) {
    return new Promise(function addDependencyPromise(resolve, reject) {
      var name = dependency.name;
      var url = dependency.url;
      var loadTimeoutInMs = 10000;
      // element id uses naming convention of <lower case name>-<type>
      var elId = String(name).toLowerCase() + '-' + type;
      var el = document.getElementById(elId);
      var elAppend = {};
      var typeAttrib = '';
      var srcAttrib = '';
      var tag = '';

      switch (type) {
        case 'script':
          elAppend = document.body;
          tag = 'script';
          typeAttrib = 'text/javascript';
          srcAttrib = 'src';
          break;
        case 'css':
          elAppend = document.head;
          tag = 'link';
          typeAttrib = 'text/css';
          srcAttrib = 'href';
          break;
        default:
          return reject('invalid type in add dependency: ' + type);
      }

      if (!dependency || !name || !url) {
        return reject('invalid dependency parameter: ' + JSON.stringify(dependency));
      }

      if (el) {
        console.warn('dependency tag for ' + name + ' seems to already exist');
        return resolve(el);
      }
      if (type === 'script' && name in window) {
        console.warn('script global ' + name + ' seems to already exist');
        return resolve(el);
      }
      if (!elAppend || !elAppend.appendChild) {
        return reject('invalid append element in add dependency');
      }

      el = document.createElement(tag);
      el.setAttribute('id', elId);
      el.setAttribute('type', typeAttrib);

      var timeoutId = setTimeout(function () {
        return reject('timed out loading ' + name + ' dependency link:' + url);
      }, loadTimeoutInMs);
      el.onerror = function depOnError() {
        if (dependency.optional) {
          return resolve(el);
        }
        reject('failed to load ' + name + ' dependency link:' + url);
      };
      el.onload = function depOnLoad() {
        clearTimeout(timeoutId);
        resolve(el);
      };
      if (type === 'css') {
        el.setAttribute('rel', 'stylesheet');
      }
      el.setAttribute(srcAttrib, url);
      elAppend.appendChild(el);
    });
  }

  /**
   * Loads the config from the following sources in order of precedence
   * (lower overrides higher):
   *   1. parameter
   *   2. Mobile HUB
   *   3. JSON file
   */
  function loadConfig(options, configParam) {
    var url = window.location.href;
    // no need for config if running embedded
    // since the parent passes the config down to the iframe
    if (options.shouldIgnoreConfigWhenEmbedded &&
      url.indexOf('lexWebUiEmbed=true') !== -1
    ) {
      return Promise.resolve({});
    }

    return Promise.resolve()
      .then(function () {
        return (options.shouldLoadConfigFromJsonFile) ?
          loadConfigFromJsonFile(options.configUrl) :
          Promise.resolve({});
      })
      .then(function (configJson) {
        return (options.shouldLoadConfigFromMobileHubFile) ?
          mergeMobileHubConfig(configJson) :
          Promise.resolve(configJson);
      })
      .then(function (configMerged) {
        return Object.assign(configMerged, configParam);
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
          // ie11 does not support responseType
          if (typeof xhr.response === 'string') {
            try {
              var parsedResponse = JSON.parse(xhr.response);
              return resolve(parsedResponse);
            } catch (err) {
              return reject('failed to decode chat bot config object');
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

  function mergeMobileHubConfig(config) {
    // these values come from the AWS Mobile Hub generated aws-config.js
    // eslint-disable-next-line camelcase
    if (typeof aws_cognito_identity_pool_id === 'undefined' ||
      // eslint-disable-next-line camelcase
      typeof aws_bots_config === 'undefined'
    ) {
      return Promise.resolve(config);
    }

    return new Promise(function mergeMobileHubConfigPromise(resolve, reject) {
      // eslint-disable-next-line camelcase
      var poolId = aws_cognito_identity_pool_id ||
        ((config.cognito && config.cognito.poolId) ?
          config.cognito.poolId : '');
      var botsConfig = {};
      var botName = '';

      try {
        botsConfig = JSON.parse(aws_bots_config);
        botName = botsConfig[0].name;
      } catch (err) {
        return reject('failed to parse mobile hub aws_bots_config');
      }
      botName = botName ||
        ((config.lex && config.lex.botName) ?
          config.lex.botName : '');

      var mergedConfig = Object.assign(
        { cognito: {}, lex: {} },
        config
      );

      mergedConfig.cognito.poolId = poolId;
      mergedConfig.lex.botName = botName;

      return resolve(mergedConfig);
    });
  }

  /**
   * Loads and initializes the chatbot component
   * Assumes that the LexWebUi constructor was loaded as a dependency
   * Returns a promise
   */
  function loadLexWebUiComponent(config) {
    return new Promise(function loadLexWebUiPromise(resolve, reject) {
      try {
        var lexWebUi = new LexWebUi.Loader(config);
        return resolve(lexWebUi);
      } catch (err) {
        return reject('failed to load LexWebUi: ' + err);
      }
    });
  }

  /**
   * Mounts the chatbot component in the DOM at the provided element ID
   * Returns a promise
   */
  function mountLexWebUiComponent(elId, lexWebUi) {
    return new Promise(function mountPromise(resolve, reject) {
      var el = document.getElementById(elId);

      // if the element doesn't exist, create a div and append it to the document body
      if (!el) {
        el = document.createElement('div');
        el.setAttribute('id', elId);
        document.body.appendChild(el);
      }

      try {
        var LexWebUiComponent = Vue.extend({
          store: lexWebUi.store,
          template: '<div id="lex-web-ui"><lex-web-ui/></div>',
        });

        // mounts off-document
        var lexWebUiComponent = new LexWebUiComponent().$mount();
        el.parentNode.replaceChild(lexWebUiComponent.$el, el);
        resolve(lexWebUiComponent);
      } catch (err) {
        reject('failed to mount lexWebUi component: ' + err);
      }
    });
  }

})(
  document,
  window,
  // options to override defaults passed in an existing lexWebUiLoader.options var
  (LexWebUiLoader && LexWebUiLoader.options) ? LexWebUiLoader.options : null
);
