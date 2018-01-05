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
/* global LexWebUi Vue */
import { ConfigLoader } from './config-loader';

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

  /**
   * Loads the component into the DOM
   * configParam overrides at runtime the chatbot UI config
   */
  load(configParam) {
    const mergedConfig = ConfigLoader.mergeConfig(this.config, configParam);

    return FullPageComponentLoader.createComponent(mergedConfig)
      .then(lexWebUi => (
        FullPageComponentLoader.mountComponent(this.elementId, lexWebUi)
      ));
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
