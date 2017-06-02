<template>
  <div id="lex-web">
    <page></page>
    <toolbar-container
      v-bind:toolbar-title="toolbarTitle"
      v-bind:toolbar-color="toolbarColor"
      v-bind:toolbar-logo="toolbarLogo"
      v-bind:expand-ui="expandUi"
      v-on:toggleExpandUi="toggleExpandUi"
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
import Page from './Page';
import ToolbarContainer from './ToolbarContainer';
import MessageList from './MessageList';
import StatusBar from './StatusBar';
import InputContainer from './InputContainer';

export default {
  name: 'lex-web',
  data() {
    return {
      expandUi: true,
    };
  },
  components: {
    Page,
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
  },
  methods: {
    toggleExpandUi() {
      this.expandUi = !this.expandUi;
      this.$store.dispatch('sendMessageToParentWindow',
        { event: 'toggleExpandUi', state: this.expandUi },
      );
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
