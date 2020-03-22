<template>
  <v-flex class="recorder-status white">
    <div class="status-text">
      <span>{{statusText}}</span>
    </div>

    <div
      class="voice-controls ml-2"
    >
      <transition
        v-on:enter="enterMeter"
        v-on:leave="leaveMeter"
        v-bind:css="false"
      >
        <div v-if="isRecording" class="volume-meter">
          <meter
            v-bind:value="volume"
            min="0.0001"
            low="0.005"
            optimum="0.04"
            high="0.07"
            max="0.09"
          ></meter>
        </div>
      </transition>

      <v-progress-linear
        v-bind:indeterminate="true"
        v-if="isProcessing"
        class="processing-bar ma-0"
      ></v-progress-linear>

      <transition
        v-on:enter="enterAudioPlay"
        v-on:leave="leaveAudioPlay"
        v-bind:css="false"
      >
        <v-progress-linear
          v-if="isBotSpeaking"
          v-model="audioPlayPercent"
          class="audio-progress-bar ma-0"
        ></v-progress-linear>
      </transition>
    </div>
  </v-flex>
</template>
<script>
/*
Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

export default {
  name: 'recorder-status',
  data() {
    return ({
      volume: 0,
      volumeIntervalId: null,
      audioPlayPercent: 0,
      audioIntervalId: null,
    });
  },
  computed: {
    isSpeechConversationGoing() {
      return this.isConversationGoing;
    },
    isProcessing() {
      return (
        this.isSpeechConversationGoing &&
        !this.isRecording &&
        !this.isBotSpeaking
      );
    },
    statusText() {
      if (this.isInterrupting) {
        return 'Interrupting...';
      }
      if (this.canInterruptBotPlayback) {
        return 'Say "skip" and I\'ll listen for your answer...';
      }
      if (this.isMicMuted) {
        return 'Microphone seems to be muted...';
      }
      if (this.isRecording) {
        return 'Listening...';
      }
      if (this.isBotSpeaking) {
        return 'Playing audio...';
      }
      if (this.isSpeechConversationGoing) {
        return 'Processing...';
      }
      if (this.isRecorderSupported) {
        return 'Click on the mic';
      }
      return '';
    },
    canInterruptBotPlayback() {
      return this.$store.state.botAudio.canInterrupt;
    },
    isBotSpeaking() {
      return this.$store.state.botAudio.isSpeaking;
    },
    isConversationGoing() {
      return this.$store.state.recState.isConversationGoing;
    },
    isInterrupting() {
      return (
        this.$store.state.recState.isInterrupting ||
        this.$store.state.botAudio.isInterrupting
      );
    },
    isMicMuted() {
      return this.$store.state.recState.isMicMuted;
    },
    isRecorderSupported() {
      return this.$store.state.recState.isRecorderSupported;
    },
    isRecording() {
      return this.$store.state.recState.isRecording;
    },
  },
  methods: {
    enterMeter() {
      const intervalTimeInMs = 50;
      this.volumeIntervalId = setInterval(() => {
        this.$store.dispatch('getRecorderVolume')
          .then((volume) => {
            this.volume = volume.instant.toFixed(4);
          });
      }, intervalTimeInMs);
    },
    leaveMeter() {
      if (this.volumeIntervalId) {
        clearInterval(this.volumeIntervalId);
      }
    },
    enterAudioPlay() {
      const intervalTimeInMs = 20;
      this.audioIntervalId = setInterval(() => {
        this.$store.dispatch('getAudioProperties')
          .then(({ end = 0, duration = 0 }) => {
            const percent = (duration <= 0) ? 0 : (end / duration) * 100;
            this.audioPlayPercent = (Math.ceil(percent / 10) * 10) + 5;
          });
      }, intervalTimeInMs);
    },
    leaveAudioPlay() {
      if (this.audioIntervalId) {
        this.audioPlayPercent = 0;
        clearInterval(this.audioIntervalId);
      }
    },
  },
};
</script>
<style scoped>
.recorder-status {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.status-text {
  align-self: center;
  display: flex;
  text-align: center;
}

.volume-meter {
  display: flex;
}

.volume-meter meter {
  display: flex;
  flex: 1;
  height: 0.75rem;
}

.processing-bar {
  height: 0.75rem;
}

.audio-progress-bar {
  height: 0.75rem;
}
</style>
