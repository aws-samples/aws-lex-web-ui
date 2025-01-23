<template>
  <div id="chat" :ui-minimized="isUiMinimized">
    <!-- Main Chat Container -->
    <div class="chat-container">
      <!-- Header -->
      <div class="chat-header">
        <div class="header-content">
          <div class="image-container">
            <img
              src="https://pcointelligence.com/wp-content/uploads/2024/12/header-image-350x100-green.png"
              alt="EnSec Logo"
              class="header-logo"
            />
          </div>

          <button class="connect-button" @click="toggleDropdown">
            Connect <span class="dropdown-arrow">▼</span>
          </button>
          <button class="close-btn" @click="closeForm">
            <span class="material-icons">close</span>
          </button>
        </div>
      </div>

      <!-- Message Area -->
      <div class="message-area">
        <!-- System Message -->

        <v-main v-if="!isUiMinimized">
          
          <message-list v-if="!isUiMinimized" />
        </v-main>
      </div>

      <!-- Input Container -->
      <div class="input-container">
        <!-- <div class="input-wrapper"> -->
        <input-container
          v-if="!isUiMinimized && !hasButtons"
          ref="InputContainer"
          :text-input-placeholder="textInputPlaceholder"
          :initial-speech-instruction="initialSpeechInstruction"
        />
        <!-- <button class="send-btn" @click="sendMessage">
            <span class="send-icon">➤</span>
          </button>
        </div>-->
      </div>
    </div>
  </div>
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

import MinButton from "@/components/MinButton";
import MessageList from "@/components/MessageList";
import InputContainer from "@/components/InputContainer";
import LexRuntime from "aws-sdk/clients/lexruntime";
import LexRuntimeV2 from "aws-sdk/clients/lexruntimev2";

import {
  Config as AWSConfig,
  CognitoIdentityCredentials,
} from "aws-sdk/global";

