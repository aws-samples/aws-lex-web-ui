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
 * Entry point for sample application.
 * See lex-web-ui.js for the component entry point.
 */

import Vue from 'vue';
import router from '@/router';
import LexApp from '@/LexApp';

/* eslint-disable no-new */
new Vue({
  el: '#lex-app',
  router,
  template: '<lex-app></lex-app>',
  components: { LexApp },
});

Vue.config.errorHandler = (err, vm, info) => {
  // eslint-disable-next-line no-console
  console.error('unhandled error in lex-app: ', err, vm, info);
};
