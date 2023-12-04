import "./init"
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

import * as Vue from 'vue';
import * as Vuex from 'vuex';
import { Config as AWSConfig, CognitoIdentityCredentials }
  from 'aws-sdk/global';
import * as LexRuntime from 'aws-sdk/clients/lexruntime';
import * as LexRuntimeV2 from 'aws-sdk/clients/lexruntimev2';
import * as Polly from 'aws-sdk/clients/polly';

import LexWeb from './components/LexWeb.vue';
import VuexStore from './store';

import { config as defaultConfig, mergeConfig } from './config';

const app = createApp(App)

/**
 * Vue Component
 */
const Component = {
  name: 'lex-web-ui',
  template: '<lex-web v-on="$listeners"></lex-web>',
  components: { LexWeb },
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
const AsyncComponent = ({
  component = Promise.resolve(Component),
  loading = loadingComponent,
  error = errorComponent,
  delay = 200,
  timeout = 10000,
}) => ({
  // must be a promise
  component,
  // A component to use while the async component is loading
  loading,
  // A component to use if the load fails
  error,
  // Delay before showing the loading component. Default: 200ms.
  delay,
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: 10000ms.
  timeout,
});

/**
 * Vue Plugin
 */
export const Plugin = {
  install(VueConstructor, {
    name = '$lexWebUi',
    componentName = 'lex-web-ui',
    awsConfig,
    lexRuntimeClient,
    lexRuntimeV2Client,
    pollyClient,
    component = AsyncComponent,
    config = defaultConfig,
  }) {
    if (name in VueConstructor) {
      console.warn('plugin should only be used once');
    }
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
    Object.defineProperty(app.config.globalProperties, name, { value });
    // register as a global component
    VueConstructor.component(componentName, component);
  },
};

export const Store = VuexStore;
const mergedConfig = mergeConfig(defaultConfig,  {});

const VueConstructor = (window.Vue) ? window.Vue : Vue;
if (!VueConstructor) {
  throw new Error('unable to find Vue');
}

const VuexConstructor = (window.Vuex) ? window.Vuex : Vuex;
if (!VuexConstructor) {
  throw new Error('unable to find Vuex');
}

const AWSConfigConstructor = (window.AWS && window.AWS.Config) ?
  window.AWS.Config :
  AWSConfig;

const CognitoConstructor =
  (window.AWS && window.AWS.CognitoIdentityCredentials) ?
    window.AWS.CognitoIdentityCredentials :
    CognitoIdentityCredentials;

const PollyConstructor = (window.AWS && window.AWS.Polly) ?
  window.AWS.Polly :
  Polly;

const LexRuntimeConstructor = (window.AWS && window.AWS.LexRuntime) ?
  window.AWS.LexRuntime :
  LexRuntime;

const LexRuntimeConstructorV2 = (window.AWS && window.AWS.LexRuntimeV2) ?
  window.AWS.LexRuntimeV2 :
  LexRuntimeV2;

if (!AWSConfigConstructor || !CognitoConstructor || !PollyConstructor
    || !LexRuntimeConstructor || !LexRuntimeConstructorV2) {
  throw new Error('unable to find AWS SDK');
}

const credentials = new CognitoConstructor(
  { IdentityPoolId: mergedConfig.cognito.poolId },
  { region: mergedConfig.region || mergedConfig.cognito.poolId.split(':')[0] || 'us-east-1' },
);

const awsConfig = new AWSConfigConstructor({
  region: mergedConfig.region || mergedConfig.cognito.poolId.split(':')[0] || 'us-east-1',
  credentials,
});

const lexRuntimeClient = new LexRuntimeConstructor(awsConfig);
const lexRuntimeV2Client = new LexRuntimeConstructorV2(awsConfig);
/* eslint-disable no-console */
const pollyClient = (
  typeof mergedConfig.recorder === 'undefined' ||
  (mergedConfig.recorder && mergedConfig.recorder.enable !== false)
) ? new PollyConstructor(awsConfig) : null;

const store = new VuexConstructor.Store({ ...VuexStore });

app.use(vuetify)
app.use(router)
app.use(store)
app.use(Plugin, {
  config: mergedConfig,
  awsConfig,
  lexRuntimeClient,
  lexRuntimeV2Client,
  pollyClient,
})
app.mount('#app')
