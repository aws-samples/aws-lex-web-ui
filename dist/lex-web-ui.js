(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"), require("vuex"), require("aws-sdk/global"), require("aws-sdk/clients/lexruntime"), require("aws-sdk/clients/polly"));
	else if(typeof define === 'function' && define.amd)
		define(["vue", "vuex", "aws-sdk/global", "aws-sdk/clients/lexruntime", "aws-sdk/clients/polly"], factory);
	else if(typeof exports === 'object')
		exports["LexWebUi"] = factory(require("vue"), require("vuex"), require("aws-sdk/global"), require("aws-sdk/clients/lexruntime"), require("aws-sdk/clients/polly"));
	else
		root["LexWebUi"] = factory(root["vue"], root["vuex"], root["aws-sdk/global"], root["aws-sdk/clients/lexruntime"], root["aws-sdk/clients/polly"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_100__, __WEBPACK_EXTERNAL_MODULE_101__, __WEBPACK_EXTERNAL_MODULE_102__, __WEBPACK_EXTERNAL_MODULE_103__, __WEBPACK_EXTERNAL_MODULE_104__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 75);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(34)('wks');
var uid = __webpack_require__(22);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var ctx = __webpack_require__(16);
var hide = __webpack_require__(8);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
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
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(47);
var toPrimitive = __webpack_require__(29);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
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
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
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
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
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

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(17);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(49);
var defined = __webpack_require__(30);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(46);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(21);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(48);
var enumBugKeys = __webpack_require__(35);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(84)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(51)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(30);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f;
var has = __webpack_require__(10);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(88);
var global = __webpack_require__(2);
var hide = __webpack_require__(8);
var Iterators = __webpack_require__(14);
var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(9);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(32);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(34)('keys');
var uid = __webpack_require__(22);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 36 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(19);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(39);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(14);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(21);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 42 */
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(25);
var wksExt = __webpack_require__(43);
var defineProperty = __webpack_require__(4).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = mergeConfig;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_defineProperty__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray__);





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

// get env shortname to require file
var envShortName = ['dev', 'prod', 'test'].find(function (env) {
  return "production".startsWith(env);
});

if (!envShortName) {
  console.error('unknown environment in config: ', "production");
}

// eslint-disable-next-line import/no-dynamic-require
var configEnvFile = __webpack_require__(162)("./config." + envShortName + '.json');

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

    // TODO move this config fields to converser
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
    // TODO may want to move pageTitle out to LexApp or Page component
    // title of HTML page added dynamically to index.html
    pageTitle: 'Order Flowers Bot',

    // when running as an embedded iframe, this will be used as the
    // be the parent origin used to send/receive messages
    // NOTE: this is also a security control
    // this parameter should not be dynamically overriden
    // avoid making it '*'
    // if left as an empty string, it will be set to window.location.window
    // to allow runing embedded in a single origin setup
    parentOrigin: null,

    // chat window text placeholder
    textInputPlaceholder: 'Type here or click on the mic',

    toolbarColor: 'red',

    // chat window title
    toolbarTitle: 'Order Flowers',

    // logo used in toolbar - also used as favicon not specificied
    toolbarLogo: '',

    // fav icon
    favIcon: '',

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
    stripTagsFromBotMessages: true,

    // controls whether detailed error messages are shown in bot responses
    showErrorDetails: false,

    // show date when message was received on buble focus/selection
    showMessageDate: true,

    // bot avatar image URL
    avatarImageUrl: '',

    // Allows lex messages with session attribute
    // altMessageFormat="html" to be rendered as html in the message
    // Enabling this feature increases the risk of XSS.
    // Make sure that the HTML message has been properly
    // escaped/encoded/filtered in the Lambda function
    // https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)
    AllowSuperDangerousHTMLInMessage: false
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
    useAutoMuteDetect: false,

    // use a bandpass filter on mic input
    useBandPass: false,

    // trim low volume samples at beginning and end of recordings
    encoderUseTrim: false
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
      var _param = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_slicedToArray___default()(param, 2),
          key = _param[0],
          _param$ = _param[1],
          value = _param$ === undefined ? true : _param$;

      var paramObj = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_defineProperty___default()({}, key, decodeURIComponent(value));
      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, queryObj, paramObj);
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
 * The merge process takes the base config as the source for keys to be merged.
 * The values in srcConfig take precedence in the merge.
 *
 * If deep is set to false (default), a shallow merge is done down to the
 * second level of the object. Object values under the second level fully
 * overwrite the base. For example, srcConfig.lex.sessionAttributes overwrite
 * the base as an object.
 *
 * If deep is set to true, the merge is done recursively in both directions.
 */
function mergeConfig(baseConfig, srcConfig) {
  var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  function mergeValue(base, src, key, shouldMergeDeep) {
    // nothing to merge as the base key is not found in the src
    if (!(key in src)) {
      return base[key];
    }

    // deep merge in both directions using recursion
    if (shouldMergeDeep && __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(base[key]) === 'object') {
      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, mergeConfig(src[key], base[key], shouldMergeDeep), mergeConfig(base[key], src[key], shouldMergeDeep));
    }

    // shallow merge key/values
    // overriding the base values with the ones from the source
    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(base[key]) === 'object' ? __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, base[key], src[key]) : src[key];
  }

  // use the baseConfig first level keys as the base for merging
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(baseConfig).map(function (key) {
    var value = mergeValue(baseConfig, srcConfig, key, deep);
    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_defineProperty___default()({}, key, value);
  })
  // merge key values back into a single object
  .reduce(function (merged, configItem) {
    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, merged, configItem);
  }, {});
}

// merge build time parameters
var configFromFiles = mergeConfig(configDefault, configEnvFile);

// TODO move query config to a store action
// run time config from url query parameter
var queryParams = getUrlQueryParams(window.location.href);
var configFromQuery = getConfigFromQuery(queryParams);
// security: delete origin from dynamic parameter
if (configFromQuery.ui && configFromQuery.ui.parentOrigin) {
  delete configFromQuery.ui.parentOrigin;
}

var configFromMerge = mergeConfig(configFromFiles, configFromQuery);

var config = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, configFromMerge, {
  urlQueryParams: queryParams
});

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(28)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(10);
var toIObject = __webpack_require__(12);
var arrayIndexOf = __webpack_require__(79)(false);
var IE_PROTO = __webpack_require__(33)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(19);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {



/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(25);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(52);
var hide = __webpack_require__(8);
var has = __webpack_require__(10);
var Iterators = __webpack_require__(14);
var $iterCreate = __webpack_require__(85);
var setToStringTag = __webpack_require__(26);
var getPrototypeOf = __webpack_require__(87);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(5);
var dPs = __webpack_require__(86);
var enumBugKeys = __webpack_require__(35);
var IE_PROTO = __webpack_require__(33)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(28)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(54).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(5);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(14);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(5);
var aFunction = __webpack_require__(21);
var SPECIES = __webpack_require__(1)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(16);
var invoke = __webpack_require__(94);
var html = __webpack_require__(54);
var cel = __webpack_require__(28);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(19)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var isObject = __webpack_require__(9);
var newPromiseCapability = __webpack_require__(41);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_ToolbarContainer__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_MessageList__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_InputContainer__ = __webpack_require__(134);


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

/* eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'lex-web',
  components: {
    ToolbarContainer: __WEBPACK_IMPORTED_MODULE_2__components_ToolbarContainer__["a" /* default */],
    MessageList: __WEBPACK_IMPORTED_MODULE_3__components_MessageList__["a" /* default */],
    InputContainer: __WEBPACK_IMPORTED_MODULE_4__components_InputContainer__["a" /* default */]
  },
  computed: {
    initialSpeechInstruction: function initialSpeechInstruction() {
      return this.$store.state.config.lex.initialSpeechInstruction;
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
    },
    lexState: function lexState() {
      return this.$store.state.lex;
    },
    isMobile: function isMobile() {
      var mobileResolution = 900;
      return this.$vuetify.breakpoint.smAndDown && 'navigator' in window && navigator.maxTouchPoints > 0 && 'screen' in window && (window.screen.height < mobileResolution || window.screen.width < mobileResolution);
    }
  },
  watch: {
    // emit lex state on changes
    lexState: function lexState() {
      this.$emit('updateLexState', this.lexState);
    }
  },
  created: function created() {
    var _this = this;

    // override default vuetify vertical overflow on non-mobile devices
    // hide vertical scrollbars
    if (!this.isMobile) {
      document.documentElement.style.overflowY = 'hidden';
    }

    this.initConfig().then(function () {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.all([_this.$store.dispatch('initCredentials', _this.$lexWebUi.awsConfig.credentials), _this.$store.dispatch('initRecorder'), _this.$store.dispatch('initBotAudio', window.Audio ? new Audio() : null)]);
    }).then(function () {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.all([_this.$store.dispatch('initMessageList'), _this.$store.dispatch('initPollyClient', _this.$lexWebUi.pollyClient), _this.$store.dispatch('initLexClient', _this.$lexWebUi.lexRuntimeClient)]);
    }).then(function () {
      return _this.$store.state.isRunningEmbedded ? _this.$store.dispatch('sendMessageToParentWindow', { event: 'ready' }) : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
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
      if (!evt.ports || !Array.isArray(evt.ports) || !evt.ports.length) {
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
            return evt.ports[0].postMessage({
              event: 'resolve', type: evt.data.event
            });
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
            return evt.ports[0].postMessage({
              event: 'resolve', type: evt.data.event
            });
          });
          break;
        default:
          console.warn('unknown message in messageHanlder', evt);
          break;
      }
    },
    logRunningMode: function logRunningMode() {
      if (!this.$store.state.isRunningEmbedded) {
        console.info('running in standalone mode');
        return;
      }

      console.info('running in embedded mode from URL: ', document.location.href);
      console.info('referrer (possible parent) URL: ', document.referrer);
      console.info('config parentOrigin:', this.$store.state.config.ui.parentOrigin);
      if (!document.referrer.startsWith(this.$store.state.config.ui.parentOrigin)) {
        console.warn('referrer origin: [%s] does not match configured parent origin: [%s]', document.referrer, this.$store.state.config.ui.parentOrigin);
      }
    },
    initConfig: function initConfig() {
      var _this2 = this;

      if (this.$store.state.config.urlQueryParams.lexWebUiEmbed !== 'true') {
        this.$store.commit('setIsRunningEmbedded', false);
        this.$store.commit('setAwsCredsProvider', 'cognito');
      } else {
        window.addEventListener('message', this.messageHandler, false);
        this.$store.commit('setIsRunningEmbedded', true);
        this.$store.commit('setAwsCredsProvider', 'parentWindow');
      }

      // get config
      return this.$store.dispatch('initConfig', this.$lexWebUi.config).then(function () {
        return _this2.$store.dispatch('getConfigFromParent');
      })
      // avoid merging an empty config
      .then(function (config) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(config).length ? _this2.$store.dispatch('initConfig', config) : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
      }).then(function () {
        return _this2.logRunningMode();
      });
    }
  }
});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 64 */
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
  data: function data() {
    return {
      shouldShowTooltip: false,
      tooltipEventHandlers: {
        mouseenter: this.onInputButtonHoverEnter,
        mouseleave: this.onInputButtonHoverLeave,
        touchstart: this.onInputButtonHoverEnter,
        touchend: this.onInputButtonHoverLeave,
        touchcancel: this.onInputButtonHoverLeave
      }
    };
  },

  props: ['toolbarTitle', 'toolbarColor', 'toolbarLogo', 'isUiMinimized'],
  computed: {
    toolTipMinimize: function toolTipMinimize() {
      return this.isUiMinimized ? 'maximize' : 'minimize';
    }
  },
  methods: {
    onInputButtonHoverEnter: function onInputButtonHoverEnter() {
      this.shouldShowTooltip = true;
    },
    onInputButtonHoverLeave: function onInputButtonHoverLeave() {
      this.shouldShowTooltip = false;
    },
    toggleMinimize: function toggleMinimize() {
      this.onInputButtonHoverLeave();
      this.$emit('toggleMinimizeUi');
    }
  }
});

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Message__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MessageLoading__ = __webpack_require__(130);
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
  name: 'message-list',
  components: {
    Message: __WEBPACK_IMPORTED_MODULE_0__Message__["a" /* default */],
    MessageLoading: __WEBPACK_IMPORTED_MODULE_1__MessageLoading__["a" /* default */]
  },
  computed: {
    messages: function messages() {
      return this.$store.state.messages;
    },
    loading: function loading() {
      return this.$store.state.lex.isProcessing;
    }
  },
  watch: {
    // autoscroll message list to the bottom when messages change
    messages: function messages() {
      this.scrollDown();
    }
  },
  methods: {
    scrollDown: function scrollDown() {
      var _this = this;

      return this.$nextTick(function () {
        _this.$el.scrollTop = _this.$el.scrollHeight;
      });
    }
  }
});

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MessageText__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ResponseCard__ = __webpack_require__(126);
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
  name: 'message',
  props: ['message'],
  components: {
    MessageText: __WEBPACK_IMPORTED_MODULE_0__MessageText__["a" /* default */],
    ResponseCard: __WEBPACK_IMPORTED_MODULE_1__ResponseCard__["a" /* default */]
  },
  data: function data() {
    return {
      isMessageFocused: false,
      messageHumanDate: 'Now'
    };
  },

  computed: {
    botDialogState: function botDialogState() {
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
    botAvatarUrl: function botAvatarUrl() {
      return this.$store.state.config.ui.avatarImageUrl;
    },
    shouldDisplayResponseCard: function shouldDisplayResponseCard() {
      return this.message.responseCard && (this.message.responseCard.version === '1' || this.message.responseCard.version === 1) && this.message.responseCard.contentType === 'application/vnd.amazonaws.card.generic' && 'genericAttachments' in this.message.responseCard && this.message.responseCard.genericAttachments instanceof Array;
    },
    shouldShowAvatarImage: function shouldShowAvatarImage() {
      return this.message.type === 'bot' && this.botAvatarUrl;
    },
    botAvatarBackground: function botAvatarBackground() {
      return {
        background: 'url(' + this.botAvatarUrl + ') center center / contain no-repeat'
      };
    },
    shouldShowMessageDate: function shouldShowMessageDate() {
      return this.$store.state.config.ui.showMessageDate;
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
    },
    onMessageFocus: function onMessageFocus() {
      if (!this.shouldShowMessageDate) {
        return;
      }
      this.messageHumanDate = this.getMessageHumanDate();
      this.isMessageFocused = true;
      if (this.message.id === this.$store.state.messages.length - 1) {
        this.$emit('scrollDown');
      }
    },
    onMessageBlur: function onMessageBlur() {
      if (!this.shouldShowMessageDate) {
        return;
      }
      this.isMessageFocused = false;
    },
    getMessageHumanDate: function getMessageHumanDate() {
      var dateDiff = Math.round((new Date() - this.message.date) / 1000);
      var secsInHr = 3600;
      var secsInDay = secsInHr * 24;
      if (dateDiff < 60) {
        return 'Now';
      } else if (dateDiff < secsInHr) {
        return Math.floor(dateDiff / 60) + ' min';
      } else if (dateDiff < secsInDay) {
        return this.message.date.toLocaleTimeString();
      }
      return this.message.date.toLocaleString();
    }
  }
});

