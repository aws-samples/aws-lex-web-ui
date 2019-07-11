import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

import MessageList from '@/components/MessageList';
import { Store } from '@/lex-web-ui';

/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

describe('MessageList.vue', function () {
  let vm;
  let store;

  beforeEach(() => {
    Vue.use(Vuex);
    Vue.use(Vuetify);

    store = new Vuex.Store({
      ...Store,
    });

    vm = new Vue({
      store,
      template: '<message-list ref="ml"></message-list>',
      components: { MessageList },
    });

    vm.$mount();
  });

  afterEach(() => {
    vm.$destroy();
  });

  it('should have the "message-list" class on root element', function () {
    const classList = [...vm.$el.classList];
    expect(classList, 'class list').to.contain('message-list');
  });

  it('should add a message element when pushing a message to the store', function () {
    const messageElemCount = vm.$el.querySelectorAll('.message').length;
    vm.$store.commit('pushMessage', { text: 'test', type: 'bot' });
    return vm.$nextTick()
      .then(() => {
        const elemDiff = vm.$el.querySelectorAll('.message').length - messageElemCount;
        expect(elemDiff, 'message element difference').to.equal(1);
      });
  });

  it('should add a "message-<type>" class to messages', function () {
    const type = 'test123';
    vm.$store.commit('pushMessage', { type, text: 'test' });
    return vm.$nextTick()
      .then(() => {
        const messagesRefLen = vm.$refs.ml.$refs.messages.length;
        const lastMessageEl = vm.$refs.ml.$refs.messages[messagesRefLen - 1];
        const lastMessageClassList = [...lastMessageEl.$el.classList];
        expect(lastMessageClassList, 'last message class list')
          .to.contain(`message-${type}`);
      });
  });

  it('should call the scrollDow method when adding a message', function () {
    const scrollDownSpy = sinon.spy(vm.$refs.ml, 'scrollDown');
    vm.$store.commit('pushMessage', { text: 'test', type: 'human' });
    return vm.$nextTick()
      .then(() => {
        expect(scrollDownSpy, 'scrollDown method')
          .to.have.callCount(1);
        scrollDownSpy.restore();
      });
  });

  it('should handle the "scrollDown" event by calling scrollDown method', function () {
    vm.$store.commit('pushMessage', { text: 'test', type: 'human' });
    const scrollDownSpy = sinon.spy(vm.$refs.ml, 'scrollDown');
    expect(scrollDownSpy, 'scrollDown method').to.have.callCount(0);
    vm.$refs.ml.$refs.messages[0].$emit('scrollDown');
    return vm.$nextTick()
      .then(() => {
        expect(scrollDownSpy, 'scrollDown method')
          .to.have.callCount(1);
        scrollDownSpy.restore();
      });
  });
});
