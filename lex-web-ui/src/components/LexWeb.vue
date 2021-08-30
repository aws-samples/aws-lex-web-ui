<template>
  <v-app id="lex-web"
    v-bind:ui-minimized="isUiMinimized"
  >
    <min-button
      v-bind:toolbar-color="toolbarColor"
      v-bind:is-ui-minimized="isUiMinimized"
      v-on:toggleMinimizeUi="toggleMinimizeUi"
    ></min-button>
    <toolbar-container
      v-if="!isUiMinimized"
      v-bind:userName="userNameValue"
      v-bind:toolbar-title="toolbarTitle"
      v-bind:toolbar-color="toolbarColor"
      v-bind:toolbar-logo="toolbarLogo"
      v-bind:is-ui-minimized="isUiMinimized"
      v-on:toggleMinimizeUi="toggleMinimizeUi"
      @requestLogin="handleRequestLogin"
      @requestLogout="handleRequestLogout"
      @requestLiveChat="handleRequestLiveChat"
      @endLiveChat="handleEndLiveChat"
      transition="fade-transition"
    ></toolbar-container>

    <v-content
      v-if="!isUiMinimized"
    >
      <v-container
        class="message-list-container"
        v-bind:class="`toolbar-height-${toolbarHeightClassSuffix}`"
        fluid pa-0
      >
        <message-list v-if="!isUiMinimized"
        ></message-list>
      </v-container>
    </v-content>

    <input-container
      ref="InputContainer"
      v-if="!isUiMinimized && !hasButtons"
      v-bind:text-input-placeholder="textInputPlaceholder"
      v-bind:initial-speech-instruction="initialSpeechInstruction"
      @endLiveChatClicked="handleEndLiveChat"
    ></input-container>
    <div
      v-if="isSFXOn"
      id="sound"
      aria-hidden="true"
    />
  </v-app>
</template>

<script>
/*
Copyright 2017-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */

import MinButton from '@/components/MinButton';
import ToolbarContainer from '@/components/ToolbarContainer';
import MessageList from '@/components/MessageList';
import InputContainer from '@/components/InputContainer';
import LexRuntime from 'aws-sdk/clients/lexruntime';
import LexRuntimeV2 from 'aws-sdk/clients/lexruntimev2';

import { Config as AWSConfig, CognitoIdentityCredentials }
  from 'aws-sdk/global';

