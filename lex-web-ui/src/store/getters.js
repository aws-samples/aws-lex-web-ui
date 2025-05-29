/*
Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/
import { jwtDecode } from "jwt-decode";

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
  userName: state => () => {
    let v = '';
    if (state.tokens && state.tokens.idtokenjwt) {
      const decoded = jwtDecode(state.tokens.idtokenjwt);
      if (decoded) {
        if (decoded.email) {
          v = decoded.email;
        }
        if (decoded.preferred_username) {
          v = decoded.preferred_username;
        }
      }
      return `[${v}]`;
    }
    return v;
  },
  liveChatUserName: state => () => {
    let v = '';
    if (state.tokens && state.tokens.idtokenjwt) {
      const decoded = jwtDecode(state.tokens.idtokenjwt);
      if (decoded) {
        if (decoded.preferred_username) {
          v = decoded.preferred_username;
        }
      }
      return `[${v}]`;
    } else if (state.liveChat.username) {
      return state.liveChat.username;
    }
    return v;
  },
  liveChatTextTranscriptArray: state => () => {
    // Support redacting messages delivered to agent based on config.connect.transcriptRedactRegex.
    // Use case is to support redacting post chat survey responses from being seen by agents if user
    // reconnects with an agent.
    const messageTextArray = [];
    var text = "";
    let redactionEnabled = false;
    if (state.config.connect.transcriptRedactRegex && state.config.connect.transcriptRedactRegex.length > 0) {
      redactionEnabled = true;
    }
    let shouldRedactNextMessage = false; // indicates if the next message to append should be redacted
    const regex = redactionEnabled ? new RegExp(`${state.config.connect.transcriptRedactRegex}`, "g") : undefined;
    state.messages.forEach((message) => {
      var nextMessage = message.date.toLocaleTimeString() + ' ' + (message.type === 'bot' ? 'Bot' : 'Human') + ': ' + message.text + '\n';

      if (redactionEnabled && regex) {
        shouldRedactNextMessage = regex.test(nextMessage);
      }

      if (redactionEnabled && shouldRedactNextMessage) {
        nextMessage = message.date.toLocaleTimeString() + ' ' + (message.type === 'bot' ? 'Bot' : 'Human') + ': ' + '###' + '\n';
      }

      if((text + nextMessage).length > 400) {
        messageTextArray.push(text);
        //this is over 1k chars by itself, so we must break it up.
        var subMessageArray = nextMessage.match(/(.|[\r\n]){1,400}/g);
        subMessageArray.forEach((subMsg) => {
          messageTextArray.push(subMsg);
        });
        text = "";
        nextMessage = "";
      }
      text = text + nextMessage;
    });
    messageTextArray.push(text);
    return messageTextArray;
  },
  liveChatTranscriptFile: state => () => {
    var text = 'Bot Transcript: \n';
    state.messages.forEach((message) => text = text + message.date.toLocaleTimeString() + ' ' + (message.type === 'bot' ? 'Bot' : 'Human') + ': ' + message.text + '\n');
    var blob = new Blob([text], { type: 'text/plain'});
    var file = new File([blob], 'chatTranscript.txt', { lastModified: new Date().getTime(), type: blob.type });
    return file;
  },

  wsMessages:(state)=>()=>{
    return state.streaming.wsMessages;
  },

  wsMessagesCurrentIndex:(state) => () =>  {
    return state.streaming.wsMessagesCurrentIndex;
  },

  wsMessagesLength:(state) => () =>{
    return state.streaming.wsMessages.length;
  },

  isStartingTypingWsMessages:(state)=>()=>{
    return state.streaming.isStartingTypingWsMessages;
  }
};
