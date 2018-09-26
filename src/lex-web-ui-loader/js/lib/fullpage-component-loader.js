/*
 Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/* eslint no-console: ["error", { allow: ["warn", "error", "debug"] }] */
/* global AWS LexWebUi Vue $ */
import { ConfigLoader } from './config-loader';
import { logout, login, completeLogin, completeLogout, getAuth } from './loginutil';

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

  requestTokens() {
    const existingAuth = getAuth(this.generateConfigObj());
    const existingSession = existingAuth.getSignInUserSession();
    if (existingSession.isValid()) {
      const tokens = {};
      tokens.idtokenjwt = localStorage.getItem('idtokenjwt');
      tokens.accesstokenjwt = localStorage.getItem('accesstokenjwt');
      tokens.refreshtoken = localStorage.getItem('refreshtoken');
      FullPageComponentLoader.sendMessageToComponent({
        event: 'confirmLogin',
        data: tokens,
      });
    }
  }

  /**
   * Creates Cognito credentials and processes Cognito login if complete
   * Inits this.credentials
   */
  initCognitoCredentials() {
    return new Promise((resolve, reject) => {
      const curUrl = window.location.href;
      if (curUrl.indexOf('loggedin') >= 0) {
        if (completeLogin(this.generateConfigObj())) {
          const auth = getAuth(this.generateConfigObj());
          const session = auth.getSignInUserSession();
          if (session.isValid()) {
            const tokens = {};
            tokens.idtokenjwt = localStorage.getItem('idtokenjwt');
            tokens.accesstokenjwt = localStorage.getItem('accesstokenjwt');
            tokens.refreshtoken = localStorage.getItem('refreshtoken');
            FullPageComponentLoader.sendMessageToComponent({
              event: 'confirmLogin',
              data: tokens,
            });
          }
        }
      } else if (curUrl.indexOf('loggedout') >= 0) {
        if (completeLogout(this.generateConfigObj())) {
          FullPageComponentLoader.sendMessageToComponent({ event: 'confirmLogout' });
        }
      }
      const { poolId: cognitoPoolId } =
        this.config.cognito;
      const region =
        this.config.cognito.region || this.config.region || 'us-east-1';
      const poolName = `cognito-idp.us-east-1.amazonaws.com/${this.config.cognito.appUserPoolName}`;
      if (!cognitoPoolId) {
        return reject(new Error('missing cognito poolId config'));
      }

      if (!('AWS' in window) ||
        !('CognitoIdentityCredentials' in window.AWS)
      ) {
        return reject(new Error('unable to find AWS SDK global object'));
      }

      let credentials;
      const idtoken = localStorage.getItem('idtokenjwt');
      if (idtoken) { // auth role since logged in
        try {
          const logins = {};
          logins[poolName] = idtoken;
          credentials = new AWS.CognitoIdentityCredentials(
            { IdentityPoolId: cognitoPoolId },
            { region },
          );
        } catch (err) {
          reject(new Error(`cognito auth credentials could not be created ${err}`));
        }
      } else { // noauth role
        try {
          credentials = new AWS.CognitoIdentityCredentials(
            { IdentityPoolId: cognitoPoolId },
            { region },
          );
        } catch (err) {
          reject(new Error(`cognito noauth credentials could not be created ${err}`));
        }
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
   * Event handler functions for messages from iframe
   * Used by onMessageFromIframe - "this" object is bound dynamically
   */
  initBotMessageHandlers() {
    $(document).on('fullpagecomponent', (evt) => {
      if (evt.detail.event === 'requestLogin') {
        login(this.generateConfigObj());
      } else if (evt.detail.event === 'requestLogout') {
        logout(this.generateConfigObj());
      } else if (evt.detail.event === 'requestTokens') {
        this.requestTokens();
      }
    });
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
    this.config = mergedConfig;
    if (this.isRunningEmbeded()) {
      return FullPageComponentLoader.createComponent(mergedConfig)
        .then(lexWebUi => (
          FullPageComponentLoader.mountComponent(this.elementId, lexWebUi)
        ));
    }
    return Promise.all([
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
        const LexWebUiComponent = Vue.extend({
          store: lexWebUi.store,
          template: '<div id="lex-web-ui"><lex-web-ui/></div>',
        });

        // mounts off-document
        const lexWebUiComponent = new LexWebUiComponent().$mount();
        // replace existing element
        el.parentNode.replaceChild(lexWebUiComponent.$el, el);
        resolve(lexWebUiComponent);
      } catch (err) {
        reject(new Error(`failed to mount lexWebUi component: ${err}`));
      }
    });
  }
}

export default FullPageComponentLoader;
