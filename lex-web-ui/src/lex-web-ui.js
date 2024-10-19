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
import { CognitoIdentityClient, GetIdCommand, GetCredentialsForIdentityCommand } from '@aws-sdk/client-cognito-identity';
import { LexRuntimeServiceClient } from '@aws-sdk/client-lex-runtime-service';
import { LexRuntimeV2Client } from '@aws-sdk/client-lex-runtime-v2';
import { PollyClient } from '@aws-sdk/client-polly';
import LexWeb from '@/components/LexWeb';
import VuexStore from '@/store';

import { config as defaultConfig, mergeConfig } from '@/config';
import { createApp, defineAsyncComponent } from 'vue';
import { createAppDev } from 'vue/dist/vue.esm-bundler.js';
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
    lexRuntimeClient,
    lexRuntimeV2Client,
    pollyClient,
    component = AsyncComponent,
    config = defaultConfig,
  }) {
    // values to be added to custom vue property
    const value = {
      config,
      awsConfig,
      lexRuntimeClient,
      lexRuntimeV2Client,
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
    let credentials;
    if (mergedConfig.cognito.poolId != '' || localStorage.getItem('poolId')) {
      credentials = this.getCredentials(mergedConfig).then((creds) => {
        return creds;
      });
    }


    const awsConfig = {
      region: mergedConfig.region || mergedConfig.cognito.poolId.split(':')[0] || 'us-east-1',
      credentials,
    };

    const lexRuntimeClient = new LexRuntimeServiceClient(awsConfig);
    const lexRuntimeV2Client = new LexRuntimeV2Client(awsConfig);
    const pollyClient = new PollyClient(awsConfig);

    // /* eslint-disable no-console */
    app.use(Plugin, {
        config: mergedConfig,
        awsConfig,
        lexRuntimeClient,
        lexRuntimeV2Client,
        pollyClient
    });
    this.app = app;
  }

  async getCredentials(context) {
    const region = context.region || context.cognito.poolId.split(':')[0] || 'us-east-1';
    const poolId = context.cognito.poolId || localStorage.getItem('poolId');
    const appUserPoolName = context.cognito.appUserPoolName || localStorage.getItem('appUserPoolName');
    const poolName = `cognito-idp.${region}.amazonaws.com/${appUserPoolName}`;
    const appUserPoolClientId = context.cognito.appUserPoolClientId || localStorage.getItem('appUserPoolClientId')
    const idtoken = localStorage.getItem(`${appUserPoolClientId}idtokenjwt`);
    let logins;
    if (idtoken) {
      logins = {};
      logins[poolName] = idtoken;
      const client = new CognitoIdentityClient({ region });
      const getIdentityId = new GetIdCommand({
        IdentityPoolId: poolId,
        Logins: logins ? logins : {}
      })
      let identityId, getCreds;
      
      try {
        await client.send(getIdentityId)
          .then((res) => {
            identityId = res.IdentityId;
            getCreds = new GetCredentialsForIdentityCommand({
              IdentityId: identityId,
              Logins: logins ? logins : {}
            })
          })
        const res = await client.send(getCreds);
        const creds = res.Credentials;
        const credentials = {
          accessKeyId: creds.AccessKeyId,
          identityId,
          secretAccessKey: creds.SecretKey,
          sessionToken: creds.SessionToken,
          expiration: creds.Expiration,
        };
        return credentials;
      } catch (err) {
        console.log(err)
      }
    } else {
      const credentialProvider = fromCognitoIdentityPool({
        identityPoolId: poolId,
        clientConfig: { region },
      })
      const credentials = credentialProvider()
      return credentials
    }
    

    
  }
}

// comment out for prod build
// if(process.env.NODE_ENV === "development")
// {
//   const lexWeb = new Loader();
//   lexWeb.app.mount('#lex-app');
// }