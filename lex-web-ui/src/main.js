/*
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 */

import Vue from 'vue';
import router from './router';
import LexApp from './LexApp';

/* eslint-disable no-new */
new Vue({
  el: '#lex-app',
  router,
  template: '<LexApp/>',
  components: { LexApp },
});

Vue.config.errorHandler = (err, vm, info) => {
  // eslint-disable-next-line no-console
  console.error('unhandled error in lex-app', err, vm, info);
};
