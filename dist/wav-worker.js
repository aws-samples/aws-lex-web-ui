/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// based on https://github.com/mattdiamond/Recorderjs/blob/master/src/recorder.js
// with a few optimizations including downsampling and trimming quiet samples

/* global Blob self */
/* eslint no-restricted-globals: off */
/* eslint prefer-arrow-callback: ["error", { "allowNamedFunctions": true }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-plusplus: off */
/* eslint comma-dangle: ["error", {"functions": "never", "objects": "always-multiline"}] */
/* eslint-disable prefer-destructuring */
const bitDepth = 16;
const bytesPerSample = bitDepth / 8;
const outSampleRate = 16000;
const outNumChannels = 1;

let recLength = 0;
let recBuffers = [];

const options = {
  sampleRate: 44000,
  numChannels: 1,
  useDownsample: true,
  // controls if the encoder will trim silent samples at begining and end of buffer
  useTrim: true,
  // trim samples below this value at the beginnig and end of the buffer
  // lower the value trim less silence (larger file size)
  // reasonable values seem to be between 0.005 and 0.0005
  quietTrimThreshold: 0.0008,
  // how many samples to add back to the buffer before/after the quiet threshold
  // higher values result in less silence trimming (larger file size)
  // reasonable values seem to be between 3500 and 5000
  quietTrimSlackBack: 4000,
};

self.onmessage = (evt) => {
  switch (evt.data.command) {
    case 'init':
      init(evt.data.config);
      break;
    case 'record':
      record(evt.data.buffer);
      break;
    case 'exportWav':
      exportWAV(evt.data.type);
      break;
    case 'getBuffer':
      getBuffer();
      break;
    case 'clear':
      clear();
      break;
    case 'close':
      self.close();
      break;
    default:
      break;
  }
};

function init(config) {
  Object.assign(options, config);
  initBuffers();
}

function record(inputBuffer) {
  for (let channel = 0; channel < options.numChannels; channel++) {
    recBuffers[channel].push(inputBuffer[channel]);
  }
  recLength += inputBuffer[0].length;
}

function exportWAV(type) {
  const buffers = [];
  for (let channel = 0; channel < options.numChannels; channel++) {
    buffers.push(mergeBuffers(recBuffers[channel], recLength));
  }
  let interleaved;
  if (options.numChannels === 2 && outNumChannels === 2) {
    interleaved = interleave(buffers[0], buffers[1]);
  } else {
    interleaved = buffers[0];
  }
  const downsampledBuffer = downsampleTrimBuffer(interleaved, outSampleRate);
  const dataview = encodeWAV(downsampledBuffer);
  const audioBlob = new Blob([dataview], { type });

  self.postMessage({
    command: 'exportWAV',
    data: audioBlob,
  });
}

function getBuffer() {
  const buffers = [];
  for (let channel = 0; channel < options.numChannels; channel++) {
    buffers.push(mergeBuffers(recBuffers[channel], recLength));
  }
  self.postMessage({ command: 'getBuffer', data: buffers });
}

function clear() {
  recLength = 0;
  recBuffers = [];
  initBuffers();
}

function initBuffers() {
  for (let channel = 0; channel < options.numChannels; channel++) {
    recBuffers[channel] = [];
  }
}

function mergeBuffers(recBuffer, length) {
  const result = new Float32Array(length);
  let offset = 0;
  for (let i = 0; i < recBuffer.length; i++) {
    result.set(recBuffer[i], offset);
    offset += recBuffer[i].length;
  }
  return result;
}

function interleave(inputL, inputR) {
  const length = inputL.length + inputR.length;
  const result = new Float32Array(length);

  let index = 0;
  let inputIndex = 0;

  while (index < length) {
    result[index++] = inputL[inputIndex];
    result[index++] = inputR[inputIndex];
    inputIndex++;
  }
  return result;
}

function floatTo16BitPCM(output, offset, input) {
  for (let i = 0, o = offset; i < input.length; i++, o += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(o, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
}

// Lex doesn't require proper wav header
// still inserting wav header for playing on client side
function addHeader(view, length) {
  // RIFF identifier 'RIFF'
  view.setUint32(0, 1380533830, false);
  // file length minus RIFF identifier length and file description length
  view.setUint32(4, 36 + length, true);
  // RIFF type 'WAVE'
  view.setUint32(8, 1463899717, false);
  // format chunk identifier 'fmt '
  view.setUint32(12, 1718449184, false);
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (raw)
  view.setUint16(20, 1, true);
  // channel count
  view.setUint16(22, outNumChannels, true);
  // sample rate
  view.setUint32(24, outSampleRate, true);
  // byte rate (sample rate * block align)
  view.setUint32(28, outSampleRate * bytesPerSample * outNumChannels, true);
  // block align (channel count * bytes per sample)
  view.setUint16(32, bytesPerSample * outNumChannels, true);
  // bits per sample
  view.setUint16(34, bitDepth, true);
  // data chunk identifier 'data'
  view.setUint32(36, 1684108385, false);
}

function encodeWAV(samples) {
  const buffer = new ArrayBuffer(44 + (samples.length * 2));
  const view = new DataView(buffer);

  addHeader(view, samples.length);
  floatTo16BitPCM(view, 44, samples);

  return view;
}

function downsampleTrimBuffer(buffer, rate) {
  if (rate === options.sampleRate) {
    return buffer;
  }

  const length = buffer.length;
  const sampleRateRatio = options.sampleRate / rate;
  const newLength = Math.round(length / sampleRateRatio);

  const result = new Float32Array(newLength);
  let offsetResult = 0;
  let offsetBuffer = 0;
  let firstNonQuiet = 0;
  let lastNonQuiet = length;
  while (offsetResult < result.length) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
    let accum = 0;
    let count = 0;
    for (let i = offsetBuffer; (i < nextOffsetBuffer) && (i < length); i++) {
      accum += buffer[i];
      count++;
    }
    // mark first and last sample over the quiet threshold
    if (accum > options.quietTrimThreshold) {
      if (firstNonQuiet === 0) {
        firstNonQuiet = offsetResult;
      }
      lastNonQuiet = offsetResult;
    }
    result[offsetResult] = accum / count;
    offsetResult++;
    offsetBuffer = nextOffsetBuffer;
  }

  /*
  console.info('encoder trim size reduction',
    (Math.min(newLength, lastNonQuiet + options.quietTrimSlackBack) -
    Math.max(0, firstNonQuiet - options.quietTrimSlackBack)) / result.length
  );
  */
  return (options.useTrim) ?
    // slice based on quiet threshold and put slack back into the buffer
    result.slice(
      Math.max(0, firstNonQuiet - options.quietTrimSlackBack),
      Math.min(newLength, lastNonQuiet + options.quietTrimSlackBack)
    ) :
    result;
}


/***/ })
/******/ ]);
//# sourceMappingURL=wav-worker.js.map