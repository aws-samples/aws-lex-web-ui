<template>
  <v-app id="lex-web"
  >
    <toolbar-container
      v-bind:toolbar-title="toolbarTitle"
      v-bind:toolbar-buttons="toolbarButtons"
      v-bind:toolbar-color="toolbarColor"
      v-bind:toolbar-logo="toolbarLogo"
      v-bind:is-ui-minimized="isUiMinimized"
      v-on:toggleMinimizeUi="toggleMinimizeUi"
    ></toolbar-container>
    
    <ProfilePage
      v-bind:show-profile-page="showProfilePage"
    />
    
    <v-content>
      <v-container class="message-list-container" fluid pa-0>
        <message-list v-show="!isUiMinimized"
        ></message-list>
      </v-container>
    </v-content>

    <input-container
      v-if="!isUiMinimized"
      v-bind:text-input-placeholder="textInputPlaceholder"
      v-bind:initial-speech-instruction="initialSpeechInstruction"
    ></input-container>
  </v-app>
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

/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */
import ToolbarContainer from '@/components/ToolbarContainer';
import MessageList from '@/components/MessageList';
import InputContainer from '@/components/InputContainer';
import ProfilePage from '@/components/ProfilePage';
import $ from 'jquery';

const { localStorage } = window;

export default {
  name: 'lex-web',
  components: {
    ToolbarContainer,
    MessageList,
    InputContainer,
    ProfilePage,
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
    toolbarButtons() {
      return this.$store.state.config.ui.toolbarButtons;
    },
    isLoggedIn() {
      return this.$store.state.ui.isLoggedIn;
    },
    toolbarLogo() {
      return this.$store.state.config.ui.toolbarLogo;
    },
    showProfilePage() {
      return this.$store.state.ui.showProfilePage;
    },
    isUiMinimized() {
      return this.$store.state.isUiMinimized;
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
    },
  },
  created() {
    this.auth();

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
      .then(() => Promise.all([
        this.$store.dispatch('initMessageList'),
        this.$store.dispatch('initPollyClient', this.$lexWebUi.pollyClient),
        this.$store.dispatch('initLexClient', this.$lexWebUi.lexRuntimeClient),
      ]))
      .then(() => (
        (this.$store.state.isRunningEmbedded) ?
          this.$store.dispatch(
            'sendMessageToParentWindow',
            { event: 'ready' },
          ) :
          Promise.resolve()
      ))
      .then(() => console.info(
        'sucessfully initialized lex web ui version: ',
        this.$store.state.version,
      ))
      .catch((error) => {
        console.error('could not initialize application while mounting:', error);
      });
  },
  methods: {
    toggleMinimizeUi() {
      return this.$store.dispatch('toggleIsUiMinimized');
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
        default:
          console.warn('unknown message in messageHanlder', evt);
          break;
      }
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
        .then(() => this.logRunningMode());
    },
    auth() {
      // Pull url from window
      const parsedUrl = new URL(window.location.href);

      // Parse out the "code" portion of the URL
      const authCode = parsedUrl.searchParams.get('code');

      if (authCode !== null) {
        // Set the login status of the user to true
        localStorage.setItem('loginStatus', JSON.stringify(true));

        // Send the code to the token endpoint and get tokens back
        const settings = {
          async: true,
          crossDomain: true,
          url: this.$store.state.config.cognito.oauthUrl,
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          data: {
            grant_type: 'authorization_code',
            client_id: this.$store.state.config.cognito.clientId,
            redirect_uri: this.$store.state.config.cognito.redirectUri,
            code: authCode,
          },
        };
        $.ajax(settings).done((response) => {
          // Save tokens to local storage
          localStorage.setItem('tokens', JSON.stringify(response));
          const tokens = JSON.parse(localStorage.getItem('tokens'));

          // Decode id token
          const idToken = response.id_token;
          function parseJwt() {
            const base64Url = idToken.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
          }

          // Save payload to local storage
          const payload = parseJwt();
          localStorage.setItem('payload', JSON.stringify(payload));

          // Verify user is logged in and tokens exist before redirecting
          const loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
          if (loginStatus === true && tokens !== null) {
            if (this.$store.state.isRunningEmbedded) {
              window.location.replace(this.$store.state.config.cognito.parentRedirectUri);
            } else {
              window.location.replace(this.$store.state.config.cognito.redirectUri);
            }
          }
        });
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
