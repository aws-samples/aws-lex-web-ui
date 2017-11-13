<template>
  <v-flex class="message" row>
    <v-chip text-color="black">
      <message-text
        v-bind:message="message"
        v-if="'text' in message && message.text !== null && message.text.length"
      ></message-text>
      <div v-if="message.type === 'human' && message.audio">
        <audio>
          <source v-bind:src="message.audio" type="audio/wav">
        </audio>
        <v-btn left icon class="black--text" v-on:click="playAudio">
          <v-icon class="play-button">play_circle_outline</v-icon>
        </v-btn>
      </div>
      <v-icon
        medium
        v-if="message.type === 'bot' && botDialogState"
        v-bind:class="`dialog-state-${botDialogState.state}`"
      >
        {{botDialogState.icon}}
      </v-icon>
    </v-chip>
    <div class="response-card" v-if="shouldDisplayResponseCard">
      <response-card
        v-for="(card, index) in message.responseCard.genericAttachments"
        v-bind:response-card="card"
        v-bind:key="index"
      >
      </response-card>
    </div>
  </v-flex>
</template>

<script>
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/
import MessageText from './MessageText';
import ResponseCard from './ResponseCard';

export default {
  name: 'message',
  props: ['message'],
  components: {
    MessageText,
    ResponseCard,
  },
  computed: {
    botDialogState() {
      if (!('dialogState' in this.message)) {
        return null;
      }
      switch (this.message.dialogState) {
        case 'Failed':
          return { icon: 'error', color: 'red', state: 'fail' };
        case 'Fulfilled':
        case 'ReadyForFulfillment':
          return { icon: 'done', color: 'green', state: 'ok' };
        default:
          return null;
      }
    },
    shouldDisplayResponseCard() {
      return (
        this.message.responseCard &&
        (this.message.responseCard.version === '1' ||
         this.message.responseCard.version === 1) &&
        this.message.responseCard.contentType === 'application/vnd.amazonaws.card.generic' &&
        'genericAttachments' in this.message.responseCard &&
        this.message.responseCard.genericAttachments instanceof Array
      );
    },
  },
  methods: {
    playAudio() {
      // XXX doesn't play in Firefox or Edge
      /* XXX also tried:
      const audio = new Audio(this.message.audio);
      audio.play();
      */
      const audioElem = this.$el.querySelector('audio');
      if (audioElem) {
        audioElem.play();
      }
    },
  },
};
</script>

<style scoped>
.message {
  /* this is needed for ie11 */
  flex: 1 0 auto;
}

.message-bot .chip {
  background-color: #FFEBEE; /* red-50 from material palette */
}

.message-human .chip {
  background-color: #E8EAF6; /* indigo-50 from material palette */
}

.chip {
  height: auto;
  margin: 8px;
  font-size: calc(1em + 0.25vmin);
  max-width: 66vw;
}

/* workaround for chip overriding icon color as important */
.icon.dialog-state-ok {
  color: green!important;
}
.icon.dialog-state-fail {
  color: red!important;
}

.play-button {
  font-size: 2em;
}

.response-card {
  display: flex;
  justify-content: center;
  margin: 0.8em;
  width: 90vw;
}
</style>
