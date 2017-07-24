(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"), require("vuex"), require("aws-sdk/global"), require("aws-sdk/clients/lexruntime"), require("aws-sdk/clients/polly"));
	else if(typeof define === 'function' && define.amd)
		define(["vue", "vuex", "aws-sdk/global", "aws-sdk/clients/lexruntime", "aws-sdk/clients/polly"], factory);
	else if(typeof exports === 'object')
		exports["LexWebUi"] = factory(require("vue"), require("vuex"), require("aws-sdk/global"), require("aws-sdk/clients/lexruntime"), require("aws-sdk/clients/polly"));
	else
		root["LexWebUi"] = factory(root["vue"], root["vuex"], root["aws-sdk/global"], root["aws-sdk/clients/lexruntime"], root["aws-sdk/clients/polly"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_84__, __WEBPACK_EXTERNAL_MODULE_85__, __WEBPACK_EXTERNAL_MODULE_86__, __WEBPACK_EXTERNAL_MODULE_87__, __WEBPACK_EXTERNAL_MODULE_88__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 60);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(35)('wks')
  , uid        = __webpack_require__(21)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(4)
  , IE8_DOM_DEFINE = __webpack_require__(45)
  , toPrimitive    = __webpack_require__(30)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(0)
  , ctx       = __webpack_require__(15)
  , hide      = __webpack_require__(8)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(3)
  , createDesc = __webpack_require__(17);
module.exports = __webpack_require__(5) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(47)
  , defined = __webpack_require__(31);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(46)
  , enumBugKeys = __webpack_require__(36);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(68), __esModule: true };

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(28);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(69)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(49)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(44);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(31);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(3).f
  , has = __webpack_require__(9)
  , TAG = __webpack_require__(1)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(73);
var global        = __webpack_require__(2)
  , hide          = __webpack_require__(8)
  , Iterators     = __webpack_require__(14)
  , TO_STRING_TAG = __webpack_require__(1)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = mergeConfig;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_slicedToArray__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_slicedToArray__);




/*
 Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/**
 * Application configuration management.
 * This file contains default config values and merges the environment
 * and URL configs.
 *
 * The environment dependent values are loaded from files
 * with the config.<ENV>.json naming syntax (where <ENV> is a NODE_ENV value
 * such as 'prod' or 'dev') located in the same directory as this file.
 *
 * The URL configuration is parsed from the `config` URL parameter as
 * a JSON object
 *
 * NOTE: To avoid having to manually merge future changes to this file, you
 * probably want to modify default values in the config.<ENV>.js files instead
 * of this one.
 */

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

// TODO turn this into a class

// Search for logo image files in ../assets/
// if not found, assigns the default flower logo.
var toolbarLogoRequire =
// Logo loading depends on the webpack require.context API:
// https://webpack.github.io/docs/context.html
__webpack_require__(133);
var toolbarLogoRequireKey = toolbarLogoRequire.keys().pop();

var toolbarLogo = toolbarLogoRequireKey ? toolbarLogoRequire(toolbarLogoRequireKey) : __webpack_require__(134);

// search for favicon in assets directory - use toolbar logo if not found
var favIconRequire = __webpack_require__(135);
var favIconRequireKey = favIconRequire.keys().pop();
var favIcon = favIconRequireKey ? favIconRequire(favIconRequireKey) : toolbarLogo;

// get env shortname to require file
var envShortName = ['dev', 'prod', 'test'].find(function (env) {
  return "production".startsWith(env);
});

if (!envShortName) {
  console.error('unknown environment in config: ', "production");
}

// eslint-disable-next-line import/no-dynamic-require
var configEnvFile = __webpack_require__(136)("./config." + envShortName + '.json');

// default config used to provide a base structure for
// environment and dynamic configs
var configDefault = {
  // AWS region
  region: 'us-east-1',

  cognito: {
    // Cognito pool id used to obtain credentials
    // e.g. poolId: 'us-east-1:deadbeef-cac0-babe-abcd-abcdef01234',
    poolId: ''
  },

  lex: {
    // Lex bot name
    botName: 'WebUiOrderFlowers',

    // Lex bot alias/version
    botAlias: '$LATEST',

    // instruction message shown in the UI
    initialText: 'You can ask me for help ordering flowers. ' + 'Just type "order flowers" or click on the mic and say it.',

    // instructions spoken when mic is clicked
    initialSpeechInstruction: 'Say "Order Flowers" to get started',

    // Lex initial sessionAttributes
    sessionAttributes: {},

    // controls if the session attributes are reinitialized a
    // after the bot dialog is done (i.e. fail or fulfilled)
    reInitSessionAttributesOnRestart: true,

    // allow to interrupt playback of lex responses by talking over playback
    // XXX experimental
    enablePlaybackInterrupt: false,

    // microphone volume level (in dB) to cause an interrupt in the bot
    // playback. Lower (negative) values makes interrupt more likely
    // may need to adjusted down if using low_latency preset or band pass filter
    playbackInterruptVolumeThreshold: -60,

    // microphone slow sample level to cause an interrupt in the bot
    // playback. Lower values makes interrupt more likely
    // may need to adjusted down if using low_latency preset or band pass filter
    playbackInterruptLevelThreshold: 0.0075,

    // microphone volume level (in dB) to cause enable interrupt of bot
    // playback. This is used to prevent interrupts when there's noise
    // For interrupt to be enabled, the volume level should be lower than this
    // value. Lower (negative) values makes interrupt more likely
    // may need to adjusted down if using low_latency preset or band pass filter
    playbackInterruptNoiseThreshold: -75,

    // only allow to interrupt playback longer than this value (in seconds)
    playbackInterruptMinDuration: 2
  },

  polly: {
    voiceId: 'Joanna'
  },

  ui: {
    // title of HTML page added dynamically to index.html
    pageTitle: 'Order Flowers Bot',

    // when running as an embedded iframe, this will be used as the
    // be the parent origin used to send/receive messages
    // NOTE: this is also a security control
    // this parameter should not be dynamically overriden
    // avoid making it '*'
    // if left as an empty string, it will be set to window.location.window
    // to allow runing embedded in a single origin setup
    parentOrigin: '',

    // chat window text placeholder
    textInputPlaceholder: 'Type here',

    toolbarColor: 'red',

    // chat window title
    toolbarTitle: 'Order Flowers',

    // logo used in toolbar - also used as favicon not specificied
    toolbarLogo: toolbarLogo,

    // fav icon
    favIcon: favIcon,

    // controls if the Lex initialText will be pushed into the message
    // list after the bot dialog is done (i.e. fail or fulfilled)
    pushInitialTextOnRestart: true,

    // controls if the Lex sessionAttributes should be re-initialized
    // to the config value (i.e. lex.sessionAttributes)
    // after the bot dialog is done (i.e. fail or fulfilled)
    reInitSessionAttributesOnRestart: false,

    // controls whether URLs in bot responses will be converted to links
    convertUrlToLinksInBotMessages: true,

    // controls whether tags (e.g. SSML or HTML) should be stripped out
    // of bot messages received from Lex
    stripTagsFromBotMessages: true
  },

  /* Configuration to enable voice and to pass options to the recorder
   * see ../lib/recorder.js for details about all the available options.
   * You can override any of the defaults in recorder.js by adding them
   * to the corresponding JSON config file (config.<ENV>.json)
   * or alternatively here
   */
  recorder: {
    // if set to true, voice interaction would be enabled on supported browsers
    // set to false if you don't want voice enabled
    enable: true,

    // maximum recording time in seconds
    recordingTimeMax: 10,

    // Minimum recording time in seconds.
    // Used before evaluating if the line is quiet to allow initial pauses
    // before speech
    recordingTimeMin: 2.5,

    // Sound sample threshold to determine if there's silence.
    // This is measured against a value of a sample over a period of time
    // If set too high, it may falsely detect quiet recordings
    // If set too low, it could take long pauses before detecting silence or
    // not detect it at all.
    // Reasonable values seem to be between 0.001 and 0.003
    quietThreshold: 0.002,

    // time before automatically stopping the recording when
    // there's silence. This is compared to a slow decaying
    // sample level so its's value is relative to sound over
    // a period of time. Reasonable times seem to be between 0.2 and 0.5
    quietTimeMin: 0.3,

    // volume threshold in db to determine if there's silence.
    // Volume levels lower than this would trigger a silent event
    // Works in conjuction with `quietThreshold`. Lower (negative) values
    // cause the silence detection to converge faster
    // Reasonable values seem to be between -75 and -55
    volumeThreshold: -65,

    // use automatic mute detection
    useAutoMuteDetect: false
  },

  converser: {
    // used to control maximum number of consecutive silent recordings
    // before the conversation is ended
    silentConsecutiveRecordingMax: 3
  },

  // URL query parameters are put in here at run time
  urlQueryParams: {}
};

/**
 * Obtains the URL query params and returns it as an object
 * This can be used before the router has been setup
 */
function getUrlQueryParams(url) {
  try {
    return url.split('?', 2) // split query string up to a max of 2 elems
    .slice(1, 2) // grab what's after the '?' char
    // split params separated by '&'
    .reduce(function (params, queryString) {
      return queryString.split('&');
    }, [])
    // further split into key value pairs separated by '='
    .map(function (params) {
      return params.split('=');
    })
    // turn into an object representing the URL query key/vals
    .reduce(function (queryObj, param) {
      var _param = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_slicedToArray___default()(param, 2),
          key = _param[0],
          _param$ = _param[1],
          value = _param$ === undefined ? true : _param$;

      var paramObj = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()({}, key, decodeURIComponent(value));
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, queryObj, paramObj);
    }, {});
  } catch (e) {
    console.error('error obtaining URL query parameters', e);
    return {};
  }
}

/**
 * Obtains and parses the config URL parameter
 */
function getConfigFromQuery(query) {
  try {
    return query.lexWebUiConfig ? JSON.parse(query.lexWebUiConfig) : {};
  } catch (e) {
    console.error('error parsing config from URL query', e);
    return {};
  }
}

/**
 * Merge two configuration objects
 * The merge process takes the base config as the source for keys to be merged
 * The values in srcConfig take precedence in the merge.
 * Merges down to the second level
 */
function mergeConfig(configBase, configSrc) {
  // iterate over the keys of the config base
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(configBase).map(function (key) {
    // only grab keys that already exist in the config base
    var value = key in configSrc ?
    // merge the second level key/values
    // overriding the base values with the ones from the source
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, configBase[key], configSrc[key]) : configBase[key];
    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()({}, key, value);
  })
  // merge the first level key values back into a single object
  .reduce(function (merged, configItem) {
    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, merged, configItem);
  }, {});
}

// merge build time parameters
var configFromFiles = mergeConfig(configDefault, configEnvFile);

// run time config from url query parameter
var queryParams = getUrlQueryParams(window.location.href);
var configFromQuery = getConfigFromQuery(queryParams);
// security: delete origin from dynamic parameter
if (configFromQuery.ui && configFromQuery.ui.parentOrigin) {
  delete configFromQuery.ui.parentOrigin;
}

var configFromMerge = mergeConfig(configFromFiles, configFromQuery);

// if parent origin is empty, assume to be running in the same origin
configFromMerge.ui.parentOrigin = configFromMerge.ui.parentOrigin || window.location.origin;

var config = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, configFromMerge, {
  urlQueryParams: queryParams
});

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(16);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(33)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(35)('keys')
  , uid    = __webpack_require__(21);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 37 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(18)
  , TAG = __webpack_require__(1)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(40)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(14);
