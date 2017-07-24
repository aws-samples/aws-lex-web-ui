/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

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
import { config as defaultConfig } from '@/config';

/**
 * Vue Component
 */
const Component = {
  name: 'lex-web-ui',
  template: '<lex-web></lex-web>',
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
const Plugin = {
  install(VueConstructor, {
    name = '$lexWebUi',
    componentName = 'lex-web-ui',
    awsConfig,
    lexRuntimeClient,
    pollyClient,
    component = AsyncComponent,
    config = defaultConfig,
  }) {
    // values to be added to custom vue property
    const value = {
      awsConfig,
      lexRuntimeClient,
      pollyClient,
      config,
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
  constructor(config) {
    // TODO deep merge configs
    this.config = {
      ...defaultConfig,
      ...config,
    };

    // TODO move this to a function (possibly a reducer)
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
      { IdentityPoolId: this.config.cognito.poolId },
      { region: this.config.region },
    );

    const awsConfig = new AWSConfigConstructor({
      region: this.config.region,
      credentials,
    });

    const lexRuntimeClient = new LexRuntimeConstructor(awsConfig);
    const pollyClient = (this.config.recorder.enable) ?
      new PollyConstructor(awsConfig) : null;

    const VueConstructor = (window.Vue) ? window.Vue : Vue;
    if (!VueConstructor) {
      throw new Error('unable to find Vue');
    }

    const VuexConstructor = (window.Vuex) ? window.Vuex : Vuex;
    if (!VuexConstructor) {
      throw new Error('unable to find Vue');
    }

    // TODO name space store
    this.store = new VuexConstructor.Store(VuexStore);

    VueConstructor.use(Plugin, {
      awsConfig,
      lexRuntimeClient,
      pollyClient,
    });
  }
}
