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
 * Sets up the initial state of the store
 */
import { config } from '@/config';

export default {
  version: (process.env.PACKAGE_VERSION) ?
    process.env.PACKAGE_VERSION : '0.0.0',
  lex: {
    acceptFormat: 'audio/ogg',
    dialogState: '',
    isInterrupting: false,
    isProcessing: false,
    inputTranscript: '',
    intentName: '',
    message: '',
    responseCard: null,
    sessionAttributes: (
      config.lex &&
      config.lex.sessionAttributes &&
      typeof config.lex.sessionAttributes === 'object'
    ) ? { ...config.lex.sessionAttributes } : {},
    slotToElicit: '',
    slots: {},
  },
  messages: [],
  polly: {
    outputFormat: 'ogg_vorbis',
    voiceId: (
      config.polly &&
      config.polly.voiceId &&
      typeof config.polly.voiceId === 'string'
    ) ? `${config.polly.voiceId}` : 'Joanna',
  },
  botAudio: {
    canInterrupt: false,
    interruptIntervalId: null,
    autoPlay: false,
    isInterrupting: false,
    isSpeaking: false,
  },
  recState: {
    isConversationGoing: false,
    isInterrupting: false,
    isMicMuted: false,
    isMicQuiet: true,
    isRecorderSupported: false,
    isRecorderEnabled: (config.recorder) ? !!config.recorder.enable : true,
    isRecording: false,
    silentRecordingCount: 0,
  },

  isRunningEmbedded: false, // am I running in an iframe?
  isUiMinimized: false, // when running embedded, is the iframe minimized?
  config,

  awsCreds: {
    provider: 'cognito', // cognito|parentWindow
  },
};