module.exports = __webpack_require__(0).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(2)
  , core           = __webpack_require__(0)
  , LIBRARY        = __webpack_require__(24)
  , wksExt         = __webpack_require__(42)
  , defineProperty = __webpack_require__(3).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(5) && !__webpack_require__(11)(function(){
  return Object.defineProperty(__webpack_require__(29)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(9)
  , toIObject    = __webpack_require__(10)
  , arrayIndexOf = __webpack_require__(64)(false)
  , IE_PROTO     = __webpack_require__(34)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(18);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 48 */
/***/ (function(module, exports) {



/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(24)
  , $export        = __webpack_require__(7)
  , redefine       = __webpack_require__(50)
  , hide           = __webpack_require__(8)
  , has            = __webpack_require__(9)
  , Iterators      = __webpack_require__(14)
  , $iterCreate    = __webpack_require__(70)
  , setToStringTag = __webpack_require__(25)
  , getPrototypeOf = __webpack_require__(72)
  , ITERATOR       = __webpack_require__(1)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(4)
  , dPs         = __webpack_require__(71)
  , enumBugKeys = __webpack_require__(36)
  , IE_PROTO    = __webpack_require__(34)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(29)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(52).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(4);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(14)
  , ITERATOR   = __webpack_require__(1)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(15)
  , invoke             = __webpack_require__(80)
  , html               = __webpack_require__(52)
  , cel                = __webpack_require__(29)
  , global             = __webpack_require__(2)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(18)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(1)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(127);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(130);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(46)
  , hiddenKeys = __webpack_require__(36).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(39);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loader", function() { return Loader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_define_property__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuex__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_vuex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_aws_sdk_global__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_aws_sdk_global___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_aws_sdk_global__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_aws_sdk_clients_lexruntime__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_aws_sdk_clients_lexruntime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_aws_sdk_clients_lexruntime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_aws_sdk_clients_polly__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_aws_sdk_clients_polly___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_aws_sdk_clients_polly__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_LexWeb__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__store__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__config__ = __webpack_require__(27);




/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

/**
 * Entry point to the lex-web-ui Vue plugin
 * Exports Loader as the plugin constructor
 * and Store as store that can be used with Vuex.Store()
 */










/**
 * Vue Component
 */
var Component = {
  name: 'lex-web-ui',
  template: '<lex-web></lex-web>',
  components: { LexWeb: __WEBPACK_IMPORTED_MODULE_9__components_LexWeb__["a" /* default */] }
};

var loadingComponent = {
  template: '<p>Loading. Please wait...</p>'
};
var errorComponent = {
  template: '<p>An error ocurred...</p>'
};

/**
 * Vue Asynchonous Component
 */
var AsyncComponent = function AsyncComponent(_ref) {
  var _ref$component = _ref.component,
      component = _ref$component === undefined ? __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise___default.a.resolve(Component) : _ref$component,
      _ref$loading = _ref.loading,
      loading = _ref$loading === undefined ? loadingComponent : _ref$loading,
      _ref$error = _ref.error,
      error = _ref$error === undefined ? errorComponent : _ref$error,
      _ref$delay = _ref.delay,
      delay = _ref$delay === undefined ? 200 : _ref$delay,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === undefined ? 10000 : _ref$timeout;
  return {
    // must be a promise
    component: component,
    // A component to use while the async component is loading
    loading: loading,
    // A component to use if the load fails
    error: error,
    // Delay before showing the loading component. Default: 200ms.
    delay: delay,
    // The error component will be displayed if a timeout is
    // provided and exceeded. Default: 10000ms.
    timeout: timeout
  };
};

/**
 * Vue Plugin
 */
var Plugin = {
  install: function install(VueConstructor, _ref2) {
    var _ref2$name = _ref2.name,
        name = _ref2$name === undefined ? '$lexWebUi' : _ref2$name,
        _ref2$componentName = _ref2.componentName,
        componentName = _ref2$componentName === undefined ? 'lex-web-ui' : _ref2$componentName,
        awsConfig = _ref2.awsConfig,
        lexRuntimeClient = _ref2.lexRuntimeClient,
        pollyClient = _ref2.pollyClient,
        _ref2$component = _ref2.component,
        component = _ref2$component === undefined ? AsyncComponent : _ref2$component,
        _ref2$config = _ref2.config,
        config = _ref2$config === undefined ? __WEBPACK_IMPORTED_MODULE_11__config__["a" /* config */] : _ref2$config;

    // values to be added to custom vue property
    var value = {
      awsConfig: awsConfig,
      lexRuntimeClient: lexRuntimeClient,
      pollyClient: pollyClient,
      config: config
    };
    // add custom property to Vue
    // for example, access this in a component via this.$lexWebUi
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_define_property___default()(VueConstructor.prototype, name, { value: value });
    // register as a global component
    VueConstructor.component(componentName, component);
  }
};

var Store = __WEBPACK_IMPORTED_MODULE_10__store__["a" /* default */];

/**
 * Main Class
 */
var Loader = function Loader(config) {
  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Loader);

  // TODO deep merge configs
  this.config = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_11__config__["a" /* config */], config);

  // TODO move this to a function (possibly a reducer)
  var AWSConfigConstructor = window.AWS && window.AWS.Config ? window.AWS.Config : __WEBPACK_IMPORTED_MODULE_6_aws_sdk_global__["Config"];

  var CognitoConstructor = window.AWS && window.AWS.CognitoIdentityCredentials ? window.AWS.CognitoIdentityCredentials : __WEBPACK_IMPORTED_MODULE_6_aws_sdk_global__["CognitoIdentityCredentials"];

  var PollyConstructor = window.AWS && window.AWS.Polly ? window.AWS.Polly : __WEBPACK_IMPORTED_MODULE_8_aws_sdk_clients_polly___default.a;

  var LexRuntimeConstructor = window.AWS && window.AWS.LexRuntime ? window.AWS.LexRuntime : __WEBPACK_IMPORTED_MODULE_7_aws_sdk_clients_lexruntime___default.a;

  if (!AWSConfigConstructor || !CognitoConstructor || !PollyConstructor || !LexRuntimeConstructor) {
    throw new Error('unable to find AWS SDK');
  }

  var credentials = new CognitoConstructor({ IdentityPoolId: this.config.cognito.poolId }, { region: this.config.region });

  var awsConfig = new AWSConfigConstructor({
    region: this.config.region,
    credentials: credentials
  });

  var lexRuntimeClient = new LexRuntimeConstructor(awsConfig);
  var pollyClient = this.config.recorder.enable ? new PollyConstructor(awsConfig) : null;

  var VueConstructor = window.Vue ? window.Vue : __WEBPACK_IMPORTED_MODULE_4_vue___default.a;
  if (!VueConstructor) {
    throw new Error('unable to find Vue');
  }

  var VuexConstructor = window.Vuex ? window.Vuex : __WEBPACK_IMPORTED_MODULE_5_vuex___default.a;
  if (!VuexConstructor) {
    throw new Error('unable to find Vue');
  }

  this.store = new VuexConstructor.Store(__WEBPACK_IMPORTED_MODULE_10__store__["a" /* default */]);

  VueConstructor.use(Plugin, {
    awsConfig: awsConfig,
    lexRuntimeClient: lexRuntimeClient,
    pollyClient: pollyClient
  });
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62);
module.exports = __webpack_require__(0).Object.assign;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(7);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(63)});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(12)
  , gOPS     = __webpack_require__(37)
  , pIE      = __webpack_require__(22)
  , toObject = __webpack_require__(23)
  , IObject  = __webpack_require__(47)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(11)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(10)
  , toLength  = __webpack_require__(32)
  , toIndex   = __webpack_require__(65);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(33)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(67);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(7);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(5), 'Object', {defineProperty: __webpack_require__(3).f});

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48);
__webpack_require__(19);
__webpack_require__(26);
__webpack_require__(76);
module.exports = __webpack_require__(0).Promise;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(33)
  , defined   = __webpack_require__(31);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(51)
  , descriptor     = __webpack_require__(17)
  , setToStringTag = __webpack_require__(25)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(8)(IteratorPrototype, __webpack_require__(1)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(3)
  , anObject = __webpack_require__(4)
  , getKeys  = __webpack_require__(12);

module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(9)
  , toObject    = __webpack_require__(23)
  , IE_PROTO    = __webpack_require__(34)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(74)
  , step             = __webpack_require__(75)
  , Iterators        = __webpack_require__(14)
  , toIObject        = __webpack_require__(10);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(49)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(24)
  , global             = __webpack_require__(2)
  , ctx                = __webpack_require__(15)
  , classof            = __webpack_require__(40)
  , $export            = __webpack_require__(7)
  , isObject           = __webpack_require__(16)
  , aFunction          = __webpack_require__(28)
  , anInstance         = __webpack_require__(77)
  , forOf              = __webpack_require__(78)
  , speciesConstructor = __webpack_require__(79)
  , task               = __webpack_require__(55).set
  , microtask          = __webpack_require__(81)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(1)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(82)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(25)($Promise, PROMISE);
__webpack_require__(83)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(56)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(15)
  , call        = __webpack_require__(53)
  , isArrayIter = __webpack_require__(54)
  , anObject    = __webpack_require__(4)
  , toLength    = __webpack_require__(32)
  , getIterFn   = __webpack_require__(41)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(4)
  , aFunction = __webpack_require__(28)
  , SPECIES   = __webpack_require__(1)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 80 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , macrotask = __webpack_require__(55).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(18)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(8);
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(2)
  , core        = __webpack_require__(0)
  , dP          = __webpack_require__(3)
  , DESCRIPTORS = __webpack_require__(5)
  , SPECIES     = __webpack_require__(1)('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_84__;

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_85__;

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_86__;

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_87__;

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_88__;

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LexWeb_vue__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4973da9d_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_LexWeb_vue__ = __webpack_require__(119);
function injectStyle (ssrContext) {
  __webpack_require__(90)
}
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LexWeb_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4973da9d_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_LexWeb_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 90 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_ToolbarContainer__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_MessageList__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_StatusBar__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_InputContainer__ = __webpack_require__(115);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'lex-web',
  components: {
    ToolbarContainer: __WEBPACK_IMPORTED_MODULE_1__components_ToolbarContainer__["a" /* default */],
    MessageList: __WEBPACK_IMPORTED_MODULE_2__components_MessageList__["a" /* default */],
    StatusBar: __WEBPACK_IMPORTED_MODULE_3__components_StatusBar__["a" /* default */],
    InputContainer: __WEBPACK_IMPORTED_MODULE_4__components_InputContainer__["a" /* default */]
  },
  computed: {
    initialSpeechInstruction: function initialSpeechInstruction() {
      return this.$store.state.config.lex.initialSpeechInstruction;
    },
    initialText: function initialText() {
      return this.$store.state.config.lex.initialText;
    },
    textInputPlaceholder: function textInputPlaceholder() {
      return this.$store.state.config.ui.textInputPlaceholder;
    },
    toolbarColor: function toolbarColor() {
      return this.$store.state.config.ui.toolbarColor;
    },
    toolbarTitle: function toolbarTitle() {
      return this.$store.state.config.ui.toolbarTitle;
    },
    toolbarLogo: function toolbarLogo() {
      return this.$store.state.config.ui.toolbarLogo;
    },
    isUiMinimized: function isUiMinimized() {
      return this.$store.state.isUiMinimized;
    }
  },
  beforeMount: function beforeMount() {
    if (this.$store.state.config.urlQueryParams.lexWebUiEmbed !== 'true') {
      console.info('running in standalone mode');
      this.$store.commit('setIsRunningEmbedded', false);
      this.$store.commit('setAwsCredsProvider', 'cognito');
    } else {
      console.info('running in embedded mode from URL: ', location.href);
      console.info('referrer (possible parent) URL: ', document.referrer);
      console.info('config parentOrigin:', this.$store.state.config.ui.parentOrigin);
      if (!document.referrer.startsWith(this.$store.state.config.ui.parentOrigin)) {
        console.warn('referrer origin: [%s] does not match configured parent origin: [%s]', document.referrer, this.$store.state.config.ui.parentOrigin);
      }

      window.addEventListener('message', this.messageHandler, false);
      this.$store.commit('setIsRunningEmbedded', true);
      this.$store.commit('setAwsCredsProvider', 'parentWindow');
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$store.dispatch('getConfigFromParent').then(function (config) {
      return _this.$store.dispatch('initConfig', config);
    }).then(function () {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.all([_this.$store.dispatch('initCredentials', _this.$lexWebUi.awsConfig.credentials), _this.$store.dispatch('initRecorder'), _this.$store.dispatch('initBotAudio', new Audio())]);
    }).then(function () {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.all([_this.$store.dispatch('initMessageList'), _this.$store.dispatch('initPollyClient', _this.$lexWebUi.pollyClient), _this.$store.dispatch('initLexClient', _this.$lexWebUi.lexRuntimeClient)]);
    }).then(function () {
      return _this.$store.state.isRunningEmbedded ? _this.$store.dispatch('sendMessageToParentWindow', { event: 'ready' }) : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve();
    }).then(function () {
      return console.info('sucessfully initialized lex web ui version: ', _this.$store.state.version);
    }).catch(function (error) {
      console.error('could not initialize application while mounting:', error);
    });
  },

  methods: {
    toggleMinimizeUi: function toggleMinimizeUi() {
      return this.$store.dispatch('toggleIsUiMinimized');
    },

    // messages from parent
    messageHandler: function messageHandler(evt) {
      // security check
      if (evt.origin !== this.$store.state.config.ui.parentOrigin) {
        console.warn('ignoring event - invalid origin:', evt.origin);
        return;
      }
      if (!evt.ports) {
        console.warn('postMessage not sent over MessageChannel', evt);
        return;
      }
      switch (evt.data.event) {
        case 'ping':
          console.info('pong - ping received from parent');
          evt.ports[0].postMessage({
            event: 'resolve',
            type: evt.data.event
          });
          break;
        // received when the parent page has loaded the iframe
        case 'parentReady':
          evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });
          break;
        case 'toggleMinimizeUi':
          this.$store.dispatch('toggleIsUiMinimized').then(function () {
            evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });
          });
          break;
        case 'postText':
          if (!evt.data.message) {
            evt.ports[0].postMessage({
              event: 'reject',
              type: evt.data.event,
              error: 'missing message field'
            });
            return;
          }

          this.$store.dispatch('postTextMessage', { type: 'human', text: evt.data.message }).then(function () {
            evt.ports[0].postMessage({ event: 'resolve', type: evt.data.event });
          });
          break;
        default:
          console.warn('unknown message in messageHanlder', evt);
          break;
      }
    }
  }
});

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ToolbarContainer_vue__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_59f58ea4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_ToolbarContainer_vue__ = __webpack_require__(94);
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ToolbarContainer_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_59f58ea4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_ToolbarContainer_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'toolbar-container',
  props: ['toolbarTitle', 'toolbarColor', 'toolbarLogo', 'isUiMinimized'],
  computed: {
    toolTipMinimize: function toolTipMinimize() {
      return {
        html: this.isUiMinimized ? 'maximize' : 'minimize'
      };
    }
  },
  methods: {
    toggleMinimize: function toggleMinimize() {
      this.$emit('toggleMinimizeUi');
    }
  }
});

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-toolbar', {
    class: _vm.toolbarColor,
    attrs: {
      "dark": "",
      "dense": ""
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.toolbarLogo
    }
  }), _vm._v(" "), _c('v-toolbar-title', {
    staticClass: "hidden-xs-and-down"
  }, [_vm._v("\n    " + _vm._s(_vm.toolbarTitle) + "\n  ")]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), (_vm.$store.state.isRunningEmbedded) ? _c('v-btn', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip:left",
      value: (_vm.toolTipMinimize),
      expression: "toolTipMinimize",
      arg: "left"
    }],
    attrs: {
      "icon": "",
      "light": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.toggleMinimize($event)
      }
    }
  }, [_c('v-icon', [_vm._v("\n      " + _vm._s(_vm.isUiMinimized ? 'arrow_drop_up' : 'arrow_drop_down') + "\n    ")])], 1) : _vm._e()], 1)
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MessageList_vue__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_20b8f18d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_MessageList_vue__ = __webpack_require__(110);
function injectStyle (ssrContext) {
  __webpack_require__(96)
}
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-20b8f18d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MessageList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_20b8f18d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_MessageList_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 96 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Message__ = __webpack_require__(98);
//
//
//
//
//
//
//
//
//
//
//

