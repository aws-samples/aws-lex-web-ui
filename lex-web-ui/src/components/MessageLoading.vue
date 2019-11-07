<template>
  <v-flex d-flex class="message message-bot">
    <!-- contains message and response card -->
    <v-layout column ma-2 class="message-layout">

      <!-- contains message bubble and date -->
      <v-flex d-flex class="message-bubble-date-container">
        <v-layout column class="message-bubble-column">

          <!-- contains message bubble and avatar -->
          <v-flex d-flex class="message-bubble-avatar-container">
            <v-layout row class="message-bubble-row">
              <div
                class="message-bubble focusable"
              >
                {{ progress }}
              </div>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
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

export default {
  name: 'messageLoading',
  data() {
    return {
      progress: '.',
    };
  },
  computed: {
  },
  methods: {
  },
  created() {
    this.interval = setInterval(() => {
      if (this.progress.length > 2) {
        this.progress = '.';
      } else {
        this.progress += '.';
      }
    }, 500);
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
.message, .message-bubble-column {
  flex: 0 0 auto;
}

.message, .message-bubble-row {
  max-width: 80vw;
}

.message-bubble {
  border-radius: 24px;
  display: inline-flex;
  font-size: calc(1em + 0.25vmin);
  padding: 0 12px;
  width: fit-content;
  align-self: center;
}


.message-bot .message-bubble {
  background-color: #FFEBEE; /* red-50 from material palette */
}


</style>
