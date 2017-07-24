import 'babel-polyfill';

import Vuex from 'vuex';
import { config } from '@/config';
import Store from '@/store';

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

  it('inits credentials', () => {
    const creds = { accessKeyId: 'AKI' };
    const getPromise = sinon.stub().resolves(creds);
    const credsStub = { getPromise, accessKeyId: creds.accessKeyId };
    return store.dispatch('initCredentials', credsStub)
      .then(c => (
        // sinon-chai expect
        expect(getPromise, 'getPromise').to.have.been.calledOnce &&
        expect(c, 'credentials').to.have.keys('accessKeyId', 'getPromise')
      ));
  });
});