/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'message-list',
  components: {
    Message: __WEBPACK_IMPORTED_MODULE_0__Message__["a" /* default */]
  },
  computed: {
    messages: function messages() {
      return this.$store.state.messages;
    }
  },
  watch: {
    // autoscroll message list to the bottom when messages change
    messages: function messages() {
      var _this = this;

      this.$nextTick(function () {
        _this.$el.scrollTop = _this.$el.scrollHeight;
      });
    }
  }
});

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Message_vue__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_290c8f4f_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_Message_vue__ = __webpack_require__(109);
function injectStyle (ssrContext) {
  __webpack_require__(99)
}
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-290c8f4f"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Message_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_290c8f4f_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_Message_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 99 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MessageText__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ResponseCard__ = __webpack_require__(105);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'message',
  props: ['message'],
  components: {
    MessageText: __WEBPACK_IMPORTED_MODULE_0__MessageText__["a" /* default */],
    ResponseCard: __WEBPACK_IMPORTED_MODULE_1__ResponseCard__["a" /* default */]
  },
  computed: {
    botDialogState: function botDialogState() {
      if (!('dialogState' in this.message)) {
        return null;
      }
      switch (this.message.dialogState) {
        case 'Failed':
          return { icon: 'error', color: 'red' };
        case 'Fulfilled':
        case 'ReadyForFulfillment':
          return { icon: 'done', color: 'green' };
        default:
          return null;
      }
    },
    shouldDisplayResponseCard: function shouldDisplayResponseCard() {
      return this.message.responseCard && (this.message.responseCard.version === '1' || this.message.responseCard.version === 1) && this.message.responseCard.contentType === 'application/vnd.amazonaws.card.generic' && 'genericAttachments' in this.message.responseCard && this.message.responseCard.genericAttachments instanceof Array;
    }
  },
  methods: {
    playAudio: function playAudio() {
      // XXX doesn't play in Firefox or Edge
      /* XXX also tried:
      const audio = new Audio(this.message.audio);
      audio.play();
      */
      var audioElem = this.$el.querySelector('audio');
      if (audioElem) {
        audioElem.play();
      }
    }
  }
});

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MessageText_vue__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d69cb2c8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_MessageText_vue__ = __webpack_require__(104);
function injectStyle (ssrContext) {
  __webpack_require__(102)
}
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d69cb2c8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MessageText_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d69cb2c8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_MessageText_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 102 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'message-text',
  props: ['message'],
  computed: {
    shouldConvertUrlToLinks: function shouldConvertUrlToLinks() {
      return this.$store.state.config.ui.convertUrlToLinksInBotMessages;
    },
    shouldStripTags: function shouldStripTags() {
      return this.$store.state.config.ui.stripTagsFromBotMessages;
    },
    shouldRenderAsHtml: function shouldRenderAsHtml() {
      return this.message.type === 'bot' && this.shouldConvertUrlToLinks;
    },
    botMessageAsHtml: function botMessageAsHtml() {
      // Security Note: Make sure that the content is escaped according
      // to context (e.g. URL, HTML). This is rendered as HTML
      var messageText = this.stripTagsFromMessage(this.message.text);
      var messageWithLinks = this.botMessageWithLinks(messageText);
      return messageWithLinks;
    }
  },
  methods: {
    encodeAsHtml: function encodeAsHtml(value) {
      return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },
    botMessageWithLinks: function botMessageWithLinks(messageText) {
      var _this = this;

      var linkReplacers = [
      // The regex in the objects of linkReplacers should return a single
      // reference (from parenthesis) with the whole address
      // The replace function takes a matched url and returns the
      // hyperlink that will be replaced in the message
      {
        type: 'web',
        regex: new RegExp('\\b((?:https?://\\w{1}|www\\.)(?:[\\w-.]){2,256}' + '(?:[\\w._~:/?#@!$&()*+,;=[\'\\]-]){0,256})', 'im'),
        replace: function replace(item) {
          var url = !/^https?:\/\//.test(item) ? 'http://' + item : item;
          return '<a target="_blank" ' + ('href="' + encodeURI(url) + '">' + _this.encodeAsHtml(item) + '</a>');
        }
      }];
      // TODO avoid double HTML encoding when there's more than 1 linkReplacer
      return linkReplacers.reduce(function (message, replacer) {
        return (
          // splits the message into an array containing content chunks and links.
          // Content chunks will be the even indexed items in the array
          // (or empty string when applicable).
          // Links (if any) will be the odd members of the array since the
          // regex keeps references.
          message.split(replacer.regex).reduce(function (messageAccum, item, index, array) {
            var messageResult = '';
            if (index % 2 === 0) {
              var urlItem = index + 1 === array.length ? '' : replacer.replace(array[index + 1]);
              messageResult = '' + _this.encodeAsHtml(item) + urlItem;
            }
            return messageAccum + messageResult;
          }, '')
        );
      }, messageText);
    },

    // used for stripping SSML (and other) tags from bot responses
    stripTagsFromMessage: function stripTagsFromMessage(messageText) {
      var doc = document.implementation.createHTMLDocument('').body;
      doc.innerHTML = messageText;
      return doc.textContent || doc.innerText || '';
    }
  }
});

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.message.text && _vm.message.type === 'human') ? _c('div', {
    staticClass: "message-text"
  }, [_vm._v("\n  " + _vm._s(_vm.message.text) + "\n")]) : (_vm.message.text && _vm.shouldRenderAsHtml) ? _c('div', {
    staticClass: "message-text",
    domProps: {
      "innerHTML": _vm._s(_vm.botMessageAsHtml)
    }
  }) : (_vm.message.text && _vm.message.type === 'bot') ? _c('div', {
    staticClass: "message-text"
  }, [_vm._v("\n  " + _vm._s((_vm.shouldStripTags) ? _vm.stripTagsFromMessage(_vm.message.text) : _vm.message.text) + "\n")]) : _vm._e()
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ResponseCard_vue__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_799b9a4e_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_ResponseCard_vue__ = __webpack_require__(108);
function injectStyle (ssrContext) {
  __webpack_require__(106)
}
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-799b9a4e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ResponseCard_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_799b9a4e_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_ResponseCard_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 106 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'response-card',
  props: ['response-card'],
  data: function data() {
    return {
      hasButtonBeenClicked: false
    };
  },

  computed: {},
  methods: {
    onButtonClick: function onButtonClick(value) {
      this.hasButtonBeenClicked = true;
      var message = {
        type: 'human',
        text: value
      };

      this.$store.dispatch('postTextMessage', message);
    }
  }
});

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-card', [(_vm.responseCard.title.trim()) ? _c('v-card-title', {
    staticClass: "red lighten-5",
    attrs: {
      "primary-title": ""
    }
  }, [_c('span', {
    staticClass: "headline"
  }, [_vm._v(_vm._s(_vm.responseCard.title))])]) : _vm._e(), _vm._v(" "), (_vm.responseCard.subTitle) ? _c('v-card-text', [_c('span', [_vm._v(_vm._s(_vm.responseCard.subTitle))])]) : _vm._e(), _vm._v(" "), (_vm.responseCard.imageUrl) ? _c('v-card-media', {
    attrs: {
      "src": _vm.responseCard.imageUrl,
      "contain": "",
      "height": "33vh"
    }
  }) : _vm._e(), _vm._v(" "), _vm._l((_vm.responseCard.buttons), function(button, index) {
    return _c('v-card-actions', {
      key: index,
      staticClass: "button-row",
      attrs: {
        "actions": ""
      }
    }, [(button.text && button.value) ? _c('v-btn', {
      attrs: {
        "disabled": _vm.hasButtonBeenClicked,
        "default": ""
      },
      nativeOn: {
        "~click": function($event) {
          _vm.onButtonClick(button.value)
        }
      }
    }, [_vm._v("\n      " + _vm._s(button.text) + "\n    ")]) : _vm._e()], 1)
  }), _vm._v(" "), (_vm.responseCard.attachmentLinkUrl) ? _c('v-card-actions', [_c('v-btn', {
    staticClass: "red lighten-5",
    attrs: {
      "flat": "",
      "tag": "a",
      "href": _vm.responseCard.attachmentLinkUrl,
      "target": "_blank"
    }
  }, [_vm._v("\n      Open Link\n    ")])], 1) : _vm._e()], 2)
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "message"
  }, [_c('v-chip', [('text' in _vm.message && _vm.message.text !== null && _vm.message.text.length) ? _c('message-text', {
    attrs: {
      "message": _vm.message
    }
  }) : _vm._e(), _vm._v(" "), (_vm.message.type === 'human' && _vm.message.audio) ? _c('div', [_c('audio', [_c('source', {
    attrs: {
      "src": _vm.message.audio,
      "type": "audio/wav"
    }
  })]), _vm._v(" "), _c('v-btn', {
    staticClass: "black--text",
    attrs: {
      "left": "",
      "icon": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.playAudio($event)
      }
    }
  }, [_c('v-icon', {
    staticClass: "play-button"
  }, [_vm._v("play_circle_outline")])], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.message.type === 'bot' && _vm.botDialogState) ? _c('v-icon', {
    class: _vm.botDialogState.color + '--text',
    attrs: {
      "medium": ""
    }
  }, [_vm._v("\n      " + _vm._s(_vm.botDialogState.icon) + "\n    ")]) : _vm._e()], 1), _vm._v(" "), (_vm.shouldDisplayResponseCard) ? _c('div', {
    staticClass: "response-card"
  }, _vm._l((_vm.message.responseCard.genericAttachments), function(card, index) {
    return _c('response-card', {
      key: index,
      attrs: {
        "response-card": card
      }
    })
  })) : _vm._e()], 1)
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-layout', {
    staticClass: "message-list"
  }, _vm._l((_vm.messages), function(message) {
    return _c('message', {
      key: message.id,
      class: ("message-" + (message.type)),
      attrs: {
        "message": message
      }
    })
  }))
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_StatusBar_vue__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2df12d09_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_StatusBar_vue__ = __webpack_require__(114);
function injectStyle (ssrContext) {
  __webpack_require__(112)
}
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2df12d09"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_StatusBar_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2df12d09_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_StatusBar_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 112 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'status-bar',
  data: function data() {
    return {
      volume: 0,
      volumeIntervalId: null
    };
  },

  computed: {
    isSpeechConversationGoing: function isSpeechConversationGoing() {
      return this.isConversationGoing;
    },
    isProcessing: function isProcessing() {
      return this.isSpeechConversationGoing && !this.isRecording && !this.isBotSpeaking;
    },
    statusText: function statusText() {
      if (this.isInterrupting) {
        return 'Interrupting...';
      }
      if (this.canInterruptBotPlayback) {
        return 'Say "skip" and I\'ll listen for your answer...';
      }
      if (this.isMicMuted) {
        return 'Microphone seems to be muted...';
      }
      if (this.isRecording) {
        return 'Listening...';
      }
      if (this.isBotSpeaking) {
        return 'Playing audio...';
      }
      if (this.isSpeechConversationGoing) {
        return 'Processing...';
      }
      if (this.isRecorderSupported) {
        return 'Type or click on the mic';
      }
      return '';
    },
    canInterruptBotPlayback: function canInterruptBotPlayback() {
      return this.$store.state.botAudio.canInterrupt;
    },
    isBotSpeaking: function isBotSpeaking() {
      return this.$store.state.botAudio.isSpeaking;
    },
    isConversationGoing: function isConversationGoing() {
      return this.$store.state.recState.isConversationGoing;
    },
    isMicMuted: function isMicMuted() {
      return this.$store.state.recState.isMicMuted;
    },
    isRecorderSupported: function isRecorderSupported() {
      return this.$store.state.recState.isRecorderSupported;
    },
    isRecording: function isRecording() {
      return this.$store.state.recState.isRecording;
    }
  },
  methods: {
    enterMeter: function enterMeter() {
      var _this = this;

      var intervalTime = 50;
      var max = 0;
      this.volumeIntervalId = setInterval(function () {
        _this.$store.dispatch('getRecorderVolume').then(function (volume) {
          _this.volume = volume.instant.toFixed(4);
          max = Math.max(_this.volume, max);
        });
      }, intervalTime);
    },
    leaveMeter: function leaveMeter() {
      if (this.volumeIntervalId) {
        clearInterval(this.volumeIntervalId);
      }
    }
  }
});

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "status-bar white"
  }, [_c('v-divider'), _vm._v(" "), _c('div', {
    staticClass: "status-text"
  }, [_c('span', [_vm._v(_vm._s(_vm.statusText))])]), _vm._v(" "), _c('div', {
    staticClass: "voice-controls"
  }, [_c('transition', {
    attrs: {
      "css": false
    },
    on: {
      "enter": _vm.enterMeter,
      "leave": _vm.leaveMeter
    }
  }, [(_vm.isRecording) ? _c('div', {
    staticClass: "ml-2 volume-meter"
  }, [_c('meter', {
    attrs: {
      "value": _vm.volume,
      "min": "0.0001",
      "low": "0.005",
      "optimum": "0.04",
      "high": "0.07",
      "max": "0.09"
    }
  })]) : _vm._e()])], 1)], 1)
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_InputContainer_vue__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6dd14e82_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_InputContainer_vue__ = __webpack_require__(118);
function injectStyle (ssrContext) {
  __webpack_require__(116)
}
var normalizeComponent = __webpack_require__(6)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6dd14e82"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_InputContainer_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6dd14e82_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_InputContainer_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 116 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'input-container',
  data: function data() {
    return {
      textInput: ''
    };
  },

  computed: {
    micButtonIcon: function micButtonIcon() {
      if (this.isMicMuted) {
        return 'mic_off';
      }
      if (this.isBotSpeaking) {
        return 'stop';
      }
      return 'mic';
    },
    isMicButtonDisabled: function isMicButtonDisabled() {
      return this.isMicMuted;
    },
    isBotSpeaking: function isBotSpeaking() {
      return this.$store.state.botAudio.isSpeaking;
    },
    isConversationGoing: function isConversationGoing() {
      return this.$store.state.recState.isConversationGoing;
    },
    isMicMuted: function isMicMuted() {
      return this.$store.state.recState.isMicMuted;
    },
    isRecorderSupported: function isRecorderSupported() {
      return this.$store.state.recState.isRecorderSupported;
    }
  },
  props: ['textInputPlaceholder', 'initialSpeechInstruction', 'initialText'],
  methods: {
    postTextMessage: function postTextMessage() {
      var _this = this;

      // empty string
      if (!this.textInput.length) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve();
      }
      var message = {
        type: 'human',
        text: this.textInput
      };

      return this.$store.dispatch('postTextMessage', message).then(function () {
        _this.textInput = '';
      });
    },
    onMicClick: function onMicClick() {
      if (!this.isConversationGoing) {
        return this.startSpeechConversation();
      } else if (this.isBotSpeaking) {
        return this.$store.dispatch('interruptSpeechConversation');
      }

      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve();
    },
    startSpeechConversation: function startSpeechConversation() {
      var _this2 = this;

      if (this.isMicMuted) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve();
      }
      return this.setAutoPlay().then(function () {
        return _this2.playInitialInstruction();
      }).then(function () {
        return _this2.$store.dispatch('startConversation');
      }).catch(function (error) {
        console.error('error in startSpeechConversation', error);
        _this2.$store.dispatch('pushErrorMessage', 'I couldn\'t start the conversation. Please try again. (' + error + ')');
      });
    },
    playInitialInstruction: function playInitialInstruction() {
      var _this3 = this;

      var isInitialState = ['', 'Fulfilled', 'Failed'].some(function (initialState) {
        return _this3.$store.state.lex.dialogState === initialState;
      });

      return isInitialState ? this.$store.dispatch('pollySynthesizeSpeech', this.initialSpeechInstruction) : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve();
    },

    /**
     * Set auto-play attribute on audio element
     * On mobile, Audio nodes do not autoplay without user interaction.
     * To workaround that requirement, this plays a short silent audio mp3/ogg
     * as a reponse to a click. This silent audio is initialized as the src
     * of the audio node. Subsequent play on the same audio now
     * don't require interaction so this is only done once.
     */
    setAutoPlay: function setAutoPlay() {
      if (this.$store.state.botAudio.autoPlay) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve();
      }
      return this.$store.dispatch('setAudioAutoPlay');
    }
  }
});

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "input-container white"
  }, [_c('v-text-field', {
    staticClass: "black--text ml-2",
    attrs: {
      "id": "text-input",
      "name": "text-input",
      "label": _vm.textInputPlaceholder,
      "single-line": ""
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.stopPropagation();
        _vm.postTextMessage($event)
      }
    },
    model: {
      value: (_vm.textInput),
      callback: function($$v) {
        _vm.textInput = (typeof $$v === 'string' ? $$v.trim() : $$v)
      },
      expression: "textInput"
    }
  }), _vm._v(" "), (_vm.isRecorderSupported) ? _c('v-btn', {
    directives: [{
      name: "tooltip",
      rawName: "v-tooltip:left",
      value: ({
        html: 'click to use voice'
      }),
      expression: "{html: 'click to use voice'}",
      arg: "left"
    }],
    staticClass: "black--text mic-button",
    attrs: {
      "icon": "",
      "disabled": _vm.isMicButtonDisabled
    },
    nativeOn: {
      "click": function($event) {
        _vm.onMicClick($event)
      }
    }
  }, [_c('v-icon', {
    attrs: {
      "medium": ""
    }
  }, [_vm._v(_vm._s(_vm.micButtonIcon))])], 1) : _vm._e()], 1)
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "lex-web"
    }
  }, [_c('toolbar-container', {
    attrs: {
      "toolbar-title": _vm.toolbarTitle,
      "toolbar-color": _vm.toolbarColor,
      "toolbar-logo": _vm.toolbarLogo,
      "is-ui-minimized": _vm.isUiMinimized
    },
    on: {
      "toggleMinimizeUi": _vm.toggleMinimizeUi
    }
  }), _vm._v(" "), _c('message-list'), _vm._v(" "), _c('status-bar'), _vm._v(" "), _c('input-container', {
    attrs: {
      "text-input-placeholder": _vm.textInputPlaceholder,
      "initial-text": _vm.initialText,
      "initial-speech-instruction": _vm.initialSpeechInstruction
    }
  })], 1)
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_state__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_getters__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_mutations__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_actions__ = __webpack_require__(156);
/*
 Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/* global atob Blob URL */
/* eslint no-console: ["error", { allow: ["info", "warn", "error"] }] */
/* eslint no-param-reassign: off */






/* harmony default export */ __webpack_exports__["a"] = ({
  // prevent changes outside of mutation handlers
  strict: "production" === 'development',
  state: __WEBPACK_IMPORTED_MODULE_0__store_state__["a" /* default */],
  getters: __WEBPACK_IMPORTED_MODULE_1__store_getters__["a" /* default */],
  mutations: __WEBPACK_IMPORTED_MODULE_2__store_mutations__["a" /* default */],
  actions: __WEBPACK_IMPORTED_MODULE_3__store_actions__["a" /* default */]
});

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(27);
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

/**
 * Sets up the initial state of the store
 */


