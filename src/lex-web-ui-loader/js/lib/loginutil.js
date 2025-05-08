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
import { Hub } from "aws-amplify/utils";

const getCurrentUser = async () => {
  return await fetchAuthSession();
};

Hub.listen("auth", ({ payload }) => {
  switch (payload.event) {
    case "signInWithRedirect":
      const session = getCurrentUser();
      console.log("id token", session.credentials.accessKeyId)
      break;
    case "signInWithRedirect_failure":
      // handle sign in failure
      break;
    case "customOAuthState":
      const state = payload.data; // this will be customState provided on signInWithRedirect function
      console.log(state);
      break;
  }
});
import { Amplify } from 'aws-amplify'
import { signOut, fetchAuthSession, signInWithRedirect } from '@aws-amplify/auth';
import { Hub } from "aws-amplify/utils";

const getCurrentUser = async () => {
  return await fetchAuthSession();
};

Hub.listen("auth", ({ payload }) => {
  switch (payload.event) {
    case "signInWithRedirect":
      const session = getCurrentUser();
      console.log("id token", session.credentials.accessKeyId)
      break;
    case "signInWithRedirect_failure":
      // handle sign in failure
      break;
    case "customOAuthState":
      const state = payload.data; // this will be customState provided on signInWithRedirect function
      console.log(state);
      break;
  }
});

function getAuth(config) {
  const amplifyAuthConfig = {
    auth: {
      user_pool_id:  config.cognito.appUserPoolName || localStorage.getItem('appUserPoolName'),
      aws_region: config.cognito.region || config.region || 'us-east-1',
      user_pool_client_id: config.cognito.appUserPoolClientId || localStorage.getItem('appUserPoolClientId'),
      identity_pool_id: config.cognito.poolId || localStorage.getItem('poolId'),
      unauthenticated_identities_enabled: config.ui.forceLogin ? false : true
    },
    version: "1.3"
  };

  Amplify.configure(amplifyAuthConfig);
  return amplifyAuthConfig;
}

async function completeLogin(config) {
  try {
    await fetchAuthSession();
    return true;
  } catch (reason) {
    console.debug('failed to parse response: ' + reason);
    return false;
  }
}

async function getTokens() {
  try {
    const sesssion = await fetchAuthSession();
    return sesssion.credentials;
  } catch (reason) {
    console.debug('failed to parse response: ' + reason);
    return null;
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

async function logout() {
  await signOut();
}

const forceLogin = (config) => {
  login(config);
}

async function login(config) {
  getAuth(config);
  const session = await fetchAuthSession();
  if (session.credentials) {
    console.log("id token", session.credentials.accessKeyId);
  }
  else {
    console.log("no valid user");
    signInWithRedirect();
  }
}

export { logout, login, forceLogin, completeLogin, completeLogout, getAuth, getTokens };
