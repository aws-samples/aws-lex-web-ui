<template>
  <v-app id="lex-web"
  >
    <toolbar-container
      v-bind:userName="userNameValue"
      v-bind:toolbar-title="toolbarTitle"
      v-bind:toolbar-color="toolbarColor"
      v-bind:toolbar-logo="toolbarLogo"
      v-bind:is-ui-minimized="isUiMinimized"
      v-on:toggleMinimizeUi="toggleMinimizeUi"
      @requestLogin="handleRequestLogin"
      @requestLogout="handleRequestLogout"
    ></toolbar-container>

    <v-content>
      <v-container class="message-list-container" fluid pa-0>
        <message-list v-show="!isUiMinimized"
        ></message-list>
      </v-container>
    </v-content>

    <input-container
      ref="InputContainer"
      v-if="!isUiMinimized && !hasButtons"
      v-bind:text-input-placeholder="textInputPlaceholder"
      v-bind:initial-speech-instruction="initialSpeechInstruction"
    ></input-container>
  </v-app>
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

/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */

import ToolbarContainer from '@/components/ToolbarContainer';
import MessageList from '@/components/MessageList';
import InputContainer from '@/components/InputContainer';
import LexRuntime from 'aws-sdk/clients/lexruntime';
import { Config as AWSConfig, CognitoIdentityCredentials }
  from 'aws-sdk/global';

const jwt = require('jsonwebtoken');

export default {
  name: 'lex-web',
  data() {
    return {
      userNameValue: '',
    };
  },
  components: {
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
        if (this.$store.state && this.$store.state.config
          && this.$store.state.config.region && this.$store.state.config.cognito.poolId) {
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

          const credentials = new CognitoConstructor(
            { IdentityPoolId: this.$store.state.config.cognito.poolId },
            { region: this.$store.state.config.region },
          );

          const awsConfig = new AWSConfigConstructor({
            region: this.$store.state.config.region,
            credentials,
          });

          this.$lexWebUi.lexRuntimeClient = new LexRuntimeConstructor(awsConfig);
        }

        Promise.all([
          this.$store.dispatch('initMessageList'),
          this.$store.dispatch('initPollyClient', this.$lexWebUi.pollyClient),
          this.$store.dispatch('initLexClient', this.$lexWebUi.lexRuntimeClient),
        ]);
      })
      .then(() => (
        (this.$store.state.isRunningEmbedded) ?
          this.$store.dispatch(
            'sendMessageToParentWindow',
            { event: 'ready' },
          ) :
          Promise.resolve()
      ))
      .then(() => console.info(
        'successfully initialized lex web ui version: ',
        this.$store.state.version,
      ))
      .catch((error) => {
        console.error('could not initialize application while mounting:', error);
      });
  },
  mounted() {
    if (!this.$store.state.isRunningEmbedded) {
      this.$store.dispatch(
        'sendMessageToParentWindow',
        { event: 'requestTokens' },
      );
      this.setFocusIfEnabled();
    }
  },
  methods: {
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
    // messages from parent
    messageHandler(evt) {
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
            { type: 'human', text: evt.data.message },
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
      let v = '';
      if (this.$store.state.tokens && this.$store.state.tokens.idtokenjwt) {
        const decoded = jwt.decode(this.$store.state.tokens.idtokenjwt, { complete: true });
        if (decoded) {
          if (decoded.payload) {
            if (decoded.payload.email) {
              v = decoded.payload.email;
            }
            if (decoded.payload.preferred_username) {
              v = decoded.payload.preferred_username;
            }
          }
        }
        return `[${v}]`;
      }
      return v;
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
.message-list-container {
  /* vuetify toolbar and footer are 48px each when using 'dense' */
  height: calc(100% - 96px);
  position: fixed;
  top: 48px;
}
</style>
