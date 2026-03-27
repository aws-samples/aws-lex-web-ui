/*
Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

/**
 * Credentials and Auth Token Actions
 */

import { jwtDecode } from "jwt-decode";
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { CognitoIdentityClient, GetIdCommand, GetCredentialsForIdentityCommand } from '@aws-sdk/client-cognito-identity';
import shared from './shared-state';

export default {
  /***********************************************************************
   *
   * Credentials Actions
   *
   **********************************************************************/

  getCredentialsFromParent(context, region) {
    const expireTime = (shared.awsCredentials && shared.awsCredentials.expireTime) ?
      shared.awsCredentials.expireTime : 0;
    const credsExpirationDate = new Date(expireTime).getTime();
    const now = Date.now();
    if (credsExpirationDate > now) {
      return Promise.resolve(shared.awsCredentials);
    }
    return context.dispatch('sendMessageToParentWindow', { event: 'getCredentials' })
      .then((credsResponse) => {
        if (credsResponse.event === 'resolve' &&
            credsResponse.type === 'getCredentials') {
          return Promise.resolve(credsResponse.data);
        }
        const error = new Error('invalid credential event from parent');
        return Promise.reject(error);
      })
      .then((creds) => {
        const { accessKeyId, identityId, secretAccessKey, sessionToken, expiration } = creds;
        // recreate as a static credential
        shared.awsCredentials = Promise.resolve({
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKey,
          sessionToken: sessionToken,
          identityId: identityId,
          expiration: expiration,
        });
        
        if (shared.lexClient) {
          shared.lexClient.refreshClient(region, shared.awsCredentials);
        }

        return shared.awsCredentials;
      });
  },
  async getCredentials(context, config) {
    if (shared.refreshCredentials) {
      const region = config.cognito.region || config.region || 'us-east-1';
      
      if (context.state.awsCreds.provider === 'parentWindow') {
        return context.dispatch('getCredentialsFromParent', region);
      }
      
      const poolId = config.cognito.poolId || localStorage.getItem('poolId');
      const appUserPoolName = config.cognito.appUserPoolName || localStorage.getItem('appUserPoolName');
      const appUserPoolClientId = config.cognito.appUserPoolClientId || localStorage.getItem('appUserPoolClientId');
      const idToken = config.lex.sessionAttributes.idtokenjwt || localStorage.getItem(`${appUserPoolClientId}idtokenjwt`);

      if (idToken) {
        shared.logins = {};
        shared.logins[`cognito-idp.${region}.amazonaws.com/${appUserPoolName}`] = idToken;
        const client = new CognitoIdentityClient({ region });
        const getIdentityId = new GetIdCommand({
          IdentityPoolId: poolId,
          Logins: shared.logins ? shared.logins : {}
        })
        let getCreds;
        try {
          await client.send(getIdentityId)
            .then((res) => {
              shared.identityId = res.IdentityId;
              getCreds = new GetCredentialsForIdentityCommand({
                IdentityId: shared.identityId,
                Logins: shared.logins ? shared.logins : {}
              })
            })
          const res = await client.send(getCreds);
          const creds = res.Credentials;
          const credentials = {
            accessKeyId: creds.AccessKeyId,
            identityId: shared.identityId,
            secretAccessKey: creds.SecretKey,
            sessionToken: creds.SessionToken,
            expiration: creds.Expiration,
          };
          shared.awsCredentials = credentials;
          if (shared.lexClient) {
            shared.lexClient.refreshClient(region, credentials);
          }
          return credentials;
        } catch (err) {
          console.log(err)
        }
      } else {
        const credentialProvider = fromCognitoIdentityPool({
          identityPoolId: poolId,
          clientConfig: { region },
        })
        shared.awsCredentials = credentialProvider();
        if (shared.lexClient) {
          shared.lexClient.refreshClient(region, shared.awsCredentials);
        }
        return shared.awsCredentials;
      }
    }
  },
  checkCredentialsForRefresh() {
    if (shared.awsCredentials) {
      Promise.resolve(shared.awsCredentials).then((res) => {
        if (res.expiration) {
          const expiration = new Date(res.expiration).getTime();
          const now = Date.now();
          // calculate and expiration time 5 minutes sooner and adjust to milliseconds
          // to compare with now.
          const expirationTime = (expiration - (5 * 60 * 1000));
          if (now > expirationTime) {
            shared.refreshCredentials = true;
            return Promise.resolve();
          }
        }
      });
    }
    shared.refreshCredentials = false;
    return Promise.resolve();
  },

  /***********************************************************************
   *
   * Auth Token Actions
   *
   **********************************************************************/

  refreshAuthTokensFromParent(context) {
    return context.dispatch('sendMessageToParentWindow', { event: 'refreshAuthTokens' })
      .then((tokenResponse) => {
        if (tokenResponse.event === 'resolve' &&
          tokenResponse.type === 'refreshAuthTokens') {
          return Promise.resolve(tokenResponse.data);
        }
        if (context.state.isRunningEmbedded) {
          const error = new Error('invalid refresh token event from parent');
          return Promise.reject(error);
        }
        return Promise.resolve('outofbandrefresh');
      })
      .then((tokens) => {
        if (context.state.isRunningEmbedded) {
          context.commit('setTokens', tokens);
        }
        return Promise.resolve();
      });
  },
  async refreshAuthTokens(context) {
    function isExpired(token) {
      if (token) {
        const decoded = jwtDecode(token);
        if (decoded) {
          const now = Date.now();
          // calculate and expiration time 5 minutes sooner and adjust to milliseconds
          // to compare with now.
          const expiration = (decoded.exp - (5 * 60)) * 1000;
          if (now > expiration) {
            return true;
          }
          return false;
        }
        return false;
      }
      return false;
    }

    if (context.state.tokens.idtokenjwt && isExpired(context.state.tokens.idtokenjwt)) {
      console.info('starting auth token refresh');
      return context.dispatch('refreshAuthTokensFromParent');
    }

    return Promise.resolve();
  },
};
