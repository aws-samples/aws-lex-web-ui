/*
Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

/* eslint-disable prefer-template, no-console */

import { CognitoAuth } from 'amazon-cognito-auth-js';

const jwt = require('jsonwebtoken');

function getAuth(config) {
  const rd1 = window.location.protocol + '//' + window.location.hostname + window.location.pathname + '?loggedin=yes';
  const rd2 = window.location.protocol + '//' + window.location.hostname + window.location.pathname + '?loggedout=yes';
  const authData = {
    ClientId: config.appUserPoolClientId, // Your client id here
    AppWebDomain: config.appDomainName,
    TokenScopesArray: ['email', 'openid', 'profile'],
    RedirectUriSignIn: rd1,
    RedirectUriSignOut: rd2,
  };

  if (config.appUserPoolIdentityProvider && config.appUserPoolIdentityProvider.length > 0) {
    authData.IdentityProvider = config.appUserPoolIdentityProvider;
  }

  const auth = new CognitoAuth(authData);
  auth.useCodeGrantFlow();
  auth.userhandler = {
    onSuccess(session) {
      console.debug('Sign in success');
      localStorage.setItem('idtokenjwt', session.getIdToken().getJwtToken());
      localStorage.setItem('accesstokenjwt', session.getAccessToken().getJwtToken());
      localStorage.setItem('refreshtoken', session.getRefreshToken().getToken());
      const myEvent = new CustomEvent('tokensavailable', { detail: 'initialLogin' });
      document.dispatchEvent(myEvent);
    },
    onFailure(err) {
      console.debug('Sign in failure: ' + JSON.stringify(err, null, 2));
    },
  };
  return auth;
}

function completeLogin(config) {
  const auth = getAuth(config);
  const curUrl = window.location.href;
  const values = curUrl.split('?');
  const minurl = '/' + values[1];
  try {
    auth.parseCognitoWebResponse(curUrl);
    return true;
  } catch (reason) {
    console.debug('failed to parse response: ' + reason);
    console.debug('url was: ' + minurl);
    return false;
  }
}

function completeLogout() {
  localStorage.removeItem('idtokenjwt');
  localStorage.removeItem('accesstokenjwt');
  localStorage.removeItem('refreshtoken');
  localStorage.removeItem('cognitoid');
  console.debug('logout complete');
  return true;
}

function logout(config) {
/* eslint-disable prefer-template, object-shorthand, prefer-arrow-callback */
  const auth = getAuth(config);
  auth.signOut();
}

function login(config) {
  /* eslint-disable prefer-template, object-shorthand, prefer-arrow-callback */
  const auth = getAuth(config);
  const session = auth.getSignInUserSession();
  if (!session.isValid()) {
    auth.getSession();
  }
}

function refreshLogin(config, token, callback) {
  /* eslint-disable prefer-template, object-shorthand, prefer-arrow-callback */
  const auth = getAuth(config);
  auth.userhandler = {
    onSuccess(session) {
      console.debug('Sign in success');
      localStorage.setItem('idtokenjwt', session.getIdToken().getJwtToken());
      localStorage.setItem('accesstokenjwt', session.getAccessToken().getJwtToken());
      localStorage.setItem('refreshtoken', session.getRefreshToken().getToken());
      const myEvent = new CustomEvent('tokensavailable', { detail: 'refreshLogin' });
      document.dispatchEvent(myEvent);
      callback(session);
    },
    onFailure(err) {
      console.debug('Sign in failure: ' + JSON.stringify(err, null, 2));
      callback(err);
    },
  };
  auth.refreshSession(token);
}

// return true if a valid token and has expired. return false in all other cases
function isTokenExpired(token) {
  const decoded = jwt.decode(token, { complete: true });
  if (decoded) {
    const now = Date.now();
    const expiration = decoded.payload.exp * 1000;
    if (now > expiration) {
      return true;
    }
  }
  return false;
}

export { logout, login, completeLogin, completeLogout, getAuth, refreshLogin, isTokenExpired };
