/*
 Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/* eslint no-console: ["error", { allow: ["warn", "error", "debug"] }] */
/* global AWS */

import { ConfigLoader } from './config-loader';
import { logout, login, getAuth, refreshLogin, forceLogin } from './loginutil';


/**
 * Instantiates and mounts the chatbot component in an iframe
 *
 */
export class IframeComponentLoader {
  /**
   * @param {object} config - chatbot UI config
   * @param {string} elementId - element ID of a div containing the iframe
   * @param {string} containerClass - base CSS class used to match element
   *   used for dynamicall hiding/showing element
   */
  constructor({
    config = {},
    containerClass = 'lex-web-ui',
    elementId = 'lex-web-ui',
  }) {
    this.elementId = elementId;
    this.config = config;
    this.containerClass = containerClass;

    this.iframeElement = null;
    this.containerElement = null;
    this.credentials = null;
    this.isChatBotReady = false;

    this.initIframeMessageHandlers();
  }

  /**
   * Loads the component into the DOM
   * configParam overrides at runtime the chatbot UI config
   */
  load(configParam) {
    this.config = ConfigLoader.mergeConfig(this.config, configParam);
    // add iframe config if missing
    if (!(('iframe' in this.config))) {
      this.config.iframe = {};
    }
    const iframeConfig = this.config.iframe;
    // assign the iframeOrigin if not found in config
    if (!(('iframeOrigin' in iframeConfig) && iframeConfig.iframeOrigin)) {
      this.config.iframe.iframeOrigin =
        this.config.ui.parentOrigin || window.location.origin;
    }
    if (iframeConfig.shouldLoadIframeMinimized === undefined) {
      this.config.iframe.shouldLoadIframeMinimized = true;
    }
    // assign parentOrigin if not found in config
    if (!(this.config.ui.parentOrigin)) {
      this.config.ui.parentOrigin =
       this.config.iframe.iframeOrigin || window.location.origin;
    }
    // validate config
    if (!IframeComponentLoader.validateConfig(this.config)) {
      return Promise.reject(new Error('config object is missing required fields'));
    }

    return Promise.all([
      this.initContainer(),
      this.initCognitoCredentials(),
      this.setupIframeMessageListener(),
    ])
      .then(() => this.initIframe())
      .then(() => this.initParentToIframeApi())
      .then(() => this.showIframe());
  }

  /**
   * Validate that the config has the expected structure
   */
  static validateConfig(config) {
    const { iframe: iframeConfig, ui: uiConfig } = config;
    if (!iframeConfig) {
      console.error('missing iframe config field');
      return false;
    }
    if (!('iframeOrigin' in iframeConfig && iframeConfig.iframeOrigin)) {
      console.error('missing iframeOrigin config field');
      return false;
    }
    if (!('iframeSrcPath' in iframeConfig && iframeConfig.iframeSrcPath)) {
      console.error('missing iframeSrcPath config field');
      return false;
    }
    if (!('parentOrigin' in uiConfig && uiConfig.parentOrigin)) {
      console.error('missing parentOrigin config field');
      return false;
    }
    if (!('shouldLoadIframeMinimized' in iframeConfig)) {
      console.error('missing shouldLoadIframeMinimized config field');
      return false;
    }

    return true;
  }

  /**
   * Adds a div container to document body which will hold the chatbot iframe
   * Inits this.containerElement
   */
  initContainer() {
    return new Promise((resolve, reject) => {
      if (!this.elementId || !this.containerClass) {
        return reject(new Error('invalid chatbot container parameters'));
      }
      let containerEl = document.getElementById(this.elementId);
      if (containerEl) {
        console.warn('chatbot iframe container already exists');
        /* place the chatbot to the already available element */
        this.containerElement = containerEl;
        return resolve(containerEl);
      }
      try {
        containerEl = document.createElement('div');
        containerEl.classList.add(this.containerClass);
        containerEl.setAttribute('id', this.elementId);
        document.body.appendChild(containerEl);
      } catch (err) {
        return reject(new Error(`error initializing container: ${err}`));
      }

      // assign container element
      this.containerElement = containerEl;
      return resolve();
    });
  }

