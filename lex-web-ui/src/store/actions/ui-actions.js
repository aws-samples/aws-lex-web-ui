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
 * UI, Parent Communication, WebSocket, and File Upload Actions
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { signUrl } from '@/store/handlers/sigv4-handlers';
import shared from './shared-state';

export default {
  /***********************************************************************
   *
   * UI and Parent Communication Actions
   *
   **********************************************************************/

  toggleIsUiMinimized(context) {
    if (!context.state.initialUtteranceSent && context.state.isUiMinimized) {
      setTimeout(() => context.dispatch('sendInitialUtterance'), 500);
      context.commit('setInitialUtteranceSent', true);
    }
    context.commit('toggleIsUiMinimized');
    return context.dispatch(
      'sendMessageToParentWindow',
      { event: 'toggleMinimizeUi' },
    );
  },
  toggleIsLoggedIn(context) {
    context.commit('toggleIsLoggedIn');
    return context.dispatch(
      'sendMessageToParentWindow',
      { event: 'toggleIsLoggedIn' },
    );
  },
  toggleHasButtons(context) {
    context.commit('toggleHasButtons');
    return context.dispatch(
      'sendMessageToParentWindow',
      { event: 'toggleHasButtons' },
    );
  },
  toggleIsSFXOn(context) {
    context.commit('toggleIsSFXOn');
  },
  /**
   * sendMessageToParentWindow will either dispatch an event using a CustomEvent to a handler when
   * the lex-web-ui is running as a VUE component on a page or will send a message via postMessage
   * to a parent window if an iFrame is hosting the VUE component on a parent page.
   * isRunningEmbedded === true indicates running withing an iFrame on a parent page
   * isRunningEmbedded === false indicates running as a VUE component directly on a page.
   * @param context
   * @param message
   * @returns {Promise<any>}
   */
  sendMessageToParentWindow(context, message) {
    if (!context.state.isRunningEmbedded) {
      return new Promise((resolve, reject) => {
        try {
          const myEvent = new CustomEvent('fullpagecomponent', { detail: message });
          document.dispatchEvent(myEvent);
          resolve(myEvent);
        } catch (err) {
          reject(err);
        }
      });
    }
    return new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (evt) => {
        messageChannel.port1.close();
        messageChannel.port2.close();
        if (evt.data.event === 'resolve') {
          resolve(evt.data);
        } else {
          const errorMessage =
            `error in sendMessageToParentWindow: ${evt.data.error}`;
          reject(new Error(errorMessage));
        }
      };
      let target = context.state.config.ui.parentOrigin;
      if (target !== window.location.origin) {
        // simple check to determine if a region specific path has been provided
        const p1 = context.state.config.ui.parentOrigin.split('.');
        const p2 = window.location.origin.split('.');
        if (p1[0] === p2[0]) {
          target = window.location.origin;
        }
      }
      window.parent.postMessage(
        { source: 'lex-web-ui', ...message },
        target,
        [messageChannel.port2],
      );
    });
  },
  resetHistory(context) {
    context.commit('clearMessages');
    context.commit('pushMessage', {
      type: 'bot',
      text: context.state.config.lex.initialText,
      alts: {
        markdown: context.state.config.lex.initialText,
      },
    });
  },
  changeLocaleIds(context, data) {
    context.commit('updateLocaleIds', data);
  },

  /***********************************************************************
   *
   * WebSocket Actions
   *
   **********************************************************************/
  InitWebSocketConnect(context){
    context.dispatch('getCredentials', context.state.config).then(() => {
      const sessionId = shared.lexClient.userId;
      const serviceInfo = { 
        region: context.state.config.region, 
        service: 'execute-api' 
      };

      Promise.resolve(shared.awsCredentials).then(async (credentials) => {
        const accessInfo = {
          access_key: credentials.accessKeyId,
          secret_key: credentials.secretAccessKey,
          session_token: credentials.sessionToken,
        }

        const signedUrl = await signUrl(context.state.config.lex.streamingWebSocketEndpoint+'?sessionId='+sessionId, accessInfo, serviceInfo);
        shared.wsClient = new WebSocket(signedUrl);

        // Add heartbeat logic
        const HEARTBEAT_INTERVAL = 540000; // 9 minutes
        const MAX_DURATION = 7200000; // 2 hours
        const startTime = Date.now();
        let heartbeatTimer = null;

        function startHeartbeat() {
          if (shared.wsClient.readyState === WebSocket.OPEN) {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < MAX_DURATION) {
              const pingMessage = JSON.stringify({ action: 'ping' });
              shared.wsClient.send(pingMessage);
              console.log('Sending Ping:', new Date().toISOString());
              heartbeatTimer = setTimeout(startHeartbeat, HEARTBEAT_INTERVAL);
            } else {
              console.log('Stopped sending pings after reaching 2-hour limit.');
              clearTimeout(heartbeatTimer);
            }
          }
        }
        shared.wsClient.onopen = () => {
          console.log('WebSocket Connected');
          startHeartbeat();
        };

        shared.wsClient.onclose = () => {
            console.log('WebSocket Closed');
            clearTimeout(heartbeatTimer);
        };

        shared.wsClient.onerror = (error) => {
            console.log('WebSocket Error', error.message);
            clearTimeout(heartbeatTimer);
        };
      });
    });
  },
  typingWsMessages(context){
    if (context.getters.wsMessagesCurrentIndex()<context.getters.wsMessagesLength()-1){
      setTimeout(() => {
        context.commit('typingWsMessages');
      }, 500);
    }
  },

  /***********************************************************************
   *
   * File Upload Actions
   *
   **********************************************************************/
  async uploadFile(context, file) {
    const s3 = new S3Client({
      credentials: shared.awsCredentials,
      region: context.state.config.region
    });
    //Create a key that is unique to the user & time of upload
    const documentKey = shared.lexClient.userId + '/' + file.name.split('.').join('-' + Date.now() + '.')
    const s3Params = {
      Body: file,
      Bucket: context.state.config.ui.uploadS3BucketName,
      Key: documentKey,
    };
    const command = new PutObjectCommand(s3Params);
    try {
      const res = await s3.send(command);
      const documentObject = {
        s3Path: 's3://' + context.state.config.ui.uploadS3BucketName + '/' + documentKey,
        fileName: file.name
      };
      var documentsValue = [documentObject];
      if (context.state.lex.sessionAttributes.userFilesUploaded) {
        documentsValue = JSON.parse(context.state.lex.sessionAttributes.userFilesUploaded)
        documentsValue.push(documentObject);
      }
      context.commit("setLexSessionAttributeValue",  { key: 'userFilesUploaded', value: JSON.stringify(documentsValue) });
      if (context.state.config.ui.uploadSuccessMessage.length > 0) {
        context.commit('pushMessage', {
          type: 'bot',
          text: context.state.config.ui.uploadSuccessMessage,
        });
      }
    } catch (err) {
      console.log(err);
      context.commit('pushMessage', {
        type: 'bot',
        text: context.state.config.ui.uploadFailureMessage,
      });
    }
  },
  removeAttachments(context) {
    context.commit('removeAttachments');
  },
};
