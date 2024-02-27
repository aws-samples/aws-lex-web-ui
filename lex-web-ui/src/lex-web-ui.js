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
 * Entry point to the lex-web-ui Vue plugin
 * Exports Loader as the plugin constructor
 * and Store as store that can be used with Vuex.Store()
 */
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import Polly from 'aws-sdk/clients/polly';

import LexWeb from '@/components/LexWeb';
import VuexStore from '@/store';

import { config as defaultConfig, mergeConfig } from '@/config';
import { createApp, defineAsyncComponent } from 'vue';
import { aliases, md } from 'vuetify/iconsets/md';
import { createStore } from 'vuex';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/lib/util/colors'

const defineAsyncComponentInstance = (window.Vue) ? window.Vue.defineAsyncComponent : defineAsyncComponent;
/**
 * Vue Component
 */
const Component = {
  name: 'lex-web-ui',
  template: '<lex-web></lex-web>',
  components: { LexWeb },
};

export const testComponent = {
  template: '<div>I am async!</div>',
};
const loadingComponent = {
  template: '<p>Loading. Please wait...</p>',
};
const errorComponent = {
  template: '<p>An error ocurred...</p>',
};

/**
 * Vue Asynchonous Component
 */
export const AsyncComponent = defineAsyncComponentInstance({
  loader: () => Promise.resolve(Component),
  delay: 200,
  timeout: 10000,
  errorComponent: errorComponent,
  loadingComponent: loadingComponent
})

/**
 * Vue Plugin
 */
export const Plugin = {
  install(app, {
    name = '$lexWebUi',
    componentName = 'lex-web-ui',
    awsConfig,
    pollyClient,
    component = AsyncComponent,
    config = defaultConfig,
  }) {
    // values to be added to custom vue property
    const value = {
      config,
      awsConfig,
      pollyClient,
    };
    // add custom property to Vue
    // for example, access this in a component via this.$lexWebUi
    app.config.globalProperties[name] = value;
    // register as a global component
    app.component(componentName, component);
  },
};

export const Store = VuexStore;

/**
 * Main Class
 */
export class Loader {
  constructor(config = {}) {
    const createAppInstance = (window.Vue) ? window.Vue.createApp : createApp;
    const vuexCreateStore = (window.Vuex) ? window.Vuex.createStore : createStore;    
    
    const vuetify = createVuetify({
      components,
      directives,
      icons: {
        defaultSet: 'md',
        aliases,
        sets: {
          md,
        },
      },
      theme: {
        themes: {
          light: {
            colors: {
              primary: colors.blue.darken2,
              secondary: colors.grey.darken3,
              accent: colors.blue.accent1,
              error: colors.red.accent2,
              info: colors.blue.base,
              success: colors.green.base,
              warning: colors.orange.darken1,
            },
          },
          dark: {
            colors: {
              primary: colors.blue.base,
              secondary: colors.grey.darken3,
              accent: colors.pink.accent1,
              error: colors.red.accent2,
              info: colors.blue.base,
              success: colors.green.base,
              warning: colors.orange.darken1,
            },
          },
        },
      }
    })
    
    const app = createAppInstance({
      template: '<div id="lex-web-ui"><lex-web-ui/></div>',
    })

    app.use(vuetify)
    const store = vuexCreateStore(VuexStore)
    this.store = store
    app.use(store)
    this.app = app;

    const mergedConfig = mergeConfig(defaultConfig, config);

    const PollyConstructor = (window.AWS && window.AWS.Polly) ?
      window.AWS.Polly :
      Polly;
    
    let credentials;
    if (mergedConfig.cognito.poolId != '') {
      credentials = this.getCredentials(mergedConfig).then((creds) => {
        return creds;
      });
    }

    const AWSConfigConstructor = {
      region: mergedConfig.region || mergedConfig.cognito.poolId.split(':')[0] || 'us-east-1',
      credentials,
    };

    // /* eslint-disable no-console */
    const pollyClient = (
      typeof mergedConfig.recorder === 'undefined' ||
      (mergedConfig.recorder && mergedConfig.recorder.enable !== false)
    ) ? new PollyConstructor(AWSConfigConstructor) : null;

    app.use(Plugin, {
        config: mergedConfig,
        awsConfig: AWSConfigConstructor,
        pollyClient,
    });
    this.app = app;
  }

  async getCredentials(context) {
    const credentialProvider = fromCognitoIdentityPool({
      identityPoolId: context.cognito.poolId,
      clientConfig: { region: context.region || context.cognito.poolId.split(':')[0] || 'us-east-1'},
    })
    const credentials = credentialProvider()
    return credentials
  }
}

if(process.env.NODE_ENV === "development")
{
  const lexWeb = new Loader();
  lexWeb.app.mount('#lex-app');
}