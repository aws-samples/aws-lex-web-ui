/*
 Copyright 2017-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/**
 * Default DependencyLoader dependencies
 *
 * Loads third-party libraries from CDNs. May want to host your own for production
 *
 * Relative URLs (not starting with http) are prepended with a base URL at run time
 */
export const dependenciesFullPage = {
  script: [
    {
      name: 'AWS',
      url: 'https://sdk.amazonaws.com/js/aws-sdk-2.903.0.js',
      canUseMin: true,
    },
    {
      name: 'Vue',
      url: 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.js',
      canUseMin: true,
    },
    {
      name: 'Vuex',
      url: 'https://unpkg.com/vuex@3.4.0/dist/vuex.js',
      canUseMin: true,
    },
    {
      name: 'Vuetify',
      url: 'https://unpkg.com/vuetify@0.17.7/dist/vuetify.js',
      canUseMin: true,
    },
    {
      name: 'LexWebUi',
      url: './lex-web-ui.js',
      canUseMin: true,
    },
  ],
  css: [
    {
      name: 'roboto-material-icons',
      url: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
    },
    {
      name: 'vuetify',
      url: 'https://unpkg.com/vuetify@0.17.7/dist/vuetify.css',
      canUseMin: true,
    },
    {
      name: 'lex-web-ui',
      url: './lex-web-ui.css',
      canUseMin: true,
    },
    {
      name: 'lex-web-ui-loader',
      url: './lex-web-ui-loader.css',
    },
  ],
};

export const dependenciesIframe = {
  script: [
    {
      name: 'AWS',
      url: 'https://sdk.amazonaws.com/js/aws-sdk-2.903.0.js',
      canUseMin: true,
    },
  ],
  css: [
    {
      name: 'lex-web-ui-loader',
      url: './lex-web-ui-loader.css',
    },
  ],
};
