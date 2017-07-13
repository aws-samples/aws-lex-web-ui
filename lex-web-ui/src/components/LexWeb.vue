<template>
  <div id="lex-web">
    <page></page>
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
import Page from './Page';
import ToolbarContainer from './ToolbarContainer';
import MessageList from './MessageList';
import StatusBar from './StatusBar';
import InputContainer from './InputContainer';

export default {
  name: 'lex-web',
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
    isUiMinimized() {
      return this.$store.state.isUiMinimized;
    },
  },
  methods: {
    toggleMinimizeUi() {
      return this.$store.dispatch('toggleIsUiMinimized');
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
