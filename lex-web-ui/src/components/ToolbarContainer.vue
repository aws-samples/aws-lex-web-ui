<template>
  <!-- eslint-disable max-len -->
  <v-toolbar
    v-bind:color="toolbarColor"
    app
    dark
    fixed
    v-if="!isUiMinimized"
    v-on="toolbarClickHandler"
    v-bind:dense="this.$store.state.isRunningEmbedded && !isUiMinimized"
    v-bind:class="{ minimized: isUiMinimized }"
    aria-label="Toolbar with sound FX mute button, minimise chat window button and option chat back a step button"
  >
  <!-- eslint-enable max-len -->
    <img
      v-if="toolbarLogo"
      v-bind:src="toolbarLogo"
      alt="logo"
      aria-hidden="true"
    />

    <v-menu v-if="showToolbarMenu" offset-y>
      <v-btn
      slot="activator"
      v-show="!isUiMinimized"
      v-on="tooltipMenuEventHandlers"
      class="menu"
      icon
      fab
      small
      aria-label="menu options">
        <v-icon>
          menu
        </v-icon>
      </v-btn>

      <v-list>
        <v-list-tile v-if="isEnableLogin">
          <v-list-tile-title v-if="isLoggedIn" v-on:click="requestLogout" aria-label="logout">
            <v-icon>
              {{ items[1].icon }}
            </v-icon>
            {{ items[1].title }}
          </v-list-tile-title>
          <v-list-tile-title v-if="!isLoggedIn" v-on:click="requestLogin" aria-label="login">
            <v-icon>
              {{ items[0].icon }}
            </v-icon>
            {{ items[0].title }}
            </v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="isSaveHistory">
          <v-list-tile-title v-on:click="requestResetHistory" aria-label="clear chat history">
            <v-icon>
              {{ items[2].icon }}
            </v-icon>
            {{ items[2].title }}
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="shouldRenderSfxButton && isSFXOn">
          <v-list-tile-title v-on:click="toggleSFXMute" aria-label="mute sound effects">
            <v-icon>
              {{ items[3].icon }}
            </v-icon>
            {{ items[3].title }}
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="shouldRenderSfxButton && !isSFXOn">
          <v-list-tile-title v-on:click="toggleSFXMute" aria-label="unmute sound effects">
            <v-icon>
              {{ items[4].icon }}
            </v-icon>
            {{ items[4].title }}
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="canLiveChat">
          <v-list-tile-title v-on:click="requestLiveChat" aria-label="request live chat">
            <v-icon>
              {{ toolbarStartLiveChatIcon }}
            </v-icon>
            {{ toolbarStartLiveChatLabel }}
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="isLiveChat">
          <v-list-tile-title v-on:click="endLiveChat" aria-label="end live chat">
            <v-icon>
              {{ toolbarEndLiveChatIcon }}
            </v-icon>
            {{ toolbarEndLiveChatLabel }}
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile  v-if="isLocaleSelectable"
                      v-for="(locale) in locales"
                      v-bind:key=locale
                      :disabled="restrictLocaleChanges"
        >
          <v-list-tile-title
            v-on:click="setLocale(locale)">
            {{locale}}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <div class="nav-buttons">
      <v-btn
        small
        icon
        :disabled="isLexProcessing"
        class="nav-button-prev"
        v-on="prevNavEventHandlers"
        v-on:click="onPrev"
        v-show="hasPrevUtterance && !isUiMinimized && shouldRenderBackButton"
        aria-label="go back to previous message"
      >
        <v-icon> arrow_back </v-icon>
      </v-btn>
      <v-tooltip
        v-model="prevNav"
        activator=".nav-button-prev"
        content-class="tooltip-custom"
        right
      >
        <span>Previous</span>
      </v-tooltip>
    </div>

    <v-toolbar-title
      class="hidden-xs-and-down"
      v-on:click.stop="toggleMinimize"
      v-show="!isUiMinimized"
    >
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
      <span id="min-max-tooltip">{{ toolTipMinimize }}</span>
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
      v-model="shouldShowEndLiveChatTooltip"
      content-class="tooltip-custom"
      activator=".end-live-chat-btn"
      left
    >
      <span id="end-live-chat-tooltip">{{ toolbarEndLiveChatLabel }}</span>
    </v-tooltip>
    <v-tooltip
      v-model="shouldShowMenuTooltip"
      content-class="tooltip-custom"
      activator=".menu"
      right
    >
      <span id="menu-tooltip">menu</span>
    </v-tooltip>
    <span v-if="isLocaleSelectable" class="localeInfo">{{currentLocale}}</span>
    <v-btn
      v-if="shouldRenderHelpButton && !isLiveChat && !isUiMinimized"
      v-on:click="sendHelp"
      v-on="tooltipHelpEventHandlers"
      v-bind:disabled="isLexProcessing"
      icon
      class="help-toggle"
    >
      <v-icon> help_outline </v-icon>
    </v-btn>
    <v-btn
      v-if="isLiveChat && !isUiMinimized"
      v-on:click="endLiveChat"
      v-on="tooltipEndLiveChatEventHandlers"
      v-bind:disabled="!isLiveChat"
      icon
      class="end-live-chat-btn"
    >
      <span class="hangup-text">{{ toolbarEndLiveChatLabel }}</span>
      <v-icon class="call-end"> {{ toolbarEndLiveChatIcon }} </v-icon>
    </v-btn>

    <v-btn
      v-if="$store.state.isRunningEmbedded"
      v-on:click.stop="toggleMinimize"
      v-on="tooltipEventHandlers"
      class="min-max-toggle"
      icon
      v-bind:aria-label="isUiMinimized ? 'chat' : 'minimize chat window toggle'"
    >
      <v-icon>
        {{ isUiMinimized ? "chat" : "arrow_drop_down" }}
      </v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
