import 'babel-polyfill';
import { expect } from 'chai';

import Vuex from 'vuex';
import Store from '@/store';
import { config } from '@/config';

/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */

describe('store', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store(Store);
  });

  it('loads the initial config at build time from a JSON file', () => {
    expect(store.state.config, 'state config').to.have.all.key(config);
    expect(store.state.config, 'state config').to.deep.include(config);
  });

  it('inits credentials', (done) => {
    expect(store.state.awsCreds.credentials, 'state credentials')
      .to.be.equal(null);
    store.dispatch('initCredentials')
      .then(() => {
        expect(store.state.awsCreds.credentials, 'state credentials')
          .to.have.any.keys('accessKeyId');
        done();
      })
      .catch(error => done(error));
  });
});
