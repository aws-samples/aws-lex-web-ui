<template>
  <v-row d-flex class="message">
    <!-- contains message and response card -->
    <v-col ma-2 class="message-layout">

      <!-- contains message bubble and date -->
      <v-row d-flex class="message-bubble-date-container">
        <v-col class="message-bubble-column">

          <!-- contains message bubble and avatar -->
          <v-col d-flex class="message-bubble-avatar-container">
            <v-row :class="`message-bubble-row-${message.type}`">
              <div
                v-if="shouldShowAvatarImage"
                :style="avatarBackground"
                tabindex="-1"
                class="avatar"
                aria-hidden="true"
              >
              </div>
              <div
                tabindex="0"
                @focus="onMessageFocus"
                @blur="onMessageBlur"
                class="message-bubble focusable"
                :class="`message-bubble-row-${message.type}`"
              >
                <message-text
                  :message="message"
                  v-if="'text' in message && message.text !== null && message.text.length && !shouldDisplayInteractiveMessage"
                ></message-text>
                <div
                  v-if="shouldDisplayInteractiveMessage && message.interactiveMessage.templateType == 'ListPicker'">
                  <v-card-title primary-title>
                    <div>
                      <img :src="message.interactiveMessage.data.content.imageData" />
                      <div class="headline">{{message.interactiveMessage.data.content.title}}</div>
                      <span>{{message.interactiveMessage.data.content.subtitle}}</span>
                    </div>
                  </v-card-title>
                  <v-list two-line class="message-bubble interactive-row">
                    <template v-for="(item, index) in message.interactiveMessage.data.content.elements" :key="index">
                      <v-list-item @click="resendMessage(item.title)">
                        <v-list-item v-if="item.imageData">
                          <v-avatar>
                            <img :src="item.imageData" />
                          </v-avatar>
                        </v-list-item>
                        <v-list-item-title v-html="item.title"></v-list-item-title>
                        <v-list-item-subtitle
                          v-if="item.subtitle"
                          v-html="item.subtitle"
                        ></v-list-item-subtitle>
                      </v-list-item>
                      <v-divider></v-divider>
                    </template>
                  </v-list>
                </div>
                <div
                  v-if="shouldDisplayInteractiveMessage && message.interactiveMessage.templateType == 'TimePicker'">
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{message.interactiveMessage.data.content.title}}</div>
                      <span>{{message.interactiveMessage.data.content.subtitle}}</span>
                    </div>
                  </v-card-title>                  
                  <template v-for="item in this.message.interactiveMessage.timeslots">
                    <v-list-subheader>{{ item.date }}</v-list-subheader>
                    <v-list two-line class="message-bubble interactive-row">
                      <v-list-item>
                        <v-list-item
                          v-for="subItem in item.slots"
                          :key="subItem.localTime"
                          :data="subItem"
                          @click="resendMessage(subItem.date)"
                        >
                          <v-list-item-title>{{ subItem.localTime }}</v-list-item-title>
                        </v-list-item>
                      </v-list-item>
                    </v-list>
                  </template>
                </div>
                <div
                  v-if="shouldDisplayInteractiveMessage && message.interactiveMessage.templateType == 'DateTimePicker'">
                  <v-toolbar-title>{{message.interactiveMessage.data.content.title}}</v-toolbar-title>
                  <v-datetime-picker 
                    v-model="datetime"
                    :text-field-props="textFieldProps"
                  >
                  </v-datetime-picker>
                  <v-btn v-on:click="sendDateTime(datetime)" depressed>Confirm</v-btn>
                </div>
                <div
                  v-if="message.id === this.$store.state.messages.length - 1 && isLastMessageFeedback && message.type === 'bot' && botDialogState && showDialogFeedback"
                  class="feedback-state"
                >
                  <v-icon
                    @click="onButtonClick(positiveIntent)"
                    :class="{'feedback-icons-positive': !positiveClick, positiveClick: positiveClick}"
                    tabindex="0"
                    size="small"
                  >
                    thumb_up
                  </v-icon>
                  <v-icon
                    @click="onButtonClick(negativeIntent)"
                    :class="{'feedback-icons-negative': !negativeClick, negativeClick: negativeClick}"
                    tabindex="0"
                    size="small"
                  >
                    thumb_down
                  </v-icon>
                </div>
                <v-icon
                  medium
                  v-if="message.type === 'bot' && botDialogState && showDialogStateIcon"
                  :class="`dialog-state-${botDialogState.state}`"
                  class="dialog-state"
                >
                  {{botDialogState.icon}}
                </v-icon>
                <div v-if="message.type === 'human' && message.audio">
                  <audio>
                    <source v-bind:src="message.audio" type="audio/wav" />
                  </audio>
                  <v-btn
                    @click="playAudio"
                    tabindex="0"
                    icon
                    v-show="!showMessageMenu"
                    class="icon-color ml-0 mr-0"
                  >
                    <v-icon class="play-icon">mdi-play-circle-outline</v-icon>
                  </v-btn>
                </div>
                  <div offset-y v-if="shouldShowAttachments">
                    <v-btn :class="`tooltip-attachments-${message.id}`" v-on="attachmentEventHandlers" icon>
                      <v-icon medium>
                        attach_file
                      </v-icon>                      
                    </v-btn>
                    <v-tooltip
                      v-model="showAttachmentsTooltip"
                      :activator="`.tooltip-attachments-${message.id}`"
                      content-class="tooltip-custom"
                      left
                    >
                      <span>{{message.attachements}}</span>
                    </v-tooltip>
                  </div>
                 <v-menu offset-y v-if="message.type === 'human'" v-show="showMessageMenu">
                  <v-btn
                    slot="activator"
                    icon
                  >
                    <v-icon class="smicon">
                      more_vert
                    </v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title @click="resendMessage(message.text)">
                        <v-icon>replay</v-icon>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      v-if="message.type === 'human' && message.audio"
                      class="message-audio">
                      <v-list-item-title @click="playAudio">
                        <v-icon>play_circle_outline</v-icon>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-row>
          </v-col>
          <v-col
            v-if="shouldShowMessageDate && isMessageFocused"
            :class="`text-xs-center message-date-${message.type}`"
            aria-hidden="true"
          >
           {{messageHumanDate}}
          </v-col>
        </v-col>
      </v-row>
      <v-row v-if="shouldDisplayResponseCard" class="response-card" d-flex mt-2 mr-2 ml-3>
        <response-card
          v-for="(card, index) in message.responseCard.genericAttachments"
          :response-card="card"
          :key="index"
        />
      </v-row>
      <v-row v-if="shouldDisplayResponseCardV2 && !shouldDisplayResponseCard">
        <v-row v-for="(item, index) in message.responseCardsLexV2"
          class="response-card"
          d-flex
          mt-2 mr-2 ml-3
          :key="index"
        >
        <response-card
          v-for="(card, index) in item.genericAttachments"
          :response-card="card"
          :key="index"
        >
        </response-card>
        </v-row>
      </v-row>
    </v-col>
  </v-row>
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
import MessageText from './MessageText';
import ResponseCard from './ResponseCard';

