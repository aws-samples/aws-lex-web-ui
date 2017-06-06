<template>
  <div class="status-bar">
    <v-divider></v-divider>
    <div class="status-text">
      <span>{{statusText}}</span>
    </div>
    <div class="voice-controls">
      <transition
        v-on:enter="enterMeter"
        v-on:leave="leaveMeter"
        v-bind:css="false"
      >
        <div v-if="isRecording" class="ml-2 volume-meter">
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
    </div>
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
import { mapGetters } from 'vuex';

export default {
  name: 'status-bar',
  data() {
    return ({
      volume: 0,
      volumeIntervalId: null,
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
        return 'Type or click on the mic';
      }
      return '';
    },
    // vuex state getters
    ...mapGetters([
      'canInterruptBotPlayback',
      'isBotSpeaking',
      'isConversationGoing',
      'isLexInterrupting',
      'isLexProcessing',
      'isMicMuted',
      'isMicQuiet',
      'isRecorderSupported',
      'isRecording',
    ]),
  },
  methods: {
    enterMeter() {
      const intervalTime = 50;
      let max = 0;
      this.volumeIntervalId = setInterval(() => {
        this.volume = this.$store.state.recorder.volume.instant.toFixed(4);
        max = Math.max(this.volume, max);
      }, intervalTime);
    },
    leaveMeter() {
      if (this.volumeIntervalId) {
        clearInterval(this.volumeIntervalId);
      }
    },
  },
};
</script>
<style scoped>
.status-bar {
  display: flex;
  flex-direction: column;
}

.status-text {
  align-self: center;
  display: flex;
  text-align: center;
}

.volume-meter {
  display: flex;
  justify-content: center;
}

.volume-meter meter {
  height: 0.75rem;
  width: 33vw;
}
</style>
