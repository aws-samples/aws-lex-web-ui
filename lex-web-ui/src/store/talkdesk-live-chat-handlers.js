/*
 Copyright 2017-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/**
 * Vuex store recorder handlers
 */

/* eslint no-console: ["error", { allow: ["info", "warn", "error", "time", "timeEnd"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
import { liveChatStatus } from '@/store/state';

export const initTalkDeskLiveChat = (context) => {
 
  console.log('custom initlivechat');
  const liveChatSession = new WebSocket(`${context.state.config.connect.talkDeskWebsocketEndpoint}?conversationId=${context.state.lex.sessionAttributes.talkdesk_conversation_id}`);

  liveChatSession.onopen = (response) => {
    console.info(`successful connection: ${JSON.stringify(response)}`);
    context.commit('setLiveChatStatus', liveChatStatus.ESTABLISHED);
    context.dispatch('pushLiveChatMessage', {
      type: 'agent',
      text: context.state.config.connect.agentJoinedMessage,
    });
  }

  liveChatSession.onerror = (error) => {
    console.error(`Error occurred in live chat ${JSON.stringify(error)}`);
    context.commit('setLiveChatStatus', liveChatStatus.ENDED);  
  }

  liveChatSession.onmessage = (event) => {
    const { event_type, content, author_name } = JSON.parse(event.data);
    console.info('Received message data:', event.data);
    console.log(event_type, content);
    let type = 'agent';
    if(event_type == 'message_created') {
        context.dispatch('liveChatAgentJoined');
        context.commit('setIsLiveChatProcessing', false);
        context.dispatch('pushLiveChatMessage', {
            type,
            text: content,
            agentName: author_name
        });
    }
    if(event_type == 'conversation_ended') {
        context.dispatch('agentInitiatedLiveChatEnd');
    }
  }

  return liveChatSession;
};

export const sendTalkDeskChatMessage = (context, liveChatSession, message) => {
  const payload = {
    action: "onMessage",
    message,
    conversationId: context.state.lex.sessionAttributes.talkdesk_conversation_id
  }
  console.log('sendChatMessage', payload);
  liveChatSession.send(JSON.stringify(payload));
};

export const requestTalkDeskLiveChatEnd = (context, liveChatSession, requester) => {
  console.info('liveChatHandler: requestLiveChatEnd', liveChatSession);
  liveChatSession.close(4000, `conversationId:${context.state.lex.sessionAttributes.talkdesk_conversation_id}`);
  context.commit('setLiveChatStatus', liveChatStatus.ENDED);  
};