export default {
  name: "Chat",
  components: {
    MinButton,
    MessageList,
    InputContainer,
  },
  data() {
    return {
      userNameValue: "",
      toolbarHeightClassSuffix: "md",
      isDropdownOpen: false,
      selectedOption: null,
      options: ["Option 1", "Option 2", "Option 3"],
    };
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
    toolbarStartLiveChatLabel() {
      return this.$store.state.config.ui.toolbarStartLiveChatLabel;
    },
    toolbarStartLiveChatIcon() {
      return this.$store.state.config.ui.toolbarStartLiveChatIcon;
    },
    toolbarEndLiveChatLabel() {
      return this.$store.state.config.ui.toolbarEndLiveChatLabel;
    },
    toolbarEndLiveChatIcon() {
      return this.$store.state.config.ui.toolbarEndLiveChatIcon;
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
      return (
        //this.$vuetify.breakpoint.smAndDown &&
        "navigator" in window &&
        navigator.maxTouchPoints > 0 &&
        "screen" in window &&
        (window.screen.height < mobileResolution ||
          window.screen.width < mobileResolution)
      );
    },
  },
  watch: {
    // emit lex state on changes
    lexState() {
      this.$emit("updateLexState", this.lexState);
      this.setFocusIfEnabled();
    },
  },
  created() {
    // override default vuetify vertical overflow on non-mobile devices
    // hide vertical scrollbars
    if (!this.isMobile) {
      document.documentElement.style.overflowY = "hidden";
    }

    this.initConfig()
      .then(() =>
        Promise.all([
          this.$store.dispatch(
            "initCredentials",
            this.$lexWebUi.awsConfig.credentials
          ),
          this.$store.dispatch("initRecorder"),
          this.$store.dispatch(
            "initBotAudio",
            window.Audio ? new Audio() : null
          ),
        ])
      )
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
          return Promise.reject(new Error("no config found"));
        }
        const region = this.$store.state.config.region
          ? this.$store.state.config.region
          : this.$store.state.config.cognito.region;
        if (!region) {
          return Promise.reject(
            new Error("no region found in config or config.cognito")
          );
        }
        const poolId = this.$store.state.config.cognito.poolId;
        if (!poolId) {
          return Promise.reject(new Error("no cognito.poolId found in config"));
        }

        const AWSConfigConstructor =
          window.AWS && window.AWS.Config ? window.AWS.Config : AWSConfig;

        const CognitoConstructor =
          window.AWS && window.AWS.CognitoIdentityCredentials
            ? window.AWS.CognitoIdentityCredentials
            : CognitoIdentityCredentials;

        const LexRuntimeConstructor =
          window.AWS && window.AWS.LexRuntime
            ? window.AWS.LexRuntime
            : LexRuntime;

        const LexRuntimeConstructorV2 =
          window.AWS && window.AWS.LexRuntimeV2
            ? window.AWS.LexRuntimeV2
            : LexRuntimeV2;

        const credentials = new CognitoConstructor(
          { IdentityPoolId: poolId },
          { region: region }
        );

        const awsConfig = new AWSConfigConstructor({
          region: region,
          credentials,
        });

        this.$lexWebUi.lexRuntimeClient = new LexRuntimeConstructor(awsConfig);
        this.$lexWebUi.lexRuntimeV2Client = new LexRuntimeConstructorV2(
          awsConfig
        );
        /* eslint-disable no-console */
        console.log(
          `lexRuntimeV2Client : ${JSON.stringify(
            this.$lexWebUi.lexRuntimeV2Client
          )}`
        );

        const promises = [
          this.$store.dispatch("initMessageList"),
          this.$store.dispatch("initPollyClient", this.$lexWebUi.pollyClient),
          this.$store.dispatch("initLexClient", {
            v1client: this.$lexWebUi.lexRuntimeClient,
            v2client: this.$lexWebUi.lexRuntimeV2Client,
          }),
        ];
        console.info("CONFIG : ", this.$store.state.config);
        if (
          this.$store.state &&
          this.$store.state.config &&
          this.$store.state.config.ui.enableLiveChat
        ) {
          promises.push(this.$store.dispatch("initLiveChat"));
        }
        return Promise.all(promises);
      })
      .then(() => {
        document.title = this.$store.state.config.ui.pageTitle;
      })
      .then(() =>
        this.$store.state.isRunningEmbedded
          ? this.$store.dispatch("sendMessageToParentWindow", {
              event: "ready",
            })
          : Promise.resolve()
      )
      .then(() => {
        if (this.$store.state.config.ui.saveHistory === true) {
          this.$store.subscribe((mutation, state) => {
            sessionStorage.setItem("store", JSON.stringify(state));
          });
        }
      })
      .then(() => {
        console.info(
          "successfully initialized lex web ui version: ",
          this.$store.state.version
        );
        // after slight delay, send in initial utterance if it is defined.
        // waiting for credentials to settle down a bit.
        if (!this.$store.state.config.iframe.shouldLoadIframeMinimized) {
          setTimeout(() => this.$store.dispatch("sendInitialUtterance"), 500);
          this.$store.commit("setInitialUtteranceSent", true);
        }
      })
      .catch((error) => {
        console.error(
          "could not initialize application while mounting:",
          error
        );
      });
  },
  beforeUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },
  mounted() {
    if (!this.$store.state.isRunningEmbedded) {
      this.$store.dispatch("sendMessageToParentWindow", {
        event: "requestTokens",
      });
      this.setFocusIfEnabled();
    }
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    toggleDropdown() {
      this.$emit("toggleMenuModal", "Close modal");
    },
    closeForm() {
      this.$emit("closeForm", "");
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isDropdownOpen = false;
    },
    onResize() {
      const { innerWidth } = window;
      this.setToolbarHeigthClassSuffix(innerWidth);
    },
    setToolbarHeigthClassSuffix(innerWidth) {
      // Vuetify toolbar changes height based on innerWidth

      // when running embedded the toolbar is fixed to dense
      if (this.$store.state.isRunningEmbedded) {
        this.toolbarHeightClassSuffix = "md";
        return;
      }

      // in full screen the toolbar changes size
      if (innerWidth < 640) {
        this.toolbarHeightClassSuffix = "sm";
      } else if (innerWidth > 640 && innerWidth < 960) {
        this.toolbarHeightClassSuffix = "md";
      } else {
        this.toolbarHeightClassSuffix = "lg";
      }
    },
    toggleMinimizeUi() {
      return this.$store.dispatch("toggleIsUiMinimized");
    },
    loginConfirmed(evt) {
      this.$store.commit("setIsLoggedIn", true);
      if (evt.detail && evt.detail.data) {
        this.$store.commit("setTokens", evt.detail.data);
      } else if (evt.data && evt.data.data) {
        this.$store.commit("setTokens", evt.data.data);
      }
    },
    logoutConfirmed() {
      this.$store.commit("setIsLoggedIn", false);
      this.$store.commit("setTokens", {
        idtokenjwt: "",
        accesstokenjwt: "",
        refreshtoken: "",
      });
    },
    handleRequestLogin() {
      console.info("request login");
      if (this.$store.state.isRunningEmbedded) {
        this.$store.dispatch("sendMessageToParentWindow", {
          event: "requestLogin",
        });
      } else {
        this.$store.dispatch("sendMessageToParentWindow", {
          event: "requestLogin",
        });
      }
    },
    handleRequestLogout() {
      console.info("request logout");
      if (this.$store.state.isRunningEmbedded) {
        this.$store.dispatch("sendMessageToParentWindow", {
          event: "requestLogout",
        });
      } else {
        this.$store.dispatch("sendMessageToParentWindow", {
          event: "requestLogout",
        });
      }
    },
    handleRequestLiveChat() {
      console.info("handleRequestLiveChat");
      this.$store.dispatch("requestLiveChat");
    },
    handleEndLiveChat() {
      console.info("LexWeb: handleEndLiveChat");
      try {
        this.$store.dispatch("requestLiveChatEnd");
      } catch (error) {
        console.error(`error requesting disconnect ${error}`);
        this.$store.dispatch("pushLiveChatMessage", {
          type: "agent",
          text: this.$store.state.config.connect.chatEndedMessage,
        });
        this.$store.dispatch("liveChatSessionEnded");
      }
    },
    // messages from parent
    messageHandler(evt) {
      const messageType = this.$store.state.config.ui.hideButtonMessageBubble
        ? "button"
        : "human";
      // security check
      if (evt.origin !== this.$store.state.config.ui.parentOrigin) {
        console.warn("ignoring event - invalid origin:", evt.origin);
        return;
      }
      if (!evt.ports || !Array.isArray(evt.ports) || !evt.ports.length) {
        console.warn("postMessage not sent over MessageChannel", evt);
        return;
      }
      switch (evt.data.event) {
        case "ping":
          console.info("pong - ping received from parent");
          evt.ports[0].postMessage({
            event: "resolve",
            type: evt.data.event,
          });
          this.setFocusIfEnabled();
          break;
        // received when the parent page has loaded the iframe
        case "parentReady":
          evt.ports[0].postMessage({ event: "resolve", type: evt.data.event });
          break;
        case "toggleMinimizeUi":
          this.$store.dispatch("toggleIsUiMinimized").then(() =>
            evt.ports[0].postMessage({
              event: "resolve",
              type: evt.data.event,
            })
          );
          break;
        case "postText":
          if (!evt.data.message) {
            evt.ports[0].postMessage({
              event: "reject",
              type: evt.data.event,
              error: "missing message field",
            });
            return;
          }
          this.$store
            .dispatch("postTextMessage", {
              type: evt.data.messageType ? evt.data.messageType : messageType,
              text: evt.data.message,
            })
            .then(() =>
              evt.ports[0].postMessage({
                event: "resolve",
                type: evt.data.event,
              })
            );
          break;
        case "deleteSession":
          this.$store.dispatch("deleteSession").then(() =>
            evt.ports[0].postMessage({
              event: "resolve",
              type: evt.data.event,
            })
          );
          break;
        case "startNewSession":
          this.$store.dispatch("startNewSession").then(() =>
            evt.ports[0].postMessage({
              event: "resolve",
              type: evt.data.event,
            })
          );
          break;
        case "setSessionAttribute":
          console.log(`From LexWeb: ${JSON.stringify(evt.data, null, 2)}`);
          this.$store
            .dispatch("setSessionAttribute", {
              key: evt.data.key,
              value: evt.data.value,
            })
            .then(() =>
              evt.ports[0].postMessage({
                event: "resolve",
                type: evt.data.event,
              })
            );
          break;
        case "confirmLogin":
          this.loginConfirmed(evt);
          this.userNameValue = this.userName();
          break;
        case "confirmLogout":
          this.logoutConfirmed();
          break;
        default:
          console.warn("unknown message in messageHandler", evt);
          break;
      }
    },
    componentMessageHandler(evt) {
      switch (evt.detail.event) {
        case "confirmLogin":
          this.loginConfirmed(evt);
          this.userNameValue = this.userName();
          break;
        case "confirmLogout":
          this.logoutConfirmed();
          break;
        case "ping":
          this.$store.dispatch("sendMessageToParentWindow", { event: "pong" });
          break;
        case "postText":
          this.$store.dispatch("postTextMessage", {
            type: "human",
            text: evt.detail.message,
          });
          break;
        case "replaceCreds":
          this.$store.dispatch("initCredentials", evt.detail.creds);
          break;
        default:
          console.warn("unknown message in componentMessageHandler", evt);
          break;
      }
    },
    userName() {
      return this.$store.getters.userName();
    },
    logRunningMode() {
      if (!this.$store.state.isRunningEmbedded) {
        console.info("running in standalone mode");
        return;
      }

      console.info(
        "running in embedded mode from URL: ",
        document.location.href
      );
      console.info("referrer (possible parent) URL: ", document.referrer);
      console.info(
        "config parentOrigin:",
        this.$store.state.config.ui.parentOrigin
      );
      if (
        !document.referrer.startsWith(this.$store.state.config.ui.parentOrigin)
      ) {
        console.warn(
          "referrer origin: [%s] does not match configured parent origin: [%s]",
          document.referrer,
          this.$store.state.config.ui.parentOrigin
        );
      }
    },
    initConfig() {
      if (this.$store.state.config.urlQueryParams.lexWebUiEmbed !== "true") {
        document.addEventListener(
          "lexwebuicomponent",
          this.componentMessageHandler,
          false
        );
        this.$store.commit("setIsRunningEmbedded", false);
        this.$store.commit("setAwsCredsProvider", "cognito");
      } else {
        window.addEventListener("message", this.messageHandler, false);
        this.$store.commit("setIsRunningEmbedded", true);
        this.$store.commit("setAwsCredsProvider", "parentWindow");
      }

      // get config
      return (
        this.$store
          .dispatch("initConfig", this.$lexWebUi.config)
          .then(() => this.$store.dispatch("getConfigFromParent"))
          // avoid merging an empty config
          .then((config) =>
            Object.keys(config).length
              ? this.$store.dispatch("initConfig", config)
              : Promise.resolve()
          )
          .then(() => {
            this.setFocusIfEnabled();
            this.logRunningMode();
          })
      );
    },
    setFocusIfEnabled() {
      if (this.$store.state.config.ui.directFocusToBotInput) {
        this.$refs.InputContainer.setInputTextFieldFocus();
      }
    },
  },
};
</script>

