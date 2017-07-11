/*
 Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/* global Audio atob Blob document URL */
/* eslint no-console: ["error", { allow: ["info", "warn", "error"] }] */
/* eslint no-param-reassign: off */
// TODO split getters, mutations and actions into separate files
import Vue from 'vue';
import Vuex from 'vuex';
import AWS from 'aws-sdk/global';
import Polly from 'aws-sdk/clients/polly';

import LexClient from '../lib/lex/client';
import LexAudioRecorder from '../lib/lex/recorder';
import initRecorderHandlers from './recorder-handlers';
import { config, mergeConfig } from '../config';

import silentOgg from '../assets/silent.ogg';
import silentMp3 from '../assets/silent.mp3';

Vue.use(Vuex);

AWS.config.region = config.region;

const lexClient = new LexClient({
  botName: config.lex.botName,
  botAlias: config.lex.botAlias,
  region: config.region,
});

const pollyClient = (config.recorder.enable) ? new Polly() : null;

const recorder = (config.recorder.enable) ? new LexAudioRecorder(
  config.recorder,
) : null;

export default new Vuex.Store({
  // prevent changes outside of mutation handlers
  strict: (process.env.NODE_ENV === 'development'),
  state: {
    lex: {
      acceptFormat: 'audio/ogg',
      dialogState: '',
      isInterrupting: false,
      isProcessing: false,
      inputTranscript: '',
      intentName: '',
      message: '',
      responseCard: null,
      sessionAttributes: config.lex.sessionAttributes,
      slotToElicit: '',
      slots: {},
    },
    messages: [],
    polly: {
      outputFormat: 'ogg_vorbis',
      voiceId: config.polly.voiceId,
    },
    botAudio: {
      // TODO may want to move audio out of state
      audio: new Audio(),
      canInterrupt: false,
      interruptIntervalId: null,
      autoPlay: false,
      isInterrupting: false,
      isSpeaking: false,
    },
    // TODO may want to move recorder out of state and only expose through getters
    recorder,
    recState: {
      isConversationGoing: false,
      isInterrupting: false,
      isMicMuted: false,
      isMicQuiet: true,
      isRecorderSupported: false,
      isRecorderEnabled: config.recorder.enable,
      isRecording: false,
      silentRecordingCount: 0,
    },

    isRunningEmbedded: false, // am I running in an iframe?
    urlQueryParams: {},
    config,

    awsCreds: {
      provider: 'cognito', // cognito|parentWindow
      identityId: null,
    },
  },

  getters: {
    canInterruptBotPlayback: state => state.botAudio.canInterrupt,
    isBotSpeaking: state => state.botAudio.isSpeaking,
    isConversationGoing: state => state.recState.isConversationGoing,
    isLexInterrupting: state => state.lex.isInterrupting,
    isLexProcessing: state => state.lex.isProcessing,
    isMicMuted: state => state.recState.isMicMuted,
    isMicQuiet: state => state.recState.isMicQuiet,
    isRecorderSupported: state => state.recState.isRecorderSupported,
    isRecording: state => state.recState.isRecording,
  },

  // synchronous changes go here in mutations
  mutations: {
    /**
     * true if recorder seems to be muted
     */
    setIsMicMuted(state, bool) {
      if (typeof bool !== 'boolean') {
        console.error('setIsMicMuted status not boolean', bool);
        return;
      }
      if (state.config.recorder.useAutoMuteDetect) {
        state.recState.isMicMuted = bool;
      }
    },
    /**
     * set to true if mic if sound from mic is not loud enough
     */
    setIsMicQuiet(state, bool) {
      if (typeof bool !== 'boolean') {
        console.error('setIsMicQuiet status not boolean', bool);
        return;
      }
      state.recState.isMicQuiet = bool;
    },
    /**
     * set to true while audio from Lex is playing
     */
    setIsBotSpeaking(state, bool) {
      if (typeof bool !== 'boolean') {
        console.error('setIsBotSpeaking status not boolean', bool);
        return;
      }
      state.botAudio.isSpeaking = bool;
    },
    /**
    * set to true while calling lexPost{Text,Content}
    * to mark as processing */
    setIsLexProcessing(state, bool) {
      if (typeof bool !== 'boolean') {
        console.error('setIsLexProcessing status not boolean', bool);
        return;
      }
      state.lex.isProcessing = bool;
    },
    /**
     * set to true while speech conversation is going
     */
    setIsConversationGoing(state, bool) {
      if (typeof bool !== 'boolean') {
        console.error('setIsConversationGoing status not boolean', bool);
        return;
      }
      state.recState.isConversationGoing = bool;
    },
    /**
     * Set to true when the Lex audio is ready to autoplay
     * after it has already played audio on user interaction (click)
     */
    setAudioAutoPlay(state, bool) {
      if (typeof bool !== 'boolean') {
        console.error('setAudioAutoPlay status not boolean', bool);
        return;
      }
      state.botAudio.autoPlay = bool;
    },
    /**
     * Signals recorder to start and sets recoding state to true
     */
    startRecording(state) {
      console.info('start recording');
      if (state.recState.isRecording === false) {
        state.recorder.start();
        state.recState.isRecording = true;
      }
    },
    /**
     * Set recording state to false
     */
    stopRecording(state) {
      if (state.recState.isRecording === true) {
        state.recState.isRecording = false;
      }
    },
    /**
     * Push new message into messages array
     */
    pushMessage(state, message) {
      state.messages.push({
        id: state.messages.length,
        ...message,
      });
    },
    /**
     * Updates Lex State from Lex responses
     */
    updateLexState(state, lexState) {
      state.lex = { ...state.lex, ...lexState };
    },
    /**
     * Increase consecutive silent recordings count
     * This is used to bail out from the conversation
     * when too many recordings are silent
     */
    increaseSilentRecordingCount(state) {
      state.recState.silentRecordingCount += 1;
    },
    /**
     * Reset the number of consecutive silent recordings
     */
    resetSilentRecordingCount(state) {
      state.recState.silentRecordingCount = 0;
    },
    /**
     * Set the supported content types to be used with Lex/Polly
     */
    setAudioContentType(state, type) {
      switch (type) {
        case 'mp3':
        case 'mpg':
        case 'mpeg':
          state.polly.outputFormat = 'mp3';
          state.lex.acceptFormat = 'audio/mpeg';
          break;
        case 'ogg':
        case 'ogg_vorbis':
        case 'x-cbr-opus-with-preamble':
        default:
          state.polly.outputFormat = 'ogg_vorbis';
          state.lex.acceptFormat = 'audio/ogg';
          break;
      }
    },
    /**
     * Update the Cognito identityId
     * Used after refreshing creds
     */
    updateIdentityId(state) {
      state.awsCreds.identityId = AWS.config.credentials.identityId;
    },
    /**
     * Set the AWS credentials provider
     */
    setAwsCredsProvider(state, provider) {
      state.awsCreds.provider = provider;
    },
    /**
     * Set to true if audio recording is supported
     */
    setIsRecorderSupported(state, bool) {
      if (typeof bool !== 'boolean') {
        console.error('setIsRecorderSupported status not boolean', bool);
        return;
      }
      state.recState.isRecorderSupported = bool;
    },
    /**
     * Set to true if running embedded in an iframe
     */
    setIsRunningEmbedded(state, bool) {
      if (typeof bool !== 'boolean') {
        console.error('setIsRunningEmbedded status not boolean', bool);
        return;
      }
      state.isRunningEmbedded = bool;
    },
    /**
     * Sets the parameters being passed in the URL
     */
    setUrlQueryParams(state, query) {
      if (typeof query !== 'object') {
        console.error('query is not an object', query);
        return;
      }
      state.urlQueryParams = query;
    },
    /**
     * Merges the general config of the web ui
     * with a dynamic config param and merges it with
     * the existing config (e.g. initialized from ../config)
     */
    mergeConfig(state, configObj) {
      if (typeof configObj !== 'object') {
        console.error('config is not an object', configObj);
        return;
      }

      // do not accept dynamic parentOrigin
      if (configObj.ui && configObj.ui.parentOrigin) {
        delete configObj.ui.parentOrigin;
      }
      state.config = mergeConfig(state.config, configObj);
    },
    setLexSessionAttributes(state, sessionAttributes) {
      if (typeof sessionAttributes !== 'object') {
        console.error('sessionAttributes is not an object', sessionAttributes);
        return;
      }
      state.lex.sessionAttributes = sessionAttributes;
    },
    setPollyVoiceId(state, voiceId) {
      if (typeof voiceId !== 'string') {
        console.error('polly voiceId is not a string', voiceId);
        return;
      }
      state.polly.voiceId = voiceId;
    },
    setRecorderOptions(state, recorderOptions) {
      if (typeof recorderOptions !== 'object') {
        console.error('recorderOptions is not an object', recorderOptions);
      }
      state.recorder.initOptions(recorderOptions);
    },
    /**
    * set to true if lex is being interrupted while speaking
    */
    setIsLexInterrupting(state, bool) {
      if (typeof bool !== 'boolean') {
        console.error('setIsLexInterrupting status not boolean', bool);
        return;
      }
      state.lex.isInterrupting = bool;
    },
    /**
    * set to true if bot playback can be interrupted
    */
    setCanInterruptBotPlayback(state, bool) {
      if (typeof bool !== 'boolean') {
        console.error('setCanInterruptBotPlayback status not boolean', bool);
        return;
      }
      state.botAudio.canInterrupt = bool;
    },
    /**
    * set to true if bot playback is being interrupted
    */
    setIsBotPlaybackInterrupting(state, bool) {
      if (typeof bool !== 'boolean') {
        console.error('setIsBotPlaybackInterrupting status not boolean', bool);
        return;
      }
      state.botAudio.isInterrupting = bool;
    },
    /**
    * used to set the setInterval Id for bot playback interruption
    */
    setBotPlaybackInterruptIntervalId(state, id) {
      if (typeof id !== 'number') {
        console.error('setIsBotPlaybackInterruptIntervalId id is not a number', id);
        return;
      }
      state.botAudio.interruptIntervalId = id;
    },
  },

  // asynchronous changes go into actions which in turn can call mutations
  actions: {
    initCredentials(context) {
      switch (context.state.awsCreds.provider) {
        case 'cognito':
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: config.cognito.poolId,
          });
          return context.dispatch('getCredentials');
        case 'parentWindow':
          return context.dispatch('sendMessageToParentWindow', { event: 'getCredentials' })
            .then((credsResponse) => {
              if (credsResponse.event === 'resolve' &&
                  credsResponse.type === 'getCredentials') {
                return Promise.resolve(credsResponse.data);
              }
              return Promise.reject('invalid credential event from parent');
            })
            .then((creds) => {
              AWS.config.credentials =
                new AWS.CognitoIdentityCredentials(creds.params);

              if (!('getPromise' in AWS.config.credentials)) {
                const error = 'getPromise not found in state credentials';
                console.error(error);
                return Promise.reject(error);
              }

              return context.dispatch('getCredentials');
            });
        default:
          return Promise.reject('unknown credential provider');
      }
    },
    getConfigFromParent(context) {
      if (!context.state.isRunningEmbedded) {
        return Promise.resolve({});
      }

      return context.dispatch('sendMessageToParentWindow',
        { event: 'initIframeConfig' },
      )
        .then((configResponse) => {
          if (configResponse.event === 'resolve' &&
              configResponse.type === 'initIframeConfig') {
            return Promise.resolve(configResponse.data);
          }
          return Promise.reject('invalid config event from parent');
        });
    },
    initConfig(context, configObj) {
      context.commit('mergeConfig', configObj);
    },
    initMessageList(context) {
      context.commit('pushMessage', {
        type: 'bot',
        text: context.state.config.lex.initialText,
      });
    },
    initLexClient(context) {
      lexClient.botName = context.state.config.lex.botName;
      lexClient.botAlias = context.state.config.lex.botAlias;
      lexClient.region = context.state.config.region;
      context.commit('setLexSessionAttributes',
        context.state.config.lex.sessionAttributes,
      );
      return context.dispatch('getCredentials')
        .then((creds) => {
          lexClient.identityId = context.state.awsCreds.identityId;
          lexClient.lexRuntime.config.credentials = creds;
        });
    },
    initPollyClient(context) {
      if (!context.state.recState.isRecorderEnabled) {
        return Promise.resolve();
      }
      context.commit('setPollyVoiceId', context.state.config.polly.voiceId);
      return context.dispatch('getCredentials')
        .then((creds) => {
          pollyClient.config.credentials = creds;
        });
    },
    initRecorder(context) {
      if (!context.state.recState.isRecorderEnabled) {
        return Promise.resolve();
      }
      return context.state.recorder.init()
        .then(() => context.commit('setRecorderOptions', context.state.config.recorder))
        .then(() => initRecorderHandlers(context))
        .then(() => context.commit('setIsRecorderSupported', true))
        .then(() => context.commit('setIsMicMuted', context.state.recorder.isMicMuted))
        .catch((error) => {
          if (['PermissionDeniedError', 'NotAllowedError'].indexOf(error.name)
              >= 0) {
            console.warn('get user media permission denied');
            context.dispatch('pushErrorMessage',
              'It seems like the microphone access has been denied. ' +
              'If you want to use voice, please allow mic usage in your browser.',
            );
          } else {
            console.error('error while initRecorder', error);
          }
        });
    },
    initBotAudio(context) {
      if (!context.state.recState.isRecorderEnabled) {
        return;
      }
      let silentSound;
      const audio = context.state.botAudio.audio;

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
        console.warn('init audio can play mp3 [%s]',
          audio.canPlayType('audio/mp3'));
        console.warn('init audio can play ogg [%s]',
          audio.canPlayType('audio/ogg'));
      }

      console.info('recorder content types: %s',
        context.state.recorder.mimeType,
      );

      audio.preload = 'auto';
      audio.autoplay = true;
      // Load a silent sound as the initial audio. This is used to workaround
      // the requirement of mobile browsers that would only play a
      // sound in direct response to a user action (e.g. click).
      // This audio should be explicitly played as a response to a click
      // in the UI
      audio.src = silentSound;
    },
    reInitBot(context) {
      return Promise.resolve()
        .then(() => (
          (context.state.config.ui.pushInitialTextOnRestart) ?
            context.dispatch('pushMessage', {
              text: context.state.config.lex.initialText,
              type: 'bot',
            }) :
            Promise.resolve()
        ))
        .then(() => (
          (context.state.config.lex.reInitSessionAttributesOnRestart) ?
            context.commit('setLexSessionAttributes',
              context.state.config.lex.sessionAttributes,
            ) :
            Promise.resolve()
        ));
    },
    getAudioUrl(context, blob) {
      let url;

      try {
        url = URL.createObjectURL(blob);
      } catch (error) {
        console.error('getAudioUrl createObjectURL error', error);
        return Promise.reject(
          `There was an error processing the audio response (${error})`,
        );
      }

      return Promise.resolve(url);
    },
    playAudio(context, url) {
      const audio = context.state.botAudio.audio;

      return new Promise((resolve) => {
        audio.onloadedmetadata = () => {
          context.commit('setIsBotSpeaking', true);
          context.dispatch('playAudioHandler')
            .then(() => resolve());
        };
        // XXX consider revoking previous URL after first play
        // URL.revokeObjectURL(audio.src);
        audio.src = url;
      });
    },
    playAudioHandler(context) {
      return new Promise((resolve, reject) => {
        const { enablePlaybackInterrupt } = context.state.config.lex;
        const { audio } = context.state.botAudio;

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
          reject(`There was an error playing the response (${error})`);
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
      const { audio, isSpeaking } = context.state.botAudio;
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
        const duration = audio.duration;
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
    startConversation(context) {
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
        return Promise.reject('The microphone seems to be muted.');
      }

      context.commit('startRecording');
      return Promise.resolve();
    },
    pollyGetBlob(context, text) {
      const synthReq = pollyClient.synthesizeSpeech({
        Text: text,
        VoiceId: context.state.polly.voiceId,
        OutputFormat: context.state.polly.outputFormat,
      });
      return context.dispatch('getCredentials')
        .then(() => synthReq.promise())
        .then(data =>
          Promise.resolve(
            new Blob(
              [data.AudioStream], { type: data.ContentType },
            ),
          ),
        );
    },
    pollySynthesizeSpeech(context, text) {
      return context.dispatch('pollyGetBlob', text)
        .then(blob => context.dispatch('getAudioUrl', blob))
        .then(audioUrl => context.dispatch('playAudio', audioUrl));
    },
    interruptSpeechConversation(context) {
      if (!context.state.recState.isConversationGoing) {
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        context.dispatch('stopConversation')
          .then(() => {
            context.state.recorder.stop();
            return context.dispatch('stopRecording');
          })
          .then(() => {
            if (context.state.botAudio.isSpeaking) {
              context.state.botAudio.audio.pause();
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
                reject('interrupt interval exceeded');
              }
              count += 1;
            }, intervalTimeInMs);
          });
      });
    },
    postTextMessage(context, message) {
      context.dispatch('interruptSpeechConversation')
        .then(() => context.dispatch('pushMessage', message))
        .then(() => context.dispatch('lexPostText', message.text))
        .then(response => context.dispatch('pushMessage',
          {
            text: response.message,
            type: 'bot',
            dialogState: context.state.lex.dialogState,
            responseCard: context.state.lex.responseCard,
          },
        ))
        .then(() => {
          if (context.state.lex.dialogState === 'Fulfilled') {
            context.dispatch('reInitBot');
          }
        })
        .catch((error) => {
          console.error('error in postTextMessage', error);
          context.dispatch('pushErrorMessage',
            `I was unable to process your message. ${error}`,
          );
        });
    },
    lexPostText(context, text) {
      context.commit('setIsLexProcessing', true);
      return context.dispatch('getCredentials')
        .then(() =>
          lexClient.postText(text, context.state.lex.sessionAttributes),
        )
        .then((data) => {
          context.commit('setIsLexProcessing', false);
          return context.dispatch('updateLexState', data)
            .then(() => Promise.resolve(data));
        });
    },
    lexPostContent(context, audioBlob, offset = 0) {
      context.commit('setIsLexProcessing', true);
      console.info('audio blob size:', audioBlob.size);
      let timeStart;

      return context.dispatch('getCredentials')
        .then(() => {
          timeStart = performance.now();
          return lexClient.postContent(
            audioBlob,
            context.state.lex.sessionAttributes,
            context.state.lex.acceptFormat,
            offset,
          );
        })
        .then((lexResponse) => {
          const timeEnd = performance.now();
          console.info('lex postContent processing time:',
            ((timeEnd - timeStart) / 1000).toFixed(2),
          );
          context.commit('setIsLexProcessing', false);
          return context.dispatch('updateLexState', lexResponse)
            .then(() =>
              context.dispatch('processLexContentResponse', lexResponse),
            )
            .then(blob => Promise.resolve(blob));
        });
    },
    processLexContentResponse(context, lexData) {
      const { audioStream, contentType, dialogState } = lexData;

      return Promise.resolve()
        .then(() => {
          if (!audioStream || !audioStream.length) {
            const text = (dialogState === 'ReadyForFulfillment') ?
              'All done' :
              'There was an error';
            return context.dispatch('pollyGetBlob', text);
          }

          return Promise.resolve(
            new Blob([audioStream], { type: contentType }),
          );
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
          return Promise.reject('error parsing appContext in sessionAttributes');
        }
      }
      context.commit('updateLexState', { ...lexStateDefault, ...lexState });
      if (context.state.isRunningEmbedded) {
        context.dispatch('sendMessageToParentWindow',
          { event: 'updateLexState', state: context.state.lex },
        );
      }
      return Promise.resolve();
    },
    stopRecording(context) {
      context.commit('stopRecording');
    },
    pushMessage(context, message) {
      context.commit('pushMessage', message);
    },
    pushErrorMessage(context, text, dialogState = 'Failed') {
      context.commit('pushMessage', {
        type: 'bot',
        text,
        dialogState,
      });
    },
    getCredentials(context) {
      return AWS.config.credentials.getPromise()
        .then(() => {
          context.commit('updateIdentityId');
          return Promise.resolve(AWS.config.credentials);
        });
    },
    sendMessageToParentWindow(context, message) {
      if (!context.state.isRunningEmbedded) {
        const error = 'sendMessage called when not running embedded';
        console.warn(error);
        return Promise.reject(error);
      }

      return new Promise((resolve, reject) => {
        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = (evt) => {
          messageChannel.port1.close();
          messageChannel.port2.close();
          if (evt.data.event === 'resolve') {
            resolve(evt.data);
          } else {
            reject(`error in sendMessageToParentWindow ${evt.data.error}`);
          }
        };
        parent.postMessage(message,
          config.ui.parentOrigin, [messageChannel.port2]);
      });
    },
  },
});
