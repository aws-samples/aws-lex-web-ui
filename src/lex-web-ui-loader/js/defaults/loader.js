/*
 Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/**
 * Default options and config structure
 *
 * NOTE: you probably don't want to be making config changes here but rather
 * use the config loader to override the defaults
 */

/**
 * Default loader options
 * Apply both to iframe and full page
 */
export const options = {
  // base URL to be prepended to relative URLs of dependencies
  // if left empty, a relative path will still be used
  baseUrl: '/',

  // time to wait for config event
  configEventTimeoutInMs: 10000,

  // URL to download config JSON file
  // uses baseUrl if set as a relative URL (not starting with http)
  configUrl: './lex-web-ui-loader-config.json',

  // controls whether the local config should be ignored when running
  // embedded (e.g. iframe) in which case the parent page will pass the config
  // Only the parentOrigin config field is kept when set to true
  shouldIgnoreConfigWhenEmbedded: true,

  // controls whether the config should be obtained using events
  shouldLoadConfigFromEvent: false,

  // controls whether the config should be downloaded from `configUrl`
  shouldLoadConfigFromJsonFile: true,

  // controls whether the config should be downloaded from Mobile Hub aws-config.js
  shouldLoadConfigFromMobileHubFile: true,

  // Controls if it should load minimized production dependecies
  // set to true for production
  // NODE_ENV is injected at build time by webpack DefinePlugin
  shouldLoadMinDeps: (process.env.NODE_ENV === 'production'),
};

/**
 * Default full page specific loader options
 */
export const optionsFullPage = {
  ...options,

  // DOM element ID where the chatbot UI will be mounted
  elementId: 'lex-web-ui-fullpage',
};

/**
 * Default iframe specific loader options
 */
export const optionsIframe = {
  ...options,

  // DOM element ID where the chatbot UI will be mounted
  elementId: 'lex-web-ui-iframe',

  // div container class to insert iframe
  containerClass: 'lex-web-ui-iframe',

  // iframe source path. this is appended to the iframeOrigin
  // must use the LexWebUiEmbed=true query string to enable embedded mode
  iframeSrcPath: '/index.html#/?lexWebUiEmbed=true',
};