/* harmony default export */ __webpack_exports__["a"] = ({
  version:  true ? "0.7.1" : '0.0.0',
  lex: {
    acceptFormat: 'audio/ogg',
    dialogState: '',
    isInterrupting: false,
    isProcessing: false,
    inputTranscript: '',
    intentName: '',
    message: '',
    responseCard: null,
    sessionAttributes: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* config */].lex.sessionAttributes,
    slotToElicit: '',
    slots: {}
  },
  messages: [],
  polly: {
    outputFormat: 'ogg_vorbis',
    voiceId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* config */].polly.voiceId
  },
  botAudio: {
    canInterrupt: false,
    interruptIntervalId: null,
    autoPlay: false,
    isInterrupting: false,
    isSpeaking: false
  },
  recState: {
    isConversationGoing: false,
    isInterrupting: false,
    isMicMuted: false,
    isMicQuiet: true,
    isRecorderSupported: false,
    isRecorderEnabled: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* config */].recorder.enable,
    isRecording: false,
    silentRecordingCount: 0
  },

  isRunningEmbedded: false, // am I running in an iframe?
  isUiMinimized: false, // when running embedded, is the iframe minimized?
  config: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* config */],

  awsCreds: {
    provider: 'cognito' // cognito|parentWindow
  }
});

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(123), __esModule: true };

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(124);
module.exports = __webpack_require__(0).Object.keys;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(23)
  , $keys    = __webpack_require__(12);

__webpack_require__(125)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(7)
  , core    = __webpack_require__(0)
  , fails   = __webpack_require__(11);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(39);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(128), __esModule: true };

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(26);
__webpack_require__(19);
module.exports = __webpack_require__(129);

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(40)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(14);
module.exports = __webpack_require__(0).isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(131), __esModule: true };

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(26);
__webpack_require__(19);
module.exports = __webpack_require__(132);

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4)
  , get      = __webpack_require__(41);
module.exports = __webpack_require__(0).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 133 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 133;

/***/ }),
/* 134 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAB4ElEQVRIDeXBz0uTcQDH8c8xLe2SpDVb9AMV7RZCUIdEodAZQrH/oCC65II6FAhu4Oi4sfoPjI6BwU4J/QGKEUQ/NLcYM29pkI/0vJvbHp7vnm19Z0GXXi/pX2GIae5xTn+HWVz2uMT155jANK79o4MeiXlMzySOcVitIkwWF/hIDlOeVcAlS1h2HGIVm08clA23acUt2ZDB5JAmwjgpHEwp2fAQn8OIqriMg+++bDjBNp60DKTxbHFcdozxlYqIDExQscGIWsEVNqmYlIEIFZuMyY4w3/FkZCCDZ5uQbHiEz2FUVYyyi++BbHiKyeEJk0TIsIspJRvu0IqbsqGDNWw+0C47wmRxgXesY1rnPeDykl41xyViROlTGZ0clXiOaV6im06V0U+UGBcVRIyKHHOEVEYE01WV0UuSPBV3FUQU3w5J2lTCLC57fjKjEtp5jIPvuoLoo9YKp1TCEDGmGVQJZ3hLrbOqR55aRQZkYJANaq2pEeYIytGlKrr5QlBCjRBih6AFVZEl6Ac9aowk9aZUwg3qxdUMbawQtKwS3hC0xAE1x2mKBA1zgaACJ/V7DJCjVoIktT7TLzu6WMC0yGtMLziiVjHFMp4CRTxLXNN+MUyCRQp8Y4sCr4hzXv+jX+Z26XqyE0SfAAAAAElFTkSuQmCC"

/***/ }),
/* 135 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 135;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./config.dev.json": 137,
	"./config.prod.json": 138,
	"./config.test.json": 139
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 136;

/***/ }),
/* 137 */
/***/ (function(module, exports) {

module.exports = {
	"cognito": {
		"poolId": "us-east-1:6d391c4b-f646-47cc-8482-07238cfef4ea"
	},
	"lex": {
		"botName": "WebUiOrderFlowers",
		"initialText": "You can ask me for help ordering flowers. Just type \"order flowers\" or click on the mic and say it.",
		"initialSpeechInstruction": "Say 'Order Flowers' to get started."
	},
	"polly": {
		"voiceId": "Salli"
	},
	"ui": {
		"parentOrigin": "http://localhost:8080",
		"pageTitle": "Order Flowers Bot",
		"toolbarTitle": "Order Flowers"
	},
	"recorder": {
		"preset": "speech_recognition"
	}
};

/***/ }),
/* 138 */
/***/ (function(module, exports) {

module.exports = {
	"cognito": {
		"poolId": ""
	},
	"lex": {
		"botName": "WebUiOrderFlowers",
		"initialText": "You can ask me for help ordering flowers. Just type \"order flowers\" or click on the mic and say it.",
		"initialSpeechInstruction": "Say 'Order Flowers' to get started."
	},
	"polly": {
		"voiceId": "Salli"
	},
	"ui": {
		"parentOrigin": "",
		"pageTitle": "Order Flowers Bot",
		"toolbarTitle": "Order Flowers"
	},
	"recorder": {
		"preset": "speech_recognition"
	}
};

/***/ }),
/* 139 */
/***/ (function(module, exports) {

module.exports = {
	"cognito": {
		"poolId": ""
	},
	"lex": {
		"botName": "WebUiOrderFlowers",
		"initialText": "You can ask me for help ordering flowers. Just type \"order flowers\" or click on the mic and say it.",
		"initialSpeechInstruction": "Say 'Order Flowers' to get started."
	},
	"polly": {
		"voiceId": "Salli"
	},
	"ui": {
		"parentOrigin": "http://localhost:8080",
		"pageTitle": "Order Flowers Bot",
		"toolbarTitle": "Order Flowers"
	},
	"recorder": {
		"preset": "speech_recognition"
	}
};

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

/* harmony default export */ __webpack_exports__["a"] = ({
  canInterruptBotPlayback: function canInterruptBotPlayback(state) {
    return state.botAudio.canInterrupt;
  },
  isBotSpeaking: function isBotSpeaking(state) {
    return state.botAudio.isSpeaking;
  },
  isConversationGoing: function isConversationGoing(state) {
    return state.recState.isConversationGoing;
  },
  isLexInterrupting: function isLexInterrupting(state) {
    return state.lex.isInterrupting;
  },
  isLexProcessing: function isLexProcessing(state) {
    return state.lex.isProcessing;
  },
  isMicMuted: function isMicMuted(state) {
    return state.recState.isMicMuted;
  },
  isMicQuiet: function isMicQuiet(state) {
    return state.recState.isMicQuiet;
  },
  isRecorderSupported: function isRecorderSupported(state) {
    return state.recState.isRecorderSupported;
  },
  isRecording: function isRecording(state) {
    return state.recState.isRecording;
  }
});

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(27);


/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

/**
 * Store mutations
 */

/* eslint no-console: ["error", { allow: ["info", "warn", "error"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint spaced-comment: ["error", "always", { "exceptions": ["*"] }] */



/* harmony default export */ __webpack_exports__["a"] = ({
  /***********************************************************************
   *
   * Recorder State Mutations
   *
   **********************************************************************/

  /**
   * true if recorder seems to be muted
   */
  setIsMicMuted: function setIsMicMuted(state, bool) {
    if (typeof bool !== 'boolean') {
      console.error('setIsMicMuted status not boolean', bool);
      return;
    }
    if (state.config.recorder.useAutoMuteDetect) {
      state.recState.isMicMuted = bool;
    }
  },

  /**
   * set to true if mic if sound from mic is not loud enough
   */
  setIsMicQuiet: function setIsMicQuiet(state, bool) {
    if (typeof bool !== 'boolean') {
      console.error('setIsMicQuiet status not boolean', bool);
      return;
    }
    state.recState.isMicQuiet = bool;
  },

  /**
   * set to true while speech conversation is going
   */
  setIsConversationGoing: function setIsConversationGoing(state, bool) {
    if (typeof bool !== 'boolean') {
      console.error('setIsConversationGoing status not boolean', bool);
      return;
    }
    state.recState.isConversationGoing = bool;
  },

  /**
   * Signals recorder to start and sets recoding state to true
   */
  startRecording: function startRecording(state, recorder) {
    console.info('start recording');
    if (state.recState.isRecording === false) {
      recorder.start();
      state.recState.isRecording = true;
    }
  },

  /**
   * Set recording state to false
   */
  stopRecording: function stopRecording(state, recorder) {
    if (state.recState.isRecording === true) {
      state.recState.isRecording = false;
      if (recorder.isRecording) {
        recorder.stop();
      }
    }
  },

  /**
   * Increase consecutive silent recordings count
   * This is used to bail out from the conversation
   * when too many recordings are silent
   */
  increaseSilentRecordingCount: function increaseSilentRecordingCount(state) {
    state.recState.silentRecordingCount += 1;
  },

  /**
   * Reset the number of consecutive silent recordings
   */
  resetSilentRecordingCount: function resetSilentRecordingCount(state) {
    state.recState.silentRecordingCount = 0;
  },

  /**
   * Set to true if audio recording should be enabled
   */
  setIsRecorderEnabled: function setIsRecorderEnabled(state, bool) {
    if (typeof bool !== 'boolean') {
      console.error('setIsRecorderEnabled status not boolean', bool);
      return;
    }
    state.recState.isRecorderEnabled = bool;
  },

  /**
   * Set to true if audio recording is supported
   */
  setIsRecorderSupported: function setIsRecorderSupported(state, bool) {
    if (typeof bool !== 'boolean') {
      console.error('setIsRecorderSupported status not boolean', bool);
      return;
    }
    state.recState.isRecorderSupported = bool;
  },


  /***********************************************************************
   *
   * Bot Audio Mutations
   *
   **********************************************************************/

  /**
   * set to true while audio from Lex is playing
   */
  setIsBotSpeaking: function setIsBotSpeaking(state, bool) {
    if (typeof bool !== 'boolean') {
      console.error('setIsBotSpeaking status not boolean', bool);
      return;
    }
    state.botAudio.isSpeaking = bool;
  },

  /**
   * Set to true when the Lex audio is ready to autoplay
   * after it has already played audio on user interaction (click)
   */
  setAudioAutoPlay: function setAudioAutoPlay(state, audio, bool) {
    if (typeof bool !== 'boolean') {
      console.error('setAudioAutoPlay status not boolean', bool);
      return;
    }
    state.botAudio.autoPlay = bool;
    audio.autoplay = bool;
  },

  /**
  * set to true if bot playback can be interrupted
  */
  setCanInterruptBotPlayback: function setCanInterruptBotPlayback(state, bool) {
    if (typeof bool !== 'boolean') {
      console.error('setCanInterruptBotPlayback status not boolean', bool);
      return;
    }
    state.botAudio.canInterrupt = bool;
  },

  /**
  * set to true if bot playback is being interrupted
  */
  setIsBotPlaybackInterrupting: function setIsBotPlaybackInterrupting(state, bool) {
    if (typeof bool !== 'boolean') {
      console.error('setIsBotPlaybackInterrupting status not boolean', bool);
      return;
    }
    state.botAudio.isInterrupting = bool;
  },

  /**
  * used to set the setInterval Id for bot playback interruption
  */
  setBotPlaybackInterruptIntervalId: function setBotPlaybackInterruptIntervalId(state, id) {
    if (typeof id !== 'number') {
      console.error('setIsBotPlaybackInterruptIntervalId id is not a number', id);
      return;
    }
    state.botAudio.interruptIntervalId = id;
  },


  /***********************************************************************
   *
   * Lex and Polly Mutations
   *
   **********************************************************************/

  /**
   * Updates Lex State from Lex responses
   */
  updateLexState: function updateLexState(state, lexState) {
    state.lex = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, state.lex, lexState);
  },

  /**
   * Sets the Lex session attributes
   */
  setLexSessionAttributes: function setLexSessionAttributes(state, sessionAttributes) {
    if ((typeof sessionAttributes === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(sessionAttributes)) !== 'object') {
      console.error('sessionAttributes is not an object', sessionAttributes);
      return;
    }
    state.lex.sessionAttributes = sessionAttributes;
  },

  /**
  * set to true while calling lexPost{Text,Content}
  * to mark as processing
  */
  setIsLexProcessing: function setIsLexProcessing(state, bool) {
    if (typeof bool !== 'boolean') {
      console.error('setIsLexProcessing status not boolean', bool);
      return;
    }
    state.lex.isProcessing = bool;
  },

  /**
  * set to true if lex is being interrupted while speaking
  */
  setIsLexInterrupting: function setIsLexInterrupting(state, bool) {
    if (typeof bool !== 'boolean') {
      console.error('setIsLexInterrupting status not boolean', bool);
      return;
    }
    state.lex.isInterrupting = bool;
  },

  /**
   * Set the supported content types to be used with Lex/Polly
   */
  setAudioContentType: function setAudioContentType(state, type) {
    switch (type) {
      case 'mp3':
      case 'mpg':
      case 'mpeg':
        state.polly.outputFormat = 'mp3';
        state.lex.acceptFormat = 'audio/mpeg';
        break;
      case 'ogg':
      case 'ogg_vorbis':
      case 'x-cbr-opus-with-preamble':
      default:
        state.polly.outputFormat = 'ogg_vorbis';
        state.lex.acceptFormat = 'audio/ogg';
        break;
    }
  },

  /**
   * Set the Polly voice to be used by the client
   */
  setPollyVoiceId: function setPollyVoiceId(state, voiceId) {
    if (typeof voiceId !== 'string') {
      console.error('polly voiceId is not a string', voiceId);
      return;
    }
    state.polly.voiceId = voiceId;
  },


  /***********************************************************************
   *
   * UI and General Mutations
   *
   **********************************************************************/

  /**
   * Merges the general config of the web ui
   * with a dynamic config param and merges it with
   * the existing config (e.g. initialized from ../config)
   */
  mergeConfig: function mergeConfig(state, configObj) {
    if ((typeof configObj === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(configObj)) !== 'object') {
      console.error('config is not an object', configObj);
      return;
    }

    // security: do not accept dynamic parentOrigin
    if (configObj.ui && configObj.ui.parentOrigin) {
      delete configObj.ui.parentOrigin;
    }
    state.config = Object(__WEBPACK_IMPORTED_MODULE_2__config__["b" /* mergeConfig */])(state.config, configObj);
  },

  /**
   * Set to true if running embedded in an iframe
   */
  setIsRunningEmbedded: function setIsRunningEmbedded(state, bool) {
    if (typeof bool !== 'boolean') {
      console.error('setIsRunningEmbedded status not boolean', bool);
      return;
    }
    state.isRunningEmbedded = bool;
  },

  /**
  * used to track the expand/minimize status of the window when
  * running embedded in an iframe
  */
  toggleIsUiMinimized: function toggleIsUiMinimized(state) {
    state.isUiMinimized = !state.isUiMinimized;
  },

  /**
   * Push new message into messages array
   */
  pushMessage: function pushMessage(state, message) {
    state.messages.push(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({
      id: state.messages.length
    }, message));
  },

  /**
   * Set the AWS credentials provider
   */
  setAwsCredsProvider: function setAwsCredsProvider(state, provider) {
    state.awsCreds.provider = provider;
  }
});

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(143);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(145);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(144), __esModule: true };

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(19);
__webpack_require__(26);
module.exports = __webpack_require__(42).f('iterator');

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(146), __esModule: true };

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(147);
__webpack_require__(48);
__webpack_require__(154);
__webpack_require__(155);
module.exports = __webpack_require__(0).Symbol;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(2)
  , has            = __webpack_require__(9)
  , DESCRIPTORS    = __webpack_require__(5)
  , $export        = __webpack_require__(7)
  , redefine       = __webpack_require__(50)
  , META           = __webpack_require__(148).KEY
  , $fails         = __webpack_require__(11)
  , shared         = __webpack_require__(35)
  , setToStringTag = __webpack_require__(25)
  , uid            = __webpack_require__(21)
  , wks            = __webpack_require__(1)
  , wksExt         = __webpack_require__(42)
  , wksDefine      = __webpack_require__(43)
  , keyOf          = __webpack_require__(149)
  , enumKeys       = __webpack_require__(150)
  , isArray        = __webpack_require__(151)
  , anObject       = __webpack_require__(4)
  , toIObject      = __webpack_require__(10)
  , toPrimitive    = __webpack_require__(30)
  , createDesc     = __webpack_require__(17)
  , _create        = __webpack_require__(51)
  , gOPNExt        = __webpack_require__(152)
  , $GOPD          = __webpack_require__(153)
  , $DP            = __webpack_require__(3)
  , $keys          = __webpack_require__(12)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(58).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(22).f  = $propertyIsEnumerable;
  __webpack_require__(37).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(24)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(8)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(21)('meta')
  , isObject = __webpack_require__(16)
  , has      = __webpack_require__(9)
  , setDesc  = __webpack_require__(3).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(11)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(12)
  , toIObject = __webpack_require__(10);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(12)
  , gOPS    = __webpack_require__(37)
  , pIE     = __webpack_require__(22);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(18);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(10)
  , gOPN      = __webpack_require__(58).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(22)
  , createDesc     = __webpack_require__(17)
  , toIObject      = __webpack_require__(10)
  , toPrimitive    = __webpack_require__(30)
  , has            = __webpack_require__(9)
  , IE8_DOM_DEFINE = __webpack_require__(45)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(5) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43)('asyncIterator');

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43)('observable');

