import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';

import { Loader as LexWebUi } from '@/lex-web-ui';

/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */

describe('lex-web-ui.js', () => {
  let vm;
  let lexWebUi;

  beforeEach(() => {
    Vue.use(Vuex);

    lexWebUi = new LexWebUi();

    vm = new Vue({
      store: lexWebUi.store,
      template: '<lex-web-ui/>',
    });
  });

  afterEach(() => {
    vm.$destroy();
  });

  it('should initialize $lexWebUi', () => {
    expect(vm, 'vue').to.have.a.property('$lexWebUi')
      .that.is.an('object')
      .that.includes.keys('config', 'awsConfig', 'lexRuntimeClient', 'pollyClient');

    expect(vm.$lexWebUi.awsConfig, '$lexWebUi awsConfig')
      .to.be.an('object')
      .that.includes.keys('credentials', 'region');
  });
});
