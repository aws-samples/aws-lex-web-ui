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
 * Asynchronous store actions
 */

/* eslint no-console: ["error", { allow: ["info", "warn", "error"] }] */
/* eslint spaced-comment: ["error", "always", { "exceptions": ["*"] }] */

import LexAudioRecorder from '@/lib/lex/recorder';
import initRecorderHandlers from '@/store/recorder-handlers';
import { chatMode, liveChatStatus } from '@/store/state';
import { createLiveChatSession, connectLiveChatSession, initLiveChatHandlers, sendChatMessage, sendTypingEvent, requestLiveChatEnd } from '@/store/live-chat-handlers';
import { initTalkDeskLiveChat, sendTalkDeskChatMessage, requestTalkDeskLiveChatEnd } from '@/store/talkdesk-live-chat-handlers.js';
import silentOgg from '@/assets/silent.ogg';
import silentMp3 from '@/assets/silent.mp3';
import LexClient from '@/lib/lex/client';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { fetchAuthSession, getCurrentUser } from '@aws-amplify/auth';
const { HttpRequest } = require('@smithy/protocol-http');
const { SignatureV4 } = require('@smithy/signature-v4');
const { Sha256 } = require('@aws-crypto/sha256-js');
import aws4 from 'aws4';

// non-state variables that may be mutated outside of store
// set via initializers at run time
let awsCredentials;
let pollyClient;
let lexClient;
let audio;
let recorder;
let liveChatSession;
let wsClient;
let pollyInitialSpeechBlob = {};
let pollyAllDoneBlob = {};
let pollyThereWasAnErrorBlob = {};