export default {
  name: 'message',
  props: ['message', 'feedback'],
  components: {
    MessageText,
    ResponseCard,
  },
  data() {
    return {
      isMessageFocused: false,
      messageHumanDate: 'Now',
      datetime: new Date(),
      textFieldProps: {
        appendIcon: 'event'
      },
      positiveClick: false,
      negativeClick: false,
      hasButtonBeenClicked: false,
      disableCardButtons: false,
      positiveIntent: this.$store.state.config.ui.positiveFeedbackIntent,
      negativeIntent: this.$store.state.config.ui.negativeFeedbackIntent,
      hideInputFields: this.$store.state.config.ui.hideInputFieldsForButtonResponse,
      showAttachmentsTooltip: false,
      attachmentEventHandlers: {
        mouseenter: this.mouseOverAttachment,
        mouseleave: this.mouseOverAttachment,
        touchstart: this.mouseOverAttachment,
        touchend: this.mouseOverAttachment,
        touchcancel: this.mouseOverAttachment,
      },
    };
  },
  computed: {
    botDialogState() {
      if (!('dialogState' in this.message)) {
        return null;
      }
      switch (this.message.dialogState) {
        case 'Failed':
          return { icon: 'error', color: 'red', state: 'fail' };
        case 'Fulfilled':
        case 'ReadyForFulfillment':
          return { icon: 'done', color: 'green', state: 'ok' };
        default:
          return null;
      }
    },
    isLastMessageFeedback() {
      if (this.$store.state.messages.length > 2 && this.$store.state.messages[this.$store.state.messages.length - 2].type !== 'feedback') {
        return true;
      }
      return false;
    },
    botAvatarUrl() {
      return this.$store.state.config.ui.avatarImageUrl;
    },
    agentAvatarUrl() {
      return this.$store.state.config.ui.agentAvatarImageUrl;
    },
    showDialogStateIcon() {
      return this.$store.state.config.ui.showDialogStateIcon;
    },
    showMessageMenu() {
      return this.$store.state.config.ui.messageMenu;
    },
    showDialogFeedback() {
      if (this.$store.state.config.ui.positiveFeedbackIntent.length > 2
      && this.$store.state.config.ui.negativeFeedbackIntent.length > 2) {
        return true;
      }
      return false;
    },
    showErrorIcon() {
      return this.$store.state.config.ui.showErrorIcon;
    },
    shouldDisplayResponseCard() {
      return (
        this.message.responseCard &&
        (this.message.responseCard.version === '1' ||
         this.message.responseCard.version === 1) &&
        this.message.responseCard.contentType === 'application/vnd.amazonaws.card.generic' &&
        'genericAttachments' in this.message.responseCard &&
        this.message.responseCard.genericAttachments instanceof Array
      );
    },
    shouldDisplayResponseCardV2() {
      return (
        'isLastMessageInGroup' in this.message
        && this.message.isLastMessageInGroup === 'true'
        && this.message.responseCardsLexV2
        && this.message.responseCardsLexV2.length > 0
      );
    },
    shouldDisplayInteractiveMessage() {
      try {           
          this.message.interactiveMessage = JSON.parse(this.message.text);
          
          // Considering anything with the templateType property on a valid JSON object to be an interactive message
          if (!this.message.interactiveMessage.hasOwnProperty("templateType"))
          {
            return false;
          }

          if (this.message.interactiveMessage.templateType == 'TimePicker')
          {                     
            var sortedslots = this.message.interactiveMessage.data.content.timeslots.sort((a, b) => a.date.localeCompare(b.date));
            const dateFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
            const timeFormatOptions = { hour: "numeric", minute: "numeric", timeZoneName: "short" };
            const localeId = localStorage.getItem('selectedLocale') ? localStorage.getItem('selectedLocale') : this.$store.state.config.lex.v2BotLocaleId.split(',')[0];
            var locale = (localeId || 'en-US').replace('_','-');

            var dateArray = [];
            sortedslots.forEach(function (slot, index) {            
              slot.localTime = new Date(slot.date).toLocaleTimeString(locale, timeFormatOptions);
              const msToMidnightOfDate = new Date(slot.date).setHours(0, 0, 0, 0);
              const dateKey = new Date(msToMidnightOfDate).toLocaleDateString(locale, dateFormatOptions);

              let existingDate = dateArray.find(e => e.date === dateKey);
              if (existingDate) {
                existingDate.slots.push(slot)
              }
              else {
                var item = { date: dateKey, slots: [slot] };
                dateArray.push(item);
              }
            });

            this.message.interactiveMessage.timeslots = dateArray;           
          }
      } catch (e) {
          return false;
      }
      return true;
    },
    shouldShowAvatarImage() {
      if (this.message.type === 'bot') {
        return this.botAvatarUrl;
      } else if (this.message.type === 'agent') {
        return this.agentAvatarUrl;
      }
      return false;
    },
    avatarBackground() {
      const avatarURL = (this.message.type === 'bot') ? this.botAvatarUrl : this.agentAvatarUrl;
      return {
        background: `url(${avatarURL}) center center / contain no-repeat`,
      };
    },
    shouldShowMessageDate() {
      return this.$store.state.config.ui.showMessageDate;
    },
    shouldShowAttachments() {
      if (this.message.type === 'human' && this.message.attachements) {
        return true;
      }
      return false;
    },
  },
  provide: function () {
    return {
      getRCButtonsDisabled: this.getRCButtonsDisabled,
      setRCButtonsDisabled: this.setRCButtonsDisabled
    }
  },
  methods: {
    setRCButtonsDisabled: function() {
      this.disableCardButtons = true;
    },
    getRCButtonsDisabled: function() {
      return this.disableCardButtons;
    },
    resendMessage(messageText) {
      const message = {
        type: 'human',
        text: messageText,
      };
      this.$store.dispatch('postTextMessage', message);
    },
    sendDateTime(dateTime) {
      const message = {
        type: 'human',
        text: dateTime.toLocaleString(),
      };
      this.$store.dispatch('postTextMessage', message);
    },
    onButtonClick(feedback) {
      if (!this.hasButtonBeenClicked) {
        this.hasButtonBeenClicked = true;
        if (feedback === this.$store.state.config.ui.positiveFeedbackIntent) {
          this.positiveClick = true;
        } else {
          this.negativeClick = true;
        }
        const message = {
          type: 'feedback',
          text: feedback,
        };
        this.$emit('feedbackButton');
        this.$store.dispatch('postTextMessage', message);
      }
    },
    playAudio() {
      // XXX doesn't play in Firefox or Edge
      /* XXX also tried:
      const audio = new Audio(this.message.audio);
      audio.play();
      */
      const audioElem = this.$el.querySelector('audio');
      if (audioElem) {
        audioElem.play();
      }
    },
    onMessageFocus() {
      if (!this.shouldShowMessageDate) {
        return;
      }
      this.messageHumanDate = this.getMessageHumanDate();
      this.isMessageFocused = true;
      if (this.message.id === this.$store.state.messages.length - 1) {
        this.$emit('scrollDown');
      }
    },
    mouseOverAttachment() {
      this.showAttachmentsTooltip = !this.showAttachmentsTooltip;
    },
    onMessageBlur() {
      if (!this.shouldShowMessageDate) {
        return;
      }
      this.isMessageFocused = false;
    },
    getMessageHumanDate() {
      const dateDiff = Math.round((new Date() - this.message.date) / 1000);
      const secsInHr = 3600;
      const secsInDay = secsInHr * 24;
      if (dateDiff < 60) {
        return 'Now';
      } else if (dateDiff < secsInHr) {
        return `${Math.floor(dateDiff / 60)} min ago`;
      } else if (dateDiff < secsInDay) {
        return this.message.date.toLocaleTimeString();
      }
      return this.message.date.toLocaleString();
    },
  },
  created() {
    if (this.message.responseCard && 'genericAttachments' in this.message.responseCard) {
      if (this.message.responseCard.genericAttachments[0].buttons &&
          this.hideInputFields && !this.$store.state.hasButtons) {
        this.$store.dispatch('toggleHasButtons');
      }
    } else if (this.$store.state.config.ui.hideInputFieldsForButtonResponse) {
      if (this.$store.state.hasButtons) {
        this.$store.dispatch('toggleHasButtons');
      }
    }
  },
};
</script>

