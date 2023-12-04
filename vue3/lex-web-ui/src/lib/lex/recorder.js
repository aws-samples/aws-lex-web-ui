/*
 Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/* eslint no-console: ["error", { allow: ["info", "warn", "error"] }] */
/* global AudioContext CustomEvent document Event navigator window */

// wav encoder worker - uses webpack worker loader
import WavWorker from './wav-worker';

/**
 * Lex Recorder Module
 * Based on Recorderjs. It sort of mimics the MediaRecorder API.
 * @see {@link https://github.com/mattdiamond/Recorderjs}
 * @see {@https://github.com/chris-rudmin/Recorderjs}
 * @see {@https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder}
 */

/**
 * Class for Lex audio recording management.
 *
 * This class is used for microphone initialization and recording
 * management. It encodes the mic input into wav format.
 * It also monitors the audio input stream (e.g keeping track of volume)
 * filtered around human voice speech frequencies to look for silence
 */
export default class {
  /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

  /**
   * Constructs the recorder object
   *
   * @param {object} - options object
   *
   * @param {string} options.mimeType - Mime type to use on recording.
   *   Only 'audio/wav' is supported for now. Default: 'aduio/wav'.
   *
   * @param {boolean} options.autoStopRecording -  Controls if the recording
   *   should automatically stop on silence detection. Default: true.
   *
   * @param {number} options.recordingTimeMax - Maximum recording time in
   *   seconds. Recording will stop after going for this long. Default: 8.
   *
   * @param {number} options.recordingTimeMin - Minimum recording time in
   *   seconds. Used before evaluating if the line is quiet to allow initial
   *   pauses before speech. Default: 2.
   *
   * @param {boolean} options.recordingTimeMinAutoIncrease - Controls if the
   *   recordingTimeMin should be automatically increased (exponentially)
   *   based on the number of consecutive silent recordings.
   *   Default: true.
   *
   * @param {number} options.quietThreshold - Threshold of mic input level
   *   to consider quiet. Used to determine pauses in input this is measured
   *   using the "slow" mic volume. Default: 0.001.
   *
   * @param {number} options.quietTimeMin - Minimum mic quiet time (normally in
   *   fractions of a second) before automatically stopping the recording when
   *   autoStopRecording is true. In reality it takes a bit more time than this
   *   value given that the slow volume value is a decay. Reasonable times seem
   *   to be between 0.2 and 0.5. Default: 0.4.
   *
   * @param {number} options.volumeThreshold - Threshold of mic db level
   *   to consider quiet. Used to determine pauses in input this is measured
   *   using the "max" mic volume. Smaller values make the recorder auto stop
   *   faster. Default: -75
   *
   * @param {bool} options.useBandPass - Controls if a band pass filter is used
   *   for the microphone input. If true, the input is passed through a second
   *   order bandpass filter using AudioContext.createBiquadFilter:
   *   https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createBiquadFilter
   *   The bandpass filter helps to reduce noise, improve silence detection and
   *   produce smaller audio blobs. However, it may produce audio with lower
   *   fidelity. Default: true
   *
   * @param {number} options.bandPassFrequency - Frequency of bandpass filter in
   *   Hz. Mic input is passed through a second order bandpass filter to remove
   *   noise and improve quality/speech silence detection. Reasonable values
   *   should be around 3000 - 5000. Default: 4000.
   *
   * @param {number} options.bandPassQ - Q factor of bandpass filter.
   *   The higher the vaue, the narrower the pass band and steeper roll off.
   *   Reasonable values should be between 0.5 and 1.5. Default: 0.707
   *
   * @param {number} options.bufferLength - Length of buffer used in audio
   *   processor. Should be in powers of two between 512 to 8196. Passed to
   *   script processor and audio encoder. Lower values have lower latency.
   *   Default: 2048.
   *
   * @param {number} options.numChannels- Number of channels to record.
   *   Default: 1 (mono).
   *
   * @param {number} options.requestEchoCancellation - Request to use echo
   *   cancellation in the getUserMedia call:
   *   https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/echoCancellation
   *   Default: true.
   *
   * @param {bool} options.useAutoMuteDetect - Controls if the recorder utilizes
   *   automatic mute detection.
   *   Default: true.
   *
   * @param {number} options.muteThreshold - Threshold level when mute values
   *   are detected when useAutoMuteDetect is enabled. The higher the faster
   *   it reports the mic to be in a muted state but may cause it to flap
   *   between mute/unmute. The lower the values the slower it is to report
   *   the mic as mute. Too low of a value may cause it to never report the
   *   line as muted. Works in conjuction with options.quietTreshold.
   *   Reasonable values seem to be between: 1e-5 and 1e-8. Default: 1e-7.
   *
   * @param {bool} options.encoderUseTrim - Controls if the encoder should
   *   attempt to trim quiet samples from the beginning and end of the buffer
   *   Default: true.
   *
   * @param {number} options.encoderQuietTrimThreshold - Threshold when quiet
   *   levels are detected. Only applicable when encoderUseTrim is enabled. The
   *   encoder will trim samples below this value at the beginnig and end of the
   *   buffer. Lower value trim less silence resulting in larger WAV files.
   *   Reasonable values seem to be between 0.005 and 0.0005. Default: 0.0008.
   *
   * @param {number} options.encoderQuietTrimSlackBack - How many samples to
   *   add back to the encoded buffer before/after the
   *   encoderQuietTrimThreshold. Higher values trim less silence resulting in
   *   larger WAV files.
   *   Reasonable values seem to be between 3500 and 5000. Default: 4000.
   */
  constructor(options = {}) {
    this.initOptions(options);

    // event handler used for events similar to MediaRecorder API (e.g. onmute)
    this._eventTarget = document.createDocumentFragment();

    // encoder worker
    this._encoderWorker = new WavWorker();

    // worker uses this event listener to signal back
    // when wav has finished encoding
    this._encoderWorker.addEventListener(
      'message',
      evt => this._exportWav(evt.data),
    );
  }

