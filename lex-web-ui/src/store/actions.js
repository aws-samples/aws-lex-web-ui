/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

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
import silentOgg from '@/assets/silent.ogg';
import silentMp3 from '@/assets/silent.mp3';

import LexClient from '@/lib/lex/client';

// non-state variables that may be mutated outside of store
// set via initializers at run time
let awsCredentials;
let pollyClient;
let lexClient;
let audio;
let recorder;

export default {

  /***********************************************************************
   *
   * Initialization Actions
   *
   **********************************************************************/

  initCredentials(context, credentials) {
    switch (context.state.awsCreds.provider) {
      case 'cognito':
        awsCredentials = credentials;
        return context.dispatch('getCredentials');
      case 'parentWindow':
        return context.dispatch('getCredentials');
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
  initLexClient(context, lexRuntimeClient) {
    lexClient = new LexClient({
      botName: context.state.config.lex.botName,
      botAlias: context.state.config.lex.botAlias,
      lexRuntimeClient,
    });

    context.commit('setLexSessionAttributes',
      context.state.config.lex.sessionAttributes,
    );
    return context.dispatch('getCredentials')
      .then(() => {
        lexClient.initCredentials(
          awsCredentials,
        );
      });
  },
  initPollyClient(context, client) {
    if (!context.state.recState.isRecorderEnabled) {
      return Promise.resolve();
    }
    pollyClient = client;
    context.commit('setPollyVoiceId', context.state.config.polly.voiceId);
    return context.dispatch('getCredentials')
      .then((creds) => {
        pollyClient.config.credentials = creds;
      });
  },
  initRecorder(context) {
    if (!context.state.recState.isRecorderEnabled ||
      !context.state.config.recorder.enable
    ) {
      return Promise.resolve();
    }
    recorder = new LexAudioRecorder(
      context.state.config.recorder,
    );

    return recorder.init()
      .then(() => recorder.initOptions(context.state.config.recorder))
      .then(() => initRecorderHandlers(context, recorder))
      .then(() => context.commit('setIsRecorderSupported', true))
      .then(() => context.commit('setIsMicMuted', recorder.isMicMuted))
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
  initBotAudio(context, audioElement) {
    if (!context.state.recState.isRecorderEnabled) {
      return Promise.resolve();
    }
    if (!audioElement) {
      return Promise.reject('invalid audio element');
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
      console.warn('init audio can play mp3 [%s]',
        audio.canPlayType('audio/mp3'));
      console.warn('init audio can play ogg [%s]',
        audio.canPlayType('audio/ogg'));
    }

    console.info('recorder content types: %s',
      recorder.mimeType,
    );

    audio.preload = 'auto';
    // Load a silent sound as the initial audio. This is used to workaround
    // the requirement of mobile browsers that would only play a
    // sound in direct response to a user action (e.g. click).
    // This audio should be explicitly played as a response to a click
    // in the UI
    audio.src = silentSound;
    // autoplay will be set as a response to a clik
    audio.autoplay = false;

    return Promise.resolve();
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

  /***********************************************************************
   *
   * Audio Actions
   *
   **********************************************************************/

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
        reject(`setting audio autoplay failed: ${err}`);
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
  getAudioProperties() {
    return (audio) ?
      {
        currentTime: audio.currentTime,
        duration: audio.duration,
        end: audio.played.end(0),
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
              reject('interrupt interval exceeded');
            }
            count += 1;
          }, intervalTimeInMs);
        });
    });
  },
  postTextMessage(context, message) {
    return context.dispatch('interruptSpeechConversation')
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

  /***********************************************************************
   *
   * Message List Actions
   *
   **********************************************************************/

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

  /***********************************************************************
   *
   * Credentials Actions
   *
   **********************************************************************/

  getCredentialsFromParent(context) {
    const credsExpirationDate = new Date(
      (awsCredentials && awsCredentials.expireTime) ?
        awsCredentials.expireTime :
        0,
    );
    const now = Date.now();
    if (credsExpirationDate > now) {
      return Promise.resolve(awsCredentials);
    }
    return context.dispatch('sendMessageToParentWindow', { event: 'getCredentials' })
      .then((credsResponse) => {
        if (credsResponse.event === 'resolve' &&
            credsResponse.type === 'getCredentials') {
          return Promise.resolve(credsResponse.data);
        }
        return Promise.reject('invalid credential event from parent');
      })
      .then((creds) => {
        const { AccessKeyId, SecretKey, SessionToken } = creds.data.Credentials;
        const IdentityId = creds.data.IdentityId;
        // recreate as a static credential
        awsCredentials = {
          accessKeyId: AccessKeyId,
          secretAccessKey: SecretKey,
          sessionToken: SessionToken,
          identityId: IdentityId,
          expired: false,
          getPromise() { return Promise.resolve(awsCredentials); },
        };

        return awsCredentials;
      });
  },
  getCredentials(context) {
    if (context.state.awsCreds.provider === 'parentWindow') {
      return context.dispatch('getCredentialsFromParent');
    }
    return awsCredentials.getPromise()
      .then(() => awsCredentials);
  },

  /***********************************************************************
   *
   * UI and Parent Communication Actions
   *
   **********************************************************************/

  toggleIsUiMinimized(context) {
    context.commit('toggleIsUiMinimized');
    return context.dispatch(
      'sendMessageToParentWindow',
      { event: 'toggleMinimizeUi' },
    );
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
        context.state.config.ui.parentOrigin, [messageChannel.port2]);
    });
  },
};
