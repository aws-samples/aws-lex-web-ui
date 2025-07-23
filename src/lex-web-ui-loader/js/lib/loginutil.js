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
import { Amplify } from 'aws-amplify'
import { signOut, fetchAuthSession, signInWithRedirect } from '@aws-amplify/auth';

function getAuth(config) {
  const amplifyAuthConfig = {
    auth: {
      user_pool_id:  config.cognito.appUserPoolName || localStorage.getItem('appUserPoolName'),
      aws_region: config.cognito.region || config.region || 'us-east-1',
      user_pool_client_id: config.cognito.appUserPoolClientId || localStorage.getItem('appUserPoolClientId'),
      identity_pool_id: config.cognito.poolId || localStorage.getItem('poolId'),
      unauthenticated_identities_enabled: config.ui.forceLogin ? false : true,   
      oauth: {
        identity_providers: [],
        redirect_sign_in_uri: [
          window.location.protocol + '//' + window.location.hostname + window.location.pathname + '?loggedin=yes'
        ],
        redirect_sign_out_uri: [
          window.location.protocol + '//' + window.location.hostname + window.location.pathname + '?loggedout=yes'
        ],
        response_type: "code",
        scopes: [
          "phone",
          "email",
          "openid",
          "profile",
        ],
        domain: config.cognito.appDomainName
      },   
    },
    version: "1.3"
  };

  Amplify.configure(amplifyAuthConfig);
  return amplifyAuthConfig;
}

async function logout() {
  await signOut();
}

async function login(config) {
  // Always use the login page if the user is forced to authenticate
  if (config.ui.forceLogin) {
    signInRedirect(config);
  }
  // If unauthenticated users are allowed, try to get session
  else {
    getAuth(config);
    const session = await fetchAuthSession();
    return session;
  }
}

async function signInRedirect(config) {
  getAuth(config);
  signInWithRedirect();
}

async function getExistingCredentials() {
  const session = await fetchAuthSession();
  return session;
}

export { logout, login, signInRedirect, getExistingCredentials };