  /**
   * Initialize general recorder options
   *
   * @param {object} options - object with various options controlling the
   *   recorder behavior. See the constructor for details.
   */
  initOptions(options = {}) {
    // TODO break this into functions, avoid side-effects, break into this.options.*
    if (options.preset) {
      Object.assign(options, this._getPresetOptions(options.preset));
    }

    this.mimeType = options.mimeType || 'audio/wav';

    this.recordingTimeMax = options.recordingTimeMax || 8;
    this.recordingTimeMin = options.recordingTimeMin || 2;
    this.recordingTimeMinAutoIncrease =
      (typeof options.recordingTimeMinAutoIncrease !== 'undefined') ?
        !!options.recordingTimeMinAutoIncrease :
        true;

    // speech detection configuration
    this.autoStopRecording =
      (typeof options.autoStopRecording !== 'undefined') ?
        !!options.autoStopRecording :
        true;
    this.quietThreshold = options.quietThreshold || 0.001;
    this.quietTimeMin = options.quietTimeMin || 0.4;
    this.volumeThreshold = options.volumeThreshold || -75;

    // band pass configuration
    this.useBandPass =
      (typeof options.useBandPass !== 'undefined') ?
        !!options.useBandPass :
        true;
    // https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode
    this.bandPassFrequency = options.bandPassFrequency || 4000;
    // Butterworth 0.707 [sqrt(1/2)]  | Chebyshev < 1.414
    this.bandPassQ = options.bandPassQ || 0.707;

    // parameters passed to script processor and also used in encoder
    // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createScriptProcessor
    this.bufferLength = options.bufferLength || 2048;
    this.numChannels = options.numChannels || 1;

    this.requestEchoCancellation =
      (typeof options.requestEchoCancellation !== 'undefined') ?
        !!options.requestEchoCancellation :
        true;

    // automatic mute detection options
    this.useAutoMuteDetect =
      (typeof options.useAutoMuteDetect !== 'undefined') ?
        !!options.useAutoMuteDetect :
        true;
    this.muteThreshold = options.muteThreshold || 1e-7;

    // encoder options
    this.encoderUseTrim =
      (typeof options.encoderUseTrim !== 'undefined') ?
        !!options.encoderUseTrim :
        true;
    this.encoderQuietTrimThreshold =
      options.encoderQuietTrimThreshold || 0.0008;
    this.encoderQuietTrimSlackBack = options.encoderQuietTrimSlackBack || 4000;
  }

