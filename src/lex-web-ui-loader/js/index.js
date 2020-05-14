/*
 Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

/**
 * Entry point to the chatbot-ui-loader.js library
 * Exports the loader classes
 */

// adds polyfills for ie11 compatibility
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { configBase } from './defaults/lex-web-ui';
import { optionsIframe, optionsFullPage } from './defaults/loader';
import { dependenciesIframe, dependenciesFullPage } from './defaults/dependencies';

// import from lib
import { DependencyLoader } from './lib/dependency-loader';
import { ConfigLoader } from './lib/config-loader';
import { IframeComponentLoader } from './lib/iframe-component-loader';
import { FullPageComponentLoader } from './lib/fullpage-component-loader';

// import CSS
import '../css/lex-web-ui-fullpage.css';
import '../css/lex-web-ui-iframe.css';

/**
 * CustomEvent polyfill for IE11
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */
function setCustomEventShim() {
  if (typeof window.CustomEvent === 'function') {
    return false;
  }

  function CustomEvent(
    event,
    params = { bubbles: false, cancelable: false, detail: undefined },
  ) {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;

  return true;
}

/**
 * Base class used by the full page and iframe loaders
 */
class Loader {
  /**
   * @param {object} options - options controlling how the dependencies and
   *   component configa are loaded
   */
  constructor(options) {
    const { baseUrl } = options;
    // polyfill needed for IE11
    setCustomEventShim();
    this.options = options;

    // append a trailing slash if not present in the baseUrl
    this.options.baseUrl =
      (this.options.baseUrl && baseUrl[baseUrl.length - 1] === '/') ?
        this.options.baseUrl : `${this.options.baseUrl}/`;

    this.confLoader = new ConfigLoader(this.options);
  }

  load(configParam = {}) {
    // merge empty constructor config and parameter config
    this.config = ConfigLoader.mergeConfig(this.config, configParam);

    // load dependencies
    return this.depLoader.load()
      // load dynamic config
      .then(() => this.confLoader.load(this.config))
      // assign and merge dynamic config to this instance config
      .then((config) => {
        this.config = ConfigLoader.mergeConfig(this.config, config);
      })
      .then(() => this.compLoader.load(this.config));
  }
}

/**
 * Class used to to dynamically load the chatbot ui in a full page including its
 * dependencies and config
 */
export class FullPageLoader extends Loader {
  /**
   * @param {object} options - options controlling how the dependencies and
   *   component config are loaded
   */
  constructor(options = {}) {
    super({ ...optionsFullPage, ...options });

    this.config = configBase;

    // run-time dependencies
    this.depLoader = new DependencyLoader({
      shouldLoadMinDeps: this.options.shouldLoadMinDeps,
      dependencies: dependenciesFullPage,
      baseUrl: this.options.baseUrl,
    });

    this.compLoader = new FullPageComponentLoader({
      elementId: this.options.elementId,
      config: this.config,
    });
  }

  load(configParam = {}) {
    return super.load(configParam);
  }
}

/**
 * Class used to to dynamically load the chatbot ui in an iframe
 */
export class IframeLoader extends Loader {
  /**
   * @param {object} options - options controlling how the dependencies and
   *   component config are loaded
   */
  constructor(options = {}) {
    super({ ...optionsIframe, ...options });

    // chatbot UI component config
    this.config = configBase;

    // run-time dependencies
    this.depLoader = new DependencyLoader({
      shouldLoadMinDeps: this.options.shouldLoadMinDeps,
      dependencies: dependenciesIframe,
      baseUrl: this.options.baseUrl,
    });

    this.compLoader = new IframeComponentLoader({
      config: this.config,
      containerClass: this.options.containerClass || 'lex-web-ui',
      elementId: this.options.elementId || 'lex-web-ui',
    });
  }

  load(configParam = {}) {
    return super.load(configParam)
      .then(() => {
        // assign API to this object to make calls more succint
        this.api = this.compLoader.api;
        // make sure iframe and iframeSrcPath are set to values if not
        // configured by standard mechanisms. At this point, default
        // values from ./defaults/loader.js will be used.
        this.config.iframe = this.config.iframe || {};
        this.config.iframe.iframeSrcPath = this.config.iframe.iframeSrcPath ||
          this.mergeSrcPath(configParam);
      });
  }

  /**
   * Merges iframe src path from options and iframe config
   */
  mergeSrcPath(configParam) {
    const { iframe: iframeConfigFromParam } = configParam;
    const srcPathFromParam =
      iframeConfigFromParam && iframeConfigFromParam.iframeSrcPath;
    const { iframe: iframeConfigFromThis } = this.config;
    const srcPathFromThis =
      iframeConfigFromThis && iframeConfigFromThis.iframeSrcPath;

    return (srcPathFromParam || this.options.iframeSrcPath || srcPathFromThis);
  }
}

/**
 * chatbot loader library entry point
 */
export const ChatBotUiLoader = {
  FullPageLoader,
  IframeLoader,
};

export default ChatBotUiLoader;
