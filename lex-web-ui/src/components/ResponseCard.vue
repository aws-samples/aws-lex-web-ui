<template>
  <v-card>
    <v-card-row v-if="responseCard.title" class="red lighten-5">
      <v-card-title>
        <span>{{responseCard.title}}</span>
      </v-card-title>
    </v-card-row>
    <v-card-text v-if="responseCard.subTitle">
      <span>{{responseCard.subTitle}}</span>
    </v-card-text>
    <v-card-row height="15vh"
      v-if="responseCard.imageUrl"
      v-bind:img="responseCard.imageUrl"
      class="image"
    ></v-card-row>
    <v-card-row
        v-for="(button, index) in responseCard.buttons"
        v-bind:key="index"
        actions
        class="button-row"
    >
      <v-btn
        v-if="button.text && button.value"
        v-on:click.once.native="onButtonClick(button.value)"
        v-bind:disabled="hasButtonBeenClicked"
        default
      >
        {{button.text}}
      </v-btn>
    </v-card-row>
    <v-card-row actions v-if="responseCard.attachmentLinkUrl">
      <v-btn
        flat
        class="red lighten-5"
        tag="a"
        v-bind:href="responseCard.attachmentLinkUrl"
        target="_blank"
      >
        Open Link
      </v-btn>
    </v-card-row>
  </v-card>
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
export default {
  name: 'response-card',
  props: ['response-card'],
  data() {
    return {
      hasButtonBeenClicked: false,
    };
  },
  computed: {
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
  min-width: 50vw;
  max-width: 75vw;
}
.card__row--actions.button-row {
  justify-content: center;
}
.card__row.image {
  /* prefer to contain the image rather than cover (which can clip it) */
  background-size: contain!important;
  margin: 0.33em;
  min-height: 30vh;
}
.btn.btn--disabled {
  opacity: 1;
}
</style>
