<template>
  <div id="lex-app">
    <router-view></router-view>
  </div>
</template>

<script>
/*
Copyright 2017-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'vuetify/dist/vuetify.min.css';

import { Loader as LexWebUi } from '@/lex-web-ui';

Vue.use(Vuex);
Vue.use(Vuetify);

const lexWebUi = new LexWebUi();

export default {
  name: 'lex-app',
  store: lexWebUi.store,
};
</script>

<style>
/*@import '../node_modules/roboto-fontface/css/roboto/roboto-fontface.css';*/
@import '../node_modules/material-design-icons/iconfont/material-icons.css';
/*@import '../node_modules/vuetify/dist/vuetify.min.css';*/

</style>
