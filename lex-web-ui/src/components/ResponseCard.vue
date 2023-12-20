<!-- eslint-disable vue/v-on-style -->
<template>
  <v-card>
    <div v-if="shouldDisplayResponseCardTitle">
      <v-card-title
        v-if="responseCard.title && responseCard.title.trim()"
        primary-title
        class="red lighten-5 headline"
      >
        {{ responseCard.title }}
      </v-card-title>
    </div>
    <v-card-text v-if="responseCard.subTitle">
      {{ responseCard.subTitle }}
    </v-card-text>
    <v-card-text v-if="responseCard.subtitle">
      {{ responseCard.subtitle }}
    </v-card-text>
    <v-img
      v-if="responseCard.imageUrl"
      :src="responseCard.imageUrl"
      contain
      height="33vh"
    />
    <v-card-actions
      v-if="responseCard.buttons"
      class="button-row"
    >
      <v-btn
        v-for="button in responseCard.buttons"
        v-show="button.text && button.value"
        :key="button.id"
        :disabled="shouldDisableClickedResponseCardButtons"
        round
        default
        :color="button.text.toLowerCase() === 'more' ? '' : 'accent'"
        class="secondary--text"
        v-on:click.once="onButtonClick(button.value)"
      >
        {{ button.text }}
      </v-btn>
    </v-card-actions>
    <v-card-actions v-if="responseCard.attachmentLinkUrl">
      <v-btn
        flat
        class="red lighten-5"
        tag="a"
        :href="responseCard.attachmentLinkUrl"
        target="_blank"
      >
        Open Link
      </v-btn>
    </v-card-actions>
  </v-card>
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
  name: 'ResponseCard',
  inject: ['getRCButtonsDisabled', 'setRCButtonsDisabled'],
  props: ['response-card'],
  data() {
    return {
      hasButtonBeenClicked: false
    }
  },
  computed: {
    shouldDisplayResponseCardTitle() {
      return this.$store.state.config.ui.shouldDisplayResponseCardTitle
    },
    shouldDisableClickedResponseCardButtons() {
      return (
        this.$store.state.config.ui.shouldDisableClickedResponseCardButtons &&
        (this.hasButtonBeenClicked || this.getRCButtonsDisabled())
      )
    }
  },
  methods: {
    onButtonClick(value) {
      this.hasButtonBeenClicked = true
      this.setRCButtonsDisabled()
      const messageType = this.$store.state.config.ui.hideButtonMessageBubble ? 'button' : 'human'
      const message = {
        type: messageType,
        text: value
      }

      this.$store.dispatch('postTextMessage', message)
    }
  }
}
</script>

<style scoped>
.card {
  width: 75vw;
  position: inherit; /* workaround to card being displayed on top of toolbar shadow */
  padding-bottom: 0.5em;
  box-shadow: none !important;
  background-color: unset !important;
}
.card__title {
  padding: 0.5em;
  padding-top: 0.75em;
}
.card__text {
  padding: 0.33em;
}

.button-row {
  display: inline-block;
}

.card__actions .btn {
  margin: 4px 4px;
  font-size: 1em;
  min-width: 44px;
}

.card__actions.button-row {
  justify-content: center;
  padding-bottom: 0.15em;
}
</style>
