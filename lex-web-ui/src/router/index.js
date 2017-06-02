/*
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 */

import Vue from 'vue';
import Router from 'vue-router';
import LexWeb from 'components/LexWeb';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LexWeb',
      component: LexWeb,
    },
  ],
});
