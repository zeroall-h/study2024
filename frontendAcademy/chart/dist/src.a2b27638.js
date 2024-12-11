// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/index.template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var template = "\n    <div class=\"min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12\">\n    <!-- Container -->\n    <div class=\"container mx-auto\">\n      <div class=\"flex justify-center px-6 my-12 \">\n        <!-- Row -->\n        <div class=\"w-full xl:w-3/4 lg:w-11/12 shadow-xl flex\">\n          <!-- Col -->\n          <div\n            class=\"w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg\"\n            style=\"background-image: url('https://images.unsplash.com/photo-1602918386084-58983c3bafac?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1900&q=80')\"            \n          ></div>\n          <!-- Col -->\n          <div class=\"w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none p-16\">\n\n            <h3 class=\"pt-4 text-2xl text-center mb-20\">Javascript & Typescript Essential Chapter 5 - Chart</h3>\n\n            <div id=\"chart\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n</div>\n";
var _default = exports.default = Handlebars.compile(template);
},{}],"src/lib/chart.template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var template = "\n<svg viewbox=\"0 0 400 400\">\n\n  <circle fill=\"#ccc\" cx=\"200\" cy=\"200\" r=\"200\" />\n  <circle cx=\"200\" cy=\"200\" r=\"160\" transform=\"rotate(-90, 200, 200)\"\n    stroke-dasharray=\"0, 1000\" stroke=\"#7cb342\" stroke-width=\"80\" data-fallback=\"edge\">\n    <animate attributeName=\"stroke-dasharray\" dur=\"{{duration}}\" to=\"{{percent}},1000\" fill=\"freeze\" />\n  </circle>\n\n  <circle cx=\"200\" cy=\"200\" r=\"160\" fill=\"#fff\" />\n  <text id=\"progress\" x=\"200\" y=\"55%\" text-anchor=\"middle\" font-size=\"90\" fill=\"#3c4946\">1%</text>\n  <text x=\"200\" y=\"65%\" text-anchor=\"middle\" font-size=\"16\" fill=\"#3c4946\">{{label}}</text>\n</svg>\n";
var _default = exports.default = Handlebars.compile(template);
},{}],"src/lib/chart.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _chart = _interopRequireDefault(require("./chart.template"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var defaultOptions = {
  percent: 0,
  duration: 1000,
  frame: 30
};

/**
 * Chart 클래스
 */
var _template = /*#__PURE__*/new WeakMap();
var _el = /*#__PURE__*/new WeakMap();
var _percent = /*#__PURE__*/new WeakMap();
var _duration = /*#__PURE__*/new WeakMap();
var _label = /*#__PURE__*/new WeakMap();
var _frame = /*#__PURE__*/new WeakMap();
var _handle = /*#__PURE__*/new WeakMap();
var Chart = /*#__PURE__*/function () {
  /**
   * 
   * @param {string} container - 마운트될 DOM 컨테이너 셀렉터
   * @param {string} data - 옵션 데이타 duration, frame
   * @example
   * new Chart('#root', {
   *   duration: 2000,
   *   frame: 20,
   * });
   */
  function Chart(container) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Chart);
    _classPrivateFieldInitSpec(this, _template, _chart.default);
    _classPrivateFieldInitSpec(this, _el, void 0);
    _classPrivateFieldInitSpec(this, _percent, void 0);
    _classPrivateFieldInitSpec(this, _duration, void 0);
    _classPrivateFieldInitSpec(this, _label, void 0);
    _classPrivateFieldInitSpec(this, _frame, void 0);
    _classPrivateFieldInitSpec(this, _handle, void 0);
    var _defaultOptions$data = _objectSpread(_objectSpread({}, defaultOptions), {}, {
        data: data
      }),
      duration = _defaultOptions$data.duration,
      frame = _defaultOptions$data.frame,
      percent = _defaultOptions$data.percent;
    _classPrivateFieldSet(_duration, this, duration);
    _classPrivateFieldSet(_frame, this, frame);
    _classPrivateFieldSet(_percent, this, percent);
    _classPrivateFieldSet(_el, this, document.querySelector(container));
  }

  /**
   * 퍼센트를 설정합니다.
   */
  return _createClass(Chart, [{
    key: "percent",
    set: function set(per) {
      _classPrivateFieldSet(_percent, this, per);
    }

    /**
     * 애니메이션 시간을 ms 단위로 설정합니다.
     */
  }, {
    key: "duration",
    set: function set(dur) {
      _classPrivateFieldSet(_duration, this, dur);
    }

    /**
     * 에니메이션이 실행 될 때 초당 프레임을 설정합니다.
     */
  }, {
    key: "frame",
    set: function set(fr) {
      _classPrivateFieldSet(_frame, this, fr);
    }
  }, {
    key: "label",
    set: function set(text) {
      _classPrivateFieldSet(_label, this, text);
    }
    /**
     * 소스 데이타를 설정합니다.
     * @param {Array} source - 2차원 배열로 제공합니다.
     */
  }, {
    key: "setDataSource",
    value: function setDataSource(source) {}
    /**
     * UI 업데이트를 수행합니다.
     */
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      _classPrivateFieldGet(_el, this).innerHTML = _classPrivateFieldGet(_template, this).call(this, {
        percent: _classPrivateFieldGet(_percent, this) * 10,
        duration: "".concat(_classPrivateFieldGet(_duration, this) / 1000, "s"),
        label: _classPrivateFieldGet(_label, this)
      });
      var maxLoop = Math.floor(_classPrivateFieldGet(_duration, this) / (1000 / _classPrivateFieldGet(_frame, this)));
      var loopCount = 0;
      _classPrivateFieldSet(_handle, this, setInterval(function () {
        loopCount++;
        _classPrivateFieldGet(_el, _this).querySelector('#progress').innerHTML = loopCount > maxLoop ? "".concat(_classPrivateFieldGet(_percent, _this), "%") : "".concat(Math.floor(_classPrivateFieldGet(_percent, _this) / maxLoop) * loopCount, "%");
        if (loopCount > maxLoop) {
          clearInterval(_classPrivateFieldGet(_handle, _this));
        }
      }, 1000 / _classPrivateFieldGet(_frame, this)));
    }
  }]);
}();
var _default = exports.default = Chart;
},{"./chart.template":"src/lib/chart.template.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _index = _interopRequireDefault(require("./index.template"));
var _chart = _interopRequireDefault(require("./lib/chart"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function main() {
  var conatiner = document.querySelector('#root');
  conatiner.innerHTML = (0, _index.default)();
  var chart = new _chart.default('#chart');
  chart.percent = 75;
  chart.duration = 1000;
  chart.label = '충전중';
  chart.render();
}
document.addEventListener('DOMContentLoaded', main);
},{"./index.template":"src/index.template.js","./lib/chart":"src/lib/chart.js"}],"../../../../../../opt/homebrew/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60300" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../../../../opt/homebrew/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map