/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_lex_recorder__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_recorder_handlers__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_silent_ogg__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_silent_ogg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__assets_silent_ogg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_silent_mp3__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_silent_mp3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__assets_silent_mp3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_lex_client__ = __webpack_require__(168);


/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/

/**
 * Asynchronous store actions
 */

/* eslint no-console: ["error", { allow: ["info", "warn", "error"] }] */
/* eslint spaced-comment: ["error", "always", { "exceptions": ["*"] }] */










// non-state variables that may be mutated outside of store
// set via initializers at run time
var awsCredentials = void 0;
var pollyClient = void 0;
var lexClient = void 0;
var audio = void 0;
var recorder = void 0;

/* harmony default export */ __webpack_exports__["a"] = ({

  /***********************************************************************
   *
   * Initialization Actions
   *
   **********************************************************************/

  initCredentials: function initCredentials(context, credentials) {
    switch (context.state.awsCreds.provider) {
      case 'cognito':
        awsCredentials = credentials;
        return context.dispatch('getCredentials');
      case 'parentWindow':
        return context.dispatch('getCredentials');
      default:
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject('unknown credential provider');
    }
  },
  getConfigFromParent: function getConfigFromParent(context) {
    if (!context.state.isRunningEmbedded) {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve({});
    }

    return context.dispatch('sendMessageToParentWindow', { event: 'initIframeConfig' }).then(function (configResponse) {
      if (configResponse.event === 'resolve' && configResponse.type === 'initIframeConfig') {
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve(configResponse.data);
      }
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject('invalid config event from parent');
    });
  },
  initConfig: function initConfig(context, configObj) {
    context.commit('mergeConfig', configObj);
  },
  initMessageList: function initMessageList(context) {
    context.commit('pushMessage', {
      type: 'bot',
      text: context.state.config.lex.initialText
    });
  },
  initLexClient: function initLexClient(context, lexRuntimeClient) {
    lexClient = new __WEBPACK_IMPORTED_MODULE_7__lib_lex_client__["a" /* default */]({
      botName: context.state.config.lex.botName,
      botAlias: context.state.config.lex.botAlias,
      lexRuntimeClient: lexRuntimeClient
    });

    context.commit('setLexSessionAttributes', context.state.config.lex.sessionAttributes);
    return context.dispatch('getCredentials').then(function () {
      lexClient.initCredentials(awsCredentials);
    });
  },
  initPollyClient: function initPollyClient(context, client) {
    if (!context.state.recState.isRecorderEnabled) {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
    }
    pollyClient = client;
    context.commit('setPollyVoiceId', context.state.config.polly.voiceId);
    return context.dispatch('getCredentials').then(function (creds) {
      pollyClient.config.credentials = creds;
    });
  },
  initRecorder: function initRecorder(context) {
    if (!context.state.recState.isRecorderEnabled) {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
    }
    recorder = new __WEBPACK_IMPORTED_MODULE_3__lib_lex_recorder__["a" /* default */](context.state.config.recorder);

    return recorder.init().then(function () {
      return recorder.initOptions(context.state.config.recorder);
    }).then(function () {
      return Object(__WEBPACK_IMPORTED_MODULE_4__store_recorder_handlers__["a" /* default */])(context, recorder);
    }).then(function () {
      return context.commit('setIsRecorderSupported', true);
    }).then(function () {
      return context.commit('setIsMicMuted', recorder.isMicMuted);
    }).catch(function (error) {
      if (['PermissionDeniedError', 'NotAllowedError'].indexOf(error.name) >= 0) {
        console.warn('get user media permission denied');
        context.dispatch('pushErrorMessage', 'It seems like the microphone access has been denied. ' + 'If you want to use voice, please allow mic usage in your browser.');
      } else {
        console.error('error while initRecorder', error);
      }
    });
  },
  initBotAudio: function initBotAudio(context, audioElement) {
    if (!context.state.recState.isRecorderEnabled) {
      return;
    }
    audio = audioElement;

    var silentSound = void 0;

    // Ogg is the preferred format as it seems to be generally smaller.
    // Detect if ogg is supported (MS Edge doesn't).
    // Can't default to mp3 as it is not supported by some Android browsers
    if (audio.canPlayType('audio/ogg') !== '') {
      context.commit('setAudioContentType', 'ogg');
      silentSound = __WEBPACK_IMPORTED_MODULE_5__assets_silent_ogg___default.a;
    } else if (audio.canPlayType('audio/mp3') !== '') {
      context.commit('setAudioContentType', 'mp3');
      silentSound = __WEBPACK_IMPORTED_MODULE_6__assets_silent_mp3___default.a;
    } else {
      console.error('init audio could not find supportted audio type');
      console.warn('init audio can play mp3 [%s]', audio.canPlayType('audio/mp3'));
      console.warn('init audio can play ogg [%s]', audio.canPlayType('audio/ogg'));
    }

    console.info('recorder content types: %s', recorder.mimeType);

    audio.preload = 'auto';
    audio.autoplay = true;
    // Load a silent sound as the initial audio. This is used to workaround
    // the requirement of mobile browsers that would only play a
    // sound in direct response to a user action (e.g. click).
    // This audio should be explicitly played as a response to a click
    // in the UI
    audio.src = silentSound;
  },
  reInitBot: function reInitBot(context) {
    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve().then(function () {
      return context.state.config.ui.pushInitialTextOnRestart ? context.dispatch('pushMessage', {
        text: context.state.config.lex.initialText,
        type: 'bot'
      }) : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
    }).then(function () {
      return context.state.config.lex.reInitSessionAttributesOnRestart ? context.commit('setLexSessionAttributes', context.state.config.lex.sessionAttributes) : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
    });
  },


  /***********************************************************************
   *
   * Audio Actions
   *
   **********************************************************************/

  getAudioUrl: function getAudioUrl(context, blob) {
    var url = void 0;

    try {
      url = URL.createObjectURL(blob);
    } catch (error) {
      console.error('getAudioUrl createObjectURL error', error);
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject('There was an error processing the audio response (' + error + ')');
    }

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve(url);
  },
  setAudioAutoPlay: function setAudioAutoPlay(context) {
    var audioElem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : audio;

    if (audioElem.autoplay) {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
    }
    return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      audio.play();
      // eslint-disable-next-line no-param-reassign
      audioElem.onended = function () {
        context.commit('setAudioAutoPlay', audioElem, true);
        resolve();
      };
      // eslint-disable-next-line no-param-reassign
      audioElem.onerror = function (err) {
        context.commit('setAudioAutoPlay', audioElem, false);
        reject('setting audio autoplay failed: ' + err);
      };
    });
  },
  playAudio: function playAudio(context, url) {
    return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve) {
      audio.onloadedmetadata = function () {
        context.commit('setIsBotSpeaking', true);
        context.dispatch('playAudioHandler').then(function () {
          return resolve();
        });
      };
      audio.src = url;
    });
  },
  playAudioHandler: function playAudioHandler(context) {
    return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      var enablePlaybackInterrupt = context.state.config.lex.enablePlaybackInterrupt;


      var clearPlayback = function clearPlayback() {
        context.commit('setIsBotSpeaking', false);
        var intervalId = context.state.botAudio.interruptIntervalId;
        if (intervalId && enablePlaybackInterrupt) {
          clearInterval(intervalId);
          context.commit('setBotPlaybackInterruptIntervalId', 0);
          context.commit('setIsLexInterrupting', false);
          context.commit('setCanInterruptBotPlayback', false);
          context.commit('setIsBotPlaybackInterrupting', false);
        }
      };

      audio.onerror = function (error) {
        clearPlayback();
        reject('There was an error playing the response (' + error + ')');
      };
      audio.onended = function () {
        clearPlayback();
        resolve();
      };
      audio.onpause = audio.onended;

      if (enablePlaybackInterrupt) {
        context.dispatch('playAudioInterruptHandler');
      }
    });
  },
  playAudioInterruptHandler: function playAudioInterruptHandler(context) {
    var isSpeaking = context.state.botAudio.isSpeaking;
    var _context$state$config = context.state.config.lex,
        enablePlaybackInterrupt = _context$state$config.enablePlaybackInterrupt,
        playbackInterruptMinDuration = _context$state$config.playbackInterruptMinDuration,
        playbackInterruptVolumeThreshold = _context$state$config.playbackInterruptVolumeThreshold,
        playbackInterruptLevelThreshold = _context$state$config.playbackInterruptLevelThreshold,
        playbackInterruptNoiseThreshold = _context$state$config.playbackInterruptNoiseThreshold;

    var intervalTimeInMs = 200;

    if (!enablePlaybackInterrupt && !isSpeaking && context.state.lex.isInterrupting && audio.duration < playbackInterruptMinDuration) {
      return;
    }

    var intervalId = setInterval(function () {
      var duration = audio.duration;
      var end = audio.played.end(0);
      var canInterrupt = context.state.botAudio.canInterrupt;


      if (!canInterrupt &&
      // allow to be interrupt free in the beginning
      end > playbackInterruptMinDuration &&
      // don't interrupt towards the end
      duration - end > 0.5 &&
      // only interrupt if the volume seems to be low noise
      recorder.volume.max < playbackInterruptNoiseThreshold) {
        context.commit('setCanInterruptBotPlayback', true);
      } else if (canInterrupt && duration - end < 0.5) {
        context.commit('setCanInterruptBotPlayback', false);
      }

      if (canInterrupt && recorder.volume.max > playbackInterruptVolumeThreshold && recorder.volume.slow > playbackInterruptLevelThreshold) {
        clearInterval(intervalId);
        context.commit('setIsBotPlaybackInterrupting', true);
        setTimeout(function () {
          audio.pause();
        }, 500);
      }
    }, intervalTimeInMs);

    context.commit('setBotPlaybackInterruptIntervalId', intervalId);
  },


  /***********************************************************************
   *
   * Recorder Actions
   *
   **********************************************************************/

  startConversation: function startConversation(context) {
    context.commit('setIsConversationGoing', true);
    return context.dispatch('startRecording');
  },
  stopConversation: function stopConversation(context) {
    context.commit('setIsConversationGoing', false);
  },
  startRecording: function startRecording(context) {
    // don't record if muted
    if (context.state.recState.isMicMuted === true) {
      console.warn('recording while muted');
      context.dispatch('stopConversation');
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject('The microphone seems to be muted.');
    }

    context.commit('startRecording', recorder);
    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
  },
  stopRecording: function stopRecording(context) {
    context.commit('stopRecording', recorder);
  },
  getRecorderVolume: function getRecorderVolume(context) {
    if (!context.state.recState.isRecorderEnabled) {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
    }
    return recorder.volume;
  },


  /***********************************************************************
   *
   * Lex and Polly Actions
   *
   **********************************************************************/

  pollyGetBlob: function pollyGetBlob(context, text) {
    var synthReq = pollyClient.synthesizeSpeech({
      Text: text,
      VoiceId: context.state.polly.voiceId,
      OutputFormat: context.state.polly.outputFormat
    });
    return context.dispatch('getCredentials').then(function () {
      return synthReq.promise();
    }).then(function (data) {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve(new Blob([data.AudioStream], { type: data.ContentType }));
    });
  },
  pollySynthesizeSpeech: function pollySynthesizeSpeech(context, text) {
    return context.dispatch('pollyGetBlob', text).then(function (blob) {
      return context.dispatch('getAudioUrl', blob);
    }).then(function (audioUrl) {
      return context.dispatch('playAudio', audioUrl);
    });
  },
  interruptSpeechConversation: function interruptSpeechConversation(context) {
    if (!context.state.recState.isConversationGoing) {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
    }

    return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      context.dispatch('stopConversation').then(function () {
        return context.dispatch('stopRecording');
      }).then(function () {
        if (context.state.botAudio.isSpeaking) {
          audio.pause();
        }
      }).then(function () {
        var count = 0;
        var countMax = 20;
        var intervalTimeInMs = 250;
        context.commit('setIsLexInterrupting', true);
        var intervalId = setInterval(function () {
          if (!context.state.lex.isProcessing) {
            clearInterval(intervalId);
            context.commit('setIsLexInterrupting', false);
            resolve();
          }
          if (count > countMax) {
            clearInterval(intervalId);
            context.commit('setIsLexInterrupting', false);
            reject('interrupt interval exceeded');
          }
          count += 1;
        }, intervalTimeInMs);
      });
    });
  },
  postTextMessage: function postTextMessage(context, message) {
    context.dispatch('interruptSpeechConversation').then(function () {
      return context.dispatch('pushMessage', message);
    }).then(function () {
      return context.dispatch('lexPostText', message.text);
    }).then(function (response) {
      return context.dispatch('pushMessage', {
        text: response.message,
        type: 'bot',
        dialogState: context.state.lex.dialogState,
        responseCard: context.state.lex.responseCard
      });
    }).then(function () {
      if (context.state.lex.dialogState === 'Fulfilled') {
        context.dispatch('reInitBot');
      }
    }).catch(function (error) {
      console.error('error in postTextMessage', error);
      context.dispatch('pushErrorMessage', 'I was unable to process your message. ' + error);
    });
  },
  lexPostText: function lexPostText(context, text) {
    context.commit('setIsLexProcessing', true);
    return context.dispatch('getCredentials').then(function () {
      return lexClient.postText(text, context.state.lex.sessionAttributes);
    }).then(function (data) {
      context.commit('setIsLexProcessing', false);
      return context.dispatch('updateLexState', data).then(function () {
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve(data);
      });
    });
  },
  lexPostContent: function lexPostContent(context, audioBlob) {
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    context.commit('setIsLexProcessing', true);
    console.info('audio blob size:', audioBlob.size);
    var timeStart = void 0;

    return context.dispatch('getCredentials').then(function () {
      timeStart = performance.now();
      return lexClient.postContent(audioBlob, context.state.lex.sessionAttributes, context.state.lex.acceptFormat, offset);
    }).then(function (lexResponse) {
      var timeEnd = performance.now();
      console.info('lex postContent processing time:', ((timeEnd - timeStart) / 1000).toFixed(2));
      context.commit('setIsLexProcessing', false);
      return context.dispatch('updateLexState', lexResponse).then(function () {
        return context.dispatch('processLexContentResponse', lexResponse);
      }).then(function (blob) {
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve(blob);
      });
    });
  },
  processLexContentResponse: function processLexContentResponse(context, lexData) {
    var audioStream = lexData.audioStream,
        contentType = lexData.contentType,
        dialogState = lexData.dialogState;


    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve().then(function () {
      if (!audioStream || !audioStream.length) {
        var text = dialogState === 'ReadyForFulfillment' ? 'All done' : 'There was an error';
        return context.dispatch('pollyGetBlob', text);
      }

      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve(new Blob([audioStream], { type: contentType }));
    });
  },
  updateLexState: function updateLexState(context, lexState) {
    var lexStateDefault = {
      dialogState: '',
      inputTranscript: '',
      intentName: '',
      message: '',
      responseCard: null,
      sessionAttributes: {},
      slotToElicit: '',
      slots: {}
    };
    // simulate response card in sessionAttributes
    // used mainly for postContent which doesn't support response cards
    if ('sessionAttributes' in lexState && 'appContext' in lexState.sessionAttributes) {
      try {
        var appContext = JSON.parse(lexState.sessionAttributes.appContext);
        if ('responseCard' in appContext) {
          lexStateDefault.responseCard = appContext.responseCard;
        }
      } catch (e) {
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject('error parsing appContext in sessionAttributes');
      }
    }
    context.commit('updateLexState', __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, lexStateDefault, lexState));
    if (context.state.isRunningEmbedded) {
      context.dispatch('sendMessageToParentWindow', { event: 'updateLexState', state: context.state.lex });
    }
    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
  },


  /***********************************************************************
   *
   * Message List Actions
   *
   **********************************************************************/

  pushMessage: function pushMessage(context, message) {
    context.commit('pushMessage', message);
  },
  pushErrorMessage: function pushErrorMessage(context, text) {
    var dialogState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Failed';

    context.commit('pushMessage', {
      type: 'bot',
      text: text,
      dialogState: dialogState
    });
  },


  /***********************************************************************
   *
   * Credentials Actions
   *
   **********************************************************************/

  getCredentialsFromParent: function getCredentialsFromParent(context) {
    var credsExpirationDate = new Date(awsCredentials && awsCredentials.expireTime ? awsCredentials.expireTime : 0);
    var now = Date.now();
    if (credsExpirationDate > now) {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve(awsCredentials);
    }
    return context.dispatch('sendMessageToParentWindow', { event: 'getCredentials' }).then(function (credsResponse) {
      if (credsResponse.event === 'resolve' && credsResponse.type === 'getCredentials') {
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve(credsResponse.data);
      }
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject('invalid credential event from parent');
    }).then(function (creds) {
      var _creds$data$Credentia = creds.data.Credentials,
          AccessKeyId = _creds$data$Credentia.AccessKeyId,
          SecretKey = _creds$data$Credentia.SecretKey,
          SessionToken = _creds$data$Credentia.SessionToken;

      var IdentityId = creds.data.IdentityId;
      // recreate as a static credential
      awsCredentials = {
        accessKeyId: AccessKeyId,
        secretAccessKey: SecretKey,
        sessionToken: SessionToken,
        identityId: IdentityId,
        getPromise: function getPromise() {
          return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
        }
      };

      return awsCredentials;
    });
  },
  getCredentials: function getCredentials(context) {
    if (context.state.awsCreds.provider === 'parentWindow') {
      return context.dispatch('getCredentialsFromParent');
    }
    return awsCredentials.getPromise().then(function () {
      return awsCredentials;
    });
  },


  /***********************************************************************
   *
   * UI and Parent Communication Actions
   *
   **********************************************************************/

  toggleIsUiMinimized: function toggleIsUiMinimized(context) {
    context.commit('toggleIsUiMinimized');
    return context.dispatch('sendMessageToParentWindow', { event: 'toggleMinimizeUi' });
  },
  sendMessageToParentWindow: function sendMessageToParentWindow(context, message) {
    if (!context.state.isRunningEmbedded) {
      var error = 'sendMessage called when not running embedded';
      console.warn(error);
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject(error);
    }

    return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      var messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = function (evt) {
        messageChannel.port1.close();
        messageChannel.port2.close();
        if (evt.data.event === 'resolve') {
          resolve(evt.data);
        } else {
          reject('error in sendMessageToParentWindow ' + evt.data.error);
        }
      };
      parent.postMessage(message, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* config */].ui.parentOrigin, [messageChannel.port2]);
    });
  }
});

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wav_worker__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wav_worker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__wav_worker__);





