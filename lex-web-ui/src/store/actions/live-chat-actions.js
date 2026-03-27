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
 * Live Chat Actions
 */

import 'amazon-connect-chatjs';
import { chatMode, liveChatStatus } from '@/store/state';
import { createLiveChatSession, connectLiveChatSession, initLiveChatHandlers, sendChatMessage, sendTypingEvent, requestLiveChatEnd } from '@/store/handlers/live-chat-handlers';
import { initTalkDeskLiveChat, sendTalkDeskChatMessage, requestTalkDeskLiveChatEnd } from '@/store/handlers/talkdesk-live-chat-handlers.js';
import { signRequest } from '@/store/handlers/sigv4-handlers';
import shared from './shared-state';

export default {
  initLiveChat(context) {
    if (window.connect) {
      window.connect.ChatSession.setGlobalConfig({
        region: context.state.config.region,
      });
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('failed to find Connect Chat JS global variable'));
    }
  },

  initLiveChatSession(context) {
    console.info('initLiveChat');
    console.info('config connect', context.state.config.connect);
    if (!context.state.config.ui.enableLiveChat) {
      console.error('error in initLiveChatSession() enableLiveChat is not true in config');
      return Promise.reject(new Error('error in initLiveChatSession() enableLiveChat is not true in config'));
    }
    if (!context.state.config.connect.apiGatewayEndpoint && !context.state.config.connect.talkDeskWebsocketEndpoint) {
      console.error('error in initLiveChatSession() apiGatewayEndpoint or talkDeskWebsocketEndpoint is not set in config');
      return Promise.reject(new Error('error in initLiveChatSession() apiGatewayEndpoint or talkDeskWebsocketEndpoint is not set in config'));
    }

    // If Connect API Gateway Endpoint is set, use Connect
    if (context.state.config.connect.apiGatewayEndpoint) {
      if (!context.state.config.connect.contactFlowId) {
        console.error('error in initLiveChatSession() contactFlowId is not set in config');
        return Promise.reject(new Error('error in initLiveChatSession() contactFlowId is not set in config'));
      }
      if (!context.state.config.connect.instanceId) {
        console.error('error in initLiveChatSession() instanceId is not set in config');
        return Promise.reject(new Error('error in initLiveChatSession() instanceId is not set in config'));
      }

      context.commit('setLiveChatStatus', liveChatStatus.INITIALIZING);
      console.log(context.state.lex);
      const attributesToSend = Object.keys(context.state.lex.sessionAttributes).filter(function(k) {
          return k.startsWith('connect_') || k === "topic";
      }).reduce(function(newData, k) {
          newData[k] = context.state.lex.sessionAttributes[k];
          return newData;
      }, {});

      const initiateChatRequest = {
        Attributes: attributesToSend,
        ParticipantDetails: {
          DisplayName: context.getters.liveChatUserName()
        },
        ContactFlowId: context.state.config.connect.contactFlowId,
        InstanceId: context.state.config.connect.instanceId,
      };

      context.dispatch('checkCredentialsForRefresh')
        .then(() => context.dispatch('getCredentials', context.state.config))
        .then(() => {
          const bodyText = JSON.stringify(initiateChatRequest);
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

            var request = {
              url: context.state.config.connect.apiGatewayEndpoint,
              method: 'POST',
              mode: 'cors',
              data: bodyText
            }

            const signedRequest = await signRequest(request, accessInfo, serviceInfo);

            return fetch(signedRequest.url, signedRequest)
            .then(response => response.json())
            .then(json => json.data)
            .then((result) => {
              console.info('Live Chat Config Success:', result);
              context.commit('setLiveChatStatus', liveChatStatus.CONNECTING);
              function waitMessage(context, type, message) {
                context.commit('pushLiveChatMessage', {
                  type,
                  text: message,
                });
              };
              if (context.state.config.connect.waitingForAgentMessageIntervalSeconds > 0) {
                const intervalID = setInterval(waitMessage,
                  1000 * context.state.config.connect.waitingForAgentMessageIntervalSeconds,
                  context,
                  'bot',
                  context.state.config.connect.waitingForAgentMessage);
                console.info(`interval now set: ${intervalID}`);
                context.commit('setLiveChatIntervalId', intervalID);
              }
              shared.liveChatSession = createLiveChatSession(result);
              console.info('Live Chat Session Created:', shared.liveChatSession);
              initLiveChatHandlers(context, shared.liveChatSession);
              console.info('Live Chat Handlers initialised:');
              return connectLiveChatSession(shared.liveChatSession);
            })
            .then((response) => {
              console.info('live Chat session connection response', response);
              console.info('Live Chat Session CONNECTED:', shared.liveChatSession);
              context.commit('setLiveChatStatus', liveChatStatus.ESTABLISHED);
              // context.commit('setLiveChatbotSession', liveChatSession);
              return Promise.resolve();
            })
            .catch((error) => {
              console.error("Error esablishing live chat");
              context.commit('setLiveChatStatus', liveChatStatus.ENDED);
              return Promise.resolve();
            });
          });
      });
    }
    // If TalkDesk endpoint is available use
    else if (context.state.config.connect.talkDeskWebsocketEndpoint) {
      shared.liveChatSession = initTalkDeskLiveChat(context);
      return Promise.resolve();
    }
  },

  requestLiveChat(context) {
    console.info('requestLiveChat');
    if (!context.getters.liveChatUserName() && context.state.config.connect.promptForNameMessage.length > 0) {
      context.commit('setLiveChatStatus', liveChatStatus.REQUEST_USERNAME);
      context.commit(
        'pushMessage',
        {
          text: context.state.config.connect.promptForNameMessage,
          type: 'bot',
        },
      );
    } else {
      context.commit('setLiveChatStatus', liveChatStatus.REQUESTED);
      context.commit('setChatMode', chatMode.LIVECHAT);
      context.commit('setIsLiveChatProcessing', true);
      context.dispatch('initLiveChatSession');
    }
  },
  sendTypingEvent(context) {
    console.info('actions: sendTypingEvent');
    if (context.state.chatMode === chatMode.LIVECHAT && shared.liveChatSession && context.state.config.connect.apiGatewayEndpoint) {
      sendTypingEvent(shared.liveChatSession);
    }
  },
  sendChatMessage(context, message) {
    console.info('actions: sendChatMessage');
    if (context.state.chatMode === chatMode.LIVECHAT && shared.liveChatSession) {
      // If Connect API Gateway Endpoint is set, use Connect
      if (context.state.config.connect.apiGatewayEndpoint) {
        sendChatMessage(shared.liveChatSession, message);
      }
      // If TalkDesk endpoint is available use
      else if (context.state.config.connect.talkDeskWebsocketEndpoint) {
        sendTalkDeskChatMessage(context, shared.liveChatSession, message);

        context.dispatch(
          'pushMessage',
          {
            text: message,
            type: 'human',
            dialogState: context.state.lex.dialogState
          },
        );
      }
    }
  },
  requestLiveChatEnd(context) {
    console.info('actions: endLiveChat');
    context.commit('clearLiveChatIntervalId');
    if (context.state.chatMode === chatMode.LIVECHAT && shared.liveChatSession) {

      // If Connect API Gateway Endpoint is set, use Connect
      if (context.state.config.connect.apiGatewayEndpoint) {
        requestLiveChatEnd(shared.liveChatSession);
      }
      // If TalkDesk endpoint is available use
      else if (context.state.config.connect.talkDeskWebsocketEndpoint) {
        requestTalkDeskLiveChatEnd(context, shared.liveChatSession, "agent");
      }

      context.dispatch('pushLiveChatMessage', {
        type: 'agent',
        text: context.state.config.connect.chatEndedMessage,
      });
      context.dispatch('liveChatSessionEnded');
      context.commit('setLiveChatStatus', liveChatStatus.ENDED);
    }
  },
  agentIsTyping(context) {
    console.info('actions: agentIsTyping');
    context.commit('setIsLiveChatProcessing', true);
  },
  liveChatSessionReconnectRequest(context) {
    console.info('actions: liveChatSessionReconnectRequest');
    context.commit('setLiveChatStatus', liveChatStatus.DISCONNECTED);
    // TODO try re-establish connection
  },
  liveChatSessionEnded(context) {
    console.info('actions: liveChatSessionEnded');
    console.info(`connect config is : ${context.state.config.connect}`);
    if (context.state.config.connect.endLiveChatUtterance && context.state.config.connect.endLiveChatUtterance.length > 0) {
        const message = {
          type: context.state.config.ui.hideButtonMessageBubble ? 'button' : 'human',
          text: context.state.config.connect.endLiveChatUtterance,
        };
        context.dispatch('postTextMessage', message);
        console.info("dispatching request to send message");
    }
    shared.liveChatSession = null;
    context.commit('setLiveChatStatus', liveChatStatus.ENDED);
    context.commit('setChatMode', chatMode.BOT);
    context.commit('clearLiveChatIntervalId');
  },
  liveChatAgentJoined(context) {
    context.commit('clearLiveChatIntervalId');
  },
};
