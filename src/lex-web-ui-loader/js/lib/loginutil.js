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
const loopKey = `login_util_loop_count`;
const maxLoopCount = 5;

function getLoopCount(config) {
  let loopCount = localStorage.getItem(`${config.appUserPoolClientId}${loopKey}`);
  if (loopCount === undefined || loopCount === null) {
    console.warn(`setting loopcount to string 0`);
    loopCount = "0";
  }
  loopCount = Number.parseInt(loopCount);
  return loopCount;
}

function incrementLoopCount(config) {
  let loopCount = getLoopCount(config)
  localStorage.setItem(`${config.appUserPoolClientId}${loopKey}`, (loopCount + 1).toString());
  console.warn(`loopCount is now ${loopCount + 1}`);
}

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
      localStorage.setItem(`${config.appUserPoolClientId}idtokenjwt`, session.getIdToken().getJwtToken());
      localStorage.setItem(`${config.appUserPoolClientId}accesstokenjwt`, session.getAccessToken().getJwtToken());
      localStorage.setItem(`${config.appUserPoolClientId}refreshtoken`, session.getRefreshToken().getToken());
      const myEvent = new CustomEvent('tokensavailable', { detail: 'initialLogin' });
      document.dispatchEvent(myEvent);
      localStorage.setItem(`${config.appUserPoolClientId}${loopKey}`, "0");
    },
    onFailure(err) {
      console.debug('Sign in failure: ' + JSON.stringify(err, null, 2));
      incrementLoopCount(config);
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

function completeLogout(config) {
  localStorage.removeItem(`${config.appUserPoolClientId}idtokenjwt`);
  localStorage.removeItem(`${config.appUserPoolClientId}accesstokenjwt`);
  localStorage.removeItem(`${config.appUserPoolClientId}refreshtoken`);
  localStorage.removeItem('cognitoid');
  console.debug('logout complete');
  return true;
}

function logout(config) {
/* eslint-disable prefer-template, object-shorthand, prefer-arrow-callback */
  const auth = getAuth(config);
  auth.signOut();
  localStorage.setItem(`${config.appUserPoolClientId}${loopKey}`, "0");
}

const forceLogin = (config) => {
  login(config);
}

function login(config) {
  /* eslint-disable prefer-template, object-shorthand, prefer-arrow-callback */
  if (getLoopCount(config) < maxLoopCount) {
    const auth = getAuth(config);
    const session = auth.getSignInUserSession();
    if (!session.isValid()) {
      auth.getSession();
    }
  } else {
    alert("max login tries exceeded");
    localStorage.setItem(`${config.appUserPoolClientId}${loopKey}`, "0");
  }
}

function refreshLogin(config, token, callback) {
  /* eslint-disable prefer-template, object-shorthand, prefer-arrow-callback */
  if (getLoopCount(config) < maxLoopCount) {
    const auth = getAuth(config);
    auth.userhandler = {
      onSuccess(session) {
        console.debug('Sign in success');
        localStorage.setItem(`${config.appUserPoolClientId}idtokenjwt`, session.getIdToken().getJwtToken());
        localStorage.setItem(`${config.appUserPoolClientId}accesstokenjwt`, session.getAccessToken().getJwtToken());
        localStorage.setItem(`${config.appUserPoolClientId}refreshtoken`, session.getRefreshToken().getToken());
        const myEvent = new CustomEvent('tokensavailable', {detail: 'refreshLogin'});
        document.dispatchEvent(myEvent);
        callback(session);
      },
      onFailure(err) {
        console.debug('Sign in failure: ' + JSON.stringify(err, null, 2));
        callback(err);
      },
    };
    auth.refreshSession(token);
  } else {
    alert("max login tries exceeded");
    localStorage.setItem(loopKey, "0");
  }
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

export { logout, login, forceLogin, completeLogin, completeLogout, getAuth, refreshLogin, isTokenExpired };