export default {
  /***********************************************************************
   *
   * Initialization Actions
   *
   **********************************************************************/

  initCredentials(context, credentials) {
    switch (context.state.awsCreds.provider) {
      case 'cognito':
      case 'parentWindow':
        if (!credentials) {
          context.dispatch('getCredentials', context.state.config)
            .then((creds) => {
              awsCredentials = creds;
              if (lexClient) {
                lexClient.initCredentials(awsCredentials);
              }
            });
        }
        else {
          awsCredentials = credentials;
          if (lexClient) {
            lexClient.initCredentials(awsCredentials);
          }
        }
        break;
      default:
        return Promise.reject(new Error('unknown credential provider'));
    }
  },
  getConfigFromParent(context) {
    if (!context.state.isRunningEmbedded) {
      return Promise.resolve({});
    }

    return context.dispatch(
      'sendMessageToParentWindow',
      { event: 'initIframeConfig' },
    )
      .then((configResponse) => {
        if (configResponse.event === 'resolve' &&
            configResponse.type === 'initIframeConfig') {
          return Promise.resolve(configResponse.data);
        }
        return Promise.reject(new Error('invalid config event from parent'));
      });
  },
  initConfig(context, configObj) {
    context.commit('mergeConfig', configObj);
  },
  sendInitialUtterance(context) {
    if (context.state.config.lex.initialUtterance) {
      const message = {
        type: context.state.config.ui.hideButtonMessageBubble ? 'button' : 'human',
        text: context.state.config.lex.initialUtterance,
      };
      context.dispatch('postTextMessage', message);
    }
  },
  initMessageList(context) {
    context.commit('reloadMessages');
    if (context.state.messages &&
      context.state.messages.length === 0 &&
      context.state.config.lex.initialText.length > 0) {
        context.commit('pushMessage', {
          type: 'bot',
          text: context.state.config.lex.initialText,
        });
    }
  },
  initLexClient(context, payload) {
    lexClient = new LexClient({
      botName: context.state.config.lex.botName,
      botAlias: context.state.config.lex.botAlias,
      lexRuntimeClient: payload.v1client,
      botV2Id: context.state.config.lex.v2BotId,
      botV2AliasId: context.state.config.lex.v2BotAliasId,
      botV2LocaleId: context.state.config.lex.v2BotLocaleId,
      lexRuntimeV2Client: payload.v2client,
    });

    context.commit(
      'setLexSessionAttributes',
      context.state.config.lex.sessionAttributes,
    );
    // Initiate WebSocket after lexClient get credential, due to sessionId was assigned from identityId
    lexClient.initCredentials(payload.credentials)
    // Enable streaming response
    if (String(context.state.config.lex.allowStreamingResponses) === "true") {
      context.dispatch('InitWebSocketConnect')
    }
    return;
  },
  initPollyClient(context, client, credentials) {
    if (!context.state.recState.isRecorderEnabled) {
      return Promise.resolve();
    }
    pollyClient = client;
    context.commit('setPollyVoiceId', context.state.config.polly.voiceId);
    pollyClient.config.credentials = credentials;
    return;
  },
  initRecorder(context) {
    if (!context.state.config.recorder.enable) {
      context.commit('setIsRecorderEnabled', false);
      return Promise.resolve();
    }
    recorder = new LexAudioRecorder(context.state.config.recorder);

    return recorder.init()
      .then(() => recorder.initOptions(context.state.config.recorder))
      .then(() => initRecorderHandlers(context, recorder))
      .then(() => context.commit('setIsRecorderSupported', true))
      .then(() => context.commit('setIsMicMuted', recorder.isMicMuted))
      .catch((error) => {
        if (['PermissionDeniedError', 'NotAllowedError'].indexOf(error.name)
            >= 0) {
          console.warn('get user media permission denied');
          context.dispatch(
            'pushErrorMessage',
            'It seems like the microphone access has been denied. ' +
            'If you want to use voice, please allow mic usage in your browser.',
          );
        } else {
          console.error('error while initRecorder', error);
        }
      });
  },
  initBotAudio(context, audioElement) {
    if (!context.state.recState.isRecorderEnabled ||
        !context.state.config.recorder.enable
    ) {
      return Promise.resolve();
    }
    if (!audioElement) {
      return Promise.reject(new Error('invalid audio element'));
    }
    audio = audioElement;

    let silentSound;

    // Ogg is the preferred format as it seems to be generally smaller.
    // Detect if ogg is supported (MS Edge doesn't).
    // Can't default to mp3 as it is not supported by some Android browsers
    if (audio.canPlayType('audio/ogg') !== '') {
      context.commit('setAudioContentType', 'ogg');
      silentSound = silentOgg;
    } else if (audio.canPlayType('audio/mp3') !== '') {
      context.commit('setAudioContentType', 'mp3');
      silentSound = silentMp3;
    } else {
      console.error('init audio could not find supportted audio type');
      console.warn(
        'init audio can play mp3 [%s]',
        audio.canPlayType('audio/mp3'),
      );
      console.warn(
        'init audio can play ogg [%s]',
        audio.canPlayType('audio/ogg'),
      );
    }

    console.info('recorder content types: %s', recorder.mimeType);

    audio.preload = 'auto';
    // Load a silent sound as the initial audio. This is used to workaround
    // the requirement of mobile browsers that would only play a
    // sound in direct response to a user action (e.g. click).
    // This audio should be explicitly played as a response to a click
    // in the UI
    audio.src = silentSound;
    // autoplay will be set as a response to a click
    audio.autoplay = false;

    return Promise.resolve();
  },
  reInitBot(context) {
    if (context.state.config.lex.reInitSessionAttributesOnRestart) {
      context.commit('setLexSessionAttributes', context.state.config.lex.sessionAttributes);
    }
    if (context.state.config.ui.pushInitialTextOnRestart) {
      context.commit('pushMessage', {
        type: 'bot',
        text: context.state.config.lex.initialText,
        alts: {
          markdown: context.state.config.lex.initialText,
        },
      });
    }
    return Promise.resolve();
  },

  /***********************************************************************
   *
   * Audio Actions
   *
   **********************************************************************/

  getAudioUrl(context, blob) {
    let url;

    try {
      url = URL.createObjectURL(blob);
    } catch (err) {
      console.error('getAudioUrl createObjectURL error', err);
      const errorMessage = 'There was an error processing the audio ' +
        `response: (${err})`;
      const error = new Error(errorMessage);
      return Promise.reject(error);
    }

    return Promise.resolve(url);
  },
  setAudioAutoPlay(context) {
    if (audio.autoplay) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      audio.play();
      // eslint-disable-next-line no-param-reassign
      audio.onended = () => {
        context.commit('setAudioAutoPlay', { audio, status: true });
        resolve();
      };
      // eslint-disable-next-line no-param-reassign
      audio.onerror = (err) => {
        context.commit('setAudioAutoPlay', { audio, status: false });
        reject(new Error(`setting audio autoplay failed: ${err}`));
      };
    });
  },
  playAudio(context, url) {
    return new Promise((resolve) => {
      audio.onloadedmetadata = () => {
        context.commit('setIsBotSpeaking', true);
        context.dispatch('playAudioHandler')
          .then(() => resolve());
      };
      audio.src = url;
    });
  },
  playAudioHandler(context) {
    return new Promise((resolve, reject) => {
      const { enablePlaybackInterrupt } = context.state.config.lex;

      const clearPlayback = () => {
        context.commit('setIsBotSpeaking', false);
        const intervalId = context.state.botAudio.interruptIntervalId;
        if (intervalId && enablePlaybackInterrupt) {
          clearInterval(intervalId);
          context.commit('setBotPlaybackInterruptIntervalId', 0);
          context.commit('setIsLexInterrupting', false);
          context.commit('setCanInterruptBotPlayback', false);
          context.commit('setIsBotPlaybackInterrupting', false);
        }
      };

      audio.onerror = (error) => {
        clearPlayback();
        reject(new Error(`There was an error playing the response (${error})`));
      };
      audio.onended = () => {
        clearPlayback();
        resolve();
      };
      audio.onpause = audio.onended;

      if (enablePlaybackInterrupt) {
        context.dispatch('playAudioInterruptHandler');
      }
    });
  },
  playAudioInterruptHandler(context) {
    const { isSpeaking } = context.state.botAudio;
    const {
      enablePlaybackInterrupt,
      playbackInterruptMinDuration,
      playbackInterruptVolumeThreshold,
      playbackInterruptLevelThreshold,
      playbackInterruptNoiseThreshold,
    } = context.state.config.lex;
    const intervalTimeInMs = 200;

    if (!enablePlaybackInterrupt &&
        !isSpeaking &&
        context.state.lex.isInterrupting &&
        audio.duration < playbackInterruptMinDuration
    ) {
      return;
    }

    const intervalId = setInterval(() => {
      const { duration } = audio;
      const end = audio.played.end(0);
      const { canInterrupt } = context.state.botAudio;

      if (!canInterrupt &&
          // allow to be interrupt free in the beginning
          end > playbackInterruptMinDuration &&
          // don't interrupt towards the end
          (duration - end) > 0.5 &&
          // only interrupt if the volume seems to be low noise
          recorder.volume.max < playbackInterruptNoiseThreshold
      ) {
        context.commit('setCanInterruptBotPlayback', true);
      } else if (canInterrupt && (duration - end) < 0.5) {
        context.commit('setCanInterruptBotPlayback', false);
      }

      if (canInterrupt &&
          recorder.volume.max > playbackInterruptVolumeThreshold &&
          recorder.volume.slow > playbackInterruptLevelThreshold
      ) {
        clearInterval(intervalId);
        context.commit('setIsBotPlaybackInterrupting', true);
        setTimeout(() => {
          audio.pause();
        }, 500);
      }
    }, intervalTimeInMs);

    context.commit('setBotPlaybackInterruptIntervalId', intervalId);
  },
  getAudioProperties() {
    return (audio) ?
      {
        currentTime: audio.currentTime,
        duration: audio.duration,
        end: (audio.played.length >= 1) ?
          audio.played.end(0) : audio.duration,
        ended: audio.ended,
        paused: audio.paused,
      } :
      {};
  },

  /***********************************************************************
   *
   * Recorder Actions
   *
   **********************************************************************/

  startConversation(context) {
    audio.pause();
    context.commit('setIsConversationGoing', true);
    return context.dispatch('startRecording');
  },
  stopConversation(context) {
    context.commit('setIsConversationGoing', false);
  },
  startRecording(context) {
    // don't record if muted
    if (context.state.recState.isMicMuted === true) {
      console.warn('recording while muted');
      context.dispatch('stopConversation');
      return Promise.reject(new Error('The microphone seems to be muted.'));
    }

    context.commit('startRecording', recorder);
    return Promise.resolve();
  },
  stopRecording(context) {
    context.commit('stopRecording', recorder);
  },
  getRecorderVolume(context) {
    if (!context.state.recState.isRecorderEnabled) {
      return Promise.resolve();
    }
    return recorder.volume;
  },

  /***********************************************************************
   *
   * Lex and Polly Actions
   *
   **********************************************************************/

  pollyGetBlob(context, text, format = 'text') {
    return context.dispatch('getCredentials', context.state.config)
      .then((creds) => {
        pollyClient.config.credentials = creds;
        const synthReq = pollyClient.synthesizeSpeech({
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
      })
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
            audio.pause();
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
    return context.dispatch('getCredentials', context.state.config)
      .then(() => lexClient.deleteSession())
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
    return context.dispatch('getCredentials', context.state.config)
      .then(() => lexClient.startNewSession())
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
    const sessionId = lexClient.userId;
    return context.dispatch('getCredentials', context.state.config)
      .then(() => {
        // TODO: Need to handle if the error occurred. typing would be broke since lexClient.postText throw error
        if (String(context.state.config.lex.allowStreamingResponses) === "true") {
          context.commit('setIsStartingTypingWsMessages', true);

          wsClient.onmessage = (event) => {
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
        return lexClient.postText(text, localeId, session);
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

    return context.dispatch('getCredentials', context.state.config)
      .then(() => {
        const localeId = context.state.config.lex.v2BotLocaleId
          ? context.state.config.lex.v2BotLocaleId.split(',')[0]
          : undefined;
        timeStart = performance.now();
        return lexClient.postContent(
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

  /***********************************************************************
   *
   * Live Chat Actions
   *
   **********************************************************************/
  initLiveChat(context) {
    require('amazon-connect-chatjs');
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

      context.dispatch('getCredentials', context.state.config)
        .then((credentials) => {
          const bodyText = JSON.stringify(initiateChatRequest);
          const url = new URL(context.state.config.connect.apiGatewayEndpoint);

          const request = new HttpRequest({
            hostname: url.hostname,
            path: url.pathname + url.search,
            method: 'POST',
            mode: 'cors',
            body: bodyText,
            headers: {
              host: url.hostname, // host is required by AWS Signature V4
              "Content-Type": "application/json",
            },
          });

          const signer = new SignatureV4({
            credentials,
            region: context.state.config.region,
            service: 'execute-api',
            sha256: Sha256,
          });

          signer.sign(request).then((signedRequest) => {
            return fetch(context.state.config.connect.apiGatewayEndpoint, signedRequest)
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
                liveChatSession = createLiveChatSession(result);
                console.info('Live Chat Session Created:', liveChatSession);
                initLiveChatHandlers(context, liveChatSession);
                console.info('Live Chat Handlers initialised:');
                return connectLiveChatSession(liveChatSession);
              })
              .then((response) => {
                console.info('live Chat session connection response', response);
                console.info('Live Chat Session CONNECTED:', liveChatSession);
                context.commit('setLiveChatStatus', liveChatStatus.ESTABLISHED);
                // context.commit('setLiveChatbotSession', liveChatSession);
                return Promise.resolve();
              })
              .catch((error) => {
                console.error("Error esablishing live chat: " + error);
                context.commit('setLiveChatStatus', liveChatStatus.ENDED);
                return Promise.resolve();
              });
        });
      });
    }
    // If TalkDesk endpoint is available use
    else if (context.state.config.connect.talkDeskWebsocketEndpoint) {
      liveChatSession = initTalkDeskLiveChat(context);
      return Promise.resolve();
    }
  },

  requestLiveChat(context) {
    console.info('requestLiveChat');
    if (!context.getters.liveChatUserName()) {
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
    if (context.state.chatMode === chatMode.LIVECHAT && liveChatSession && context.state.config.connect.apiGatewayEndpoint) {
      sendTypingEvent(liveChatSession);
    }
  },
  sendChatMessage(context, message) {
    console.info('actions: sendChatMessage');
    if (context.state.chatMode === chatMode.LIVECHAT && liveChatSession) {
      // If Connect API Gateway Endpoint is set, use Connect
      if (context.state.config.connect.apiGatewayEndpoint) {
        sendChatMessage(liveChatSession, message);
      }
      // If TalkDesk endpoint is available use
      else if (context.state.config.connect.talkDeskWebsocketEndpoint) {
        sendTalkDeskChatMessage(context, liveChatSession, message);

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
    if (context.state.chatMode === chatMode.LIVECHAT && liveChatSession) {

      // If Connect API Gateway Endpoint is set, use Connect
      if (context.state.config.connect.apiGatewayEndpoint) {
        requestLiveChatEnd(liveChatSession);
      }
      // If TalkDesk endpoint is available use
      else if (context.state.config.connect.talkDeskWebsocketEndpoint) {
        requestTalkDeskLiveChatEnd(context, liveChatSession, "agent");
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
    liveChatSession = null;
    context.commit('setLiveChatStatus', liveChatStatus.ENDED);
    context.commit('setChatMode', chatMode.BOT);
    context.commit('clearLiveChatIntervalId');
  },
  liveChatAgentJoined(context) {
    context.commit('clearLiveChatIntervalId');
  },
  /***********************************************************************
   *
   * Credentials Actions
   *
   **********************************************************************/
  async getCredentials(context, config) {
    // If we already have creds don't go get them again
    if (awsCredentials) {
      return awsCredentials;
    }
    
    const session = await fetchAuthSession();

    var credentials = session.credentials;
    credentials.identityId = session.identityId;
    return credentials;
  },

  async getUserName() {
    try {
      // getCurrentUser will throw an error for unathenticated identities
      const { username } = await getCurrentUser();
      if (username) 
        return '[' + username + ']';
      else 
        return null;
    }
    catch (e) {
      return null;
    }
  },
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
    context.dispatch('getCredentials', context.state.config).then((credentials) => {
      const sessionId = lexClient.userId;
      const url = new URL(context.state.config.lex.streamingWebSocketEndpoint);

      var signedUrl = aws4.sign({
        host: url.host,
        path: `${url.pathname}?sesssionId=${sessionId}`,
        signQuery: true,
      }, {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken,
      });

          wsClient = new WebSocket("wss://" + signedUrl.host + signedUrl.path)

          // Add heartbeat logic
          const HEARTBEAT_INTERVAL = 540000; // 9 minutes
          const MAX_DURATION = 7200000; // 2 hours
          const startTime = Date.now();
          let heartbeatTimer = null;

          function startHeartbeat() {
            if (wsClient.readyState === WebSocket.OPEN) {
              const elapsedTime = Date.now() - startTime;
              if (elapsedTime < MAX_DURATION) {
                const pingMessage = JSON.stringify({ action: 'ping' });
                wsClient.send(pingMessage);
                console.log('Sending Ping:', new Date().toISOString());
                heartbeatTimer = setTimeout(startHeartbeat, HEARTBEAT_INTERVAL);
              } else {
                console.log('Stopped sending pings after reaching 2-hour limit.');
                clearTimeout(heartbeatTimer);
              }
            }
          }

          wsClient.onopen = () => {
            console.log('WebSocket Connected');
            startHeartbeat();
          };

          wsClient.onclose = () => {
              console.log('WebSocket Closed');
              clearTimeout(heartbeatTimer);
          };

          wsClient.onerror = (error) => {
              console.log('WebSocket Error', error.message);
              clearTimeout(heartbeatTimer);
          };
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
      credentials: awsCredentials,
      region: context.state.config.region
    });
    //Create a key that is unique to the user & time of upload
    const documentKey = lexClient.userId + '/' + file.name.split('.').join('-' + Date.now() + '.')
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
  }
};