<template>
  <v-layout
    row
    child-flex
    justify-space-between
    class="input-container"
  >
    <v-toolbar class="white">
      <!--
        using v-show instead of v-if to make recorder-status transition work
      -->
      <v-text-field
        v-bind:label="textInputPlaceholder"
        v-show="shouldShowTextInput"
        v-model="textInput"
        v-on:keyup.enter.stop="postTextMessage"
        v-on:focus="onTextFieldFocus"
        v-on:blur="onTextFieldBlur"
        id="text-input"
        name="text-input"
        single-line
        hide-details
      ></v-text-field>

      <recorder-status
        v-show="!shouldShowTextInput"
      ></recorder-status>

      <v-btn
        v-if="shouldShowSendButton"
        v-on:click="postTextMessage"
        v-bind:disabled="isSendButtonDisabled"
        v-tooltip:left="{html: 'send'}"
        class="black--text mic-button"
        icon
      >
        <v-icon medium>send</v-icon>
      </v-btn>
      <v-btn
        v-else
        v-on:click="onMicClick"
        v-bind:disabled="isMicButtonDisabled"
        v-tooltip:left="{html: micButtonTooltip}"
        class="black--text mic-button"
        icon
      >
        <v-icon medium>{{micButtonIcon}}</v-icon>
      </v-btn>
    </v-toolbar>
  </v-layout>
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

import RecorderStatus from '@/components/RecorderStatus';

export default {
  name: 'input-container',
  data() {
    return {
      textInput: '',
      isTextFieldFocused: false,
    };
  },
  props: ['textInputPlaceholder', 'initialSpeechInstruction'],
  components: {
    RecorderStatus,
  },
  computed: {
    isBotSpeaking() {
      return this.$store.state.botAudio.isSpeaking;
    },
    isSpeechConversationGoing() {
      return this.$store.state.recState.isConversationGoing;
    },
    isMicButtonDisabled() {
      return (
        this.isMicMuted ||
        (this.isSpeechConversationGoing && !this.isBotSpeaking)
      );
    },
    isMicMuted() {
      return this.$store.state.recState.isMicMuted;
    },
    isRecorderSupported() {
      return this.$store.state.recState.isRecorderSupported;
    },
    isRecorderEnabled() {
      return this.$store.state.recState.isRecorderEnabled;
    },
    isSendButtonDisabled() {
      return this.textInput.length < 1;
    },
    micButtonIcon() {
      if (this.isMicMuted) {
        return 'mic_off';
      }
      if (this.isBotSpeaking) {
        return 'stop';
      }
      return 'mic';
    },
    micButtonTooltip() {
      if (this.isMicMuted) {
        return 'mic seems to be muted';
      }
      if (this.isBotSpeaking) {
        return 'interrupt';
      }
      return 'click to use voice';
    },
    shouldShowSendButton() {
      return (
        (this.textInput.length && this.isTextFieldFocused) ||
        (!this.isRecorderSupported || !this.isRecorderEnabled)
      );
    },
    shouldShowTextInput() {
      return !(this.isBotSpeaking || this.isSpeechConversationGoing);
    },
  },
  methods: {
    onMicClick() {
      if (!this.isSpeechConversationGoing) {
        return this.startSpeechConversation();
      } else if (this.isBotSpeaking) {
        return this.$store.dispatch('interruptSpeechConversation');
      }

      return Promise.resolve();
    },
    onTextFieldFocus() {
      this.isTextFieldFocused = true;
    },
    onTextFieldBlur() {
      if (!this.textInput.length && this.isTextFieldFocused) {
        this.isTextFieldFocused = false;
      }
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
    postTextMessage() {
      this.textInput = this.textInput.trim();
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
  /*
  Set height to a known value to make offset calculations deterministic
  Toolbar is 64px. Add 4px to give it a floating look.
   */
  height: 68px;
}
</style>
