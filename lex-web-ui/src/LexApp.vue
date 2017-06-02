<template>
  <v-app id="lex-app" top-toolbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */
import Vue from 'vue';
import Vuetify from 'vuetify';

import store from './store';

Vue.use(Vuetify);

export default {
  name: 'lex-app',
  store,
  beforeMount() {
    if (!this.$route.query.embed) {
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
        console.warn('referrer origin: [%s] does not match configured parent origin: [%s]',
          document.referrer, this.$store.state.config.ui.parentOrigin,
        );
      }

      window.addEventListener('message', this.messageHandler, false);
      this.$store.commit('setIsRunningEmbedded', true);
      this.$store.commit('setAwsCredsProvider', 'parentWindow');
    }

    this.$store.commit('setUrlQueryParams', this.$route.query);
  },
  mounted() {
    Promise.all([
      this.$store.dispatch('initCredentials'),
      this.$store.dispatch('initRecorder'),
      this.$store.dispatch('initBotAudio'),
      this.$store.dispatch('getConfigFromParent')
      .then(config => this.$store.dispatch('initConfig', config)),
    ])
    .then(() =>
      Promise.all([
        this.$store.dispatch('initMessageList'),
        this.$store.dispatch('initPollyClient'),
        this.$store.dispatch('initLexClient'),
      ]),
    )
    .catch((error) => {
      console.error('could not initialize application while mounting:', error);
    });
  },
  methods: {
    // most messages should be initiated from iframe to parent using
    // sendMessageToParentWindow which can pass results back using a promise
    // this is meant for unsolicited / unidirectional events
    messageHandler(evt) {
      // security check
      if (evt.origin !== this.$store.state.config.ui.parentOrigin) {
        console.warn('ignoring event - invalid origin:', evt.origin);
        return;
      }
      switch (evt.data.event) {
        case 'parentReady':
          // XXX noop for now - may want to set flag in store
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
@import '../node_modules/roboto-fontface/css/roboto/roboto-fontface.css';
@import '../node_modules/material-design-icons/iconfont/material-icons.css';
@import '../node_modules/vuetify/dist/vuetify.min.css';
#lex-app {
  display: flex;
  height: 100%;
  width: 100%;
}
body, html {
  overflow-y: hidden;
}
</style>