export default {
  name: 'lex-web',
  data() {
    return {
      userNameValue: '',
      toolbarHeightClassSuffix: 'md',
    };
  },
  components: {
    MinButton,
    ToolbarContainer,
    MessageList,
    InputContainer,
  },
  computed: {
    initialSpeechInstruction() {
      return this.$store.state.config.lex.initialSpeechInstruction;
    },
    textInputPlaceholder() {
      return this.$store.state.config.ui.textInputPlaceholder;
    },
    toolbarColor() {
      return this.$store.state.config.ui.toolbarColor;
    },
    toolbarTitle() {
      return this.$store.state.config.ui.toolbarTitle;
    },
    toolbarLogo() {
      return this.$store.state.config.ui.toolbarLogo;
    },
    isSFXOn() {
      return this.$store.state.isSFXOn;
    },
    isUiMinimized() {
      return this.$store.state.isUiMinimized;
    },
    hasButtons() {
      return this.$store.state.hasButtons;
    },
    lexState() {
      return this.$store.state.lex;
    },
    isMobile() {
      const mobileResolution = 900;
      return (this.$vuetify.breakpoint.smAndDown &&
        'navigator' in window && navigator.maxTouchPoints > 0 &&
        'screen' in window &&
        (window.screen.height < mobileResolution ||
          window.screen.width < mobileResolution)
      );
    },
  },
  watch: {
    // emit lex state on changes
    lexState() {
      this.$emit('updateLexState', this.lexState);
      this.setFocusIfEnabled();
    },
  },
  created() {
    // override default vuetify vertical overflow on non-mobile devices
    // hide vertical scrollbars
    if (!this.isMobile) {
      document.documentElement.style.overflowY = 'hidden';
    }

    this.initConfig()
      .then(() => Promise.all([
        this.$store.dispatch(
          'initCredentials',
          this.$lexWebUi.awsConfig.credentials,
        ),
        this.$store.dispatch('initRecorder'),
        this.$store.dispatch(
          'initBotAudio',
          (window.Audio) ? new Audio() : null,
        ),
      ]))
      .then(() => {
        // This processing block adjusts the LexRunTime client dynamically based on the
        // currently configured region and poolId. Both values by this time should be
        // available in $store.state.
        //
        // A new lexRunTimeClient is constructed targeting Lex in the identified region
        // using credentials built from the identified poolId.
        //
        // The Cognito Identity Pool should be a resource in the identified region.

        // Check for required config values (region & poolId)
        if (!this.$store.state || !this.$store.state.config) {
          return Promise.reject(new Error('no config found'))
        }
        const region = this.$store.state.config.region ? this.$store.state.config.region : this.$store.state.config.cognito.region;
        if (!region) {
          return Promise.reject(new Error('no region found in config or config.cognito'))
        }
        const poolId = this.$store.state.config.cognito.poolId;
        if (!poolId) {
          return Promise.reject(new Error('no cognito.poolId found in config'))
        }

        const AWSConfigConstructor = (window.AWS && window.AWS.Config) ?
          window.AWS.Config :
          AWSConfig;

        const CognitoConstructor =
          (window.AWS && window.AWS.CognitoIdentityCredentials) ?
            window.AWS.CognitoIdentityCredentials :
            CognitoIdentityCredentials;

        const LexRuntimeConstructor = (window.AWS && window.AWS.LexRuntime) ?
          window.AWS.LexRuntime :
          LexRuntime;

        const LexRuntimeConstructorV2 = (window.AWS && window.AWS.LexRuntimeV2) ?
          window.AWS.LexRuntimeV2 :
          LexRuntimeV2;

        const credentials = new CognitoConstructor(
          { IdentityPoolId: poolId },
          { region: region },
        );

        const awsConfig = new AWSConfigConstructor({
          region: region,
          credentials,
        });

        this.$lexWebUi.lexRuntimeClient = new LexRuntimeConstructor(awsConfig);
        this.$lexWebUi.lexRuntimeV2Client = new LexRuntimeConstructorV2(awsConfig);
        /* eslint-disable no-console */
        console.log(`lexRuntimeV2Client : ${JSON.stringify(this.$lexWebUi.lexRuntimeV2Client)}`);

        const promises = [
          this.$store.dispatch('initMessageList'),
          this.$store.dispatch('initPollyClient', this.$lexWebUi.pollyClient),
          this.$store.dispatch('initLexClient', {
            v1client: this.$lexWebUi.lexRuntimeClient, v2client: this.$lexWebUi.lexRuntimeV2Client,
          }),
        ];
        console.info('CONFIG : ', this.$store.state.config);
        if (this.$store.state && this.$store.state.config &&
            this.$store.state.config.ui.enableLiveChat) {
          promises.push(this.$store.dispatch('initLiveChat'));
        }
        return Promise.all(promises);
      })
      .then(() => {
        document.title = this.$store.state.config.ui.pageTitle;
      })
      .then(() => (
        (this.$store.state.isRunningEmbedded) ?
          this.$store.dispatch(
            'sendMessageToParentWindow',
            { event: 'ready' },
          ) :
          Promise.resolve()
      ))
      .then(() => {
        if (this.$store.state.config.ui.saveHistory === true) {
          this.$store.subscribe((mutation, state) => {
            sessionStorage.setItem('store', JSON.stringify(state));
          });
        }
      })
      .then(() => {
        console.info(
          'successfully initialized lex web ui version: ',
          this.$store.state.version,
        );
        // after slight delay, send in initial utterance if it is defined.
        // waiting for credentials to settle down a bit.
        setTimeout(() => this.$store.dispatch('sendInitialUtterance'), 500);
      })
      .catch((error) => {
        console.error('could not initialize application while mounting:', error);
      });
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true });
    }
  },
  mounted() {
    if (!this.$store.state.isRunningEmbedded) {
      this.$store.dispatch(
        'sendMessageToParentWindow',
        { event: 'requestTokens' },
      );
      this.setFocusIfEnabled();
    }
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  methods: {
    onResize() {
      const { innerWidth } = window;
      this.setToolbarHeigthClassSuffix(innerWidth);
    },
    setToolbarHeigthClassSuffix(innerWidth) {
      // Vuetify toolbar changes height based on innerWidth

      // when running embedded the toolbar is fixed to dense
      if (this.$store.state.isRunningEmbedded) {
        this.toolbarHeightClassSuffix = 'md';
        return;
      }

      // in full screen the toolbar changes size
      if (innerWidth < 640) {
        this.toolbarHeightClassSuffix = 'sm';
      } else if (innerWidth > 640 && innerWidth < 960) {
        this.toolbarHeightClassSuffix = 'md';
      } else {
        this.toolbarHeightClassSuffix = 'lg';
      }
    },
    toggleMinimizeUi() {
      return this.$store.dispatch('toggleIsUiMinimized');
    },
    loginConfirmed(evt) {
      this.$store.commit('setIsLoggedIn', true);
      if (evt.detail && evt.detail.data) {
        this.$store.commit('setTokens', evt.detail.data);
      } else if (evt.data && evt.data.data) {
        this.$store.commit('setTokens', evt.data.data);
      }
    },
    logoutConfirmed() {
      this.$store.commit('setIsLoggedIn', false);
      this.$store.commit('setTokens', {
        idtokenjwt: '',
        accesstokenjwt: '',
        refreshtoken: '',
      });
    },
    handleRequestLogin() {
      console.info('request login');
      if (this.$store.state.isRunningEmbedded) {
        this.$store.dispatch(
          'sendMessageToParentWindow',
          { event: 'requestLogin' },
        );
      } else {
        this.$store.dispatch(
          'sendMessageToParentWindow',
          { event: 'requestLogin' },
        );
      }
    },
    handleRequestLogout() {
      console.info('request logout');
      if (this.$store.state.isRunningEmbedded) {
        this.$store.dispatch(
          'sendMessageToParentWindow',
          { event: 'requestLogout' },
        );
      } else {
        this.$store.dispatch(
          'sendMessageToParentWindow',
          { event: 'requestLogout' },
        );
      }
    },
    handleRequestLiveChat() {
      console.info('handleRequestLiveChat');
      this.$store.dispatch('requestLiveChat');
    },
    handleEndLiveChat() {
      console.info('LexWeb: handleEndLiveChat');
      this.$store.dispatch('requestLiveChatEnd');
    },
    // messages from parent
    messageHandler(evt) {
      const messageType = this.$store.state.config.ui.hideButtonMessageBubble ? 'button' : 'human';
      // security check
      if (evt.origin !== this.$store.state.config.ui.parentOrigin) {
        console.warn('ignoring event - invalid origin:', evt.origin);
        return;
      }
      if (!evt.ports || !Array.isArray(evt.ports) || !evt.ports.length) {
        console.warn('postMessage not sent over MessageChannel', evt);
        return;
      }
      switch (evt.data.event) {
        case 'ping':
          console.info('pong - ping received from parent');
          evt.ports[0].postMessage({
            event: 'resolve',
            type: evt.data.event,
          });
          this.setFocusIfEnabled();
          break;
        // received when the parent page has loaded the iframe
        case 'parentReady':
          evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });
          break;
        case 'toggleMinimizeUi':
          this.$store.dispatch('toggleIsUiMinimized')
            .then(() => evt.ports[0].postMessage({
              event: 'resolve', type: evt.data.event,
            }));
          break;
        case 'postText':
          if (!evt.data.message) {
            evt.ports[0].postMessage({
              event: 'reject',
              type: evt.data.event,
              error: 'missing message field',
            });
            return;
          }
          this.$store.dispatch(
            'postTextMessage',
            { type: messageType, text: evt.data.message },
          )
            .then(() => evt.ports[0].postMessage({
              event: 'resolve', type: evt.data.event,
            }));
          break;
        case 'deleteSession':
          this.$store.dispatch('deleteSession')
            .then(() => evt.ports[0].postMessage({
              event: 'resolve', type: evt.data.event,
            }));
          break;
        case 'startNewSession':
          this.$store.dispatch('startNewSession')
            .then(() => evt.ports[0].postMessage({
              event: 'resolve', type: evt.data.event,
            }));
          break;
        case 'confirmLogin':
          this.loginConfirmed(evt);
          this.userNameValue = this.userName();
          break;
        case 'confirmLogout':
          this.logoutConfirmed();
          break;
        default:
          console.warn('unknown message in messageHandler', evt);
          break;
      }
    },
    componentMessageHandler(evt) {
      switch (evt.detail.event) {
        case 'confirmLogin':
          this.loginConfirmed(evt);
          this.userNameValue = this.userName();
          break;
        case 'confirmLogout':
          this.logoutConfirmed();
          break;
        case 'ping':
          this.$store.dispatch(
            'sendMessageToParentWindow',
            { event: 'pong' },
          );
          break;
        case 'postText':
          this.$store.dispatch(
            'postTextMessage',
            { type: 'human', text: evt.detail.message },
          );
          break;
        case 'replaceCreds':
          this.$store.dispatch(
            'initCredentials',
            evt.detail.creds,
          );
          break;
        default:
          console.warn('unknown message in componentMessageHandler', evt);
          break;
      }
    },
    userName() {
      return this.$store.getters.username();
    },
    logRunningMode() {
      if (!this.$store.state.isRunningEmbedded) {
        console.info('running in standalone mode');
        return;
      }

      console.info(
        'running in embedded mode from URL: ',
        document.location.href,
      );
      console.info('referrer (possible parent) URL: ', document.referrer);
      console.info(
        'config parentOrigin:',
        this.$store.state.config.ui.parentOrigin,
      );
      if (!document.referrer
        .startsWith(this.$store.state.config.ui.parentOrigin)
      ) {
        console.warn(
          'referrer origin: [%s] does not match configured parent origin: [%s]',
          document.referrer, this.$store.state.config.ui.parentOrigin,
        );
      }
    },
    initConfig() {
      if (this.$store.state.config.urlQueryParams.lexWebUiEmbed !== 'true') {
        document.addEventListener('lexwebuicomponent', this.componentMessageHandler, false);
        this.$store.commit('setIsRunningEmbedded', false);
        this.$store.commit('setAwsCredsProvider', 'cognito');
      } else {
        window.addEventListener('message', this.messageHandler, false);
        this.$store.commit('setIsRunningEmbedded', true);
        this.$store.commit('setAwsCredsProvider', 'parentWindow');
      }

      // get config
      return this.$store.dispatch('initConfig', this.$lexWebUi.config)
        .then(() => this.$store.dispatch('getConfigFromParent'))
        // avoid merging an empty config
        .then(config => (
          (Object.keys(config).length) ?
            this.$store.dispatch('initConfig', config) : Promise.resolve()
        ))
        .then(() => {
          this.setFocusIfEnabled();
          this.logRunningMode();
        });
    },
    setFocusIfEnabled() {
      if (this.$store.state.config.ui.directFocusToBotInput) {
        this.$refs.InputContainer.setInputTextFieldFocus();
      }
    },
  },
};
</script>

<style>
/*
The Vuetify toolbar height is based on screen width breakpoints
The toolbar can be 48px, 56px and 64px.
It is fixed to 48px when using 'dense'

The message list is placed between the toolbar at the top and input
container on the bottom. Both the toolbar and the input-container
dynamically change height based on width breakpoints.
So we duplicate the height and substract it from the total height
of the message list to make it fit between the toolbar and input container

NOTE: not using var() for different heights due to IE11 compatibility
*/
.message-list-container {
  position: fixed;
}
.message-list-container.toolbar-height-sm {
  top: 56px;
  height: calc(100% - 2 * 56px);
}
/* yes, the height is smaller in mid sizes */
.message-list-container.toolbar-height-md {
  top: 48px;
  height: calc(100% - 2 * 48px);
}
.message-list-container.toolbar-height-lg {
  top: 64px;
  height: calc(100% - 2 * 64px);
}

#lex-web[ui-minimized] {
  /* make background transparent when running minimized so only
  the button is shown */
  background: transparent;
}
</style>
