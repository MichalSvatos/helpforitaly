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
})({"src/js/sharer.js":[function(require,module,exports) {
/**
 * @preserve
 * Sharer.js
 *
 * @description Create your own social share buttons
 * @version 0.4.0
 * @author Ellison Leao <ellisonleao@gmail.com>
 * @license GPLv3
 *
 */
(function (window, document) {
  'use strict';
  /**
  * @constructor
  */

  var Sharer = function Sharer(elem) {
    this.elem = elem;
  };
  /**
  *  @function init
  *  @description bind the events for multiple sharer elements
  *  @returns {Empty}
  */


  Sharer.init = function () {
    var elems = document.querySelectorAll('[data-sharer]'),
        i,
        l = elems.length;

    for (i = 0; i < l; i++) {
      elems[i].addEventListener('click', Sharer.add);
    }
  };
  /**
  *  @function add
  *  @description bind the share event for a single dom element
  *  @returns {Empty}
  */


  Sharer.add = function (elem) {
    var target = elem.currentTarget || elem.srcElement;
    var sharer = new Sharer(target);
    sharer.share();
  }; // instance methods


  Sharer.prototype = {
    constructor: Sharer,

    /**
    *  @function getValue
    *  @description Helper to get the attribute of a DOM element
    *  @param {String} attr DOM element attribute
    *  @returns {String|Empty} returns the attr value or empty string
    */
    getValue: function getValue(attr) {
      var val = this.elem.getAttribute('data-' + attr); // handing facebook hashtag attribute

      if (val && attr === 'hashtag') {
        if (!val.startsWith('#')) {
          val = '#' + val;
        }
      }

      return val;
    },

    /**
    * @event share
    * @description Main share event. Will pop a window or redirect to a link
    * based on the data-sharer attribute.
    */
    share: function share() {
      var sharer = this.getValue('sharer').toLowerCase(),
          sharers = {
        facebook: {
          shareUrl: 'https://www.facebook.com/sharer/sharer.php',
          params: {
            u: this.getValue('url'),
            hashtag: this.getValue('hashtag')
          }
        },
        linkedin: {
          shareUrl: 'https://www.linkedin.com/shareArticle',
          params: {
            url: this.getValue('url'),
            mini: true
          }
        },
        twitter: {
          shareUrl: 'https://twitter.com/intent/tweet/',
          params: {
            text: this.getValue('title'),
            url: this.getValue('url'),
            hashtags: this.getValue('hashtags'),
            via: this.getValue('via')
          }
        },
        email: {
          shareUrl: 'mailto:' + this.getValue('to') || '',
          params: {
            subject: this.getValue('subject'),
            body: this.getValue('title') + '\n' + this.getValue('url')
          },
          isLink: true
        },
        whatsapp: {
          shareUrl: this.getValue('web') !== null ? 'https://api.whatsapp.com/send' : 'whatsapp://send',
          params: {
            text: this.getValue('title') + ' ' + this.getValue('url')
          },
          isLink: true
        },
        telegram: {
          shareUrl: this.getValue('web') !== null ? 'https://telegram.me/share' : 'tg://msg_url',
          params: {
            text: this.getValue('title'),
            url: this.getValue('url'),
            to: this.getValue('to')
          },
          isLink: true
        },
        reddit: {
          shareUrl: 'https://www.reddit.com/submit',
          params: {
            url: this.getValue('url')
          }
        },
        messenger: {
          shareUrl: 'fb-messenger://share',
          params: {
            link: this.getValue('url')
          }
        }
      },
          s = sharers[sharer]; // custom popups sizes

      if (s) {
        s.width = this.getValue('width');
        s.height = this.getValue('height');
      }

      return s !== undefined ? this.urlSharer(s) : false;
    },

    /**
    * @event urlSharer
    * @param {Object} sharer
    */
    urlSharer: function urlSharer(sharer) {
      var p = sharer.params || {},
          keys = Object.keys(p),
          i,
          str = keys.length > 0 ? '?' : '';

      for (i = 0; i < keys.length; i++) {
        if (str !== '?') {
          str += '&';
        }

        if (p[keys[i]]) {
          str += keys[i] + '=' + encodeURIComponent(p[keys[i]]);
        }
      }

      sharer.shareUrl += str;

      if (!sharer.isLink) {
        var popWidth = sharer.width || 600,
            popHeight = sharer.height || 480,
            left = window.innerWidth / 2 - popWidth / 2 + window.screenX,
            top = window.innerHeight / 2 - popHeight / 2 + window.screenY,
            popParams = 'scrollbars=no, width=' + popWidth + ', height=' + popHeight + ', top=' + top + ', left=' + left,
            newWindow = window.open(sharer.shareUrl, '', popParams);

        if (window.focus) {
          newWindow.focus();
        }
      } else {
        window.location.href = sharer.shareUrl;
      }
    }
  }; // adding sharer events on domcontentload

  if (document.readyState === 'complete' || document.readyState !== 'loading') {
    Sharer.init();
  } else {
    document.addEventListener('DOMContentLoaded', Sharer.init);
  } // turbolinks 3 compatibility


  window.addEventListener('page:load', Sharer.init); // turbolinks 5 compatibility

  window.addEventListener('turbolinks:load', Sharer.init); // exporting sharer for external usage

  window.Sharer = Sharer;
})(window, document);
},{}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50982" + '/');

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
      }); // Enable HMR for CSS by default.

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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/js/sharer.js"], null)
//# sourceMappingURL=/src/js/sharer.js.map