/*
Copyright 2017-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/
import { chatMode, liveChatStatus } from '@/store/state';

export default {
  name: 'toolbar-container',
  data() {
    return {
      items: [
        { title: 'Login', icon: 'login' },
        { title: 'Logout', icon: 'logout' },
        { title: 'Clear Chat', icon: 'delete' },
        { title: 'Mute', icon: 'volume_up' },
        { title: 'Unmute', icon: 'volume_off' },
      ],
      shouldShowTooltip: false,
      shouldShowHelpTooltip: false,
      shouldShowMenuTooltip: false,
      shouldShowEndLiveChatTooltip: false,
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
      tooltipMenuEventHandlers: {
        mouseenter: this.onMenuButtonHoverEnter,
        mouseleave: this.onMenuButtonHoverLeave,
        touchstart: this.onMenuButtonHoverEnter,
        touchend: this.onMenuButtonHoverLeave,
        touchcancel: this.onMenuButtonHoverLeave,
      },
      tooltipEventHandlers: {
        mouseenter: this.onInputButtonHoverEnter,
        mouseleave: this.onInputButtonHoverLeave,
        touchstart: this.onInputButtonHoverEnter,
        touchend: this.onInputButtonHoverLeave,
        touchcancel: this.onInputButtonHoverLeave,
      },
      tooltipEndLiveChatEventHandlers: {
        mouseenter: this.onEndLiveChatButtonHoverEnter,
        mouseleave: this.onEndLiveChatButtonHoverLeave,
        touchstart: this.onEndLiveChatButtonHoverEnter,
        touchend: this.onEndLiveChatButtonHoverLeave,
        touchcancel: this.onEndLiveChatButtonHoverLeave,
      },
    };
  },
  props: [
    'toolbarTitle',
    'toolbarColor',
    'toolbarLogo',
    'isUiMinimized',
    'userName',
    'toolbarStartLiveChatLabel',
    'toolbarStartLiveChatIcon',
    'toolbarEndLiveChatLabel',
    'toolbarEndLiveChatIcon',
  ],
  computed: {
    toolbarClickHandler() {
      if (this.isUiMinimized) {
        return { click: this.toggleMinimize };
      }
      return null;
    },
    toolTipMinimize() {
      return this.isUiMinimized ? 'maximize' : 'minimize';
    },
    isEnableLogin() {
      return this.$store.state.config.ui.enableLogin;
    },
    isForceLogin() {
      return this.$store.state.config.ui.forceLogin;
    },
    hasPrevUtterance() {
      return this.$store.state.utteranceStack.length > 1;
    },
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    isSaveHistory() {
      return this.$store.state.config.ui.saveHistory;
    },
    canLiveChat() {
      return (this.$store.state.config.ui.enableLiveChat &&
      this.$store.state.chatMode === chatMode.BOT &&
      (this.$store.state.liveChat.status === liveChatStatus.DISCONNECTED ||
      this.$store.state.liveChat.status === liveChatStatus.ENDED)
      );
    },
    isLiveChat() {
      return (this.$store.state.config.ui.enableLiveChat &&
      this.$store.state.chatMode === chatMode.LIVECHAT);
    },
    isLocaleSelectable() {
      return this.$store.state.config.lex.v2BotLocaleId.split(',').length > 1;
    },
    restrictLocaleChanges() {
      return this.$store.state.lex.isProcessing
        || ( this.$store.state.lex.sessionState
          && this.$store.state.lex.sessionState.dialogAction
          && this.$store.state.lex.sessionState.dialogAction.type === 'ElicitSlot')
        || ( this.$store.state.lex.sessionState
          && this.$store.state.lex.sessionState.intent
          && this.$store.state.lex.sessionState.intent.state === 'InProgress')
    },
    currentLocale() {
      const priorLocale = localStorage.getItem('selectedLocale');
      if (priorLocale) {
        this.setLocale(priorLocale);
      }
      return this.$store.state.config.lex.v2BotLocaleId.split(',')[0];
    },
    isLexProcessing() {
      return (
        this.$store.state.isBackProcessing || this.$store.state.lex.isProcessing
      );
    },
    shouldRenderHelpButton() {
      return !!this.$store.state.config.ui.helpIntent;
    },
    shouldRenderSfxButton() {
      return (
        this.$store.state.config.ui.enableSFX
        && this.$store.state.config.ui.messageSentSFX
        && this.$store.state.config.ui.messageReceivedSFX
      );
    },
    shouldRenderBackButton() {
      return this.$store.state.config.ui.backButton;
    },
    isSFXOn() {
      return this.$store.state.isSFXOn;
    },
    showToolbarMenu() {
      return this.$store.state.config.lex.v2BotLocaleId.split(',').length > 1
        || this.$store.state.config.ui.enableLogin
        || this.$store.state.config.ui.saveHistory
        || this.$store.state.config.ui.shouldRenderSfxButton
        || this.$store.state.config.ui.enableLiveChat;
    },
    locales() {
      const a = this.$store.state.config.lex.v2BotLocaleId.split(',');
      return a;
    },
  },
  methods: {
    setLocale(l) {
      const a = this.$store.state.config.lex.v2BotLocaleId.split(',');
      const revised = [];
      revised.push(l);
      a.forEach((element) => {
        if (element !== l) {
          revised.push(element);
        }
      });
      this.$store.commit('updateLocaleIds', revised.toString());
      localStorage.setItem('selectedLocale', l);
    },
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
    onEndLiveChatButtonHoverEnter() {
      this.shouldShowEndLiveChatTooltip = true;
    },
    onEndLiveChatButtonHoverLeave() {
      this.shouldShowEndLiveChatTooltip = false;
    },
    onMenuButtonHoverEnter() {
      this.shouldShowMenuTooltip = true;
    },
    onMenuButtonHoverLeave() {
      this.shouldShowMenuTooltip = false;
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
    isValidHelpContentForUse() {
      const localeId = this.$store.state.config.lex.v2BotLocaleId ? this.$store.state.config.lex.v2BotLocaleId : 'en_US';
      const helpContent = this.$store.state.config.ui.helpContent;
      return ( helpContent && helpContent[localeId] &&
        (
          ( helpContent[localeId].text && helpContent[localeId].text.length > 0 ) ||
          ( helpContent[localeId].markdown && helpContent[localeId].markdown.length > 0 )
        )
      )
    },
    shouldRepeatLastMessage() {
      const localeId = this.$store.state.config.lex.v2BotLocaleId ? this.$store.state.config.lex.v2BotLocaleId : 'en_US';
      const helpContent = this.$store.state.config.ui.helpContent;
      console.log('inside repeat message');
      if(helpContent && helpContent[localeId] && (helpContent[localeId].repeatLastMessage === undefined ? true : helpContent[localeId].repeatLastMessage)) {
        return true;
      }
      return false;
    },
    messageForHelpContent() {
      const localeId = this.$store.state.config.lex.v2BotLocaleId ? this.$store.state.config.lex.v2BotLocaleId : 'en_US';
      const helpContent = this.$store.state.config.ui.helpContent;
      let alts = {};
      if (  helpContent[localeId].markdown && helpContent[localeId].markdown.length > 0 ) {
        alts.markdown = helpContent[localeId].markdown;
      }
      let responseCardObject = undefined;
      if (helpContent[localeId].responseCard) {
        responseCardObject = {
          "version": 1,
          "contentType": "application/vnd.amazonaws.card.generic",
          "genericAttachments": [
            {
              "title": helpContent[localeId].responseCard.title,
              "subTitle": helpContent[localeId].responseCard.subTitle,
              "imageUrl": helpContent[localeId].responseCard.imageUrl,
              "attachmentLinkUrl": helpContent[localeId].responseCard.attachmentLinkUrl,
              "buttons": helpContent[localeId].responseCard.buttons
            }
          ]
        }
        alts.markdown = helpContent[localeId].markdown;
      }
      return({
        text: helpContent[localeId].text,
          type: 'bot',
        dialogState: '',
        responseCard: responseCardObject,
        alts
      })
    },
    sendHelp() {
      if (this.isValidHelpContentForUse()) {
        let currentMessage = undefined;
        if (this.$store.state.messages.length > 0) {
          currentMessage = this.$store.state.messages[this.$store.state.messages.length-1];
        }
        this.$store.dispatch('pushMessage', this.messageForHelpContent());
        if (currentMessage && this.shouldRepeatLastMessage()) {
          this.$store.dispatch('pushMessage', currentMessage);
        }
      } else {
        const message = {
          type: 'human',
          text: this.$store.state.config.ui.helpIntent,
        };
        this.$store.dispatch('postTextMessage', message);
      }
      this.shouldShowHelpTooltip = false;
    },
    onPrev() {
      if (this.prevNav) {
        this.mouseOverPrev();
      }
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
    requestResetHistory() {
      this.$store.dispatch('resetHistory');
    },
    requestLiveChat() {
      this.$emit('requestLiveChat');
    },
    endLiveChat() {
      this.shouldShowEndLiveChatTooltip = false;
      this.$emit('endLiveChat');
    },
    toggleIsLoggedIn() {
      this.onInputButtonHoverLeave();
      this.$emit('toggleIsLoggedIn');
    },
  },
};
</script>
<style>
.toolbar-color {
  background-color: #003da5 !important;
}

.nav-buttons {
  padding: 0;
  margin-left: 8px !important;
}

.nav-button-prev {
  padding: 0;
  margin: 0;
}

.localeInfo {
  text-align: right;
  margin-right: 0;
  width: 5em !important;
}

.list .icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.menu__content {
  border-radius: 4px;
}

.call-end {
  width: 36px;
  margin-left: 5px;
}

.hangup-text {
}

.end-live-chat-btn {
  width: unset !important;
}

</style>
