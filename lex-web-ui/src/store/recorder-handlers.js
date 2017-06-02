/*
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 */

/**
 * Vuex store recorder handlers
 */

/* eslint no-console: ["error", { allow: ["info", "warn", "error", "time", "timeEnd"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

const initRecorderHandlers = (context) => {
  /* global Blob */

  context.state.recorder.onstart = () => {
    console.info('recorder start event triggered');
    console.time('recording time');
  };
  context.state.recorder.onstop = () => {
    context.dispatch('stopRecording');
    console.timeEnd('recording time');
    console.time('recording processing time');
    console.info('recorder stop event triggered');
  };
  context.state.recorder.onsilentrecording = () => {
    console.info('recorder silent recording triggered');
    context.commit('increaseSilentRecordingCount');
  };
  context.state.recorder.onunsilentrecording = () => {
    if (context.state.recState.silentRecordingCount > 0) {
      context.commit('resetSilentRecordingCount');
    }
  };
  context.state.recorder.onerror = (e) => {
    console.error('recorder onerror event triggered', e);
  };
  context.state.recorder.onstreamready = () => {
    console.info('recorder stream ready event triggered');
  };
  context.state.recorder.onmute = () => {
    console.info('recorder mute event triggered');
    context.commit('setIsMicMuted', true);
  };
  context.state.recorder.onunmute = () => {
    console.info('recorder unmute event triggered');
    context.commit('setIsMicMuted', false);
  };
  context.state.recorder.onquiet = () => {
    console.info('recorder quiet event triggered');
    context.commit('setIsMicQuiet', true);
  };
  context.state.recorder.onunquiet = () => {
    console.info('recorder unquiet event triggered');
    context.commit('setIsMicQuiet', false);
  };

  // TODO this needs to be cleaned up and remodeled
  // most of this logic should be in a store action
  // may need to change recorder event setter so support
  // replacing handlers instead of adding
  context.state.recorder.ondataavailable = (e) => {
    const mimeType = context.state.recorder.mimeType;
    console.info('recorder data available event triggered');
    const audioBlob = new Blob(
      [e.detail], { type: mimeType },
    );
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
        return Promise.reject(
          'Too many consecutive silent recordings: ' +
          `${context.state.recState.silentRecordingCount}.`,
        );
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
      context.dispatch('pushMessage', {
        type: 'bot',
        audio: lexAudioUrl,
        text: context.state.lex.message,
        dialogState: context.state.lex.dialogState,
        responseCard: context.state.lex.responseCard,
      });
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
      console.error('converser error:', error);
      context.dispatch('stopConversation');
      context.dispatch('pushErrorMessage',
        `I had an error. ${error}`,
      );
      context.commit('resetSilentRecordingCount');
    });
  };
};
export default initRecorderHandlers;
