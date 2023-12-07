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
  canInterruptBotPlayback: (state) => state.botAudio.canInterrupt,
  isBotSpeaking: (state) => state.botAudio.isSpeaking,
  isConversationGoing: (state) => state.recState.isConversationGoing,
  isLexInterrupting: (state) => state.lex.isInterrupting,
  isLexProcessing: (state) => state.lex.isProcessing,
  isMicMuted: (state) => state.recState.isMicMuted,
  isMicQuiet: (state) => state.recState.isMicQuiet,
  isRecorderSupported: (state) => state.recState.isRecorderSupported,
  isRecording: (state) => state.recState.isRecording,
  isBackProcessing: (state) => state.isBackProcessing,
  lastUtterance: (state) => () => {
    if (state.utteranceStack.length === 0) return ''
    return state.utteranceStack[state.utteranceStack.length - 1].t
  },
  userName: (state) => () => {
    let v = ''
    if (state.tokens && state.tokens.idtokenjwt) {
      const decoded = jwt.decode(state.tokens.idtokenjwt, { complete: true })
      if (decoded) {
        if (decoded.payload) {
          if (decoded.payload.email) {
            v = decoded.payload.email
          }
          if (decoded.payload.preferred_username) {
            v = decoded.payload.preferred_username
          }
        }
      }
      return `[${v}]`
    }
    return v
  },
  liveChatUserName: (state) => () => {
    let v = ''
    if (state.tokens && state.tokens.idtokenjwt) {
      const decoded = jwt.decode(state.tokens.idtokenjwt, { complete: true })
      if (decoded) {
        if (decoded.payload) {
          if (decoded.payload.preferred_username) {
            v = decoded.payload.preferred_username
          }
        }
      }
      return `[${v}]`
    } else if (state.liveChat.username) {
      return state.liveChat.username
    }
    return v
  },
  liveChatTextTranscriptArray: (state) => () => {
    const messageTextArray = []
    var text = ''
    state.messages.forEach((message) => {
      var nextMessage =
        message.date.toLocaleTimeString() +
        ' ' +
        (message.type === 'bot' ? 'Bot' : 'Human') +
        ': ' +
        message.text +
        '\n'
      if ((text + nextMessage).length > 400) {
        messageTextArray.push(text)
        //this is over 1k chars by itself, so we must break it up.
        var subMessageArray = nextMessage.match(/(.|[\r\n]){1,400}/g)
        subMessageArray.forEach((subMsg) => {
          messageTextArray.push(subMsg)
        })
        text = ''
        nextMessage = ''
      }
      text = text + nextMessage
    })
    messageTextArray.push(text)
    return messageTextArray
  },
  liveChatTranscriptFile: (state) => () => {
    var text = 'Bot Transcript: \n'
    state.messages.forEach(
      (message) =>
        (text =
          text +
          message.date.toLocaleTimeString() +
          ' ' +
          (message.type === 'bot' ? 'Bot' : 'Human') +
          ': ' +
          message.text +
          '\n')
    )
    var blob = new Blob([text], { type: 'text/plain' })
    var file = new File([blob], 'chatTranscript.txt', {
      lastModified: new Date().getTime(),
      type: blob.type
    })
    return file
  }
}
