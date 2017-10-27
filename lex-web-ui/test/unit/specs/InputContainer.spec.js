import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

import InputContainer from '@/components/InputContainer';
import { Store } from '@/lex-web-ui';

/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */
/* eslint-disable prefer-destructuring */

describe('InputContainer.vue', () => {
  const textInputPlaceholder = 'type or click here';
  let vm;
  let store;
  let actions = {};

  beforeEach(() => {
    Vue.use(Vuex);
    Vue.use(Vuetify);

    actions = {
      postTextMessage: sinon.stub().resolves(),
      setAudioAutoPlay: sinon.stub().resolves(),
      startConversation: sinon.stub().resolves(),
      pollySynthesizeSpeech: sinon.stub().resolves(),
      interruptSpeechConversation: sinon.stub().resolves(),
      getRecorderVolume: sinon.stub().resolves({
        max: Math.random(),
        slow: Math.random(),
        instant: Math.random(),
      }),
      getAudioProperties: sinon.stub().resolves({
        end: Math.random(),
        duration: Math.random(),
      }),
    };

    store = new Vuex.Store({
      ...Store,
      actions: { ...Store.actions, ...actions },
    });

    vm = new Vue({
      store,
      template: `
        <input-container
          ref="input-container"
          v-bind:text-input-placeholder="'${textInputPlaceholder}'"
        ></input-container>`,
      components: { InputContainer },
    });

    vm.$mount();
  });

  afterEach(() => {
    vm.$destroy();
  });

  it('should have a toolbar element', () => {
    const toolbar = vm.$el.querySelector('.toolbar');
    expect(toolbar, 'toolbar element').is.not.equal(null);
  });

  it('should have a text input element', () => {
    const textInput = vm.$el.querySelector('#text-input');
    expect(textInput, 'text input').is.not.equal(null);
  });

  it('should update class and data on text input focus event', () => {
    const textInput = vm.$el.querySelector('#text-input');
    const inputGroup = vm.$el.querySelector('.input-group');
    const focusEvent = new window.Event('focus');
    let { isTextFieldFocused } = vm.$refs['input-container'].$data;

    expect(isTextFieldFocused, 'isTextFieldFocused data').to.equal(false);
    expect(inputGroup.className, 'input group')
      .to.not.contain(' input-group--focused');

    textInput.dispatchEvent(focusEvent);
    return vm.$nextTick()
      .then(() => {
        isTextFieldFocused =
          vm.$refs['input-container'].$data.isTextFieldFocused;

        expect(isTextFieldFocused, 'isTextFieldFocused data').to.equal(true);
        expect(inputGroup.className, 'input group')
          .to.contain(' input-group--focused');
      });
  });

  it('should have a place holder label in text input', () => {
    const textInputLabel = vm.$el.querySelector('label[for="text-input"]');

    expect(textInputLabel, 'text input label').is.not.equal(null);
    expect(textInputLabel.textContent, 'text input placeholder').is.not.equal(null);
    expect(textInputLabel.textContent, 'text input placeholder')
      .to.equal(textInputPlaceholder);
  });

  it('should submit message on pressing enter on text field and clear it', () => {
    const textInputEl = vm.$el.querySelector('#text-input');
    const inputEvent = new window.Event('input');
    const focusEvent = new window.Event('focus');
    const blurEvent = new window.Event('blur');
    const keyupEvent = document.createEvent('HTMLEvents');
    const utterance = 'order';
    let { textInput, isTextFieldFocused } = vm.$refs['input-container'].$data;

    textInputEl.value = utterance;
    textInputEl.dispatchEvent(focusEvent);
    textInputEl.dispatchEvent(inputEvent, utterance);

    keyupEvent.initEvent('keyup', true, true);
    keyupEvent.keyCode = 13;

    return vm.$nextTick()
      .then(() => {
        isTextFieldFocused =
          vm.$refs['input-container'].$data.isTextFieldFocused;
        textInput = vm.$refs['input-container'].$data.textInput;

        expect(isTextFieldFocused, 'text field focused data').to.equal(true);
        expect(textInput, 'text input data').to.equal(utterance);

        textInputEl.dispatchEvent(keyupEvent);
      })
      .then(() => {
        textInputEl.dispatchEvent(blurEvent);
        return vm.$nextTick();
      })
      .then(() => {
        isTextFieldFocused =
          vm.$refs['input-container'].$data.isTextFieldFocused;
        textInput = vm.$refs['input-container'].$data.textInput;

        expect(isTextFieldFocused, 'text field focused data').to.equal(false);
        expect(textInput, 'text input data').to.equal('');
        expect(actions.postTextMessage, 'postTextMessage action')
          .to.have.callCount(1);
        expect(actions.postTextMessage, 'postTextMessage action')
          .to.have.been.calledWith(
            sinon.match.object,
            sinon.match({ type: 'human', text: utterance }),
          );
      });
  });

  it('should have a recorder status component that is hidden by default', () => {
    const recorderStatusEl = vm.$el.querySelector('.recorder-status');

    expect(recorderStatusEl, 'recorder status component').is.not.equal(null);
    expect(recorderStatusEl.getAttribute('style'), 'style attribute')
      .to.contain('display: none');
  });

  it('should have a send button that is disabled by default', () => {
    const button = vm.$el.querySelector('button');
    const icon = button.querySelector('i');

    expect(button, 'button').is.not.equal(null);
    expect(icon, 'button icon').is.not.equal(null);
    expect(icon.textContent, 'button icon content').to.equal('send');
    expect(button.getAttribute('disabled'), 'button disabled attribute')
      .is.not.equal(null);
  });

  it('should have a send button and tooltip that gets enabled on text field input', () => {
    const button = vm.$el.querySelector('button');
    const textInput = vm.$el.querySelector('#text-input');
    const inputEvent = new window.Event('input');

    textInput.value = 'input test';
    textInput.dispatchEvent(inputEvent, 'input test');

    return vm.$nextTick()
      .then(() => {
        expect(button.getAttribute('disabled'), 'button disabled attribute')
          .is.equal(null);

        const tooltip = vm.$refs['input-container'].$refs.tooltip.$el;
        const tooltipContent = tooltip.querySelector('#input-button-tooltip').textContent;
        expect(tooltip, 'input button tooltip').is.not.equal(null);
        expect(tooltipContent, 'input button tooltip content').to.equal('send');
      });
  });

  it('should submit input field when pressing the send button', () => {
    const button = vm.$el.querySelector('button');
    const textInput = vm.$el.querySelector('#text-input');
    const inputEvent = new window.Event('input');
    const clickEvent = new window.Event('click');
    const utterance = 'order';
    let dataTextInput;

    textInput.value = utterance;
    textInput.dispatchEvent(inputEvent, utterance);

    return vm.$nextTick()
      .then(() => {
        dataTextInput = vm.$refs['input-container'].$data.textInput;
        expect(dataTextInput, 'text input data').to.equal(utterance);
        expect(button.getAttribute('disabled'), 'button disabled attribute')
          .is.equal(null);

        button.dispatchEvent(clickEvent);
      })
      .then(() => vm.$nextTick())
      .then(() => {
        dataTextInput = vm.$refs['input-container'].$data.textInput;
        expect(dataTextInput, 'text input data').is.equal('');
        expect(button.getAttribute('disabled'), 'button disabled attribute')
          .is.not.equal(null);
        expect(actions.postTextMessage, 'postTextMessage action')
          .to.have.callCount(1);
        expect(actions.postTextMessage, 'postTextMessage action')
          .to.have.been.calledWith(
            sinon.match.object,
            sinon.match({ type: 'human', text: utterance }),
          );
      });
  });

  it('should have a mic button when recorder is enabled and a tooltip', () => {
    vm.$store.commit('setIsRecorderEnabled', true);
    vm.$store.commit('setIsRecorderSupported', true);

    return vm.$nextTick()
      .then(() => {
        const button = vm.$el.querySelector('button');
        const icon = button.querySelector('i');
        const tooltip = vm.$refs['input-container'].$refs.tooltip.$el;
        const tooltipContent = tooltip.querySelector('#input-button-tooltip').textContent;

        expect(button, 'button').is.not.equal(null);
        expect(icon, 'button icon').is.not.equal(null);
        expect(icon.textContent, 'button icon content').to.equal('mic');
        expect(button.getAttribute('disabled'), 'button disabled attribute')
          .is.equal(null);
        expect(tooltip, 'input button tooltip').is.not.equal(null);
        expect(tooltipContent, 'input button tooltip content').to.equal('click to use voice');
      });
  });

  it('should start conversation when mic button is pressed', () => {
    const button = vm.$el.querySelector('button');
    const clickEvent = new window.Event('click');

    vm.$store.commit('setIsRecorderEnabled', true);
    vm.$store.commit('setIsRecorderSupported', true);

    button.dispatchEvent(clickEvent);

    return vm.$nextTick()
      .then(() => {
        expect(actions.setAudioAutoPlay, 'setAudioAutoPlay action')
          .to.have.callCount(1);
        expect(actions.pollySynthesizeSpeech, 'pollySynthesizeSpeech action')
          .to.have.callCount(1);

        return vm.$nextTick();
      })
      .then(() => {
        expect(actions.startConversation, 'startConversation action')
          .to.have.callCount(1);
      });
  });

  it('should not set audio auto play again if already set', () => {
    const button = vm.$el.querySelector('button');
    const clickEvent = new window.Event('click');

    vm.$store.commit('setIsRecorderEnabled', true);
    vm.$store.commit('setIsRecorderSupported', true);

    vm.$store.commit(
      'setAudioAutoPlay',
      { audio: { autoplay: false }, status: true },
    );

    button.dispatchEvent(clickEvent);

    return vm.$nextTick()
      .then(() => {
        expect(actions.setAudioAutoPlay, 'setAudioAutoPlay action')
          .to.have.callCount(0);
      });
  });

  it('should not play initial instruction out of state', () => {
    const button = vm.$el.querySelector('button');
    const clickEvent = new window.Event('click');

    vm.$store.commit('setIsRecorderEnabled', true);
    vm.$store.commit('setIsRecorderSupported', true);
    vm.$store.commit('updateLexState', { dialogState: 'ElicitSlot' });

    button.dispatchEvent(clickEvent);

    return vm.$nextTick()
      .then(() => {
        expect(actions.pollySynthesizeSpeech, 'pollySynthesizeSpeech action')
          .to.have.callCount(0);
      });
  });

  it('should disable mic button with a tooltip and not start conversation when muted', () => {
    const button = vm.$el.querySelector('button');
    const clickEvent = new window.Event('click');

    vm.$store.commit('setIsRecorderEnabled', true);
    vm.$store.commit('setIsRecorderSupported', true);
    vm.$store.commit('mergeConfig', { recorder: { useAutoMuteDetect: true } });
    vm.$store.commit('setIsMicMuted', true);

    return vm.$nextTick()
      .then(() => {
        const icon = button.querySelector('i');
        const tooltip = vm.$refs['input-container'].$refs.tooltip.$el;
        const tooltipContent = tooltip.querySelector('#input-button-tooltip').textContent;

        expect(button, 'button').is.not.equal(null);
        expect(icon, 'button icon').is.not.equal(null);
        expect(icon.textContent, 'button icon content').to.equal('mic_off');
        expect(button.getAttribute('disabled'), 'button disabled attribute')
          .is.not.equal(null);

        expect(tooltipContent, 'button tooltip').is.equal('mic seems to be muted');

        button.dispatchEvent(clickEvent);
        return vm.$nextTick();
      })
      .then(() => {
        expect(actions.setAudioAutoPlay, 'setAudioAutoPlay action')
          .to.have.callCount(0);
        expect(actions.pollySynthesizeSpeech, 'pollySynthesizeSpeech action')
          .to.have.callCount(0);

        return vm.$nextTick();
      })
      .then(() => {
        expect(actions.startConversation, 'startConversation action')
          .to.have.callCount(0);
      });
  });

  it('should have a stop button with a tooltip when bot is speaking that interrupts playback', () => {
    const button = vm.$el.querySelector('button');
    const icon = button.querySelector('i');
    const clickEvent = new window.Event('click');

    vm.$store.commit('setIsRecorderEnabled', true);
    vm.$store.commit('setIsRecorderSupported', true);
    vm.$store.commit('mergeConfig', { recorder: { useAutoMuteDetect: true } });
    vm.$store.commit('setIsMicMuted', false);
    vm.$store.commit('setIsConversationGoing', true);
    vm.$store.commit('setIsBotSpeaking', true);

    return vm.$nextTick()
      .then(() => {
        const tooltip = vm.$refs['input-container'].$refs.tooltip.$el;
        const tooltipContent = tooltip.querySelector('#input-button-tooltip').textContent;
        expect(button, 'button').is.not.equal(null);
        expect(icon, 'button icon').is.not.equal(null);
        expect(icon.textContent, 'button icon content').to.equal('stop');
        expect(button.getAttribute('disabled'), 'button disabled attribute')
          .is.equal(null);
        expect(tooltipContent, 'button tooltip').is.equal('interrupt');

        return vm.$nextTick();
      })
      .then(() => {
        button.dispatchEvent(clickEvent);
        return vm.$nextTick();
      })
      .then(() => {
        expect(actions.startConversation, 'startConversation action')
          .to.have.callCount(0);
        expect(
          actions.interruptSpeechConversation,
          'interruptSpeechConversation action',
        )
          .to.have.callCount(1);
      });
  });
});
