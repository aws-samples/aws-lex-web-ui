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
    <span v-if="toolbarButtons == true && loginStatus == false">
      <v-btn small :href="getSignInUrl">Login</v-btn>
    </span>
    <span v-if="toolbarButtons == true && loginStatus == true">
      <v-menu offset-y>
        <v-btn 
          small
          slot="activator"
        >
          {{name}}
        </v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title @click="">
              Profile
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title @click="logOut">
              Logout
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
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
      signInUrl: '',
      logOutUrl: '',
      payload: JSON.parse(localStorage.getItem('payload')),
      name: '',
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
  props: ['toolbarTitle', 'toolbarColor', 'toolbarLogo', 'isUiMinimized', 'toolbarButtons'],
  computed: {
    toolTipMinimize() {
      return (this.isUiMinimized) ? 'maximize' : 'minimize';
    },
    getSignInUrl() {
      if (this.$store.state.isRunningEmbedded) {
        this.signInUrl = this.$store.state.config.cognito.parentSignInUrl;
        return this.signInUrl;
      }
      this.signInUrl = this.$store.state.config.cognito.signInUrl;
      return this.signInUrl;
    },
    loginStatus() {
      return JSON.parse(localStorage.getItem('loginStatus'));
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
    logOut() {
      // eslint-disable-next-line no-console
      localStorage.removeItem('tokens');
      localStorage.removeItem('payload');
      localStorage.setItem('loginStatus', JSON.stringify(false));
      // eslint-disable-next-line no-console
      console.log('The tokens have been cleared!');
      if (this.$store.state.isRunningEmbedded) {
        this.logOutUrl = this.$store.state.config.cognito.parentLogOutUrl;
        window.location.replace(this.logOutUrl);
      } else {
        this.logOutUrl = this.$store.state.config.cognito.logOutUrl;
        window.location.replace(this.logOutUrl);
      }
    },
    getName() {
      if (this.payload !== null) {
        this.name = this.payload.given_name;
      }
    },
  },
  created() {
    this.getName();
    // this.clearStorage();
  },
};
</script>
