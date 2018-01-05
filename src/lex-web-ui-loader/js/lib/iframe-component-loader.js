/*
 Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* global AWS */

import { ConfigLoader } from './config-loader';

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
        this.config.parentOrigin || window.location.origin;
    }
    // assign parentOrigin if not found in config
    if (!(this.config.parentOrigin)) {
      this.config.parentOrigin =
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
      .then(() => this.showIframe())
      .catch((err) => {
        console.error(`could not initialize chat bot - ${err}`);
      });
  }

  /**
   * Validate that the config has the expected structure
   */
  static validateConfig(config) {
    const { iframe: iframeConfig } = config;
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
    if (!('parentOrigin' in config && config.parentOrigin)) {
      console.error('missing parentOrigin config field');
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

  /**
   * Creates Cognito credentials
   * Inits this.credentials
   */
  initCognitoCredentials() {
    return new Promise((resolve, reject) => {
      const { poolId: cognitoPoolId } =
        this.config.cognito;
      const region =
        this.config.cognito.region || this.config.region || 'us-east-1';
      if (!cognitoPoolId) {
        return reject(new Error('missing cognito poolId config'));
      }

      if (!('AWS' in window) ||
        !('CognitoIdentityCredentials' in window.AWS)
      ) {
        return reject(new Error('unable to find AWS SDK global object'));
      }

      let credentials;
      try {
        credentials = new AWS.CognitoIdentityCredentials(
          { IdentityPoolId: cognitoPoolId },
          { region },
        );
      } catch (err) {
        reject(new Error(`cognito credentials could not be created ${err}`));
      }

      // get and assign credentials
      return credentials.getPromise()
        .then(() => {
          this.credentials = credentials;
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
      console.warn('postMessage from invalid origin', evt.origin);
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

      readyManager.checkIsChatBotReady = () => {
        // isChatBotReady set by event received from iframe
        if (this.isChatBotReady) {
          clearTimeout(readyManager.timeoutId);
          clearInterval(readyManager.intervalId);
          resolve();
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
   * Get AWS credentials to pass to the chatbot UI
   */
  getCredentials() {
    if (!this.credentials || !('getPromise' in this.credentials)) {
      return Promise.reject(new Error('invalid credentials'));
    }

    return this.credentials.getPromise()
      .then(() => (
        localStorage.setItem('cognitoid', this.credentials.identityId)
      ))
      .then(() => this.credentials);
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

      // requests credentials from the parent
      getCredentials(evt) {
        return this.getCredentials()
          .then(creds => (
            evt.ports[0].postMessage({
              event: 'resolve',
              type: evt.data.event,
              data: creds,
            })
          ))
          .catch((error) => {
            console.error('failed to get credentials', error);
            evt.ports[0].postMessage({
              event: 'reject',
              type: evt.data.event,
              error: 'failed to get credentials',
            });
          });
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
      .then(() => (
        // start minimized if configured accordingly
        (this.config.iframe.shouldLoadIframeMinimized) ?
          this.api.toggleMinimizeUi() :
          Promise.resolve()
      ))
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
      ping: () => this.sendMessageToIframe({ event: 'ping' }),
      sendParentReady: () => (
        this.sendMessageToIframe({ event: 'parentReady' })
      ),
      toggleMinimizeUi: () => (
        this.sendMessageToIframe({ event: 'toggleMinimizeUi' })
      ),
      postText: message => (
        this.sendMessageToIframe({ event: 'postText', message })
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
