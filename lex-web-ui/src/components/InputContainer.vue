<template>
  <div class="input-container white">
    <v-text-field
      id="text-input"
      name="text-input"
      v-bind:label="textInputPlaceholder"
      v-on:keyup.enter.native.stop="postTextMessage"
      v-model.trim="textInput"
      class="black--text ml-2"
      single-line
    ></v-text-field>

    <v-btn
      v-if="isRecorderSupported"
      v-on:click.native="onMicClick"
      class="black--text mic-button"
      icon
      v-bind:disabled="isMicButtonDisabled"
      v-tooltip:left="{html: 'click to use voice'}"
    >
      <v-icon medium>{{micButtonIcon}}</v-icon>
    </v-btn>
  </div>
</template>

<script>
/*
Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License"). You may
not use this file except in compliance with the License. A copy of the
License is located at

    http://aws.amazon.com/apache2.0/

or in the "license" file accompanying this file. This file is distributed
on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import { mapGetters } from 'vuex';

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
    isMicButtonDisabled() {
      return this.isMicMuted;
    },
    // vuex state getters
    ...mapGetters([
      'isBotSpeaking',
      'isConversationGoing',
      'isMicMuted',
      'isRecorderSupported',
    ]),
  },
  props: ['textInputPlaceholder', 'initialSpeechInstruction', 'initialText'],
  methods: {
    postTextMessage() {
      // empty string
      if (!this.textInput.length) {
        return;
      }
      const message = {
        type: 'human',
        text: this.textInput,
      };

      this.$store.dispatch('postTextMessage', message);
      this.textInput = '';
    },
    onMicClick() {
      if (!this.isConversationGoing) {
        this.startSpeechConversation();
      } else if (this.isBotSpeaking) {
        this.$store.dispatch('interruptSpeechConversation');
      }
    },
    startSpeechConversation() {
      if (this.isMicMuted) {
        return;
      }

      this.setAutoPlay();

      this.playInitialInstruction()
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
      // TODO make this return a promise that resolves when audio is played
      if (!this.$store.state.botAudio.autoPlay) {
        this.$store.state.botAudio.audio.play();
        this.$store.commit('setAudioAutoPlay', true);
      }
    },
  },
};
</script>

<style scoped>
.input-container {
  display: flex;
}
.input-group {
  margin-top: 0.5em;
  margin-bottom: 0;
  margin-right: 0.25em;
}
</style>