<style scoped>
.chat-container {
  width: 100%;

  /* height: 50vh; */
  display: flex;
  flex-direction: column;
  margin: 0 auto 12px;
  /* background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
  border-radius: 1rem;
  background-color: #f9f9f9;
}

.chat-header {
  position: relative;
  background-color: #50a357;
  color: white;
  padding: 20px 20px 16px;
  border-radius: 1rem 1rem 0px 0px;
}

.header-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image-container {
  height: 60px;
  width: 230px;
}

.image-container img {
  width: auto;
  height: 100%;
}

.close-btn {
  background-color: #fff3;
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    font-size: 10px;
    position: absolute;
    right: 10px;
    top: 20px;
    transform: translateY(-50%);
    transition: background-color .3s ease;
    height: 24px;
    width: 24px;
    line-height: 1;
}

.close-btn .material-icons {
  font-size: 16px;
}
.connect-button {
  font-size: 20px;
  padding-top: 18px;
  line-height: 1;
}

.message-area {
  /* max-height: 70vh; */
  height: calc(100vh - 275px);
  /* overflow-y: auto; */
  padding: 16px;
  margin-bottom: 70px;
}

.system-message {
  background: #f0f0f0;
  padding: 12px;
  border-radius: 8px;
  /* margin-bottom: 16px; */
}

.bot-message {
  display: flex;
  /* margin-bottom: 16px; */
}

.bot-bubble {
  background: #f0e6ff;
  padding: 12px;
  border-radius: 8px;
  max-width: 80%;
}

.chat-status {
  text-align: center;
  color: #666;
  padding: 8px;
  border-top: 1px solid #eee;
  font-size: 14px;
  background: white;
}

.input-container {
  margin: 10px 10px 80px;
}

.v-toolbar__content {
  max-height: 56px !important;
}

.input-wrapper {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

input {
  flex: 1;
  padding: 12px;
  border: none;
  outline: none;
  font-size: 14px;
}

.send-btn {
  background: #4caf50;
  color: white;
  border: none;
  padding: 0 16px;
  cursor: pointer;
}

.send-icon {
  display: inline-block;
  transform: rotate(90deg);
}

.bottom-nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: #4caf50;
  padding: 8px 0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 8px 0;
  font-size: 12px;
  cursor: pointer;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.1);
}

.nav-item v-icon {
  margin-bottom: 4px;
  font-size: 20px;
}
</style>
