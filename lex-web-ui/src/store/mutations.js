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
 * Store mutations
 */

/* eslint no-console: ["error", { allow: ["info", "warn", "error"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint spaced-comment: ["error", "always", { "exceptions": ["*"] }] */

import { mergeConfig } from '@/config';
import { chatMode, liveChatStatus } from '@/store/state';

export default {
  /**
   * state mutations
   */
  // Checks whether a state object exists in sessionStorage and sets the states
  // messages to the previous session.
  reloadMessages(state) {
    const value = sessionStorage.getItem('store');
    if (value !== null) {
      const sessionStore = JSON.parse(value);
      // convert date string into Date object in messages
      state.messages = sessionStore.messages.map(message => {
        return Object.assign({}, message, {
          date: new Date(message.date)
        });
      });
    }
  },

  /***********************************************************************
   *
   * Recorder State Mutations
   *
   **********************************************************************/

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
   * Signals recorder to start and sets recoding state to true
   */
  startRecording(state, recorder) {
    console.info('start recording');
    if (state.recState.isRecording === false) {
      recorder.start();
      state.recState.isRecording = true;
    }
  },
  /**
   * Set recording state to false
   */
  stopRecording(state, recorder) {
    if (state.recState.isRecording === true) {
      state.recState.isRecording = false;
      if (recorder.isRecording) {
        recorder.stop();
      }
    }
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
   * Set to true if audio recording should be enabled
   */
  setIsRecorderEnabled(state, bool) {
    if (typeof bool !== 'boolean') {
      console.error('setIsRecorderEnabled status not boolean', bool);
      return;
    }
    state.recState.isRecorderEnabled = bool;
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

  /***********************************************************************
   *
   * Bot Audio Mutations
   *
   **********************************************************************/

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
   * Set to true when the Lex audio is ready to autoplay
   * after it has already played audio on user interaction (click)
   */
  setAudioAutoPlay(state, { audio, status }) {
    if (typeof status !== 'boolean') {
      console.error('setAudioAutoPlay status not boolean', status);
      return;
    }
    state.botAudio.autoPlay = status;
    audio.autoplay = status;
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

  /***********************************************************************
   *
   * Lex and Polly Mutations
   *
   **********************************************************************/

  /**
   * Updates Lex State from Lex responses
   */
  updateLexState(state, lexState) {
    state.lex = { ...state.lex, ...lexState };
  },
  /**
   * Sets the Lex session attributes
   */
  setLexSessionAttributes(state, sessionAttributes) {
    if (typeof sessionAttributes !== 'object') {
      console.error('sessionAttributes is not an object', sessionAttributes);
      return;
    }
    state.lex.sessionAttributes = sessionAttributes;
  },
  setLexSessionAttributeValue(state, data) {
    try {
      const setPath = (object, path, value) => path
        .split('.')
        .reduce((o, p, i) => o[p] = path.split('.').length === ++i ? value : o[p] || {}, object);

      setPath(state.lex.sessionAttributes, data.key, data.value);
    } catch (e) {
      console.error(`could not set session attribute: ${e} for ${JSON.stringify(data)}`);
    }
  },
  /**
  * set to true while calling lexPost{Text,Content}
  * to mark as processing
  */
  setIsLexProcessing(state, bool) {
    if (typeof bool !== 'boolean') {
      console.error('setIsLexProcessing status not boolean', bool);
      return;
    }
    state.lex.isProcessing = bool;
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
   * Set the Polly voice to be used by the client
   */
  setPollyVoiceId(state, voiceId) {
    if (typeof voiceId !== 'string') {
      console.error('polly voiceId is not a string', voiceId);
      return;
    }
    state.polly.voiceId = voiceId;
  },

  /***********************************************************************
   *
   * UI and General Mutations
   *
   **********************************************************************/

  /**
   * Merges the general config of the web ui
   * with a dynamic config param and merges it with
   * the existing config (e.g. initialized from ../config)
   */
  mergeConfig(state, config) {
    if (typeof config !== 'object') {
      console.error('config is not an object', config);
      return;
    }

    // region for lexRuntimeClient and cognito pool are required to be the same.
    // Use cognito pool-id to adjust the region identified in the config.
    state.config.region = config.cognito.poolId.split(':')[0] || 'us-east-1';

    // security: do not accept dynamic parentOrigin
    const parentOrigin = (
      state.config && state.config.ui &&
      state.config.ui.parentOrigin
    ) ?
      state.config.ui.parentOrigin :
      config.ui.parentOrigin || window.location.origin;
    const configFiltered = {
      ...config,
      ...{ ui: { ...config.ui, parentOrigin } },
    };
    if (state.config && state.config.ui && state.config.ui.parentOrigin &&
      config.ui && config.ui.parentOrigin &&
      config.ui.parentOrigin !== state.config.ui.parentOrigin
    ) {
      console.warn('ignoring parentOrigin in config: ', config.ui.parentOrigin);
    }
    state.config = mergeConfig(state.config, configFiltered);
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
  * used to track the expand/minimize status of the window when
  * running embedded in an iframe
  */
  toggleIsUiMinimized(state) {
    state.isUiMinimized = !state.isUiMinimized;
  },

  setInitialUtteranceSent(state) {
    state.initialUtteranceSent = true;
  },
  toggleIsSFXOn(state) {
    state.isSFXOn = !state.isSFXOn;
  },
  /**
   * used to track the appearance of the input container
   * when the appearance of buttons should hide it
   */
  toggleHasButtons(state) {
    state.hasButtons = !state.hasButtons;
  },
  /**
   * used to track the expand/minimize status of the window when
   * running embedded in an iframe
   */
  setIsLoggedIn(state, bool) {
    state.isLoggedIn = bool;
  },
  /**
   * use to set the state of keep session history
   */
  setIsSaveHistory(state, bool) {
    state.isSaveHistory = bool;
  },

  /**
   * use to set the chat mode ( either bot or livechat )
   */
  setChatMode(state, mode) {
    if (typeof mode !== 'string' || !Object.values(chatMode).find(element => element === mode.toLowerCase())) {
      console.error('chatMode is not vaild', mode.toLowerCase());
      return;
    }
    state.chatMode = mode.toLowerCase();
  },

  setLiveChatIntervalId(state, intervalId) {
    state.liveChat.intervalId = intervalId;
  },
  clearLiveChatIntervalId(state) {
    if (state.liveChat.intervalId) {
      clearInterval(state.liveChat.intervalId);
      state.liveChat.intervalId = undefined;
    }
  },
  /**
   * use to set the live chat status
   */
  setLiveChatStatus(state, status) {
    if (typeof status !== 'string' || !Object.values(liveChatStatus).find(element => element === status.toLowerCase())) {
      console.error('liveChatStatus is not vaild', status.toLowerCase());
      return;
    }
    state.liveChat.status = status.toLowerCase();
  },
  /**
   * use to set the TalkDesk Id for live chat
   */
  setTalkDeskConversationId(state, id) {
    if (typeof id !== 'string') {
      console.error('setTalkDeskConversationId is not vaild', id);
      return;
    }
    state.liveChat.talkDeskConversationId = id;
  },
  /**
  * set to true while live chat session is being created or agent is typing
  */
  setIsLiveChatProcessing(state, bool) {
    if (typeof bool !== 'boolean') {
      console.error('setIsLiveChatProcessing status not boolean', bool);
      return;
    }
    state.liveChat.isProcessing = bool;
  },

  setLiveChatUserName(state, name) {
    if (typeof name !== 'string') {
      console.error('setLiveChatUserName is not vaild', name);
      return;
    }
    state.liveChat.username = name;
  },

  reset(state) {
    const s = {
      messages: [],
      utteranceStack: [],
    };
    Object.keys(s).forEach((key) => {
      state[key] = s[key];
    });
  },
  /**
   * Update tokens from cognito authentication
   * @param state
   * @param tokens
   */
  reapplyTokensToSessionAttributes(state) {
    if (state) {
      if (state.tokens.idtokenjwt) {
        console.error('found idtokenjwt');
        state.lex.sessionAttributes.idtokenjwt = state.tokens.idtokenjwt;
      }
      if (state.tokens.accesstokenjwt) {
        console.error('found accesstokenjwt');
        state.lex.sessionAttributes.accesstokenjwt = state.tokens.accesstokenjwt;
      }
      if (state.tokens.refreshtoken) {
        console.error('found refreshtoken');
        state.lex.sessionAttributes.refreshtoken = state.tokens.refreshtoken;
      }
    }
  },

  /**
   * Update tokens from cognito authentication
   * @param state
   * @param tokens
   */
  setTokens(state, tokens) {
    if (tokens) {
      state.tokens.idtokenjwt = tokens.idtokenjwt;
      state.tokens.accesstokenjwt = tokens.accesstokenjwt;
      state.tokens.refreshtoken = tokens.refreshtoken;
      state.lex.sessionAttributes.idtokenjwt = tokens.idtokenjwt;
      state.lex.sessionAttributes.accesstokenjwt = tokens.accesstokenjwt;
      state.lex.sessionAttributes.refreshtoken = tokens.refreshtoken;
    } else {
      state.tokens = undefined;
    }
  },
  /**
   * Push new message into messages array
   */
  pushMessage(state, message) {
    state.messages.push({
      id: state.messages.length,
      date: new Date(),
      ...message,
    });
  },
  /**
   * Push new liveChat message into messages array
   */
  pushLiveChatMessage(state, message) {
    state.messages.push({
      id: state.messages.length,
      date: new Date(),
      ...message,
    });
  },
  /**
   * Set the AWS credentials provider
   */
  setAwsCredsProvider(state, provider) {
    state.awsCreds.provider = provider;
  },
  /**
   * Push a user's utterance onto the utterance stack to be used with back functionality
   */
  pushUtterance(state, utterance) {
    if (!state.isBackProcessing) {
      state.utteranceStack.push({
        t: utterance,
      });
      // max of 1000 utterances allowed in the stack
      if (state.utteranceStack.length > 1000) {
        state.utteranceStack.shift();
      }
    } else {
      state.isBackProcessing = !state.isBackProcessing;
    }
  },
  popUtterance(state) {
    if (state.utteranceStack.length === 0) return;
    state.utteranceStack.pop();
  },
  toggleBackProcessing(state) {
    state.isBackProcessing = !state.isBackProcessing;
  },
  clearMessages(state) {
    state.messages = [];
    state.lex.sessionAttributes = {};
  },
  setPostTextRetry(state, bool) {
    if (typeof bool !== 'boolean') {
      console.error('setPostTextRetry status not boolean', bool);
      return;
    }
    if (bool === false) {
      state.lex.retryCountPostTextTimeout = 0;
    } else {
      state.lex.retryCountPostTextTimeout += 1;
    }
    state.lex.isPostTextRetry = bool;
  },
  updateLocaleIds(state, data) {
    state.config.lex.v2BotLocaleId = data;
  },
};
