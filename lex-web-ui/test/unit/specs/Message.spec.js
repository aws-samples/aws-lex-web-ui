import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

import Message from '@/components/Message';
import { Store } from '@/lex-web-ui';

/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

describe('Message.vue', function () {
  const message = {
    id: 0, text: 'test', type: 'bot', date: new Date(),
  };
  let vm;
  let store;

  beforeEach(() => {
    Vue.use(Vuex);
    Vue.use(Vuetify);

    store = new Vuex.Store({
      ...Store,
    });

    vm = new Vue({
      data() {
        return { message };
      },
      store,
      template: '<message v-bind:message="message"></message>',
      components: { Message },
    });

    vm.$mount();
  });

  afterEach(() => {
    vm.$destroy();
  });

  it('should have the "message" class on the root element', function () {
    const classList = [...vm.$el.classList];
    expect(classList, 'class list').to.contain('message');
  });

  it('should condionally render a bot avatar based on the config', function () {
    const imageUrl = 'http://localhost:8080/test.png';
    const imageUrlOrig = vm.$store.state.config.ui.avatarImageUrl;
    vm.$store.commit('mergeConfig', { ui: { avatarImageUrl: imageUrl } });
    return vm.$nextTick()
      .then(() => {
        const avatarEl = vm.$el.querySelector('.bot-avatar');
        expect(avatarEl, 'avatar Element').is.not.equal(null);
        expect(avatarEl.style['background-image'], 'background image')
          .is.equal(`url(${imageUrl})`);
        expect(avatarEl.tabIndex, 'avatar tab index').is.equal(message.id + 1);

        vm.$store.commit('mergeConfig', { ui: { avatarImageUrl: '' } });
        return vm.$nextTick();
      })
      .then(() => {
        const avatarEl = vm.$el.querySelector('.bot-avatar');
        expect(avatarEl, 'avatar Element').is.equal(null);
        vm.$store.commit('mergeConfig', { ui: { avatarImageUrl: imageUrlOrig } });
      });
  });

  it('should contain a message bubble element', function () {
    const messageBubbleEl = vm.$el.querySelector('.message-bubble');
    expect(messageBubbleEl, 'message bubble element').is.not.equal(null);
    expect(messageBubbleEl.textContent.trim(), 'message bubble text content')
      .is.equal(message.text);
    expect(messageBubbleEl.tabIndex, 'message bubble tab index')
      .is.equal(message.id + 1);
  });

  it('should condionally render a play button in human messages with audio', function () {
    let messageAudioEl = vm.$el.querySelector('.message-audio');
    const audioUrl = 'http://localhost/test.wav';

    vm.$set(vm.message, 'type', 'bot');

    return vm.$nextTick()
      .then(() => {
        messageAudioEl = vm.$el.querySelector('.message-audio');
        expect(messageAudioEl, 'message audio element').is.equal(null);
        vm.$set(vm.message, 'type', 'human');
        return vm.$nextTick();
      })
      .then(() => {
        messageAudioEl = vm.$el.querySelector('.message-audio');
        expect(messageAudioEl, 'message audio element').is.equal(null);
        vm.$set(vm.message, 'audio', audioUrl);
        return vm.$nextTick();
      })
      .then(() => {
        messageAudioEl = vm.$el.querySelector('.message-audio');
        const buttonEl = messageAudioEl.querySelector('button');
        const buttonIconEl = buttonEl.querySelector('i');
        const audioEl = messageAudioEl.querySelector('audio');
        const srcEl = audioEl.querySelector('source');
        expect(messageAudioEl, 'message audio element').is.not.equal(null);
        expect(buttonEl, 'play button').is.not.equal(null);
        expect(buttonIconEl, 'play button icon').is.not.equal(null);
        expect(buttonIconEl.textContent.trim(), 'play button icon')
          .is.equal('play_circle_outline');
        expect(audioEl, 'audio element').is.not.equal(null);
        expect(srcEl, 'source element').is.not.equal(null);
        expect(srcEl.getAttribute('src'), 'source element url').is.equal(audioUrl);
      });
  });

  it('should condionally render a bot dialog state icon', function () {
    let dialogStateEl = vm.$el.querySelector('.message-bubble > i.dialog-state');

    vm.$set(vm.message, 'type', 'human');

    return vm.$nextTick()
      .then(() => {
        dialogStateEl = vm.$el.querySelector('.message-bubble > i.dialog-state');
        expect(dialogStateEl, 'dialog state element').is.equal(null);
        vm.$set(vm.message, 'type', 'bot');
        return vm.$nextTick();
      })
      .then(() => {
        dialogStateEl = vm.$el.querySelector('.message-bubble > i.dialog-state');
        expect(dialogStateEl, 'dialog state element').is.equal(null);
        vm.$set(vm.message, 'dialogState', 'Failed');
        return vm.$nextTick();
      })
      .then(() => {
        dialogStateEl = vm.$el.querySelector('.message-bubble > i.dialog-state');
        expect(dialogStateEl, 'dialog state element').is.not.equal(null);
        expect(dialogStateEl.textContent.trim(), 'dialog state icon')
          .is.equal('error');

        vm.$set(vm.message, 'dialogState', 'Fulfilled');
        return vm.$nextTick();
      })
      .then(() => {
        dialogStateEl = vm.$el.querySelector('.message-bubble > i.dialog-state');
        expect(dialogStateEl, 'dialog state element').is.not.equal(null);
        expect(dialogStateEl.textContent.trim(), 'dialog state icon')
          .is.equal('done');

        vm.$set(vm.message, 'dialogState', null);
        return vm.$nextTick();
      })
      .then(() => {
        dialogStateEl = vm.$el.querySelector('.message-bubble > i.dialog-state');
        expect(dialogStateEl, 'dialog state element').is.equal(null);
      });
  });

  it('should render a date when the message bubble is focused', function () {
    const messageBubbleEl = vm.$el.querySelector('.message-bubble');
    const focusEvent = new window.Event('focus');
    const blurEvent = new window.Event('blur');
    const messageFiveMinutesEarlier = new Date(message.date - (5 * 60 * 1000));
    const messageHourEarlier = new Date(message.date - (60 * 60 * 1000));
    const messageDayEarlier = new Date(message.date - (60 * 60 * 24 * 1000));
    const showMessageDateOrig = vm.$store.state.config.ui.showMessageDate;
    let messageDateEl = vm.$el.querySelector('.message-date');
    expect(messageDateEl, 'message date element').is.equal(null);

    vm.$store.commit('mergeConfig', { ui: { showMessageDate: false } });
    messageBubbleEl.dispatchEvent(focusEvent);
    return vm.$nextTick()
      .then(() => {
        messageDateEl = vm.$el.querySelector('.message-date');
        expect(messageDateEl, 'message date element').is.equal(null);
        vm.$store.commit('mergeConfig', { ui: { showMessageDate: true } });
        messageBubbleEl.dispatchEvent(focusEvent);
        return vm.$nextTick();
      })
      .then(() => {
        messageDateEl = vm.$el.querySelector('.message-date');
        expect(messageDateEl, 'message date element').is.not.equal(null);
        expect(messageDateEl.textContent.trim(), 'date element content')
          .is.equal('Now');

        vm.$set(vm.message, 'date', messageFiveMinutesEarlier);
        messageBubbleEl.dispatchEvent(blurEvent);
        return vm.$nextTick()
          .then(() => {
            messageBubbleEl.dispatchEvent(focusEvent);
            return vm.$nextTick();
          });
      })
      .then(() => {
        const dateDiff = Math.round((new Date() - messageFiveMinutesEarlier) / 1000);
        messageDateEl = vm.$el.querySelector('.message-date');
        expect(messageDateEl.textContent.trim(), 'date element content')
          .is.equal(`${Math.floor(dateDiff / 60)} min`);

        vm.$set(vm.message, 'date', messageHourEarlier);
        messageBubbleEl.dispatchEvent(blurEvent);
        return vm.$nextTick()
          .then(() => {
            messageBubbleEl.dispatchEvent(focusEvent);
            return vm.$nextTick();
          });
      })
      .then(() => {
        messageDateEl = vm.$el.querySelector('.message-date');
        expect(messageDateEl.textContent.trim(), 'date element content')
          .is.equal(vm.$data.message.date.toLocaleTimeString());

        vm.$set(vm.message, 'date', messageDayEarlier);
        messageBubbleEl.dispatchEvent(blurEvent);
        return vm.$nextTick()
          .then(() => {
            messageBubbleEl.dispatchEvent(focusEvent);
            return vm.$nextTick();
          });
      })
      .then(() => {
        messageDateEl = vm.$el.querySelector('.message-date');
        expect(messageDateEl.textContent.trim(), 'date element content')
          .is.equal(vm.$data.message.date.toLocaleString());

        vm.$store.commit('mergeConfig', { ui: { showMessageDate: showMessageDateOrig } });
      });
  });

  it('should condionally render a response card', function () {
    let responseCardEl = vm.$el.querySelector('.message > .message-layout > .response-card');

    const responseCard = {
      version: 1,
      contentType: 'application/vnd.amazonaws.card.generic',
      genericAttachments: [{
        title: 'test',
      }],
    };

    expect(responseCardEl, 'response card element').is.equal(null);
    vm.$set(vm.message, 'responseCard', responseCard);

    return vm.$nextTick()
      .then(() => {
        responseCardEl = vm.$el.querySelector('.message > .message-layout > .response-card');
        expect(responseCardEl, 'response card element').is.not.equal(null);

        vm.$set(vm.message, 'responseCard', null);
        return vm.$nextTick();
      })
      .then(() => {
        responseCardEl = vm.$el.querySelector('.message > .message-layout > .response-card');
        expect(responseCardEl, 'response card element').is.equal(null);
      });
  });

  it('should condionally render markdown from a message', function () {
    expect(vm.$store.state.config.ui.AllowSuperDangerousHTMLInMessage)
      .is.equal(false);
    vm.$set(vm.$store.state.config.ui, 'AllowSuperDangerousHTMLInMessage', true);
    vm.$set(vm.message, 'text', 'hello i am text');
    vm.$set(vm.message, 'alts', {
      markdown: '# hello i am markdown',
    });
    return vm.$nextTick()
      .then(() => {
        const el = vm.$el.querySelector('.message > .message-layout h1');
        expect(!!el).is.equal(true);
        vm.$set(vm.$store.state.config.ui, 'AllowSuperDangerousHTMLInMessage', false);
      })
      .catch((error) => {
        vm.$set(vm.$store.state.config.ui, 'AllowSuperDangerousHTMLInMessage', false);
        throw error;
      });
  });
});
