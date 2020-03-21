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
 * Vuex store recorder handlers
 */

/* eslint no-console: ["error", { allow: ["info", "warn", "error", "time", "timeEnd"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

const initRecorderHandlers = (context, recorder) => {
  /* global Blob */

  recorder.onstart = () => {
    console.info('recorder start event triggered');
    console.time('recording time');
  };
  recorder.onstop = () => {
    context.dispatch('stopRecording');
    console.timeEnd('recording time');
    console.time('recording processing time');
    console.info('recorder stop event triggered');
  };
  recorder.onsilentrecording = () => {
    console.info('recorder silent recording triggered');
    context.commit('increaseSilentRecordingCount');
  };
  recorder.onunsilentrecording = () => {
    if (context.state.recState.silentRecordingCount > 0) {
      context.commit('resetSilentRecordingCount');
    }
  };
  recorder.onerror = (e) => {
    console.error('recorder onerror event triggered', e);
  };
  recorder.onstreamready = () => {
    console.info('recorder stream ready event triggered');
  };
  recorder.onmute = () => {
    console.info('recorder mute event triggered');
    context.commit('setIsMicMuted', true);
  };
  recorder.onunmute = () => {
    console.info('recorder unmute event triggered');
    context.commit('setIsMicMuted', false);
  };
  recorder.onquiet = () => {
    console.info('recorder quiet event triggered');
    context.commit('setIsMicQuiet', true);
  };
  recorder.onunquiet = () => {
    console.info('recorder unquiet event triggered');
    context.commit('setIsMicQuiet', false);
  };

  // TODO need to change recorder event setter to support
  // replacing handlers instead of adding
  recorder.ondataavailable = (e) => {
    const { mimeType } = recorder;
    console.info('recorder data available event triggered');
    const audioBlob = new Blob([e.detail], { type: mimeType });
    // XXX not used for now since only encoding WAV format
    let offset = 0;
    // offset is only needed for opus encoded ogg files
    // extract the offset where the opus frames are found
    // leaving for future reference
    // https://tools.ietf.org/html/rfc7845
    // https://tools.ietf.org/html/rfc6716
    // https://www.xiph.org/ogg/doc/framing.html
    if (mimeType.startsWith('audio/ogg')) {
      offset = 125 + e.detail[125] + 1;
    }
    console.timeEnd('recording processing time');

    context.dispatch('lexPostContent', audioBlob, offset)
      .then((lexAudioBlob) => {
        if (context.state.recState.silentRecordingCount >=
          context.state.config.converser.silentConsecutiveRecordingMax
        ) {
          const errorMessage =
            'Too many consecutive silent recordings: ' +
            `${context.state.recState.silentRecordingCount}.`;
          return Promise.reject(new Error(errorMessage));
        }
        return Promise.all([
          context.dispatch('getAudioUrl', audioBlob),
          context.dispatch('getAudioUrl', lexAudioBlob),
        ]);
      })
      .then((audioUrls) => {
        // handle being interrupted by text
        if (context.state.lex.dialogState !== 'Fulfilled' &&
            !context.state.recState.isConversationGoing
        ) {
          return Promise.resolve();
        }
        const [humanAudioUrl, lexAudioUrl] = audioUrls;
        context.dispatch('pushMessage', {
          type: 'human',
          audio: humanAudioUrl,
          text: context.state.lex.inputTranscript,
        });
        context.commit('pushUtterance', context.state.lex.inputTranscript);
        if (context.state.lex.message.includes('{"messages":')) {
          const tmsg = JSON.parse(context.state.lex.message);
          if (tmsg && Array.isArray(tmsg.messages)) {
            tmsg.messages.forEach((mes) => {
              context.dispatch(
                'pushMessage',
                {
                  type: 'bot',
                  audio: lexAudioUrl,
                  text: mes.value,
                  dialogState: context.state.lex.dialogState,
                  responseCard: context.state.lex.responseCard,
                  alts: JSON.parse(context.state.lex.sessionAttributes.appContext || '{}').altMessages,
                },
              );
            });
          }
        } else {
          context.dispatch('pushMessage', {
            type: 'bot',
            audio: lexAudioUrl,
            text: context.state.lex.message,
            dialogState: context.state.lex.dialogState,
            responseCard: context.state.lex.responseCard,
            alts: JSON.parse(context.state.lex.sessionAttributes.appContext || '{}').altMessages,
          });
        }
        return context.dispatch('playAudio', lexAudioUrl, {}, offset);
      })
      .then(() => {
        if (
          ['Fulfilled', 'ReadyForFulfillment', 'Failed']
            .indexOf(context.state.lex.dialogState) >= 0
        ) {
          return context.dispatch('stopConversation')
            .then(() => context.dispatch('reInitBot'));
        }

        if (context.state.recState.isConversationGoing) {
          return context.dispatch('startRecording');
        }
        return Promise.resolve();
      })
      .catch((error) => {
        const errorMessage = (context.state.config.ui.showErrorDetails) ?
          ` ${error}` : '';
        console.error('converser error:', error);
        context.dispatch('stopConversation');
        context.dispatch(
          'pushErrorMessage',
          `Sorry, I had an error handling this conversation.${errorMessage}`,
        );
        context.commit('resetSilentRecordingCount');
      });
  };
};
export default initRecorderHandlers;
