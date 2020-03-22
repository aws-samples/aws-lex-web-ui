<template>
  <v-card>
    <div v-if=shouldDisplayResponseCardTitle>
      <v-card-title v-if="responseCard.title && responseCard.title.trim()" primary-title class="red lighten-5">
        <span class="headline">{{responseCard.title}}</span>
      </v-card-title>
    </div>
    <v-card-text v-if="responseCard.subTitle">
      <span>{{responseCard.subTitle}}</span>
    </v-card-text>
    <v-card-media
      v-if="responseCard.imageUrl"
      v-bind:src="responseCard.imageUrl"
      contain
      height="33vh"
    ></v-card-media>
    <v-card-actions v-if="responseCard.buttons" class="button-row">
      <v-btn
        v-for="(button) in responseCard.buttons"
        v-show="button.text && button.value"
        v-bind:key="button.id"
        v-on:click.once.native="onButtonClick(button.value)"
        v-bind:disabled="hasButtonBeenClicked"
        round
        default
      >
        {{button.text}}
      </v-btn>
    </v-card-actions>
    <v-card-actions v-if="responseCard.attachmentLinkUrl">
      <v-btn
        flat
        class="red lighten-5"
        tag="a"
        v-bind:href="responseCard.attachmentLinkUrl"
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
  name: 'response-card',
  props: ['response-card'],
  data() {
    return {
      hasButtonBeenClicked: false,
    };
  },
  computed: {
    shouldDisplayResponseCardTitle() {
      return this.$store.state.config.ui.shouldDisplayResponseCardTitle;
    },
  },
  methods: {
    onButtonClick(value) {
      this.hasButtonBeenClicked = true;
      const message = {
        type: 'human',
        text: value,
      };

      this.$store.dispatch('postTextMessage', message);
    },
  },
};
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

.btn {
  margin: 10px !important;
  font-size: 12px !important;
  min-width: 44px !important;
}

.card__actions.button-row {
  justify-content: center;
  padding-bottom: 0.15em;
}
</style>
