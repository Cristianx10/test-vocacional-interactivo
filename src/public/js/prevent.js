

//var $ = require ('jquery');

/*

!(function(e) {
  function t(n) {
    if (o[n]) return o[n].exports;
    var r = (o[n] = { i: n, l: !1, exports: {} });
    return e[n].call(r.exports, r, r.exports, t), (r.l = !0), r.exports;
  }
  var o = {};
  (t.m = e),
    (t.c = o),
    (t.d = function(e, o, n) {
      t.o(e, o) ||
        Object.defineProperty(e, o, {
          configurable: !1,
          enumerable: !0,
          get: n
        });
    }),
    (t.n = function(e) {
      var o =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return t.d(o, "a", o), o;
    }),
    (t.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (t.p = ""),
    t((t.s = 0));
})([
  function(e, t, o) {
    "use strict";
    var n =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            },
      r = o(1),
      u = { passive: !0, capture: !1 },
      i = [
        "scroll",
        "wheel",
        "touchstart",
        "touchmove",
        "touchenter",
        "touchend",
        "touchleave",
        "mouseout",
        "mouseleave",
        "mouseup",
        "mousedown",
        "mousemove",
        "mouseenter",
        "mousewheel",
        "mouseover"
      ],
      s = function(e, t) {
        return void 0 !== e ? e : -1 !== i.indexOf(t) && u.passive;
      },
      c = function(e) {
        var t = Object.getOwnPropertyDescriptor(e, "passive");
        return t && !0 !== t.writable && void 0 === t.set
          ? Object.assign({}, e)
          : e;
      };
    if ((0, r.eventListenerOptionsSupported)()) {
      var p = EventTarget.prototype.addEventListener;
      !(function(e) {
        (EventTarget.prototype.addEventListener = function(t, o, r) {
          var i =
              "object" === (void 0 === r ? "undefined" : n(r)) && null !== r,
            p = i ? r.capture : r;
          (r = i ? c(r) : {}),
            (r.passive = s(r.passive, t)),
            (r.capture = void 0 === p ? u.capture : p),
            e.call(this, t, o, r);
        }),
          (EventTarget.prototype.addEventListener._original = e);
      })(p);
    }
  },
  function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.eventListenerOptionsSupported = function() {
      var e = !1;
      try {
        var t = Object.defineProperty({}, "passive", {
          get: function() {
            e = !0;
          }
        });
        window.addEventListener("test", null, t),
          window.removeEventListener("test", null, t);
      } catch (e) {}
      return e;
    };
  }
]);
//# sourceMappingURL=index.js.map


const eventListenerOptionsSupported = () => {
    let supported = false;

    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          supported = true;
        }
      });

      window.addEventListener('test', null, opts);
      window.removeEventListener('test', null, opts);
    } catch (e) { }

    return supported;
  }

  const defaultOptions = {
    passive: false,
    capture: false
  };
  const supportedPassiveTypes = [
    'scroll', 'wheel',
    'touchstart', 'touchmove', 'touchenter', 'touchend', 'touchleave',
    'mouseout', 'mouseleave', 'mouseup', 'mousedown', 'mousemove', 'mouseenter', 'mousewheel', 'mouseover'
  ];
  const getDefaultPassiveOption = (passive, eventName) => {
    if (passive !== undefined) return passive;

    return supportedPassiveTypes.indexOf(eventName) === -1 ? false : defaultOptions.passive;
  };

  const getWritableOptions = (options) => {
    const passiveDescriptor = Object.getOwnPropertyDescriptor(options, 'passive');

    return passiveDescriptor && passiveDescriptor.writable !== true && passiveDescriptor.set === undefined
      ? Object.assign({}, options)
      : options;
  };

  const overwriteAddEvent = (superMethod) => {
    EventTarget.prototype.addEventListener = function (type, listener, options) {
      const usesListenerOptions = typeof options === 'object' && options !== null;
      const useCapture = usesListenerOptions ? options.capture : options;

      options = usesListenerOptions ? getWritableOptions(options) : {};
      options.passive = getDefaultPassiveOption(options.passive, type);
      options.capture = useCapture === undefined ? defaultOptions.capture : useCapture;

      superMethod.call(this, type, listener, options);
    };

    EventTarget.prototype.addEventListener._original = superMethod;
  };

  const supportsPassive = eventListenerOptionsSupported();

  if (supportsPassive) {
    const addEvent = EventTarget.prototype.addEventListener;
    overwriteAddEvent(addEvent);
  }

  */