/*
 Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/* eslint no-console: ["error", { allow: ["info", "warn", "error"] }] */
/* global AudioContext CustomEvent document Event navigator window */

// XXX do we need webrtc-adapter?
// XXX npm uninstall it after testing
// XXX import 'webrtc-adapter';

// wav encoder worker - uses webpack worker loader


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

var _class = function () {
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
  function _class() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, _class);

    this.initOptions(options);

    // event handler used for events similar to MediaRecorder API (e.g. onmute)
    this._eventTarget = document.createDocumentFragment();

    // encoder worker
    this._encoderWorker = new __WEBPACK_IMPORTED_MODULE_5__wav_worker___default.a();

    // worker uses this event listener to signal back
    // when wav has finished encoding
    this._encoderWorker.addEventListener('message', function (evt) {
      return _this._exportWav(evt.data);
    });
  }

  /**
   * Initialize general recorder options
   *
   * @param {object} options - object with various options controlling the
   *   recorder behavior. See the constructor for details.
   */


  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(_class, [{
    key: 'initOptions',
    value: function initOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // TODO break this into functions, avoid side-effects, break into this.options.*
      if (options.preset) {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign___default()(options, this._getPresetOptions(options.preset));
      }

      this.mimeType = options.mimeType || 'audio/wav';

      this.recordingTimeMax = options.recordingTimeMax || 8;
      this.recordingTimeMin = options.recordingTimeMin || 2;
      this.recordingTimeMinAutoIncrease = typeof options.recordingTimeMinAutoIncrease !== 'undefined' ? !!options.recordingTimeMinAutoIncrease : true;

      // speech detection configuration
      this.autoStopRecording = typeof options.autoStopRecording !== 'undefined' ? !!options.autoStopRecording : true;
      this.quietThreshold = options.quietThreshold || 0.001;
      this.quietTimeMin = options.quietTimeMin || 0.4;
      this.volumeThreshold = options.volumeThreshold || -75;

      // band pass configuration
      this.useBandPass = typeof options.useBandPass !== 'undefined' ? !!options.useBandPass : true;
      // https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode
      this.bandPassFrequency = options.bandPassFrequency || 4000;
      // Butterworth 0.707 [sqrt(1/2)]  | Chebyshev < 1.414
      this.bandPassQ = options.bandPassQ || 0.707;

      // parameters passed to script processor and also used in encoder
      // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createScriptProcessor
      this.bufferLength = options.bufferLength || 2048;
      this.numChannels = options.numChannels || 1;

      this.requestEchoCancellation = typeof options.requestEchoCancellation !== 'undefined' ? !!options.requestEchoCancellation : true;

      // automatic mute detection options
      this.useAutoMuteDetect = typeof options.useAutoMuteDetect !== 'undefined' ? !!options.useAutoMuteDetect : true;
      this.muteThreshold = options.muteThreshold || 1e-7;

      // encoder options
      this.encoderUseTrim = typeof options.encoderUseTrim !== 'undefined' ? !!options.encoderUseTrim : true;
      this.encoderQuietTrimThreshold = options.encoderQuietTrimThreshold || 0.0008;
      this.encoderQuietTrimSlackBack = options.encoderQuietTrimSlackBack || 4000;
    }
  }, {
    key: '_getPresetOptions',
    value: function _getPresetOptions() {
      var preset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'low_latency';

      this._presets = ['low_latency', 'speech_recognition'];

      if (this._presets.indexOf(preset) === -1) {
        console.error('invalid preset');
        return {};
      }

      var presets = {
        low_latency: {
          encoderUseTrim: true,
          useBandPass: true
        },
        speech_recognition: {
          encoderUseTrim: false,
          useBandPass: false,
          useAutoMuteDetect: false
        }
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

  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      this._state = 'inactive';

      this._instant = 0.0;
      this._slow = 0.0;
      this._clip = 0.0;
      this._maxVolume = -Infinity;

      this._isMicQuiet = true;
      this._isMicMuted = false;

      this._isSilentRecording = true;
      this._silentRecordingConsecutiveCount = 0;

      // sets this._audioContext AudioContext object
      return this._initAudioContext().then(function () {
        return (
          // inits AudioContext.createScriptProcessor object
          // used to process mic audio input volume
          // sets this._micVolumeProcessor
          _this2._initMicVolumeProcessor()
        );
      }).then(function () {
        return _this2._initStream();
      });
    }

    /**
     * Start recording
     */

  }, {
    key: 'start',
    value: function start() {
      if (this._state !== 'inactive' || typeof this._stream === 'undefined') {
        console.warn('recorder start called out of state');
        return;
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
          quietTrimSlackBack: this.encoderQuietTrimSlackBack
        }
      });
    }

    /**
     * Stop recording
     */

  }, {
    key: 'stop',
    value: function stop() {
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
        type: 'audio/wav'
      });

      this._eventTarget.dispatchEvent(new Event('stop'));
    }
  }, {
    key: '_exportWav',
    value: function _exportWav(evt) {
      this._eventTarget.dispatchEvent(new CustomEvent('dataavailable', { detail: evt.data }));
      this._encoderWorker.postMessage({ command: 'clear' });
    }
  }, {
    key: '_recordBuffers',
    value: function _recordBuffers(inputBuffer) {
      if (this._state !== 'recording') {
        console.warn('recorder _recordBuffers called out of state');
        return;
      }
      var buffer = [];
      for (var i = 0; i < inputBuffer.numberOfChannels; i++) {
        buffer[i] = inputBuffer.getChannelData(i);
      }

      this._encoderWorker.postMessage({
        command: 'record',
        buffer: buffer
      });
    }
  }, {
    key: '_setIsMicMuted',
    value: function _setIsMicMuted() {
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

      if (!this._isMicMuted && this._slow < this.muteThreshold) {
        this._isMicMuted = true;
        this._eventTarget.dispatchEvent(new Event('mute'));
        console.info('mute - instant: %s - slow: %s - track muted: %s', this._instant, this._slow, this._tracks[0].muted);

        if (this._state === 'recording') {
          this.stop();
          console.info('stopped recording on _setIsMicMuted');
        }
      }
    }
  }, {
    key: '_setIsMicQuiet',
    value: function _setIsMicQuiet() {
      var now = this._audioContext.currentTime;

      var isMicQuiet = this._maxVolume < this.volumeThreshold || this._slow < this.quietThreshold;

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
      var recordingTimeMin = this.recordingTimeMinAutoIncrease ? this.recordingTimeMin - 1 + Math.pow(this.recordingTimeMax, 1 - 1 / (this._silentRecordingConsecutiveCount + 1)) : this.recordingTimeMin;

      // detect voice pause and stop recording
      if (this.autoStopRecording && this._isMicQuiet && this._state === 'recording' &&
      // have I been recording longer than the minimum recording time?
      now - this._recordingStartTime > recordingTimeMin &&
      // has the slow sample value been below the quiet threshold longer than
      // the minimum allowed quiet time?
      now - this._quietStartTime > this.quietTimeMin) {
        this.stop();
      }
    }

    /**
     * Initializes the AudioContext
     * Aassigs it to this._audioContext. Adds visibitily change event listener
     * to suspend the audio context when the browser tab is hidden.
     * @return {Promise} resolution of AudioContext
     */

  }, {
    key: '_initAudioContext',
    value: function _initAudioContext() {
      var _this3 = this;

      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!window.AudioContext) {
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject('Web Audio API not supported.');
      }
      this._audioContext = new AudioContext();
      document.addEventListener('visibilitychange', function () {
        console.info('visibility change triggered in recorder. hidden:', document.hidden);
        if (document.hidden) {
          _this3._audioContext.suspend();
        } else {
          _this3._audioContext.resume();
        }
      });
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
    }

    /**
     * Private initializer of the audio buffer processor
     * It manages the volume variables and sends the buffers to the worker
     * when recording.
     * Some of this came from:
     * https://webrtc.github.io/samples/src/content/getusermedia/volume/js/soundmeter.js
     */

  }, {
    key: '_initMicVolumeProcessor',
    value: function _initMicVolumeProcessor() {
      var _this4 = this;

      /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
      // assumes a single channel - XXX does it need to handle 2 channels?
      var processor = this._audioContext.createScriptProcessor(this.bufferLength, this.numChannels, this.numChannels);
      processor.onaudioprocess = function (evt) {
        if (_this4._state === 'recording') {
          // send buffers to worker
          _this4._recordBuffers(evt.inputBuffer);

          // stop recording if over the maximum time
          if (_this4._audioContext.currentTime - _this4._recordingStartTime > _this4.recordingTimeMax) {
            console.warn('stopped recording due to maximum time');
            _this4.stop();
          }
        }

        // XXX assumes mono channel
        var input = evt.inputBuffer.getChannelData(0);
        var sum = 0.0;
        var clipCount = 0;
        for (var i = 0; i < input.length; ++i) {
          // square to calculate signal power
          sum += input[i] * input[i];
          if (Math.abs(input[i]) > 0.99) {
            clipCount += 1;
          }
        }
        _this4._instant = Math.sqrt(sum / input.length);
        _this4._slow = 0.95 * _this4._slow + 0.05 * _this4._instant;
        _this4._clip = input.length ? clipCount / input.length : 0;

        _this4._setIsMicMuted();
        _this4._setIsMicQuiet();

        _this4._analyser.getFloatFrequencyData(_this4._analyserData);
        _this4._maxVolume = Math.max.apply(Math, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(_this4._analyserData));
      };

      this._micVolumeProcessor = processor;
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
    }

    /*
     * Private initializers
     */

    /**
     * Sets microphone using getUserMedia
     * @return {Promise} returns a promise that resolves when the audio input
     *   has been connected
     */

  }, {
    key: '_initStream',
    value: function _initStream() {
      var _this5 = this;

      // TODO obtain with navigator.mediaDevices.getSupportedConstraints()
      var constraints = {
        audio: {
          optional: [{
            echoCancellation: this.requestEchoCancellation
          }]
        }
      };

      return navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        _this5._stream = stream;

        _this5._tracks = stream.getAudioTracks();
        console.info('using media stream track labeled: ', _this5._tracks[0].label);
        // assumes single channel
        _this5._tracks[0].onmute = _this5._setIsMicMuted;
        _this5._tracks[0].onunmute = _this5._setIsMicMuted;

        var source = _this5._audioContext.createMediaStreamSource(stream);
        var gainNode = _this5._audioContext.createGain();
        var analyser = _this5._audioContext.createAnalyser();

        if (_this5.useBandPass) {
          // bandpass filter around human voice
          // https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode
          var biquadFilter = _this5._audioContext.createBiquadFilter();
          biquadFilter.type = 'bandpass';

          biquadFilter.frequency.value = _this5.bandPassFrequency;
          biquadFilter.gain.Q = _this5.bandPassQ;

          source.connect(biquadFilter);
          biquadFilter.connect(gainNode);
          analyser.smoothingTimeConstant = 0.5;
        } else {
          source.connect(gainNode);
          analyser.smoothingTimeConstant = 0.9;
        }
        analyser.fftSize = _this5.bufferLength;
        analyser.minDecibels = -90;
        analyser.maxDecibels = -30;

        gainNode.connect(analyser);
        analyser.connect(_this5._micVolumeProcessor);
        _this5._analyserData = new Float32Array(analyser.frequencyBinCount);
        _this5._analyser = analyser;

        _this5._micVolumeProcessor.connect(_this5._audioContext.destination);

        _this5._eventTarget.dispatchEvent(new Event('streamReady'));
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

  }, {
    key: 'state',
    get: function get() {
      return this._state;
    }

    /**
     * Getter of stream object. Based on MediaRecorder API.
     * @return {MediaStream} media stream object obtain from getUserMedia
     */

  }, {
    key: 'stream',
    get: function get() {
      return this._stream;
    }
  }, {
    key: 'isMicQuiet',
    get: function get() {
      return this._isMicQuiet;
    }
  }, {
    key: 'isMicMuted',
    get: function get() {
      return this._isMicMuted;
    }
  }, {
    key: 'isSilentRecording',
    get: function get() {
      return this._isSilentRecording;
    }
  }, {
    key: 'isRecording',
    get: function get() {
      return this._state === 'recording';
    }

    /**
    * Getter of mic volume levels.
    * instant: root mean square of levels in buffer
    * slow: time decaying level
    * clip: count of samples at the top of signals (high noise)
    */

  }, {
    key: 'volume',
    get: function get() {
      return {
        instant: this._instant,
        slow: this._slow,
        clip: this._clip,
        max: this._maxVolume
      };
    }

    /*
     * Private initializer of event target
     * Set event handlers that mimic MediaRecorder events plus others
     */

    // TODO make setters replace the listener insted of adding

  }, {
    key: 'onstart',
    set: function set(cb) {
      this._eventTarget.addEventListener('start', cb);
    }
  }, {
    key: 'onstop',
    set: function set(cb) {
      this._eventTarget.addEventListener('stop', cb);
    }
  }, {
    key: 'ondataavailable',
    set: function set(cb) {
      this._eventTarget.addEventListener('dataavailable', cb);
    }
  }, {
    key: 'onerror',
    set: function set(cb) {
      this._eventTarget.addEventListener('error', cb);
    }
  }, {
    key: 'onstreamready',
    set: function set(cb) {
      this._eventTarget.addEventListener('streamready', cb);
    }
  }, {
    key: 'onmute',
    set: function set(cb) {
      this._eventTarget.addEventListener('mute', cb);
    }
  }, {
    key: 'onunmute',
    set: function set(cb) {
      this._eventTarget.addEventListener('unmute', cb);
    }
  }, {
    key: 'onsilentrecording',
    set: function set(cb) {
      this._eventTarget.addEventListener('silentrecording', cb);
    }
  }, {
    key: 'onunsilentrecording',
    set: function set(cb) {
      this._eventTarget.addEventListener('unsilentrecording', cb);
    }
  }, {
    key: 'onquiet',
    set: function set(cb) {
      this._eventTarget.addEventListener('quiet', cb);
    }
  }, {
    key: 'onunquiet',
    set: function set(cb) {
      this._eventTarget.addEventListener('unquiet', cb);
    }
  }]);

  return _class;
}();