  generateConfigObj() {
    const config = {
      appUserPoolClientId: this.config.cognito.appUserPoolClientId,
      appDomainName: this.config.cognito.appDomainName,
      appUserPoolIdentityProvider: this.config.cognito.appUserPoolIdentityProvider,
    };
    return config;
  }

  /**
   * Call out to login utility which leverages Amplify to do sign-in
   */
  initCognitoCredentials() {
    return new Promise((resolve, reject) => {
      login(this.config).then(() => {
        resolve();
      });
    });
  }

  /**
   * Add postMessage event handler to receive messages from iframe
   */
  setupIframeMessageListener() {
    try {
      window.addEventListener(
        'message',
        this.onMessageFromIframe.bind(this),
        false,
      );
    } catch (err) {
      return Promise
        .reject(new Error(`could not add iframe message listener ${err}`));
    }

    return Promise.resolve();
  }

  /**
   * Message handler - receives postMessage events from iframe
   */
  onMessageFromIframe(evt) {
    const iframeOrigin =
      (
        'iframe' in this.config &&
        typeof this.config.iframe.iframeOrigin === 'string'
      ) ?
        this.config.iframe.iframeOrigin :
        window.location.origin;

    // SECURITY: origin check
    if (evt.origin !== iframeOrigin) {
      return;
    }
    // ignore events not produced by the lex web ui
    if('data' in evt
      && 'source' in evt.data
      && evt.data.source !== 'lex-web-ui'
    ) {
      return;
    }
    if (!evt.ports || !Array.isArray(evt.ports) || !evt.ports.length) {
      console.warn('postMessage not sent over MessageChannel', evt);
      return;
    }
    if (!this.iframeMessageHandlers) {
      console.error('invalid iframe message handler');
      return;
    }

    if (!evt.data.event) {
      console.error('event from iframe does not have the event field', evt);
      return;
    }

    // SECURITY: validate that a message handler is defined as a property
    // and not inherited
    const hasMessageHandler = Object.prototype.hasOwnProperty.call(
      this.iframeMessageHandlers,
      evt.data.event,
    );
    if (!hasMessageHandler) {
      console.error('unknown message in event', evt.data);
      return;
    }

    // calls event handler and dynamically bind this
    this.iframeMessageHandlers[evt.data.event].call(this, evt);
  }

  /**
   * Adds chat bot iframe under the application div container
   * Inits this.iframeElement
   */
  initIframe() {
    const { iframeOrigin, iframeSrcPath } = this.config.iframe;
    if (!iframeOrigin || !iframeSrcPath) {
      return Promise.reject(new Error('invalid iframe url fields'));
    }
    const url = `${iframeOrigin}${iframeSrcPath}`;
    if (!url) {
      return Promise.reject(new Error('invalid iframe url'));
    }
    if (!this.containerElement || !('appendChild' in this.containerElement)) {
      return Promise.reject(new Error('invalid node element to append iframe'));
    }
    let iframeElement = this.containerElement.querySelector('iframe');
    if (iframeElement) {
      return Promise.resolve(iframeElement);
    }

    try {
      iframeElement = document.createElement('iframe');
      iframeElement.setAttribute('src', url);
      iframeElement.setAttribute('frameBorder', '0');
      iframeElement.setAttribute('scrolling', 'no');
      iframeElement.setAttribute('title', 'chatbot');
      // chrome requires this feature policy when using the
      // mic in an cross-origin iframe
      iframeElement.setAttribute('allow', 'microphone');

      this.containerElement.appendChild(iframeElement);
    } catch (err) {
      return Promise
        .reject(new Error(`failed to initialize iframe element ${err}`));
    }

    // assign iframe element
    this.iframeElement = iframeElement;
    return this.waitForIframe(iframeElement)
      .then(() => this.waitForChatBotReady());
  }