<style scoped>
.smicon {
  font-size: 14px;
  margin-top: 0.75em;
}
.message,
.message-bubble-column {
  flex: 0 0 auto;
}
.message,
.message-bubble-row-human {
  justify-content: flex-end;
}
.message-bubble-row-feedback {
  justify-content: flex-end;
}
.message-bubble-row-bot {
  max-width: 80vw;
  flex-wrap: nowrap;
}
.message-date-human {
  text-align: right;
}
.message-date-feedback {
  text-align: right;
}
.message-date-bot {
}

.avatar {
  align-self: center;
  border-radius: 50%;
  min-width: calc(2.5em + 1.5vmin);
  min-height: calc(2.5em + 1.5vmin);
  align-self: flex-start;
  margin-right: 4px;
}

.message-bubble {
  border-radius: 24px;
  display: inline-flex;
  font-size: calc(1em + 0.25vmin);
  padding: 0 12px;
  width: fit-content;
  align-self: center;
}

.interactive-row {
  display: block;
}

.focusable {
  box-shadow: 0 0.25px 0.75px rgba(0,0,0,0.12), 0 0.25px 0.5px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  cursor: default;
}

.focusable:focus {
  box-shadow: 0 1.25px 3.75px rgba(0,0,0,0.25), 0 1.25px 2.5px rgba(0,0,0,0.22);
  outline: none;
}

.message-bot .message-bubble {
  background-color: #FFEBEE; /* red-50 from material palette */
}

.message-agent .message-bubble {
  background-color: #FFEBEE; /* red-50 from material palette */
}
.message-human .message-bubble {
  background-color: #E8EAF6; /* indigo-50 from material palette */
}

.message-feedback .message-bubble {
  background-color: #E8EAF6;
}

.dialog-state {
  display: inline-flex;
}

.dialog-state-ok {
  color: green;
}
.dialog-state-fail {
  color: red;
}

.play-icon {
  font-size: 2em;
}

.feedback-state {
  display: inline-flex;
  align-self: center;
}

.feedback-icons-positive{
  color: grey;
  /* color: #E8EAF6; */
  /* color: green; */
  padding: .125em;
}

.positiveClick{
  color: green;
  padding: .125em;
}

.negativeClick{
  color: red;
  padding: .125em;
}

.feedback-icons-positive:hover{
  color:green;
}

.feedback-icons-negative{
  /* color: #E8EAF6; */
  color: grey;
  padding-left: 0.2em;
}

.feedback-icons-negative:hover{
  color: red;
}

.response-card {
  justify-content: center;
  width: 85vw;
}

.no-point {
  pointer-events: none;
}

</style>
