//#region src/lib/lex/wav-worker.js
const bitDepth = 16;
const bytesPerSample = bitDepth / 8;
const outSampleRate = 16e3;
const outNumChannels = 1;
let recLength = 0;
let recBuffers = [];
const options = {
	sampleRate: 44e3,
	numChannels: 1,
	useDownsample: true,
	useTrim: true,
	quietTrimThreshold: 8e-4,
	quietTrimSlackBack: 4e3
};
self.onmessage = (evt) => {
	switch (evt.data.command) {
		case "init":
			init(evt.data.config);
			break;
		case "record":
			record(evt.data.buffer);
			break;
		case "exportWav":
			exportWAV(evt.data.type);
			break;
		case "getBuffer":
			getBuffer();
			break;
		case "clear":
			clear();
			break;
		case "close":
			self.close();
			break;
		default: break;
	}
};
function init(config) {
	Object.assign(options, config);
	initBuffers();
}
function record(inputBuffer) {
	for (let channel = 0; channel < options.numChannels; channel++) recBuffers[channel].push(inputBuffer[channel]);
	recLength += inputBuffer[0].length;
}
function exportWAV(type) {
	const buffers = [];
	for (let channel = 0; channel < options.numChannels; channel++) buffers.push(mergeBuffers(recBuffers[channel], recLength));
	let interleaved;
	if (options.numChannels === 2 && false);
	else interleaved = buffers[0];
	const dataview = encodeWAV(downsampleTrimBuffer(interleaved, outSampleRate));
	const audioBlob = new Blob([dataview], { type });
	self.postMessage({
		command: "exportWAV",
		data: audioBlob
	});
}
function getBuffer() {
	const buffers = [];
	for (let channel = 0; channel < options.numChannels; channel++) buffers.push(mergeBuffers(recBuffers[channel], recLength));
	self.postMessage({
		command: "getBuffer",
		data: buffers
	});
}
function clear() {
	recLength = 0;
	recBuffers = [];
	initBuffers();
}
function initBuffers() {
	for (let channel = 0; channel < options.numChannels; channel++) recBuffers[channel] = [];
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
function floatTo16BitPCM(output, offset, input) {
	for (let i = 0, o = offset; i < input.length; i++, o += 2) {
		const s = Math.max(-1, Math.min(1, input[i]));
		output.setInt16(o, s < 0 ? s * 32768 : s * 32767, true);
	}
}
function addHeader(view, length) {
	view.setUint32(0, 1380533830, false);
	view.setUint32(4, 36 + length, true);
	view.setUint32(8, 1463899717, false);
	view.setUint32(12, 1718449184, false);
	view.setUint32(16, 16, true);
	view.setUint16(20, 1, true);
	view.setUint16(22, outNumChannels, true);
	view.setUint32(24, outSampleRate, true);
	view.setUint32(28, outSampleRate * bytesPerSample * outNumChannels, true);
	view.setUint16(32, bytesPerSample * outNumChannels, true);
	view.setUint16(34, bitDepth, true);
	view.setUint32(36, 1684108385, false);
}
function encodeWAV(samples) {
	const buffer = /* @__PURE__ */ new ArrayBuffer(44 + samples.length * 2);
	const view = new DataView(buffer);
	addHeader(view, samples.length);
	floatTo16BitPCM(view, 44, samples);
	return view;
}
function downsampleTrimBuffer(buffer, rate) {
	if (rate === options.sampleRate) return buffer;
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
		for (let i = offsetBuffer; i < nextOffsetBuffer && i < length; i++) {
			accum += buffer[i];
			count++;
		}
		if (accum > options.quietTrimThreshold) {
			if (firstNonQuiet === 0) firstNonQuiet = offsetResult;
			lastNonQuiet = offsetResult;
		}
		result[offsetResult] = accum / count;
		offsetResult++;
		offsetBuffer = nextOffsetBuffer;
	}
	return options.useTrim ? result.slice(Math.max(0, firstNonQuiet - options.quietTrimSlackBack), Math.min(newLength, lastNonQuiet + options.quietTrimSlackBack)) : result;
}
//#endregion

//# sourceMappingURL=wav-worker.js.map