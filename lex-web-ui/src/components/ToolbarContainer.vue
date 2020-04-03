<template>
  <v-toolbar
    v-bind:color="toolbarColor"
    app
    dark
    fixed
    v-on="{ click: (isUiMinimized) ? toggleMinimize : null  }"
    v-bind:dense="this.$store.state.isRunningEmbedded && !isUiMinimized"
    v-bind:class="{ 'minimized': isUiMinimized }"
    aria-label="Toolbar with sound FX mute button, minimise chat window button and option chat back a step button"
  >
    <img v-if="toolbarLogo" v-bind:src="toolbarLogo" alt="logo" aria-hidden="true"/>

    <v-menu v-if="isEnableLogin" offset-y>

      <v-btn
        slot="activator"
        dark
        icon
        v-show="!isUiMinimized"
      >
        <v-icon>
          {{'menu'}}
        </v-icon>
      </v-btn>

      <v-list>
        <v-list-tile>
          <v-list-tile-title v-if="isLoggedIn" v-on:click="requestLogout">{{ items[1].title }}</v-list-tile-title>
          <v-list-tile-title v-if="!isLoggedIn" v-on:click="requestLogin">{{ items[0].title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>


    <div class="nav-buttons">
      <v-btn small icon :disabled="isBackProcessing"
             class="nav-button-prev"
             v-on="prevNavEventHandlers"
             v-on:click="onPrev"
             v-show="hasPrevUtterance && !isUiMinimized"
             aria-label="go back to previous message"
      >
        <v-icon>
          arrow_back
        </v-icon>
      </v-btn>
      <v-tooltip v-model="prevNav" activator=".nav-button-prev" content-class="tooltip-custom" right>
        <span>Previous</span>
      </v-tooltip>
    </div>



    <v-toolbar-title class="hidden-xs-and-down" v-on:click="toggleMinimize" v-show="!isUiMinimized">
      <h1>{{ toolbarTitle }}</h1>
    </v-toolbar-title>

    <v-toolbar-title class="hidden-xs-and-down" v-show="!isUiMinimized">
      {{ userName }}
    </v-toolbar-title>

    <v-spacer />
    <!-- tooltip should be before btn to avoid right margin issue in mobile -->
    <v-tooltip
      v-model="shouldShowTooltip"
      content-class="tooltip-custom"
      activator=".min-max-toggle"
      left
    >
      <span id="min-max-tooltip">{{toolTipMinimize}}</span>
    </v-tooltip>
    <v-tooltip
      v-model="shouldShowHelpTooltip"
      content-class="tooltip-custom"
      activator=".help-toggle"
      left
    >
      <span id="help-tooltip">help</span>
    </v-tooltip>
    <v-tooltip
      v-model="shouldShowSFXTooltip"
      content-class="tooltip-custom"
      activator=".sfx-toggle"
      left
    >
      <span id="sfx-tooltip">sound effects on/off</span>
    </v-tooltip>
    <v-btn
      v-if="helpButton && !isUiMinimized"
      v-on:click="sendHelp"
      v-on="tooltipHelpEventHandlers"
      icon
      class="help-toggle"
    >
      <v-icon>
        help_outline
      </v-icon>
    </v-btn>

    <v-btn
      v-if="sfxMuteButton && !isUiMinimized"
      v-on:click="toggleSFXMute"
      v-on="tooltipSFXEventHandlers"
      class="sfx-toggle"
      icon
      aria-label="sound effects on off toggle"
    >
      <v-icon>
        {{ isSFXOn ?  'volume_up' : 'volume_off' }}
      </v-icon>
    </v-btn>

    <v-btn
      v-if="$store.state.isRunningEmbedded"
      v-on:click="toggleMinimize"
      v-on="tooltipEventHandlers"
      class="min-max-toggle"
      icon
      aria-label="minimize chat window toggle"
    >
      <v-icon>
        {{ isUiMinimized ?  'chat' : 'arrow_drop_down' }}
      </v-icon>
    </v-btn>
  </v-toolbar>
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
  name: 'toolbar-container',
  data() {
    return {
      items: [
        { title: 'Login' },
        { title: 'Logout' },
      ],
      shouldShowTooltip: false,
      shouldShowHelpTooltip: false,
      shouldShowSFXTooltip: false,
      prevNav: false,
      prevNavEventHandlers: {
        mouseenter: this.mouseOverPrev,
        mouseleave: this.mouseOverPrev,
        touchstart: this.mouseOverPrev,
        touchend: this.mouseOverPrev,
        touchcancel: this.mouseOverPrev,
      },
      tooltipHelpEventHandlers: {
        mouseenter: this.onHelpButtonHoverEnter,
        mouseleave: this.onHelpButtonHoverLeave,
        touchstart: this.onHelpButtonHoverEnter,
        touchend: this.onHelpButtonHoverLeave,
        touchcancel: this.onHelpButtonHoverLeave,
      },
      tooltipSFXEventHandlers: {
        mouseenter: this.onSFXButtonHoverEnter,
        mouseleave: this.onSFXButtonHoverLeave,
        touchstart: this.onSFXButtonHoverEnter,
        touchend: this.onSFXButtonHoverLeave,
        touchcancel: this.onSFXButtonHoverLeave,
      },
      tooltipEventHandlers: {
        mouseenter: this.onInputButtonHoverEnter,
        mouseleave: this.onInputButtonHoverLeave,
        touchstart: this.onInputButtonHoverEnter,
        touchend: this.onInputButtonHoverLeave,
        touchcancel: this.onInputButtonHoverLeave,
      },
    };
  },
  props: ['toolbarTitle', 'toolbarColor', 'toolbarLogo', 'isUiMinimized', 'userName'],
  computed: {
    toolTipMinimize() {
      return (this.isUiMinimized) ? 'maximize' : 'minimize';
    },
    isEnableLogin() {
      return this.$store.state.config.ui.enableLogin;
    },
    hasPrevUtterance() {
      return (this.$store.state.utteranceStack.length > 1);
    },
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    isBackProcessing() {
      return this.$store.state.isBackProcessing;
    },
    helpButton() {
      return this.$store.state.config.ui.helpIntent;
    },
    sfxMuteButton() {
      return this.$store.state.config.ui.messageSentSFX
      || this.$store.state.config.ui.messageReceivedSFX;
    },
    isSFXOn() {
      return this.$store.state.isSFXOn;
    },
  },
  methods: {
    mouseOverPrev() {
      this.prevNav = !this.prevNav;
    },
    onInputButtonHoverEnter() {
      this.shouldShowTooltip = !this.isUiMinimized;
    },
    onInputButtonHoverLeave() {
      this.shouldShowTooltip = false;
    },
    onHelpButtonHoverEnter() {
      this.shouldShowHelpTooltip = true;
    },
    onHelpButtonHoverLeave() {
      this.shouldShowHelpTooltip = false;
    },
    onSFXButtonHoverEnter() {
      this.shouldShowSFXTooltip = true;
    },
    onSFXButtonHoverLeave() {
      this.shouldShowSFXTooltip = false;
    },
    onNavHoverEnter() {
      this.shouldShowNavToolTip = true;
    },
    onNavHoverLeave() {
      this.shouldShowNavToolTip = false;
    },
    toggleSFXMute() {
      this.onInputButtonHoverLeave();
      this.$store.dispatch('toggleIsSFXOn');
    },
    toggleMinimize() {
      if (this.$store.state.isRunningEmbedded) {
        this.onInputButtonHoverLeave();
        this.$emit('toggleMinimizeUi');
      }
    },
    sendHelp() {
      const message = {
        type: 'human',
        text: this.helpButton,
      };
      this.$store.dispatch('postTextMessage', message);
    },
    onPrev() {
      if (!this.$store.state.isBackProcessing) {
        this.$store.commit('popUtterance');
        const lastUtterance = this.$store.getters.lastUtterance();
        if (lastUtterance && lastUtterance.length > 0) {
          const message = {
            type: 'human',
            text: lastUtterance,
          };
          this.$store.commit('toggleBackProcessing');
          this.$store.dispatch('postTextMessage', message);
        }
      }
    },
    requestLogin() {
      this.$emit('requestLogin');
    },
    requestLogout() {
      this.$emit('requestLogout');
    },
    toggleIsLoggedIn() {
      this.onInputButtonHoverLeave();
      this.$emit('toggleIsLoggedIn');
    },
  },
};
</script>
<style>
.nav-buttons {
  padding: 0;
  margin-left: 8px !important;
}

.nav-button-prev {
  padding: 0;
  margin: 0;
}
</style>

