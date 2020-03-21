/*
Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

export default {
  canInterruptBotPlayback: state => state.botAudio.canInterrupt,
  isBotSpeaking: state => state.botAudio.isSpeaking,
  isConversationGoing: state => state.recState.isConversationGoing,
  isLexInterrupting: state => state.lex.isInterrupting,
  isLexProcessing: state => state.lex.isProcessing,
  isMicMuted: state => state.recState.isMicMuted,
  isMicQuiet: state => state.recState.isMicQuiet,
  isRecorderSupported: state => state.recState.isRecorderSupported,
  isRecording: state => state.recState.isRecording,
  isBackProcessing: state => state.isBackProcessing,
  lastUtterance: state => () => {
    if (state.utteranceStack.length === 0) return '';
    return state.utteranceStack[state.utteranceStack.length - 1].t;
  },
};
