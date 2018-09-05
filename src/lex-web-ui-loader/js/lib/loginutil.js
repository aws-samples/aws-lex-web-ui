/* eslint-disable prefer-template, no-console */

import { CognitoAuth } from 'amazon-cognito-auth-js';

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

  const auth = new CognitoAuth(authData);
  auth.userhandler = {
    onSuccess() { console.debug('Sign in success'); },
    onFailure(err) { console.debug('Sign in failure: ' + JSON.stringify(err, null, 2)); },
  };
  return auth;
}

function completeLogin(config) {
  const auth = getAuth(config);
  const curUrl = window.location.href;
  const values = curUrl.split('?');
  const minurl = '/' + values[1];
  try {
    auth.parseCognitoWebResponse(minurl);
    const idToken = auth.getSignInUserSession().getIdToken();
    const accessToken = auth.getSignInUserSession().getAccessToken();
    localStorage.setItem('idtokenjwt', idToken.getJwtToken());
    localStorage.setItem('accesstokenjwt', accessToken.getJwtToken());
    return true;
  } catch (reason) {
    console.debug('failed to parse response: ' + reason);
    console.debug('url was: ' + minurl);
    return false;
  }
}

function completeLogout() {
  localStorage.removeItem('noauth');
  localStorage.removeItem('idtokenjwt');
  localStorage.removeItem('cognitoid');
  localStorage.removeItem('username');
  console.debug('logout complete');
}

function logout(config) {
/* eslint-disable prefer-template, object-shorthand, no-console, prefer-arrow-callback */
  console.log('logout');
  const auth = getAuth(config);
  auth.signOut();
  auth.clearCachedTokensScopes();
}

function login(config) {
  /* eslint-disable prefer-template, object-shorthand, no-console, prefer-arrow-callback */
  const auth = getAuth(config);
  const session = auth.getSignInUserSession();
  if (!session.isValid()) {
    auth.getSession();
  } else {
    completeLogin(config);
  }
}

export { logout, login, completeLogin, completeLogout, getAuth };