/***/ }),
/* 67 */
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

/*
Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License"). You may not use this file
except in compliance with the License. A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed on an "AS IS"
BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the
License for the specific language governing permissions and limitations under the License.
*/
var _require = __webpack_require__(118),
    markdown = _require.markdown;

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
    AllowSuperDangerousHTMLInMessage: function AllowSuperDangerousHTMLInMessage() {
      return this.$store.state.config.ui.AllowSuperDangerousHTMLInMessage;
    },
    altHtmlMessage: function altHtmlMessage() {
      var appContext = this.$store.state.lex.sessionAttributes.appContext;

      var out = false;
      if (appContext) {
        var alts = JSON.parse(appContext).altMessages || {};
        if (alts.html) {
          out = alts.html;
        } else if (alts.markdown) {
          out = markdown.toHTML(alts.markdown);
        }
      }
      return out;
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
          // splits the message into an array containing content chunks
          // and links. Content chunks will be the even indexed items in the
          // array (or empty string when applicable).
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
/* 68 */
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
/* 69 */
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
  name: 'messageLoading',
  data: function data() {
    return {
      progress: '.'
    };
  },

  computed: {},
  methods: {},
  created: function created() {
    var _this = this;

    this.interval = setInterval(function () {
      if (_this.progress.length > 2) {
        _this.progress = '.';
      } else {
        _this.progress += '.';
      }
    }, 500);
  },
  destroyed: function destroyed() {
    clearInterval(this.interval);
  }
});

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_RecorderStatus__ = __webpack_require__(136);

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
      textInput: '',
      isTextFieldFocused: false,
      shouldShowTooltip: false,
      // workaround: vuetify tooltips doesn't seem to support touch events
      tooltipEventHandlers: {
        mouseenter: this.onInputButtonHoverEnter,
        mouseleave: this.onInputButtonHoverLeave,
        touchstart: this.onInputButtonHoverEnter,
        touchend: this.onInputButtonHoverLeave,
        touchcancel: this.onInputButtonHoverLeave
      }
    };
  },

  props: ['textInputPlaceholder', 'initialSpeechInstruction'],
  components: {
    RecorderStatus: __WEBPACK_IMPORTED_MODULE_1__components_RecorderStatus__["a" /* default */]
  },
  computed: {
    isBotSpeaking: function isBotSpeaking() {
      return this.$store.state.botAudio.isSpeaking;
    },
    isSpeechConversationGoing: function isSpeechConversationGoing() {
      return this.$store.state.recState.isConversationGoing;
    },
    isMicButtonDisabled: function isMicButtonDisabled() {
      return this.isMicMuted;
    },
    isMicMuted: function isMicMuted() {
      return this.$store.state.recState.isMicMuted;
    },
    isRecorderSupported: function isRecorderSupported() {
      return this.$store.state.recState.isRecorderSupported;
    },
    isRecorderEnabled: function isRecorderEnabled() {
      return this.$store.state.recState.isRecorderEnabled;
    },
    isSendButtonDisabled: function isSendButtonDisabled() {
      return this.textInput.length < 1;
    },
    micButtonIcon: function micButtonIcon() {
      if (this.isMicMuted) {
        return 'mic_off';
      }
      if (this.isBotSpeaking || this.isSpeechConversationGoing) {
        return 'stop';
      }
      return 'mic';
    },
    inputButtonTooltip: function inputButtonTooltip() {
      if (this.shouldShowSendButton) {
        return 'send';
      }
      if (this.isMicMuted) {
        return 'mic seems to be muted';
      }
      if (this.isBotSpeaking || this.isSpeechConversationGoing) {
        return 'interrupt';
      }
      return 'click to use voice';
    },
    shouldShowSendButton: function shouldShowSendButton() {
      return this.textInput.length && this.isTextFieldFocused || !this.isRecorderSupported || !this.isRecorderEnabled;
    },
    shouldShowTextInput: function shouldShowTextInput() {
      return !(this.isBotSpeaking || this.isSpeechConversationGoing);
    }
  },
  methods: {
    onInputButtonHoverEnter: function onInputButtonHoverEnter() {
      this.shouldShowTooltip = true;
    },
    onInputButtonHoverLeave: function onInputButtonHoverLeave() {
      this.shouldShowTooltip = false;
    },
    onMicClick: function onMicClick() {
      this.onInputButtonHoverLeave();
      if (this.isBotSpeaking || this.isSpeechConversationGoing) {
        return this.$store.dispatch('interruptSpeechConversation');
      }
      if (!this.isSpeechConversationGoing) {
        return this.startSpeechConversation();
      }

      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve();
    },
    onTextFieldFocus: function onTextFieldFocus() {
      this.isTextFieldFocused = true;
    },
    onTextFieldBlur: function onTextFieldBlur() {
      if (!this.textInput.length && this.isTextFieldFocused) {
        this.isTextFieldFocused = false;
      }
    },
    playInitialInstruction: function playInitialInstruction() {
      var _this = this;

      var isInitialState = ['', 'Fulfilled', 'Failed'].some(function (initialState) {
        return _this.$store.state.lex.dialogState === initialState;
      });

      return isInitialState ? this.$store.dispatch('pollySynthesizeSpeech', this.initialSpeechInstruction) : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve();
    },
    postTextMessage: function postTextMessage() {
      var _this2 = this;

      this.onInputButtonHoverLeave();
      this.textInput = this.textInput.trim();
      // empty string
      if (!this.textInput.length) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve();
      }

      var message = {
        type: 'human',
        text: this.textInput
      };

      return this.$store.dispatch('postTextMessage', message).then(function () {
        _this2.textInput = '';
      });
    },
    startSpeechConversation: function startSpeechConversation() {
      var _this3 = this;

      if (this.isMicMuted) {
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve();
      }
      return this.setAutoPlay().then(function () {
        return _this3.playInitialInstruction();
      }).then(function () {
        return _this3.$store.dispatch('startConversation');
      }).catch(function (error) {
        console.error('error in startSpeechConversation', error);
        var errorMessage = _this3.$store.state.config.ui.showErrorDetails ? ' ' + error : '';

        _this3.$store.dispatch('pushErrorMessage', "Sorry, I couldn't start the conversation. Please try again." + ('' + errorMessage));
      });
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
/* 71 */
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
  name: 'recorder-status',
  data: function data() {
    return {
      volume: 0,
      volumeIntervalId: null,
      audioPlayPercent: 0,
      audioIntervalId: null
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
        return 'Click on the mic';
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
    isInterrupting: function isInterrupting() {
      return this.$store.state.recState.isInterrupting || this.$store.state.botAudio.isInterrupting;
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

      var intervalTimeInMs = 50;
      this.volumeIntervalId = setInterval(function () {
        _this.$store.dispatch('getRecorderVolume').then(function (volume) {
          _this.volume = volume.instant.toFixed(4);
        });
      }, intervalTimeInMs);
    },
    leaveMeter: function leaveMeter() {
      if (this.volumeIntervalId) {
        clearInterval(this.volumeIntervalId);
      }
    },
    enterAudioPlay: function enterAudioPlay() {
      var _this2 = this;

      var intervalTimeInMs = 20;
      this.audioIntervalId = setInterval(function () {
        _this2.$store.dispatch('getAudioProperties').then(function (_ref) {
          var _ref$end = _ref.end,
              end = _ref$end === undefined ? 0 : _ref$end,
              _ref$duration = _ref.duration,
              duration = _ref$duration === undefined ? 0 : _ref$duration;

          var percent = duration <= 0 ? 0 : end / duration * 100;
          _this2.audioPlayPercent = Math.ceil(percent / 10) * 10 + 5;
        });
      }, intervalTimeInMs);
    },
    leaveAudioPlay: function leaveAudioPlay() {
      if (this.audioIntervalId) {
        this.audioPlayPercent = 0;
        clearInterval(this.audioIntervalId);
      }
    }
  }
});

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(48);
var hiddenKeys = __webpack_require__(35).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(156);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(159);

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
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(38);

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
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Plugin", function() { return Plugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loader", function() { return Loader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_define_property__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuex__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_vuex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_aws_sdk_global__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_aws_sdk_global___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_aws_sdk_global__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_aws_sdk_clients_lexruntime__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_aws_sdk_clients_lexruntime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_aws_sdk_clients_lexruntime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_aws_sdk_clients_polly__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_aws_sdk_clients_polly___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_aws_sdk_clients_polly__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_LexWeb__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__store__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__config__ = __webpack_require__(45);




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
  template: '<lex-web v-on="$listeners"></lex-web>',
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

    if (name in VueConstructor) {
      console.warn('plugin should only be used once');
    }
    // values to be added to custom vue property
    var value = {
      config: config,
      awsConfig: awsConfig,
      lexRuntimeClient: lexRuntimeClient,
      pollyClient: pollyClient
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
var Loader = function Loader() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Loader);

  var mergedConfig = Object(__WEBPACK_IMPORTED_MODULE_11__config__["b" /* mergeConfig */])(__WEBPACK_IMPORTED_MODULE_11__config__["a" /* config */], config);

  var VueConstructor = window.Vue ? window.Vue : __WEBPACK_IMPORTED_MODULE_4_vue___default.a;
  if (!VueConstructor) {
    throw new Error('unable to find Vue');
  }

  var VuexConstructor = window.Vuex ? window.Vuex : __WEBPACK_IMPORTED_MODULE_5_vuex___default.a;
  if (!VuexConstructor) {
    throw new Error('unable to find Vuex');
  }

  var AWSConfigConstructor = window.AWS && window.AWS.Config ? window.AWS.Config : __WEBPACK_IMPORTED_MODULE_6_aws_sdk_global__["Config"];

  var CognitoConstructor = window.AWS && window.AWS.CognitoIdentityCredentials ? window.AWS.CognitoIdentityCredentials : __WEBPACK_IMPORTED_MODULE_6_aws_sdk_global__["CognitoIdentityCredentials"];

  var PollyConstructor = window.AWS && window.AWS.Polly ? window.AWS.Polly : __WEBPACK_IMPORTED_MODULE_8_aws_sdk_clients_polly___default.a;

  var LexRuntimeConstructor = window.AWS && window.AWS.LexRuntime ? window.AWS.LexRuntime : __WEBPACK_IMPORTED_MODULE_7_aws_sdk_clients_lexruntime___default.a;

  if (!AWSConfigConstructor || !CognitoConstructor || !PollyConstructor || !LexRuntimeConstructor) {
    throw new Error('unable to find AWS SDK');
  }

  var credentials = new CognitoConstructor({ IdentityPoolId: mergedConfig.cognito.poolId }, { region: mergedConfig.region || 'us-east-1' });

  var awsConfig = new AWSConfigConstructor({
    region: mergedConfig.region || 'us-east-1',
    credentials: credentials
  });

  var lexRuntimeClient = new LexRuntimeConstructor(awsConfig);
  var pollyClient = typeof mergedConfig.recorder === 'undefined' || mergedConfig.recorder && mergedConfig.recorder.enable !== false ? new PollyConstructor(awsConfig) : null;

  // TODO name space store
  this.store = new VuexConstructor.Store(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_10__store__["a" /* default */]));

  VueConstructor.use(Plugin, {
    config: mergedConfig,
    awsConfig: awsConfig,
    lexRuntimeClient: lexRuntimeClient,
    pollyClient: pollyClient
  });
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(77);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(78) });


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(18);
var gOPS = __webpack_require__(36);
var pIE = __webpack_require__(23);
var toObject = __webpack_require__(24);
var IObject = __webpack_require__(49);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(11)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12);
var toLength = __webpack_require__(31);
var toAbsoluteIndex = __webpack_require__(80);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(82);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(4).f });


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50);
__webpack_require__(20);
__webpack_require__(27);
__webpack_require__(91);
__webpack_require__(98);
__webpack_require__(99);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32);
var defined = __webpack_require__(30);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(53);
var descriptor = __webpack_require__(17);
var setToStringTag = __webpack_require__(26);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(8)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var anObject = __webpack_require__(5);
var getKeys = __webpack_require__(18);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(10);
var toObject = __webpack_require__(24);
var IE_PROTO = __webpack_require__(33)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(89);
var step = __webpack_require__(90);
var Iterators = __webpack_require__(14);
var toIObject = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(51)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(25);
var global = __webpack_require__(2);
var ctx = __webpack_require__(16);
var classof = __webpack_require__(39);
var $export = __webpack_require__(3);
var isObject = __webpack_require__(9);
var aFunction = __webpack_require__(21);
var anInstance = __webpack_require__(92);
var forOf = __webpack_require__(93);
var speciesConstructor = __webpack_require__(57);
var task = __webpack_require__(58).set;
var microtask = __webpack_require__(95)();
var newPromiseCapabilityModule = __webpack_require__(41);
var perform = __webpack_require__(59);
var promiseResolve = __webpack_require__(60);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(1)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(96)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(26)($Promise, PROMISE);
__webpack_require__(97)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(61)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(16);
var call = __webpack_require__(55);
var isArrayIter = __webpack_require__(56);
var anObject = __webpack_require__(5);
var toLength = __webpack_require__(31);
var getIterFn = __webpack_require__(40);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 94 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
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
  } return fn.apply(that, args);
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(58).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(19)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(8);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var dP = __webpack_require__(4);
var DESCRIPTORS = __webpack_require__(7);
var SPECIES = __webpack_require__(1)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(57);
var promiseResolve = __webpack_require__(60);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(3);
var newPromiseCapability = __webpack_require__(41);
var perform = __webpack_require__(59);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_100__;

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_101__;

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_102__;

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_103__;

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_104__;

/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LexWeb_vue__ = __webpack_require__(62);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7fdf03b2_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LexWeb_vue__ = __webpack_require__(140);
function injectStyle (ssrContext) {
  __webpack_require__(106)
}
var normalizeComponent = __webpack_require__(6)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LexWeb_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7fdf03b2_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LexWeb_vue__["a" /* default */],
  __vue_template_functional__,
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
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(108);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(24);
var $keys = __webpack_require__(18);

