import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

import RecorderStatus from '@/components/RecorderStatus';
import { Store } from '@/lex-web-ui';

/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */
/* eslint-disable prefer-destructuring */

describe('RecorderStatus.vue', () => {
  let vm;
  let store;
  let actions = {};

  beforeEach(() => {
    Vue.use(Vuex);
    Vue.use(Vuetify);

    actions = {
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
      actions,
    });

    vm = new Vue({
      store,
      template: `
        <recorder-status
          ref="recorder-status"
        ></recorder-status>`,
      components: { RecorderStatus },
    });

    vm.$mount();
  });

  afterEach(() => {
    vm.$destroy();
  });

  it('should have a status text element', () => {
    const statusTextEl = vm.$el.querySelector('.status-text');
    expect(statusTextEl, 'status text element').is.not.equal(null);
  });

  it('should set status text depending on the state', () => {
    let statusTextEl = vm.$el.querySelector('.status-text span');
    expect(statusTextEl.textContent, 'status text').is.not.equal(null);

    vm.$store.commit('setIsBotPlaybackInterrupting', true);
    return vm.$nextTick()
      .then(() => {
        statusTextEl = vm.$el.querySelector('.status-text span');
        expect(statusTextEl.textContent, 'status text')
          .to.equal('Interrupting...');

        vm.$store.commit('setIsBotPlaybackInterrupting', false);
        vm.$store.commit('setCanInterruptBotPlayback', true);
        return vm.$nextTick();
      })
      .then(() => {
        statusTextEl = vm.$el.querySelector('.status-text span');
        expect(statusTextEl.textContent, 'status text')
          .to.equal('Say "skip" and I\'ll listen for your answer...');

        vm.$store.commit('setCanInterruptBotPlayback', false);
        vm.$store.commit('mergeConfig', { recorder: { useAutoMuteDetect: true } });
        vm.$store.commit('setIsMicMuted', true);
        return vm.$nextTick();
      })
      .then(() => {
        statusTextEl = vm.$el.querySelector('.status-text span');
        expect(statusTextEl.textContent, 'status text')
          .to.equal('Microphone seems to be muted...');

        vm.$store.commit('setIsMicMuted', false);
        vm.$store.commit('mergeConfig', { recorder: { useAutoMuteDetect: false } });
        const recorder = { start() {} };
        vm.$store.commit('startRecording', recorder);
        return vm.$nextTick();
      })
      .then(() => {
        statusTextEl = vm.$el.querySelector('.status-text span');
        expect(statusTextEl.textContent, 'status text')
          .to.equal('Listening...');

        const recorder = { stop() {} };
        vm.$store.commit('stopRecording', recorder);
        vm.$store.commit('setIsBotSpeaking', true);
        return vm.$nextTick();
      })
      .then(() => {
        statusTextEl = vm.$el.querySelector('.status-text span');
        expect(statusTextEl.textContent, 'status text')
          .to.equal('Playing audio...');

        vm.$store.commit('setIsBotSpeaking', false);
        vm.$store.commit('setIsConversationGoing', true);
        return vm.$nextTick();
      })
      .then(() => {
        statusTextEl = vm.$el.querySelector('.status-text span');
        expect(statusTextEl.textContent, 'status text')
          .to.equal('Processing...');

        vm.$store.commit('setIsConversationGoing', false);
        vm.$store.commit('setIsRecorderEnabled', true);
        vm.$store.commit('setIsRecorderSupported', true);
        return vm.$nextTick();
      })
      .then(() => {
        statusTextEl = vm.$el.querySelector('.status-text span');
        expect(statusTextEl.textContent, 'status text')
          .to.equal('Click on the mic');

        vm.$store.commit('setIsRecorderEnabled', false);
        vm.$store.commit('setIsRecorderSupported', false);
      });
  });

  it('should have voice controls element', () => {
    const voiceControlsEl = vm.$el.querySelector('.voice-controls');
    expect(voiceControlsEl, 'voice controls element').is.not.equal(null);
  });

  it('should display audio meter when recording', () => {
    let volumeMeterEl = vm.$el.querySelector('.volume-meter');
    let { volume, volumeIntervalId } = vm.$refs['recorder-status'].$data;
    expect(volumeMeterEl, 'volume meter element').is.equal(null);
    expect(volume, 'volume data').is.equal(0);
    expect(volumeIntervalId, 'volume interval id data').is.equal(null);

    const recorder = { start() {}, stop() {} };
    vm.$store.commit('startRecording', recorder);
    return vm.$nextTick()
      .then(() => new Promise((resolve) => {
        setTimeout(resolve, 100);
      }))
      .then(() => {
        volumeMeterEl = vm.$el.querySelector('.volume-meter');
        expect(volumeMeterEl, 'volume meter element').is.not.equal(null);

        vm.$store.commit('stopRecording', recorder);
        return vm.$nextTick();
      })
      .then(() => {
        volume = vm.$refs['recorder-status'].$data.volume;
        expect(volume, 'volume data').is.not.equal(0);

        volumeIntervalId = vm.$refs['recorder-status'].$data.volumeIntervalId;
        expect(volumeIntervalId, 'volume interval id data').is.not.equal(null);

        volumeMeterEl = vm.$el.querySelector('.volume-meter');
        expect(volumeMeterEl, 'volume meter element').is.equal(null);
      });
  });

  it('should display playback progress when bot is speaking', () => {
    let audioProgressEl = vm.$el.querySelector('.audio-progress-bar');
    let { audioPlayPercent, audioIntervalId } = vm.$refs['recorder-status'].$data;
    expect(audioProgressEl, 'audio progress element').is.equal(null);
    expect(audioPlayPercent, 'audio percent data').is.equal(0);
    expect(audioIntervalId, 'audio interval id data').is.equal(null);

    vm.$store.commit('setIsBotSpeaking', true);
    return vm.$nextTick()
      .then(() => new Promise((resolve) => {
        setTimeout(resolve, 200);
      }))
      .then(() => {
        audioProgressEl = vm.$el.querySelector('.audio-progress-bar');
        expect(audioProgressEl, 'audio progress element').is.not.equal(null);

        audioPlayPercent = vm.$refs['recorder-status'].$data.audioPlayPercent;
        expect(audioPlayPercent, 'audio percent data').is.not.equal(0);

        vm.$store.commit('setIsBotSpeaking', false);
        return vm.$nextTick();
      })
      .then(() => {
        audioPlayPercent = vm.$refs['recorder-status'].$data.audioPlayPercent;
        expect(audioPlayPercent, 'audio percent data').is.equal(0);

        audioIntervalId = vm.$refs['recorder-status'].$data.audioIntervalId;
        expect(audioIntervalId, 'audio interval id data').is.not.equal(null);

        audioProgressEl = vm.$el.querySelector('.audio-progress-bar');
        expect(audioProgressEl, 'audio progress element').is.equal(null);
      });
  });

  it('should display indeterminate progress when processing', () => {
    let processingBarEl = vm.$el.querySelector('.processing-bar');
    expect(processingBarEl, 'processing bar element').is.equal(null);

    vm.$store.commit('setIsConversationGoing', true);
    return vm.$nextTick()
      .then(() => {
        processingBarEl = vm.$el.querySelector('.processing-bar');
        expect(processingBarEl, 'processing bar element').is.not.equal(null);

        vm.$store.commit('setIsConversationGoing', false);
        return vm.$nextTick();
      })
      .then(() => {
        processingBarEl = vm.$el.querySelector('.processing-bar');
        expect(processingBarEl, 'processing bar element').is.equal(null);
      });
  });
});
