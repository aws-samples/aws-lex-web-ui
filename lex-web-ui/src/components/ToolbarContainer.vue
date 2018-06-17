<template>
  <v-toolbar
    v-bind:color="toolbarColor"
    app
    dark
    dense
    fixed
  >
    <img v-if="toolbarLogo" v-bind:src="toolbarLogo">
    <v-toolbar-title class="hidden-xs-and-down">
      {{ toolbarTitle }}
    </v-toolbar-title>
    <v-spacer />
    <!-- tooltip should be before btn to avoid right margin issue in mobile -->
    <v-tooltip
      v-model="shouldShowTooltip"
      activator=".min-max-toggle"
      left
    >
      <span id="min-max-tooltip">{{toolTipMinimize}}</span>
    </v-tooltip>
    <span v-if="toolbarButtons == true">
      <v-btn small v-on:click.stop="showSignupForm = true">Sign Up</v-btn>
      <v-btn small v-on:click.stop="showLoginForm = true">{{buttonText}}</v-btn>
    </span>
    <v-btn
      v-if="$store.state.isRunningEmbedded"
      v-on:click="toggleMinimize"
      v-on="tooltipEventHandlers"
      class="min-max-toggle"
      icon
    >
      <v-icon>
        {{ isUiMinimized ?  'arrow_drop_up' : 'arrow_drop_down' }}
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
  data() {
    return {
      showSignupForm: false,
      showLoginForm: false,
      toolbarButtons: true,
      isLoggedIn: false,
      shouldShowTooltip: false,
      tooltipEventHandlers: {
        mouseenter: this.onInputButtonHoverEnter,
        mouseleave: this.onInputButtonHoverLeave,
        touchstart: this.onInputButtonHoverEnter,
        touchend: this.onInputButtonHoverLeave,
        touchcancel: this.onInputButtonHoverLeave,
      },
    };
  },
  props: ['toolbarTitle', 'toolbarColor', 'toolbarLogo', 'isUiMinimized'],
  computed: {
    toolTipMinimize() {
      return (this.isUiMinimized) ? 'maximize' : 'minimize';
    },
    buttonText() {
      return (this.isLoggedIn) ? 'Logout' : 'Login';
    },
  },
  methods: {
    onInputButtonHoverEnter() {
      this.shouldShowTooltip = true;
    },
    onInputButtonHoverLeave() {
      this.shouldShowTooltip = false;
    },
    toggleMinimize() {
      this.onInputButtonHoverLeave();
      this.$emit('toggleMinimizeUi');
    },
  },
};
</script>
