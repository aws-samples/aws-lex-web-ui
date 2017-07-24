<template>
  <v-app id="lex-app" toolbar>
    <page v-once></page>
    <router-view></router-view>
  </v-app>
</template>

<script>
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

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

import Page from '@/components/Page';
import { Loader as LexWebUi } from '@/lex-web-ui';

Vue.use(Vuex);
Vue.use(Vuetify);

const lexWebUi = new LexWebUi();

export default {
  name: 'lex-app',
  store: lexWebUi.store,
  components: { Page },
};
</script>

<style>
@import '../node_modules/roboto-fontface/css/roboto/roboto-fontface.css';
@import '../node_modules/material-design-icons/iconfont/material-icons.css';
@import '../node_modules/vuetify/dist/vuetify.min.css';
#lex-app {
  display: flex;
  height: 100%;
  width: 100%;
}
body, html {
  overflow-y: hidden;
}
</style>
