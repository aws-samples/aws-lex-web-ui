import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

import { Loader as LexWebUi } from '@/lex-web-ui';

/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */

describe('lex-web-ui.js', () => {
  let vm;
  let lexWebUi;

  beforeEach(() => {
    Vue.use(Vuetify);
    Vue.use(Vuex);

    lexWebUi = new LexWebUi();

    vm = new Vue({
      el: '#lex-web-ui',
      store: lexWebUi.store,
      template: '<v-app toolbar id="lex-web-ui-app"><lex-web-ui/></v-app>',
    });
  });

  it('should initialize $lexWebUi', () => {
    expect(vm, 'vue').to.have.a.property('$lexWebUi')
      .that.is.an('object')
      .that.includes.keys('awsConfig', 'lexRuntimeClient', 'pollyClient');

    expect(vm.$lexWebUi.awsConfig, '$lexWebUi awsConfig')
      .to.be.an('object')
      .that.includes.keys('credentials', 'region');
  });
});
