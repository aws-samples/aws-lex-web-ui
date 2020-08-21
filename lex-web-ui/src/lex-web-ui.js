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
import Vue from 'vue';
import Vuex from 'vuex';
import { Config as AWSConfig, CognitoIdentityCredentials }
  from 'aws-sdk/global';
import LexRuntime from 'aws-sdk/clients/lexruntime';
import Polly from 'aws-sdk/clients/polly';

import LexWeb from '@/components/LexWeb';
import VuexStore from '@/store';

import { config as defaultConfig, mergeConfig } from '@/config';

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
      pollyClient,
    };
    // add custom property to Vue
    // for example, access this in a component via this.$lexWebUi
    Object.defineProperty(VueConstructor.prototype, name, { value });
    // register as a global component
    VueConstructor.component(componentName, component);
  },
};

export const Store = VuexStore;

/**
 * Main Class
 */
export class Loader {
  constructor(config = {}) {
    const mergedConfig = mergeConfig(defaultConfig, config);

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

    if (!AWSConfigConstructor || !CognitoConstructor || !PollyConstructor
        || !LexRuntimeConstructor) {
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
    const pollyClient = (
      typeof mergedConfig.recorder === 'undefined' ||
      (mergedConfig.recorder && mergedConfig.recorder.enable !== false)
    ) ? new PollyConstructor(awsConfig) : null;

    // TODO name space store
    this.store = new VuexConstructor.Store({ ...VuexStore });

    VueConstructor.use(Plugin, {
      config: mergedConfig,
      awsConfig,
      lexRuntimeClient,
      pollyClient,
    });
  }
}
