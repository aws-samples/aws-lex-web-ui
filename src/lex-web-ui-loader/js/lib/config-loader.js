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
/* global aws_bots_config aws_cognito_identity_pool_id aws_cognito_region */

import { options as defaultOptions } from '../defaults/loader';

/**
 * Config loader class
 *
 * Loads the chatbot UI config from the following sources in order of precedence:
 * (lower overrides higher):
 *   1. parameter passed to load()
 *   2. Event (loadlexconfig)
 *   3. Mobile HUB
 *   4. JSON file
 *   TODO implement passing config in url param
 */

export class ConfigLoader {
  constructor(options = defaultOptions) {
    this.options = options;
    this.config = {};
  }

  /**
   * Loads the config from the supported the sources
   *
   * Config is sequentially merged
   *
   * Returns a promise that resolves to the merged config
   */
  load(configParam = {}) {
    return Promise.resolve()
      // json file
      .then(() => {
        if (this.options.shouldLoadConfigFromJsonFile) {
          // append baseUrl to config if it's relative
          const url = (this.options.configUrl.match('^http')) ?
            this.options.configUrl :
            `${this.options.baseUrl}${this.options.configUrl}`;
          return ConfigLoader.loadJsonFile(url);
        }
        return Promise.resolve({});
      })
      // mobile hub
      .then(mergedConfigFromJson => (
        (this.options.shouldLoadConfigFromMobileHubFile) ?
          ConfigLoader.mergeMobileHubConfig(mergedConfigFromJson) :
          Promise.resolve(mergedConfigFromJson)
      ))
      // event
      .then(mergedConfigFromMobileHub => (
        (this.options.shouldLoadConfigFromEvent) ?
          ConfigLoader.loadConfigFromEvent(
            mergedConfigFromMobileHub,
            this.options.configEventTimeoutInMs,
          ) :
          Promise.resolve(mergedConfigFromMobileHub)
      ))
      // filter config when running embedded
      .then(mergedConfigFromEvent => (
        this.filterConfigWhenEmedded(mergedConfigFromEvent)
      ))
      // merge config from parameter
      .then(config => (ConfigLoader.mergeConfig(config, configParam)));
  }

