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
 * Lex, Polly, and Message Actions
 */

import { chatMode, liveChatStatus } from '@/store/state';
import shared from './shared-state';

// Audio blob caches (persist across calls as module-level state)
let pollyInitialSpeechBlob = {};
let pollyAllDoneBlob = {};
let pollyThereWasAnErrorBlob = {};

export default {
  /***********************************************************************
   *
   * Lex and Polly Actions
   *
   **********************************************************************/

  pollyGetBlob(context, text, format = 'text') {
    return context.dispatch('checkCredentialsForRefresh')
      .then(() => context.dispatch('getCredentials', context.state.config))
      .then(() => {
        shared.pollyClient.config.credentials = shared.awsCredentials;
        const synthReq = shared.pollyClient.synthesizeSpeech({
          Text: text,
          VoiceId: context.state.polly.voiceId,
          OutputFormat: context.state.polly.outputFormat,
          TextType: format,
        });
        return synthReq.promise();
      })
      .then((data) => {
        const blob = new Blob([data.AudioStream], { type: data.ContentType });
        return Promise.resolve(blob);
      });
  },
  pollySynthesizeSpeech(context, text, format = 'text') {
    return context.dispatch('pollyGetBlob', text, format)
      .then(blob => context.dispatch('getAudioUrl', blob))
      .then(audioUrl => context.dispatch('playAudio', audioUrl));
  },
  pollySynthesizeInitialSpeech(context) {
    const localeId = localStorage.getItem('selectedLocale') ? localStorage.getItem('selectedLocale') : context.state.config.lex.v2BotLocaleId.split(',')[0].trim();
    if (localeId in pollyInitialSpeechBlob) {
      return Promise.resolve(pollyInitialSpeechBlob[localeId]);
    } else {
      return fetch(`./initial_speech_${localeId}.mp3`)
        .then(data => data.blob())
        .then((blob) => {
          pollyInitialSpeechBlob[localeId] = blob;
          return context.dispatch('getAudioUrl', blob)
        })
        .then(audioUrl => context.dispatch('playAudio', audioUrl));
    }
  },
  pollySynthesizeAllDone: function (context) {
    const localeId = localStorage.getItem('selectedLocale') ? localStorage.getItem('selectedLocale') : context.state.config.lex.v2BotLocaleId.split(',')[0].trim();
    if (localeId in pollyAllDoneBlob) {
      return Promise.resolve(pollyAllDoneBlob[localeId]);
    } else {
      return fetch(`./all_done_${localeId}.mp3`)
        .then(data => data.blob())
        .then(blob => {
          pollyAllDoneBlob[localeId] = blob;
          return Promise.resolve(blob)
        })
    }
  },
  pollySynthesizeThereWasAnError(context) {
    const localeId = localStorage.getItem('selectedLocale') ? localStorage.getItem('selectedLocale') : context.state.config.lex.v2BotLocaleId.split(',')[0].trim();
    if (localeId in pollyThereWasAnErrorBlob) {
      return Promise.resolve(pollyThereWasAnErrorBlob[localeId]);
    } else {
      return fetch(`./there_was_an_error_${localeId}.mp3`)
        .then(data => data.blob())
        .then(blob => {
          pollyThereWasAnErrorBlob[localeId] = blob;
          return Promise.resolve(blob)
        })
    }
  },
  interruptSpeechConversation(context) {
    if (!context.state.recState.isConversationGoing &&
        !context.state.botAudio.isSpeaking
    ) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      context.dispatch('stopConversation')
        .then(() => context.dispatch('stopRecording'))
        .then(() => {
          if (context.state.botAudio.isSpeaking) {
            shared.audio.pause();
          }
        })
        .then(() => {
          let count = 0;
          const countMax = 20;
          const intervalTimeInMs = 250;
          context.commit('setIsLexInterrupting', true);
          const intervalId = setInterval(() => {
            if (!context.state.lex.isProcessing) {
              clearInterval(intervalId);
              context.commit('setIsLexInterrupting', false);
              resolve();
            }
            if (count > countMax) {
              clearInterval(intervalId);
              context.commit('setIsLexInterrupting', false);
              reject(new Error('interrupt interval exceeded'));
            }
            count += 1;
          }, intervalTimeInMs);
        });
    });
  },
  playSound(context, fileUrl) {
    document.getElementById('sound').innerHTML = `<audio autoplay="autoplay"><source src="${fileUrl}" type="audio/mpeg" /><embed hidden="true" autostart="true" loop="false" src="${fileUrl}" /></audio>`;
  },
  setSessionAttribute(context, data) {
    return Promise.resolve(context.commit("setLexSessionAttributeValue", data));
  },
  postTextMessage(context, message) {
    if (context.state.isSFXOn && !context.state.lex.isPostTextRetry) {
      context.dispatch('playSound', context.state.config.ui.messageSentSFX);
    }

    return context.dispatch('interruptSpeechConversation')
      .then(() => {
        if (context.state.chatMode === chatMode.BOT) {
          return context.dispatch('pushMessage', message);
        }
        return Promise.resolve();
      })
      .then(() => {
        const liveChatTerms = context.state.config.connect.liveChatTerms ? context.state.config.connect.liveChatTerms.toLowerCase().split(',').map(str => str.trim()) : [];
        if (context.state.config.ui.enableLiveChat &&
          liveChatTerms.find(el => el === message.text.toLowerCase()) &&
          context.state.chatMode === chatMode.BOT) {
          return context.dispatch('requestLiveChat');
        } else if (context.state.liveChat.status === liveChatStatus.REQUEST_USERNAME) {
          context.commit('setLiveChatUserName', message.text);
          return context.dispatch('requestLiveChat');
        } else if (context.state.chatMode === chatMode.LIVECHAT) {
          if (context.state.liveChat.status === liveChatStatus.ESTABLISHED) {
            return context.dispatch('sendChatMessage', message.text);
          }
        }
        return Promise.resolve(context.commit('pushUtterance', message.text))
      })
      .then(() => {
        if (context.state.chatMode === chatMode.BOT &&
          context.state.liveChat.status != liveChatStatus.REQUEST_USERNAME) {
          return context.dispatch('lexPostText', message.text);
        }
        return Promise.resolve();
      })
      .then((response) => {
        if (context.state.chatMode === chatMode.BOT &&
          context.state.liveChat.status != liveChatStatus.REQUEST_USERNAME) {
          context.dispatch('setSessionAttribute', {
            key: 'previousUtterance',
            value: message.text
          });
          context.dispatch('setSessionAttribute', {
            key: 'previousLexResponse',
            value: response.message
          });
          // check for an array of messages
          if (response.sessionState || (response.message && response.message.includes('{"messages":'))) {
            if (response.message && response.message.includes('{"messages":')) {
              const tmsg = JSON.parse(response.message);
              if (tmsg && Array.isArray(tmsg.messages)) {
                tmsg.messages.forEach((mes, index) => {
                  let alts = JSON.parse(response.sessionAttributes.appContext || '{}').altMessages;
                  if (mes.type === 'CustomPayload' || mes.contentType === 'CustomPayload') {
                    if (alts === undefined) {
                      alts = {};
                    }
                    alts.markdown = mes.value ? mes.value : mes.content;
                  }
                  // Note that Lex V1 only supported a single responseCard. V2 supports multiple response cards.
                  // This code still supports the V1 mechanism. The code below will check for
                  // the existence of a single V1 responseCard added to sessionAttributes.appContext by bots
                  // such as QnABot. This single responseCard will be appended to the last message displayed
                  // in the array of messages presented.
                  let responseCardObject = JSON.parse(response.sessionAttributes.appContext || '{}').responseCard;
                  if (responseCardObject === undefined) { // prefer appContext over lex.responseCard
                    responseCardObject = context.state.lex.responseCard;
                  }
                  context.dispatch(
                    'pushMessage',
                    {
                      text: mes.value ? mes.value : mes.content ? mes.content : "",
                      isLastMessageInGroup: mes.isLastMessageInGroup ? mes.isLastMessageInGroup : "true",
                      type: 'bot',
                      dialogState: context.state.lex.dialogState,
                      responseCard: tmsg.messages.length - 1 === index // attach response card only
                        ? responseCardObject : undefined, // for last response message
                      alts,
                      responseCardsLexV2: response.responseCardLexV2
                    },
                  );
                });
              }
            }
          } else {
            let alts = JSON.parse(response.sessionAttributes.appContext || '{}').altMessages;
            let responseCardObject = JSON.parse(response.sessionAttributes.appContext || '{}').responseCard;
            if (response.messageFormat === 'CustomPayload') {
              if (alts === undefined) {
                alts = {};
              }
              alts.markdown = response.message;
            }
            if (responseCardObject === undefined) {
              responseCardObject = context.state.lex.responseCard;
            }
            context.dispatch(
              'pushMessage',
              {
                text: response.message,
                type: 'bot',
                dialogState: context.state.lex.dialogState,
                responseCard: responseCardObject, // prefering appcontext over lex.responsecard
                alts,
              },
            );
          }
        }
        return Promise.resolve();
      })
      .then(() => {
        if (context.state.isSFXOn) {
          context.dispatch('playSound', context.state.config.ui.messageReceivedSFX);
          context.dispatch(
            'sendMessageToParentWindow',
            { event: 'messageReceived' },
          );
        }
        if (context.state.lex.dialogState === 'Fulfilled') {
          context.dispatch('reInitBot');
        }
        if (context.state.lex.isPostTextRetry) {
          context.commit('setPostTextRetry', false);
        }
      })
      .catch((error) => {
        if (((error.message.indexOf('permissible time') === -1))
          || context.state.config.lex.retryOnLexPostTextTimeout === false
          || (context.state.lex.isPostTextRetry &&
            (context.state.lex.retryCountPostTextTimeout >=
              context.state.config.lex.retryCountPostTextTimeout)
          )
        ) {
          context.commit('setPostTextRetry', false);
          const errorMessage = (context.state.config.ui.showErrorDetails) ?
            ` ${error}` : '';
          console.error('error in postTextMessage', error);
          context.dispatch(
            'pushErrorMessage',
            'Sorry, I was unable to process your message. Try again later.' +
            `${errorMessage}`,
          );
        } else {
          context.commit('setPostTextRetry', true);
          context.dispatch('postTextMessage', message);
        }
      });
  },
  deleteSession(context) {
    context.commit('setIsLexProcessing', true);
    return context.dispatch('checkCredentialsForRefresh')
      .then(() => context.dispatch('getCredentials', context.state.config))
      .then(() => shared.lexClient.deleteSession())
      .then((data) => {
        context.commit('setIsLexProcessing', false);
        return context.dispatch('updateLexState', data)
          .then(() => Promise.resolve(data));
      })
      .catch((error) => {
        console.error(error);
        context.commit('setIsLexProcessing', false);
      });
  },
  startNewSession(context) {
    context.commit('setIsLexProcessing', true);
    return context.dispatch('checkCredentialsForRefresh')
      .then(() => context.dispatch('getCredentials', context.state.config))
      .then(() => shared.lexClient.startNewSession())
      .then((data) => {
        context.commit('setIsLexProcessing', false);
        return context.dispatch('updateLexState', data)
          .then(() => Promise.resolve(data));
      })
      .catch((error) => {
        console.error(error);
        context.commit('setIsLexProcessing', false);
      });
  },
  lexPostText(context, text) {
    context.commit('setIsLexProcessing', true);
    context.commit('reapplyTokensToSessionAttributes');
    const session = context.state.lex.sessionAttributes;
    context.commit('removeAppContext');
    const localeId = context.state.config.lex.v2BotLocaleId
      ? context.state.config.lex.v2BotLocaleId.split(',')[0]
      : undefined;
    const sessionId = shared.lexClient.userId;
    return context.dispatch('checkCredentialsForRefresh')
      .then(() => context.dispatch('getCredentials', context.state.config))
      .then(() => {
        // TODO: Need to handle if the error occurred. typing would be broke since lexClient.postText throw error
        if (String(context.state.config.lex.allowStreamingResponses) === "true") {
          context.commit('setIsStartingTypingWsMessages', true);

          shared.wsClient.onmessage = (event) => {
            if(event.data!=='/stop/' && context.getters.isStartingTypingWsMessages()){
              console.info('Streaming: ', context.getters.isStartingTypingWsMessages());
              context.commit('pushWebSocketMessage',event.data);
              context.dispatch('typingWsMessages')
            }else{
              console.info('Currently not streaming');
            }
          }
        }
        // Return Lex response
        return shared.lexClient.postText(text, localeId, session);
      })
      .then((data) => {
        //TODO: Waiting for all wsMessages typing on the chat bubbles
        context.commit('setIsStartingTypingWsMessages', false);
        context.commit('setIsLexProcessing', false);
        return context.dispatch('updateLexState', data)
          .then(() => {
            // Initiate TalkDesk interaction if the session attribute exists and is not a previous session ID
            if (context.state.lex.sessionAttributes.talkdesk_conversation_id
              && context.state.lex.sessionAttributes.talkdesk_conversation_id != context.state.liveChat.talkDeskConversationId) {
              context.commit('setTalkDeskConversationId', context.state.lex.sessionAttributes.talkdesk_conversation_id)
              context.dispatch('requestLiveChat');
            }
          })
          .then(() => Promise.resolve(data));
      })
      .catch((error) => {
        //TODO: Need to handle if the error occurred
        context.commit('setIsStartingTypingWsMessages', false);
        context.commit('setIsLexProcessing', false);
        throw error;
      });
  },
  lexPostContent(context, audioBlob, offset = 0) {
    context.commit('setIsLexProcessing', true);
    context.commit('reapplyTokensToSessionAttributes');
    const session = context.state.lex.sessionAttributes;
    delete session.appContext;
    console.info('audio blob size:', audioBlob.size);
    let timeStart;

    return context.dispatch('checkCredentialsForRefresh')
      .then(() => context.dispatch('getCredentials', context.state.config))
      .then(() => {
        const localeId = context.state.config.lex.v2BotLocaleId
          ? context.state.config.lex.v2BotLocaleId.split(',')[0]
          : undefined;
        timeStart = performance.now();
        return shared.lexClient.postContent(
          audioBlob,
          localeId,
          session,
          context.state.lex.acceptFormat,
          offset,
        );
      })
      .then((lexResponse) => {
        const timeEnd = performance.now();
        console.info(
          'lex postContent processing time:',
          ((timeEnd - timeStart) / 1000).toFixed(2),
        );
        context.commit('setIsLexProcessing', false);
        return context.dispatch('updateLexState', lexResponse)
          .then(() => (
            context.dispatch('processLexContentResponse', lexResponse)
          ))
          .then(blob => Promise.resolve(blob));
      })
      .catch((error) => {
        context.commit('setIsLexProcessing', false);
        throw error;
      });
  },
  processLexContentResponse(context, lexData) {
    const { audioStream, contentType, dialogState } = lexData;

    return Promise.resolve()
      .then(() => {
        if (!audioStream || !audioStream.length) {
          if (dialogState === 'ReadyForFulfillment') {
            return context.dispatch('pollySynthesizeAllDone');
          } else {
            return context.dispatch('pollySynthesizeThereWasAnError');
          }
        } else {
          return Promise.resolve(new Blob([audioStream], {type: contentType}));
        }
      });
  },
  updateLexState(context, lexState) {
    const lexStateDefault = {
      dialogState: '',
      inputTranscript: '',
      intentName: '',
      message: '',
      responseCard: null,
      sessionAttributes: {},
      slotToElicit: '',
      slots: {},
    };
    // simulate response card in sessionAttributes
    // used mainly for postContent which doesn't support response cards
    if ('sessionAttributes' in lexState &&
      'appContext' in lexState.sessionAttributes
    ) {
      try {
        const appContext = JSON.parse(lexState.sessionAttributes.appContext);
        if ('responseCard' in appContext) {
          lexStateDefault.responseCard =
            appContext.responseCard;
        }
      } catch (e) {
        const error =
          new Error(`error parsing appContext in sessionAttributes: ${e}`);
        return Promise.reject(error);
      }
    }
    context.commit('updateLexState', { ...lexStateDefault, ...lexState });
    if (context.state.isRunningEmbedded) {
      // Vue3 uses a Proxy object, this removes the proxy and gives back the raw object
      // This works around an error when sending it back to the parent window
      let rawState = JSON.parse(JSON.stringify(context.state.lex))
      context.dispatch(
        'sendMessageToParentWindow',
        { event: 'updateLexState', state: rawState },
      );
    }
    return Promise.resolve();
  },

  /***********************************************************************
   *
   * Message List Actions
   *
   **********************************************************************/

  pushMessage(context, message) {
    if (context.state.lex.isPostTextRetry === false) {
      context.commit('pushMessage', message);
    }
  },
  pushLiveChatMessage(context, message) {
    context.commit('pushLiveChatMessage', message);
  },
  pushErrorMessage(context, text, dialogState = 'Failed') {
    context.commit('pushMessage', {
      type: 'bot',
      text,
      dialogState,
    });
  },
};