/* harmony default export */ __webpack_exports__["a"] = (_class);

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(159);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(160), __esModule: true };

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(19);
__webpack_require__(161);
module.exports = __webpack_require__(0).Array.from;

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(15)
  , $export        = __webpack_require__(7)
  , toObject       = __webpack_require__(23)
  , call           = __webpack_require__(53)
  , isArrayIter    = __webpack_require__(54)
  , toLength       = __webpack_require__(32)
  , createProperty = __webpack_require__(162)
  , getIterFn      = __webpack_require__(41);

$export($export.S + $export.F * !__webpack_require__(56)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(3)
  , createDesc      = __webpack_require__(17);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function () {
	return __webpack_require__(164)("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, {\n/******/ \t\t\t\tconfigurable: false,\n/******/ \t\t\t\tenumerable: true,\n/******/ \t\t\t\tget: getter\n/******/ \t\t\t});\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"/\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = 0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ (function(module, exports) {\n\n// based on https://github.com/mattdiamond/Recorderjs/blob/master/src/recorder.js\n// with a few optimizations including downsampling and trimming quiet samples\n\n/* global Blob self */\n/* eslint prefer-arrow-callback: [\"error\", { \"allowNamedFunctions\": true }] */\n/* eslint no-param-reassign: [\"error\", { \"props\": false }] */\n/* eslint no-use-before-define: [\"error\", { \"functions\": false }] */\n/* eslint no-plusplus: off */\n/* eslint comma-dangle: [\"error\", {\"functions\": \"never\", \"objects\": \"always-multiline\"}] */\nconst bitDepth = 16;\nconst bytesPerSample = bitDepth / 8;\nconst outSampleRate = 16000;\nconst outNumChannels = 1;\n\nlet recLength = 0;\nlet recBuffers = [];\n\nconst options = {\n  sampleRate: 44000,\n  numChannels: 1,\n  useDownsample: true,\n  // controls if the encoder will trim silent samples at begining and end of buffer\n  useTrim: true,\n  // trim samples below this value at the beginnig and end of the buffer\n  // lower the value trim less silence (larger file size)\n  // reasonable values seem to be between 0.005 and 0.0005\n  quietTrimThreshold: 0.0008,\n  // how many samples to add back to the buffer before/after the quiet threshold\n  // higher values result in less silence trimming (larger file size)\n  // reasonable values seem to be between 3500 and 5000\n  quietTrimSlackBack: 4000,\n};\n\nself.onmessage = (evt) => {\n  switch (evt.data.command) {\n    case 'init':\n      init(evt.data.config);\n      break;\n    case 'record':\n      record(evt.data.buffer);\n      break;\n    case 'exportWav':\n      exportWAV(evt.data.type);\n      break;\n    case 'getBuffer':\n      getBuffer();\n      break;\n    case 'clear':\n      clear();\n      break;\n    case 'close':\n      self.close();\n      break;\n    default:\n      break;\n  }\n};\n\nfunction init(config) {\n  Object.assign(options, config);\n  initBuffers();\n}\n\nfunction record(inputBuffer) {\n  for (let channel = 0; channel < options.numChannels; channel++) {\n    recBuffers[channel].push(inputBuffer[channel]);\n  }\n  recLength += inputBuffer[0].length;\n}\n\nfunction exportWAV(type) {\n  const buffers = [];\n  for (let channel = 0; channel < options.numChannels; channel++) {\n    buffers.push(mergeBuffers(recBuffers[channel], recLength));\n  }\n  let interleaved;\n  if (options.numChannels === 2 && outNumChannels === 2) {\n    interleaved = interleave(buffers[0], buffers[1]);\n  } else {\n    interleaved = buffers[0];\n  }\n  const downsampledBuffer = downsampleTrimBuffer(interleaved, outSampleRate);\n  const dataview = encodeWAV(downsampledBuffer);\n  const audioBlob = new Blob([dataview], { type });\n\n  self.postMessage({\n    command: 'exportWAV',\n    data: audioBlob,\n  });\n}\n\nfunction getBuffer() {\n  const buffers = [];\n  for (let channel = 0; channel < options.numChannels; channel++) {\n    buffers.push(mergeBuffers(recBuffers[channel], recLength));\n  }\n  self.postMessage({ command: 'getBuffer', data: buffers });\n}\n\nfunction clear() {\n  recLength = 0;\n  recBuffers = [];\n  initBuffers();\n}\n\nfunction initBuffers() {\n  for (let channel = 0; channel < options.numChannels; channel++) {\n    recBuffers[channel] = [];\n  }\n}\n\nfunction mergeBuffers(recBuffer, length) {\n  const result = new Float32Array(length);\n  let offset = 0;\n  for (let i = 0; i < recBuffer.length; i++) {\n    result.set(recBuffer[i], offset);\n    offset += recBuffer[i].length;\n  }\n  return result;\n}\n\nfunction interleave(inputL, inputR) {\n  const length = inputL.length + inputR.length;\n  const result = new Float32Array(length);\n\n  let index = 0;\n  let inputIndex = 0;\n\n  while (index < length) {\n    result[index++] = inputL[inputIndex];\n    result[index++] = inputR[inputIndex];\n    inputIndex++;\n  }\n  return result;\n}\n\nfunction floatTo16BitPCM(output, offset, input) {\n  for (let i = 0, o = offset; i < input.length; i++, o += 2) {\n    const s = Math.max(-1, Math.min(1, input[i]));\n    output.setInt16(o, s < 0 ? s * 0x8000 : s * 0x7FFF, true);\n  }\n}\n\n// Lex doesn't require proper wav header\n// still inserting wav header for playing on client side\nfunction addHeader(view, length) {\n  // RIFF identifier 'RIFF'\n  view.setUint32(0, 1380533830, false);\n  // file length minus RIFF identifier length and file description length\n  view.setUint32(4, 36 + length, true);\n  // RIFF type 'WAVE'\n  view.setUint32(8, 1463899717, false);\n  // format chunk identifier 'fmt '\n  view.setUint32(12, 1718449184, false);\n  // format chunk length\n  view.setUint32(16, 16, true);\n  // sample format (raw)\n  view.setUint16(20, 1, true);\n  // channel count\n  view.setUint16(22, outNumChannels, true);\n  // sample rate\n  view.setUint32(24, outSampleRate, true);\n  // byte rate (sample rate * block align)\n  view.setUint32(28, outSampleRate * bytesPerSample * outNumChannels, true);\n  // block align (channel count * bytes per sample)\n  view.setUint16(32, bytesPerSample * outNumChannels, true);\n  // bits per sample\n  view.setUint16(34, bitDepth, true);\n  // data chunk identifier 'data'\n  view.setUint32(36, 1684108385, false);\n}\n\nfunction encodeWAV(samples) {\n  const buffer = new ArrayBuffer(44 + (samples.length * 2));\n  const view = new DataView(buffer);\n\n  addHeader(view, samples.length);\n  floatTo16BitPCM(view, 44, samples);\n\n  return view;\n}\n\nfunction downsampleTrimBuffer(buffer, rate) {\n  if (rate === options.sampleRate) {\n    return buffer;\n  }\n\n  const length = buffer.length;\n  const sampleRateRatio = options.sampleRate / rate;\n  const newLength = Math.round(length / sampleRateRatio);\n\n  const result = new Float32Array(newLength);\n  let offsetResult = 0;\n  let offsetBuffer = 0;\n  let firstNonQuiet = 0;\n  let lastNonQuiet = length;\n  while (offsetResult < result.length) {\n    const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);\n    let accum = 0;\n    let count = 0;\n    for (let i = offsetBuffer; (i < nextOffsetBuffer) && (i < length); i++) {\n      accum += buffer[i];\n      count++;\n    }\n    // mark first and last sample over the quiet threshold\n    if (accum > options.quietTrimThreshold) {\n      if (firstNonQuiet === 0) {\n        firstNonQuiet = offsetResult;\n      }\n      lastNonQuiet = offsetResult;\n    }\n    result[offsetResult] = accum / count;\n    offsetResult++;\n    offsetBuffer = nextOffsetBuffer;\n  }\n\n  /*\n  console.info('encoder trim size reduction',\n    (Math.min(newLength, lastNonQuiet + options.quietTrimSlackBack) -\n    Math.max(0, firstNonQuiet - options.quietTrimSlackBack)) / result.length\n  );\n  */\n  return (options.useTrim) ?\n    // slice based on quiet threshold and put slack back into the buffer\n    result.slice(\n      Math.max(0, firstNonQuiet - options.quietTrimSlackBack),\n      Math.min(newLength, lastNonQuiet + options.quietTrimSlackBack)\n    ) :\n    result;\n}\n\n\n/***/ })\n/******/ ]);\n//# sourceMappingURL=wav-worker.js.map", __webpack_require__.p + "bundle/wav-worker.js");
};

/***/ }),
/* 164 */
/***/ (function(module, exports) {

// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string

var URL = window.URL || window.webkitURL;
module.exports = function(content, url) {
  try {
    try {
      var blob;
      try { // BlobBuilder = Deprecated, but widely implemented
        var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
        blob = new BlobBuilder();
        blob.append(content);
        blob = blob.getBlob();
      } catch(e) { // The proposed API
        blob = new Blob([content]);
      }
      return new Worker(URL.createObjectURL(blob));
    } catch(e) {
      return new Worker('data:application/javascript,' + encodeURIComponent(content));
    }
  } catch(e) {
    if (!url) {
      throw Error('Inline worker is not supported');
    }
    return new Worker(url);
  }
}


/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);


/*
 Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/**
 * Vuex store recorder handlers
 */

/* eslint no-console: ["error", { allow: ["info", "warn", "error", "time", "timeEnd"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

var initRecorderHandlers = function initRecorderHandlers(context, recorder) {
  /* global Blob */

  recorder.onstart = function () {
    console.info('recorder start event triggered');
    console.time('recording time');
  };
  recorder.onstop = function () {
    context.dispatch('stopRecording');
    console.timeEnd('recording time');
    console.time('recording processing time');
    console.info('recorder stop event triggered');
  };
  recorder.onsilentrecording = function () {
    console.info('recorder silent recording triggered');
    context.commit('increaseSilentRecordingCount');
  };
  recorder.onunsilentrecording = function () {
    if (context.state.recState.silentRecordingCount > 0) {
      context.commit('resetSilentRecordingCount');
    }
  };
  recorder.onerror = function (e) {
    console.error('recorder onerror event triggered', e);
  };
  recorder.onstreamready = function () {
    console.info('recorder stream ready event triggered');
  };
  recorder.onmute = function () {
    console.info('recorder mute event triggered');
    context.commit('setIsMicMuted', true);
  };
  recorder.onunmute = function () {
    console.info('recorder unmute event triggered');
    context.commit('setIsMicMuted', false);
  };
  recorder.onquiet = function () {
    console.info('recorder quiet event triggered');
    context.commit('setIsMicQuiet', true);
  };
  recorder.onunquiet = function () {
    console.info('recorder unquiet event triggered');
    context.commit('setIsMicQuiet', false);
  };

  // TODO need to change recorder event setter so support
  // replacing handlers instead of adding
  recorder.ondataavailable = function (e) {
    var mimeType = recorder.mimeType;
    console.info('recorder data available event triggered');
    var audioBlob = new Blob([e.detail], { type: mimeType });
    // XXX not used for now since only encoding WAV format
    var offset = 0;
    // offset is only needed for opus encoded ogg files
    // extract the offset where the opus frames are found
    // leaving for future reference
    // https://tools.ietf.org/html/rfc7845
    // https://tools.ietf.org/html/rfc6716
    // https://www.xiph.org/ogg/doc/framing.html
    if (mimeType.startsWith('audio/ogg')) {
      offset = 125 + e.detail[125] + 1;
    }
    console.timeEnd('recording processing time');

    context.dispatch('lexPostContent', audioBlob, offset).then(function (lexAudioBlob) {
      if (context.state.recState.silentRecordingCount >= context.state.config.converser.silentConsecutiveRecordingMax) {
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject('Too many consecutive silent recordings: ' + (context.state.recState.silentRecordingCount + '.'));
      }
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.all([context.dispatch('getAudioUrl', audioBlob), context.dispatch('getAudioUrl', lexAudioBlob)]);
    }).then(function (audioUrls) {
      // handle being interrupted by text
      if (context.state.lex.dialogState !== 'Fulfilled' && !context.state.recState.isConversationGoing) {
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
      }

      var _audioUrls = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray___default()(audioUrls, 2),
          humanAudioUrl = _audioUrls[0],
          lexAudioUrl = _audioUrls[1];

      context.dispatch('pushMessage', {
        type: 'human',
        audio: humanAudioUrl,
        text: context.state.lex.inputTranscript
      });
      context.dispatch('pushMessage', {
        type: 'bot',
        audio: lexAudioUrl,
        text: context.state.lex.message,
        dialogState: context.state.lex.dialogState,
        responseCard: context.state.lex.responseCard
      });
      return context.dispatch('playAudio', lexAudioUrl, {}, offset);
    }).then(function () {
      if (['Fulfilled', 'ReadyForFulfillment', 'Failed'].indexOf(context.state.lex.dialogState) >= 0) {
        return context.dispatch('stopConversation').then(function () {
          return context.dispatch('reInitBot');
        });
      }

      if (context.state.recState.isConversationGoing) {
        return context.dispatch('startRecording');
      }
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
    }).catch(function (error) {
      console.error('converser error:', error);
      context.dispatch('stopConversation');
      context.dispatch('pushErrorMessage', 'I had an error. ' + error);
      context.commit('resetSilentRecordingCount');
    });
  };
};
/* harmony default export */ __webpack_exports__["a"] = (initRecorderHandlers);

/***/ }),
/* 166 */
/***/ (function(module, exports) {

module.exports = "data:audio/ogg;base64,T2dnUwACAAAAAAAAAADGYgAAAAAAADXh79kBHgF2b3JiaXMAAAAAAUSsAAAAAAAAAHcBAAAAAAC4AU9nZ1MAAAAAAAAAAAAAxmIAAAEAAAC79cpMEDv//////////////////8kDdm9yYmlzKwAAAFhpcGguT3JnIGxpYlZvcmJpcyBJIDIwMTIwMjAzIChPbW5pcHJlc2VudCkAAAAAAQV2b3JiaXMpQkNWAQAIAAAAMUwgxYDQkFUAABAAAGAkKQ6TZkkppZShKHmYlEhJKaWUxTCJmJSJxRhjjDHGGGOMMcYYY4wgNGQVAAAEAIAoCY6j5klqzjlnGCeOcqA5aU44pyAHilHgOQnC9SZjbqa0pmtuziklCA1ZBQAAAgBASCGFFFJIIYUUYoghhhhiiCGHHHLIIaeccgoqqKCCCjLIIINMMumkk0466aijjjrqKLTQQgsttNJKTDHVVmOuvQZdfHPOOeecc84555xzzglCQ1YBACAAAARCBhlkEEIIIYUUUogppphyCjLIgNCQVQAAIACAAAAAAEeRFEmxFMuxHM3RJE/yLFETNdEzRVNUTVVVVVV1XVd2Zdd2ddd2fVmYhVu4fVm4hVvYhV33hWEYhmEYhmEYhmH4fd/3fd/3fSA0ZBUAIAEAoCM5luMpoiIaouI5ogOEhqwCAGQAAAQAIAmSIimSo0mmZmquaZu2aKu2bcuyLMuyDISGrAIAAAEABAAAAAAAoGmapmmapmmapmmapmmapmmapmmaZlmWZVmWZVmWZVmWZVmWZVmWZVmWZVmWZVmWZVmWZVmWZVmWZVlAaMgqAEACAEDHcRzHcSRFUiTHciwHCA1ZBQDIAAAIAEBSLMVyNEdzNMdzPMdzPEd0RMmUTM30TA8IDVkFAAACAAgAAAAAAEAxHMVxHMnRJE9SLdNyNVdzPddzTdd1XVdVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVgdCQVQAABAAAIZ1mlmqACDOQYSA0ZBUAgAAAABihCEMMCA1ZBQAABAAAiKHkIJrQmvPNOQ6a5aCpFJvTwYlUmye5qZibc84555xszhnjnHPOKcqZxaCZ0JpzzkkMmqWgmdCac855EpsHranSmnPOGeecDsYZYZxzzmnSmgep2Vibc85Z0JrmqLkUm3POiZSbJ7W5VJtzzjnnnHPOOeecc86pXpzOwTnhnHPOidqba7kJXZxzzvlknO7NCeGcc84555xzzjnnnHPOCUJDVgEAQAAABGHYGMadgiB9jgZiFCGmIZMedI8Ok6AxyCmkHo2ORkqpg1BSGSeldILQkFUAACAAAIQQUkghhRRSSCGFFFJIIYYYYoghp5xyCiqopJKKKsoos8wyyyyzzDLLrMPOOuuwwxBDDDG00kosNdVWY4215p5zrjlIa6W11lorpZRSSimlIDRkFQAAAgBAIGSQQQYZhRRSSCGGmHLKKaegggoIDVkFAAACAAgAAADwJM8RHdERHdERHdERHdERHc/xHFESJVESJdEyLVMzPVVUVVd2bVmXddu3hV3Ydd/Xfd/XjV8XhmVZlmVZlmVZlmVZlmVZlmUJQkNWAQAgAAAAQgghhBRSSCGFlGKMMcecg05CCYHQkFUAACAAgAAAAABHcRTHkRzJkSRLsiRN0izN8jRP8zTRE0VRNE1TFV3RFXXTFmVTNl3TNWXTVWXVdmXZtmVbt31Ztn3f933f933f933f933f13UgNGQVACABAKAjOZIiKZIiOY7jSJIEhIasAgBkAAAEAKAojuI4jiNJkiRZkiZ5lmeJmqmZnumpogqEhqwCAAABAAQAAAAAAKBoiqeYiqeIiueIjiiJlmmJmqq5omzKruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6ruu6QGjIKgBAAgBAR3IkR3IkRVIkRXIkBwgNWQUAyAAACADAMRxDUiTHsixN8zRP8zTREz3RMz1VdEUXCA1ZBQAAAgAIAAAAAADAkAxLsRzN0SRRUi3VUjXVUi1VVD1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXVNE3TNIHQkJUAABkAACNBBhmEEIpykEJuPVgIMeYkBaE5BqHEGISnEDMMOQ0idJBBJz24kjnDDPPgUigVREyDjSU3jiANwqZcSeU4CEJDVgQAUQAAgDHIMcQYcs5JyaBEzjEJnZTIOSelk9JJKS2WGDMpJaYSY+Oco9JJyaSUGEuKnaQSY4mtAACAAAcAgAALodCQFQFAFAAAYgxSCimFlFLOKeaQUsox5RxSSjmnnFPOOQgdhMoxBp2DECmlHFPOKccchMxB5ZyD0EEoAAAgwAEAIMBCKDRkRQAQJwDgcCTPkzRLFCVLE0XPFGXXE03XlTTNNDVRVFXLE1XVVFXbFk1VtiVNE01N9FRVE0VVFVXTlk1VtW3PNGXZVFXdFlXVtmXbFn5XlnXfM01ZFlXV1k1VtXXXln1f1m1dmDTNNDVRVFVNFFXVVFXbNlXXtjVRdFVRVWVZVFVZdmVZ91VX1n1LFFXVU03ZFVVVtlXZ9W1Vln3hdFVdV2XZ91VZFn5b14Xh9n3hGFXV1k3X1XVVln1h1mVht3XfKGmaaWqiqKqaKKqqqaq2baqurVui6KqiqsqyZ6qurMqyr6uubOuaKKquqKqyLKqqLKuyrPuqLOu2qKq6rcqysJuuq+u27wvDLOu6cKqurquy7PuqLOu6revGceu6MHymKcumq+q6qbq6buu6ccy2bRyjquq+KsvCsMqy7+u6L7R1IVFVdd2UXeNXZVn3bV93nlv3hbJtO7+t+8px67rS+DnPbxy5tm0cs24bv637xvMrP2E4jqVnmrZtqqqtm6qr67JuK8Os60JRVX1dlWXfN11ZF27fN45b142iquq6Ksu+sMqyMdzGbxy7MBxd2zaOW9edsq0LfWPI9wnPa9vGcfs64/Z1o68MCcePAACAAQcAgAATykChISsCgDgBAAYh5xRTECrFIHQQUuogpFQxBiFzTkrFHJRQSmohlNQqxiBUjknInJMSSmgplNJSB6GlUEproZTWUmuxptRi7SCkFkppLZTSWmqpxtRajBFjEDLnpGTOSQmltBZKaS1zTkrnoKQOQkqlpBRLSi1WzEnJoKPSQUippBJTSam1UEprpaQWS0oxthRbbjHWHEppLaQSW0kpxhRTbS3GmiPGIGTOScmckxJKaS2U0lrlmJQOQkqZg5JKSq2VklLMnJPSQUipg45KSSm2kkpMoZTWSkqxhVJabDHWnFJsNZTSWkkpxpJKbC3GWltMtXUQWgultBZKaa21VmtqrcZQSmslpRhLSrG1FmtuMeYaSmmtpBJbSanFFluOLcaaU2s1ptZqbjHmGlttPdaac0qt1tRSjS3GmmNtvdWae+8gpBZKaS2U0mJqLcbWYq2hlNZKKrGVklpsMebaWow5lNJiSanFklKMLcaaW2y5ppZqbDHmmlKLtebac2w19tRarC3GmlNLtdZac4+59VYAAMCAAwBAgAlloNCQlQBAFAAAQYhSzklpEHLMOSoJQsw5J6lyTEIpKVXMQQgltc45KSnF1jkIJaUWSyotxVZrKSm1FmstAACgwAEAIMAGTYnFAQoNWQkARAEAIMYgxBiEBhmlGIPQGKQUYxAipRhzTkqlFGPOSckYcw5CKhljzkEoKYRQSiophRBKSSWlAgAAChwAAAJs0JRYHKDQkBUBQBQAAGAMYgwxhiB0VDIqEYRMSiepgRBaC6111lJrpcXMWmqttNhACK2F1jJLJcbUWmatxJhaKwAA7MABAOzAQig0ZCUAkAcAQBijFGPOOWcQYsw56Bw0CDHmHIQOKsacgw5CCBVjzkEIIYTMOQghhBBC5hyEEEIIoYMQQgillNJBCCGEUkrpIIQQQimldBBCCKGUUgoAACpwAAAIsFFkc4KRoEJDVgIAeQAAgDFKOQehlEYpxiCUklKjFGMQSkmpcgxCKSnFVjkHoZSUWuwglNJabDV2EEppLcZaQ0qtxVhrriGl1mKsNdfUWoy15pprSi3GWmvNuQAA3AUHALADG0U2JxgJKjRkJQCQBwCAIKQUY4wxhhRiijHnnEMIKcWYc84pphhzzjnnlGKMOeecc4wx55xzzjnGmHPOOeccc84555xzjjnnnHPOOeecc84555xzzjnnnHPOCQAAKnAAAAiwUWRzgpGgQkNWAgCpAAAAEVZijDHGGBsIMcYYY4wxRhJijDHGGGNsMcYYY4wxxphijDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYW2uttdZaa6211lprrbXWWmutAEC/CgcA/wcbVkc4KRoLLDRkJQAQDgAAGMOYc445Bh2EhinopIQOQgihQ0o5KCWEUEopKXNOSkqlpJRaSplzUlIqJaWWUuogpNRaSi211loHJaXWUmqttdY6CKW01FprrbXYQUgppdZaiy3GUEpKrbXYYow1hlJSaq3F2GKsMaTSUmwtxhhjrKGU1lprMcYYay0ptdZijLXGWmtJqbXWYos11loLAOBucACASLBxhpWks8LR4EJDVgIAIQEABEKMOeeccxBCCCFSijHnoIMQQgghREox5hx0EEIIIYSMMeeggxBCCCGEkDHmHHQQQgghhBA65xyEEEIIoYRSSuccdBBCCCGUUELpIIQQQgihhFJKKR2EEEIooYRSSiklhBBCCaWUUkoppYQQQgihhBJKKaWUEEIIpZRSSimllBJCCCGUUkoppZRSQgihlFBKKaWUUkoIIYRSSimllFJKCSGEUEoppZRSSikhhBJKKaWUUkoppQAAgAMHAIAAI+gko8oibDThwgNQaMhKAIAMAABx2GrrKdbIIMWchJZLhJByEGIuEVKKOUexZUgZxRjVlDGlFFNSa+icYoxRT51jSjHDrJRWSiiRgtJyrLV2zAEAACAIADAQITOBQAEUGMgAgAOEBCkAoLDA0DFcBATkEjIKDArHhHPSaQMAEITIDJGIWAwSE6qBomI6AFhcYMgHgAyNjbSLC+gywAVd3HUghCAEIYjFARSQgIMTbnjiDU+4wQk6RaUOAgAAAAAAAQAeAACSDSAiIpo5jg6PD5AQkRGSEpMTlAAAAAAA4AGADwCAJAWIiIhmjqPD4wMkRGSEpMTkBCUAAAAAAAAAAAAICAgAAAAAAAQAAAAICE9nZ1MABE8EAAAAAAAAxmIAAAIAAAAVfZeWAwEBAQAKDg=="

/***/ }),
/* 167 */
/***/ (function(module, exports) {

module.exports = "data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA//////////////////////////////////////////////////////////////////8AAAA8TEFNRTMuOTlyBK8AAAAAAAAAADUgJAJxQQABzAAAAnEsm4LsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAABgAAB/gAAACBLAGZ8AAAEAOAAAHG7///////////qWy3+NQOB//////////+RTEFNRTMuOTkuM1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xDEIAOAAAH+AAAAICwAJQwAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ=="

/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);



/*
 Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Amazon Software License (the "License"). You may not use this file
 except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/asl/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS"
 BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
 License for the specific language governing permissions and limitations under the License.
 */

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

var _class = function () {
  function _class(_ref) {
    var botName = _ref.botName,
        _ref$botAlias = _ref.botAlias,
        botAlias = _ref$botAlias === undefined ? '$LATEST' : _ref$botAlias,
        userId = _ref.userId,
        lexRuntimeClient = _ref.lexRuntimeClient;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, _class);

    if (!botName || !lexRuntimeClient) {
      throw new Error('invalid lex client constructor arguments');
    }

    this.botName = botName;
    this.botAlias = botAlias;
    this.userId = userId || 'lex-web-ui-' + ('' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1));

    this.lexRuntimeClient = lexRuntimeClient;
    this.credentials = this.lexRuntimeClient.config.credentials;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(_class, [{
    key: 'initCredentials',
    value: function initCredentials(credentials) {
      this.credentials = credentials;
      this.lexRuntimeClient.config.credentials = this.credentials;
      this.userId = credentials.identityId ? credentials.identityId : this.userId;
    }
  }, {
    key: 'postText',
    value: function postText(inputText) {
      var sessionAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var postTextReq = this.lexRuntimeClient.postText({
        botAlias: this.botAlias,
        botName: this.botName,
        userId: this.userId,
        inputText: inputText,
        sessionAttributes: sessionAttributes
      });
      return this.credentials.getPromise().then(function () {
        return postTextReq.promise();
      });
    }
  }, {
    key: 'postContent',
    value: function postContent(blob) {
      var sessionAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var acceptFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'audio/ogg';
      var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      var mediaType = blob.type;
      var contentType = mediaType;

      if (mediaType.startsWith('audio/wav')) {
        contentType = 'audio/x-l16; sample-rate=16000; channel-count=1';
      } else if (mediaType.startsWith('audio/ogg')) {
        contentType = 'audio/x-cbr-opus-with-preamble; bit-rate=32000;' + (' frame-size-milliseconds=20; preamble-size=' + offset);
      } else {
        console.warn('unknown media type in lex client');
      }

      var postContentReq = this.lexRuntimeClient.postContent({
        accept: acceptFormat,
        botAlias: this.botAlias,
        botName: this.botName,
        userId: this.userId,
        contentType: contentType,
        inputStream: blob,
        sessionAttributes: sessionAttributes
      });

      return this.credentials.getPromise().then(function () {
        return postContentReq.promise();
      });
    }
  }]);

  return _class;
}();

/* harmony default export */ __webpack_exports__["a"] = (_class);

/***/ })
/******/ ]);
});
//# sourceMappingURL=lex-web-ui.js.map