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
      name: 'Loader',
      url: './initiate-loader.js',
    },
    {
      name: 'Vue',
      url: './3.5.13_dist_vue.global.prod.js',
      canUseMin: false,
    },
    {
      name: 'Vuex',
      url: './4.1.0_dist_vuex.js',
      canUseMin: true,
    },
    {
      name: 'Vuetify',
      url: './3.8.3_dist_vuetify.js',
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
      url: './material_icons.css',
    },
    {
      name: 'vuetify',
      url: './3.8.3_dist_vuetify.css',
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
  css: [
    {
      name: 'lex-web-ui-loader',
      url: './lex-web-ui-loader.css',
    },
  ],
  script: []
};
