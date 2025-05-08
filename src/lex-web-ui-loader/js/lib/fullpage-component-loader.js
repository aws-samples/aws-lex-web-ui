/*
 Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/* eslint no-console: ["error", { allow: ["warn", "error", "debug", "info"] }] */
/* global AWS LexWebUi Vue */
import { ConfigLoader } from './config-loader';
import { logout, login, getAuth, getTokens } from './loginutil';

/**
 * Instantiates and mounts the chatbot component
 *
 * Assumes that the LexWebUi and Vue libraries have been loaded in the global
 * scope
 */
export class FullPageComponentLoader {
  /**
   * @param {string} elementId - element ID where the chatbot UI component
   *   will be mounted
   * @param {object} config - chatbot UI config
   */
  constructor({ elementId = 'lex-web-ui', config = {} }) {
    this.elementId = elementId;
    this.config = config;
  }

  generateConfigObj() {
    const config = {
      appUserPoolClientId: this.config.cognito.appUserPoolClientId,
      appDomainName: this.config.cognito.appDomainName,
      appUserPoolIdentityProvider: this.config.cognito.appUserPoolIdentityProvider,
    };
    return config;
  }

  async requestTokens() {
    const tokens = getTokens();
    FullPageComponentLoader.sendMessageToComponent({
      event: 'confirmLogin',
      data: tokens,
    });
  }

  /**
   * Creates Cognito credentials and processes Cognito login if complete
   * Inits AWS credentials. Note that this function calls history.replaceState
   * to remove code grants that appear on the url returned from cognito
   * hosted login. The site does not want to allow the user to attempt to
   * refresh the page using old code grants.
   */
  /* eslint-disable no-restricted-globals */
  initCognitoCredentials() {
    return new Promise((resolve, reject) => {
      login(this.config).then(() => {
        resolve();
      });
    });
  }

  /**
   * Event handler functions for messages from iframe
   * Used by onMessageFromIframe - "this" object is bound dynamically
   */
  initBotMessageHandlers() {
    document.addEventListener('fullpagecomponent', async (evt) => {
      if (evt.detail.event === 'requestLogin') {
        login(this.generateConfigObj());
      } else if (evt.detail.event === 'requestLogout') {
        logout(this.generateConfigObj());
      } else if (evt.detail.event === 'requestTokens') {
        //await this.requestTokens();
      } else if (evt.detail.event === 'pong') {
        console.info('pong received');
      }
    }, false);
  }

  /**
   * Inits the parent to iframe API
   */
  initPageToComponentApi() {
    this.api = {
      ping: () => FullPageComponentLoader.sendMessageToComponent({ event: 'ping' }),
      postText: message => (
        FullPageComponentLoader.sendMessageToComponent({ event: 'postText', message })
      ),
    };
    return Promise.resolve();
  }

  /**
   * Add postMessage event handler to receive messages from iframe
   */
  setupBotMessageListener() {
    return new Promise((resolve, reject) => {
      try {
        this.initBotMessageHandlers();
        resolve();
      } catch (err) {
        console.error(`Could not setup message handlers: ${err}`);
        reject(err);
      }
    });
  }

  isRunningEmbeded() {
    const url = window.location.href;
    this.runningEmbeded = (url.indexOf('lexWebUiEmbed=true') !== -1);
    return (this.runningEmbeded);
  }

  /**
   * Loads the component into the DOM
   * configParam overrides at runtime the chatbot UI config
   */
  load(configParam) {
    const mergedConfig = ConfigLoader.mergeConfig(this.config, configParam);
    mergedConfig.region =
        mergedConfig.region || mergedConfig.cognito.region || mergedConfig.cognito.poolId.split(':')[0] || 'us-east-1';
    this.config = mergedConfig;
    if (this.isRunningEmbeded()) {
      return FullPageComponentLoader.createComponent(mergedConfig)
        .then(lexWebUi => (
          FullPageComponentLoader.mountComponent(this.elementId, lexWebUi)
        ));
    }
    return Promise.all([
      this.initPageToComponentApi(),
      this.initCognitoCredentials(),
      this.setupBotMessageListener(),
    ])
      .then(() => {
        FullPageComponentLoader.createComponent(mergedConfig)
          .then((lexWebUi) => {
            FullPageComponentLoader.mountComponent(this.elementId, lexWebUi);
          });
      });
  }

  /**
   * Send a message to the component
   */
  static sendMessageToComponent(message) {
    return new Promise((resolve, reject) => {
      try {
        const myEvent = new CustomEvent('lexwebuicomponent', { detail: message });
        document.dispatchEvent(myEvent);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Instantiates the LexWebUi component
   *
   * Returns a promise that resolves to the component
   */
  static createComponent(config = {}) {
    return new Promise((resolve, reject) => {
      try {
        const lexWebUi = new LexWebUi.Loader(config);
        return resolve(lexWebUi);
      } catch (err) {
        return reject(new Error(`failed to load LexWebUi: ${err}`));
      }
    });
  }

  /**
   * Mounts the chatbot component in the DOM at the provided element ID
   * Returns a promise that resolves when the component is mounted
   */
  static mountComponent(elId = 'lex-web-ui', lexWebUi) {
    if (!lexWebUi) {
      throw new Error('lexWebUi not set');
    }
    return new Promise((resolve, reject) => {
      let el = document.getElementById(elId);

      // if the element doesn't exist, create a div and append it
      // to the document body
      if (!el) {
        el = document.createElement('div');
        el.setAttribute('id', elId);
        document.body.appendChild(el);
      }

      try {
        const app = lexWebUi.app;
        const lexWebUiComponent =  app.mount(`#${elId}`);
        resolve(lexWebUiComponent);
      } catch (err) {
        reject(new Error(`failed to mount lexWebUi component: ${err}`));
      }
    });
  }
}

export default FullPageComponentLoader;