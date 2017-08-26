/**
 * vuelidation v1.0.0
 * (c) 2017 CJ Lazell
 * @license MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vuelidation = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal;

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
var root = _freeGlobal || freeSelf || Function('return this')();
var _root = root;

var Symbol = _root.Symbol;
var _Symbol = Symbol;

var objectProto$2 = Object.prototype;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
var nativeObjectToString = objectProto$2.toString;
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
function getRawTag(value) {
  var isOwn = hasOwnProperty$2.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var _getRawTag = getRawTag;

var objectProto$3 = Object.prototype;
var nativeObjectToString$1 = objectProto$3.toString;
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}
var _objectToString = objectToString;

var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}
var _baseGetTag = baseGetTag;

function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}
var isObject_1 = isObject;

var asyncTag = '[object AsyncFunction]';
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var proxyTag = '[object Proxy]';
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_1 = isFunction;

var coreJsData = _root['__core-js_shared__'];
var _coreJsData = coreJsData;

var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}
var _isMasked = isMasked;

var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}
var _toSource = toSource;

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype;
var objectProto$1 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}
var _baseIsNative = baseIsNative;

function getValue(object, key) {
  return object == null ? undefined : object[key];
}
var _getValue = getValue;

function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}
var _getNative = getNative;

var defineProperty = (function() {
  try {
    var func = _getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());
var _defineProperty = defineProperty;

function baseAssignValue(object, key, value) {
  if (key == '__proto__' && _defineProperty) {
    _defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}
var _baseAssignValue = baseAssignValue;

function eq(value, other) {
  return value === other || (value !== value && other !== other);
}
var eq_1 = eq;

var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq_1(objValue, value)) ||
      (value === undefined && !(key in object))) {
    _baseAssignValue(object, key, value);
  }
}
var _assignValue = assignValue;

function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1,
      length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;
    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      _baseAssignValue(object, key, newValue);
    } else {
      _assignValue(object, key, newValue);
    }
  }
  return object;
}
var _copyObject = copyObject;

function identity(value) {
  return value;
}
var identity_1 = identity;

function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var _apply = apply;

var nativeMax = Math.max;
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return _apply(func, this, otherArgs);
  };
}
var _overRest = overRest;

function constant(value) {
  return function() {
    return value;
  };
}
var constant_1 = constant;

var baseSetToString = !_defineProperty ? identity_1 : function(func, string) {
  return _defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant_1(string),
    'writable': true
  });
};
var _baseSetToString = baseSetToString;

var HOT_COUNT = 800;
var HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0,
      lastCalled = 0;
  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}
var _shortOut = shortOut;

var setToString = _shortOut(_baseSetToString);
var _setToString = setToString;

function baseRest(func, start) {
  return _setToString(_overRest(func, start, identity_1), func + '');
}
var _baseRest = baseRest;

var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var isLength_1 = isLength;

function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}
var isArrayLike_1 = isArrayLike;

var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}
var _isIndex = isIndex;

function isIterateeCall(value, index, object) {
  if (!isObject_1(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike_1(object) && _isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq_1(object[index], value);
  }
  return false;
}
var _isIterateeCall = isIterateeCall;

function createAssigner(assigner) {
  return _baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;
    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;
    if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var _createAssigner = createAssigner;

function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var _baseTimes = baseTimes;

function isObjectLike(value) {
  return value != null && typeof value == 'object';
}
var isObjectLike_1 = isObjectLike;

var argsTag = '[object Arguments]';
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}
var _baseIsArguments = baseIsArguments;

var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$4.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};
var isArguments_1 = isArguments;

var isArray = Array.isArray;
var isArray_1 = isArray;

function stubFalse() {
  return false;
}
var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? _root.Buffer : undefined;
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
var isBuffer = nativeIsBuffer || stubFalse_1;
module.exports = isBuffer;
});

var argsTag$1 = '[object Arguments]';
var arrayTag = '[object Array]';
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var funcTag$1 = '[object Function]';
var mapTag = '[object Map]';
var numberTag = '[object Number]';
var objectTag = '[object Object]';
var regexpTag = '[object RegExp]';
var setTag = '[object Set]';
var stringTag = '[object String]';
var weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]';
var dataViewTag = '[object DataView]';
var float32Tag = '[object Float32Array]';
var float64Tag = '[object Float64Array]';
var int8Tag = '[object Int8Array]';
var int16Tag = '[object Int16Array]';
var int32Tag = '[object Int32Array]';
var uint8Tag = '[object Uint8Array]';
var uint8ClampedTag = '[object Uint8ClampedArray]';
var uint16Tag = '[object Uint16Array]';
var uint32Tag = '[object Uint32Array]';
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike_1(value) &&
    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}
var _baseIsTypedArray = baseIsTypedArray;

function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var freeProcess = moduleExports && _freeGlobal.process;
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());
module.exports = nodeUtil;
});

var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;
var isTypedArray_1 = isTypedArray;

var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$3.call(value, key)) &&
        !(skipIndexes && (
           key == 'length' ||
           (isBuff && (key == 'offset' || key == 'parent')) ||
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           _isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}
var _arrayLikeKeys = arrayLikeKeys;

var objectProto$7 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$7;
  return value === proto;
}
var _isPrototype = isPrototype;

function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var _nativeKeysIn = nativeKeysIn;

var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject_1(object)) {
    return _nativeKeysIn(object);
  }
  var isProto = _isPrototype(object),
      result = [];
  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$5.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var _baseKeysIn = baseKeysIn;

function keysIn(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
}
var keysIn_1 = keysIn;

var assignInWith = _createAssigner(function(object, source, srcIndex, customizer) {
  _copyObject(source, keysIn_1(source), object, customizer);
});
var assignInWith_1 = assignInWith;

function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var _overArg = overArg;

var getPrototype = _overArg(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype;

var objectTag$1 = '[object Object]';
var funcProto$2 = Function.prototype;
var objectProto$8 = Object.prototype;
var funcToString$2 = funcProto$2.toString;
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
var objectCtorString = funcToString$2.call(Object);
function isPlainObject(value) {
  if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag$1) {
    return false;
  }
  var proto = _getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$6.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString$2.call(Ctor) == objectCtorString;
}
var isPlainObject_1 = isPlainObject;

var domExcTag = '[object DOMException]';
var errorTag$1 = '[object Error]';
function isError(value) {
  if (!isObjectLike_1(value)) {
    return false;
  }
  var tag = _baseGetTag(value);
  return tag == errorTag$1 || tag == domExcTag ||
    (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject_1(value));
}
var isError_1 = isError;

var attempt = _baseRest(function(func, args) {
  try {
    return _apply(func, undefined, args);
  } catch (e) {
    return isError_1(e) ? e : new Error(e);
  }
});
var attempt_1 = attempt;

function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var _arrayMap = arrayMap;

function baseValues(object, props) {
  return _arrayMap(props, function(key) {
    return object[key];
  });
}
var _baseValues = baseValues;

var objectProto$9 = Object.prototype;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
function customDefaultsAssignIn(objValue, srcValue, key, object) {
  if (objValue === undefined ||
      (eq_1(objValue, objectProto$9[key]) && !hasOwnProperty$7.call(object, key))) {
    return srcValue;
  }
  return objValue;
}
var _customDefaultsAssignIn = customDefaultsAssignIn;

var stringEscapes = {
  '\\': '\\',
  "'": "'",
  '\n': 'n',
  '\r': 'r',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};
function escapeStringChar(chr) {
  return '\\' + stringEscapes[chr];
}
var _escapeStringChar = escapeStringChar;

var nativeKeys = _overArg(Object.keys, Object);
var _nativeKeys = nativeKeys;

var objectProto$10 = Object.prototype;
var hasOwnProperty$8 = objectProto$10.hasOwnProperty;
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$8.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}
var _baseKeys = baseKeys;

function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}
var keys_1 = keys;

var reInterpolate = /<%=([\s\S]+?)%>/g;
var _reInterpolate = reInterpolate;

function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}
var _basePropertyOf = basePropertyOf;

var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};
var escapeHtmlChar = _basePropertyOf(htmlEscapes);
var _escapeHtmlChar = escapeHtmlChar;

var symbolTag = '[object Symbol]';
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
}
var isSymbol_1 = isSymbol;

var INFINITY = 1 / 0;
var symbolProto = _Symbol ? _Symbol.prototype : undefined;
var symbolToString = symbolProto ? symbolProto.toString : undefined;
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  if (isArray_1(value)) {
    return _arrayMap(value, baseToString) + '';
  }
  if (isSymbol_1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}
var _baseToString = baseToString;

function toString(value) {
  return value == null ? '' : _baseToString(value);
}
var toString_1 = toString;

var reUnescapedHtml = /[&<>"']/g;
var reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
function escape(string) {
  string = toString_1(string);
  return (string && reHasUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, _escapeHtmlChar)
    : string;
}
var _escape = escape;

var reEscape = /<%-([\s\S]+?)%>/g;
var _reEscape = reEscape;

var reEvaluate = /<%([\s\S]+?)%>/g;
var _reEvaluate = reEvaluate;

var templateSettings = {
  'escape': _reEscape,
  'evaluate': _reEvaluate,
  'interpolate': _reInterpolate,
  'variable': '',
  'imports': {
    '_': { 'escape': _escape }
  }
};
var templateSettings_1 = templateSettings;

var reEmptyStringLeading = /\b__p \+= '';/g;
var reEmptyStringMiddle = /\b(__p \+=) '' \+/g;
var reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
var reNoMatch = /($^)/;
var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
function template(string, options, guard) {
  var settings = templateSettings_1.imports._.templateSettings || templateSettings_1;
  if (guard && _isIterateeCall(string, options, guard)) {
    options = undefined;
  }
  string = toString_1(string);
  options = assignInWith_1({}, options, settings, _customDefaultsAssignIn);
  var imports = assignInWith_1({}, options.imports, settings.imports, _customDefaultsAssignIn),
      importsKeys = keys_1(imports),
      importsValues = _baseValues(imports, importsKeys);
  var isEscaping,
      isEvaluating,
      index = 0,
      interpolate = options.interpolate || reNoMatch,
      source = "__p += '";
  var reDelimiters = RegExp(
    (options.escape || reNoMatch).source + '|' +
    interpolate.source + '|' +
    (interpolate === _reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
    (options.evaluate || reNoMatch).source + '|$'
  , 'g');
  var sourceURL = 'sourceURL' in options ? '//# sourceURL=' + options.sourceURL + '\n' : '';
  string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
    interpolateValue || (interpolateValue = esTemplateValue);
    source += string.slice(index, offset).replace(reUnescapedString, _escapeStringChar);
    if (escapeValue) {
      isEscaping = true;
      source += "' +\n__e(" + escapeValue + ") +\n'";
    }
    if (evaluateValue) {
      isEvaluating = true;
      source += "';\n" + evaluateValue + ";\n__p += '";
    }
    if (interpolateValue) {
      source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
    }
    index = offset + match.length;
    return match;
  });
  source += "';\n";
  var variable = options.variable;
  if (!variable) {
    source = 'with (obj) {\n' + source + '\n}\n';
  }
  source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
    .replace(reEmptyStringMiddle, '$1')
    .replace(reEmptyStringTrailing, '$1;');
  source = 'function(' + (variable || 'obj') + ') {\n' +
    (variable
      ? ''
      : 'obj || (obj = {});\n'
    ) +
    "var __t, __p = ''" +
    (isEscaping
       ? ', __e = _.escape'
       : ''
    ) +
    (isEvaluating
      ? ', __j = Array.prototype.join;\n' +
        "function print() { __p += __j.call(arguments, '') }\n"
      : ';\n'
    ) +
    source +
    'return __p\n}';
  var result = attempt_1(function() {
    return Function(importsKeys, sourceURL + 'return ' + source)
      .apply(undefined, importsValues);
  });
  result.source = source;
  if (isError_1(result)) {
    throw result;
  }
  return result;
}
var template_1 = template;

var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (isArray_1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol_1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}
var _isKey = isKey;

var nativeCreate = _getNative(Object, 'create');
var _nativeCreate = nativeCreate;

function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}
var _hashClear = hashClear;

function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete = hashDelete;

var HASH_UNDEFINED = '__lodash_hash_undefined__';
var objectProto$11 = Object.prototype;
var hasOwnProperty$9 = objectProto$11.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$9.call(data, key) ? data[key] : undefined;
}
var _hashGet = hashGet;

var objectProto$12 = Object.prototype;
var hasOwnProperty$10 = objectProto$12.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$10.call(data, key);
}
var _hashHas = hashHas;

var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}
var _hashSet = hashSet;

function Hash(entries) {
  var this$1 = this;
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this$1.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;
var _Hash = Hash;

function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear;

function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf;

var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete = listCacheDelete;

function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}
var _listCacheGet = listCacheGet;

function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas;

function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet;

function ListCache(entries) {
  var this$1 = this;
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this$1.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;
var _ListCache = ListCache;

var Map = _getNative(_root, 'Map');
var _Map = Map;

function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}
var _mapCacheClear = mapCacheClear;

function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}
var _isKeyable = isKeyable;

function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}
var _getMapData = getMapData;

function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete = mapCacheDelete;

function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}
var _mapCacheGet = mapCacheGet;

function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}
var _mapCacheHas = mapCacheHas;

function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet;

function MapCache(entries) {
  var this$1 = this;
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this$1.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;
var _MapCache = MapCache;

var FUNC_ERROR_TEXT = 'Expected a function';
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || _MapCache);
  return memoized;
}
memoize.Cache = _MapCache;
var memoize_1 = memoize;

var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize_1(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var _memoizeCapped = memoizeCapped;

var reLeadingDot = /^\./;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = _memoizeCapped(function(string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});
var _stringToPath = stringToPath;

function castPath(value, object) {
  if (isArray_1(value)) {
    return value;
  }
  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}
var _castPath = castPath;

var INFINITY$1 = 1 / 0;
function toKey(value) {
  if (typeof value == 'string' || isSymbol_1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}
var _toKey = toKey;

function baseGet(object, path) {
  path = _castPath(path, object);
  var index = 0,
      length = path.length;
  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}
var _baseGet = baseGet;

function get(object, path, defaultValue) {
  var result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}
var get_1 = get;

var DataView = _getNative(_root, 'DataView');
var _DataView = DataView;

var Promise = _getNative(_root, 'Promise');
var _Promise = Promise;

var Set = _getNative(_root, 'Set');
var _Set = Set;

var WeakMap = _getNative(_root, 'WeakMap');
var _WeakMap = WeakMap;

var mapTag$2 = '[object Map]';
var objectTag$2 = '[object Object]';
var promiseTag = '[object Promise]';
var setTag$2 = '[object Set]';
var weakMapTag$1 = '[object WeakMap]';
var dataViewTag$1 = '[object DataView]';
var dataViewCtorString = _toSource(_DataView);
var mapCtorString = _toSource(_Map);
var promiseCtorString = _toSource(_Promise);
var setCtorString = _toSource(_Set);
var weakMapCtorString = _toSource(_WeakMap);
var getTag = _baseGetTag;
if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
    (_Map && getTag(new _Map) != mapTag$2) ||
    (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
    (_Set && getTag(new _Set) != setTag$2) ||
    (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
  getTag = function(value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$2 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$1;
        case mapCtorString: return mapTag$2;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$2;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}
var _getTag = getTag;

var mapTag$1 = '[object Map]';
var setTag$1 = '[object Set]';
var objectProto$13 = Object.prototype;
var hasOwnProperty$11 = objectProto$13.hasOwnProperty;
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike_1(value) &&
      (isArray_1(value) || typeof value == 'string' || typeof value.splice == 'function' ||
        isBuffer_1(value) || isTypedArray_1(value) || isArguments_1(value))) {
    return !value.length;
  }
  var tag = _getTag(value);
  if (tag == mapTag$1 || tag == setTag$1) {
    return !value.size;
  }
  if (_isPrototype(value)) {
    return !_baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty$11.call(value, key)) {
      return false;
    }
  }
  return true;
}
var isEmpty_1 = isEmpty;

var stringTag$1 = '[object String]';
function isString(value) {
  return typeof value == 'string' ||
    (!isArray_1(value) && isObjectLike_1(value) && _baseGetTag(value) == stringTag$1);
}
var isString_1 = isString;

var validations = {
  alphabetic: function alphabetic (value) {
    var msg   = 'Must be a alphabetic value';
    var valid = !Array.isArray(value) && /^[a-zA-Z]*$/.test(value);
    return [valid, msg]
  },
  alpha: function alpha (value) {
    var msg   = 'Must only contain letters and numbers';
    var valid = !Array.isArray(value) && /^[a-zA-Z0-9]*$/.test(value);
    return [valid, msg]
  },
  alphaDash: function alphaDash (value) {
    var msg   = 'Must only contain letters, numbers, underscores or dashes';
    var valid = !Array.isArray(value) && /^[a-zA-Z0-9_-]*$/.test(value);
    return [valid, msg]
  },
  alphaSpace: function alphaSpace (value) {
    var msg   = 'Must only contain letters, numbers or spaces';
    var valid = !Array.isArray(value) && /^[a-zA-Z0-9\s]*$/.test(value);
    return [valid, msg]
  },
  length: function length (value, totalLength) {
    var msg   = "Must be " + totalLength + " character(s)";
    var valid = value.length === Number(totalLength);
    return [valid, msg]
  },
  between: function between (value, args) {
    var msg   = 'Must be between {{ min }} and {{ max }}';
    var valid = Number(args.min) <= value && Number(args.max) >= value;
    return [valid, msg]
  },
  betweenLength: function betweenLength (value, args) {
    var msg   = 'Must have between {{ min }} and {{ max }} characters';
    var valid = Number(args.min) <= value.length && Number(args.max) >= value.length;
    return [valid, msg]
  },
  decimal: function decimal (value, args) {
    if ( args === void 0 ) args = {};
    var points = args.points || (args.points = '*');
    var msg    = 'Must be a decimal<% if (points && points !== "*") { %> with {{ points }} points<% } %>';
    if (value === null || value === undefined || value === '') {
      return [false, msg]
    }
    var regexPart = points === '*' ? '*' : ("{" + points + "," + points + "}");
    var regex = new RegExp(("^[0-9]*.?[0-9]" + regexPart + "$"));
    if (!regex.test(value)) {
      return [false, msg]
    }
    return [!Number.isNaN(parseFloat(value)), msg]
  },
  email: function email (value) {
    var msg   = 'Not a valid email';
    var valid = /^(([^<>()[\]\\.,;:#\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/.test(value);
    return [valid, msg]
  },
  includes: function includes (value, args) {
    args.value = value;
    var values = args.values;
    var msg  = '{{ value }} is not one of the following: {{ values.join(", ") }}';
    return [!!values.filter(function (option) { return option === value; }).length, msg]
  },
  numeric: function numeric (value) {
    var msg = 'Must be a numeric value';
    return [!Array.isArray(value) && /^[0-9]*$/.test(value), msg]
  },
  required: function required (value) {
    var msg = 'Required';
    if (value !== null && value !== undefined) {
      value = value.toString();
    }
    if (isString_1(value)) {
      value = value.trim();
    }
    return [!isEmpty_1(value), msg]
  },
};

var isObject$2 = function (item) {
  return !!(item && typeof item === 'object' && !Array.isArray(item) && item !== null)
};
var flatten = function (source, flatKey) {
  var newSource = {};
  Object.keys(source).forEach(function (key) {
    var value = source[key];
    var currentFlatKey = flatKey ? (flatKey + "." + key) : key;
    if (isObject$2(value)) {
      newSource = Object.assign(newSource, flatten(value, currentFlatKey));
    } else {
      newSource[currentFlatKey] = value;
    }
  });
  return newSource
};

var defaultOptions = {
  msg: {},
  methods: {},
};
function renderMsg (msg, args) {
  return template_1(args.msg || msg, { interpolate: /{{([\s\S]+?)}}/g })(args)
}
function valid (path) {
  var this$1 = this;
  var data        = this.$options.vuelidation.data;
  var validations$$1 = get_1(data, path, data);
  Object.entries(validations$$1).forEach(function (ref) {
    var dataName = ref[0];
    var dataValidations = ref[1];
    var dataPath = path ? (path + "." + dataName) : dataName;
    validate.call(this$1, dataPath, get_1(this$1, dataPath), dataValidations);
  });
  return !this.vuelidationErrors
}
function error (dataName) {
  var errors = this.vuelidationErrors || {};
  var error    = errors[dataName];
  return error ? error[0] : null
}
function setErrors (newErrors) {
  var this$1 = this;
  var errors = this.vuelidationErrors = this.vuelidationErrors || {};
  Object.entries(newErrors).forEach(function (ref) {
    var dataName = ref[0];
    var dataValidations = ref[1];
    errors[dataName] = [];
    if (!Array.isArray(dataValidations)) {
      dataValidations = Array(dataValidations);
    }
    dataValidations.forEach(function (msg) {
      var validation    = this$1.$vuelidation.methods[msg];
      var validationMsg = this$1.$vuelidation.options.msg[msg] || msg;
      errors[dataName].push(renderMsg(validationMsg, validation || {}));
    });
  });
}
function validate (path, value, dataValidations) {
  var this$1 = this;
  var errors = [];
  if (dataValidations.if && !dataValidations.if.call(this)) {
    return
  }
  if (dataValidations.unless && !!dataValidations.unless.call(this)) {
    return
  }
  Object.entries(dataValidations).forEach(function (ref) {
    var name = ref[0];
    var args = ref[1];
    var validation = this$1.$vuelidation.methods[name];
    if (validation) {
      var ref$1 = validation(value, args);
      var valid = ref$1[0];
      var msg = ref$1[1];
      if (!valid) {
        errors.push(renderMsg(msg, args));
      }
    }
  });
  if (errors.length) {
    this.vuelidationErrors = this.vuelidationErrors || {};
    this.vuelidationErrors[path] = errors;
  } else if (this.vuelidationErrors) {
    if (this.vuelidationErrors[path]) {
      delete this.vuelidationErrors[path];
    }
    if (Object.keys(this.vuelidationErrors).length === 0) {
      this.vuelidationErrors = null;
    }
  }
}
var install = function (Vue, options) {
  if ( options === void 0 ) options = {};
  options = Object.assign({}, defaultOptions, options);
  Vue.mixin({
    created: function created () {
      var this$1 = this;
      var vuelidation = this.$options.vuelidation;
      if (vuelidation && vuelidation.data) {
        Object.entries(flatten(this.$data)).forEach(function (ref) {
          var path = ref[0];
          var _ = ref[1];
          var validations$$1 = get_1(vuelidation.data, path);
          if (validations$$1) {
            this$1.$watch(path, function (value) {
              validate.call(this$1, path, value, validations$$1);
            });
          }
        });
      }
    },
    computed: {
      $vuelidation: function $vuelidation () {
        var this$1 = this;
        if (this.$options.vuelidation !== undefined) {
          return {
            error: function (dataName) {
              return error.call(this$1, dataName)
            },
            errors: function (path) {
              return get_1(this$1.vuelidationErrors, path, this$1.vuelidationErrors)
            },
            setErrors: function (errors) {
              return setErrors.call(this$1, errors)
            },
            reset: function (callback) {
              this$1.vuelidationErrors = null;
              this$1.$nextTick(function () {
                this$1.vuelidationErrors = null;
                if (callback) {
                  callback.call(this$1);
                }
              });
            },
            valid: function (dataName) {
              return valid.call(this$1, dataName)
            },
            options: Object.assign({}, options,
              this.$options.vuelidation),
            methods: Object.assign({}, validations,
              options.methods,
              (this.$options.vuelidation.methods)),
          }
        } else {
          return undefined
        }
      },
    },
    data: function data () {
      return {
        vuelidationErrors: null,
      }
    },
  });
};
var index = {
  install: install,
  renderMsg: renderMsg,
  defaultOptions: defaultOptions,
  version: '1.0.0',
};

return index;

})));
