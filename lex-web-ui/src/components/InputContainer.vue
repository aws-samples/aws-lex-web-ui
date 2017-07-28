<template>
  <div class="input-container white">
    <v-text-field
      id="text-input"
      name="text-input"
      v-bind:label="textInputPlaceholder"
      v-on:keyup.enter.native.stop="postTextMessage"
      v-model.trim="textInput"
      class="black--text ml-2 pb-1"
      single-line
    ></v-text-field>

    <v-btn
      v-if="isRecorderSupported"
      v-on:click.native="onMicClick"
      class="black--text mic-button"
      icon
      v-bind:disabled="isMicButtonDisabled"
      v-tooltip:left="{html: micTooltip}"
    >
      <v-icon medium>{{micButtonIcon}}</v-icon>
    </v-btn>
  </div>
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
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

export default {
  name: 'input-container',
  data() {
    return {
      textInput: '',
    };
  },
  computed: {
    micButtonIcon() {
      if (this.isMicMuted) {
        return 'mic_off';
      }
      if (this.isBotSpeaking) {
        return 'stop';
      }
      return 'mic';
    },
    micTooltip() {
      if (this.isMicMuted) {
        return 'mic seems to be muted';
      }
      if (this.isBotSpeaking) {
        return 'interrupt';
      }
      return 'click to use voice';
    },
    isMicButtonDisabled() {
      return this.isMicMuted;
    },
    isBotSpeaking() {
      return this.$store.state.botAudio.isSpeaking;
    },
    isConversationGoing() {
      return this.$store.state.recState.isConversationGoing;
    },
    isMicMuted() {
      return this.$store.state.recState.isMicMuted;
    },
    isRecorderSupported() {
      return this.$store.state.recState.isRecorderSupported;
    },
  },
  props: ['textInputPlaceholder', 'initialSpeechInstruction', 'initialText'],
  methods: {
    postTextMessage() {
      // empty string
      if (!this.textInput.length) {
        return Promise.resolve();
      }
      const message = {
        type: 'human',
        text: this.textInput,
      };

      return this.$store.dispatch('postTextMessage', message)
        .then(() => {
          this.textInput = '';
        });
    },
    onMicClick() {
      if (!this.isConversationGoing) {
        return this.startSpeechConversation();
      } else if (this.isBotSpeaking) {
        return this.$store.dispatch('interruptSpeechConversation');
      }

      return Promise.resolve();
    },
    startSpeechConversation() {
      if (this.isMicMuted) {
        return Promise.resolve();
      }
      return this.setAutoPlay()
        .then(() => this.playInitialInstruction())
        .then(() => this.$store.dispatch('startConversation'))
        .catch((error) => {
          console.error('error in startSpeechConversation', error);
          this.$store.dispatch('pushErrorMessage',
            `I couldn't start the conversation. Please try again. (${error})`,
          );
        });
    },
    playInitialInstruction() {
      const isInitialState = ['', 'Fulfilled', 'Failed']
        .some(initialState =>
          this.$store.state.lex.dialogState === initialState,
        );

      return (isInitialState) ?
        this.$store.dispatch('pollySynthesizeSpeech',
          this.initialSpeechInstruction,
        ) :
        Promise.resolve();
    },
    /**
     * Set auto-play attribute on audio element
     * On mobile, Audio nodes do not autoplay without user interaction.
     * To workaround that requirement, this plays a short silent audio mp3/ogg
     * as a reponse to a click. This silent audio is initialized as the src
     * of the audio node. Subsequent play on the same audio now
     * don't require interaction so this is only done once.
     */
    setAutoPlay() {
      if (this.$store.state.botAudio.autoPlay) {
        return Promise.resolve();
      }
      return this.$store.dispatch('setAudioAutoPlay');
    },
  },
};
</script>

<style scoped>
.input-container {
  display: flex;
  align-items: center;
}
</style>