  /**
   * Waits for iframe to load
   */
  waitForIframe() {
    const iframeLoadManager = {
      timeoutInMs: 20000,
      timeoutId: null,
      onIframeLoaded: null,
      onIframeTimeout: null,
    };

    return new Promise((resolve, reject) => {
      iframeLoadManager.onIframeLoaded = () => {
        clearTimeout(iframeLoadManager.timeoutId);
        this.iframeElement.removeEventListener(
          'load',
          iframeLoadManager.onIframeLoaded,
          false,
        );

        return resolve();
      };

      iframeLoadManager.onIframeTimeout = () => {
        this.iframeElement.removeEventListener(
          'load',
          iframeLoadManager.onIframeLoaded,
          false,
        );

        return reject(new Error('iframe load timeout'));
      };

      iframeLoadManager.timeoutId = setTimeout(
        iframeLoadManager.onIframeTimeout,
        iframeLoadManager.timeoutInMs,
      );

      this.iframeElement.addEventListener(
        'load',
        iframeLoadManager.onIframeLoaded,
        false,
      );
    });
  }

  /**
   * Wait for the chatbot UI to set isChatBotReady to true
   * isChatBotReady is set by the event handler when the chatbot
   * UI component signals that it has successfully loaded
   */
  waitForChatBotReady() {
    const readyManager = {
      timeoutId: null,
      intervalId: null,
      checkIsChtBotReady: null,
      onConfigEventTimeout: null,
    };

    return new Promise((resolve, reject) => {
      const timeoutInMs = 15000;

      readyManager.checkIsChatBotReady =  () => {
        // isChatBotReady set by event received from iframe
        if (this.isChatBotReady) {
          clearTimeout(readyManager.timeoutId);
          clearInterval(readyManager.intervalId);

          if (this.config.ui.enableLogin && this.config.ui.enableLogin === true) {
            login(this.config).then(() => {
              resolve();
            });
          }
          else {
            resolve();
          }
        }
      };

      readyManager.onConfigEventTimeout = () => {
        clearInterval(readyManager.intervalId);
        return reject(new Error('chatbot loading time out'));
      };

      readyManager.timeoutId =
        setTimeout(readyManager.onConfigEventTimeout, timeoutInMs);

      readyManager.intervalId =
        setInterval(readyManager.checkIsChatBotReady, 500);
    });
  }

  /**
   * Event handler functions for messages from iframe
   * Used by onMessageFromIframe - "this" object is bound dynamically
   */
  initIframeMessageHandlers() {
    this.iframeMessageHandlers = {
      // signals to the parent that the iframe component is loaded and its
      // API handler is ready
      ready(evt) {
        this.isChatBotReady = true;
        evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });
      },

      // requests chatbot UI config
      initIframeConfig(evt) {
        evt.ports[0].postMessage({
          event: 'resolve',
          type: evt.data.event,
          data: this.config,
        });
      },