  /**
   * Loads the config from a JSON file URL
   */
  static loadJsonFile(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'json';
      xhr.onerror = () => (
        reject(new Error(`error getting chatbot UI config from url: ${url}`))
      );
      xhr.onload = () => {
        if (xhr.status !== 200) {
          const err = `failed to get chatbot config with status: ${xhr.status}`;
          return reject(new Error(err));
        }
        // ie11 does not support responseType
        if (typeof xhr.response === 'string') {
          try {
            const parsedResponse = JSON.parse(xhr.response);
            return resolve(parsedResponse);
          } catch (err) {
            return reject(new Error('failed to decode chatbot UI config object'));
          }
        }
        return resolve(xhr.response);
      };
      xhr.send();
    });
  }

  /**
   * Merges config with Mobile Hub variables
   *
   * Grabs the Cognito Pool Id and Bot name from the
   * aws_cognito_identity_pool_id and aws_bots_config global variables.
   * These variables are normally set by the 'aws-config.js' script.
   *
   * Returns a promise that resolves to the merge between the
   * Mobile Hub variables and the config parameter
   */
  static mergeMobileHubConfig(config) {
    // these values come from the AWS Mobile Hub generated aws-config.js
    // eslint-disable-next-line camelcase
    if (!aws_cognito_identity_pool_id || !aws_bots_config) {
      return Promise.resolve(config);
    }

    return new Promise((resolve, reject) => {
      let botName = '';
      let botRegion = '';

      try {
        const botsConfig = JSON.parse(aws_bots_config);
        botName = botsConfig[0].name;
        botRegion = botsConfig[0].region;
      } catch (err) {
        return reject(new Error('failed to parse mobile hub aws_bots_config'));
      }

      const mobileHubConfig = {
        cognito: {
          poolId: aws_cognito_identity_pool_id,
          // eslint-disable-next-line camelcase
          region: aws_cognito_region || 'us-east-1',
        },
        lex: { botName },
        region: botRegion || 'us-east-1',
      };

      const mergedConfig = ConfigLoader.mergeConfig(config, mobileHubConfig);

      return resolve(mergedConfig);
    });
  }

  /**
   * Loads dynamic bot config from an event
   * Merges it with the config passed as parameter
   */
  static loadConfigFromEvent(config, timeoutInMs = 10000) {
    const eventManager = {
      intervalId: null,
      timeoutId: null,
      onConfigEventLoaded: null,
      onConfigEventTimeout: null,
    };

    return new Promise((resolve, reject) => {
      eventManager.onConfigEventLoaded = (evt) => {
        clearTimeout(eventManager.timeoutId);
        clearInterval(eventManager.intervalId);
        document.removeEventListener('loadlexconfig', eventManager.onConfigEventLoaded, false);

        if (evt && ('detail' in evt) && evt.detail && ('config' in evt.detail)) {
          const evtConfig = evt.detail.config;
          const mergedConfig = ConfigLoader.mergeConfig(config, evtConfig);
          return resolve(mergedConfig);
        }
        return reject(new Error('malformed config in event'));
      };

      eventManager.onConfigEventTimeout = () => {
        clearInterval(eventManager.intervalId);
        document.removeEventListener('loadlexconfig', eventManager.onConfigEventLoaded, false);
        return reject(new Error('config event timed out'));
      };

      eventManager.timeoutId = setTimeout(eventManager.onConfigEventTimeout, timeoutInMs);
      document.addEventListener('loadlexconfig', eventManager.onConfigEventLoaded, false);

      // signal that we are ready to receive the dynamic config
      // on an interval of 1/2 a second
      eventManager.intervalId = setInterval(() => (
        document.dispatchEvent(new CustomEvent('receivelexconfig'))
      ), 500);
    });
  }

  /**
   * Ignores most fields when running embeded and the
   * shouldIgnoreConfigWhenEmbedded is set to true
   */
  filterConfigWhenEmedded(config) {
    const url = window.location.href;
    // when shouldIgnoreConfigEmbedded is true
    // ignore most of the config with the exception of the parentOrigin and region
    const parentOrigin = config.ui && config.ui.parentOrigin;
    if (this.options &&
      this.options.shouldIgnoreConfigWhenEmbedded &&
      url.indexOf('lexWebUiEmbed=true') !== -1) {
      return {
        ui: { parentOrigin },
        region: config.region,
        cognito: { region: config.cognito.region },
      };
    }
    return config;
  }

  /**
   * Merges config objects. The initial set of keys to merge are driven by
   * the baseConfig. The srcConfig values override the baseConfig ones
   * unless the srcConfig value is empty
   */
  static mergeConfig(baseConfig, srcConfig = {}) {
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

    if (isEmpty(srcConfig)) {
      return { ...baseConfig };
    }

    // use the baseConfig first level keys as the base for merging
    return Object.keys(baseConfig)
      .map((key) => {
        const mergedConfig = {};
        let value = baseConfig[key];
        // merge from source if its value is not empty
        if (key in srcConfig && !isEmpty(srcConfig[key])) {
          value = (typeof baseConfig[key] === 'object') ?
            // recursively merge sub-objects in both directions
            {
              ...ConfigLoader.mergeConfig(srcConfig[key], baseConfig[key]),
              ...ConfigLoader.mergeConfig(baseConfig[key], srcConfig[key]),
            } :
            srcConfig[key];
        }
        mergedConfig[key] = value;
        return mergedConfig;
      })
      // merge key values back into a single object
      .reduce((merged, configItem) => ({ ...merged, ...configItem }), {});
  }
}

export default ConfigLoader;
