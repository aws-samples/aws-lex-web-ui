<template>
  <v-toolbar v-bind:class="toolbarColor" dark dense>
    <img v-bind:src="toolbarLogo">
    <v-toolbar-title class="hidden-xs-and-down">
      {{ toolbarTitle }}
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      v-tooltip:left="toggleExpandToolTip"
      v-on:click.native="toggleExpand"
      v-if="$store.state.isRunningEmbedded"
      icon
      light
    >
      <v-icon>
        {{ expandUi ? 'arrow_drop_down' : 'arrow_drop_up' }}
      </v-icon>
    </v-btn>
  </v-toolbar>
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
export default {
  name: 'toolbar-container',
  props: ['toolbarTitle', 'toolbarColor', 'toolbarLogo', 'expandUi'],
  computed: {
    toggleExpandToolTip() {
      return {
        html: (this.expandUi) ? 'minimize' : 'maximize',
      };
    },
  },
  methods: {
    toggleExpand() {
      this.$emit('toggleExpandUi');
    },
  },
};
</script>
