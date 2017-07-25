<template>
  <div id="lex-web">
    <toolbar-container
      v-bind:toolbar-title="toolbarTitle"
      v-bind:toolbar-color="toolbarColor"
      v-bind:toolbar-logo="toolbarLogo"
      v-bind:is-ui-minimized="isUiMinimized"
      v-on:toggleMinimizeUi="toggleMinimizeUi"
    ></toolbar-container>

    <message-list></message-list>

    <status-bar></status-bar>
    <input-container
      v-bind:text-input-placeholder="textInputPlaceholder"
      v-bind:initial-text="initialText"
      v-bind:initial-speech-instruction="initialSpeechInstruction"
    ></input-container>
  </div>
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
import StatusBar from '@/components/StatusBar';
import InputContainer from '@/components/InputContainer';

export default {
  name: 'lex-web',
  components: {
    ToolbarContainer,
    MessageList,
    StatusBar,
    InputContainer,
  },
  computed: {
    initialSpeechInstruction() {
      return this.$store.state.config.lex.initialSpeechInstruction;
    },
    initialText() {
      return this.$store.state.config.lex.initialText;
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
  },
  beforeMount() {
    if (this.$store.state.config.urlQueryParams.lexWebUiEmbed !== 'true') {
      console.info('running in standalone mode');
      this.$store.commit('setIsRunningEmbedded', false);
      this.$store.commit('setAwsCredsProvider', 'cognito');
    } else {
      console.info('running in embedded mode from URL: ', location.href);
      console.info('referrer (possible parent) URL: ', document.referrer);
      console.info('config parentOrigin:',
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

      window.addEventListener('message', this.messageHandler, false);
      this.$store.commit('setIsRunningEmbedded', true);
      this.$store.commit('setAwsCredsProvider', 'parentWindow');
    }
  },
  mounted() {
    this.$store.dispatch('initConfig', this.$lexWebUi.config)
      .then(() => this.$store.dispatch('getConfigFromParent'))
      .then(config => this.$store.dispatch('initConfig', config))
      .then(() =>
        Promise.all([
          this.$store.dispatch('initCredentials', this.$lexWebUi.awsConfig.credentials),
          this.$store.dispatch('initRecorder'),
          this.$store.dispatch('initBotAudio', new Audio()),
        ]),
      )
      .then(() =>
        Promise.all([
          this.$store.dispatch('initMessageList'),
          this.$store.dispatch('initPollyClient', this.$lexWebUi.pollyClient),
          this.$store.dispatch('initLexClient', this.$lexWebUi.lexRuntimeClient),
        ]),
      )
      .then(() => (
        (this.$store.state.isRunningEmbedded) ?
          this.$store.dispatch('sendMessageToParentWindow',
            { event: 'ready' },
          ) :
          Promise.resolve()
      ))
      .then(() =>
        console.info('sucessfully initialized lex web ui version: ',
          this.$store.state.version,
        ),
      )
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
      if (!evt.ports) {
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
            .then(() => {
              evt.ports[0].postMessage(
                { event: 'resolve', type: evt.data.event },
              );
            });
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

          this.$store.dispatch('postTextMessage',
            { type: 'human', text: evt.data.message },
          )
            .then(() => {
              evt.ports[0].postMessage(
                { event: 'resolve', type: evt.data.event },
              );
            });
          break;
        default:
          console.warn('unknown message in messageHanlder', evt);
          break;
      }
    },
  },
};
</script>

<style>
#lex-web {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
