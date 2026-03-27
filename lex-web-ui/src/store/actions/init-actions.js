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
 * Initialization Actions
 */

import LexAudioRecorder from '@/lib/lex/recorder';
import initRecorderHandlers from '@/store/handlers/recorder-handlers';
import LexClient from '@/lib/lex/client';
import silentOgg from '@/assets/silent.ogg';
import silentMp3 from '@/assets/silent.mp3';
import shared from './shared-state';

export default {
  initCredentials(context, credentials) {
    switch (context.state.awsCreds.provider) {
      case 'cognito':
      case 'parentWindow':
        if (!credentials) {
          context.dispatch('getCredentials', context.state.config)
            .then((creds) => {
              shared.awsCredentials = creds;
              if (shared.lexClient) {
                shared.lexClient.initCredentials(shared.awsCredentials);
              }
            });
        }
        else {
          shared.awsCredentials = credentials;
          if (shared.lexClient) {
            shared.lexClient.initCredentials(shared.awsCredentials);
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
    shared.lexClient = new LexClient({
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
    shared.lexClient.initCredentials(payload.credentials)
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
    shared.pollyClient = client;
    context.commit('setPollyVoiceId', context.state.config.polly.voiceId);
    shared.pollyClient.config.credentials = credentials;
    return;
  },
  initRecorder(context) {
    if (!context.state.config.recorder.enable) {
      context.commit('setIsRecorderEnabled', false);
      return Promise.resolve();
    }
    shared.recorder = new LexAudioRecorder(context.state.config.recorder);

    return shared.recorder.init()
      .then(() => shared.recorder.initOptions(context.state.config.recorder))
      .then(() => initRecorderHandlers(context, shared.recorder))
      .then(() => context.commit('setIsRecorderSupported', true))
      .then(() => context.commit('setIsMicMuted', shared.recorder.isMicMuted))
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
    shared.audio = audioElement;

    let silentSound;

    // Ogg is the preferred format as it seems to be generally smaller.
    // Detect if ogg is supported (MS Edge doesn't).
    // Can't default to mp3 as it is not supported by some Android browsers
    if (shared.audio.canPlayType('audio/ogg') !== '') {
      context.commit('setAudioContentType', 'ogg');
      silentSound = silentOgg;
    } else if (shared.audio.canPlayType('audio/mp3') !== '') {
      context.commit('setAudioContentType', 'mp3');
      silentSound = silentMp3;
    } else {
      console.error('init audio could not find supportted audio type');
      console.warn(
        'init audio can play mp3 [%s]',
        shared.audio.canPlayType('audio/mp3'),
      );
      console.warn(
        'init audio can play ogg [%s]',
        shared.audio.canPlayType('audio/ogg'),
      );
    }

    console.info('recorder content types: %s', shared.recorder.mimeType);

    shared.audio.preload = 'auto';
    // Load a silent sound as the initial audio. This is used to workaround
    // the requirement of mobile browsers that would only play a
    // sound in direct response to a user action (e.g. click).
    // This audio should be explicitly played as a response to a click
    // in the UI
    shared.audio.src = silentSound;
    // autoplay will be set as a response to a click
    shared.audio.autoplay = false;

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
};