  _getPresetOptions(preset = 'low_latency') {
    this._presets = ['low_latency', 'speech_recognition'];

    if (this._presets.indexOf(preset) === -1) {
      console.error('invalid preset');
      return {};
    }

    const presets = {
      low_latency: {
        encoderUseTrim: true,
        useBandPass: true,
      },
      speech_recognition: {
        encoderUseTrim: false,
        useBandPass: false,
        useAutoMuteDetect: false,
      },
    };

    return presets[preset];
  }

  /**
   * General init. This function should be called to initialize the recorder.
   *
   * @param {object} options - Optional parameter to reinitialize the
   *   recorder behavior. See the constructor for details.
   *
   * @return {Promise} - Returns a promise that resolves when the recorder is
   *   ready.
   */
  init() {
    this._state = 'inactive';

    this._instant = 0.0;
    this._slow = 0.0;
    this._clip = 0.0;
    this._maxVolume = -Infinity;

    this._isMicQuiet = true;
    this._isMicMuted = false;

    this._isSilentRecording = true;
    this._silentRecordingConsecutiveCount = 0;

    return Promise.resolve();
  }

  /**
   * Start recording
   */
  async start() {
    if (this._state !== 'inactive' ||
      typeof this._stream === 'undefined') {
      if (this._state !== 'inactive') {
        console.warn('invalid state to start recording');
        return;
      }
      console.warn('initializing audiocontext after first user interaction - chrome fix');
      await this._initAudioContext()
        .then(() => this._initMicVolumeProcessor())
        .then(() => this._initStream());
      if (typeof this._stream === 'undefined') {
        console.warn('failed to initialize audiocontext');
        return;
      }
    }

    this._state = 'recording';

    this._recordingStartTime = this._audioContext.currentTime;
    this._eventTarget.dispatchEvent(new Event('start'));

    this._encoderWorker.postMessage({
      command: 'init',
      config: {
        sampleRate: this._audioContext.sampleRate,
        numChannels: this.numChannels,
        useTrim: this.encoderUseTrim,
        quietTrimThreshold: this.encoderQuietTrimThreshold,
        quietTrimSlackBack: this.encoderQuietTrimSlackBack,
      },
    });
  }

  /**
   * Stop recording
   */
  stop() {
    if (this._state !== 'recording') {
      console.warn('recorder stop called out of state');
      return;
    }

    if (this._recordingStartTime > this._quietStartTime) {
      this._isSilentRecording = true;
      this._silentRecordingConsecutiveCount += 1;
      this._eventTarget.dispatchEvent(new Event('silentrecording'));
    } else {
      this._isSilentRecording = false;
      this._silentRecordingConsecutiveCount = 0;
      this._eventTarget.dispatchEvent(new Event('unsilentrecording'));
    }

    this._state = 'inactive';
    this._recordingStartTime = 0;

    this._encoderWorker.postMessage({
      command: 'exportWav',
      type: 'audio/wav',
    });

    this._eventTarget.dispatchEvent(new Event('stop'));
  }

  _exportWav(evt) {
    const event = new CustomEvent('dataavailable', { detail: evt.data });
    this._eventTarget.dispatchEvent(event);
    this._encoderWorker.postMessage({ command: 'clear' });
  }

  _recordBuffers(inputBuffer) {
    if (this._state !== 'recording') {
      console.warn('recorder _recordBuffers called out of state');
      return;
    }
    const buffer = [];
    for (let i = 0; i < inputBuffer.numberOfChannels; i++) {
      buffer[i] = inputBuffer.getChannelData(i);
    }

    this._encoderWorker.postMessage({
      command: 'record',
      buffer,
    });
  }

  _setIsMicMuted() {
    if (!this.useAutoMuteDetect) {
      return;
    }
    // TODO incorporate _maxVolume
    if (this._instant >= this.muteThreshold) {
      if (this._isMicMuted) {
        this._isMicMuted = false;
        this._eventTarget.dispatchEvent(new Event('unmute'));
      }
      return;
    }

    if (!this._isMicMuted && (this._slow < this.muteThreshold)) {
      this._isMicMuted = true;
      this._eventTarget.dispatchEvent(new Event('mute'));
      console.info(
        'mute - instant: %s - slow: %s - track muted: %s',
        this._instant, this._slow, this._tracks[0].muted,
      );

      if (this._state === 'recording') {
        this.stop();
        console.info('stopped recording on _setIsMicMuted');
      }
    }
  }