      // sent when minimize button is pressed within the iframe component
      toggleMinimizeUi(evt) {
        this.toggleMinimizeUiClass()
          .then(() => (
            evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event })
          ))
          .catch((error) => {
            console.error('failed to toggleMinimizeUi', error);
            evt.ports[0].postMessage({
              event: 'reject',
              type: evt.data.event,
              error: 'failed to toggleMinimizeUi',
            });
          });
      },

      // sent when login is requested from iframe
      requestLogin(evt) {
        evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });
        login(this.config);
      },

      // sent when logout is requested from iframe
      requestLogout(evt) {
        logout();
        evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });
        this.sendMessageToIframe({ event: 'confirmLogout' });
      },

      // iframe sends Lex updates based on Lex API responses
      updateLexState(evt) {
        // evt.data will contain the Lex state
        // send resolve ressponse to the chatbot ui
        evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });

        // relay event to parent
        const stateEvent = new CustomEvent('updatelexstate', { detail: evt.data });
        document.dispatchEvent(stateEvent);
      },
    };
  }

  /**
   * Send a message to the iframe using postMessage
   */
  sendMessageToIframe(message) {
    if (!this.iframeElement ||
      !('contentWindow' in this.iframeElement) ||
      !('postMessage' in this.iframeElement.contentWindow)
    ) {
      return Promise.reject(new Error('invalid iframe element'));
    }

    const { iframeOrigin } = this.config.iframe;
    if (!iframeOrigin) {
      return Promise.reject(new Error('invalid iframe origin'));
    }

    return new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (evt) => {
        messageChannel.port1.close();
        messageChannel.port2.close();
        if (evt.data.event === 'resolve') {
          resolve(evt.data);
        } else {
          reject(new Error(`iframe failed to handle message - ${evt.data.error}`));
        }
      };
      this.iframeElement.contentWindow.postMessage(
        message,
        iframeOrigin,
        [messageChannel.port2],
      );
    });
  }

  /**
   * Toggle between showing/hiding chatbot ui
   */
  toggleShowUiClass() {
    try {
      this.containerElement.classList.toggle(`${this.containerClass}--show`);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(new Error(`failed to toggle show UI ${err}`));
    }
  }

  /**
   * Toggle between miminizing and expanding the chatbot ui
   */
  toggleMinimizeUiClass() {
    try {
      this.containerElement.classList.toggle(`${this.containerClass}--minimize`);
      if (this.containerElement.classList.contains(`${this.containerClass}--minimize`)) {
        localStorage.setItem(`${this.config.cognito.appUserPoolClientId}lastUiIsMinimized`, 'true');
      } else {
        localStorage.setItem(`${this.config.cognito.appUserPoolClientId}lastUiIsMinimized`, 'false');
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(new Error(`failed to toggle minimize UI ${err}`));
    }
  }

  /**
   * Shows the iframe
   */
  showIframe() {
    return Promise.resolve()
      .then(() => {
        // check for last state and resume with this configuration
        if (this.config.iframe.shouldLoadIframeMinimized) {
          this.api.toggleMinimizeUi();
          localStorage.setItem(`${this.config.cognito.appUserPoolClientId}lastUiIsMinimized`, 'true');
        } else if (localStorage.getItem(`${this.config.cognito.appUserPoolClientId}lastUiIsMinimized`) && localStorage.getItem(`${this.config.cognito.appUserPoolClientId}lastUiIsMinimized`) === 'true') {
          this.api.toggleMinimizeUi();
        } else if (localStorage.getItem(`${this.config.cognito.appUserPoolClientId}lastUiIsMinimized`) && localStorage.getItem(`${this.config.cognito.appUserPoolClientId}lastUiIsMinimized`) === 'false') {
          this.api.ping();
        }
      })
      // display UI
      .then(() => this.toggleShowUiClass());
  }

  /**
   * Event based API handler
   * Receives `lexWebUiMessage` events from the parent and relays
   * to the iframe using postMessage
   */
  onMessageToIframe(evt) {
    if (!evt || !('detail' in evt) || !evt.detail ||
      !('message' in evt.detail)
    ) {
      return Promise.reject(new Error('malformed message to iframe event'));
    }
    return this.sendMessageToIframe(evt.detail.message);
  }


  /**
   * Inits the parent to iframe API
   */
  initParentToIframeApi() {
    this.api = {
      MESSAGE_TYPE_HUMAN: "human",
      MESSAGE_TYPE_BUTTON: "button",
      ping: () => this.sendMessageToIframe({ event: 'ping' }),
      sendParentReady: () => (
        this.sendMessageToIframe({ event: 'parentReady' })
      ),
      toggleMinimizeUi: () => (
        this.sendMessageToIframe({ event: 'toggleMinimizeUi' })
      ),
      postText: (message, messageType) => (
        this.sendMessageToIframe({event: 'postText', message: message, messageType: messageType})
      ),
      deleteSession: () => (
        this.sendMessageToIframe({ event: 'deleteSession' })
      ),
      startNewSession: () => (
        this.sendMessageToIframe({ event: 'startNewSession' })
      ),
      setSessionAttribute: (key, value) => (
          this.sendMessageToIframe({ event: 'setSessionAttribute', key: key, value: value })
      ),
    };

    return Promise.resolve()
      .then(() => {
        // Add listener for parent to iframe event based API
        document.addEventListener(
          'lexWebUiMessage',
          this.onMessageToIframe.bind(this),
          false,
        );
      })
      // signal to iframe that the parent is ready
      .then(() => this.api.sendParentReady())
      // signal to parent that the API is ready
      .then(() => {
        document.dispatchEvent(new CustomEvent('lexWebUiReady'));
      });
  }
}

export default IframeComponentLoader;