__webpack_require__(109)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var fails = __webpack_require__(11);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ToolbarContainer_vue__ = __webpack_require__(64);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_325dde92_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ToolbarContainer_vue__ = __webpack_require__(111);
var normalizeComponent = __webpack_require__(6)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ToolbarContainer_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_325dde92_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ToolbarContainer_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-toolbar',{attrs:{"color":_vm.toolbarColor,"app":"","dark":"","dense":"","fixed":""}},[(_vm.toolbarLogo)?_c('img',{attrs:{"src":_vm.toolbarLogo}}):_vm._e(),_vm._v(" "),_c('v-toolbar-title',{staticClass:"hidden-xs-and-down"},[_vm._v("\n    "+_vm._s(_vm.toolbarTitle)+"\n  ")]),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('v-tooltip',{attrs:{"activator":".min-max-toggle","left":""},model:{value:(_vm.shouldShowTooltip),callback:function ($$v) {_vm.shouldShowTooltip=$$v},expression:"shouldShowTooltip"}},[_c('span',{attrs:{"id":"min-max-tooltip"}},[_vm._v(_vm._s(_vm.toolTipMinimize))])]),_vm._v(" "),(_vm.$store.state.isRunningEmbedded)?_c('v-btn',_vm._g({staticClass:"min-max-toggle",attrs:{"icon":""},on:{"click":_vm.toggleMinimize}},_vm.tooltipEventHandlers),[_c('v-icon',[_vm._v("\n      "+_vm._s(_vm.isUiMinimized ?  'arrow_drop_up' : 'arrow_drop_down')+"\n    ")])],1):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MessageList_vue__ = __webpack_require__(65);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6f155304_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_MessageList_vue__ = __webpack_require__(133);
function injectStyle (ssrContext) {
  __webpack_require__(113)
}
var normalizeComponent = __webpack_require__(6)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6f155304"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MessageList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6f155304_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_MessageList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 113 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Message_vue__ = __webpack_require__(66);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f26fa868_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Message_vue__ = __webpack_require__(129);
function injectStyle (ssrContext) {
  __webpack_require__(115)
}
var normalizeComponent = __webpack_require__(6)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-f26fa868"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Message_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f26fa868_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Message_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 115 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MessageText_vue__ = __webpack_require__(67);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d292598c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_MessageText_vue__ = __webpack_require__(125);
function injectStyle (ssrContext) {
  __webpack_require__(117)
}
var normalizeComponent = __webpack_require__(6)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d292598c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MessageText_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d292598c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_MessageText_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 117 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// super simple module for the most common nodejs use case.
exports.markdown = __webpack_require__(119);
exports.parse = exports.markdown.toHTML;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// Released under MIT license
// Copyright (c) 2009-2010 Dominic Baggott
// Copyright (c) 2009-2010 Ash Berlin
// Copyright (c) 2011 Christoph Dorn <christoph@christophdorn.com> (http://www.christophdorn.com)

/*jshint browser:true, devel:true */