  _setIsMicQuiet() {
    const now = this._audioContext.currentTime;

    const isMicQuiet = (this._maxVolume < this.volumeThreshold ||
      this._slow < this.quietThreshold);

    // start record the time when the line goes quiet
    // fire event
    if (!this._isMicQuiet && isMicQuiet) {
      this._quietStartTime = this._audioContext.currentTime;
      this._eventTarget.dispatchEvent(new Event('quiet'));
    }
    // reset quiet timer when there's enough sound
    if (this._isMicQuiet && !isMicQuiet) {
      this._quietStartTime = 0;
      this._eventTarget.dispatchEvent(new Event('unquiet'));
    }
    this._isMicQuiet = isMicQuiet;

    // if autoincrease is enabled, exponentially increase the mimimun recording
    // time based on consecutive silent recordings
    const recordingTimeMin =
      (this.recordingTimeMinAutoIncrease) ?
        (this.recordingTimeMin - 1) +
        (this.recordingTimeMax **
         (1 - (1 / (this._silentRecordingConsecutiveCount + 1)))) :
        this.recordingTimeMin;

    // detect voice pause and stop recording
    if (this.autoStopRecording &&
      this._isMicQuiet && this._state === 'recording' &&
      // have I been recording longer than the minimum recording time?
      now - this._recordingStartTime > recordingTimeMin &&
      // has the slow sample value been below the quiet threshold longer than
      // the minimum allowed quiet time?
      now - this._quietStartTime > this.quietTimeMin
    ) {
      this.stop();
    }
  }

