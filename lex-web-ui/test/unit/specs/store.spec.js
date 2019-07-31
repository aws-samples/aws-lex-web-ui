import 'babel-polyfill';

import Vue from 'vue';
import Vuex from 'vuex';
import { config } from '@/config';
import Store from '@/store';

/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */

describe('store', () => {
  let store;
  let vm;

  beforeEach(() => {
    store = new Vuex.Store({ ...Store });
    vm = new Vue({
      store,
    });
  });

  afterEach(() => {
    vm.$destroy();
  });

  it('loads the initial config at build time from a JSON file', () => {
    expect(vm.$store.state.config, 'state config').to.have.all.key(config);
    expect(vm.$store.state.config, 'state config').to.deep.include(config);
  });

  it('inits credentials', () => {
    const creds = { accessKeyId: 'AKI' };
    const getPromise = sinon.stub().resolves(creds);
    const credsStub = { getPromise, ...creds };

    return vm.$store.dispatch('initCredentials', credsStub)
      .then((c) => {
        // sinon-chai expect
        expect(getPromise, 'getPromise').to.have.callCount(1);
        expect(c, 'credentials').to.have.keys('accessKeyId', 'getPromise');
      });
  });
});