(function( expose ) {

/**
 *  class Markdown
 *
 *  Markdown processing in Javascript done right. We have very particular views
 *  on what constitutes 'right' which include:
 *
 *  - produces well-formed HTML (this means that em and strong nesting is
 *    important)
 *
 *  - has an intermediate representation to allow processing of parsed data (We
 *    in fact have two, both as [JsonML]: a markdown tree and an HTML tree).
 *
 *  - is easily extensible to add new dialects without having to rewrite the
 *    entire parsing mechanics
 *
 *  - has a good test suite
 *
 *  This implementation fulfills all of these (except that the test suite could
 *  do with expanding to automatically run all the fixtures from other Markdown
 *  implementations.)
 *
 *  ##### Intermediate Representation
 *
 *  *TODO* Talk about this :) Its JsonML, but document the node names we use.
 *
 *  [JsonML]: http://jsonml.org/ "JSON Markup Language"
 **/
var Markdown = expose.Markdown = function(dialect) {
  switch (typeof dialect) {
    case "undefined":
      this.dialect = Markdown.dialects.Gruber;
      break;
    case "object":
      this.dialect = dialect;
      break;
    default:
      if ( dialect in Markdown.dialects ) {
        this.dialect = Markdown.dialects[dialect];
      }
      else {
        throw new Error("Unknown Markdown dialect '" + String(dialect) + "'");
      }
      break;
  }
  this.em_state = [];
  this.strong_state = [];
  this.debug_indent = "";
};

/**
 *  parse( markdown, [dialect] ) -> JsonML
 *  - markdown (String): markdown string to parse
 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
 *
 *  Parse `markdown` and return a markdown document as a Markdown.JsonML tree.
 **/
expose.parse = function( source, dialect ) {
  // dialect will default if undefined
  var md = new Markdown( dialect );
  return md.toTree( source );
};

/**
 *  toHTML( markdown, [dialect]  ) -> String
 *  toHTML( md_tree ) -> String
 *  - markdown (String): markdown string to parse
 *  - md_tree (Markdown.JsonML): parsed markdown tree
 *
 *  Take markdown (either as a string or as a JsonML tree) and run it through
 *  [[toHTMLTree]] then turn it into a well-formated HTML fragment.
 **/
expose.toHTML = function toHTML( source , dialect , options ) {
  var input = expose.toHTMLTree( source , dialect , options );

  return expose.renderJsonML( input );
};

/**
 *  toHTMLTree( markdown, [dialect] ) -> JsonML
 *  toHTMLTree( md_tree ) -> JsonML
 *  - markdown (String): markdown string to parse
 *  - dialect (String | Dialect): the dialect to use, defaults to gruber
 *  - md_tree (Markdown.JsonML): parsed markdown tree
 *
 *  Turn markdown into HTML, represented as a JsonML tree. If a string is given
 *  to this function, it is first parsed into a markdown tree by calling
 *  [[parse]].
 **/
expose.toHTMLTree = function toHTMLTree( input, dialect , options ) {
  // convert string input to an MD tree
  if ( typeof input ==="string" ) input = this.parse( input, dialect );

  // Now convert the MD tree to an HTML tree

  // remove references from the tree
  var attrs = extract_attr( input ),
      refs = {};

  if ( attrs && attrs.references ) {
    refs = attrs.references;
  }

  var html = convert_tree_to_html( input, refs , options );
  merge_text_nodes( html );
  return html;
};

// For Spidermonkey based engines
function mk_block_toSource() {
  return "Markdown.mk_block( " +
          uneval(this.toString()) +
          ", " +
          uneval(this.trailing) +
          ", " +
          uneval(this.lineNumber) +
          " )";
}

// node
function mk_block_inspect() {
  var util = __webpack_require__(120);
  return "Markdown.mk_block( " +
          util.inspect(this.toString()) +
          ", " +
          util.inspect(this.trailing) +
          ", " +
          util.inspect(this.lineNumber) +
          " )";

}

var mk_block = Markdown.mk_block = function(block, trail, line) {
  // Be helpful for default case in tests.
  if ( arguments.length == 1 ) trail = "\n\n";

  var s = new String(block);
  s.trailing = trail;
  // To make it clear its not just a string
  s.inspect = mk_block_inspect;
  s.toSource = mk_block_toSource;

  if ( line != undefined )
    s.lineNumber = line;

  return s;
};

function count_lines( str ) {
  var n = 0, i = -1;
  while ( ( i = str.indexOf("\n", i + 1) ) !== -1 ) n++;
  return n;
}

// Internal - split source into rough blocks
Markdown.prototype.split_blocks = function splitBlocks( input, startLine ) {
  input = input.replace(/(\r\n|\n|\r)/g, "\n");
  // [\s\S] matches _anything_ (newline or space)
  // [^] is equivalent but doesn't work in IEs.
  var re = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,
      blocks = [],
      m;

  var line_no = 1;

  if ( ( m = /^(\s*\n)/.exec(input) ) != null ) {
    // skip (but count) leading blank lines
    line_no += count_lines( m[0] );
    re.lastIndex = m[0].length;
  }

  while ( ( m = re.exec(input) ) !== null ) {
    if (m[2] == "\n#") {
      m[2] = "\n";
      re.lastIndex--;
    }
    blocks.push( mk_block( m[1], m[2], line_no ) );
    line_no += count_lines( m[0] );
  }

  return blocks;
};

/**
 *  Markdown#processBlock( block, next ) -> undefined | [ JsonML, ... ]
 *  - block (String): the block to process
 *  - next (Array): the following blocks
 *
 * Process `block` and return an array of JsonML nodes representing `block`.
 *
 * It does this by asking each block level function in the dialect to process
 * the block until one can. Succesful handling is indicated by returning an
 * array (with zero or more JsonML nodes), failure by a false value.
 *
 * Blocks handlers are responsible for calling [[Markdown#processInline]]
 * themselves as appropriate.
 *
 * If the blocks were split incorrectly or adjacent blocks need collapsing you
 * can adjust `next` in place using shift/splice etc.
 *
 * If any of this default behaviour is not right for the dialect, you can
 * define a `__call__` method on the dialect that will get invoked to handle
 * the block processing.
 */
Markdown.prototype.processBlock = function processBlock( block, next ) {
  var cbs = this.dialect.block,
      ord = cbs.__order__;

  if ( "__call__" in cbs ) {
    return cbs.__call__.call(this, block, next);
  }

  for ( var i = 0; i < ord.length; i++ ) {
    //D:this.debug( "Testing", ord[i] );
    var res = cbs[ ord[i] ].call( this, block, next );
    if ( res ) {
      //D:this.debug("  matched");
      if ( !isArray(res) || ( res.length > 0 && !( isArray(res[0]) ) ) )
        this.debug(ord[i], "didn't return a proper array");
      //D:this.debug( "" );
      return res;
    }
  }

  // Uhoh! no match! Should we throw an error?
  return [];
};

Markdown.prototype.processInline = function processInline( block ) {
  return this.dialect.inline.__call__.call( this, String( block ) );
};

/**
 *  Markdown#toTree( source ) -> JsonML
 *  - source (String): markdown source to parse
 *
 *  Parse `source` into a JsonML tree representing the markdown document.
 **/
// custom_tree means set this.tree to `custom_tree` and restore old value on return
Markdown.prototype.toTree = function toTree( source, custom_root ) {
  var blocks = source instanceof Array ? source : this.split_blocks( source );

  // Make tree a member variable so its easier to mess with in extensions
  var old_tree = this.tree;
  try {
    this.tree = custom_root || this.tree || [ "markdown" ];

    blocks:
    while ( blocks.length ) {
      var b = this.processBlock( blocks.shift(), blocks );

      // Reference blocks and the like won't return any content
      if ( !b.length ) continue blocks;

      this.tree.push.apply( this.tree, b );
    }
    return this.tree;
  }
  finally {
    if ( custom_root ) {
      this.tree = old_tree;
    }
  }
};

// Noop by default
Markdown.prototype.debug = function () {
  var args = Array.prototype.slice.call( arguments);
  args.unshift(this.debug_indent);
  if ( typeof print !== "undefined" )
      print.apply( print, args );
  if ( typeof console !== "undefined" && typeof console.log !== "undefined" )
      console.log.apply( null, args );
}

Markdown.prototype.loop_re_over_block = function( re, block, cb ) {
  // Dont use /g regexps with this
  var m,
      b = block.valueOf();

  while ( b.length && (m = re.exec(b) ) != null ) {
    b = b.substr( m[0].length );
    cb.call(this, m);
  }
  return b;
};

/**
 * Markdown.dialects
 *
 * Namespace of built-in dialects.
 **/
Markdown.dialects = {};

/**
 * Markdown.dialects.Gruber
 *
 * The default dialect that follows the rules set out by John Gruber's
 * markdown.pl as closely as possible. Well actually we follow the behaviour of
 * that script which in some places is not exactly what the syntax web page
 * says.
 **/
Markdown.dialects.Gruber = {
  block: {
    atxHeader: function atxHeader( block, next ) {
      var m = block.match( /^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/ );

      if ( !m ) return undefined;

      var header = [ "header", { level: m[ 1 ].length } ];
      Array.prototype.push.apply(header, this.processInline(m[ 2 ]));

      if ( m[0].length < block.length )
        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

      return [ header ];
    },

    setextHeader: function setextHeader( block, next ) {
      var m = block.match( /^(.*)\n([-=])\2\2+(?:\n|$)/ );

      if ( !m ) return undefined;

      var level = ( m[ 2 ] === "=" ) ? 1 : 2;
      var header = [ "header", { level : level }, m[ 1 ] ];

      if ( m[0].length < block.length )
        next.unshift( mk_block( block.substr( m[0].length ), block.trailing, block.lineNumber + 2 ) );

      return [ header ];
    },

    code: function code( block, next ) {
      // |    Foo
      // |bar
      // should be a code block followed by a paragraph. Fun
      //
      // There might also be adjacent code block to merge.

      var ret = [],
          re = /^(?: {0,3}\t| {4})(.*)\n?/,
          lines;

      // 4 spaces + content
      if ( !block.match( re ) ) return undefined;

      block_search:
      do {
        // Now pull out the rest of the lines
        var b = this.loop_re_over_block(
                  re, block.valueOf(), function( m ) { ret.push( m[1] ); } );

        if ( b.length ) {
          // Case alluded to in first comment. push it back on as a new block
          next.unshift( mk_block(b, block.trailing) );
          break block_search;
        }
        else if ( next.length ) {
          // Check the next block - it might be code too
          if ( !next[0].match( re ) ) break block_search;

          // Pull how how many blanks lines follow - minus two to account for .join
          ret.push ( block.trailing.replace(/[^\n]/g, "").substring(2) );

          block = next.shift();
        }
        else {
          break block_search;
        }
      } while ( true );

      return [ [ "code_block", ret.join("\n") ] ];
    },

    horizRule: function horizRule( block, next ) {
      // this needs to find any hr in the block to handle abutting blocks
      var m = block.match( /^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/ );

      if ( !m ) {
        return undefined;
      }

      var jsonml = [ [ "hr" ] ];

      // if there's a leading abutting block, process it
      if ( m[ 1 ] ) {
        jsonml.unshift.apply( jsonml, this.processBlock( m[ 1 ], [] ) );
      }

      // if there's a trailing abutting block, stick it into next
      if ( m[ 3 ] ) {
        next.unshift( mk_block( m[ 3 ] ) );
      }

      return jsonml;
    },

    // There are two types of lists. Tight and loose. Tight lists have no whitespace
    // between the items (and result in text just in the <li>) and loose lists,
    // which have an empty line between list items, resulting in (one or more)
    // paragraphs inside the <li>.
    //
    // There are all sorts weird edge cases about the original markdown.pl's
    // handling of lists:
    //
    // * Nested lists are supposed to be indented by four chars per level. But
    //   if they aren't, you can get a nested list by indenting by less than
    //   four so long as the indent doesn't match an indent of an existing list
    //   item in the 'nest stack'.
    //
    // * The type of the list (bullet or number) is controlled just by the
    //    first item at the indent. Subsequent changes are ignored unless they
    //    are for nested lists
    //
    lists: (function( ) {
      // Use a closure to hide a few variables.
      var any_list = "[*+-]|\\d+\\.",
          bullet_list = /[*+-]/,
          number_list = /\d+\./,
          // Capture leading indent as it matters for determining nested lists.
          is_list_re = new RegExp( "^( {0,3})(" + any_list + ")[ \t]+" ),
          indent_re = "(?: {0,3}\\t| {4})";

      // TODO: Cache this regexp for certain depths.
      // Create a regexp suitable for matching an li for a given stack depth
      function regex_for_depth( depth ) {

        return new RegExp(
          // m[1] = indent, m[2] = list_type
          "(?:^(" + indent_re + "{0," + depth + "} {0,3})(" + any_list + ")\\s+)|" +
          // m[3] = cont
          "(^" + indent_re + "{0," + (depth-1) + "}[ ]{0,4})"
        );
      }
      function expand_tab( input ) {
        return input.replace( / {0,3}\t/g, "    " );
      }

      // Add inline content `inline` to `li`. inline comes from processInline
      // so is an array of content
      function add(li, loose, inline, nl) {
        if ( loose ) {
          li.push( [ "para" ].concat(inline) );
          return;
        }
        // Hmmm, should this be any block level element or just paras?
        var add_to = li[li.length -1] instanceof Array && li[li.length - 1][0] == "para"
                   ? li[li.length -1]
                   : li;

        // If there is already some content in this list, add the new line in
        if ( nl && li.length > 1 ) inline.unshift(nl);

        for ( var i = 0; i < inline.length; i++ ) {
          var what = inline[i],
              is_str = typeof what == "string";
          if ( is_str && add_to.length > 1 && typeof add_to[add_to.length-1] == "string" ) {
            add_to[ add_to.length-1 ] += what;
          }
          else {
            add_to.push( what );
          }
        }
      }

      // contained means have an indent greater than the current one. On
      // *every* line in the block
      function get_contained_blocks( depth, blocks ) {

        var re = new RegExp( "^(" + indent_re + "{" + depth + "}.*?\\n?)*$" ),
            replace = new RegExp("^" + indent_re + "{" + depth + "}", "gm"),
            ret = [];

        while ( blocks.length > 0 ) {
          if ( re.exec( blocks[0] ) ) {
            var b = blocks.shift(),
                // Now remove that indent
                x = b.replace( replace, "");

            ret.push( mk_block( x, b.trailing, b.lineNumber ) );
          }
          else {
            break;
          }
        }
        return ret;
      }

      // passed to stack.forEach to turn list items up the stack into paras
      function paragraphify(s, i, stack) {
        var list = s.list;
        var last_li = list[list.length-1];

        if ( last_li[1] instanceof Array && last_li[1][0] == "para" ) {
          return;
        }
        if ( i + 1 == stack.length ) {
          // Last stack frame
          // Keep the same array, but replace the contents
          last_li.push( ["para"].concat( last_li.splice(1, last_li.length - 1) ) );
        }
        else {
          var sublist = last_li.pop();
          last_li.push( ["para"].concat( last_li.splice(1, last_li.length - 1) ), sublist );
        }
      }

      // The matcher function
      return function( block, next ) {
        var m = block.match( is_list_re );
        if ( !m ) return undefined;

        function make_list( m ) {
          var list = bullet_list.exec( m[2] )
                   ? ["bulletlist"]
                   : ["numberlist"];

          stack.push( { list: list, indent: m[1] } );
          return list;
        }


        var stack = [], // Stack of lists for nesting.
            list = make_list( m ),
            last_li,
            loose = false,
            ret = [ stack[0].list ],
            i;

        // Loop to search over block looking for inner block elements and loose lists
        loose_search:
        while ( true ) {
          // Split into lines preserving new lines at end of line
          var lines = block.split( /(?=\n)/ );

          // We have to grab all lines for a li and call processInline on them
          // once as there are some inline things that can span lines.
          var li_accumulate = "";

          // Loop over the lines in this block looking for tight lists.
          tight_search:
          for ( var line_no = 0; line_no < lines.length; line_no++ ) {
            var nl = "",
                l = lines[line_no].replace(/^\n/, function(n) { nl = n; return ""; });

            // TODO: really should cache this
            var line_re = regex_for_depth( stack.length );

            m = l.match( line_re );
            //print( "line:", uneval(l), "\nline match:", uneval(m) );

            // We have a list item
            if ( m[1] !== undefined ) {
              // Process the previous list item, if any
              if ( li_accumulate.length ) {
                add( last_li, loose, this.processInline( li_accumulate ), nl );
                // Loose mode will have been dealt with. Reset it
                loose = false;
                li_accumulate = "";
              }

              m[1] = expand_tab( m[1] );
              var wanted_depth = Math.floor(m[1].length/4)+1;
              //print( "want:", wanted_depth, "stack:", stack.length);
              if ( wanted_depth > stack.length ) {
                // Deep enough for a nested list outright
                //print ( "new nested list" );
                list = make_list( m );
                last_li.push( list );
                last_li = list[1] = [ "listitem" ];
              }
              else {
                // We aren't deep enough to be strictly a new level. This is
                // where Md.pl goes nuts. If the indent matches a level in the
                // stack, put it there, else put it one deeper then the
                // wanted_depth deserves.
                var found = false;
                for ( i = 0; i < stack.length; i++ ) {
                  if ( stack[ i ].indent != m[1] ) continue;
                  list = stack[ i ].list;
                  stack.splice( i+1, stack.length - (i+1) );
                  found = true;
                  break;
                }

                if (!found) {
                  //print("not found. l:", uneval(l));
                  wanted_depth++;
                  if ( wanted_depth <= stack.length ) {
                    stack.splice(wanted_depth, stack.length - wanted_depth);
                    //print("Desired depth now", wanted_depth, "stack:", stack.length);
                    list = stack[wanted_depth-1].list;
                    //print("list:", uneval(list) );
                  }
                  else {
                    //print ("made new stack for messy indent");
                    list = make_list(m);
                    last_li.push(list);
                  }
                }

                //print( uneval(list), "last", list === stack[stack.length-1].list );
                last_li = [ "listitem" ];
                list.push(last_li);
              } // end depth of shenegains
              nl = "";
            }

            // Add content
            if ( l.length > m[0].length ) {
              li_accumulate += nl + l.substr( m[0].length );
            }
          } // tight_search

          if ( li_accumulate.length ) {
            add( last_li, loose, this.processInline( li_accumulate ), nl );
            // Loose mode will have been dealt with. Reset it
            loose = false;
            li_accumulate = "";
          }

          // Look at the next block - we might have a loose list. Or an extra
          // paragraph for the current li
          var contained = get_contained_blocks( stack.length, next );

          // Deal with code blocks or properly nested lists
          if ( contained.length > 0 ) {
            // Make sure all listitems up the stack are paragraphs
            forEach( stack, paragraphify, this);

            last_li.push.apply( last_li, this.toTree( contained, [] ) );
          }

          var next_block = next[0] && next[0].valueOf() || "";

          if ( next_block.match(is_list_re) || next_block.match( /^ / ) ) {
            block = next.shift();

            // Check for an HR following a list: features/lists/hr_abutting
            var hr = this.dialect.block.horizRule( block, next );

            if ( hr ) {
              ret.push.apply(ret, hr);
              break;
            }

            // Make sure all listitems up the stack are paragraphs
            forEach( stack, paragraphify, this);

            loose = true;
            continue loose_search;
          }
          break;
        } // loose_search

        return ret;
      };
    })(),

    blockquote: function blockquote( block, next ) {
      if ( !block.match( /^>/m ) )
        return undefined;

      var jsonml = [];

      // separate out the leading abutting block, if any. I.e. in this case:
      //
      //  a
      //  > b
      //
      if ( block[ 0 ] != ">" ) {
        var lines = block.split( /\n/ ),
            prev = [],
            line_no = block.lineNumber;

        // keep shifting lines until you find a crotchet
        while ( lines.length && lines[ 0 ][ 0 ] != ">" ) {
            prev.push( lines.shift() );
            line_no++;
        }

        var abutting = mk_block( prev.join( "\n" ), "\n", block.lineNumber );
        jsonml.push.apply( jsonml, this.processBlock( abutting, [] ) );
        // reassemble new block of just block quotes!
        block = mk_block( lines.join( "\n" ), block.trailing, line_no );
      }


      // if the next block is also a blockquote merge it in
      while ( next.length && next[ 0 ][ 0 ] == ">" ) {
        var b = next.shift();
        block = mk_block( block + block.trailing + b, b.trailing, block.lineNumber );
      }

      // Strip off the leading "> " and re-process as a block.
      var input = block.replace( /^> ?/gm, "" ),
          old_tree = this.tree,
          processedBlock = this.toTree( input, [ "blockquote" ] ),
          attr = extract_attr( processedBlock );

      // If any link references were found get rid of them
      if ( attr && attr.references ) {
        delete attr.references;
        // And then remove the attribute object if it's empty
        if ( isEmpty( attr ) ) {
          processedBlock.splice( 1, 1 );
        }
      }

      jsonml.push( processedBlock );
      return jsonml;
    },

    referenceDefn: function referenceDefn( block, next) {
      var re = /^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;
      // interesting matches are [ , ref_id, url, , title, title ]

      if ( !block.match(re) )
        return undefined;

      // make an attribute node if it doesn't exist
      if ( !extract_attr( this.tree ) ) {
        this.tree.splice( 1, 0, {} );
      }

      var attrs = extract_attr( this.tree );

      // make a references hash if it doesn't exist
      if ( attrs.references === undefined ) {
        attrs.references = {};
      }

      var b = this.loop_re_over_block(re, block, function( m ) {

        if ( m[2] && m[2][0] == "<" && m[2][m[2].length-1] == ">" )
          m[2] = m[2].substring( 1, m[2].length - 1 );

        var ref = attrs.references[ m[1].toLowerCase() ] = {
          href: m[2]
        };

        if ( m[4] !== undefined )
          ref.title = m[4];
        else if ( m[5] !== undefined )
          ref.title = m[5];

      } );

      if ( b.length )
        next.unshift( mk_block( b, block.trailing ) );

      return [];
    },

    para: function para( block, next ) {
      // everything's a para!
      return [ ["para"].concat( this.processInline( block ) ) ];
    }
  }
};

Markdown.dialects.Gruber.inline = {

    __oneElement__: function oneElement( text, patterns_or_re, previous_nodes ) {
      var m,
          res,
          lastIndex = 0;

      patterns_or_re = patterns_or_re || this.dialect.inline.__patterns__;
      var re = new RegExp( "([\\s\\S]*?)(" + (patterns_or_re.source || patterns_or_re) + ")" );

      m = re.exec( text );
      if (!m) {
        // Just boring text
        return [ text.length, text ];
      }
      else if ( m[1] ) {
        // Some un-interesting text matched. Return that first
        return [ m[1].length, m[1] ];
      }

      var res;
      if ( m[2] in this.dialect.inline ) {
        res = this.dialect.inline[ m[2] ].call(
                  this,
                  text.substr( m.index ), m, previous_nodes || [] );
      }
      // Default for now to make dev easier. just slurp special and output it.
      res = res || [ m[2].length, m[2] ];
      return res;
    },

    __call__: function inline( text, patterns ) {

      var out = [],
          res;

      function add(x) {
        //D:self.debug("  adding output", uneval(x));
        if ( typeof x == "string" && typeof out[out.length-1] == "string" )
          out[ out.length-1 ] += x;
        else
          out.push(x);
      }

      while ( text.length > 0 ) {
        res = this.dialect.inline.__oneElement__.call(this, text, patterns, out );
        text = text.substr( res.shift() );
        forEach(res, add )
      }

      return out;
    },

    // These characters are intersting elsewhere, so have rules for them so that
    // chunks of plain text blocks don't include them
    "]": function () {},
    "}": function () {},

    __escape__ : /^\\[\\`\*_{}\[\]()#\+.!\-]/,

    "\\": function escaped( text ) {
      // [ length of input processed, node/children to add... ]
      // Only esacape: \ ` * _ { } [ ] ( ) # * + - . !
      if ( this.dialect.inline.__escape__.exec( text ) )
        return [ 2, text.charAt( 1 ) ];
      else
        // Not an esacpe
        return [ 1, "\\" ];
    },

    "![": function image( text ) {

      // Unlike images, alt text is plain text only. no other elements are
      // allowed in there

      // ![Alt text](/path/to/img.jpg "Optional title")
      //      1          2            3       4         <--- captures
      var m = text.match( /^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/ );

      if ( m ) {
        if ( m[2] && m[2][0] == "<" && m[2][m[2].length-1] == ">" )
          m[2] = m[2].substring( 1, m[2].length - 1 );

        m[2] = this.dialect.inline.__call__.call( this, m[2], /\\/ )[0];

        var attrs = { alt: m[1], href: m[2] || "" };
        if ( m[4] !== undefined)
          attrs.title = m[4];

        return [ m[0].length, [ "img", attrs ] ];
      }

      // ![Alt text][id]
      m = text.match( /^!\[(.*?)\][ \t]*\[(.*?)\]/ );

      if ( m ) {
        // We can't check if the reference is known here as it likely wont be
        // found till after. Check it in md tree->hmtl tree conversion
        return [ m[0].length, [ "img_ref", { alt: m[1], ref: m[2].toLowerCase(), original: m[0] } ] ];
      }

      // Just consume the '!['
      return [ 2, "![" ];
    },

    "[": function link( text ) {

      var orig = String(text);
      // Inline content is possible inside `link text`
      var res = Markdown.DialectHelpers.inline_until_char.call( this, text.substr(1), "]" );

      // No closing ']' found. Just consume the [
      if ( !res ) return [ 1, "[" ];

      var consumed = 1 + res[ 0 ],
          children = res[ 1 ],
          link,
          attrs;

      // At this point the first [...] has been parsed. See what follows to find
      // out which kind of link we are (reference or direct url)
      text = text.substr( consumed );

      // [link text](/path/to/img.jpg "Optional title")
      //                 1            2       3         <--- captures
      // This will capture up to the last paren in the block. We then pull
      // back based on if there a matching ones in the url
      //    ([here](/url/(test))
      // The parens have to be balanced
      var m = text.match( /^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/ );
      if ( m ) {
        var url = m[1];
        consumed += m[0].length;

        if ( url && url[0] == "<" && url[url.length-1] == ">" )
          url = url.substring( 1, url.length - 1 );

        // If there is a title we don't have to worry about parens in the url
        if ( !m[3] ) {
          var open_parens = 1; // One open that isn't in the capture
          for ( var len = 0; len < url.length; len++ ) {
            switch ( url[len] ) {
            case "(":
              open_parens++;
              break;
            case ")":
              if ( --open_parens == 0) {
                consumed -= url.length - len;
                url = url.substring(0, len);
              }
              break;
            }
          }
        }

        // Process escapes only
        url = this.dialect.inline.__call__.call( this, url, /\\/ )[0];

        attrs = { href: url || "" };
        if ( m[3] !== undefined)
          attrs.title = m[3];

        link = [ "link", attrs ].concat( children );
        return [ consumed, link ];
      }

      // [Alt text][id]
      // [Alt text] [id]
      m = text.match( /^\s*\[(.*?)\]/ );

      if ( m ) {

        consumed += m[ 0 ].length;

        // [links][] uses links as its reference
        attrs = { ref: ( m[ 1 ] || String(children) ).toLowerCase(),  original: orig.substr( 0, consumed ) };

        link = [ "link_ref", attrs ].concat( children );

        // We can't check if the reference is known here as it likely wont be
        // found till after. Check it in md tree->hmtl tree conversion.
        // Store the original so that conversion can revert if the ref isn't found.
        return [ consumed, link ];
      }

      // [id]
      // Only if id is plain (no formatting.)
      if ( children.length == 1 && typeof children[0] == "string" ) {

        attrs = { ref: children[0].toLowerCase(),  original: orig.substr( 0, consumed ) };
        link = [ "link_ref", attrs, children[0] ];
        return [ consumed, link ];
      }

      // Just consume the "["
      return [ 1, "[" ];
    },


    "<": function autoLink( text ) {
      var m;

      if ( ( m = text.match( /^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/ ) ) != null ) {
        if ( m[3] ) {
          return [ m[0].length, [ "link", { href: "mailto:" + m[3] }, m[3] ] ];

        }
        else if ( m[2] == "mailto" ) {
          return [ m[0].length, [ "link", { href: m[1] }, m[1].substr("mailto:".length ) ] ];
        }
        else
          return [ m[0].length, [ "link", { href: m[1] }, m[1] ] ];
      }

      return [ 1, "<" ];
    },

    "`": function inlineCode( text ) {
      // Inline code block. as many backticks as you like to start it
      // Always skip over the opening ticks.
      var m = text.match( /(`+)(([\s\S]*?)\1)/ );

      if ( m && m[2] )
        return [ m[1].length + m[2].length, [ "inlinecode", m[3] ] ];
      else {
        // TODO: No matching end code found - warn!
        return [ 1, "`" ];
      }
    },

    "  \n": function lineBreak( text ) {
      return [ 3, [ "linebreak" ] ];
    }

};

// Meta Helper/generator method for em and strong handling
function strong_em( tag, md ) {

  var state_slot = tag + "_state",
      other_slot = tag == "strong" ? "em_state" : "strong_state";

  function CloseTag(len) {
    this.len_after = len;
    this.name = "close_" + md;
  }

  return function ( text, orig_match ) {

    if ( this[state_slot][0] == md ) {
      // Most recent em is of this type
      //D:this.debug("closing", md);
      this[state_slot].shift();

      // "Consume" everything to go back to the recrusion in the else-block below
      return[ text.length, new CloseTag(text.length-md.length) ];
    }
    else {
      // Store a clone of the em/strong states
      var other = this[other_slot].slice(),
          state = this[state_slot].slice();

      this[state_slot].unshift(md);

      //D:this.debug_indent += "  ";

      // Recurse
      var res = this.processInline( text.substr( md.length ) );
      //D:this.debug_indent = this.debug_indent.substr(2);

      var last = res[res.length - 1];

      //D:this.debug("processInline from", tag + ": ", uneval( res ) );

      var check = this[state_slot].shift();
      if ( last instanceof CloseTag ) {
        res.pop();
        // We matched! Huzzah.
        var consumed = text.length - last.len_after;
        return [ consumed, [ tag ].concat(res) ];
      }
      else {
        // Restore the state of the other kind. We might have mistakenly closed it.
        this[other_slot] = other;
        this[state_slot] = state;

        // We can't reuse the processed result as it could have wrong parsing contexts in it.
        return [ md.length, md ];
      }
    }
  }; // End returned function
}

Markdown.dialects.Gruber.inline["**"] = strong_em("strong", "**");
Markdown.dialects.Gruber.inline["__"] = strong_em("strong", "__");
Markdown.dialects.Gruber.inline["*"]  = strong_em("em", "*");
Markdown.dialects.Gruber.inline["_"]  = strong_em("em", "_");


// Build default order from insertion order.
Markdown.buildBlockOrder = function(d) {
  var ord = [];
  for ( var i in d ) {
    if ( i == "__order__" || i == "__call__" ) continue;
    ord.push( i );
  }
  d.__order__ = ord;
};

// Build patterns for inline matcher
Markdown.buildInlinePatterns = function(d) {
  var patterns = [];

  for ( var i in d ) {
    // __foo__ is reserved and not a pattern
    if ( i.match( /^__.*__$/) ) continue;
    var l = i.replace( /([\\.*+?|()\[\]{}])/g, "\\$1" )
             .replace( /\n/, "\\n" );
    patterns.push( i.length == 1 ? l : "(?:" + l + ")" );
  }

  patterns = patterns.join("|");
  d.__patterns__ = patterns;
  //print("patterns:", uneval( patterns ) );

  var fn = d.__call__;
  d.__call__ = function(text, pattern) {
    if ( pattern != undefined ) {
      return fn.call(this, text, pattern);
    }
    else
    {
      return fn.call(this, text, patterns);
    }
  };
};

Markdown.DialectHelpers = {};
Markdown.DialectHelpers.inline_until_char = function( text, want ) {
  var consumed = 0,
      nodes = [];

  while ( true ) {
    if ( text.charAt( consumed ) == want ) {
      // Found the character we were looking for
      consumed++;
      return [ consumed, nodes ];
    }

    if ( consumed >= text.length ) {
      // No closing char found. Abort.
      return null;
    }

    var res = this.dialect.inline.__oneElement__.call(this, text.substr( consumed ) );
    consumed += res[ 0 ];
    // Add any returned nodes.
    nodes.push.apply( nodes, res.slice( 1 ) );
  }
}

// Helper function to make sub-classing a dialect easier
Markdown.subclassDialect = function( d ) {
  function Block() {}
  Block.prototype = d.block;
  function Inline() {}
  Inline.prototype = d.inline;

  return { block: new Block(), inline: new Inline() };
};

Markdown.buildBlockOrder ( Markdown.dialects.Gruber.block );
Markdown.buildInlinePatterns( Markdown.dialects.Gruber.inline );

Markdown.dialects.Maruku = Markdown.subclassDialect( Markdown.dialects.Gruber );

Markdown.dialects.Maruku.processMetaHash = function processMetaHash( meta_string ) {
  var meta = split_meta_hash( meta_string ),
      attr = {};

  for ( var i = 0; i < meta.length; ++i ) {
    // id: #foo
    if ( /^#/.test( meta[ i ] ) ) {
      attr.id = meta[ i ].substring( 1 );
    }
    // class: .foo
    else if ( /^\./.test( meta[ i ] ) ) {
      // if class already exists, append the new one
      if ( attr["class"] ) {
        attr["class"] = attr["class"] + meta[ i ].replace( /./, " " );
      }
      else {
        attr["class"] = meta[ i ].substring( 1 );
      }
    }
    // attribute: foo=bar
    else if ( /\=/.test( meta[ i ] ) ) {
      var s = meta[ i ].split( /\=/ );
      attr[ s[ 0 ] ] = s[ 1 ];
    }
  }

  return attr;
}

function split_meta_hash( meta_string ) {
  var meta = meta_string.split( "" ),
      parts = [ "" ],
      in_quotes = false;

  while ( meta.length ) {
    var letter = meta.shift();
    switch ( letter ) {
      case " " :
        // if we're in a quoted section, keep it
        if ( in_quotes ) {
          parts[ parts.length - 1 ] += letter;
        }
        // otherwise make a new part
        else {
          parts.push( "" );
        }
        break;
      case "'" :
      case '"' :
        // reverse the quotes and move straight on
        in_quotes = !in_quotes;
        break;
      case "\\" :
        // shift off the next letter to be used straight away.
        // it was escaped so we'll keep it whatever it is
        letter = meta.shift();
      default :
        parts[ parts.length - 1 ] += letter;
        break;
    }
  }

  return parts;
}

Markdown.dialects.Maruku.block.document_meta = function document_meta( block, next ) {
  // we're only interested in the first block
  if ( block.lineNumber > 1 ) return undefined;

  // document_meta blocks consist of one or more lines of `Key: Value\n`
  if ( ! block.match( /^(?:\w+:.*\n)*\w+:.*$/ ) ) return undefined;

  // make an attribute node if it doesn't exist
  if ( !extract_attr( this.tree ) ) {
    this.tree.splice( 1, 0, {} );
  }

  var pairs = block.split( /\n/ );
  for ( p in pairs ) {
    var m = pairs[ p ].match( /(\w+):\s*(.*)$/ ),
        key = m[ 1 ].toLowerCase(),
        value = m[ 2 ];

    this.tree[ 1 ][ key ] = value;
  }

  // document_meta produces no content!
  return [];
};

Markdown.dialects.Maruku.block.block_meta = function block_meta( block, next ) {
  // check if the last line of the block is an meta hash
  var m = block.match( /(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/ );
  if ( !m ) return undefined;

  // process the meta hash
  var attr = this.dialect.processMetaHash( m[ 2 ] );

  var hash;

  // if we matched ^ then we need to apply meta to the previous block
  if ( m[ 1 ] === "" ) {
    var node = this.tree[ this.tree.length - 1 ];
    hash = extract_attr( node );

    // if the node is a string (rather than JsonML), bail
    if ( typeof node === "string" ) return undefined;

    // create the attribute hash if it doesn't exist
    if ( !hash ) {
      hash = {};
      node.splice( 1, 0, hash );
    }

    // add the attributes in
    for ( a in attr ) {
      hash[ a ] = attr[ a ];
    }

    // return nothing so the meta hash is removed
    return [];
  }

  // pull the meta hash off the block and process what's left
  var b = block.replace( /\n.*$/, "" ),
      result = this.processBlock( b, [] );

  // get or make the attributes hash
  hash = extract_attr( result[ 0 ] );
  if ( !hash ) {
    hash = {};
    result[ 0 ].splice( 1, 0, hash );
  }

  // attach the attributes to the block
  for ( a in attr ) {
    hash[ a ] = attr[ a ];
  }

  return result;
};

Markdown.dialects.Maruku.block.definition_list = function definition_list( block, next ) {
  // one or more terms followed by one or more definitions, in a single block
  var tight = /^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,
      list = [ "dl" ],
      i, m;

  // see if we're dealing with a tight or loose block
  if ( ( m = block.match( tight ) ) ) {
    // pull subsequent tight DL blocks out of `next`
    var blocks = [ block ];
    while ( next.length && tight.exec( next[ 0 ] ) ) {
      blocks.push( next.shift() );
    }

    for ( var b = 0; b < blocks.length; ++b ) {
      var m = blocks[ b ].match( tight ),
          terms = m[ 1 ].replace( /\n$/, "" ).split( /\n/ ),
          defns = m[ 2 ].split( /\n:\s+/ );

      // print( uneval( m ) );

      for ( i = 0; i < terms.length; ++i ) {
        list.push( [ "dt", terms[ i ] ] );
      }

      for ( i = 0; i < defns.length; ++i ) {
        // run inline processing over the definition
        list.push( [ "dd" ].concat( this.processInline( defns[ i ].replace( /(\n)\s+/, "$1" ) ) ) );
      }
    }
  }
  else {
    return undefined;
  }

  return [ list ];
};

// splits on unescaped instances of @ch. If @ch is not a character the result
// can be unpredictable

Markdown.dialects.Maruku.block.table = function table (block, next) {

    var _split_on_unescaped = function(s, ch) {
        ch = ch || '\\s';
        if (ch.match(/^[\\|\[\]{}?*.+^$]$/)) { ch = '\\' + ch; }
        var res = [ ],
            r = new RegExp('^((?:\\\\.|[^\\\\' + ch + '])*)' + ch + '(.*)'),
            m;
        while(m = s.match(r)) {
            res.push(m[1]);
            s = m[2];
        }
        res.push(s);
        return res;
    }

    var leading_pipe = /^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/,
        // find at least an unescaped pipe in each line
        no_leading_pipe = /^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/,
        i, m;
    if (m = block.match(leading_pipe)) {
        // remove leading pipes in contents
        // (header and horizontal rule already have the leading pipe left out)
        m[3] = m[3].replace(/^\s*\|/gm, '');
    } else if (! ( m = block.match(no_leading_pipe))) {
        return undefined;
    }

    var table = [ "table", [ "thead", [ "tr" ] ], [ "tbody" ] ];

    // remove trailing pipes, then split on pipes
    // (no escaped pipes are allowed in horizontal rule)
    m[2] = m[2].replace(/\|\s*$/, '').split('|');

    // process alignment
    var html_attrs = [ ];
    forEach (m[2], function (s) {
        if (s.match(/^\s*-+:\s*$/))       html_attrs.push({align: "right"});
        else if (s.match(/^\s*:-+\s*$/))  html_attrs.push({align: "left"});
        else if (s.match(/^\s*:-+:\s*$/)) html_attrs.push({align: "center"});
        else                              html_attrs.push({});
    });

    // now for the header, avoid escaped pipes
    m[1] = _split_on_unescaped(m[1].replace(/\|\s*$/, ''), '|');
    for (i = 0; i < m[1].length; i++) {
        table[1][1].push(['th', html_attrs[i] || {}].concat(
            this.processInline(m[1][i].trim())));
    }

    // now for body contents
    forEach (m[3].replace(/\|\s*$/mg, '').split('\n'), function (row) {
        var html_row = ['tr'];
        row = _split_on_unescaped(row, '|');
        for (i = 0; i < row.length; i++) {
            html_row.push(['td', html_attrs[i] || {}].concat(this.processInline(row[i].trim())));
        }
        table[2].push(html_row);
    }, this);

    return [table];
}

Markdown.dialects.Maruku.inline[ "{:" ] = function inline_meta( text, matches, out ) {
  if ( !out.length ) {
    return [ 2, "{:" ];
  }

  // get the preceeding element
  var before = out[ out.length - 1 ];

  if ( typeof before === "string" ) {
    return [ 2, "{:" ];
  }

  // match a meta hash
  var m = text.match( /^\{:\s*((?:\\\}|[^\}])*)\s*\}/ );

  // no match, false alarm
  if ( !m ) {
    return [ 2, "{:" ];
  }

  // attach the attributes to the preceeding element
  var meta = this.dialect.processMetaHash( m[ 1 ] ),
      attr = extract_attr( before );

  if ( !attr ) {
    attr = {};
    before.splice( 1, 0, attr );
  }

  for ( var k in meta ) {
    attr[ k ] = meta[ k ];
  }

  // cut out the string and replace it with nothing
  return [ m[ 0 ].length, "" ];
};

Markdown.dialects.Maruku.inline.__escape__ = /^\\[\\`\*_{}\[\]()#\+.!\-|:]/;

Markdown.buildBlockOrder ( Markdown.dialects.Maruku.block );
Markdown.buildInlinePatterns( Markdown.dialects.Maruku.inline );

var isArray = Array.isArray || function(obj) {
  return Object.prototype.toString.call(obj) == "[object Array]";
};

var forEach;
// Don't mess with Array.prototype. Its not friendly
if ( Array.prototype.forEach ) {
  forEach = function( arr, cb, thisp ) {
    return arr.forEach( cb, thisp );
  };
}
else {
  forEach = function(arr, cb, thisp) {
    for (var i = 0; i < arr.length; i++) {
      cb.call(thisp || arr, arr[i], i, arr);
    }
  }
}

var isEmpty = function( obj ) {
  for ( var key in obj ) {
    if ( hasOwnProperty.call( obj, key ) ) {
      return false;
    }
  }

  return true;
}

function extract_attr( jsonml ) {
  return isArray(jsonml)
      && jsonml.length > 1
      && typeof jsonml[ 1 ] === "object"
      && !( isArray(jsonml[ 1 ]) )
      ? jsonml[ 1 ]
      : undefined;
}



/**
 *  renderJsonML( jsonml[, options] ) -> String
 *  - jsonml (Array): JsonML array to render to XML
 *  - options (Object): options
 *
 *  Converts the given JsonML into well-formed XML.
 *
 *  The options currently understood are:
 *
 *  - root (Boolean): wether or not the root node should be included in the
 *    output, or just its children. The default `false` is to not include the
 *    root itself.
 */
expose.renderJsonML = function( jsonml, options ) {
  options = options || {};
  // include the root element in the rendered output?
  options.root = options.root || false;

  var content = [];

  if ( options.root ) {
    content.push( render_tree( jsonml ) );
  }
  else {
    jsonml.shift(); // get rid of the tag
    if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
      jsonml.shift(); // get rid of the attributes
    }

    while ( jsonml.length ) {
      content.push( render_tree( jsonml.shift() ) );
    }
  }

  return content.join( "\n\n" );
};

function escapeHTML( text ) {
  return text.replace( /&/g, "&amp;" )
             .replace( /</g, "&lt;" )
             .replace( />/g, "&gt;" )
             .replace( /"/g, "&quot;" )
             .replace( /'/g, "&#39;" );
}

function render_tree( jsonml ) {
  // basic case
  if ( typeof jsonml === "string" ) {
    return escapeHTML( jsonml );
  }

  var tag = jsonml.shift(),
      attributes = {},
      content = [];

  if ( jsonml.length && typeof jsonml[ 0 ] === "object" && !( jsonml[ 0 ] instanceof Array ) ) {
    attributes = jsonml.shift();
  }

  while ( jsonml.length ) {
    content.push( render_tree( jsonml.shift() ) );
  }

  var tag_attrs = "";
  for ( var a in attributes ) {
    tag_attrs += " " + a + '="' + escapeHTML( attributes[ a ] ) + '"';
  }

  // be careful about adding whitespace here for inline elements
  if ( tag == "img" || tag == "br" || tag == "hr" ) {
    return "<"+ tag + tag_attrs + "/>";
  }
  else {
    return "<"+ tag + tag_attrs + ">" + content.join( "" ) + "</" + tag + ">";
  }
}

function convert_tree_to_html( tree, references, options ) {
  var i;
  options = options || {};

  // shallow clone
  var jsonml = tree.slice( 0 );

  if ( typeof options.preprocessTreeNode === "function" ) {
      jsonml = options.preprocessTreeNode(jsonml, references);
  }

  // Clone attributes if they exist
  var attrs = extract_attr( jsonml );
  if ( attrs ) {
    jsonml[ 1 ] = {};
    for ( i in attrs ) {
      jsonml[ 1 ][ i ] = attrs[ i ];
    }
    attrs = jsonml[ 1 ];
  }

  // basic case
  if ( typeof jsonml === "string" ) {
    return jsonml;
  }

  // convert this node
  switch ( jsonml[ 0 ] ) {
    case "header":
      jsonml[ 0 ] = "h" + jsonml[ 1 ].level;
      delete jsonml[ 1 ].level;
      break;
    case "bulletlist":
      jsonml[ 0 ] = "ul";
      break;
    case "numberlist":
      jsonml[ 0 ] = "ol";
      break;
    case "listitem":
      jsonml[ 0 ] = "li";
      break;
    case "para":
      jsonml[ 0 ] = "p";
      break;
    case "markdown":
      jsonml[ 0 ] = "html";
      if ( attrs ) delete attrs.references;
      break;
    case "code_block":
      jsonml[ 0 ] = "pre";
      i = attrs ? 2 : 1;
      var code = [ "code" ];
      code.push.apply( code, jsonml.splice( i, jsonml.length - i ) );
      jsonml[ i ] = code;
      break;
    case "inlinecode":
      jsonml[ 0 ] = "code";
      break;
    case "img":
      jsonml[ 1 ].src = jsonml[ 1 ].href;
      delete jsonml[ 1 ].href;
      break;
    case "linebreak":
      jsonml[ 0 ] = "br";
    break;
    case "link":
      jsonml[ 0 ] = "a";
      break;
    case "link_ref":
      jsonml[ 0 ] = "a";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.href = ref.href;
        if ( ref.title ) {
          attrs.title = ref.title;
        }

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
    case "img_ref":
      jsonml[ 0 ] = "img";

      // grab this ref and clean up the attribute node
      var ref = references[ attrs.ref ];

      // if the reference exists, make the link
      if ( ref ) {
        delete attrs.ref;

        // add in the href and title, if present
        attrs.src = ref.href;
        if ( ref.title ) {
          attrs.title = ref.title;
        }

        // get rid of the unneeded original text
        delete attrs.original;
      }
      // the reference doesn't exist, so revert to plain text
      else {
        return attrs.original;
      }
      break;
  }

  // convert all the children
  i = 1;

  // deal with the attribute node, if it exists
  if ( attrs ) {
    // if there are keys, skip over it
    for ( var key in jsonml[ 1 ] ) {
        i = 2;
        break;
    }
    // if there aren't, remove it
    if ( i === 1 ) {
      jsonml.splice( i, 1 );
    }
  }

  for ( ; i < jsonml.length; ++i ) {
    jsonml[ i ] = convert_tree_to_html( jsonml[ i ], references, options );
  }

  return jsonml;
}


// merges adjacent text nodes into a single node
function merge_text_nodes( jsonml ) {
  // skip the tag name and attribute hash
  var i = extract_attr( jsonml ) ? 2 : 1;

  while ( i < jsonml.length ) {
    // if it's a string check the next item too
    if ( typeof jsonml[ i ] === "string" ) {
      if ( i + 1 < jsonml.length && typeof jsonml[ i + 1 ] === "string" ) {
        // merge the second string into the first and remove it
        jsonml[ i ] += jsonml.splice( i + 1, 1 )[ 0 ];
      }
      else {
        ++i;
      }
    }
    // if it's not a string recurse
    else {
      merge_text_nodes( jsonml[ i ] );
      ++i;
    }
  }
}

} )( (function() {
  if ( false ) {
    window.markdown = {};
    return window.markdown;
  }
  else {
    return exports;
  }
} )() );


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = Object({"NODE_ENV":"production","PACKAGE_VERSION":"0.14.0","DIST_BUILD":"true","PUBLIC_PATH":"/"}).NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(123);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(124);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(121), __webpack_require__(122)))

/***/ }),
/* 121 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 122 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 124 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.message.text && _vm.message.type === 'human')?_c('div',{staticClass:"message-text"},[_vm._v("\n  "+_vm._s(_vm.message.text)+"\n")]):(_vm.altHtmlMessage && _vm.AllowSuperDangerousHTMLInMessage)?_c('div',{staticClass:"message-text",domProps:{"innerHTML":_vm._s(_vm.altHtmlMessage)}}):(_vm.message.text && _vm.shouldRenderAsHtml)?_c('div',{staticClass:"message-text",domProps:{"innerHTML":_vm._s(_vm.botMessageAsHtml)}}):(_vm.message.text && _vm.message.type === 'bot')?_c('div',{staticClass:"message-text"},[_vm._v("\n  "+_vm._s((_vm.shouldStripTags) ? _vm.stripTagsFromMessage(_vm.message.text) : _vm.message.text)+"\n")]):_vm._e()}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ResponseCard_vue__ = __webpack_require__(68);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_19ae77ba_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ResponseCard_vue__ = __webpack_require__(128);
function injectStyle (ssrContext) {
  __webpack_require__(127)
}
var normalizeComponent = __webpack_require__(6)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-19ae77ba"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ResponseCard_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_19ae77ba_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ResponseCard_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 127 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-card',[(_vm.responseCard.title.trim())?_c('v-card-title',{staticClass:"red lighten-5",attrs:{"primary-title":""}},[_c('span',{staticClass:"headline"},[_vm._v(_vm._s(_vm.responseCard.title))])]):_vm._e(),_vm._v(" "),(_vm.responseCard.subTitle)?_c('v-card-text',[_c('span',[_vm._v(_vm._s(_vm.responseCard.subTitle))])]):_vm._e(),_vm._v(" "),(_vm.responseCard.imageUrl)?_c('v-card-media',{attrs:{"src":_vm.responseCard.imageUrl,"contain":"","height":"33vh"}}):_vm._e(),_vm._v(" "),_vm._l((_vm.responseCard.buttons),function(button,index){return _c('v-card-actions',{key:index,staticClass:"button-row",attrs:{"actions":""}},[(button.text && button.value)?_c('v-btn',{attrs:{"disabled":_vm.hasButtonBeenClicked,"default":""},nativeOn:{"~click":function($event){_vm.onButtonClick(button.value)}}},[_vm._v("\n      "+_vm._s(button.text)+"\n    ")]):_vm._e()],1)}),_vm._v(" "),(_vm.responseCard.attachmentLinkUrl)?_c('v-card-actions',[_c('v-btn',{staticClass:"red lighten-5",attrs:{"flat":"","tag":"a","href":_vm.responseCard.attachmentLinkUrl,"target":"_blank"}},[_vm._v("\n      Open Link\n    ")])],1):_vm._e()],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-flex',{staticClass:"message",attrs:{"d-flex":""}},[_c('v-layout',{staticClass:"message-layout",attrs:{"column":"","ma-2":""}},[_c('v-flex',{staticClass:"message-bubble-date-container",attrs:{"d-flex":""}},[_c('v-layout',{staticClass:"message-bubble-column",attrs:{"column":""}},[_c('v-flex',{staticClass:"message-bubble-avatar-container",attrs:{"d-flex":""}},[_c('v-layout',{staticClass:"message-bubble-row",attrs:{"row":""}},[(_vm.shouldShowAvatarImage)?_c('div',{staticClass:"bot-avatar focusable",style:(_vm.botAvatarBackground),attrs:{"tabindex":_vm.message.id + 1}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"message-bubble focusable",attrs:{"tabindex":_vm.message.id + 1},on:{"focus":_vm.onMessageFocus,"blur":_vm.onMessageBlur}},[('text' in _vm.message && _vm.message.text !== null && _vm.message.text.length)?_c('message-text',{attrs:{"message":_vm.message}}):_vm._e(),_vm._v(" "),(_vm.message.type === 'human' && _vm.message.audio)?_c('div',{staticClass:"message-audio"},[_c('audio',[_c('source',{attrs:{"src":_vm.message.audio,"type":"audio/wav"}})]),_vm._v(" "),_c('v-btn',{staticClass:"black--text ml-0 mr-0",attrs:{"tabindex":_vm.message.id + 1,"icon":""},on:{"click":_vm.playAudio}},[_c('v-icon',{staticClass:"play-icon"},[_vm._v("play_circle_outline")])],1)],1):_vm._e(),_vm._v(" "),(_vm.message.type === 'bot' && _vm.botDialogState)?_c('v-icon',{staticClass:"dialog-state",class:("dialog-state-" + (_vm.botDialogState.state)),attrs:{"medium":""}},[_vm._v("\n                "+_vm._s(_vm.botDialogState.icon)+"\n              ")]):_vm._e()],1)])],1),_vm._v(" "),(_vm.shouldShowMessageDate && _vm.isMessageFocused)?_c('v-flex',{staticClass:"text-xs-center message-date"},[_vm._v("\n          "+_vm._s(_vm.messageHumanDate)+"\n        ")]):_vm._e()],1)],1),_vm._v(" "),(_vm.shouldDisplayResponseCard)?_c('v-flex',{staticClass:"response-card",attrs:{"d-flex":"","mt-2":"","mr-2":"","ml-3":""}},_vm._l((_vm.message.responseCard.genericAttachments),function(card,index){return _c('response-card',{key:index,attrs:{"response-card":card}})})):_vm._e()],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MessageLoading_vue__ = __webpack_require__(69);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6d624218_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_MessageLoading_vue__ = __webpack_require__(132);
function injectStyle (ssrContext) {
  __webpack_require__(131)
}
var normalizeComponent = __webpack_require__(6)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6d624218"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_MessageLoading_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6d624218_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_MessageLoading_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 131 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-flex',{staticClass:"message message-bot",attrs:{"d-flex":""}},[_c('v-layout',{staticClass:"message-layout",attrs:{"column":"","ma-2":""}},[_c('v-flex',{staticClass:"message-bubble-date-container",attrs:{"d-flex":""}},[_c('v-layout',{staticClass:"message-bubble-column",attrs:{"column":""}},[_c('v-flex',{staticClass:"message-bubble-avatar-container",attrs:{"d-flex":""}},[_c('v-layout',{staticClass:"message-bubble-row",attrs:{"row":""}},[_c('div',{staticClass:"message-bubble focusable"},[_vm._v("\n              "+_vm._s(_vm.progress)+" \n            ")])])],1)],1)],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-layout',{staticClass:"message-list",attrs:{"column":"","fill-height":""}},[_vm._l((_vm.messages),function(message){return _c('message',{key:message.id,ref:"messages",refInFor:true,class:("message-" + (message.type)),attrs:{"message":message},on:{"scrollDown":_vm.scrollDown}})}),_vm._v(" "),(_vm.loading)?_c('MessageLoading'):_vm._e()],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_InputContainer_vue__ = __webpack_require__(70);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_62d75cef_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_InputContainer_vue__ = __webpack_require__(139);
function injectStyle (ssrContext) {
  __webpack_require__(135)
}
var normalizeComponent = __webpack_require__(6)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_InputContainer_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_62d75cef_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_InputContainer_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 135 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_RecorderStatus_vue__ = __webpack_require__(71);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_85675648_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_RecorderStatus_vue__ = __webpack_require__(138);
function injectStyle (ssrContext) {
  __webpack_require__(137)
}
var normalizeComponent = __webpack_require__(6)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-85675648"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_RecorderStatus_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_85675648_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_RecorderStatus_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 137 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-flex',{staticClass:"recorder-status white"},[_c('div',{staticClass:"status-text"},[_c('span',[_vm._v(_vm._s(_vm.statusText))])]),_vm._v(" "),_c('div',{staticClass:"voice-controls ml-2"},[_c('transition',{attrs:{"css":false},on:{"enter":_vm.enterMeter,"leave":_vm.leaveMeter}},[(_vm.isRecording)?_c('div',{staticClass:"volume-meter"},[_c('meter',{attrs:{"value":_vm.volume,"min":"0.0001","low":"0.005","optimum":"0.04","high":"0.07","max":"0.09"}})]):_vm._e()]),_vm._v(" "),(_vm.isProcessing)?_c('v-progress-linear',{staticClass:"processing-bar ma-0",attrs:{"indeterminate":true}}):_vm._e(),_vm._v(" "),_c('transition',{attrs:{"css":false},on:{"enter":_vm.enterAudioPlay,"leave":_vm.leaveAudioPlay}},[(_vm.isBotSpeaking)?_c('v-progress-linear',{staticClass:"audio-progress-bar ma-0",model:{value:(_vm.audioPlayPercent),callback:function ($$v) {_vm.audioPlayPercent=$$v},expression:"audioPlayPercent"}}):_vm._e()],1)],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-footer',{attrs:{"app":"","fixed":""}},[_c('v-layout',{staticClass:"input-container",attrs:{"row":"","justify-space-between":"","ma-0":""}},[_c('v-toolbar',{attrs:{"color":"white","dense":""}},[_c('v-text-field',{directives:[{name:"show",rawName:"v-show",value:(_vm.shouldShowTextInput),expression:"shouldShowTextInput"}],attrs:{"label":_vm.textInputPlaceholder,"id":"text-input","name":"text-input","single-line":"","hide-details":""},on:{"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key)){ return null; }$event.stopPropagation();_vm.postTextMessage($event)},"focus":_vm.onTextFieldFocus,"blur":_vm.onTextFieldBlur},model:{value:(_vm.textInput),callback:function ($$v) {_vm.textInput=$$v},expression:"textInput"}}),_vm._v(" "),_c('recorder-status',{directives:[{name:"show",rawName:"v-show",value:(!_vm.shouldShowTextInput),expression:"!shouldShowTextInput"}]}),_vm._v(" "),_c('v-tooltip',{ref:"tooltip",attrs:{"activator":".input-button","left":""},model:{value:(_vm.shouldShowTooltip),callback:function ($$v) {_vm.shouldShowTooltip=$$v},expression:"shouldShowTooltip"}},[_c('span',{attrs:{"id":"input-button-tooltip"}},[_vm._v(_vm._s(_vm.inputButtonTooltip))])]),_vm._v(" "),(_vm.shouldShowSendButton)?_c('v-btn',_vm._g({ref:"send",staticClass:"black--text input-button",attrs:{"disabled":_vm.isSendButtonDisabled,"icon":""},on:{"click":_vm.postTextMessage}},_vm.tooltipEventHandlers),[_c('v-icon',{attrs:{"medium":""}},[_vm._v("send")])],1):_c('v-btn',_vm._g({ref:"mic",staticClass:"black--text input-button",attrs:{"disabled":_vm.isMicButtonDisabled,"icon":""},on:{"click":_vm.onMicClick}},_vm.tooltipEventHandlers),[_c('v-icon',{attrs:{"medium":""}},[_vm._v(_vm._s(_vm.micButtonIcon))])],1)],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-app',{attrs:{"id":"lex-web"}},[_c('toolbar-container',{attrs:{"toolbar-title":_vm.toolbarTitle,"toolbar-color":_vm.toolbarColor,"toolbar-logo":_vm.toolbarLogo,"is-ui-minimized":_vm.isUiMinimized},on:{"toggleMinimizeUi":_vm.toggleMinimizeUi}}),_vm._v(" "),_c('v-content',[_c('v-container',{staticClass:"message-list-container",attrs:{"fluid":"","pa-0":""}},[_c('message-list',{directives:[{name:"show",rawName:"v-show",value:(!_vm.isUiMinimized),expression:"!isUiMinimized"}]})],1)],1),_vm._v(" "),(!_vm.isUiMinimized)?_c('input-container',{attrs:{"text-input-placeholder":_vm.textInputPlaceholder,"initial-speech-instruction":_vm.initialSpeechInstruction}}):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_state__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_getters__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_mutations__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_actions__ = __webpack_require__(168);
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
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(45);


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
  version:  true ? "0.14.0" : '0.0.0',
  lex: {
    acceptFormat: 'audio/ogg',
    dialogState: '',
    isInterrupting: false,
    isProcessing: false,
    inputTranscript: '',
    intentName: '',
    message: '',
    responseCard: null,
    sessionAttributes: __WEBPACK_IMPORTED_MODULE_2__config__["a" /* config */].lex && __WEBPACK_IMPORTED_MODULE_2__config__["a" /* config */].lex.sessionAttributes && __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* config */].lex.sessionAttributes) === 'object' ? __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __WEBPACK_IMPORTED_MODULE_2__config__["a" /* config */].lex.sessionAttributes) : {},
    slotToElicit: '',
    slots: {}
  },
  messages: [],
  polly: {
    outputFormat: 'ogg_vorbis',
    voiceId: __WEBPACK_IMPORTED_MODULE_2__config__["a" /* config */].polly && __WEBPACK_IMPORTED_MODULE_2__config__["a" /* config */].polly.voiceId && typeof __WEBPACK_IMPORTED_MODULE_2__config__["a" /* config */].polly.voiceId === 'string' ? '' + __WEBPACK_IMPORTED_MODULE_2__config__["a" /* config */].polly.voiceId : 'Joanna'
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
    isRecorderEnabled: __WEBPACK_IMPORTED_MODULE_2__config__["a" /* config */].recorder ? !!__WEBPACK_IMPORTED_MODULE_2__config__["a" /* config */].recorder.enable : true,
    isRecording: false,
    silentRecordingCount: 0
  },

  isRunningEmbedded: false, // am I running in an iframe?
  isUiMinimized: false, // when running embedded, is the iframe minimized?
  config: __WEBPACK_IMPORTED_MODULE_2__config__["a" /* config */],

  awsCreds: {
    provider: 'cognito' // cognito|parentWindow
  }
});

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(144), __esModule: true };

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(20);
__webpack_require__(27);
module.exports = __webpack_require__(43).f('iterator');


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(146), __esModule: true };

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(147);
__webpack_require__(50);
__webpack_require__(153);
__webpack_require__(154);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(10);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(52);
var META = __webpack_require__(148).KEY;
var $fails = __webpack_require__(11);
var shared = __webpack_require__(34);
var setToStringTag = __webpack_require__(26);
var uid = __webpack_require__(22);
var wks = __webpack_require__(1);
var wksExt = __webpack_require__(43);
var wksDefine = __webpack_require__(44);
var enumKeys = __webpack_require__(149);
var isArray = __webpack_require__(150);
var anObject = __webpack_require__(5);
var isObject = __webpack_require__(9);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(29);
var createDesc = __webpack_require__(17);
var _create = __webpack_require__(53);
var gOPNExt = __webpack_require__(151);
var $GOPD = __webpack_require__(152);
var $DP = __webpack_require__(4);
var $keys = __webpack_require__(18);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(72).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(23).f = $propertyIsEnumerable;
  __webpack_require__(36).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(25)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
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
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
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

var META = __webpack_require__(22)('meta');
var isObject = __webpack_require__(9);
var has = __webpack_require__(10);
var setDesc = __webpack_require__(4).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(11)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(18);
var gOPS = __webpack_require__(36);
var pIE = __webpack_require__(23);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(19);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12);
var gOPN = __webpack_require__(72).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(23);
var createDesc = __webpack_require__(17);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(29);
var has = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(47);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44)('asyncIterator');


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44)('observable');


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(38);

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
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(157), __esModule: true };

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
__webpack_require__(20);
module.exports = __webpack_require__(158);


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(39);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(14);
module.exports = __webpack_require__(0).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(160), __esModule: true };

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
__webpack_require__(20);
module.exports = __webpack_require__(161);


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var get = __webpack_require__(40);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./config.dev.json": 163,
	"./config.prod.json": 164,
	"./config.test.json": 165
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
webpackContext.id = 162;

/***/ }),
/* 163 */
/***/ (function(module, exports) {

module.exports = {"cognito":{"poolId":""},"lex":{"botName":"WebUiOrderFlowers","initialText":"You can ask me for help ordering flowers. Just type \"order flowers\" or click on the mic and say it.","initialSpeechInstruction":"Say 'Order Flowers' to get started."},"polly":{"voiceId":"Salli"},"ui":{"parentOrigin":"http://localhost:8080","pageTitle":"Order Flowers Bot","toolbarTitle":"Order Flowers"},"recorder":{"preset":"speech_recognition"}}

/***/ }),
/* 164 */
/***/ (function(module, exports) {

module.exports = {"cognito":{"poolId":""},"lex":{"botName":"WebUiOrderFlowers","initialText":"You can ask me for help ordering flowers. Just type \"order flowers\" or click on the mic and say it.","initialSpeechInstruction":"Say 'Order Flowers' to get started."},"polly":{"voiceId":"Salli"},"ui":{"parentOrigin":"","pageTitle":"Order Flowers Bot","toolbarTitle":"Order Flowers"},"recorder":{"preset":"speech_recognition"}}

/***/ }),
/* 165 */
/***/ (function(module, exports) {

module.exports = {"cognito":{"poolId":""},"lex":{"botName":"WebUiOrderFlowers","initialText":"You can ask me for help ordering flowers. Just type \"order flowers\" or click on the mic and say it.","initialSpeechInstruction":"Say 'Order Flowers' to get started."},"polly":{"voiceId":"Salli"},"ui":{"parentOrigin":"http://localhost:8080","pageTitle":"Order Flowers Bot","toolbarTitle":"Order Flowers"},"recorder":{"preset":"speech_recognition"}}

/***/ }),
/* 166 */
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
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(45);


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
  setAudioAutoPlay: function setAudioAutoPlay(state, _ref) {
    var audio = _ref.audio,
        status = _ref.status;

    if (typeof status !== 'boolean') {
      console.error('setAudioAutoPlay status not boolean', status);
      return;
    }
    state.botAudio.autoPlay = status;
    audio.autoplay = status;
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
  mergeConfig: function mergeConfig(state, config) {
    if ((typeof config === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(config)) !== 'object') {
      console.error('config is not an object', config);
      return;
    }

    // security: do not accept dynamic parentOrigin
    var parentOrigin = state.config && state.config.ui && state.config.ui.parentOrigin ? state.config.ui.parentOrigin : config.ui.parentOrigin || window.location.origin;
    var configFiltered = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, config, { ui: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, config.ui, { parentOrigin: parentOrigin }) });
    if (state.config && state.config.ui && state.config.ui.parentOrigin && config.ui && config.ui.parentOrigin && config.ui.parentOrigin !== state.config.ui.parentOrigin) {
      console.warn('ignoring parentOrigin in config: ', config.ui.parentOrigin);
    }
    state.config = Object(__WEBPACK_IMPORTED_MODULE_2__config__["b" /* mergeConfig */])(state.config, configFiltered);
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
      id: state.messages.length,
      date: new Date()
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
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_lex_recorder__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_recorder_handlers__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_silent_ogg__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_silent_ogg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__assets_silent_ogg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_silent_mp3__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_silent_mp3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__assets_silent_mp3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_lex_client__ = __webpack_require__(180);


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
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject(new Error('unknown credential provider'));
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
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject(new Error('invalid config event from parent'));
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
    lexClient = new __WEBPACK_IMPORTED_MODULE_6__lib_lex_client__["a" /* default */]({
      botName: context.state.config.lex.botName,
      botAlias: context.state.config.lex.botAlias,
      lexRuntimeClient: lexRuntimeClient
    });

    context.commit('setLexSessionAttributes', context.state.config.lex.sessionAttributes);
    return context.dispatch('getCredentials').then(function () {
      return lexClient.initCredentials(awsCredentials);
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
    if (!context.state.config.recorder.enable) {
      context.commit('setIsRecorderEnabled', false);
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
    }
    recorder = new __WEBPACK_IMPORTED_MODULE_2__lib_lex_recorder__["a" /* default */](context.state.config.recorder);

    return recorder.init().then(function () {
      return recorder.initOptions(context.state.config.recorder);
    }).then(function () {
      return Object(__WEBPACK_IMPORTED_MODULE_3__store_recorder_handlers__["a" /* default */])(context, recorder);
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
    if (!context.state.recState.isRecorderEnabled || !context.state.config.recorder.enable) {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
    }
    if (!audioElement) {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject(new Error('invalid audio element'));
    }
    audio = audioElement;

    var silentSound = void 0;

    // Ogg is the preferred format as it seems to be generally smaller.
    // Detect if ogg is supported (MS Edge doesn't).
    // Can't default to mp3 as it is not supported by some Android browsers
    if (audio.canPlayType('audio/ogg') !== '') {
      context.commit('setAudioContentType', 'ogg');
      silentSound = __WEBPACK_IMPORTED_MODULE_4__assets_silent_ogg___default.a;
    } else if (audio.canPlayType('audio/mp3') !== '') {
      context.commit('setAudioContentType', 'mp3');
      silentSound = __WEBPACK_IMPORTED_MODULE_5__assets_silent_mp3___default.a;
    } else {
      console.error('init audio could not find supportted audio type');
      console.warn('init audio can play mp3 [%s]', audio.canPlayType('audio/mp3'));
      console.warn('init audio can play ogg [%s]', audio.canPlayType('audio/ogg'));
    }

    console.info('recorder content types: %s', recorder.mimeType);

    audio.preload = 'auto';
    // Load a silent sound as the initial audio. This is used to workaround
    // the requirement of mobile browsers that would only play a
    // sound in direct response to a user action (e.g. click).
    // This audio should be explicitly played as a response to a click
    // in the UI
    audio.src = silentSound;
    // autoplay will be set as a response to a clik
    audio.autoplay = false;

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
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
    } catch (err) {
      console.error('getAudioUrl createObjectURL error', err);
      var errorMessage = 'There was an error processing the audio ' + ('response: (' + err + ')');
      var error = new Error(errorMessage);
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject(error);
    }

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve(url);
  },
  setAudioAutoPlay: function setAudioAutoPlay(context) {
    if (audio.autoplay) {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve();
    }
    return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
      audio.play();
      // eslint-disable-next-line no-param-reassign
      audio.onended = function () {
        context.commit('setAudioAutoPlay', { audio: audio, status: true });
        resolve();
      };
      // eslint-disable-next-line no-param-reassign
      audio.onerror = function (err) {
        context.commit('setAudioAutoPlay', { audio: audio, status: false });
        reject(new Error('setting audio autoplay failed: ' + err));
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
        reject(new Error('There was an error playing the response (' + error + ')'));
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
      var _audio = audio,
          duration = _audio.duration;

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
  getAudioProperties: function getAudioProperties() {
    return audio ? {
      currentTime: audio.currentTime,
      duration: audio.duration,
      end: audio.played.length >= 1 ? audio.played.end(0) : audio.duration,
      ended: audio.ended,
      paused: audio.paused
    } : {};
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
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject(new Error('The microphone seems to be muted.'));
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
    var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'text';

    var synthReq = pollyClient.synthesizeSpeech({
      Text: text,
      VoiceId: context.state.polly.voiceId,
      OutputFormat: context.state.polly.outputFormat,
      TextType: format
    });
    return context.dispatch('getCredentials').then(function () {
      return synthReq.promise();
    }).then(function (data) {
      var blob = new Blob([data.AudioStream], { type: data.ContentType });
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve(blob);
    });
  },
  pollySynthesizeSpeech: function pollySynthesizeSpeech(context, text) {
    var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'text';

    return context.dispatch('pollyGetBlob', text, format).then(function (blob) {
      return context.dispatch('getAudioUrl', blob);
    }).then(function (audioUrl) {
      return context.dispatch('playAudio', audioUrl);
    });
  },
  interruptSpeechConversation: function interruptSpeechConversation(context) {
    if (!context.state.recState.isConversationGoing && !context.state.botAudio.isSpeaking) {
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
            reject(new Error('interrupt interval exceeded'));
          }
          count += 1;
        }, intervalTimeInMs);
      });
    });
  },
  postTextMessage: function postTextMessage(context, message) {
    return context.dispatch('interruptSpeechConversation').then(function () {
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
      var errorMessage = context.state.config.ui.showErrorDetails ? ' ' + error : '';
      console.error('error in postTextMessage', error);
      context.dispatch('pushErrorMessage', 'Sorry, I was unable to process your message. Try again later.' + ('' + errorMessage));
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
    }).catch(function (error) {
      context.commit('setIsLexProcessing', false);
      throw error;
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
    }).catch(function (error) {
      context.commit('setIsLexProcessing', false);
      throw error;
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
        var error = new Error('error parsing appContext in sessionAttributes: ' + e);
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject(error);
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
    var expireTime = awsCredentials && awsCredentials.expireTime ? awsCredentials.expireTime : 0;
    var credsExpirationDate = new Date(expireTime);
    var now = Date.now();
    if (credsExpirationDate > now) {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve(awsCredentials);
    }
    return context.dispatch('sendMessageToParentWindow', { event: 'getCredentials' }).then(function (credsResponse) {
      if (credsResponse.event === 'resolve' && credsResponse.type === 'getCredentials') {
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve(credsResponse.data);
      }
      var error = new Error('invalid credential event from parent');
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject(error);
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
        expired: false,
        getPromise: function getPromise() {
          return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.resolve(awsCredentials);
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
          var errorMessage = 'error in sendMessageToParentWindow: ' + evt.data.error;
          reject(new Error(errorMessage));
        }
      };
      window.parent.postMessage(message, context.state.config.ui.parentOrigin, [messageChannel.port2]);
    });
  }
});

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__wav_worker__ = __webpack_require__(175);
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
      return this._initAudioContext()
      // inits AudioContext.createScriptProcessor object
      // used to process mic audio input volume
      // sets this._micVolumeProcessor
      .then(function () {
        return _this2._initMicVolumeProcessor();
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
      var event = new CustomEvent('dataavailable', { detail: evt.data });
      this._eventTarget.dispatchEvent(event);
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
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject(new Error('Web Audio API not supported.'));
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
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(171);

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
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(172), __esModule: true };

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(20);
__webpack_require__(173);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(16);
var $export = __webpack_require__(3);
var toObject = __webpack_require__(24);
var call = __webpack_require__(55);
var isArrayIter = __webpack_require__(56);
var toLength = __webpack_require__(31);
var createProperty = __webpack_require__(174);
var getIterFn = __webpack_require__(40);

$export($export.S + $export.F * !__webpack_require__(61)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(4);
var createDesc = __webpack_require__(17);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function () {
  return __webpack_require__(176)("/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, {\n/******/ \t\t\t\tconfigurable: false,\n/******/ \t\t\t\tenumerable: true,\n/******/ \t\t\t\tget: getter\n/******/ \t\t\t});\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"/\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = 0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ (function(module, exports) {\n\n// based on https://github.com/mattdiamond/Recorderjs/blob/master/src/recorder.js\n// with a few optimizations including downsampling and trimming quiet samples\n\n/* global Blob self */\n/* eslint no-restricted-globals: off */\n/* eslint prefer-arrow-callback: [\"error\", { \"allowNamedFunctions\": true }] */\n/* eslint no-param-reassign: [\"error\", { \"props\": false }] */\n/* eslint no-use-before-define: [\"error\", { \"functions\": false }] */\n/* eslint no-plusplus: off */\n/* eslint comma-dangle: [\"error\", {\"functions\": \"never\", \"objects\": \"always-multiline\"}] */\n/* eslint-disable prefer-destructuring */\nconst bitDepth = 16;\nconst bytesPerSample = bitDepth / 8;\nconst outSampleRate = 16000;\nconst outNumChannels = 1;\n\nlet recLength = 0;\nlet recBuffers = [];\n\nconst options = {\n  sampleRate: 44000,\n  numChannels: 1,\n  useDownsample: true,\n  // controls if the encoder will trim silent samples at begining and end of buffer\n  useTrim: true,\n  // trim samples below this value at the beginnig and end of the buffer\n  // lower the value trim less silence (larger file size)\n  // reasonable values seem to be between 0.005 and 0.0005\n  quietTrimThreshold: 0.0008,\n  // how many samples to add back to the buffer before/after the quiet threshold\n  // higher values result in less silence trimming (larger file size)\n  // reasonable values seem to be between 3500 and 5000\n  quietTrimSlackBack: 4000,\n};\n\nself.onmessage = (evt) => {\n  switch (evt.data.command) {\n    case 'init':\n      init(evt.data.config);\n      break;\n    case 'record':\n      record(evt.data.buffer);\n      break;\n    case 'exportWav':\n      exportWAV(evt.data.type);\n      break;\n    case 'getBuffer':\n      getBuffer();\n      break;\n    case 'clear':\n      clear();\n      break;\n    case 'close':\n      self.close();\n      break;\n    default:\n      break;\n  }\n};\n\nfunction init(config) {\n  Object.assign(options, config);\n  initBuffers();\n}\n\nfunction record(inputBuffer) {\n  for (let channel = 0; channel < options.numChannels; channel++) {\n    recBuffers[channel].push(inputBuffer[channel]);\n  }\n  recLength += inputBuffer[0].length;\n}\n\nfunction exportWAV(type) {\n  const buffers = [];\n  for (let channel = 0; channel < options.numChannels; channel++) {\n    buffers.push(mergeBuffers(recBuffers[channel], recLength));\n  }\n  let interleaved;\n  if (options.numChannels === 2 && outNumChannels === 2) {\n    interleaved = interleave(buffers[0], buffers[1]);\n  } else {\n    interleaved = buffers[0];\n  }\n  const downsampledBuffer = downsampleTrimBuffer(interleaved, outSampleRate);\n  const dataview = encodeWAV(downsampledBuffer);\n  const audioBlob = new Blob([dataview], { type });\n\n  self.postMessage({\n    command: 'exportWAV',\n    data: audioBlob,\n  });\n}\n\nfunction getBuffer() {\n  const buffers = [];\n  for (let channel = 0; channel < options.numChannels; channel++) {\n    buffers.push(mergeBuffers(recBuffers[channel], recLength));\n  }\n  self.postMessage({ command: 'getBuffer', data: buffers });\n}\n\nfunction clear() {\n  recLength = 0;\n  recBuffers = [];\n  initBuffers();\n}\n\nfunction initBuffers() {\n  for (let channel = 0; channel < options.numChannels; channel++) {\n    recBuffers[channel] = [];\n  }\n}\n\nfunction mergeBuffers(recBuffer, length) {\n  const result = new Float32Array(length);\n  let offset = 0;\n  for (let i = 0; i < recBuffer.length; i++) {\n    result.set(recBuffer[i], offset);\n    offset += recBuffer[i].length;\n  }\n  return result;\n}\n\nfunction interleave(inputL, inputR) {\n  const length = inputL.length + inputR.length;\n  const result = new Float32Array(length);\n\n  let index = 0;\n  let inputIndex = 0;\n\n  while (index < length) {\n    result[index++] = inputL[inputIndex];\n    result[index++] = inputR[inputIndex];\n    inputIndex++;\n  }\n  return result;\n}\n\nfunction floatTo16BitPCM(output, offset, input) {\n  for (let i = 0, o = offset; i < input.length; i++, o += 2) {\n    const s = Math.max(-1, Math.min(1, input[i]));\n    output.setInt16(o, s < 0 ? s * 0x8000 : s * 0x7FFF, true);\n  }\n}\n\n// Lex doesn't require proper wav header\n// still inserting wav header for playing on client side\nfunction addHeader(view, length) {\n  // RIFF identifier 'RIFF'\n  view.setUint32(0, 1380533830, false);\n  // file length minus RIFF identifier length and file description length\n  view.setUint32(4, 36 + length, true);\n  // RIFF type 'WAVE'\n  view.setUint32(8, 1463899717, false);\n  // format chunk identifier 'fmt '\n  view.setUint32(12, 1718449184, false);\n  // format chunk length\n  view.setUint32(16, 16, true);\n  // sample format (raw)\n  view.setUint16(20, 1, true);\n  // channel count\n  view.setUint16(22, outNumChannels, true);\n  // sample rate\n  view.setUint32(24, outSampleRate, true);\n  // byte rate (sample rate * block align)\n  view.setUint32(28, outSampleRate * bytesPerSample * outNumChannels, true);\n  // block align (channel count * bytes per sample)\n  view.setUint16(32, bytesPerSample * outNumChannels, true);\n  // bits per sample\n  view.setUint16(34, bitDepth, true);\n  // data chunk identifier 'data'\n  view.setUint32(36, 1684108385, false);\n}\n\nfunction encodeWAV(samples) {\n  const buffer = new ArrayBuffer(44 + (samples.length * 2));\n  const view = new DataView(buffer);\n\n  addHeader(view, samples.length);\n  floatTo16BitPCM(view, 44, samples);\n\n  return view;\n}\n\nfunction downsampleTrimBuffer(buffer, rate) {\n  if (rate === options.sampleRate) {\n    return buffer;\n  }\n\n  const length = buffer.length;\n  const sampleRateRatio = options.sampleRate / rate;\n  const newLength = Math.round(length / sampleRateRatio);\n\n  const result = new Float32Array(newLength);\n  let offsetResult = 0;\n  let offsetBuffer = 0;\n  let firstNonQuiet = 0;\n  let lastNonQuiet = length;\n  while (offsetResult < result.length) {\n    const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);\n    let accum = 0;\n    let count = 0;\n    for (let i = offsetBuffer; (i < nextOffsetBuffer) && (i < length); i++) {\n      accum += buffer[i];\n      count++;\n    }\n    // mark first and last sample over the quiet threshold\n    if (accum > options.quietTrimThreshold) {\n      if (firstNonQuiet === 0) {\n        firstNonQuiet = offsetResult;\n      }\n      lastNonQuiet = offsetResult;\n    }\n    result[offsetResult] = accum / count;\n    offsetResult++;\n    offsetBuffer = nextOffsetBuffer;\n  }\n\n  /*\n  console.info('encoder trim size reduction',\n    (Math.min(newLength, lastNonQuiet + options.quietTrimSlackBack) -\n    Math.max(0, firstNonQuiet - options.quietTrimSlackBack)) / result.length\n  );\n  */\n  return (options.useTrim) ?\n    // slice based on quiet threshold and put slack back into the buffer\n    result.slice(\n      Math.max(0, firstNonQuiet - options.quietTrimSlackBack),\n      Math.min(newLength, lastNonQuiet + options.quietTrimSlackBack)\n    ) :\n    result;\n}\n\n\n/***/ })\n/******/ ]);\n//# sourceMappingURL=wav-worker.js.map", __webpack_require__.p + "bundle/wav-worker.js");
};

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string

var URL = window.URL || window.webkitURL;

module.exports = function (content, url) {
  try {
    try {
      var blob;

      try {
        // BlobBuilder = Deprecated, but widely implemented
        var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;

        blob = new BlobBuilder();

        blob.append(content);

        blob = blob.getBlob();
      } catch (e) {
        // The proposed API
        blob = new Blob([content]);
      }

      return new Worker(URL.createObjectURL(blob));
    } catch (e) {
      return new Worker('data:application/javascript,' + encodeURIComponent(content));
    }
  } catch (e) {
    if (!url) {
      throw Error('Inline worker is not supported');
    }

    return new Worker(url);
  }
};

/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_slicedToArray__ = __webpack_require__(73);
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

  // TODO need to change recorder event setter to support
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
        var errorMessage = 'Too many consecutive silent recordings: ' + (context.state.recState.silentRecordingCount + '.');
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject(new Error(errorMessage));
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
      var errorMessage = context.state.config.ui.showErrorDetails ? ' ' + error : '';
      console.error('converser error:', error);
      context.dispatch('stopConversation');
      context.dispatch('pushErrorMessage', 'Sorry, I had an error handling this conversation.' + errorMessage);
      context.commit('resetSilentRecordingCount');
    });
  };
};
/* harmony default export */ __webpack_exports__["a"] = (initRecorderHandlers);

/***/ }),
/* 178 */
/***/ (function(module, exports) {

module.exports = "data:audio/ogg;base64,T2dnUwACAAAAAAAAAAAyzN3NAAAAAGFf2X8BM39GTEFDAQAAAWZMYUMAAAAiEgASAAAAAAAkFQrEQPAAAAAAAAAAAAAAAAAAAAAAAAAAAE9nZ1MAAAAAAAAAAAAAMszdzQEAAAD5LKCSATeEAAAzDQAAAExhdmY1NS40OC4xMDABAAAAGgAAAGVuY29kZXI9TGF2YzU1LjY5LjEwMCBmbGFjT2dnUwAEARIAAAAAAAAyzN3NAgAAAKWVljkCDAD/+GkIAAAdAAABICI="

/***/ }),
/* 179 */
/***/ (function(module, exports) {

module.exports = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU2LjM2LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV6urq6urq6urq6urq6urq6urq6urq6urq6v////////////////////////////////8AAAAATGF2YzU2LjQxAAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAARTMu//MUZAYAAAGkAAAAAAAAA0gAAAAAOTku//MUZAkAAAGkAAAAAAAAA0gAAAAANVVV"

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(74);
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
      var _this = this;

      var sessionAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var postTextReq = this.lexRuntimeClient.postText({
        botAlias: this.botAlias,
        botName: this.botName,
        userId: this.userId,
        inputText: inputText,
        sessionAttributes: sessionAttributes
      });
      return this.credentials.getPromise().then(function (creds) {
        return creds && _this.initCredentials(creds);
      }).then(function () {
        return postTextReq.promise();
      });
    }
  }, {
    key: 'postContent',
    value: function postContent(blob) {
      var sessionAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _this2 = this;

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

      return this.credentials.getPromise().then(function (creds) {
        return creds && _this2.initCredentials(creds);
      }).then(function () {
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