  /**
   * Initializes the AudioContext
   * Aassigs it to this._audioContext. Adds visibitily change event listener
   * to suspend the audio context when the browser tab is hidden.
   * @return {Promise} resolution of AudioContext
   */
  _initAudioContext() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!window.AudioContext) {
      return Promise.reject(new Error('Web Audio API not supported.'));
    }
    this._audioContext = new AudioContext();
    document.addEventListener('visibilitychange', () => {
      console.info('visibility change triggered in recorder. hidden:', document.hidden);
      if (document.hidden) {
        this._audioContext.suspend();
      } else {
        this._audioContext.resume().then(() => {
          console.info('Playback resumed successfully from visibility change');
        });
      }
    });
    return Promise.resolve();
  }

  /**
   * Private initializer of the audio buffer processor
   * It manages the volume variables and sends the buffers to the worker
   * when recording.
   * Some of this came from:
   * https://webrtc.github.io/samples/src/content/getusermedia/volume/js/soundmeter.js
   */
  _initMicVolumeProcessor() {
    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
    // assumes a single channel - XXX does it need to handle 2 channels?
    const processor = this._audioContext.createScriptProcessor(
      this.bufferLength,
      this.numChannels,
      this.numChannels,
    );
    processor.onaudioprocess = (evt) => {
      if (this._state === 'recording') {
        // send buffers to worker
        this._recordBuffers(evt.inputBuffer);

        // stop recording if over the maximum time
        if ((this._audioContext.currentTime - this._recordingStartTime)
          > this.recordingTimeMax
        ) {
          console.warn('stopped recording due to maximum time');
          this.stop();
        }
      }

      // XXX assumes mono channel
      const input = evt.inputBuffer.getChannelData(0);
      let sum = 0.0;
      let clipCount = 0;
      for (let i = 0; i < input.length; ++i) {
        // square to calculate signal power
        sum += input[i] * input[i];
        if (Math.abs(input[i]) > 0.99) {
          clipCount += 1;
        }
      }
      this._instant = Math.sqrt(sum / input.length);
      this._slow = (0.95 * this._slow) + (0.05 * this._instant);
      this._clip = (input.length) ? clipCount / input.length : 0;

      this._setIsMicMuted();
      this._setIsMicQuiet();

      this._analyser.getFloatFrequencyData(this._analyserData);
      this._maxVolume = Math.max(...this._analyserData);
    };

    this._micVolumeProcessor = processor;
    return Promise.resolve();
  }

  /*
   * Private initializers
   */

  /**
   * Sets microphone using getUserMedia
   * @return {Promise} returns a promise that resolves when the audio input
   *   has been connected
   */
  _initStream() {
    // TODO obtain with navigator.mediaDevices.getSupportedConstraints()
    const constraints = {
      audio: {
        optional: [{
          echoCancellation: this.requestEchoCancellation,
        }],
      },
    };

    return navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        this._stream = stream;

        this._tracks = stream.getAudioTracks();
        console.info('using media stream track labeled: ', this._tracks[0].label);
        // assumes single channel
        this._tracks[0].onmute = this._setIsMicMuted;
        this._tracks[0].onunmute = this._setIsMicMuted;

        const source = this._audioContext.createMediaStreamSource(stream);
        const gainNode = this._audioContext.createGain();
        const analyser = this._audioContext.createAnalyser();

        if (this.useBandPass) {
          // bandpass filter around human voice
          // https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode
          const biquadFilter = this._audioContext.createBiquadFilter();
          biquadFilter.type = 'bandpass';

          biquadFilter.frequency.value = this.bandPassFrequency;
          biquadFilter.gain.Q = this.bandPassQ;

          source.connect(biquadFilter);
          biquadFilter.connect(gainNode);
          analyser.smoothingTimeConstant = 0.5;
        } else {
          source.connect(gainNode);
          analyser.smoothingTimeConstant = 0.9;
        }
        analyser.fftSize = this.bufferLength;
        analyser.minDecibels = -90;
        analyser.maxDecibels = -30;

        gainNode.connect(analyser);
        analyser.connect(this._micVolumeProcessor);
        this._analyserData = new Float32Array(analyser.frequencyBinCount);
        this._analyser = analyser;

        this._micVolumeProcessor.connect(this._audioContext.destination);

        this._eventTarget.dispatchEvent(new Event('streamReady'));
      });
  }

  /*
   * getters used to expose internal vars while avoiding issues when using with
   * a reactive store (e.g. vuex).
   */

  /**
   * Getter of recorder state. Based on MediaRecorder API.
   * @return {string} state of recorder (inactive | recording | paused)
   */
  get state() {
    return this._state;
  }

  /**
   * Getter of stream object. Based on MediaRecorder API.
   * @return {MediaStream} media stream object obtain from getUserMedia
   */
  get stream() {
    return this._stream;
  }

  get isMicQuiet() {
    return this._isMicQuiet;
  }

  get isMicMuted() {
    return this._isMicMuted;
  }

  get isSilentRecording() {
    return this._isSilentRecording;
  }

  get isRecording() {
    return (this._state === 'recording');
  }

  /**
  * Getter of mic volume levels.
  * instant: root mean square of levels in buffer
  * slow: time decaying level
  * clip: count of samples at the top of signals (high noise)
  */
  get volume() {
    return ({
      instant: this._instant,
      slow: this._slow,
      clip: this._clip,
      max: this._maxVolume,
    });
  }

  /*
   * Private initializer of event target
   * Set event handlers that mimic MediaRecorder events plus others
   */

  // TODO make setters replace the listener insted of adding
  set onstart(cb) {
    this._eventTarget.addEventListener('start', cb);
  }
  set onstop(cb) {
    this._eventTarget.addEventListener('stop', cb);
  }
  set ondataavailable(cb) {
    this._eventTarget.addEventListener('dataavailable', cb);
  }
  set onerror(cb) {
    this._eventTarget.addEventListener('error', cb);
  }
  set onstreamready(cb) {
    this._eventTarget.addEventListener('streamready', cb);
  }
  set onmute(cb) {
    this._eventTarget.addEventListener('mute', cb);
  }
  set onunmute(cb) {
    this._eventTarget.addEventListener('unmute', cb);
  }
  set onsilentrecording(cb) {
    this._eventTarget.addEventListener('silentrecording', cb);
  }
  set onunsilentrecording(cb) {
    this._eventTarget.addEventListener('unsilentrecording', cb);
  }
  set onquiet(cb) {
    this._eventTarget.addEventListener('quiet', cb);
  }
  set onunquiet(cb) {
    this._eventTarget.addEventListener('unquiet', cb);
  }
}
