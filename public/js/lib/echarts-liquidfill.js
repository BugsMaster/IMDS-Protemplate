!(function(t, e) {
    "object" == typeof exports && "object" == typeof module
        ? (module.exports = e(require("echarts")))
        : "function" == typeof define && define.amd
        ? define(["echarts"], e)
        : "object" == typeof exports
        ? (exports["echarts-liquidfill"] = e(require("echarts")))
        : (t["echarts-liquidfill"] = e(t.echarts));
})(window, function(t) {
    return (function(t) {
        var e = {};
        function r(n) {
            if (e[n]) return e[n].exports;
            var i = (e[n] = { i: n, l: !1, exports: {} });
            return t[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
        }
        return (
            (r.m = t),
            (r.c = e),
            (r.d = function(t, e, n) {
                r.o(t, e) ||
                    Object.defineProperty(t, e, { enumerable: !0, get: n });
            }),
            (r.r = function(t) {
                "undefined" != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(t, Symbol.toStringTag, {
                        value: "Module",
                    }),
                    Object.defineProperty(t, "__esModule", { value: !0 });
            }),
            (r.t = function(t, e) {
                if ((1 & e && (t = r(t)), 8 & e)) return t;
                if (4 & e && "object" == typeof t && t && t.__esModule)
                    return t;
                var n = Object.create(null);
                if (
                    (r.r(n),
                    Object.defineProperty(n, "default", {
                        enumerable: !0,
                        value: t,
                    }),
                    2 & e && "string" != typeof t)
                )
                    for (var i in t)
                        r.d(
                            n,
                            i,
                            function(e) {
                                return t[e];
                            }.bind(null, i)
                        );
                return n;
            }),
            (r.n = function(t) {
                var e =
                    t && t.__esModule
                        ? function() {
                              return t.default;
                          }
                        : function() {
                              return t;
                          };
                return r.d(e, "a", e), e;
            }),
            (r.o = function(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
            }),
            (r.p = ""),
            r((r.s = 29))
        );
    })([
        function(t, e) {
            var r = {
                    "[object Function]": 1,
                    "[object RegExp]": 1,
                    "[object Date]": 1,
                    "[object Error]": 1,
                    "[object CanvasGradient]": 1,
                    "[object CanvasPattern]": 1,
                    "[object Image]": 1,
                    "[object Canvas]": 1,
                },
                n = {
                    "[object Int8Array]": 1,
                    "[object Uint8Array]": 1,
                    "[object Uint8ClampedArray]": 1,
                    "[object Int16Array]": 1,
                    "[object Uint16Array]": 1,
                    "[object Int32Array]": 1,
                    "[object Uint32Array]": 1,
                    "[object Float32Array]": 1,
                    "[object Float64Array]": 1,
                },
                i = Object.prototype.toString,
                a = Array.prototype,
                o = a.forEach,
                s = a.filter,
                l = a.slice,
                h = a.map,
                u = a.reduce,
                c = {};
            function f(t) {
                if (null == t || "object" != typeof t) return t;
                var e = t,
                    a = i.call(t);
                if ("[object Array]" === a) {
                    if (!S(t)) {
                        e = [];
                        for (var o = 0, s = t.length; o < s; o++)
                            e[o] = f(t[o]);
                    }
                } else if (n[a]) {
                    if (!S(t)) {
                        var l = t.constructor;
                        if (t.constructor.from) e = l.from(t);
                        else {
                            e = new l(t.length);
                            for (o = 0, s = t.length; o < s; o++)
                                e[o] = f(t[o]);
                        }
                    }
                } else if (!r[a] && !S(t) && !w(t))
                    for (var h in ((e = {}), t))
                        t.hasOwnProperty(h) && (e[h] = f(t[h]));
                return e;
            }
            function d(t, e, r) {
                if (!_(e) || !_(t)) return r ? f(e) : t;
                for (var n in e)
                    if (e.hasOwnProperty(n)) {
                        var i = t[n],
                            a = e[n];
                        !_(a) ||
                        !_(i) ||
                        x(a) ||
                        x(i) ||
                        w(a) ||
                        w(i) ||
                        b(a) ||
                        b(i) ||
                        S(a) ||
                        S(i)
                            ? (!r && n in t) || (t[n] = f(e[n]))
                            : d(i, a, r);
                    }
                return t;
            }
            function p(t, e, r) {
                for (var n in e)
                    e.hasOwnProperty(n) &&
                        (r ? null != e[n] : null == t[n]) &&
                        (t[n] = e[n]);
                return t;
            }
            var v,
                g = function() {
                    return c.createCanvas();
                };
            function y(t, e, r) {
                if (t && e)
                    if (t.forEach && t.forEach === o) t.forEach(e, r);
                    else if (t.length === +t.length)
                        for (var n = 0, i = t.length; n < i; n++)
                            e.call(r, t[n], n, t);
                    else
                        for (var a in t)
                            t.hasOwnProperty(a) && e.call(r, t[a], a, t);
            }
            function m(t, e) {
                var r = l.call(arguments, 2);
                return function() {
                    return t.apply(e, r.concat(l.call(arguments)));
                };
            }
            function x(t) {
                return "[object Array]" === i.call(t);
            }
            function _(t) {
                var e = typeof t;
                return "function" === e || (!!t && "object" === e);
            }
            function b(t) {
                return !!r[i.call(t)];
            }
            function w(t) {
                return (
                    "object" == typeof t &&
                    "number" == typeof t.nodeType &&
                    "object" == typeof t.ownerDocument
                );
            }
            c.createCanvas = function() {
                return document.createElement("canvas");
            };
            function S(t) {
                return t.__ec_primitive__;
            }
            function T(t) {
                var e = x(t);
                this.data = {};
                var r = this;
                function n(t, n) {
                    e ? r.set(t, n) : r.set(n, t);
                }
                t instanceof T ? t.each(n) : t && y(t, n);
            }
            (T.prototype = {
                constructor: T,
                get: function(t) {
                    return this.data.hasOwnProperty(t) ? this.data[t] : null;
                },
                set: function(t, e) {
                    return (this.data[t] = e);
                },
                each: function(t, e) {
                    for (var r in (void 0 !== e && (t = m(t, e)), this.data))
                        this.data.hasOwnProperty(r) && t(this.data[r], r);
                },
                removeKey: function(t) {
                    delete this.data[t];
                },
            }),
                (e.$override = function(t, e) {
                    "createCanvas" === t && (v = null), (c[t] = e);
                }),
                (e.clone = f),
                (e.merge = d),
                (e.mergeAll = function(t, e) {
                    for (var r = t[0], n = 1, i = t.length; n < i; n++)
                        r = d(r, t[n], e);
                    return r;
                }),
                (e.extend = function(t, e) {
                    for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
                    return t;
                }),
                (e.defaults = p),
                (e.createCanvas = g),
                (e.getContext = function() {
                    return v || (v = g().getContext("2d")), v;
                }),
                (e.indexOf = function(t, e) {
                    if (t) {
                        if (t.indexOf) return t.indexOf(e);
                        for (var r = 0, n = t.length; r < n; r++)
                            if (t[r] === e) return r;
                    }
                    return -1;
                }),
                (e.inherits = function(t, e) {
                    var r = t.prototype;
                    function n() {}
                    for (var i in ((n.prototype = e.prototype),
                    (t.prototype = new n()),
                    r))
                        r.hasOwnProperty(i) && (t.prototype[i] = r[i]);
                    (t.prototype.constructor = t), (t.superClass = e);
                }),
                (e.mixin = function(t, e, r) {
                    p(
                        (t = "prototype" in t ? t.prototype : t),
                        (e = "prototype" in e ? e.prototype : e),
                        r
                    );
                }),
                (e.isArrayLike = function(t) {
                    if (t)
                        return (
                            "string" != typeof t && "number" == typeof t.length
                        );
                }),
                (e.each = y),
                (e.map = function(t, e, r) {
                    if (t && e) {
                        if (t.map && t.map === h) return t.map(e, r);
                        for (var n = [], i = 0, a = t.length; i < a; i++)
                            n.push(e.call(r, t[i], i, t));
                        return n;
                    }
                }),
                (e.reduce = function(t, e, r, n) {
                    if (t && e) {
                        if (t.reduce && t.reduce === u)
                            return t.reduce(e, r, n);
                        for (var i = 0, a = t.length; i < a; i++)
                            r = e.call(n, r, t[i], i, t);
                        return r;
                    }
                }),
                (e.filter = function(t, e, r) {
                    if (t && e) {
                        if (t.filter && t.filter === s) return t.filter(e, r);
                        for (var n = [], i = 0, a = t.length; i < a; i++)
                            e.call(r, t[i], i, t) && n.push(t[i]);
                        return n;
                    }
                }),
                (e.find = function(t, e, r) {
                    if (t && e)
                        for (var n = 0, i = t.length; n < i; n++)
                            if (e.call(r, t[n], n, t)) return t[n];
                }),
                (e.bind = m),
                (e.curry = function(t) {
                    var e = l.call(arguments, 1);
                    return function() {
                        return t.apply(this, e.concat(l.call(arguments)));
                    };
                }),
                (e.isArray = x),
                (e.isFunction = function(t) {
                    return "function" == typeof t;
                }),
                (e.isString = function(t) {
                    return "[object String]" === i.call(t);
                }),
                (e.isObject = _),
                (e.isBuiltInObject = b),
                (e.isTypedArray = function(t) {
                    return !!n[i.call(t)];
                }),
                (e.isDom = w),
                (e.eqNaN = function(t) {
                    return t != t;
                }),
                (e.retrieve = function(t) {
                    for (var e = 0, r = arguments.length; e < r; e++)
                        if (null != arguments[e]) return arguments[e];
                }),
                (e.retrieve2 = function(t, e) {
                    return null != t ? t : e;
                }),
                (e.retrieve3 = function(t, e, r) {
                    return null != t ? t : null != e ? e : r;
                }),
                (e.slice = function() {
                    return Function.call.apply(l, arguments);
                }),
                (e.normalizeCssArray = function(t) {
                    if ("number" == typeof t) return [t, t, t, t];
                    var e = t.length;
                    return 2 === e
                        ? [t[0], t[1], t[0], t[1]]
                        : 3 === e
                        ? [t[0], t[1], t[2], t[1]]
                        : t;
                }),
                (e.assert = function(t, e) {
                    if (!t) throw new Error(e);
                }),
                (e.trim = function(t) {
                    return null == t
                        ? null
                        : "function" == typeof t.trim
                        ? t.trim()
                        : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
                }),
                (e.setAsPrimitive = function(t) {
                    t.__ec_primitive__ = !0;
                }),
                (e.isPrimitive = S),
                (e.createHashMap = function(t) {
                    return new T(t);
                }),
                (e.concatArray = function(t, e) {
                    for (
                        var r = new t.constructor(t.length + e.length), n = 0;
                        n < t.length;
                        n++
                    )
                        r[n] = t[n];
                    var i = t.length;
                    for (n = 0; n < e.length; n++) r[n + i] = e[n];
                    return r;
                }),
                (e.noop = function() {});
        },
        function(t, e, r) {
            var n = r(6),
                i = r(0),
                a = r(8),
                o = r(52),
                s = r(58).prototype.getCanvasPattern,
                l = Math.abs,
                h = new a(!0);
            function u(t) {
                n.call(this, t), (this.path = null);
            }
            (u.prototype = {
                constructor: u,
                type: "path",
                __dirtyPath: !0,
                strokeContainThreshold: 5,
                segmentIgnoreThreshold: 0,
                subPixelOptimize: !1,
                brush: function(t, e) {
                    var r,
                        n = this.style,
                        i = this.path || h,
                        a = n.hasStroke(),
                        o = n.hasFill(),
                        l = n.fill,
                        u = n.stroke,
                        c = o && !!l.colorStops,
                        f = a && !!u.colorStops,
                        d = o && !!l.image,
                        p = a && !!u.image;
                    (n.bind(t, this, e), this.setTransform(t), this.__dirty) &&
                        (c &&
                            ((r = r || this.getBoundingRect()),
                            (this._fillGradient = n.getGradient(t, l, r))),
                        f &&
                            ((r = r || this.getBoundingRect()),
                            (this._strokeGradient = n.getGradient(t, u, r))));
                    c
                        ? (t.fillStyle = this._fillGradient)
                        : d && (t.fillStyle = s.call(l, t)),
                        f
                            ? (t.strokeStyle = this._strokeGradient)
                            : p && (t.strokeStyle = s.call(u, t));
                    var v = n.lineDash,
                        g = n.lineDashOffset,
                        y = !!t.setLineDash,
                        m = this.getGlobalScale();
                    if (
                        (i.setScale(m[0], m[1], this.segmentIgnoreThreshold),
                        this.__dirtyPath || (v && !y && a)
                            ? (i.beginPath(t),
                              v &&
                                  !y &&
                                  (i.setLineDash(v), i.setLineDashOffset(g)),
                              this.buildPath(i, this.shape, !1),
                              this.path && (this.__dirtyPath = !1))
                            : (t.beginPath(), this.path.rebuildPath(t)),
                        o)
                    )
                        if (null != n.fillOpacity) {
                            var x = t.globalAlpha;
                            (t.globalAlpha = n.fillOpacity * n.opacity),
                                i.fill(t),
                                (t.globalAlpha = x);
                        } else i.fill(t);
                    if (
                        (v && y && (t.setLineDash(v), (t.lineDashOffset = g)),
                        a)
                    )
                        if (null != n.strokeOpacity) {
                            x = t.globalAlpha;
                            (t.globalAlpha = n.strokeOpacity * n.opacity),
                                i.stroke(t),
                                (t.globalAlpha = x);
                        } else i.stroke(t);
                    v && y && t.setLineDash([]),
                        null != n.text &&
                            (this.restoreTransform(t),
                            this.drawRectText(t, this.getBoundingRect()));
                },
                buildPath: function(t, e, r) {},
                createPathProxy: function() {
                    this.path = new a();
                },
                getBoundingRect: function() {
                    var t = this._rect,
                        e = this.style,
                        r = !t;
                    if (r) {
                        var n = this.path;
                        n || (n = this.path = new a()),
                            this.__dirtyPath &&
                                (n.beginPath(),
                                this.buildPath(n, this.shape, !1)),
                            (t = n.getBoundingRect());
                    }
                    if (((this._rect = t), e.hasStroke())) {
                        var i =
                            this._rectWithStroke ||
                            (this._rectWithStroke = t.clone());
                        if (this.__dirty || r) {
                            i.copy(t);
                            var o = e.lineWidth,
                                s = e.strokeNoScale ? this.getLineScale() : 1;
                            e.hasFill() ||
                                (o = Math.max(
                                    o,
                                    this.strokeContainThreshold || 4
                                )),
                                s > 1e-10 &&
                                    ((i.width += o / s),
                                    (i.height += o / s),
                                    (i.x -= o / s / 2),
                                    (i.y -= o / s / 2));
                        }
                        return i;
                    }
                    return t;
                },
                contain: function(t, e) {
                    var r = this.transformCoordToLocal(t, e),
                        n = this.getBoundingRect(),
                        i = this.style;
                    if (((t = r[0]), (e = r[1]), n.contain(t, e))) {
                        var a = this.path.data;
                        if (i.hasStroke()) {
                            var s = i.lineWidth,
                                l = i.strokeNoScale ? this.getLineScale() : 1;
                            if (
                                l > 1e-10 &&
                                (i.hasFill() ||
                                    (s = Math.max(
                                        s,
                                        this.strokeContainThreshold
                                    )),
                                o.containStroke(a, s / l, t, e))
                            )
                                return !0;
                        }
                        if (i.hasFill()) return o.contain(a, t, e);
                    }
                    return !1;
                },
                dirty: function(t) {
                    null == t && (t = !0),
                        t && ((this.__dirtyPath = t), (this._rect = null)),
                        (this.__dirty = this.__dirtyText = !0),
                        this.__zr && this.__zr.refresh(),
                        this.__clipTarget && this.__clipTarget.dirty();
                },
                animateShape: function(t) {
                    return this.animate("shape", t);
                },
                attrKV: function(t, e) {
                    "shape" === t
                        ? (this.setShape(e),
                          (this.__dirtyPath = !0),
                          (this._rect = null))
                        : n.prototype.attrKV.call(this, t, e);
                },
                setShape: function(t, e) {
                    var r = this.shape;
                    if (r) {
                        if (i.isObject(t))
                            for (var n in t)
                                t.hasOwnProperty(n) && (r[n] = t[n]);
                        else r[t] = e;
                        this.dirty(!0);
                    }
                    return this;
                },
                getLineScale: function() {
                    var t = this.transform;
                    return t && l(t[0] - 1) > 1e-10 && l(t[3] - 1) > 1e-10
                        ? Math.sqrt(l(t[0] * t[3] - t[2] * t[1]))
                        : 1;
                },
            }),
                (u.extend = function(t) {
                    var e = function(e) {
                        u.call(this, e),
                            t.style && this.style.extendFrom(t.style, !1);
                        var r = t.shape;
                        if (r) {
                            this.shape = this.shape || {};
                            var n = this.shape;
                            for (var i in r)
                                !n.hasOwnProperty(i) &&
                                    r.hasOwnProperty(i) &&
                                    (n[i] = r[i]);
                        }
                        t.init && t.init.call(this, e);
                    };
                    for (var r in (i.inherits(e, u), t))
                        "style" !== r &&
                            "shape" !== r &&
                            (e.prototype[r] = t[r]);
                    return e;
                }),
                i.inherits(u, n);
            var c = u;
            t.exports = c;
        },
        function(t, e) {
            var r = "undefined" == typeof Float32Array ? Array : Float32Array;
            function n(t) {
                return Math.sqrt(a(t));
            }
            var i = n;
            function a(t) {
                return t[0] * t[0] + t[1] * t[1];
            }
            var o = a;
            function s(t, e) {
                return Math.sqrt(
                    (t[0] - e[0]) * (t[0] - e[0]) +
                        (t[1] - e[1]) * (t[1] - e[1])
                );
            }
            var l = s;
            function h(t, e) {
                return (
                    (t[0] - e[0]) * (t[0] - e[0]) +
                    (t[1] - e[1]) * (t[1] - e[1])
                );
            }
            var u = h;
            (e.create = function(t, e) {
                var n = new r(2);
                return (
                    null == t && (t = 0),
                    null == e && (e = 0),
                    (n[0] = t),
                    (n[1] = e),
                    n
                );
            }),
                (e.copy = function(t, e) {
                    return (t[0] = e[0]), (t[1] = e[1]), t;
                }),
                (e.clone = function(t) {
                    var e = new r(2);
                    return (e[0] = t[0]), (e[1] = t[1]), e;
                }),
                (e.set = function(t, e, r) {
                    return (t[0] = e), (t[1] = r), t;
                }),
                (e.add = function(t, e, r) {
                    return (t[0] = e[0] + r[0]), (t[1] = e[1] + r[1]), t;
                }),
                (e.scaleAndAdd = function(t, e, r, n) {
                    return (
                        (t[0] = e[0] + r[0] * n), (t[1] = e[1] + r[1] * n), t
                    );
                }),
                (e.sub = function(t, e, r) {
                    return (t[0] = e[0] - r[0]), (t[1] = e[1] - r[1]), t;
                }),
                (e.len = n),
                (e.length = i),
                (e.lenSquare = a),
                (e.lengthSquare = o),
                (e.mul = function(t, e, r) {
                    return (t[0] = e[0] * r[0]), (t[1] = e[1] * r[1]), t;
                }),
                (e.div = function(t, e, r) {
                    return (t[0] = e[0] / r[0]), (t[1] = e[1] / r[1]), t;
                }),
                (e.dot = function(t, e) {
                    return t[0] * e[0] + t[1] * e[1];
                }),
                (e.scale = function(t, e, r) {
                    return (t[0] = e[0] * r), (t[1] = e[1] * r), t;
                }),
                (e.normalize = function(t, e) {
                    var r = n(e);
                    return (
                        0 === r
                            ? ((t[0] = 0), (t[1] = 0))
                            : ((t[0] = e[0] / r), (t[1] = e[1] / r)),
                        t
                    );
                }),
                (e.distance = s),
                (e.dist = l),
                (e.distanceSquare = h),
                (e.distSquare = u),
                (e.negate = function(t, e) {
                    return (t[0] = -e[0]), (t[1] = -e[1]), t;
                }),
                (e.lerp = function(t, e, r, n) {
                    return (
                        (t[0] = e[0] + n * (r[0] - e[0])),
                        (t[1] = e[1] + n * (r[1] - e[1])),
                        t
                    );
                }),
                (e.applyTransform = function(t, e, r) {
                    var n = e[0],
                        i = e[1];
                    return (
                        (t[0] = r[0] * n + r[2] * i + r[4]),
                        (t[1] = r[1] * n + r[3] * i + r[5]),
                        t
                    );
                }),
                (e.min = function(t, e, r) {
                    return (
                        (t[0] = Math.min(e[0], r[0])),
                        (t[1] = Math.min(e[1], r[1])),
                        t
                    );
                }),
                (e.max = function(t, e, r) {
                    return (
                        (t[0] = Math.max(e[0], r[0])),
                        (t[1] = Math.max(e[1], r[1])),
                        t
                    );
                });
        },
        function(t, e, r) {
            var n,
                i,
                a,
                o,
                s = r(2),
                l = r(10),
                h = s.applyTransform,
                u = Math.min,
                c = Math.max;
            function f(t, e, r, n) {
                r < 0 && ((t += r), (r = -r)),
                    n < 0 && ((e += n), (n = -n)),
                    (this.x = t),
                    (this.y = e),
                    (this.width = r),
                    (this.height = n);
            }
            (f.prototype = {
                constructor: f,
                union: function(t) {
                    var e = u(t.x, this.x),
                        r = u(t.y, this.y);
                    (this.width = c(t.x + t.width, this.x + this.width) - e),
                        (this.height =
                            c(t.y + t.height, this.y + this.height) - r),
                        (this.x = e),
                        (this.y = r);
                },
                applyTransform: ((n = []),
                (i = []),
                (a = []),
                (o = []),
                function(t) {
                    if (t) {
                        (n[0] = a[0] = this.x),
                            (n[1] = o[1] = this.y),
                            (i[0] = o[0] = this.x + this.width),
                            (i[1] = a[1] = this.y + this.height),
                            h(n, n, t),
                            h(i, i, t),
                            h(a, a, t),
                            h(o, o, t),
                            (this.x = u(n[0], i[0], a[0], o[0])),
                            (this.y = u(n[1], i[1], a[1], o[1]));
                        var e = c(n[0], i[0], a[0], o[0]),
                            r = c(n[1], i[1], a[1], o[1]);
                        (this.width = e - this.x), (this.height = r - this.y);
                    }
                }),
                calculateTransform: function(t) {
                    var e = this,
                        r = t.width / e.width,
                        n = t.height / e.height,
                        i = l.create();
                    return (
                        l.translate(i, i, [-e.x, -e.y]),
                        l.scale(i, i, [r, n]),
                        l.translate(i, i, [t.x, t.y]),
                        i
                    );
                },
                intersect: function(t) {
                    if (!t) return !1;
                    t instanceof f || (t = f.create(t));
                    var e = this,
                        r = e.x,
                        n = e.x + e.width,
                        i = e.y,
                        a = e.y + e.height,
                        o = t.x,
                        s = t.x + t.width,
                        l = t.y,
                        h = t.y + t.height;
                    return !(n < o || s < r || a < l || h < i);
                },
                contain: function(t, e) {
                    return (
                        t >= this.x &&
                        t <= this.x + this.width &&
                        e >= this.y &&
                        e <= this.y + this.height
                    );
                },
                clone: function() {
                    return new f(this.x, this.y, this.width, this.height);
                },
                copy: function(t) {
                    (this.x = t.x),
                        (this.y = t.y),
                        (this.width = t.width),
                        (this.height = t.height);
                },
                plain: function() {
                    return {
                        x: this.x,
                        y: this.y,
                        width: this.width,
                        height: this.height,
                    };
                },
            }),
                (f.create = function(t) {
                    return new f(t.x, t.y, t.width, t.height);
                });
            var d = f;
            t.exports = d;
        },
        function(t, e, r) {
            var n = r(2),
                i = n.create,
                a = n.distSquare,
                o = Math.pow,
                s = Math.sqrt,
                l = s(3),
                h = i(),
                u = i(),
                c = i();
            function f(t) {
                return t > -1e-8 && t < 1e-8;
            }
            function d(t) {
                return t > 1e-8 || t < -1e-8;
            }
            function p(t, e, r, n, i) {
                var a = 1 - i;
                return (
                    a * a * (a * t + 3 * i * e) + i * i * (i * n + 3 * a * r)
                );
            }
            function v(t, e, r, n) {
                var i = 1 - n;
                return i * (i * t + 2 * n * e) + n * n * r;
            }
            (e.cubicAt = p),
                (e.cubicDerivativeAt = function(t, e, r, n, i) {
                    var a = 1 - i;
                    return (
                        3 *
                        (((e - t) * a + 2 * (r - e) * i) * a + (n - r) * i * i)
                    );
                }),
                (e.cubicRootAt = function(t, e, r, n, i, a) {
                    var h = n + 3 * (e - r) - t,
                        u = 3 * (r - 2 * e + t),
                        c = 3 * (e - t),
                        d = t - i,
                        p = u * u - 3 * h * c,
                        v = u * c - 9 * h * d,
                        g = c * c - 3 * u * d,
                        y = 0;
                    if (f(p) && f(v)) {
                        if (f(u)) a[0] = 0;
                        else (k = -c / u) >= 0 && k <= 1 && (a[y++] = k);
                    } else {
                        var m = v * v - 4 * p * g;
                        if (f(m)) {
                            var x = v / p,
                                _ = -x / 2;
                            (k = -u / h + x) >= 0 && k <= 1 && (a[y++] = k),
                                _ >= 0 && _ <= 1 && (a[y++] = _);
                        } else if (m > 0) {
                            var b = s(m),
                                w = p * u + 1.5 * h * (-v + b),
                                S = p * u + 1.5 * h * (-v - b);
                            (k =
                                (-u -
                                    ((w = w < 0 ? -o(-w, 1 / 3) : o(w, 1 / 3)) +
                                        (S =
                                            S < 0
                                                ? -o(-S, 1 / 3)
                                                : o(S, 1 / 3)))) /
                                (3 * h)) >= 0 &&
                                k <= 1 &&
                                (a[y++] = k);
                        } else {
                            var T =
                                    (2 * p * u - 3 * h * v) /
                                    (2 * s(p * p * p)),
                                P = Math.acos(T) / 3,
                                M = s(p),
                                O = Math.cos(P),
                                k = (-u - 2 * M * O) / (3 * h),
                                C = ((_ =
                                    (-u + M * (O + l * Math.sin(P))) / (3 * h)),
                                (-u + M * (O - l * Math.sin(P))) / (3 * h));
                            k >= 0 && k <= 1 && (a[y++] = k),
                                _ >= 0 && _ <= 1 && (a[y++] = _),
                                C >= 0 && C <= 1 && (a[y++] = C);
                        }
                    }
                    return y;
                }),
                (e.cubicExtrema = function(t, e, r, n, i) {
                    var a = 6 * r - 12 * e + 6 * t,
                        o = 9 * e + 3 * n - 3 * t - 9 * r,
                        l = 3 * e - 3 * t,
                        h = 0;
                    if (f(o)) {
                        if (d(a)) (c = -l / a) >= 0 && c <= 1 && (i[h++] = c);
                    } else {
                        var u = a * a - 4 * o * l;
                        if (f(u)) i[0] = -a / (2 * o);
                        else if (u > 0) {
                            var c,
                                p = s(u),
                                v = (-a - p) / (2 * o);
                            (c = (-a + p) / (2 * o)) >= 0 &&
                                c <= 1 &&
                                (i[h++] = c),
                                v >= 0 && v <= 1 && (i[h++] = v);
                        }
                    }
                    return h;
                }),
                (e.cubicSubdivide = function(t, e, r, n, i, a) {
                    var o = (e - t) * i + t,
                        s = (r - e) * i + e,
                        l = (n - r) * i + r,
                        h = (s - o) * i + o,
                        u = (l - s) * i + s,
                        c = (u - h) * i + h;
                    (a[0] = t),
                        (a[1] = o),
                        (a[2] = h),
                        (a[3] = c),
                        (a[4] = c),
                        (a[5] = u),
                        (a[6] = l),
                        (a[7] = n);
                }),
                (e.cubicProjectPoint = function(
                    t,
                    e,
                    r,
                    n,
                    i,
                    o,
                    l,
                    f,
                    d,
                    v,
                    g
                ) {
                    var y,
                        m,
                        x,
                        _,
                        b,
                        w = 0.005,
                        S = 1 / 0;
                    (h[0] = d), (h[1] = v);
                    for (var T = 0; T < 1; T += 0.05)
                        (u[0] = p(t, r, i, l, T)),
                            (u[1] = p(e, n, o, f, T)),
                            (_ = a(h, u)) < S && ((y = T), (S = _));
                    S = 1 / 0;
                    for (var P = 0; P < 32 && !(w < 1e-4); P++)
                        (m = y - w),
                            (x = y + w),
                            (u[0] = p(t, r, i, l, m)),
                            (u[1] = p(e, n, o, f, m)),
                            (_ = a(u, h)),
                            m >= 0 && _ < S
                                ? ((y = m), (S = _))
                                : ((c[0] = p(t, r, i, l, x)),
                                  (c[1] = p(e, n, o, f, x)),
                                  (b = a(c, h)),
                                  x <= 1 && b < S
                                      ? ((y = x), (S = b))
                                      : (w *= 0.5));
                    return (
                        g &&
                            ((g[0] = p(t, r, i, l, y)),
                            (g[1] = p(e, n, o, f, y))),
                        s(S)
                    );
                }),
                (e.quadraticAt = v),
                (e.quadraticDerivativeAt = function(t, e, r, n) {
                    return 2 * ((1 - n) * (e - t) + n * (r - e));
                }),
                (e.quadraticRootAt = function(t, e, r, n, i) {
                    var a = t - 2 * e + r,
                        o = 2 * (e - t),
                        l = t - n,
                        h = 0;
                    if (f(a)) {
                        if (d(o)) (c = -l / o) >= 0 && c <= 1 && (i[h++] = c);
                    } else {
                        var u = o * o - 4 * a * l;
                        if (f(u))
                            (c = -o / (2 * a)) >= 0 && c <= 1 && (i[h++] = c);
                        else if (u > 0) {
                            var c,
                                p = s(u),
                                v = (-o - p) / (2 * a);
                            (c = (-o + p) / (2 * a)) >= 0 &&
                                c <= 1 &&
                                (i[h++] = c),
                                v >= 0 && v <= 1 && (i[h++] = v);
                        }
                    }
                    return h;
                }),
                (e.quadraticExtremum = function(t, e, r) {
                    var n = t + r - 2 * e;
                    return 0 === n ? 0.5 : (t - e) / n;
                }),
                (e.quadraticSubdivide = function(t, e, r, n, i) {
                    var a = (e - t) * n + t,
                        o = (r - e) * n + e,
                        s = (o - a) * n + a;
                    (i[0] = t),
                        (i[1] = a),
                        (i[2] = s),
                        (i[3] = s),
                        (i[4] = o),
                        (i[5] = r);
                }),
                (e.quadraticProjectPoint = function(t, e, r, n, i, o, l, f, d) {
                    var p,
                        g = 0.005,
                        y = 1 / 0;
                    (h[0] = l), (h[1] = f);
                    for (var m = 0; m < 1; m += 0.05) {
                        (u[0] = v(t, r, i, m)),
                            (u[1] = v(e, n, o, m)),
                            (w = a(h, u)) < y && ((p = m), (y = w));
                    }
                    y = 1 / 0;
                    for (var x = 0; x < 32 && !(g < 1e-4); x++) {
                        var _ = p - g,
                            b = p + g;
                        (u[0] = v(t, r, i, _)), (u[1] = v(e, n, o, _));
                        var w = a(u, h);
                        if (_ >= 0 && w < y) (p = _), (y = w);
                        else {
                            (c[0] = v(t, r, i, b)), (c[1] = v(e, n, o, b));
                            var S = a(c, h);
                            b <= 1 && S < y ? ((p = b), (y = S)) : (g *= 0.5);
                        }
                    }
                    return (
                        d && ((d[0] = v(t, r, i, p)), (d[1] = v(e, n, o, p))),
                        s(y)
                    );
                });
        },
        function(e, r) {
            e.exports = t;
        },
        function(t, e, r) {
            var n = r(0),
                i = r(42),
                a = r(19),
                o = r(50);
            function s(t) {
                for (var e in ((t = t || {}), a.call(this, t), t))
                    t.hasOwnProperty(e) && "style" !== e && (this[e] = t[e]);
                (this.style = new i(t.style, this)),
                    (this._rect = null),
                    (this.__clipPaths = null);
            }
            (s.prototype = {
                constructor: s,
                type: "displayable",
                __dirty: !0,
                invisible: !1,
                z: 0,
                z2: 0,
                zlevel: 0,
                draggable: !1,
                dragging: !1,
                silent: !1,
                culling: !1,
                cursor: "pointer",
                rectHover: !1,
                progressive: !1,
                incremental: !1,
                globalScaleRatio: 1,
                beforeBrush: function(t) {},
                afterBrush: function(t) {},
                brush: function(t, e) {},
                getBoundingRect: function() {},
                contain: function(t, e) {
                    return this.rectContain(t, e);
                },
                traverse: function(t, e) {
                    t.call(e, this);
                },
                rectContain: function(t, e) {
                    var r = this.transformCoordToLocal(t, e);
                    return this.getBoundingRect().contain(r[0], r[1]);
                },
                dirty: function() {
                    (this.__dirty = this.__dirtyText = !0),
                        (this._rect = null),
                        this.__zr && this.__zr.refresh();
                },
                animateStyle: function(t) {
                    return this.animate("style", t);
                },
                attrKV: function(t, e) {
                    "style" !== t
                        ? a.prototype.attrKV.call(this, t, e)
                        : this.style.set(e);
                },
                setStyle: function(t, e) {
                    return this.style.set(t, e), this.dirty(!1), this;
                },
                useStyle: function(t) {
                    return (this.style = new i(t, this)), this.dirty(!1), this;
                },
                calculateTextPosition: null,
            }),
                n.inherits(s, a),
                n.mixin(s, o);
            var l = s;
            t.exports = l;
        },
        function(t, e) {
            (e.ContextCachedBy = { NONE: 0, STYLE_BIND: 1, PLAIN_TEXT: 2 }),
                (e.WILL_BE_RESTORED = 9);
        },
        function(t, e, r) {
            var n = r(4),
                i = r(2),
                a = r(51),
                o = r(3),
                s = r(23).devicePixelRatio,
                l = { M: 1, L: 2, C: 3, Q: 4, A: 5, Z: 6, R: 7 },
                h = [],
                u = [],
                c = [],
                f = [],
                d = Math.min,
                p = Math.max,
                v = Math.cos,
                g = Math.sin,
                y = Math.sqrt,
                m = Math.abs,
                x = "undefined" != typeof Float32Array,
                _ = function(t) {
                    (this._saveData = !t),
                        this._saveData && (this.data = []),
                        (this._ctx = null);
                };
            (_.prototype = {
                constructor: _,
                _xi: 0,
                _yi: 0,
                _x0: 0,
                _y0: 0,
                _ux: 0,
                _uy: 0,
                _len: 0,
                _lineDash: null,
                _dashOffset: 0,
                _dashIdx: 0,
                _dashSum: 0,
                setScale: function(t, e, r) {
                    (r = r || 0),
                        (this._ux = m(r / s / t) || 0),
                        (this._uy = m(r / s / e) || 0);
                },
                getContext: function() {
                    return this._ctx;
                },
                beginPath: function(t) {
                    return (
                        (this._ctx = t),
                        t && t.beginPath(),
                        t && (this.dpr = t.dpr),
                        this._saveData && (this._len = 0),
                        this._lineDash &&
                            ((this._lineDash = null), (this._dashOffset = 0)),
                        this
                    );
                },
                moveTo: function(t, e) {
                    return (
                        this.addData(l.M, t, e),
                        this._ctx && this._ctx.moveTo(t, e),
                        (this._x0 = t),
                        (this._y0 = e),
                        (this._xi = t),
                        (this._yi = e),
                        this
                    );
                },
                lineTo: function(t, e) {
                    var r =
                        m(t - this._xi) > this._ux ||
                        m(e - this._yi) > this._uy ||
                        this._len < 5;
                    return (
                        this.addData(l.L, t, e),
                        this._ctx &&
                            r &&
                            (this._needsDash()
                                ? this._dashedLineTo(t, e)
                                : this._ctx.lineTo(t, e)),
                        r && ((this._xi = t), (this._yi = e)),
                        this
                    );
                },
                bezierCurveTo: function(t, e, r, n, i, a) {
                    return (
                        this.addData(l.C, t, e, r, n, i, a),
                        this._ctx &&
                            (this._needsDash()
                                ? this._dashedBezierTo(t, e, r, n, i, a)
                                : this._ctx.bezierCurveTo(t, e, r, n, i, a)),
                        (this._xi = i),
                        (this._yi = a),
                        this
                    );
                },
                quadraticCurveTo: function(t, e, r, n) {
                    return (
                        this.addData(l.Q, t, e, r, n),
                        this._ctx &&
                            (this._needsDash()
                                ? this._dashedQuadraticTo(t, e, r, n)
                                : this._ctx.quadraticCurveTo(t, e, r, n)),
                        (this._xi = r),
                        (this._yi = n),
                        this
                    );
                },
                arc: function(t, e, r, n, i, a) {
                    return (
                        this.addData(l.A, t, e, r, r, n, i - n, 0, a ? 0 : 1),
                        this._ctx && this._ctx.arc(t, e, r, n, i, a),
                        (this._xi = v(i) * r + t),
                        (this._yi = g(i) * r + e),
                        this
                    );
                },
                arcTo: function(t, e, r, n, i) {
                    return this._ctx && this._ctx.arcTo(t, e, r, n, i), this;
                },
                rect: function(t, e, r, n) {
                    return (
                        this._ctx && this._ctx.rect(t, e, r, n),
                        this.addData(l.R, t, e, r, n),
                        this
                    );
                },
                closePath: function() {
                    this.addData(l.Z);
                    var t = this._ctx,
                        e = this._x0,
                        r = this._y0;
                    return (
                        t &&
                            (this._needsDash() && this._dashedLineTo(e, r),
                            t.closePath()),
                        (this._xi = e),
                        (this._yi = r),
                        this
                    );
                },
                fill: function(t) {
                    t && t.fill(), this.toStatic();
                },
                stroke: function(t) {
                    t && t.stroke(), this.toStatic();
                },
                setLineDash: function(t) {
                    if (t instanceof Array) {
                        (this._lineDash = t), (this._dashIdx = 0);
                        for (var e = 0, r = 0; r < t.length; r++) e += t[r];
                        this._dashSum = e;
                    }
                    return this;
                },
                setLineDashOffset: function(t) {
                    return (this._dashOffset = t), this;
                },
                len: function() {
                    return this._len;
                },
                setData: function(t) {
                    var e = t.length;
                    (this.data && this.data.length === e) ||
                        !x ||
                        (this.data = new Float32Array(e));
                    for (var r = 0; r < e; r++) this.data[r] = t[r];
                    this._len = e;
                },
                appendPath: function(t) {
                    t instanceof Array || (t = [t]);
                    for (
                        var e = t.length, r = 0, n = this._len, i = 0;
                        i < e;
                        i++
                    )
                        r += t[i].len();
                    x &&
                        this.data instanceof Float32Array &&
                        (this.data = new Float32Array(n + r));
                    for (i = 0; i < e; i++)
                        for (var a = t[i].data, o = 0; o < a.length; o++)
                            this.data[n++] = a[o];
                    this._len = n;
                },
                addData: function(t) {
                    if (this._saveData) {
                        var e = this.data;
                        this._len + arguments.length > e.length &&
                            (this._expandData(), (e = this.data));
                        for (var r = 0; r < arguments.length; r++)
                            e[this._len++] = arguments[r];
                        this._prevCmd = t;
                    }
                },
                _expandData: function() {
                    if (!(this.data instanceof Array)) {
                        for (var t = [], e = 0; e < this._len; e++)
                            t[e] = this.data[e];
                        this.data = t;
                    }
                },
                _needsDash: function() {
                    return this._lineDash;
                },
                _dashedLineTo: function(t, e) {
                    var r,
                        n,
                        i = this._dashSum,
                        a = this._dashOffset,
                        o = this._lineDash,
                        s = this._ctx,
                        l = this._xi,
                        h = this._yi,
                        u = t - l,
                        c = e - h,
                        f = y(u * u + c * c),
                        v = l,
                        g = h,
                        m = o.length;
                    for (
                        a < 0 && (a = i + a),
                            v -= (a %= i) * (u /= f),
                            g -= a * (c /= f);
                        (u > 0 && v <= t) ||
                        (u < 0 && v >= t) ||
                        (0 === u && ((c > 0 && g <= e) || (c < 0 && g >= e)));

                    )
                        (v += u * (r = o[(n = this._dashIdx)])),
                            (g += c * r),
                            (this._dashIdx = (n + 1) % m),
                            (u > 0 && v < l) ||
                                (u < 0 && v > l) ||
                                (c > 0 && g < h) ||
                                (c < 0 && g > h) ||
                                s[n % 2 ? "moveTo" : "lineTo"](
                                    u >= 0 ? d(v, t) : p(v, t),
                                    c >= 0 ? d(g, e) : p(g, e)
                                );
                    (u = v - t),
                        (c = g - e),
                        (this._dashOffset = -y(u * u + c * c));
                },
                _dashedBezierTo: function(t, e, r, i, a, o) {
                    var s,
                        l,
                        h,
                        u,
                        c,
                        f = this._dashSum,
                        d = this._dashOffset,
                        p = this._lineDash,
                        v = this._ctx,
                        g = this._xi,
                        m = this._yi,
                        x = n.cubicAt,
                        _ = 0,
                        b = this._dashIdx,
                        w = p.length,
                        S = 0;
                    for (d < 0 && (d = f + d), d %= f, s = 0; s < 1; s += 0.1)
                        (l = x(g, t, r, a, s + 0.1) - x(g, t, r, a, s)),
                            (h = x(m, e, i, o, s + 0.1) - x(m, e, i, o, s)),
                            (_ += y(l * l + h * h));
                    for (; b < w && !((S += p[b]) > d); b++);
                    for (s = (S - d) / _; s <= 1; )
                        (u = x(g, t, r, a, s)),
                            (c = x(m, e, i, o, s)),
                            b % 2 ? v.moveTo(u, c) : v.lineTo(u, c),
                            (s += p[b] / _),
                            (b = (b + 1) % w);
                    b % 2 != 0 && v.lineTo(a, o),
                        (l = a - u),
                        (h = o - c),
                        (this._dashOffset = -y(l * l + h * h));
                },
                _dashedQuadraticTo: function(t, e, r, n) {
                    var i = r,
                        a = n;
                    (r = (r + 2 * t) / 3),
                        (n = (n + 2 * e) / 3),
                        (t = (this._xi + 2 * t) / 3),
                        (e = (this._yi + 2 * e) / 3),
                        this._dashedBezierTo(t, e, r, n, i, a);
                },
                toStatic: function() {
                    var t = this.data;
                    t instanceof Array &&
                        ((t.length = this._len),
                        x && (this.data = new Float32Array(t)));
                },
                getBoundingRect: function() {
                    (h[0] = h[1] = c[0] = c[1] = Number.MAX_VALUE),
                        (u[0] = u[1] = f[0] = f[1] = -Number.MAX_VALUE);
                    for (
                        var t = this.data, e = 0, r = 0, n = 0, s = 0, d = 0;
                        d < t.length;

                    ) {
                        var p = t[d++];
                        switch (
                            (1 === d && ((n = e = t[d]), (s = r = t[d + 1])), p)
                        ) {
                            case l.M:
                                (e = n = t[d++]),
                                    (r = s = t[d++]),
                                    (c[0] = n),
                                    (c[1] = s),
                                    (f[0] = n),
                                    (f[1] = s);
                                break;
                            case l.L:
                                a.fromLine(e, r, t[d], t[d + 1], c, f),
                                    (e = t[d++]),
                                    (r = t[d++]);
                                break;
                            case l.C:
                                a.fromCubic(
                                    e,
                                    r,
                                    t[d++],
                                    t[d++],
                                    t[d++],
                                    t[d++],
                                    t[d],
                                    t[d + 1],
                                    c,
                                    f
                                ),
                                    (e = t[d++]),
                                    (r = t[d++]);
                                break;
                            case l.Q:
                                a.fromQuadratic(
                                    e,
                                    r,
                                    t[d++],
                                    t[d++],
                                    t[d],
                                    t[d + 1],
                                    c,
                                    f
                                ),
                                    (e = t[d++]),
                                    (r = t[d++]);
                                break;
                            case l.A:
                                var y = t[d++],
                                    m = t[d++],
                                    x = t[d++],
                                    _ = t[d++],
                                    b = t[d++],
                                    w = t[d++] + b;
                                d += 1;
                                var S = 1 - t[d++];
                                1 === d &&
                                    ((n = v(b) * x + y), (s = g(b) * _ + m)),
                                    a.fromArc(y, m, x, _, b, w, S, c, f),
                                    (e = v(w) * x + y),
                                    (r = g(w) * _ + m);
                                break;
                            case l.R:
                                (n = e = t[d++]), (s = r = t[d++]);
                                var T = t[d++],
                                    P = t[d++];
                                a.fromLine(n, s, n + T, s + P, c, f);
                                break;
                            case l.Z:
                                (e = n), (r = s);
                        }
                        i.min(h, h, c), i.max(u, u, f);
                    }
                    return (
                        0 === d && (h[0] = h[1] = u[0] = u[1] = 0),
                        new o(h[0], h[1], u[0] - h[0], u[1] - h[1])
                    );
                },
                rebuildPath: function(t) {
                    for (
                        var e,
                            r,
                            n,
                            i,
                            a,
                            o,
                            s = this.data,
                            h = this._ux,
                            u = this._uy,
                            c = this._len,
                            f = 0;
                        f < c;

                    ) {
                        var d = s[f++];
                        switch (
                            (1 === f && ((e = n = s[f]), (r = i = s[f + 1])), d)
                        ) {
                            case l.M:
                                (e = n = s[f++]),
                                    (r = i = s[f++]),
                                    t.moveTo(n, i);
                                break;
                            case l.L:
                                (a = s[f++]),
                                    (o = s[f++]),
                                    (m(a - n) > h ||
                                        m(o - i) > u ||
                                        f === c - 1) &&
                                        (t.lineTo(a, o), (n = a), (i = o));
                                break;
                            case l.C:
                                t.bezierCurveTo(
                                    s[f++],
                                    s[f++],
                                    s[f++],
                                    s[f++],
                                    s[f++],
                                    s[f++]
                                ),
                                    (n = s[f - 2]),
                                    (i = s[f - 1]);
                                break;
                            case l.Q:
                                t.quadraticCurveTo(
                                    s[f++],
                                    s[f++],
                                    s[f++],
                                    s[f++]
                                ),
                                    (n = s[f - 2]),
                                    (i = s[f - 1]);
                                break;
                            case l.A:
                                var p = s[f++],
                                    y = s[f++],
                                    x = s[f++],
                                    _ = s[f++],
                                    b = s[f++],
                                    w = s[f++],
                                    S = s[f++],
                                    T = s[f++],
                                    P = x > _ ? x : _,
                                    M = x > _ ? 1 : x / _,
                                    O = x > _ ? _ / x : 1,
                                    k = b + w;
                                Math.abs(x - _) > 0.001
                                    ? (t.translate(p, y),
                                      t.rotate(S),
                                      t.scale(M, O),
                                      t.arc(0, 0, P, b, k, 1 - T),
                                      t.scale(1 / M, 1 / O),
                                      t.rotate(-S),
                                      t.translate(-p, -y))
                                    : t.arc(p, y, P, b, k, 1 - T),
                                    1 === f &&
                                        ((e = v(b) * x + p),
                                        (r = g(b) * _ + y)),
                                    (n = v(k) * x + p),
                                    (i = g(k) * _ + y);
                                break;
                            case l.R:
                                (e = n = s[f]),
                                    (r = i = s[f + 1]),
                                    t.rect(s[f++], s[f++], s[f++], s[f++]);
                                break;
                            case l.Z:
                                t.closePath(), (n = e), (i = r);
                        }
                    }
                },
            }),
                (_.CMD = l);
            var b = _;
            t.exports = b;
        },
        function(t, e, r) {
            (function(t) {
                var r;
                "undefined" != typeof window
                    ? (r = window.__DEV__)
                    : void 0 !== t && (r = t.__DEV__),
                    void 0 === r && (r = !0);
                var n = r;
                e.__DEV__ = n;
            }.call(this, r(34)));
        },
        function(t, e) {
            var r = "undefined" == typeof Float32Array ? Array : Float32Array;
            function n() {
                var t = new r(6);
                return i(t), t;
            }
            function i(t) {
                return (
                    (t[0] = 1),
                    (t[1] = 0),
                    (t[2] = 0),
                    (t[3] = 1),
                    (t[4] = 0),
                    (t[5] = 0),
                    t
                );
            }
            function a(t, e) {
                return (
                    (t[0] = e[0]),
                    (t[1] = e[1]),
                    (t[2] = e[2]),
                    (t[3] = e[3]),
                    (t[4] = e[4]),
                    (t[5] = e[5]),
                    t
                );
            }
            (e.create = n),
                (e.identity = i),
                (e.copy = a),
                (e.mul = function(t, e, r) {
                    var n = e[0] * r[0] + e[2] * r[1],
                        i = e[1] * r[0] + e[3] * r[1],
                        a = e[0] * r[2] + e[2] * r[3],
                        o = e[1] * r[2] + e[3] * r[3],
                        s = e[0] * r[4] + e[2] * r[5] + e[4],
                        l = e[1] * r[4] + e[3] * r[5] + e[5];
                    return (
                        (t[0] = n),
                        (t[1] = i),
                        (t[2] = a),
                        (t[3] = o),
                        (t[4] = s),
                        (t[5] = l),
                        t
                    );
                }),
                (e.translate = function(t, e, r) {
                    return (
                        (t[0] = e[0]),
                        (t[1] = e[1]),
                        (t[2] = e[2]),
                        (t[3] = e[3]),
                        (t[4] = e[4] + r[0]),
                        (t[5] = e[5] + r[1]),
                        t
                    );
                }),
                (e.rotate = function(t, e, r) {
                    var n = e[0],
                        i = e[2],
                        a = e[4],
                        o = e[1],
                        s = e[3],
                        l = e[5],
                        h = Math.sin(r),
                        u = Math.cos(r);
                    return (
                        (t[0] = n * u + o * h),
                        (t[1] = -n * h + o * u),
                        (t[2] = i * u + s * h),
                        (t[3] = -i * h + u * s),
                        (t[4] = u * a + h * l),
                        (t[5] = u * l - h * a),
                        t
                    );
                }),
                (e.scale = function(t, e, r) {
                    var n = r[0],
                        i = r[1];
                    return (
                        (t[0] = e[0] * n),
                        (t[1] = e[1] * i),
                        (t[2] = e[2] * n),
                        (t[3] = e[3] * i),
                        (t[4] = e[4] * n),
                        (t[5] = e[5] * i),
                        t
                    );
                }),
                (e.invert = function(t, e) {
                    var r = e[0],
                        n = e[2],
                        i = e[4],
                        a = e[1],
                        o = e[3],
                        s = e[5],
                        l = r * o - a * n;
                    return l
                        ? ((l = 1 / l),
                          (t[0] = o * l),
                          (t[1] = -a * l),
                          (t[2] = -n * l),
                          (t[3] = r * l),
                          (t[4] = (n * s - o * i) * l),
                          (t[5] = (a * i - r * s) * l),
                          t)
                        : null;
                }),
                (e.clone = function(t) {
                    var e = n();
                    return a(e, t), e;
                });
        },
        function(t, e, r) {
            var n = r(3),
                i = r(12),
                a = r(0),
                o = a.getContext,
                s = a.extend,
                l = a.retrieve2,
                h = a.retrieve3,
                u = a.trim,
                c = {},
                f = 0,
                d = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g,
                p = {};
            function v(t, e) {
                var r = t + ":" + (e = e || "12px sans-serif");
                if (c[r]) return c[r];
                for (
                    var n = (t + "").split("\n"), i = 0, a = 0, o = n.length;
                    a < o;
                    a++
                )
                    i = Math.max(T(n[a], e).width, i);
                return f > 5e3 && ((f = 0), (c = {})), f++, (c[r] = i), i;
            }
            function g(t, e, r) {
                return (
                    "right" === r ? (t -= e) : "center" === r && (t -= e / 2), t
                );
            }
            function y(t, e, r) {
                return (
                    "middle" === r ? (t -= e / 2) : "bottom" === r && (t -= e),
                    t
                );
            }
            function m(t, e, r) {
                var n = e.textPosition,
                    i = e.textDistance,
                    a = r.x,
                    o = r.y;
                i = i || 0;
                var s = r.height,
                    l = r.width,
                    h = s / 2,
                    u = "left",
                    c = "top";
                switch (n) {
                    case "left":
                        (a -= i), (o += h), (u = "right"), (c = "middle");
                        break;
                    case "right":
                        (a += i + l), (o += h), (c = "middle");
                        break;
                    case "top":
                        (a += l / 2), (o -= i), (u = "center"), (c = "bottom");
                        break;
                    case "bottom":
                        (a += l / 2), (o += s + i), (u = "center");
                        break;
                    case "inside":
                        (a += l / 2), (o += h), (u = "center"), (c = "middle");
                        break;
                    case "insideLeft":
                        (a += i), (o += h), (c = "middle");
                        break;
                    case "insideRight":
                        (a += l - i), (o += h), (u = "right"), (c = "middle");
                        break;
                    case "insideTop":
                        (a += l / 2), (o += i), (u = "center");
                        break;
                    case "insideBottom":
                        (a += l / 2),
                            (o += s - i),
                            (u = "center"),
                            (c = "bottom");
                        break;
                    case "insideTopLeft":
                        (a += i), (o += i);
                        break;
                    case "insideTopRight":
                        (a += l - i), (o += i), (u = "right");
                        break;
                    case "insideBottomLeft":
                        (a += i), (o += s - i), (c = "bottom");
                        break;
                    case "insideBottomRight":
                        (a += l - i),
                            (o += s - i),
                            (u = "right"),
                            (c = "bottom");
                }
                return (
                    ((t = t || {}).x = a),
                    (t.y = o),
                    (t.textAlign = u),
                    (t.textVerticalAlign = c),
                    t
                );
            }
            function x(t, e, r, n, i) {
                if (!e) return "";
                var a = (t + "").split("\n");
                i = _(e, r, n, i);
                for (var o = 0, s = a.length; o < s; o++) a[o] = b(a[o], i);
                return a.join("\n");
            }
            function _(t, e, r, n) {
                (n = s({}, n)).font = e;
                r = l(r, "...");
                n.maxIterations = l(n.maxIterations, 2);
                var i = (n.minChar = l(n.minChar, 0));
                n.cnCharWidth = v("国", e);
                var a = (n.ascCharWidth = v("a", e));
                n.placeholder = l(n.placeholder, "");
                for (
                    var o = (t = Math.max(0, t - 1)), h = 0;
                    h < i && o >= a;
                    h++
                )
                    o -= a;
                var u = v(r, e);
                return (
                    u > o && ((r = ""), (u = 0)),
                    (o = t - u),
                    (n.ellipsis = r),
                    (n.ellipsisWidth = u),
                    (n.contentWidth = o),
                    (n.containerWidth = t),
                    n
                );
            }
            function b(t, e) {
                var r = e.containerWidth,
                    n = e.font,
                    i = e.contentWidth;
                if (!r) return "";
                var a = v(t, n);
                if (a <= r) return t;
                for (var o = 0; ; o++) {
                    if (a <= i || o >= e.maxIterations) {
                        t += e.ellipsis;
                        break;
                    }
                    var s =
                        0 === o
                            ? w(t, i, e.ascCharWidth, e.cnCharWidth)
                            : a > 0
                            ? Math.floor((t.length * i) / a)
                            : 0;
                    a = v((t = t.substr(0, s)), n);
                }
                return "" === t && (t = e.placeholder), t;
            }
            function w(t, e, r, n) {
                for (var i = 0, a = 0, o = t.length; a < o && i < e; a++) {
                    var s = t.charCodeAt(a);
                    i += 0 <= s && s <= 127 ? r : n;
                }
                return a;
            }
            function S(t) {
                return v("国", t);
            }
            function T(t, e) {
                return p.measureText(t, e);
            }
            function P(t, e, r, n, i) {
                null != t && (t += "");
                var a = l(n, S(e)),
                    o = t ? t.split("\n") : [],
                    s = o.length * a,
                    h = s,
                    u = !0;
                if ((r && (h += r[0] + r[2]), t && i)) {
                    u = !1;
                    var c = i.outerHeight,
                        f = i.outerWidth;
                    if (null != c && h > c) (t = ""), (o = []);
                    else if (null != f)
                        for (
                            var d = _(
                                    f - (r ? r[1] + r[3] : 0),
                                    e,
                                    i.ellipsis,
                                    {
                                        minChar: i.minChar,
                                        placeholder: i.placeholder,
                                    }
                                ),
                                p = 0,
                                v = o.length;
                            p < v;
                            p++
                        )
                            o[p] = b(o[p], d);
                }
                return {
                    lines: o,
                    height: s,
                    outerHeight: h,
                    lineHeight: a,
                    canCacheByTextString: u,
                };
            }
            function M(t, e) {
                var r = { lines: [], width: 0, height: 0 };
                if ((null != t && (t += ""), !t)) return r;
                for (var n, a = (d.lastIndex = 0); null != (n = d.exec(t)); ) {
                    var o = n.index;
                    o > a && O(r, t.substring(a, o)),
                        O(r, n[2], n[1]),
                        (a = d.lastIndex);
                }
                a < t.length && O(r, t.substring(a, t.length));
                var s = r.lines,
                    u = 0,
                    c = 0,
                    f = [],
                    p = e.textPadding,
                    g = e.truncate,
                    y = g && g.outerWidth,
                    m = g && g.outerHeight;
                p &&
                    (null != y && (y -= p[1] + p[3]),
                    null != m && (m -= p[0] + p[2]));
                for (var _ = 0; _ < s.length; _++) {
                    for (
                        var b = s[_], w = 0, T = 0, P = 0;
                        P < b.tokens.length;
                        P++
                    ) {
                        var M =
                                ((E = b.tokens[P]).styleName &&
                                    e.rich[E.styleName]) ||
                                {},
                            k = (E.textPadding = M.textPadding),
                            C = (E.font = M.font || e.font),
                            A = (E.textHeight = l(M.textHeight, S(C)));
                        if (
                            (k && (A += k[0] + k[2]),
                            (E.height = A),
                            (E.lineHeight = h(
                                M.textLineHeight,
                                e.textLineHeight,
                                A
                            )),
                            (E.textAlign = (M && M.textAlign) || e.textAlign),
                            (E.textVerticalAlign =
                                (M && M.textVerticalAlign) || "middle"),
                            null != m && u + E.lineHeight > m)
                        )
                            return { lines: [], width: 0, height: 0 };
                        E.textWidth = v(E.text, C);
                        var D = M.textWidth,
                            I = null == D || "auto" === D;
                        if (
                            "string" == typeof D &&
                            "%" === D.charAt(D.length - 1)
                        )
                            (E.percentWidth = D), f.push(E), (D = 0);
                        else {
                            if (I) {
                                D = E.textWidth;
                                var L = M.textBackgroundColor,
                                    R = L && L.image;
                                R &&
                                    ((R = i.findExistImage(R)),
                                    i.isImageReady(R) &&
                                        (D = Math.max(
                                            D,
                                            (R.width * A) / R.height
                                        )));
                            }
                            var B = k ? k[1] + k[3] : 0;
                            D += B;
                            var F = null != y ? y - T : null;
                            null != F &&
                                F < D &&
                                (!I || F < B
                                    ? ((E.text = ""), (E.textWidth = D = 0))
                                    : ((E.text = x(
                                          E.text,
                                          F - B,
                                          C,
                                          g.ellipsis,
                                          { minChar: g.minChar }
                                      )),
                                      (E.textWidth = v(E.text, C)),
                                      (D = E.textWidth + B)));
                        }
                        (T += E.width = D),
                            M && (w = Math.max(w, E.lineHeight));
                    }
                    (b.width = T),
                        (b.lineHeight = w),
                        (u += w),
                        (c = Math.max(c, T));
                }
                (r.outerWidth = r.width = l(e.textWidth, c)),
                    (r.outerHeight = r.height = l(e.textHeight, u)),
                    p &&
                        ((r.outerWidth += p[1] + p[3]),
                        (r.outerHeight += p[0] + p[2]));
                for (_ = 0; _ < f.length; _++) {
                    var E,
                        N = (E = f[_]).percentWidth;
                    E.width = (parseInt(N, 10) / 100) * c;
                }
                return r;
            }
            function O(t, e, r) {
                for (
                    var n = "" === e, i = e.split("\n"), a = t.lines, o = 0;
                    o < i.length;
                    o++
                ) {
                    var s = i[o],
                        l = { styleName: r, text: s, isLineHolder: !s && !n };
                    if (o) a.push({ tokens: [l] });
                    else {
                        var h = (a[a.length - 1] || (a[0] = { tokens: [] }))
                                .tokens,
                            u = h.length;
                        1 === u && h[0].isLineHolder
                            ? (h[0] = l)
                            : (s || !u || n) && h.push(l);
                    }
                }
            }
            (p.measureText = function(t, e) {
                var r = o();
                return (r.font = e || "12px sans-serif"), r.measureText(t);
            }),
                (e.DEFAULT_FONT = "12px sans-serif"),
                (e.$override = function(t, e) {
                    p[t] = e;
                }),
                (e.getWidth = v),
                (e.getBoundingRect = function(t, e, r, i, a, o, s, l) {
                    return s
                        ? (function(t, e, r, i, a, o, s, l) {
                              var h = M(t, {
                                      rich: s,
                                      truncate: l,
                                      font: e,
                                      textAlign: r,
                                      textPadding: a,
                                      textLineHeight: o,
                                  }),
                                  u = h.outerWidth,
                                  c = h.outerHeight,
                                  f = g(0, u, r),
                                  d = y(0, c, i);
                              return new n(f, d, u, c);
                          })(t, e, r, i, a, o, s, l)
                        : (function(t, e, r, i, a, o, s) {
                              var l = P(t, e, a, o, s),
                                  h = v(t, e);
                              a && (h += a[1] + a[3]);
                              var u = l.outerHeight,
                                  c = g(0, h, r),
                                  f = y(0, u, i),
                                  d = new n(c, f, h, u);
                              return (d.lineHeight = l.lineHeight), d;
                          })(t, e, r, i, a, o, l);
                }),
                (e.adjustTextX = g),
                (e.adjustTextY = y),
                (e.calculateTextPosition = m),
                (e.adjustTextPositionOnRect = function(t, e, r) {
                    return m({}, { textPosition: t, textDistance: r }, e);
                }),
                (e.truncateText = x),
                (e.getLineHeight = S),
                (e.measureText = T),
                (e.parsePlainText = P),
                (e.parseRichText = M),
                (e.makeFont = function(t) {
                    var e =
                        (t.fontSize || t.fontFamily) &&
                        [
                            t.fontStyle,
                            t.fontWeight,
                            (t.fontSize || 12) + "px",
                            t.fontFamily || "sans-serif",
                        ].join(" ");
                    return (e && u(e)) || t.textFont || t.font;
                });
        },
        function(t, e, r) {
            var n = new (r(22))(50);
            function i() {
                var t = this.__cachedImgObj;
                this.onload = this.onerror = this.__cachedImgObj = null;
                for (var e = 0; e < t.pending.length; e++) {
                    var r = t.pending[e],
                        n = r.cb;
                    n && n(this, r.cbPayload), r.hostEl.dirty();
                }
                t.pending.length = 0;
            }
            function a(t) {
                return t && t.width && t.height;
            }
            (e.findExistImage = function(t) {
                if ("string" == typeof t) {
                    var e = n.get(t);
                    return e && e.image;
                }
                return t;
            }),
                (e.createOrUpdateImage = function(t, e, r, o, s) {
                    if (t) {
                        if ("string" == typeof t) {
                            if ((e && e.__zrImageSrc === t) || !r) return e;
                            var l = n.get(t),
                                h = { hostEl: r, cb: o, cbPayload: s };
                            return (
                                l
                                    ? !a((e = l.image)) && l.pending.push(h)
                                    : (((e = new Image()).onload = e.onerror = i),
                                      n.put(
                                          t,
                                          (e.__cachedImgObj = {
                                              image: e,
                                              pending: [h],
                                          })
                                      ),
                                      (e.src = e.__zrImageSrc = t)),
                                e
                            );
                        }
                        return t;
                    }
                    return e;
                }),
                (e.isImageReady = a);
        },
        function(t, e) {
            var r = Math.round;
            function n(t, e, n) {
                if (!e) return t;
                var i = r(2 * t);
                return (i + r(e)) % 2 == 0 ? i / 2 : (i + (n ? 1 : -1)) / 2;
            }
            (e.subPixelOptimizeLine = function(t, e, i) {
                if (e) {
                    var a = e.x1,
                        o = e.x2,
                        s = e.y1,
                        l = e.y2;
                    (t.x1 = a), (t.x2 = o), (t.y1 = s), (t.y2 = l);
                    var h = i && i.lineWidth;
                    h &&
                        (r(2 * a) === r(2 * o) && (t.x1 = t.x2 = n(a, h, !0)),
                        r(2 * s) === r(2 * l) && (t.y1 = t.y2 = n(s, h, !0)));
                }
            }),
                (e.subPixelOptimizeRect = function(t, e, r) {
                    if (e) {
                        var i = e.x,
                            a = e.y,
                            o = e.width,
                            s = e.height;
                        (t.x = i), (t.y = a), (t.width = o), (t.height = s);
                        var l = r && r.lineWidth;
                        l &&
                            ((t.x = n(i, l, !0)),
                            (t.y = n(a, l, !0)),
                            (t.width = Math.max(
                                n(i + o, l, !1) - t.x,
                                0 === o ? 0 : 1
                            )),
                            (t.height = Math.max(
                                n(a + s, l, !1) - t.y,
                                0 === s ? 0 : 1
                            )));
                    }
                }),
                (e.subPixelOptimize = n);
        },
        function(t, e, r) {
            var n = r(0),
                i = r(15),
                a = n.each,
                o = n.isObject,
                s = n.isArray;
            function l(t) {
                return t instanceof Array ? t : null == t ? [] : [t];
            }
            function h(t) {
                return o(t) && t.id && 0 === (t.id + "").indexOf("\0_ec_\0");
            }
            var u = 0;
            function c(t, e) {
                return t && t.hasOwnProperty(e);
            }
            (e.normalizeToArray = l),
                (e.defaultEmphasis = function(t, e, r) {
                    if (t) {
                        (t[e] = t[e] || {}),
                            (t.emphasis = t.emphasis || {}),
                            (t.emphasis[e] = t.emphasis[e] || {});
                        for (var n = 0, i = r.length; n < i; n++) {
                            var a = r[n];
                            !t.emphasis[e].hasOwnProperty(a) &&
                                t[e].hasOwnProperty(a) &&
                                (t.emphasis[e][a] = t[e][a]);
                        }
                    }
                }),
                (e.TEXT_STYLE_OPTIONS = [
                    "fontStyle",
                    "fontWeight",
                    "fontSize",
                    "fontFamily",
                    "rich",
                    "tag",
                    "color",
                    "textBorderColor",
                    "textBorderWidth",
                    "width",
                    "height",
                    "lineHeight",
                    "align",
                    "verticalAlign",
                    "baseline",
                    "shadowColor",
                    "shadowBlur",
                    "shadowOffsetX",
                    "shadowOffsetY",
                    "textShadowColor",
                    "textShadowBlur",
                    "textShadowOffsetX",
                    "textShadowOffsetY",
                    "backgroundColor",
                    "borderColor",
                    "borderWidth",
                    "borderRadius",
                    "padding",
                ]),
                (e.getDataItemValue = function(t) {
                    return !o(t) || s(t) || t instanceof Date ? t : t.value;
                }),
                (e.isDataItemOption = function(t) {
                    return o(t) && !(t instanceof Array);
                }),
                (e.mappingToExists = function(t, e) {
                    e = (e || []).slice();
                    var r = n.map(t || [], function(t, e) {
                        return { exist: t };
                    });
                    return (
                        a(e, function(t, n) {
                            if (o(t)) {
                                for (var i = 0; i < r.length; i++)
                                    if (
                                        !r[i].option &&
                                        null != t.id &&
                                        r[i].exist.id === t.id + ""
                                    )
                                        return (
                                            (r[i].option = t),
                                            void (e[n] = null)
                                        );
                                for (i = 0; i < r.length; i++) {
                                    var a = r[i].exist;
                                    if (
                                        !(
                                            r[i].option ||
                                            (null != a.id && null != t.id) ||
                                            null == t.name ||
                                            h(t) ||
                                            h(a) ||
                                            a.name !== t.name + ""
                                        )
                                    )
                                        return (
                                            (r[i].option = t),
                                            void (e[n] = null)
                                        );
                                }
                            }
                        }),
                        a(e, function(t, e) {
                            if (o(t)) {
                                for (var n = 0; n < r.length; n++) {
                                    var i = r[n].exist;
                                    if (!r[n].option && !h(i) && null == t.id) {
                                        r[n].option = t;
                                        break;
                                    }
                                }
                                n >= r.length && r.push({ option: t });
                            }
                        }),
                        r
                    );
                }),
                (e.makeIdAndName = function(t) {
                    var e = n.createHashMap();
                    a(t, function(t, r) {
                        var n = t.exist;
                        n && e.set(n.id, t);
                    }),
                        a(t, function(t, r) {
                            var i = t.option;
                            n.assert(
                                !i ||
                                    null == i.id ||
                                    !e.get(i.id) ||
                                    e.get(i.id) === t,
                                "id duplicates: " + (i && i.id)
                            ),
                                i && null != i.id && e.set(i.id, t),
                                !t.keyInfo && (t.keyInfo = {});
                        }),
                        a(t, function(t, r) {
                            var n = t.exist,
                                i = t.option,
                                a = t.keyInfo;
                            if (o(i)) {
                                if (
                                    ((a.name =
                                        null != i.name
                                            ? i.name + ""
                                            : n
                                            ? n.name
                                            : "series\0" + r),
                                    n)
                                )
                                    a.id = n.id;
                                else if (null != i.id) a.id = i.id + "";
                                else {
                                    var s = 0;
                                    do {
                                        a.id = "\0" + a.name + "\0" + s++;
                                    } while (e.get(a.id));
                                }
                                e.set(a.id, t);
                            }
                        });
                }),
                (e.isNameSpecified = function(t) {
                    var e = t.name;
                    return !(!e || !e.indexOf("series\0"));
                }),
                (e.isIdInner = h),
                (e.compressBatches = function(t, e) {
                    var r = {},
                        n = {};
                    return i(t || [], r), i(e || [], n, r), [a(r), a(n)];
                    function i(t, e, r) {
                        for (var n = 0, i = t.length; n < i; n++)
                            for (
                                var a = t[n].seriesId,
                                    o = l(t[n].dataIndex),
                                    s = r && r[a],
                                    h = 0,
                                    u = o.length;
                                h < u;
                                h++
                            ) {
                                var c = o[h];
                                s && s[c]
                                    ? (s[c] = null)
                                    : ((e[a] || (e[a] = {}))[c] = 1);
                            }
                    }
                    function a(t, e) {
                        var r = [];
                        for (var n in t)
                            if (t.hasOwnProperty(n) && null != t[n])
                                if (e) r.push(+n);
                                else {
                                    var i = a(t[n], !0);
                                    i.length &&
                                        r.push({ seriesId: n, dataIndex: i });
                                }
                        return r;
                    }
                }),
                (e.queryDataIndex = function(t, e) {
                    return null != e.dataIndexInside
                        ? e.dataIndexInside
                        : null != e.dataIndex
                        ? n.isArray(e.dataIndex)
                            ? n.map(e.dataIndex, function(e) {
                                  return t.indexOfRawIndex(e);
                              })
                            : t.indexOfRawIndex(e.dataIndex)
                        : null != e.name
                        ? n.isArray(e.name)
                            ? n.map(e.name, function(e) {
                                  return t.indexOfName(e);
                              })
                            : t.indexOfName(e.name)
                        : void 0;
                }),
                (e.makeInner = function() {
                    var t =
                        "__\0ec_inner_" + u++ + "_" + Math.random().toFixed(5);
                    return function(e) {
                        return e[t] || (e[t] = {});
                    };
                }),
                (e.parseFinder = function(t, e, r) {
                    if (n.isString(e)) {
                        var i = {};
                        (i[e + "Index"] = 0), (e = i);
                    }
                    var o = r && r.defaultMainType;
                    !o ||
                        c(e, o + "Index") ||
                        c(e, o + "Id") ||
                        c(e, o + "Name") ||
                        (e[o + "Index"] = 0);
                    var s = {};
                    return (
                        a(e, function(i, a) {
                            i = e[a];
                            if ("dataIndex" !== a && "dataIndexInside" !== a) {
                                var o = a.match(/^(\w+)(Index|Id|Name)$/) || [],
                                    l = o[1],
                                    h = (o[2] || "").toLowerCase();
                                if (
                                    !(
                                        !l ||
                                        !h ||
                                        null == i ||
                                        ("index" === h && "none" === i) ||
                                        (r &&
                                            r.includeMainTypes &&
                                            n.indexOf(r.includeMainTypes, l) <
                                                0)
                                    )
                                ) {
                                    var u = { mainType: l };
                                    ("index" === h && "all" === i) ||
                                        (u[h] = i);
                                    var c = t.queryComponents(u);
                                    (s[l + "Models"] = c),
                                        (s[l + "Model"] = c[0]);
                                }
                            } else s[a] = i;
                        }),
                        s
                    );
                }),
                (e.setAttribute = function(t, e, r) {
                    t.setAttribute ? t.setAttribute(e, r) : (t[e] = r);
                }),
                (e.getAttribute = function(t, e) {
                    return t.getAttribute ? t.getAttribute(e) : t[e];
                }),
                (e.getTooltipRenderMode = function(t) {
                    return "auto" === t
                        ? i.domSupported
                            ? "html"
                            : "richText"
                        : t || "html";
                }),
                (e.groupData = function(t, e) {
                    var r = n.createHashMap(),
                        i = [];
                    return (
                        n.each(t, function(t) {
                            var n = e(t);
                            (r.get(n) || (i.push(n), r.set(n, []))).push(t);
                        }),
                        { keys: i, buckets: r }
                    );
                });
        },
        function(t, e) {
            var r =
                "object" == typeof wx &&
                "function" == typeof wx.getSystemInfoSync
                    ? {
                          browser: {},
                          os: {},
                          node: !1,
                          wxa: !0,
                          canvasSupported: !0,
                          svgSupported: !1,
                          touchEventsSupported: !0,
                          domSupported: !1,
                      }
                    : "undefined" == typeof document &&
                      "undefined" != typeof self
                    ? {
                          browser: {},
                          os: {},
                          node: !1,
                          worker: !0,
                          canvasSupported: !0,
                          domSupported: !1,
                      }
                    : "undefined" == typeof navigator
                    ? {
                          browser: {},
                          os: {},
                          node: !0,
                          worker: !1,
                          canvasSupported: !0,
                          svgSupported: !0,
                          domSupported: !1,
                      }
                    : (function(t) {
                          var e = {},
                              r = t.match(/Firefox\/([\d.]+)/),
                              n =
                                  t.match(/MSIE\s([\d.]+)/) ||
                                  t.match(/Trident\/.+?rv:(([\d.]+))/),
                              i = t.match(/Edge\/([\d.]+)/),
                              a = /micromessenger/i.test(t);
                          r && ((e.firefox = !0), (e.version = r[1]));
                          n && ((e.ie = !0), (e.version = n[1]));
                          i && ((e.edge = !0), (e.version = i[1]));
                          a && (e.weChat = !0);
                          return {
                              browser: e,
                              os: {},
                              node: !1,
                              canvasSupported: !!document.createElement(
                                  "canvas"
                              ).getContext,
                              svgSupported: "undefined" != typeof SVGRect,
                              touchEventsSupported:
                                  "ontouchstart" in window && !e.ie && !e.edge,
                              pointerEventsSupported:
                                  "onpointerdown" in window &&
                                  (e.edge || (e.ie && e.version >= 11)),
                              domSupported: "undefined" != typeof document,
                          };
                      })(navigator.userAgent);
            t.exports = r;
        },
        function(t, e, r) {
            var n = r(0),
                i = n.createHashMap,
                a = n.isTypedArray,
                o = r(35).enableClassCheck,
                s = r(17),
                l = s.SOURCE_FORMAT_ORIGINAL,
                h = s.SERIES_LAYOUT_BY_COLUMN,
                u = s.SOURCE_FORMAT_UNKNOWN,
                c = s.SOURCE_FORMAT_TYPED_ARRAY,
                f = s.SOURCE_FORMAT_KEYED_COLUMNS;
            function d(t) {
                (this.fromDataset = t.fromDataset),
                    (this.data = t.data || (t.sourceFormat === f ? {} : [])),
                    (this.sourceFormat = t.sourceFormat || u),
                    (this.seriesLayoutBy = t.seriesLayoutBy || h),
                    (this.dimensionsDefine = t.dimensionsDefine),
                    (this.encodeDefine = t.encodeDefine && i(t.encodeDefine)),
                    (this.startIndex = t.startIndex || 0),
                    (this.dimensionsDetectCount = t.dimensionsDetectCount);
            }
            (d.seriesDataToSource = function(t) {
                return new d({
                    data: t,
                    sourceFormat: a(t) ? c : l,
                    fromDataset: !1,
                });
            }),
                o(d);
            var p = d;
            t.exports = p;
        },
        function(t, e) {
            (e.SOURCE_FORMAT_ORIGINAL = "original"),
                (e.SOURCE_FORMAT_ARRAY_ROWS = "arrayRows"),
                (e.SOURCE_FORMAT_OBJECT_ROWS = "objectRows"),
                (e.SOURCE_FORMAT_KEYED_COLUMNS = "keyedColumns"),
                (e.SOURCE_FORMAT_UNKNOWN = "unknown"),
                (e.SOURCE_FORMAT_TYPED_ARRAY = "typedArray"),
                (e.SERIES_LAYOUT_BY_COLUMN = "column"),
                (e.SERIES_LAYOUT_BY_ROW = "row");
        },
        function(t, e) {
            var r = {
                shadowBlur: 1,
                shadowOffsetX: 1,
                shadowOffsetY: 1,
                textShadowBlur: 1,
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
                textBoxShadowBlur: 1,
                textBoxShadowOffsetX: 1,
                textBoxShadowOffsetY: 1,
            };
            t.exports = function(t, e, n) {
                return r.hasOwnProperty(e) ? n * t.dpr : n;
            };
        },
        function(t, e, r) {
            var n = r(43),
                i = r(44),
                a = r(20),
                o = r(45),
                s = r(0),
                l = function(t) {
                    a.call(this, t),
                        i.call(this, t),
                        o.call(this, t),
                        (this.id = t.id || n());
                };
            (l.prototype = {
                type: "element",
                name: "",
                __zr: null,
                ignore: !1,
                clipPath: null,
                isGroup: !1,
                drift: function(t, e) {
                    switch (this.draggable) {
                        case "horizontal":
                            e = 0;
                            break;
                        case "vertical":
                            t = 0;
                    }
                    var r = this.transform;
                    r || (r = this.transform = [1, 0, 0, 1, 0, 0]),
                        (r[4] += t),
                        (r[5] += e),
                        this.decomposeTransform(),
                        this.dirty(!1);
                },
                beforeUpdate: function() {},
                afterUpdate: function() {},
                update: function() {
                    this.updateTransform();
                },
                traverse: function(t, e) {},
                attrKV: function(t, e) {
                    if ("position" === t || "scale" === t || "origin" === t) {
                        if (e) {
                            var r = this[t];
                            r || (r = this[t] = []),
                                (r[0] = e[0]),
                                (r[1] = e[1]);
                        }
                    } else this[t] = e;
                },
                hide: function() {
                    (this.ignore = !0), this.__zr && this.__zr.refresh();
                },
                show: function() {
                    (this.ignore = !1), this.__zr && this.__zr.refresh();
                },
                attr: function(t, e) {
                    if ("string" == typeof t) this.attrKV(t, e);
                    else if (s.isObject(t))
                        for (var r in t)
                            t.hasOwnProperty(r) && this.attrKV(r, t[r]);
                    return this.dirty(!1), this;
                },
                setClipPath: function(t) {
                    var e = this.__zr;
                    e && t.addSelfToZr(e),
                        this.clipPath &&
                            this.clipPath !== t &&
                            this.removeClipPath(),
                        (this.clipPath = t),
                        (t.__zr = e),
                        (t.__clipTarget = this),
                        this.dirty(!1);
                },
                removeClipPath: function() {
                    var t = this.clipPath;
                    t &&
                        (t.__zr && t.removeSelfFromZr(t.__zr),
                        (t.__zr = null),
                        (t.__clipTarget = null),
                        (this.clipPath = null),
                        this.dirty(!1));
                },
                addSelfToZr: function(t) {
                    this.__zr = t;
                    var e = this.animators;
                    if (e)
                        for (var r = 0; r < e.length; r++)
                            t.animation.addAnimator(e[r]);
                    this.clipPath && this.clipPath.addSelfToZr(t);
                },
                removeSelfFromZr: function(t) {
                    this.__zr = null;
                    var e = this.animators;
                    if (e)
                        for (var r = 0; r < e.length; r++)
                            t.animation.removeAnimator(e[r]);
                    this.clipPath && this.clipPath.removeSelfFromZr(t);
                },
            }),
                s.mixin(l, o),
                s.mixin(l, a),
                s.mixin(l, i);
            var h = l;
            t.exports = h;
        },
        function(t, e, r) {
            var n = r(10),
                i = r(2),
                a = n.identity;
            function o(t) {
                return t > 5e-5 || t < -5e-5;
            }
            var s = function(t) {
                    (t = t || {}).position || (this.position = [0, 0]),
                        null == t.rotation && (this.rotation = 0),
                        t.scale || (this.scale = [1, 1]),
                        (this.origin = this.origin || null);
                },
                l = s.prototype;
            (l.transform = null),
                (l.needLocalTransform = function() {
                    return (
                        o(this.rotation) ||
                        o(this.position[0]) ||
                        o(this.position[1]) ||
                        o(this.scale[0] - 1) ||
                        o(this.scale[1] - 1)
                    );
                });
            var h = [];
            (l.updateTransform = function() {
                var t = this.parent,
                    e = t && t.transform,
                    r = this.needLocalTransform(),
                    i = this.transform;
                if (r || e) {
                    (i = i || n.create()),
                        r ? this.getLocalTransform(i) : a(i),
                        e &&
                            (r
                                ? n.mul(i, t.transform, i)
                                : n.copy(i, t.transform)),
                        (this.transform = i);
                    var o = this.globalScaleRatio;
                    if (null != o && 1 !== o) {
                        this.getGlobalScale(h);
                        var s = h[0] < 0 ? -1 : 1,
                            l = h[1] < 0 ? -1 : 1,
                            u = ((h[0] - s) * o + s) / h[0] || 0,
                            c = ((h[1] - l) * o + l) / h[1] || 0;
                        (i[0] *= u), (i[1] *= u), (i[2] *= c), (i[3] *= c);
                    }
                    (this.invTransform = this.invTransform || n.create()),
                        n.invert(this.invTransform, i);
                } else i && a(i);
            }),
                (l.getLocalTransform = function(t) {
                    return s.getLocalTransform(this, t);
                }),
                (l.setTransform = function(t) {
                    var e = this.transform,
                        r = t.dpr || 1;
                    e
                        ? t.setTransform(
                              r * e[0],
                              r * e[1],
                              r * e[2],
                              r * e[3],
                              r * e[4],
                              r * e[5]
                          )
                        : t.setTransform(r, 0, 0, r, 0, 0);
                }),
                (l.restoreTransform = function(t) {
                    var e = t.dpr || 1;
                    t.setTransform(e, 0, 0, e, 0, 0);
                });
            var u = [],
                c = n.create();
            (l.setLocalTransform = function(t) {
                if (t) {
                    var e = t[0] * t[0] + t[1] * t[1],
                        r = t[2] * t[2] + t[3] * t[3],
                        n = this.position,
                        i = this.scale;
                    o(e - 1) && (e = Math.sqrt(e)),
                        o(r - 1) && (r = Math.sqrt(r)),
                        t[0] < 0 && (e = -e),
                        t[3] < 0 && (r = -r),
                        (n[0] = t[4]),
                        (n[1] = t[5]),
                        (i[0] = e),
                        (i[1] = r),
                        (this.rotation = Math.atan2(-t[1] / r, t[0] / e));
                }
            }),
                (l.decomposeTransform = function() {
                    if (this.transform) {
                        var t = this.parent,
                            e = this.transform;
                        t &&
                            t.transform &&
                            (n.mul(u, t.invTransform, e), (e = u));
                        var r = this.origin;
                        r &&
                            (r[0] || r[1]) &&
                            ((c[4] = r[0]),
                            (c[5] = r[1]),
                            n.mul(u, e, c),
                            (u[4] -= r[0]),
                            (u[5] -= r[1]),
                            (e = u)),
                            this.setLocalTransform(e);
                    }
                }),
                (l.getGlobalScale = function(t) {
                    var e = this.transform;
                    return (
                        (t = t || []),
                        e
                            ? ((t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1])),
                              (t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3])),
                              e[0] < 0 && (t[0] = -t[0]),
                              e[3] < 0 && (t[1] = -t[1]),
                              t)
                            : ((t[0] = 1), (t[1] = 1), t)
                    );
                }),
                (l.transformCoordToLocal = function(t, e) {
                    var r = [t, e],
                        n = this.invTransform;
                    return n && i.applyTransform(r, r, n), r;
                }),
                (l.transformCoordToGlobal = function(t, e) {
                    var r = [t, e],
                        n = this.transform;
                    return n && i.applyTransform(r, r, n), r;
                }),
                (s.getLocalTransform = function(t, e) {
                    a((e = e || []));
                    var r = t.origin,
                        i = t.scale || [1, 1],
                        o = t.rotation || 0,
                        s = t.position || [0, 0];
                    return (
                        r && ((e[4] -= r[0]), (e[5] -= r[1])),
                        n.scale(e, e, i),
                        o && n.rotate(e, e, o),
                        r && ((e[4] += r[0]), (e[5] += r[1])),
                        (e[4] += s[0]),
                        (e[5] += s[1]),
                        e
                    );
                });
            var f = s;
            t.exports = f;
        },
        function(t, e, r) {
            var n = r(22),
                i = {
                    transparent: [0, 0, 0, 0],
                    aliceblue: [240, 248, 255, 1],
                    antiquewhite: [250, 235, 215, 1],
                    aqua: [0, 255, 255, 1],
                    aquamarine: [127, 255, 212, 1],
                    azure: [240, 255, 255, 1],
                    beige: [245, 245, 220, 1],
                    bisque: [255, 228, 196, 1],
                    black: [0, 0, 0, 1],
                    blanchedalmond: [255, 235, 205, 1],
                    blue: [0, 0, 255, 1],
                    blueviolet: [138, 43, 226, 1],
                    brown: [165, 42, 42, 1],
                    burlywood: [222, 184, 135, 1],
                    cadetblue: [95, 158, 160, 1],
                    chartreuse: [127, 255, 0, 1],
                    chocolate: [210, 105, 30, 1],
                    coral: [255, 127, 80, 1],
                    cornflowerblue: [100, 149, 237, 1],
                    cornsilk: [255, 248, 220, 1],
                    crimson: [220, 20, 60, 1],
                    cyan: [0, 255, 255, 1],
                    darkblue: [0, 0, 139, 1],
                    darkcyan: [0, 139, 139, 1],
                    darkgoldenrod: [184, 134, 11, 1],
                    darkgray: [169, 169, 169, 1],
                    darkgreen: [0, 100, 0, 1],
                    darkgrey: [169, 169, 169, 1],
                    darkkhaki: [189, 183, 107, 1],
                    darkmagenta: [139, 0, 139, 1],
                    darkolivegreen: [85, 107, 47, 1],
                    darkorange: [255, 140, 0, 1],
                    darkorchid: [153, 50, 204, 1],
                    darkred: [139, 0, 0, 1],
                    darksalmon: [233, 150, 122, 1],
                    darkseagreen: [143, 188, 143, 1],
                    darkslateblue: [72, 61, 139, 1],
                    darkslategray: [47, 79, 79, 1],
                    darkslategrey: [47, 79, 79, 1],
                    darkturquoise: [0, 206, 209, 1],
                    darkviolet: [148, 0, 211, 1],
                    deeppink: [255, 20, 147, 1],
                    deepskyblue: [0, 191, 255, 1],
                    dimgray: [105, 105, 105, 1],
                    dimgrey: [105, 105, 105, 1],
                    dodgerblue: [30, 144, 255, 1],
                    firebrick: [178, 34, 34, 1],
                    floralwhite: [255, 250, 240, 1],
                    forestgreen: [34, 139, 34, 1],
                    fuchsia: [255, 0, 255, 1],
                    gainsboro: [220, 220, 220, 1],
                    ghostwhite: [248, 248, 255, 1],
                    gold: [255, 215, 0, 1],
                    goldenrod: [218, 165, 32, 1],
                    gray: [128, 128, 128, 1],
                    green: [0, 128, 0, 1],
                    greenyellow: [173, 255, 47, 1],
                    grey: [128, 128, 128, 1],
                    honeydew: [240, 255, 240, 1],
                    hotpink: [255, 105, 180, 1],
                    indianred: [205, 92, 92, 1],
                    indigo: [75, 0, 130, 1],
                    ivory: [255, 255, 240, 1],
                    khaki: [240, 230, 140, 1],
                    lavender: [230, 230, 250, 1],
                    lavenderblush: [255, 240, 245, 1],
                    lawngreen: [124, 252, 0, 1],
                    lemonchiffon: [255, 250, 205, 1],
                    lightblue: [173, 216, 230, 1],
                    lightcoral: [240, 128, 128, 1],
                    lightcyan: [224, 255, 255, 1],
                    lightgoldenrodyellow: [250, 250, 210, 1],
                    lightgray: [211, 211, 211, 1],
                    lightgreen: [144, 238, 144, 1],
                    lightgrey: [211, 211, 211, 1],
                    lightpink: [255, 182, 193, 1],
                    lightsalmon: [255, 160, 122, 1],
                    lightseagreen: [32, 178, 170, 1],
                    lightskyblue: [135, 206, 250, 1],
                    lightslategray: [119, 136, 153, 1],
                    lightslategrey: [119, 136, 153, 1],
                    lightsteelblue: [176, 196, 222, 1],
                    lightyellow: [255, 255, 224, 1],
                    lime: [0, 255, 0, 1],
                    limegreen: [50, 205, 50, 1],
                    linen: [250, 240, 230, 1],
                    magenta: [255, 0, 255, 1],
                    maroon: [128, 0, 0, 1],
                    mediumaquamarine: [102, 205, 170, 1],
                    mediumblue: [0, 0, 205, 1],
                    mediumorchid: [186, 85, 211, 1],
                    mediumpurple: [147, 112, 219, 1],
                    mediumseagreen: [60, 179, 113, 1],
                    mediumslateblue: [123, 104, 238, 1],
                    mediumspringgreen: [0, 250, 154, 1],
                    mediumturquoise: [72, 209, 204, 1],
                    mediumvioletred: [199, 21, 133, 1],
                    midnightblue: [25, 25, 112, 1],
                    mintcream: [245, 255, 250, 1],
                    mistyrose: [255, 228, 225, 1],
                    moccasin: [255, 228, 181, 1],
                    navajowhite: [255, 222, 173, 1],
                    navy: [0, 0, 128, 1],
                    oldlace: [253, 245, 230, 1],
                    olive: [128, 128, 0, 1],
                    olivedrab: [107, 142, 35, 1],
                    orange: [255, 165, 0, 1],
                    orangered: [255, 69, 0, 1],
                    orchid: [218, 112, 214, 1],
                    palegoldenrod: [238, 232, 170, 1],
                    palegreen: [152, 251, 152, 1],
                    paleturquoise: [175, 238, 238, 1],
                    palevioletred: [219, 112, 147, 1],
                    papayawhip: [255, 239, 213, 1],
                    peachpuff: [255, 218, 185, 1],
                    peru: [205, 133, 63, 1],
                    pink: [255, 192, 203, 1],
                    plum: [221, 160, 221, 1],
                    powderblue: [176, 224, 230, 1],
                    purple: [128, 0, 128, 1],
                    red: [255, 0, 0, 1],
                    rosybrown: [188, 143, 143, 1],
                    royalblue: [65, 105, 225, 1],
                    saddlebrown: [139, 69, 19, 1],
                    salmon: [250, 128, 114, 1],
                    sandybrown: [244, 164, 96, 1],
                    seagreen: [46, 139, 87, 1],
                    seashell: [255, 245, 238, 1],
                    sienna: [160, 82, 45, 1],
                    silver: [192, 192, 192, 1],
                    skyblue: [135, 206, 235, 1],
                    slateblue: [106, 90, 205, 1],
                    slategray: [112, 128, 144, 1],
                    slategrey: [112, 128, 144, 1],
                    snow: [255, 250, 250, 1],
                    springgreen: [0, 255, 127, 1],
                    steelblue: [70, 130, 180, 1],
                    tan: [210, 180, 140, 1],
                    teal: [0, 128, 128, 1],
                    thistle: [216, 191, 216, 1],
                    tomato: [255, 99, 71, 1],
                    turquoise: [64, 224, 208, 1],
                    violet: [238, 130, 238, 1],
                    wheat: [245, 222, 179, 1],
                    white: [255, 255, 255, 1],
                    whitesmoke: [245, 245, 245, 1],
                    yellow: [255, 255, 0, 1],
                    yellowgreen: [154, 205, 50, 1],
                };
            function a(t) {
                return (t = Math.round(t)) < 0 ? 0 : t > 255 ? 255 : t;
            }
            function o(t) {
                return t < 0 ? 0 : t > 1 ? 1 : t;
            }
            function s(t) {
                return t.length && "%" === t.charAt(t.length - 1)
                    ? a((parseFloat(t) / 100) * 255)
                    : a(parseInt(t, 10));
            }
            function l(t) {
                return t.length && "%" === t.charAt(t.length - 1)
                    ? o(parseFloat(t) / 100)
                    : o(parseFloat(t));
            }
            function h(t, e, r) {
                return (
                    r < 0 ? (r += 1) : r > 1 && (r -= 1),
                    6 * r < 1
                        ? t + (e - t) * r * 6
                        : 2 * r < 1
                        ? e
                        : 3 * r < 2
                        ? t + (e - t) * (2 / 3 - r) * 6
                        : t
                );
            }
            function u(t, e, r) {
                return t + (e - t) * r;
            }
            function c(t, e, r, n, i) {
                return (t[0] = e), (t[1] = r), (t[2] = n), (t[3] = i), t;
            }
            function f(t, e) {
                return (
                    (t[0] = e[0]),
                    (t[1] = e[1]),
                    (t[2] = e[2]),
                    (t[3] = e[3]),
                    t
                );
            }
            var d = new n(20),
                p = null;
            function v(t, e) {
                p && f(p, e), (p = d.put(t, p || e.slice()));
            }
            function g(t, e) {
                if (t) {
                    e = e || [];
                    var r = d.get(t);
                    if (r) return f(e, r);
                    var n,
                        a = (t += "").replace(/ /g, "").toLowerCase();
                    if (a in i) return f(e, i[a]), v(t, e), e;
                    if ("#" === a.charAt(0))
                        return 4 === a.length
                            ? (n = parseInt(a.substr(1), 16)) >= 0 && n <= 4095
                                ? (c(
                                      e,
                                      ((3840 & n) >> 4) | ((3840 & n) >> 8),
                                      (240 & n) | ((240 & n) >> 4),
                                      (15 & n) | ((15 & n) << 4),
                                      1
                                  ),
                                  v(t, e),
                                  e)
                                : void c(e, 0, 0, 0, 1)
                            : 7 === a.length
                            ? (n = parseInt(a.substr(1), 16)) >= 0 &&
                              n <= 16777215
                                ? (c(
                                      e,
                                      (16711680 & n) >> 16,
                                      (65280 & n) >> 8,
                                      255 & n,
                                      1
                                  ),
                                  v(t, e),
                                  e)
                                : void c(e, 0, 0, 0, 1)
                            : void 0;
                    var o = a.indexOf("("),
                        h = a.indexOf(")");
                    if (-1 !== o && h + 1 === a.length) {
                        var u = a.substr(0, o),
                            p = a.substr(o + 1, h - (o + 1)).split(","),
                            g = 1;
                        switch (u) {
                            case "rgba":
                                if (4 !== p.length)
                                    return void c(e, 0, 0, 0, 1);
                                g = l(p.pop());
                            case "rgb":
                                return 3 !== p.length
                                    ? void c(e, 0, 0, 0, 1)
                                    : (c(e, s(p[0]), s(p[1]), s(p[2]), g),
                                      v(t, e),
                                      e);
                            case "hsla":
                                return 4 !== p.length
                                    ? void c(e, 0, 0, 0, 1)
                                    : ((p[3] = l(p[3])), y(p, e), v(t, e), e);
                            case "hsl":
                                return 3 !== p.length
                                    ? void c(e, 0, 0, 0, 1)
                                    : (y(p, e), v(t, e), e);
                            default:
                                return;
                        }
                    }
                    c(e, 0, 0, 0, 1);
                }
            }
            function y(t, e) {
                var r = (((parseFloat(t[0]) % 360) + 360) % 360) / 360,
                    n = l(t[1]),
                    i = l(t[2]),
                    o = i <= 0.5 ? i * (n + 1) : i + n - i * n,
                    s = 2 * i - o;
                return (
                    c(
                        (e = e || []),
                        a(255 * h(s, o, r + 1 / 3)),
                        a(255 * h(s, o, r)),
                        a(255 * h(s, o, r - 1 / 3)),
                        1
                    ),
                    4 === t.length && (e[3] = t[3]),
                    e
                );
            }
            function m(t, e, r) {
                if (e && e.length && t >= 0 && t <= 1) {
                    r = r || [];
                    var n = t * (e.length - 1),
                        i = Math.floor(n),
                        s = Math.ceil(n),
                        l = e[i],
                        h = e[s],
                        c = n - i;
                    return (
                        (r[0] = a(u(l[0], h[0], c))),
                        (r[1] = a(u(l[1], h[1], c))),
                        (r[2] = a(u(l[2], h[2], c))),
                        (r[3] = o(u(l[3], h[3], c))),
                        r
                    );
                }
            }
            var x = m;
            function _(t, e, r) {
                if (e && e.length && t >= 0 && t <= 1) {
                    var n = t * (e.length - 1),
                        i = Math.floor(n),
                        s = Math.ceil(n),
                        l = g(e[i]),
                        h = g(e[s]),
                        c = n - i,
                        f = w(
                            [
                                a(u(l[0], h[0], c)),
                                a(u(l[1], h[1], c)),
                                a(u(l[2], h[2], c)),
                                o(u(l[3], h[3], c)),
                            ],
                            "rgba"
                        );
                    return r
                        ? { color: f, leftIndex: i, rightIndex: s, value: n }
                        : f;
                }
            }
            var b = _;
            function w(t, e) {
                if (t && t.length) {
                    var r = t[0] + "," + t[1] + "," + t[2];
                    return (
                        ("rgba" !== e && "hsva" !== e && "hsla" !== e) ||
                            (r += "," + t[3]),
                        e + "(" + r + ")"
                    );
                }
            }
            (e.parse = g),
                (e.lift = function(t, e) {
                    var r = g(t);
                    if (r) {
                        for (var n = 0; n < 3; n++)
                            (r[n] =
                                e < 0
                                    ? (r[n] * (1 - e)) | 0
                                    : ((255 - r[n]) * e + r[n]) | 0),
                                r[n] > 255
                                    ? (r[n] = 255)
                                    : t[n] < 0 && (r[n] = 0);
                        return w(r, 4 === r.length ? "rgba" : "rgb");
                    }
                }),
                (e.toHex = function(t) {
                    var e = g(t);
                    if (e)
                        return ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2])
                            .toString(16)
                            .slice(1);
                }),
                (e.fastLerp = m),
                (e.fastMapToColor = x),
                (e.lerp = _),
                (e.mapToColor = b),
                (e.modifyHSL = function(t, e, r, n) {
                    if ((t = g(t)))
                        return (
                            (t = (function(t) {
                                if (t) {
                                    var e,
                                        r,
                                        n = t[0] / 255,
                                        i = t[1] / 255,
                                        a = t[2] / 255,
                                        o = Math.min(n, i, a),
                                        s = Math.max(n, i, a),
                                        l = s - o,
                                        h = (s + o) / 2;
                                    if (0 === l) (e = 0), (r = 0);
                                    else {
                                        r =
                                            h < 0.5
                                                ? l / (s + o)
                                                : l / (2 - s - o);
                                        var u = ((s - n) / 6 + l / 2) / l,
                                            c = ((s - i) / 6 + l / 2) / l,
                                            f = ((s - a) / 6 + l / 2) / l;
                                        n === s
                                            ? (e = f - c)
                                            : i === s
                                            ? (e = 1 / 3 + u - f)
                                            : a === s && (e = 2 / 3 + c - u),
                                            e < 0 && (e += 1),
                                            e > 1 && (e -= 1);
                                    }
                                    var d = [360 * e, r, h];
                                    return null != t[3] && d.push(t[3]), d;
                                }
                            })(t)),
                            null != e &&
                                (t[0] = ((i = e),
                                (i = Math.round(i)) < 0
                                    ? 0
                                    : i > 360
                                    ? 360
                                    : i)),
                            null != r && (t[1] = l(r)),
                            null != n && (t[2] = l(n)),
                            w(y(t), "rgba")
                        );
                    var i;
                }),
                (e.modifyAlpha = function(t, e) {
                    if ((t = g(t)) && null != e)
                        return (t[3] = o(e)), w(t, "rgba");
                }),
                (e.stringify = w);
        },
        function(t, e) {
            var r = function() {
                    (this.head = null), (this.tail = null), (this._len = 0);
                },
                n = r.prototype;
            (n.insert = function(t) {
                var e = new i(t);
                return this.insertEntry(e), e;
            }),
                (n.insertEntry = function(t) {
                    this.head
                        ? ((this.tail.next = t),
                          (t.prev = this.tail),
                          (t.next = null),
                          (this.tail = t))
                        : (this.head = this.tail = t),
                        this._len++;
                }),
                (n.remove = function(t) {
                    var e = t.prev,
                        r = t.next;
                    e ? (e.next = r) : (this.head = r),
                        r ? (r.prev = e) : (this.tail = e),
                        (t.next = t.prev = null),
                        this._len--;
                }),
                (n.len = function() {
                    return this._len;
                }),
                (n.clear = function() {
                    (this.head = this.tail = null), (this._len = 0);
                });
            var i = function(t) {
                    (this.value = t), this.next, this.prev;
                },
                a = function(t) {
                    (this._list = new r()),
                        (this._map = {}),
                        (this._maxSize = t || 10),
                        (this._lastRemovedEntry = null);
                },
                o = a.prototype;
            (o.put = function(t, e) {
                var r = this._list,
                    n = this._map,
                    a = null;
                if (null == n[t]) {
                    var o = r.len(),
                        s = this._lastRemovedEntry;
                    if (o >= this._maxSize && o > 0) {
                        var l = r.head;
                        r.remove(l),
                            delete n[l.key],
                            (a = l.value),
                            (this._lastRemovedEntry = l);
                    }
                    s ? (s.value = e) : (s = new i(e)),
                        (s.key = t),
                        r.insertEntry(s),
                        (n[t] = s);
                }
                return a;
            }),
                (o.get = function(t) {
                    var e = this._map[t],
                        r = this._list;
                    if (null != e)
                        return (
                            e !== r.tail && (r.remove(e), r.insertEntry(e)),
                            e.value
                        );
                }),
                (o.clear = function() {
                    this._list.clear(), (this._map = {});
                });
            var s = a;
            t.exports = s;
        },
        function(t, e) {
            var r = 1;
            "undefined" != typeof window &&
                (r = Math.max(window.devicePixelRatio || 1, 1));
            var n = r;
            (e.debugMode = 0), (e.devicePixelRatio = n);
        },
        function(t, e, r) {
            var n = r(0),
                i = n.retrieve2,
                a = n.retrieve3,
                o = n.each,
                s = n.normalizeCssArray,
                l = n.isString,
                h = n.isObject,
                u = r(11),
                c = r(25),
                f = r(12),
                d = r(18),
                p = r(7),
                v = p.ContextCachedBy,
                g = p.WILL_BE_RESTORED,
                y = u.DEFAULT_FONT,
                m = { left: 1, right: 1, center: 1 },
                x = { top: 1, bottom: 1, middle: 1 },
                _ = [
                    ["textShadowBlur", "shadowBlur", 0],
                    ["textShadowOffsetX", "shadowOffsetX", 0],
                    ["textShadowOffsetY", "shadowOffsetY", 0],
                    ["textShadowColor", "shadowColor", "transparent"],
                ],
                b = {},
                w = {};
            function S(t) {
                if (t) {
                    t.font = u.makeFont(t);
                    var e = t.textAlign;
                    "middle" === e && (e = "center"),
                        (t.textAlign = null == e || m[e] ? e : "left");
                    var r = t.textVerticalAlign || t.textBaseline;
                    "center" === r && (r = "middle"),
                        (t.textVerticalAlign = null == r || x[r] ? r : "top"),
                        t.textPadding && (t.textPadding = s(t.textPadding));
                }
            }
            function T(t, e, r, n, i) {
                if (r && e.textRotation) {
                    var a = e.textOrigin;
                    "center" === a
                        ? ((n = r.width / 2 + r.x), (i = r.height / 2 + r.y))
                        : a && ((n = a[0] + r.x), (i = a[1] + r.y)),
                        t.translate(n, i),
                        t.rotate(-e.textRotation),
                        t.translate(-n, -i);
                }
            }
            function P(t, e, r, n, o, s, l, h) {
                var u = n.rich[r.styleName] || {};
                u.text = r.text;
                var c = r.textVerticalAlign,
                    f = s + o / 2;
                "top" === c
                    ? (f = s + r.height / 2)
                    : "bottom" === c && (f = s + o - r.height / 2),
                    !r.isLineHolder &&
                        M(u) &&
                        O(
                            t,
                            e,
                            u,
                            "right" === h
                                ? l - r.width
                                : "center" === h
                                ? l - r.width / 2
                                : l,
                            f - r.height / 2,
                            r.width,
                            r.height
                        );
                var d = r.textPadding;
                d &&
                    ((l = R(l, h, d)),
                    (f -= r.height / 2 - d[2] - r.textHeight / 2)),
                    A(
                        e,
                        "shadowBlur",
                        a(u.textShadowBlur, n.textShadowBlur, 0)
                    ),
                    A(
                        e,
                        "shadowColor",
                        u.textShadowColor || n.textShadowColor || "transparent"
                    ),
                    A(
                        e,
                        "shadowOffsetX",
                        a(u.textShadowOffsetX, n.textShadowOffsetX, 0)
                    ),
                    A(
                        e,
                        "shadowOffsetY",
                        a(u.textShadowOffsetY, n.textShadowOffsetY, 0)
                    ),
                    A(e, "textAlign", h),
                    A(e, "textBaseline", "middle"),
                    A(e, "font", r.font || y);
                var p = D(u.textStroke || n.textStroke, g),
                    v = I(u.textFill || n.textFill),
                    g = i(u.textStrokeWidth, n.textStrokeWidth);
                p &&
                    (A(e, "lineWidth", g),
                    A(e, "strokeStyle", p),
                    e.strokeText(r.text, l, f)),
                    v && (A(e, "fillStyle", v), e.fillText(r.text, l, f));
            }
            function M(t) {
                return !!(
                    t.textBackgroundColor ||
                    (t.textBorderWidth && t.textBorderColor)
                );
            }
            function O(t, e, r, n, i, a, o) {
                var s = r.textBackgroundColor,
                    u = r.textBorderWidth,
                    d = r.textBorderColor,
                    p = l(s);
                if (
                    (A(e, "shadowBlur", r.textBoxShadowBlur || 0),
                    A(e, "shadowColor", r.textBoxShadowColor || "transparent"),
                    A(e, "shadowOffsetX", r.textBoxShadowOffsetX || 0),
                    A(e, "shadowOffsetY", r.textBoxShadowOffsetY || 0),
                    p || (u && d))
                ) {
                    e.beginPath();
                    var v = r.textBorderRadius;
                    v
                        ? c.buildPath(e, {
                              x: n,
                              y: i,
                              width: a,
                              height: o,
                              r: v,
                          })
                        : e.rect(n, i, a, o),
                        e.closePath();
                }
                if (p)
                    if ((A(e, "fillStyle", s), null != r.fillOpacity)) {
                        var g = e.globalAlpha;
                        (e.globalAlpha = r.fillOpacity * r.opacity),
                            e.fill(),
                            (e.globalAlpha = g);
                    } else e.fill();
                else if (h(s)) {
                    var y = s.image;
                    (y = f.createOrUpdateImage(y, null, t, k, s)) &&
                        f.isImageReady(y) &&
                        e.drawImage(y, n, i, a, o);
                }
                if (u && d)
                    if (
                        (A(e, "lineWidth", u),
                        A(e, "strokeStyle", d),
                        null != r.strokeOpacity)
                    ) {
                        g = e.globalAlpha;
                        (e.globalAlpha = r.strokeOpacity * r.opacity),
                            e.stroke(),
                            (e.globalAlpha = g);
                    } else e.stroke();
            }
            function k(t, e) {
                e.image = t;
            }
            function C(t, e, r, n) {
                var i = r.x || 0,
                    a = r.y || 0,
                    o = r.textAlign,
                    s = r.textVerticalAlign;
                if (n) {
                    var l = r.textPosition;
                    if (l instanceof Array)
                        (i = n.x + L(l[0], n.width)),
                            (a = n.y + L(l[1], n.height));
                    else {
                        var h =
                            e && e.calculateTextPosition
                                ? e.calculateTextPosition(b, r, n)
                                : u.calculateTextPosition(b, r, n);
                        (i = h.x),
                            (a = h.y),
                            (o = o || h.textAlign),
                            (s = s || h.textVerticalAlign);
                    }
                    var c = r.textOffset;
                    c && ((i += c[0]), (a += c[1]));
                }
                return (
                    ((t = t || {}).baseX = i),
                    (t.baseY = a),
                    (t.textAlign = o),
                    (t.textVerticalAlign = s),
                    t
                );
            }
            function A(t, e, r) {
                return (t[e] = d(t, e, r)), t[e];
            }
            function D(t, e) {
                return null == t ||
                    e <= 0 ||
                    "transparent" === t ||
                    "none" === t
                    ? null
                    : t.image || t.colorStops
                    ? "#000"
                    : t;
            }
            function I(t) {
                return null == t || "none" === t
                    ? null
                    : t.image || t.colorStops
                    ? "#000"
                    : t;
            }
            function L(t, e) {
                return "string" == typeof t
                    ? t.lastIndexOf("%") >= 0
                        ? (parseFloat(t) / 100) * e
                        : parseFloat(t)
                    : t;
            }
            function R(t, e, r) {
                return "right" === e
                    ? t - r[1]
                    : "center" === e
                    ? t + r[3] / 2 - r[1] / 2
                    : t + r[3];
            }
            (e.normalizeTextStyle = function(t) {
                return S(t), o(t.rich, S), t;
            }),
                (e.renderText = function(t, e, r, n, i, a) {
                    n.rich
                        ? (function(t, e, r, n, i, a) {
                              a !== g && (e.__attrCachedBy = v.NONE);
                              var o = t.__textCotentBlock;
                              (o && !t.__dirtyText) ||
                                  (o = t.__textCotentBlock = u.parseRichText(
                                      r,
                                      n
                                  ));
                              !(function(t, e, r, n, i) {
                                  var a = r.width,
                                      o = r.outerWidth,
                                      s = r.outerHeight,
                                      l = n.textPadding,
                                      h = C(w, t, n, i),
                                      c = h.baseX,
                                      f = h.baseY,
                                      d = h.textAlign,
                                      p = h.textVerticalAlign;
                                  T(e, n, i, c, f);
                                  var v = u.adjustTextX(c, o, d),
                                      g = u.adjustTextY(f, s, p),
                                      y = v,
                                      m = g;
                                  l && ((y += l[3]), (m += l[0]));
                                  var x = y + a;
                                  M(n) && O(t, e, n, v, g, o, s);
                                  for (var _ = 0; _ < r.lines.length; _++) {
                                      for (
                                          var b,
                                              S = r.lines[_],
                                              k = S.tokens,
                                              A = k.length,
                                              D = S.lineHeight,
                                              I = S.width,
                                              L = 0,
                                              R = y,
                                              B = x,
                                              F = A - 1;
                                          L < A &&
                                          (!(b = k[L]).textAlign ||
                                              "left" === b.textAlign);

                                      )
                                          P(t, e, b, n, D, m, R, "left"),
                                              (I -= b.width),
                                              (R += b.width),
                                              L++;
                                      for (
                                          ;
                                          F >= 0 &&
                                          "right" === (b = k[F]).textAlign;

                                      )
                                          P(t, e, b, n, D, m, B, "right"),
                                              (I -= b.width),
                                              (B -= b.width),
                                              F--;
                                      for (
                                          R += (a - (R - y) - (x - B) - I) / 2;
                                          L <= F;

                                      )
                                          (b = k[L]),
                                              P(
                                                  t,
                                                  e,
                                                  b,
                                                  n,
                                                  D,
                                                  m,
                                                  R + b.width / 2,
                                                  "center"
                                              ),
                                              (R += b.width),
                                              L++;
                                      m += D;
                                  }
                              })(t, e, o, n, i);
                          })(t, e, r, n, i, a)
                        : (function(t, e, r, n, i, a) {
                              "use strict";
                              var o,
                                  s = M(n),
                                  l = !1,
                                  h = e.__attrCachedBy === v.PLAIN_TEXT;
                              a !== g
                                  ? (a && ((o = a.style), (l = !s && h && o)),
                                    (e.__attrCachedBy = s
                                        ? v.NONE
                                        : v.PLAIN_TEXT))
                                  : h && (e.__attrCachedBy = v.NONE);
                              var c = n.font || y;
                              (l && c === (o.font || y)) || (e.font = c);
                              var f = t.__computedFont;
                              t.__styleFont !== c &&
                                  ((t.__styleFont = c),
                                  (f = t.__computedFont = e.font));
                              var p = n.textPadding,
                                  m = n.textLineHeight,
                                  x = t.__textCotentBlock;
                              (x && !t.__dirtyText) ||
                                  (x = t.__textCotentBlock = u.parsePlainText(
                                      r,
                                      f,
                                      p,
                                      m,
                                      n.truncate
                                  ));
                              var b = x.outerHeight,
                                  S = x.lines,
                                  P = x.lineHeight,
                                  k = C(w, t, n, i),
                                  A = k.baseX,
                                  L = k.baseY,
                                  B = k.textAlign || "left",
                                  F = k.textVerticalAlign;
                              T(e, n, i, A, L);
                              var E = u.adjustTextY(L, b, F),
                                  N = A,
                                  z = E;
                              if (s || p) {
                                  var W = u.getWidth(r, f);
                                  p && (W += p[1] + p[3]);
                                  var q = u.adjustTextX(A, W, B);
                                  s && O(t, e, n, q, E, W, b),
                                      p && ((N = R(A, B, p)), (z += p[0]));
                              }
                              (e.textAlign = B),
                                  (e.textBaseline = "middle"),
                                  (e.globalAlpha = n.opacity || 1);
                              for (var H = 0; H < _.length; H++) {
                                  var j = _[H],
                                      Y = j[0],
                                      U = j[1],
                                      V = n[Y];
                                  (l && V === o[Y]) ||
                                      (e[U] = d(e, U, V || j[2]));
                              }
                              z += P / 2;
                              var G = n.textStrokeWidth,
                                  X = l ? o.textStrokeWidth : null,
                                  Z = !l || G !== X,
                                  Q = !l || Z || n.textStroke !== o.textStroke,
                                  $ = D(n.textStroke, G),
                                  K = I(n.textFill);
                              $ &&
                                  (Z && (e.lineWidth = G),
                                  Q && (e.strokeStyle = $));
                              K &&
                                  ((l && n.textFill === o.textFill) ||
                                      (e.fillStyle = K));
                              if (1 === S.length)
                                  $ && e.strokeText(S[0], N, z),
                                      K && e.fillText(S[0], N, z);
                              else
                                  for (H = 0; H < S.length; H++)
                                      $ && e.strokeText(S[H], N, z),
                                          K && e.fillText(S[H], N, z),
                                          (z += P);
                          })(t, e, r, n, i, a);
                }),
                (e.getBoxPosition = C),
                (e.getStroke = D),
                (e.getFill = I),
                (e.parsePercent = L),
                (e.needDrawText = function(t, e) {
                    return (
                        null != t &&
                        (t ||
                            e.textBackgroundColor ||
                            (e.textBorderWidth && e.textBorderColor) ||
                            e.textPadding)
                    );
                });
        },
        function(t, e) {
            e.buildPath = function(t, e) {
                var r,
                    n,
                    i,
                    a,
                    o,
                    s = e.x,
                    l = e.y,
                    h = e.width,
                    u = e.height,
                    c = e.r;
                h < 0 && ((s += h), (h = -h)),
                    u < 0 && ((l += u), (u = -u)),
                    "number" == typeof c
                        ? (r = n = i = a = c)
                        : c instanceof Array
                        ? 1 === c.length
                            ? (r = n = i = a = c[0])
                            : 2 === c.length
                            ? ((r = i = c[0]), (n = a = c[1]))
                            : 3 === c.length
                            ? ((r = c[0]), (n = a = c[1]), (i = c[2]))
                            : ((r = c[0]), (n = c[1]), (i = c[2]), (a = c[3]))
                        : (r = n = i = a = 0),
                    r + n > h && ((r *= h / (o = r + n)), (n *= h / o)),
                    i + a > h && ((i *= h / (o = i + a)), (a *= h / o)),
                    n + i > u && ((n *= u / (o = n + i)), (i *= u / o)),
                    r + a > u && ((r *= u / (o = r + a)), (a *= u / o)),
                    t.moveTo(s + r, l),
                    t.lineTo(s + h - n, l),
                    0 !== n && t.arc(s + h - n, l + n, n, -Math.PI / 2, 0),
                    t.lineTo(s + h, l + u - i),
                    0 !== i && t.arc(s + h - i, l + u - i, i, 0, Math.PI / 2),
                    t.lineTo(s + a, l + u),
                    0 !== a && t.arc(s + a, l + u - a, a, Math.PI / 2, Math.PI),
                    t.lineTo(s, l + r),
                    0 !== r && t.arc(s + r, l + r, r, Math.PI, 1.5 * Math.PI);
            };
        },
        function(t, e) {
            var r = 2 * Math.PI;
            e.normalizeRadian = function(t) {
                return (t %= r) < 0 && (t += r), t;
            };
        },
        function(t, e, r) {
            var n = r(68),
                i = r(69);
            e.buildPath = function(t, e, r) {
                var a = e.points,
                    o = e.smooth;
                if (a && a.length >= 2) {
                    if (o && "spline" !== o) {
                        var s = i(a, o, r, e.smoothConstraint);
                        t.moveTo(a[0][0], a[0][1]);
                        for (
                            var l = a.length, h = 0;
                            h < (r ? l : l - 1);
                            h++
                        ) {
                            var u = s[2 * h],
                                c = s[2 * h + 1],
                                f = a[(h + 1) % l];
                            t.bezierCurveTo(u[0], u[1], c[0], c[1], f[0], f[1]);
                        }
                    } else {
                        "spline" === o && (a = n(a, r)),
                            t.moveTo(a[0][0], a[0][1]);
                        h = 1;
                        for (var d = a.length; h < d; h++)
                            t.lineTo(a[h][0], a[h][1]);
                    }
                    r && t.closePath();
                }
            };
        },
        function(t, e) {
            var r = function(t) {
                this.colorStops = t || [];
            };
            r.prototype = {
                constructor: r,
                addColorStop: function(t, e) {
                    this.colorStops.push({ offset: t, color: e });
                },
            };
            var n = r;
            t.exports = n;
        },
        function(t, e, r) {
            t.exports = r(30);
        },
        function(t, e, r) {
            var n = r(5);
            r(31), r(38), n.registerVisual(n.util.curry(r(80), "liquidFill"));
        },
        function(t, e, r) {
            var n = r(32),
                i = r(5);
            i.extendSeriesModel({
                type: "series.liquidFill",
                visualColorAccessPath: "textStyle.normal.color",
                optionUpdated: function() {
                    var t = this.option;
                    t.gridSize = Math.max(Math.floor(t.gridSize), 4);
                },
                getInitialData: function(t, e) {
                    var r = n(["value"], t.data),
                        a = new i.List(r, this);
                    return a.initData(t.data), a;
                },
                defaultOption: {
                    color: ["#294D99", "#156ACF", "#1598ED", "#45BDFF"],
                    center: ["50%", "50%"],
                    radius: "50%",
                    amplitude: "8%",
                    waveLength: "80%",
                    phase: "auto",
                    period: "auto",
                    direction: "right",
                    shape: "circle",
                    waveAnimation: !0,
                    animationEasing: "linear",
                    animationEasingUpdate: "linear",
                    animationDuration: 2e3,
                    animationDurationUpdate: 1e3,
                    outline: {
                        show: !0,
                        borderDistance: 8,
                        itemStyle: {
                            color: "none",
                            borderColor: "#294D99",
                            borderWidth: 8,
                            shadowBlur: 20,
                            shadowColor: "rgba(0, 0, 0, 0.25)",
                        },
                    },
                    backgroundStyle: { color: "#E3F7FF" },
                    itemStyle: {
                        opacity: 0.95,
                        shadowBlur: 50,
                        shadowColor: "rgba(0, 0, 0, 0.4)",
                    },
                    label: {
                        show: !0,
                        color: "#294D99",
                        insideColor: "#fff",
                        fontSize: 50,
                        fontWeight: "bold",
                        align: "center",
                        baseline: "middle",
                        position: "inside",
                    },
                    emphasis: { itemStyle: { opacity: 0.8 } },
                },
            });
        },
        function(t, e, r) {
            var n = r(0),
                i = n.createHashMap,
                a = n.each,
                o = n.isString,
                s = n.defaults,
                l = n.extend,
                h = n.isObject,
                u = n.clone,
                c = r(14).normalizeToArray,
                f = r(33),
                d = f.guessOrdinal,
                p = f.BE_ORDINAL,
                v = r(16),
                g = r(36).OTHER_DIMENSIONS,
                y = r(37);
            function m(t, e, r) {
                if (r || null != e.get(t)) {
                    for (var n = 0; null != e.get(t + n); ) n++;
                    t += n;
                }
                return e.set(t, !0), t;
            }
            var x = function(t, e, r) {
                v.isInstance(e) || (e = v.seriesDataToSource(e)),
                    (r = r || {}),
                    (t = (t || []).slice());
                for (
                    var n = (r.dimsDef || []).slice(),
                        f = i(),
                        x = i(),
                        _ = [],
                        b = (function(t, e, r, n) {
                            var i = Math.max(
                                t.dimensionsDetectCount || 1,
                                e.length,
                                r.length,
                                n || 0
                            );
                            return (
                                a(e, function(t) {
                                    var e = t.dimsDef;
                                    e && (i = Math.max(i, e.length));
                                }),
                                i
                            );
                        })(e, t, n, r.dimCount),
                        w = 0;
                    w < b;
                    w++
                ) {
                    var S = (n[w] = l({}, h(n[w]) ? n[w] : { name: n[w] })),
                        T = S.name,
                        P = (_[w] = new y());
                    null != T &&
                        null == f.get(T) &&
                        ((P.name = P.displayName = T), f.set(T, w)),
                        null != S.type && (P.type = S.type),
                        null != S.displayName &&
                            (P.displayName = S.displayName);
                }
                var M = r.encodeDef;
                !M && r.encodeDefaulter && (M = r.encodeDefaulter(e, b)),
                    (M = i(M)).each(function(t, e) {
                        if (
                            1 === (t = c(t).slice()).length &&
                            !o(t[0]) &&
                            t[0] < 0
                        )
                            M.set(e, !1);
                        else {
                            var r = M.set(e, []);
                            a(t, function(t, n) {
                                o(t) && (t = f.get(t)),
                                    null != t &&
                                        t < b &&
                                        ((r[n] = t), k(_[t], e, n));
                            });
                        }
                    });
                var O = 0;
                function k(t, e, r) {
                    null != g.get(e)
                        ? (t.otherDims[e] = r)
                        : ((t.coordDim = e),
                          (t.coordDimIndex = r),
                          x.set(e, !0));
                }
                a(t, function(t, e) {
                    var r, n, i;
                    if (o(t)) (r = t), (t = {});
                    else {
                        r = t.name;
                        var l = t.ordinalMeta;
                        (t.ordinalMeta = null),
                            ((t = u(t)).ordinalMeta = l),
                            (n = t.dimsDef),
                            (i = t.otherDims),
                            (t.name = t.coordDim = t.coordDimIndex = t.dimsDef = t.otherDims = null);
                    }
                    if (!1 !== (f = M.get(r))) {
                        var f;
                        if (!(f = c(f)).length)
                            for (var d = 0; d < ((n && n.length) || 1); d++) {
                                for (; O < _.length && null != _[O].coordDim; )
                                    O++;
                                O < _.length && f.push(O++);
                            }
                        a(f, function(e, a) {
                            var o = _[e];
                            if ((k(s(o, t), r, a), null == o.name && n)) {
                                var l = n[a];
                                !h(l) && (l = { name: l }),
                                    (o.name = o.displayName = l.name),
                                    (o.defaultTooltip = l.defaultTooltip);
                            }
                            i && s(o.otherDims, i);
                        });
                    }
                });
                var C = r.generateCoord,
                    A = r.generateCoordCount,
                    D = null != A;
                A = C ? A || 1 : 0;
                for (var I = C || "value", L = 0; L < b; L++) {
                    null == (P = _[L] = _[L] || new y()).coordDim &&
                        ((P.coordDim = m(I, x, D)),
                        (P.coordDimIndex = 0),
                        (!C || A <= 0) && (P.isExtraCoord = !0),
                        A--),
                        null == P.name && (P.name = m(P.coordDim, f)),
                        null != P.type ||
                            (d(e, L, P.name) !== p.Must &&
                                (!P.isExtraCoord ||
                                    (null == P.otherDims.itemName &&
                                        null == P.otherDims.seriesName))) ||
                            (P.type = "ordinal");
                }
                return _;
            };
            t.exports = x;
        },
        function(t, e, r) {
            r(9).__DEV__;
            var n = r(14),
                i = n.makeInner,
                a = n.getDataItemValue,
                o = r(0),
                s = o.createHashMap,
                l = o.each,
                h = o.map,
                u = o.isArray,
                c = o.isString,
                f = o.isObject,
                d = o.isTypedArray,
                p = o.isArrayLike,
                v = o.extend,
                g = (o.assert, r(16)),
                y = r(17),
                m = y.SOURCE_FORMAT_ORIGINAL,
                x = y.SOURCE_FORMAT_ARRAY_ROWS,
                _ = y.SOURCE_FORMAT_OBJECT_ROWS,
                b = y.SOURCE_FORMAT_KEYED_COLUMNS,
                w = y.SOURCE_FORMAT_UNKNOWN,
                S = y.SOURCE_FORMAT_TYPED_ARRAY,
                T = y.SERIES_LAYOUT_BY_ROW,
                P = { Must: 1, Might: 2, Not: 3 },
                M = i();
            function O(t) {
                if (t) {
                    var e = s();
                    return h(t, function(t, r) {
                        if (null == (t = v({}, f(t) ? t : { name: t })).name)
                            return t;
                        (t.name += ""),
                            null == t.displayName && (t.displayName = t.name);
                        var n = e.get(t.name);
                        return (
                            n
                                ? (t.name += "-" + n.count++)
                                : e.set(t.name, { count: 1 }),
                            t
                        );
                    });
                }
            }
            function k(t, e, r, n) {
                if ((null == n && (n = 1 / 0), e === T))
                    for (var i = 0; i < r.length && i < n; i++)
                        t(r[i] ? r[i][0] : null, i);
                else {
                    var a = r[0] || [];
                    for (i = 0; i < a.length && i < n; i++) t(a[i], i);
                }
            }
            function C(t) {
                var e = t.option;
                if (!e.data)
                    return t.ecModel.getComponent(
                        "dataset",
                        e.datasetIndex || 0
                    );
            }
            function A(t, e, r, n, i, o) {
                var s, l, h;
                if (d(t)) return P.Not;
                if (n) {
                    var p = n[o];
                    f(p) ? ((l = p.name), (h = p.type)) : c(p) && (l = p);
                }
                if (null != h) return "ordinal" === h ? P.Must : P.Not;
                if (e === x)
                    if (r === T) {
                        for (
                            var v = t[o], g = 0;
                            g < (v || []).length && g < 5;
                            g++
                        )
                            if (null != (s = M(v[i + g]))) return s;
                    } else
                        for (g = 0; g < t.length && g < 5; g++) {
                            var y = t[i + g];
                            if (y && null != (s = M(y[o]))) return s;
                        }
                else if (e === _) {
                    if (!l) return P.Not;
                    for (g = 0; g < t.length && g < 5; g++) {
                        if ((w = t[g]) && null != (s = M(w[l]))) return s;
                    }
                } else if (e === b) {
                    if (!l) return P.Not;
                    if (!(v = t[l]) || d(v)) return P.Not;
                    for (g = 0; g < v.length && g < 5; g++)
                        if (null != (s = M(v[g]))) return s;
                } else if (e === m)
                    for (g = 0; g < t.length && g < 5; g++) {
                        var w = t[g],
                            S = a(w);
                        if (!u(S)) return P.Not;
                        if (null != (s = M(S[o]))) return s;
                    }
                function M(t) {
                    var e = c(t);
                    return null != t && isFinite(t) && "" !== t
                        ? e
                            ? P.Might
                            : P.Not
                        : e && "-" !== t
                        ? P.Must
                        : void 0;
                }
                return P.Not;
            }
            (e.BE_ORDINAL = P),
                (e.detectSourceFormat = function(t) {
                    var e = t.option.source,
                        r = w;
                    if (d(e)) r = S;
                    else if (u(e)) {
                        0 === e.length && (r = x);
                        for (var n = 0, i = e.length; n < i; n++) {
                            var a = e[n];
                            if (null != a) {
                                if (u(a)) {
                                    r = x;
                                    break;
                                }
                                if (f(a)) {
                                    r = _;
                                    break;
                                }
                            }
                        }
                    } else if (f(e)) {
                        for (var o in e)
                            if (e.hasOwnProperty(o) && p(e[o])) {
                                r = b;
                                break;
                            }
                    } else if (null != e) throw new Error("Invalid data");
                    M(t).sourceFormat = r;
                }),
                (e.getSource = function(t) {
                    return M(t).source;
                }),
                (e.resetSourceDefaulter = function(t) {
                    M(t).datasetMap = s();
                }),
                (e.prepareSource = function(t) {
                    var e = t.option,
                        r = e.data,
                        n = d(r) ? S : m,
                        i = !1,
                        o = e.seriesLayoutBy,
                        s = e.sourceHeader,
                        h = e.dimensions,
                        f = C(t);
                    if (f) {
                        var p = f.option;
                        (r = p.source),
                            (n = M(f).sourceFormat),
                            (i = !0),
                            (o = o || p.seriesLayoutBy),
                            null == s && (s = p.sourceHeader),
                            (h = h || p.dimensions);
                    }
                    var v = (function(t, e, r, n, i) {
                        if (!t) return { dimensionsDefine: O(i) };
                        var o, s;
                        if (e === x)
                            "auto" === n || null == n
                                ? k(
                                      function(t) {
                                          null != t &&
                                              "-" !== t &&
                                              (c(t)
                                                  ? null == s && (s = 1)
                                                  : (s = 0));
                                      },
                                      r,
                                      t,
                                      10
                                  )
                                : (s = n ? 1 : 0),
                                i ||
                                    1 !== s ||
                                    ((i = []),
                                    k(
                                        function(t, e) {
                                            i[e] = null != t ? t : "";
                                        },
                                        r,
                                        t
                                    )),
                                (o = i
                                    ? i.length
                                    : r === T
                                    ? t.length
                                    : t[0]
                                    ? t[0].length
                                    : null);
                        else if (e === _)
                            i ||
                                (i = (function(t) {
                                    var e,
                                        r = 0;
                                    for (; r < t.length && !(e = t[r++]); );
                                    if (e) {
                                        var n = [];
                                        return (
                                            l(e, function(t, e) {
                                                n.push(e);
                                            }),
                                            n
                                        );
                                    }
                                })(t));
                        else if (e === b)
                            i ||
                                ((i = []),
                                l(t, function(t, e) {
                                    i.push(e);
                                }));
                        else if (e === m) {
                            var h = a(t[0]);
                            o = (u(h) && h.length) || 1;
                        }
                        return {
                            startIndex: s,
                            dimensionsDefine: O(i),
                            dimensionsDetectCount: o,
                        };
                    })(r, n, o, s, h);
                    M(t).source = new g({
                        data: r,
                        fromDataset: i,
                        seriesLayoutBy: o,
                        sourceFormat: n,
                        dimensionsDefine: v.dimensionsDefine,
                        startIndex: v.startIndex,
                        dimensionsDetectCount: v.dimensionsDetectCount,
                        encodeDefine: e.encode,
                    });
                }),
                (e.makeSeriesEncodeForAxisCoordSys = function(t, e, r) {
                    var n = {},
                        i = C(e);
                    if (!i || !t) return n;
                    var a,
                        o,
                        s = [],
                        h = [],
                        u = e.ecModel,
                        c = M(u).datasetMap,
                        d = i.uid + "_" + r.seriesLayoutBy;
                    (t = t.slice()),
                        l(t, function(e, r) {
                            !f(e) && (t[r] = { name: e }),
                                "ordinal" === e.type &&
                                    null == a &&
                                    ((a = r), (o = g(t[r]))),
                                (n[e.name] = []);
                        });
                    var p =
                        c.get(d) ||
                        c.set(d, { categoryWayDim: o, valueWayDim: 0 });
                    function v(t, e, r) {
                        for (var n = 0; n < r; n++) t.push(e + n);
                    }
                    function g(t) {
                        var e = t.dimsDef;
                        return e ? e.length : 1;
                    }
                    return (
                        l(t, function(t, e) {
                            var r = t.name,
                                i = g(t);
                            if (null == a) {
                                var o = p.valueWayDim;
                                v(n[r], o, i), v(h, o, i), (p.valueWayDim += i);
                            } else if (a === e) v(n[r], 0, i), v(s, 0, i);
                            else {
                                o = p.categoryWayDim;
                                v(n[r], o, i),
                                    v(h, o, i),
                                    (p.categoryWayDim += i);
                            }
                        }),
                        s.length && (n.itemName = s),
                        h.length && (n.seriesName = h),
                        n
                    );
                }),
                (e.makeSeriesEncodeForNameBased = function(t, e, r) {
                    var n = {};
                    if (!C(t)) return n;
                    var i,
                        a = e.sourceFormat,
                        o = e.dimensionsDefine;
                    (a !== _ && a !== b) ||
                        l(o, function(t, e) {
                            "name" === (f(t) ? t.name : t) && (i = e);
                        });
                    var s = (function() {
                        for (
                            var t = {},
                                n = {},
                                s = [],
                                l = 0,
                                h = Math.min(5, r);
                            l < h;
                            l++
                        ) {
                            var u = A(
                                e.data,
                                a,
                                e.seriesLayoutBy,
                                o,
                                e.startIndex,
                                l
                            );
                            s.push(u);
                            var c = u === P.Not;
                            if (
                                (c && null == t.v && l !== i && (t.v = l),
                                (null == t.n ||
                                    t.n === t.v ||
                                    (!c && s[t.n] === P.Not)) &&
                                    (t.n = l),
                                f(t) && s[t.n] !== P.Not)
                            )
                                return t;
                            c ||
                                (u === P.Might &&
                                    null == n.v &&
                                    l !== i &&
                                    (n.v = l),
                                (null != n.n && n.n !== n.v) || (n.n = l));
                        }
                        function f(t) {
                            return null != t.v && null != t.n;
                        }
                        return f(t) ? t : f(n) ? n : null;
                    })();
                    if (s) {
                        n.value = s.v;
                        var h = null != i ? i : s.n;
                        (n.itemName = [h]), (n.seriesName = [h]);
                    }
                    return n;
                }),
                (e.guessOrdinal = function(t, e) {
                    return A(
                        t.data,
                        t.sourceFormat,
                        t.seriesLayoutBy,
                        t.dimensionsDefine,
                        t.startIndex,
                        e
                    );
                });
        },
        function(t, e) {
            var r;
            r = (function() {
                return this;
            })();
            try {
                r = r || new Function("return this")();
            } catch (t) {
                "object" == typeof window && (r = window);
            }
            t.exports = r;
        },
        function(t, e, r) {
            r(9).__DEV__;
            var n = r(0),
                i = "___EC__COMPONENT__CONTAINER___";
            function a(t) {
                var e = { main: "", sub: "" };
                return (
                    t &&
                        ((t = t.split(".")),
                        (e.main = t[0] || ""),
                        (e.sub = t[1] || "")),
                    e
                );
            }
            var o = 0;
            function s(t, e) {
                var r = n.slice(arguments, 2);
                return this.superClass.prototype[e].apply(t, r);
            }
            function l(t, e, r) {
                return this.superClass.prototype[e].apply(t, r);
            }
            (e.parseClassType = a),
                (e.enableClassExtend = function(t, e) {
                    (t.$constructor = t),
                        (t.extend = function(t) {
                            var e = this,
                                r = function() {
                                    t.$constructor
                                        ? t.$constructor.apply(this, arguments)
                                        : e.apply(this, arguments);
                                };
                            return (
                                n.extend(r.prototype, t),
                                (r.extend = this.extend),
                                (r.superCall = s),
                                (r.superApply = l),
                                n.inherits(r, this),
                                (r.superClass = e),
                                r
                            );
                        });
                }),
                (e.enableClassCheck = function(t) {
                    var e = ["__\0is_clz", o++, Math.random().toFixed(3)].join(
                        "_"
                    );
                    (t.prototype[e] = !0),
                        (t.isInstance = function(t) {
                            return !(!t || !t[e]);
                        });
                }),
                (e.enableClassManagement = function(t, e) {
                    e = e || {};
                    var r = {};
                    if (
                        ((t.registerClass = function(t, e) {
                            if (e)
                                if (
                                    ((function(t) {
                                        n.assert(
                                            /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(
                                                t
                                            ),
                                            'componentType "' + t + '" illegal'
                                        );
                                    })(e),
                                    (e = a(e)).sub)
                                ) {
                                    if (e.sub !== i) {
                                        (function(t) {
                                            var e = r[t.main];
                                            (e && e[i]) ||
                                                ((e = r[t.main] = {})[i] = !0);
                                            return e;
                                        })(e)[e.sub] = t;
                                    }
                                } else r[e.main] = t;
                            return t;
                        }),
                        (t.getClass = function(t, e, n) {
                            var a = r[t];
                            if ((a && a[i] && (a = e ? a[e] : null), n && !a))
                                throw new Error(
                                    e
                                        ? "Component " +
                                          t +
                                          "." +
                                          (e || "") +
                                          " not exists. Load it first."
                                        : t + ".type should be specified."
                                );
                            return a;
                        }),
                        (t.getClassesByMainType = function(t) {
                            t = a(t);
                            var e = [],
                                o = r[t.main];
                            return (
                                o && o[i]
                                    ? n.each(o, function(t, r) {
                                          r !== i && e.push(t);
                                      })
                                    : e.push(o),
                                e
                            );
                        }),
                        (t.hasClass = function(t) {
                            return (t = a(t)), !!r[t.main];
                        }),
                        (t.getAllClassMainTypes = function() {
                            var t = [];
                            return (
                                n.each(r, function(e, r) {
                                    t.push(r);
                                }),
                                t
                            );
                        }),
                        (t.hasSubTypes = function(t) {
                            t = a(t);
                            var e = r[t.main];
                            return e && e[i];
                        }),
                        (t.parseClassType = a),
                        e.registerWhenExtend)
                    ) {
                        var o = t.extend;
                        o &&
                            (t.extend = function(e) {
                                var r = o.call(this, e);
                                return t.registerClass(r, e.type);
                            });
                    }
                    return t;
                }),
                (e.setReadOnly = function(t, e) {});
        },
        function(t, e, r) {
            var n = r(0),
                i = n.each,
                a = n.createHashMap,
                o = (n.assert,
                r(9).__DEV__,
                a(["tooltip", "label", "itemName", "itemId", "seriesName"]));
            function s(t, e) {
                return t.hasOwnProperty(e) || (t[e] = []), t[e];
            }
            (e.OTHER_DIMENSIONS = o),
                (e.summarizeDimensions = function(t) {
                    var e = {},
                        r = (e.encode = {}),
                        n = a(),
                        l = [],
                        h = [],
                        u = (e.userOutput = {
                            dimensionNames: t.dimensions.slice(),
                            encode: {},
                        });
                    i(t.dimensions, function(e) {
                        var i,
                            a = t.getDimensionInfo(e),
                            c = a.coordDim;
                        if (c) {
                            var f = a.coordDimIndex;
                            (s(r, c)[f] = e),
                                a.isExtraCoord ||
                                    (n.set(c, 1),
                                    "ordinal" !== (i = a.type) &&
                                        "time" !== i &&
                                        (l[0] = e),
                                    (s(u.encode, c)[f] = a.index)),
                                a.defaultTooltip && h.push(e);
                        }
                        o.each(function(t, e) {
                            var n = s(r, e),
                                i = a.otherDims[e];
                            null != i && !1 !== i && (n[i] = a.name);
                        });
                    });
                    var c = [],
                        f = {};
                    n.each(function(t, e) {
                        var n = r[e];
                        (f[e] = n[0]), (c = c.concat(n));
                    }),
                        (e.dataDimsOnCoord = c),
                        (e.encodeFirstDimNotExtra = f);
                    var d = r.label;
                    d && d.length && (l = d.slice());
                    var p = r.tooltip;
                    return (
                        p && p.length
                            ? (h = p.slice())
                            : h.length || (h = l.slice()),
                        (r.defaultedLabel = l),
                        (r.defaultedTooltip = h),
                        e
                    );
                }),
                (e.getDimensionTypeByAxis = function(t) {
                    return "category" === t
                        ? "ordinal"
                        : "time" === t
                        ? "time"
                        : "float";
                });
        },
        function(t, e, r) {
            var n = r(0);
            var i = function(t) {
                null != t && n.extend(this, t), (this.otherDims = {});
            };
            t.exports = i;
        },
        function(t, e, r) {
            var n = r(5),
                i = n.number,
                a = r(39),
                o = i.parsePercent,
                s = r(79);
            n.extendChartView({
                type: "liquidFill",
                render: function(t, e, r) {
                    var i = this.group;
                    i.removeAll();
                    var l = t.getData(),
                        h = l.getItemModel(0),
                        u = h.get("center"),
                        c = h.get("radius"),
                        f = r.getWidth(),
                        d = r.getHeight(),
                        p = Math.min(f, d),
                        v = 0,
                        g = 0,
                        y = t.get("outline.show");
                    y &&
                        ((v = t.get("outline.borderDistance")),
                        (g = o(t.get("outline.itemStyle.borderWidth"), p)));
                    var m,
                        x,
                        _,
                        b = o(u[0], f),
                        w = o(u[1], d),
                        S = !1,
                        T = t.get("shape");
                    ("container" === T
                        ? ((S = !0),
                          (x = [(m = [f / 2, d / 2])[0] - g / 2, m[1] - g / 2]),
                          (_ = [o(v, f), o(v, d)]),
                          (c = [
                              Math.max(x[0] - _[0], 0),
                              Math.max(x[1] - _[1], 0),
                          ]))
                        : ((x = (m = o(c, p) / 2) - g / 2),
                          (_ = o(v, p)),
                          (c = Math.max(x - _, 0))),
                    y) && ((D().style.lineWidth = g), i.add(D()));
                    var P = S ? 0 : b - c,
                        M = S ? 0 : w - c,
                        O = null;
                    i.add(
                        (function() {
                            var e = A(c);
                            e.setStyle(
                                t.getModel("backgroundStyle").getItemStyle()
                            ),
                                (e.style.fill = null),
                                (e.z2 = 5);
                            var r = A(c);
                            r.setStyle(
                                t.getModel("backgroundStyle").getItemStyle()
                            ),
                                (r.style.stroke = null);
                            var i = new n.graphic.Group();
                            return i.add(e), i.add(r), i;
                        })()
                    );
                    var k = this._data,
                        C = [];
                    function A(t, e) {
                        if (T) {
                            if (0 === T.indexOf("path://")) {
                                var r = n.graphic.makePath(T.slice(7), {}),
                                    i = r.getBoundingRect(),
                                    o = i.width,
                                    s = i.height;
                                o > s
                                    ? ((s *= (2 * t) / o), (o = 2 * t))
                                    : ((o *= (2 * t) / s), (s = 2 * t));
                                var l = e ? 0 : b - o / 2,
                                    h = e ? 0 : w - s / 2;
                                return (
                                    (r = n.graphic.makePath(
                                        T.slice(7),
                                        {},
                                        new n.graphic.BoundingRect(l, h, o, s)
                                    )),
                                    e && (r.position = [-o / 2, -s / 2]),
                                    r
                                );
                            }
                            if (S) {
                                var u = e ? -t[0] : b - t[0],
                                    c = e ? -t[1] : w - t[1];
                                return a.createSymbol(
                                    "rect",
                                    u,
                                    c,
                                    2 * t[0],
                                    2 * t[1]
                                );
                            }
                            (u = e ? -t : b - t), (c = e ? -t : w - t);
                            return (
                                "pin" === T
                                    ? (c += t)
                                    : "arrow" === T && (c -= t),
                                a.createSymbol(T, u, c, 2 * t, 2 * t)
                            );
                        }
                        return new n.graphic.Circle({
                            shape: { cx: e ? 0 : b, cy: e ? 0 : w, r: t },
                        });
                    }
                    function D() {
                        var e = A(m);
                        return (
                            (e.style.fill = null),
                            e.setStyle(
                                t.getModel("outline.itemStyle").getItemStyle()
                            ),
                            e
                        );
                    }
                    function I(e, r, i) {
                        var a = S ? c[0] : c,
                            h = S ? d / 2 : c,
                            u = l.getItemModel(e),
                            f = u.getModel("itemStyle"),
                            p = u.get("phase"),
                            v = o(u.get("amplitude"), 2 * h),
                            g = o(u.get("waveLength"), 2 * a),
                            y = h - l.get("value", e) * h * 2;
                        p = i
                            ? i.shape.phase
                            : "auto" === p
                            ? (e * Math.PI) / 4
                            : p;
                        var m = f.getItemStyle();
                        if (!m.fill) {
                            var x = t.get("color"),
                                _ = e % x.length;
                            m.fill = x[_];
                        }
                        var T = new s({
                            shape: {
                                waveLength: g,
                                radius: a,
                                radiusY: h,
                                cx: 2 * a,
                                cy: 0,
                                waterLevel: y,
                                amplitude: v,
                                phase: p,
                                inverse: r,
                            },
                            style: m,
                            position: [b, w],
                        });
                        T.shape._waterLevel = y;
                        var P = u.getModel("emphasis.itemStyle").getItemStyle();
                        (P.lineWidth = 0), n.graphic.setHoverStyle(T, P);
                        var M = A(c, !0);
                        return (
                            M.setStyle({ fill: "white" }), T.setClipPath(M), T
                        );
                    }
                    function L(t, e, r) {
                        var n = l.getItemModel(t),
                            i = n.get("period"),
                            a = n.get("direction"),
                            o = l.get("value", t),
                            s = n.get("phase");
                        s = r
                            ? r.shape.phase
                            : "auto" === s
                            ? (t * Math.PI) / 4
                            : s;
                        var h = 0;
                        h =
                            "auto" === i
                                ? (function(e) {
                                      var r = l.count();
                                      return 0 === r
                                          ? e
                                          : e * (0.2 + ((r - t) / r) * 0.8);
                                  })(5e3)
                                : "function" == typeof i
                                ? i(o, t)
                                : i;
                        var u = 0;
                        "right" === a || null == a
                            ? (u = Math.PI)
                            : "left" === a
                            ? (u = -Math.PI)
                            : "none" === a
                            ? (u = 0)
                            : console.error(
                                  "Illegal direction value for liquid fill."
                              ),
                            "none" !== a &&
                                n.get("waveAnimation") &&
                                e
                                    .animate("shape", !0)
                                    .when(0, { phase: s })
                                    .when(h / 2, { phase: u + s })
                                    .when(h, { phase: 2 * u + s })
                                    .during(function() {
                                        O && O.dirty(!0);
                                    })
                                    .start();
                    }
                    l
                        .diff(k)
                        .add(function(e) {
                            var r = I(e, !1),
                                a = r.shape.waterLevel;
                            (r.shape.waterLevel = S ? d / 2 : c),
                                n.graphic.initProps(
                                    r,
                                    { shape: { waterLevel: a } },
                                    t
                                ),
                                (r.z2 = 2),
                                L(e, r, null),
                                i.add(r),
                                l.setItemGraphicEl(e, r),
                                C.push(r);
                        })
                        .update(function(e, r) {
                            for (
                                var a = k.getItemGraphicEl(r),
                                    o = I(e, !1, a),
                                    s = {},
                                    h = [
                                        "amplitude",
                                        "cx",
                                        "cy",
                                        "phase",
                                        "radius",
                                        "radiusY",
                                        "waterLevel",
                                        "waveLength",
                                    ],
                                    u = 0;
                                u < h.length;
                                ++u
                            ) {
                                var c = h[u];
                                o.shape.hasOwnProperty(c) &&
                                    (s[c] = o.shape[c]);
                            }
                            var f = {},
                                p = [
                                    "fill",
                                    "opacity",
                                    "shadowBlur",
                                    "shadowColor",
                                ];
                            for (u = 0; u < p.length; ++u) {
                                c = p[u];
                                o.style.hasOwnProperty(c) &&
                                    (f[c] = o.style[c]);
                            }
                            S && (s.radiusY = d / 2),
                                n.graphic.updateProps(a, { shape: s }, t),
                                a.useStyle(f),
                                (a.position = o.position),
                                a.setClipPath(o.clipPath),
                                (a.shape.inverse = o.inverse),
                                L(e, a, a),
                                i.add(a),
                                l.setItemGraphicEl(e, a),
                                C.push(a);
                        })
                        .remove(function(t) {
                            var e = k.getItemGraphicEl(t);
                            i.remove(e);
                        })
                        .execute(),
                        h.get("label.show") &&
                            i.add(
                                (function(e) {
                                    var r = h.getModel("label");
                                    var i = {
                                            z2: 10,
                                            shape: {
                                                x: P,
                                                y: M,
                                                width: 2 * (S ? c[0] : c),
                                                height: 2 * (S ? c[1] : c),
                                            },
                                            style: {
                                                fill: "transparent",
                                                text: ((s = t.getFormattedLabel(
                                                    0,
                                                    "normal"
                                                )),
                                                (u = 100 * l.get("value", 0)),
                                                (f = l.getName(0) || t.name),
                                                isNaN(u) ||
                                                    (f = u.toFixed(0) + "%"),
                                                null == s ? f : s),
                                                textAlign: r.get("align"),
                                                textVerticalAlign: r.get(
                                                    "baseline"
                                                ),
                                            },
                                            silent: !0,
                                        },
                                        a = new n.graphic.Rect(i),
                                        o = r.get("color");
                                    var s, u, f;
                                    n.graphic.setText(a.style, r, o);
                                    var d = new n.graphic.Rect(i),
                                        p = r.get("insideColor");
                                    n.graphic.setText(d.style, r, p),
                                        (d.style.textFill = p);
                                    var v = new n.graphic.Group();
                                    v.add(a), v.add(d);
                                    var g = A(c, !0);
                                    return (
                                        (O = new n.graphic.CompoundPath({
                                            shape: { paths: e },
                                            position: [b, w],
                                        })).setClipPath(g),
                                        d.setClipPath(O),
                                        v
                                    );
                                })(C)
                            ),
                        (this._data = l);
                },
                dispose: function() {},
            });
        },
        function(t, e, r) {
            var n = r(0),
                i = r(40),
                a = r(3),
                o = r(11).calculateTextPosition,
                s = i.extendShape({
                    type: "triangle",
                    shape: { cx: 0, cy: 0, width: 0, height: 0 },
                    buildPath: function(t, e) {
                        var r = e.cx,
                            n = e.cy,
                            i = e.width / 2,
                            a = e.height / 2;
                        t.moveTo(r, n - a),
                            t.lineTo(r + i, n + a),
                            t.lineTo(r - i, n + a),
                            t.closePath();
                    },
                }),
                l = i.extendShape({
                    type: "diamond",
                    shape: { cx: 0, cy: 0, width: 0, height: 0 },
                    buildPath: function(t, e) {
                        var r = e.cx,
                            n = e.cy,
                            i = e.width / 2,
                            a = e.height / 2;
                        t.moveTo(r, n - a),
                            t.lineTo(r + i, n),
                            t.lineTo(r, n + a),
                            t.lineTo(r - i, n),
                            t.closePath();
                    },
                }),
                h = i.extendShape({
                    type: "pin",
                    shape: { x: 0, y: 0, width: 0, height: 0 },
                    buildPath: function(t, e) {
                        var r = e.x,
                            n = e.y,
                            i = (e.width / 5) * 3,
                            a = Math.max(i, e.height),
                            o = i / 2,
                            s = (o * o) / (a - o),
                            l = n - a + o + s,
                            h = Math.asin(s / o),
                            u = Math.cos(h) * o,
                            c = Math.sin(h),
                            f = Math.cos(h),
                            d = 0.6 * o,
                            p = 0.7 * o;
                        t.moveTo(r - u, l + s),
                            t.arc(r, l, o, Math.PI - h, 2 * Math.PI + h),
                            t.bezierCurveTo(
                                r + u - c * d,
                                l + s + f * d,
                                r,
                                n - p,
                                r,
                                n
                            ),
                            t.bezierCurveTo(
                                r,
                                n - p,
                                r - u + c * d,
                                l + s + f * d,
                                r - u,
                                l + s
                            ),
                            t.closePath();
                    },
                }),
                u = i.extendShape({
                    type: "arrow",
                    shape: { x: 0, y: 0, width: 0, height: 0 },
                    buildPath: function(t, e) {
                        var r = e.height,
                            n = e.width,
                            i = e.x,
                            a = e.y,
                            o = (n / 3) * 2;
                        t.moveTo(i, a),
                            t.lineTo(i + o, a + r),
                            t.lineTo(i, a + (r / 4) * 3),
                            t.lineTo(i - o, a + r),
                            t.lineTo(i, a),
                            t.closePath();
                    },
                }),
                c = {
                    line: i.Line,
                    rect: i.Rect,
                    roundRect: i.Rect,
                    square: i.Rect,
                    circle: i.Circle,
                    diamond: l,
                    pin: h,
                    arrow: u,
                    triangle: s,
                },
                f = {
                    line: function(t, e, r, n, i) {
                        (i.x1 = t),
                            (i.y1 = e + n / 2),
                            (i.x2 = t + r),
                            (i.y2 = e + n / 2);
                    },
                    rect: function(t, e, r, n, i) {
                        (i.x = t), (i.y = e), (i.width = r), (i.height = n);
                    },
                    roundRect: function(t, e, r, n, i) {
                        (i.x = t),
                            (i.y = e),
                            (i.width = r),
                            (i.height = n),
                            (i.r = Math.min(r, n) / 4);
                    },
                    square: function(t, e, r, n, i) {
                        var a = Math.min(r, n);
                        (i.x = t), (i.y = e), (i.width = a), (i.height = a);
                    },
                    circle: function(t, e, r, n, i) {
                        (i.cx = t + r / 2),
                            (i.cy = e + n / 2),
                            (i.r = Math.min(r, n) / 2);
                    },
                    diamond: function(t, e, r, n, i) {
                        (i.cx = t + r / 2),
                            (i.cy = e + n / 2),
                            (i.width = r),
                            (i.height = n);
                    },
                    pin: function(t, e, r, n, i) {
                        (i.x = t + r / 2),
                            (i.y = e + n / 2),
                            (i.width = r),
                            (i.height = n);
                    },
                    arrow: function(t, e, r, n, i) {
                        (i.x = t + r / 2),
                            (i.y = e + n / 2),
                            (i.width = r),
                            (i.height = n);
                    },
                    triangle: function(t, e, r, n, i) {
                        (i.cx = t + r / 2),
                            (i.cy = e + n / 2),
                            (i.width = r),
                            (i.height = n);
                    },
                },
                d = {};
            n.each(c, function(t, e) {
                d[e] = new t();
            });
            var p = i.extendShape({
                type: "symbol",
                shape: { symbolType: "", x: 0, y: 0, width: 0, height: 0 },
                calculateTextPosition: function(t, e, r) {
                    var n = o(t, e, r),
                        i = this.shape;
                    return (
                        i &&
                            "pin" === i.symbolType &&
                            "inside" === e.textPosition &&
                            (n.y = r.y + 0.4 * r.height),
                        n
                    );
                },
                buildPath: function(t, e, r) {
                    var n = e.symbolType;
                    if ("none" !== n) {
                        var i = d[n];
                        i || (i = d[(n = "rect")]),
                            f[n](e.x, e.y, e.width, e.height, i.shape),
                            i.buildPath(t, i.shape, r);
                    }
                },
            });
            function v(t, e) {
                if ("image" !== this.type) {
                    var r = this.style,
                        n = this.shape;
                    n && "line" === n.symbolType
                        ? (r.stroke = t)
                        : this.__isEmptyBrush
                        ? ((r.stroke = t), (r.fill = e || "#fff"))
                        : (r.fill && (r.fill = t), r.stroke && (r.stroke = t)),
                        this.dirty(!1);
                }
            }
            e.createSymbol = function(t, e, r, n, o, s, l) {
                var h,
                    u = 0 === t.indexOf("empty");
                return (
                    u && (t = t.substr(5, 1).toLowerCase() + t.substr(6)),
                    ((h =
                        0 === t.indexOf("image://")
                            ? i.makeImage(
                                  t.slice(8),
                                  new a(e, r, n, o),
                                  l ? "center" : "cover"
                              )
                            : 0 === t.indexOf("path://")
                            ? i.makePath(
                                  t.slice(7),
                                  {},
                                  new a(e, r, n, o),
                                  l ? "center" : "cover"
                              )
                            : new p({
                                  shape: {
                                      symbolType: t,
                                      x: e,
                                      y: r,
                                      width: n,
                                      height: o,
                                  },
                              })).__isEmptyBrush = u),
                    (h.setColor = v),
                    h.setColor(s),
                    h
                );
            };
        },
        function(t, e, r) {
            var n = r(0),
                i = r(41),
                a = r(21),
                o = r(10),
                s = r(2),
                l = r(1),
                h = r(20),
                u = r(60);
            e.Image = u;
            var c = r(61);
            e.Group = c;
            var f = r(62);
            e.Text = f;
            var d = r(63);
            e.Circle = d;
            var p = r(64);
            e.Sector = p;
            var v = r(66);
            e.Ring = v;
            var g = r(67);
            e.Polygon = g;
            var y = r(70);
            e.Polyline = y;
            var m = r(71);
            e.Rect = m;
            var x = r(72);
            e.Line = x;
            var _ = r(73);
            e.BezierCurve = _;
            var b = r(74);
            e.Arc = b;
            var w = r(75);
            e.CompoundPath = w;
            var S = r(76);
            e.LinearGradient = S;
            var T = r(77);
            e.RadialGradient = T;
            var P = r(3);
            e.BoundingRect = P;
            var M = r(78);
            e.IncrementalDisplayable = M;
            var O = r(13),
                k = Math.max,
                C = Math.min,
                A = {},
                D = 1,
                I = {},
                L = {};
            function R(t, e) {
                L[t] = e;
            }
            function B(t, e, r, n) {
                var a = i.createFromString(t, e);
                return (
                    r &&
                        ("center" === n && (r = F(r, a.getBoundingRect())),
                        N(a, r)),
                    a
                );
            }
            function F(t, e) {
                var r,
                    n = e.width / e.height,
                    i = t.height * n;
                return (
                    (r = i <= t.width ? t.height : (i = t.width) / n),
                    {
                        x: t.x + t.width / 2 - i / 2,
                        y: t.y + t.height / 2 - r / 2,
                        width: i,
                        height: r,
                    }
                );
            }
            var E = i.mergePath;
            function N(t, e) {
                if (t.applyTransform) {
                    var r = t.getBoundingRect().calculateTransform(e);
                    t.applyTransform(r);
                }
            }
            var z = O.subPixelOptimize;
            function W(t) {
                return null != t && "none" !== t;
            }
            var q = n.createHashMap(),
                H = 0;
            function j(t) {
                var e = t.__hoverStl;
                if (e && !t.__highlighted) {
                    var r = t.__zr,
                        n = t.useHoverLayer && r && "canvas" === r.painter.type;
                    if (
                        ((t.__highlighted = n ? "layer" : "plain"),
                        !(t.isGroup || (!r && t.useHoverLayer)))
                    ) {
                        var i = t,
                            a = t.style;
                        n && (a = (i = r.addHover(t)).style),
                            at(a),
                            n ||
                                (function(t) {
                                    if (t.__hoverStlDirty) {
                                        t.__hoverStlDirty = !1;
                                        var e = t.__hoverStl;
                                        if (e) {
                                            var r = (t.__cachedNormalStl = {});
                                            t.__cachedNormalZ2 = t.z2;
                                            var n = t.style;
                                            for (var i in e)
                                                null != e[i] && (r[i] = n[i]);
                                            (r.fill = n.fill),
                                                (r.stroke = n.stroke);
                                        } else
                                            t.__cachedNormalStl = t.__cachedNormalZ2 = null;
                                    }
                                })(i),
                            a.extendFrom(e),
                            Y(a, e, "fill"),
                            Y(a, e, "stroke"),
                            it(a),
                            n || (t.dirty(!1), (t.z2 += 1));
                    }
                }
            }
            function Y(t, e, r) {
                !W(e[r]) &&
                    W(t[r]) &&
                    (t[r] = (function(t) {
                        if ("string" != typeof t) return t;
                        var e = q.get(t);
                        return (
                            e ||
                                ((e = a.lift(t, -0.1)),
                                H < 1e4 && (q.set(t, e), H++)),
                            e
                        );
                    })(t[r]));
            }
            function U(t) {
                var e = t.__highlighted;
                if (e && ((t.__highlighted = !1), !t.isGroup))
                    if ("layer" === e) t.__zr && t.__zr.removeHover(t);
                    else {
                        var r = t.style,
                            n = t.__cachedNormalStl;
                        n && (at(r), t.setStyle(n), it(r));
                        var i = t.__cachedNormalZ2;
                        null != i && t.z2 - i == 1 && (t.z2 = i);
                    }
            }
            function V(t, e, r) {
                var n,
                    i = "normal",
                    a = "normal";
                t.__highlighted && ((i = "emphasis"), (n = !0)),
                    e(t, r),
                    t.__highlighted && ((a = "emphasis"), (n = !0)),
                    t.isGroup &&
                        t.traverse(function(t) {
                            !t.isGroup && e(t, r);
                        }),
                    n && t.__highDownOnUpdate && t.__highDownOnUpdate(i, a);
            }
            function G(t, e) {
                (e = t.__hoverStl = !1 !== e && (t.hoverStyle || e || {})),
                    (t.__hoverStlDirty = !0),
                    t.__highlighted &&
                        ((t.__cachedNormalStl = null), U(t), j(t));
            }
            function X(t) {
                !K(this, t) && !this.__highByOuter && V(this, j);
            }
            function Z(t) {
                !K(this, t) && !this.__highByOuter && V(this, U);
            }
            function Q(t) {
                (this.__highByOuter |= 1 << (t || 0)), V(this, j);
            }
            function $(t) {
                !(this.__highByOuter &= ~(1 << (t || 0))) && V(this, U);
            }
            function K(t, e) {
                return t.__highDownSilentOnTouch && e.zrByTouch;
            }
            function J(t, e) {
                var r = !1 === e;
                if (
                    ((t.__highDownSilentOnTouch = t.highDownSilentOnTouch),
                    (t.__highDownOnUpdate = t.highDownOnUpdate),
                    !r || t.__highDownDispatcher)
                ) {
                    var n = r ? "off" : "on";
                    t[n]("mouseover", X)[n]("mouseout", Z),
                        t[n]("emphasis", Q)[n]("normal", $),
                        (t.__highByOuter = t.__highByOuter || 0),
                        (t.__highDownDispatcher = !r);
                }
            }
            function tt(t, e, r, i, a) {
                return et(t, e, i, a), r && n.extend(t, r), t;
            }
            function et(t, e, r, i) {
                if ((r = r || A).isRectText) {
                    var a;
                    r.getTextPosition
                        ? (a = r.getTextPosition(e, i))
                        : "outside" ===
                              (a =
                                  e.getShallow("position") ||
                                  (i ? null : "inside")) && (a = "top"),
                        (t.textPosition = a),
                        (t.textOffset = e.getShallow("offset"));
                    var o = e.getShallow("rotate");
                    null != o && (o *= Math.PI / 180),
                        (t.textRotation = o),
                        (t.textDistance = n.retrieve2(
                            e.getShallow("distance"),
                            i ? null : 5
                        ));
                }
                var s,
                    l = e.ecModel,
                    h = l && l.option.textStyle,
                    u = (function(t) {
                        var e;
                        for (; t && t !== t.ecModel; ) {
                            var r = (t.option || A).rich;
                            if (r)
                                for (var n in ((e = e || {}), r))
                                    r.hasOwnProperty(n) && (e[n] = 1);
                            t = t.parentModel;
                        }
                        return e;
                    })(e);
                if (u)
                    for (var c in ((s = {}), u))
                        if (u.hasOwnProperty(c)) {
                            var f = e.getModel(["rich", c]);
                            rt((s[c] = {}), f, h, r, i);
                        }
                return (
                    (t.rich = s),
                    rt(t, e, h, r, i, !0),
                    r.forceRich && !r.textStyle && (r.textStyle = {}),
                    t
                );
            }
            function rt(t, e, r, i, a, o) {
                (r = (!a && r) || A),
                    (t.textFill = nt(e.getShallow("color"), i) || r.color),
                    (t.textStroke =
                        nt(e.getShallow("textBorderColor"), i) ||
                        r.textBorderColor),
                    (t.textStrokeWidth = n.retrieve2(
                        e.getShallow("textBorderWidth"),
                        r.textBorderWidth
                    )),
                    a ||
                        (o && ((t.insideRollbackOpt = i), it(t)),
                        null == t.textFill && (t.textFill = i.autoColor)),
                    (t.fontStyle = e.getShallow("fontStyle") || r.fontStyle),
                    (t.fontWeight = e.getShallow("fontWeight") || r.fontWeight),
                    (t.fontSize = e.getShallow("fontSize") || r.fontSize),
                    (t.fontFamily = e.getShallow("fontFamily") || r.fontFamily),
                    (t.textAlign = e.getShallow("align")),
                    (t.textVerticalAlign =
                        e.getShallow("verticalAlign") ||
                        e.getShallow("baseline")),
                    (t.textLineHeight = e.getShallow("lineHeight")),
                    (t.textWidth = e.getShallow("width")),
                    (t.textHeight = e.getShallow("height")),
                    (t.textTag = e.getShallow("tag")),
                    (o && i.disableBox) ||
                        ((t.textBackgroundColor = nt(
                            e.getShallow("backgroundColor"),
                            i
                        )),
                        (t.textPadding = e.getShallow("padding")),
                        (t.textBorderColor = nt(
                            e.getShallow("borderColor"),
                            i
                        )),
                        (t.textBorderWidth = e.getShallow("borderWidth")),
                        (t.textBorderRadius = e.getShallow("borderRadius")),
                        (t.textBoxShadowColor = e.getShallow("shadowColor")),
                        (t.textBoxShadowBlur = e.getShallow("shadowBlur")),
                        (t.textBoxShadowOffsetX = e.getShallow(
                            "shadowOffsetX"
                        )),
                        (t.textBoxShadowOffsetY = e.getShallow(
                            "shadowOffsetY"
                        ))),
                    (t.textShadowColor =
                        e.getShallow("textShadowColor") || r.textShadowColor),
                    (t.textShadowBlur =
                        e.getShallow("textShadowBlur") || r.textShadowBlur),
                    (t.textShadowOffsetX =
                        e.getShallow("textShadowOffsetX") ||
                        r.textShadowOffsetX),
                    (t.textShadowOffsetY =
                        e.getShallow("textShadowOffsetY") ||
                        r.textShadowOffsetY);
            }
            function nt(t, e) {
                return "auto" !== t ? t : e && e.autoColor ? e.autoColor : null;
            }
            function it(t) {
                var e,
                    r = t.textPosition,
                    n = t.insideRollbackOpt;
                if (n && null == t.textFill) {
                    var i = n.autoColor,
                        a = n.isRectText,
                        o = n.useInsideStyle,
                        s =
                            !1 !== o &&
                            (!0 === o ||
                                (a &&
                                    r &&
                                    "string" == typeof r &&
                                    r.indexOf("inside") >= 0)),
                        l = !s && null != i;
                    (s || l) &&
                        (e = {
                            textFill: t.textFill,
                            textStroke: t.textStroke,
                            textStrokeWidth: t.textStrokeWidth,
                        }),
                        s &&
                            ((t.textFill = "#fff"),
                            null == t.textStroke &&
                                ((t.textStroke = i),
                                null == t.textStrokeWidth &&
                                    (t.textStrokeWidth = 2))),
                        l && (t.textFill = i);
                }
                t.insideRollback = e;
            }
            function at(t) {
                var e = t.insideRollback;
                e &&
                    ((t.textFill = e.textFill),
                    (t.textStroke = e.textStroke),
                    (t.textStrokeWidth = e.textStrokeWidth),
                    (t.insideRollback = null));
            }
            function ot(t, e, r, n, i, a) {
                if (
                    ("function" == typeof i && ((a = i), (i = null)),
                    n && n.isAnimationEnabled())
                ) {
                    var o = t ? "Update" : "",
                        s = n.getShallow("animationDuration" + o),
                        l = n.getShallow("animationEasing" + o),
                        h = n.getShallow("animationDelay" + o);
                    "function" == typeof h &&
                        (h = h(
                            i,
                            n.getAnimationDelayParams
                                ? n.getAnimationDelayParams(e, i)
                                : null
                        )),
                        "function" == typeof s && (s = s(i)),
                        s > 0
                            ? e.animateTo(r, s, h || 0, l, a, !!a)
                            : (e.stopAnimation(), e.attr(r), a && a());
                } else e.stopAnimation(), e.attr(r), a && a();
            }
            function st(t, e, r, n, i) {
                ot(!0, t, e, r, n, i);
            }
            function lt(t, e, r) {
                return (
                    e && !n.isArrayLike(e) && (e = h.getLocalTransform(e)),
                    r && (e = o.invert([], e)),
                    s.applyTransform([], t, e)
                );
            }
            function ht(t, e, r, n, i, a, o, s) {
                var l,
                    h = r - t,
                    u = n - e,
                    c = o - i,
                    f = s - a,
                    d = ut(c, f, h, u);
                if ((l = d) <= 1e-6 && l >= -1e-6) return !1;
                var p = t - i,
                    v = e - a,
                    g = ut(p, v, h, u) / d;
                if (g < 0 || g > 1) return !1;
                var y = ut(p, v, c, f) / d;
                return !(y < 0 || y > 1);
            }
            function ut(t, e, r, n) {
                return t * n - r * e;
            }
            R("circle", d),
                R("sector", p),
                R("ring", v),
                R("polygon", g),
                R("polyline", y),
                R("rect", m),
                R("line", x),
                R("bezierCurve", _),
                R("arc", b),
                (e.Z2_EMPHASIS_LIFT = 1),
                (e.CACHED_LABEL_STYLE_PROPERTIES = {
                    color: "textFill",
                    textBorderColor: "textStroke",
                    textBorderWidth: "textStrokeWidth",
                }),
                (e.extendShape = function(t) {
                    return l.extend(t);
                }),
                (e.extendPath = function(t, e) {
                    return i.extendFromString(t, e);
                }),
                (e.registerShape = R),
                (e.getShapeClass = function(t) {
                    if (L.hasOwnProperty(t)) return L[t];
                }),
                (e.makePath = B),
                (e.makeImage = function(t, e, r) {
                    var n = new u({
                        style: {
                            image: t,
                            x: e.x,
                            y: e.y,
                            width: e.width,
                            height: e.height,
                        },
                        onload: function(t) {
                            if ("center" === r) {
                                var i = { width: t.width, height: t.height };
                                n.setStyle(F(e, i));
                            }
                        },
                    });
                    return n;
                }),
                (e.mergePath = E),
                (e.resizePath = N),
                (e.subPixelOptimizeLine = function(t) {
                    return O.subPixelOptimizeLine(t.shape, t.shape, t.style), t;
                }),
                (e.subPixelOptimizeRect = function(t) {
                    return O.subPixelOptimizeRect(t.shape, t.shape, t.style), t;
                }),
                (e.subPixelOptimize = z),
                (e.setElementHoverStyle = G),
                (e.setHoverStyle = function(t, e) {
                    J(t, !0), V(t, G, e);
                }),
                (e.setAsHighDownDispatcher = J),
                (e.isHighDownDispatcher = function(t) {
                    return !(!t || !t.__highDownDispatcher);
                }),
                (e.getHighlightDigit = function(t) {
                    var e = I[t];
                    return null == e && D <= 32 && (e = I[t] = D++), e;
                }),
                (e.setLabelStyle = function(t, e, r, i, a, o, s) {
                    var l,
                        h = (a = a || A).labelFetcher,
                        u = a.labelDataIndex,
                        c = a.labelDimIndex,
                        f = a.labelProp,
                        d = r.getShallow("show"),
                        p = i.getShallow("show");
                    (d || p) &&
                        (h &&
                            (l = h.getFormattedLabel(u, "normal", null, c, f)),
                        null == l &&
                            (l = n.isFunction(a.defaultText)
                                ? a.defaultText(u, a)
                                : a.defaultText));
                    var v = d ? l : null,
                        g = p
                            ? n.retrieve2(
                                  h
                                      ? h.getFormattedLabel(
                                            u,
                                            "emphasis",
                                            null,
                                            c,
                                            f
                                        )
                                      : null,
                                  l
                              )
                            : null;
                    (null == v && null == g) ||
                        (tt(t, r, o, a), tt(e, i, s, a, !0)),
                        (t.text = v),
                        (e.text = g);
                }),
                (e.modifyLabelStyle = function(t, e, r) {
                    var i = t.style;
                    e && (at(i), t.setStyle(e), it(i)),
                        (i = t.__hoverStl),
                        r && i && (at(i), n.extend(i, r), it(i));
                }),
                (e.setTextStyle = tt),
                (e.setText = function(t, e, r) {
                    var n,
                        i = { isRectText: !0 };
                    !1 === r ? (n = !0) : (i.autoColor = r), et(t, e, i, n);
                }),
                (e.getFont = function(t, e) {
                    var r = e && e.getModel("textStyle");
                    return n.trim(
                        [
                            t.fontStyle ||
                                (r && r.getShallow("fontStyle")) ||
                                "",
                            t.fontWeight ||
                                (r && r.getShallow("fontWeight")) ||
                                "",
                            (t.fontSize ||
                                (r && r.getShallow("fontSize")) ||
                                12) + "px",
                            t.fontFamily ||
                                (r && r.getShallow("fontFamily")) ||
                                "sans-serif",
                        ].join(" ")
                    );
                }),
                (e.updateProps = st),
                (e.initProps = function(t, e, r, n, i) {
                    ot(!1, t, e, r, n, i);
                }),
                (e.getTransform = function(t, e) {
                    for (var r = o.identity([]); t && t !== e; )
                        o.mul(r, t.getLocalTransform(), r), (t = t.parent);
                    return r;
                }),
                (e.applyTransform = lt),
                (e.transformDirection = function(t, e, r) {
                    var n =
                            0 === e[4] || 0 === e[5] || 0 === e[0]
                                ? 1
                                : Math.abs((2 * e[4]) / e[0]),
                        i =
                            0 === e[4] || 0 === e[5] || 0 === e[2]
                                ? 1
                                : Math.abs((2 * e[4]) / e[2]),
                        a = [
                            "left" === t ? -n : "right" === t ? n : 0,
                            "top" === t ? -i : "bottom" === t ? i : 0,
                        ];
                    return (
                        (a = lt(a, e, r)),
                        Math.abs(a[0]) > Math.abs(a[1])
                            ? a[0] > 0
                                ? "right"
                                : "left"
                            : a[1] > 0
                            ? "bottom"
                            : "top"
                    );
                }),
                (e.groupTransition = function(t, e, r, i) {
                    if (t && e) {
                        var a,
                            o = ((a = {}),
                            t.traverse(function(t) {
                                !t.isGroup && t.anid && (a[t.anid] = t);
                            }),
                            a);
                        e.traverse(function(t) {
                            if (!t.isGroup && t.anid) {
                                var e = o[t.anid];
                                if (e) {
                                    var n = l(t);
                                    t.attr(l(e)), st(t, n, r, t.dataIndex);
                                }
                            }
                        });
                    }
                    function l(t) {
                        var e = {
                            position: s.clone(t.position),
                            rotation: t.rotation,
                        };
                        return t.shape && (e.shape = n.extend({}, t.shape)), e;
                    }
                }),
                (e.clipPointsByRect = function(t, e) {
                    return n.map(t, function(t) {
                        var r = t[0];
                        (r = k(r, e.x)), (r = C(r, e.x + e.width));
                        var n = t[1];
                        return (n = k(n, e.y)), [r, (n = C(n, e.y + e.height))];
                    });
                }),
                (e.clipRectByRect = function(t, e) {
                    var r = k(t.x, e.x),
                        n = C(t.x + t.width, e.x + e.width),
                        i = k(t.y, e.y),
                        a = C(t.y + t.height, e.y + e.height);
                    if (n >= r && a >= i)
                        return { x: r, y: i, width: n - r, height: a - i };
                }),
                (e.createIcon = function(t, e, r) {
                    var i = ((e = n.extend({ rectHover: !0 }, e)).style = {
                        strokeNoScale: !0,
                    });
                    if (((r = r || { x: -1, y: -1, width: 2, height: 2 }), t))
                        return 0 === t.indexOf("image://")
                            ? ((i.image = t.slice(8)),
                              n.defaults(i, r),
                              new u(e))
                            : B(t.replace("path://", ""), e, r, "center");
                }),
                (e.linePolygonIntersect = function(t, e, r, n, i) {
                    for (var a = 0, o = i[i.length - 1]; a < i.length; a++) {
                        var s = i[a];
                        if (ht(t, e, r, n, s[0], s[1], o[0], o[1])) return !0;
                        o = s;
                    }
                }),
                (e.lineLineIntersect = ht);
        },
        function(t, e, r) {
            var n = r(1),
                i = r(8),
                a = r(59),
                o = Math.sqrt,
                s = Math.sin,
                l = Math.cos,
                h = Math.PI,
                u = function(t) {
                    return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
                },
                c = function(t, e) {
                    return (t[0] * e[0] + t[1] * e[1]) / (u(t) * u(e));
                },
                f = function(t, e) {
                    return (
                        (t[0] * e[1] < t[1] * e[0] ? -1 : 1) *
                        Math.acos(c(t, e))
                    );
                };
            function d(t, e, r, n, i, a, u, d, p, v, g) {
                var y = p * (h / 180),
                    m = (l(y) * (t - r)) / 2 + (s(y) * (e - n)) / 2,
                    x = (-1 * s(y) * (t - r)) / 2 + (l(y) * (e - n)) / 2,
                    _ = (m * m) / (u * u) + (x * x) / (d * d);
                _ > 1 && ((u *= o(_)), (d *= o(_)));
                var b =
                        (i === a ? -1 : 1) *
                            o(
                                (u * u * (d * d) -
                                    u * u * (x * x) -
                                    d * d * (m * m)) /
                                    (u * u * (x * x) + d * d * (m * m))
                            ) || 0,
                    w = (b * u * x) / d,
                    S = (b * -d * m) / u,
                    T = (t + r) / 2 + l(y) * w - s(y) * S,
                    P = (e + n) / 2 + s(y) * w + l(y) * S,
                    M = f([1, 0], [(m - w) / u, (x - S) / d]),
                    O = [(m - w) / u, (x - S) / d],
                    k = [(-1 * m - w) / u, (-1 * x - S) / d],
                    C = f(O, k);
                c(O, k) <= -1 && (C = h),
                    c(O, k) >= 1 && (C = 0),
                    0 === a && C > 0 && (C -= 2 * h),
                    1 === a && C < 0 && (C += 2 * h),
                    g.addData(v, T, P, u, d, M, C, y, a);
            }
            var p = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi,
                v = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
            function g(t, e) {
                var r = (function(t) {
                    if (!t) return new i();
                    for (
                        var e,
                            r = 0,
                            n = 0,
                            a = r,
                            o = n,
                            s = new i(),
                            l = i.CMD,
                            h = t.match(p),
                            u = 0;
                        u < h.length;
                        u++
                    ) {
                        for (
                            var c,
                                f = h[u],
                                g = f.charAt(0),
                                y = f.match(v) || [],
                                m = y.length,
                                x = 0;
                            x < m;
                            x++
                        )
                            y[x] = parseFloat(y[x]);
                        for (var _ = 0; _ < m; ) {
                            var b,
                                w,
                                S,
                                T,
                                P,
                                M,
                                O,
                                k = r,
                                C = n;
                            switch (g) {
                                case "l":
                                    (r += y[_++]),
                                        (n += y[_++]),
                                        (c = l.L),
                                        s.addData(c, r, n);
                                    break;
                                case "L":
                                    (r = y[_++]),
                                        (n = y[_++]),
                                        (c = l.L),
                                        s.addData(c, r, n);
                                    break;
                                case "m":
                                    (r += y[_++]),
                                        (n += y[_++]),
                                        (c = l.M),
                                        s.addData(c, r, n),
                                        (a = r),
                                        (o = n),
                                        (g = "l");
                                    break;
                                case "M":
                                    (r = y[_++]),
                                        (n = y[_++]),
                                        (c = l.M),
                                        s.addData(c, r, n),
                                        (a = r),
                                        (o = n),
                                        (g = "L");
                                    break;
                                case "h":
                                    (r += y[_++]),
                                        (c = l.L),
                                        s.addData(c, r, n);
                                    break;
                                case "H":
                                    (r = y[_++]), (c = l.L), s.addData(c, r, n);
                                    break;
                                case "v":
                                    (n += y[_++]),
                                        (c = l.L),
                                        s.addData(c, r, n);
                                    break;
                                case "V":
                                    (n = y[_++]), (c = l.L), s.addData(c, r, n);
                                    break;
                                case "C":
                                    (c = l.C),
                                        s.addData(
                                            c,
                                            y[_++],
                                            y[_++],
                                            y[_++],
                                            y[_++],
                                            y[_++],
                                            y[_++]
                                        ),
                                        (r = y[_ - 2]),
                                        (n = y[_ - 1]);
                                    break;
                                case "c":
                                    (c = l.C),
                                        s.addData(
                                            c,
                                            y[_++] + r,
                                            y[_++] + n,
                                            y[_++] + r,
                                            y[_++] + n,
                                            y[_++] + r,
                                            y[_++] + n
                                        ),
                                        (r += y[_ - 2]),
                                        (n += y[_ - 1]);
                                    break;
                                case "S":
                                    (b = r), (w = n);
                                    var A = s.len(),
                                        D = s.data;
                                    e === l.C &&
                                        ((b += r - D[A - 4]),
                                        (w += n - D[A - 3])),
                                        (c = l.C),
                                        (k = y[_++]),
                                        (C = y[_++]),
                                        (r = y[_++]),
                                        (n = y[_++]),
                                        s.addData(c, b, w, k, C, r, n);
                                    break;
                                case "s":
                                    (b = r), (w = n);
                                    (A = s.len()), (D = s.data);
                                    e === l.C &&
                                        ((b += r - D[A - 4]),
                                        (w += n - D[A - 3])),
                                        (c = l.C),
                                        (k = r + y[_++]),
                                        (C = n + y[_++]),
                                        (r += y[_++]),
                                        (n += y[_++]),
                                        s.addData(c, b, w, k, C, r, n);
                                    break;
                                case "Q":
                                    (k = y[_++]),
                                        (C = y[_++]),
                                        (r = y[_++]),
                                        (n = y[_++]),
                                        (c = l.Q),
                                        s.addData(c, k, C, r, n);
                                    break;
                                case "q":
                                    (k = y[_++] + r),
                                        (C = y[_++] + n),
                                        (r += y[_++]),
                                        (n += y[_++]),
                                        (c = l.Q),
                                        s.addData(c, k, C, r, n);
                                    break;
                                case "T":
                                    (b = r), (w = n);
                                    (A = s.len()), (D = s.data);
                                    e === l.Q &&
                                        ((b += r - D[A - 4]),
                                        (w += n - D[A - 3])),
                                        (r = y[_++]),
                                        (n = y[_++]),
                                        (c = l.Q),
                                        s.addData(c, b, w, r, n);
                                    break;
                                case "t":
                                    (b = r), (w = n);
                                    (A = s.len()), (D = s.data);
                                    e === l.Q &&
                                        ((b += r - D[A - 4]),
                                        (w += n - D[A - 3])),
                                        (r += y[_++]),
                                        (n += y[_++]),
                                        (c = l.Q),
                                        s.addData(c, b, w, r, n);
                                    break;
                                case "A":
                                    (S = y[_++]),
                                        (T = y[_++]),
                                        (P = y[_++]),
                                        (M = y[_++]),
                                        (O = y[_++]),
                                        d(
                                            (k = r),
                                            (C = n),
                                            (r = y[_++]),
                                            (n = y[_++]),
                                            M,
                                            O,
                                            S,
                                            T,
                                            P,
                                            (c = l.A),
                                            s
                                        );
                                    break;
                                case "a":
                                    (S = y[_++]),
                                        (T = y[_++]),
                                        (P = y[_++]),
                                        (M = y[_++]),
                                        (O = y[_++]),
                                        d(
                                            (k = r),
                                            (C = n),
                                            (r += y[_++]),
                                            (n += y[_++]),
                                            M,
                                            O,
                                            S,
                                            T,
                                            P,
                                            (c = l.A),
                                            s
                                        );
                            }
                        }
                        ("z" !== g && "Z" !== g) ||
                            ((c = l.Z), s.addData(c), (r = a), (n = o)),
                            (e = c);
                    }
                    return s.toStatic(), s;
                })(t);
                return (
                    ((e = e || {}).buildPath = function(t) {
                        if (t.setData) {
                            t.setData(r.data),
                                (e = t.getContext()) && t.rebuildPath(e);
                        } else {
                            var e = t;
                            r.rebuildPath(e);
                        }
                    }),
                    (e.applyTransform = function(t) {
                        a(r, t), this.dirty(!0);
                    }),
                    e
                );
            }
            (e.createFromString = function(t, e) {
                return new n(g(t, e));
            }),
                (e.extendFromString = function(t, e) {
                    return n.extend(g(t, e));
                }),
                (e.mergePath = function(t, e) {
                    for (var r = [], i = t.length, a = 0; a < i; a++) {
                        var o = t[a];
                        o.path || o.createPathProxy(),
                            o.__dirtyPath && o.buildPath(o.path, o.shape, !0),
                            r.push(o.path);
                    }
                    var s = new n(e);
                    return (
                        s.createPathProxy(),
                        (s.buildPath = function(t) {
                            t.appendPath(r);
                            var e = t.getContext();
                            e && t.rebuildPath(e);
                        }),
                        s
                    );
                });
        },
        function(t, e, r) {
            var n = r(18),
                i = r(7).ContextCachedBy,
                a = [
                    ["shadowBlur", 0],
                    ["shadowOffsetX", 0],
                    ["shadowOffsetY", 0],
                    ["shadowColor", "#000"],
                    ["lineCap", "butt"],
                    ["lineJoin", "miter"],
                    ["miterLimit", 10],
                ],
                o = function(t) {
                    this.extendFrom(t, !1);
                };
            function s(t, e, r) {
                var n = null == e.x ? 0 : e.x,
                    i = null == e.x2 ? 1 : e.x2,
                    a = null == e.y ? 0 : e.y,
                    o = null == e.y2 ? 0 : e.y2;
                return (
                    e.global ||
                        ((n = n * r.width + r.x),
                        (i = i * r.width + r.x),
                        (a = a * r.height + r.y),
                        (o = o * r.height + r.y)),
                    (n = isNaN(n) ? 0 : n),
                    (i = isNaN(i) ? 1 : i),
                    (a = isNaN(a) ? 0 : a),
                    (o = isNaN(o) ? 0 : o),
                    t.createLinearGradient(n, a, i, o)
                );
            }
            function l(t, e, r) {
                var n = r.width,
                    i = r.height,
                    a = Math.min(n, i),
                    o = null == e.x ? 0.5 : e.x,
                    s = null == e.y ? 0.5 : e.y,
                    l = null == e.r ? 0.5 : e.r;
                return (
                    e.global ||
                        ((o = o * n + r.x), (s = s * i + r.y), (l *= a)),
                    t.createRadialGradient(o, s, 0, o, s, l)
                );
            }
            for (
                var h = (o.prototype = {
                        constructor: o,
                        fill: "#000",
                        stroke: null,
                        opacity: 1,
                        fillOpacity: null,
                        strokeOpacity: null,
                        lineDash: null,
                        lineDashOffset: 0,
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        lineWidth: 1,
                        strokeNoScale: !1,
                        text: null,
                        font: null,
                        textFont: null,
                        fontStyle: null,
                        fontWeight: null,
                        fontSize: null,
                        fontFamily: null,
                        textTag: null,
                        textFill: "#000",
                        textStroke: null,
                        textWidth: null,
                        textHeight: null,
                        textStrokeWidth: 0,
                        textLineHeight: null,
                        textPosition: "inside",
                        textRect: null,
                        textOffset: null,
                        textAlign: null,
                        textVerticalAlign: null,
                        textDistance: 5,
                        textShadowColor: "transparent",
                        textShadowBlur: 0,
                        textShadowOffsetX: 0,
                        textShadowOffsetY: 0,
                        textBoxShadowColor: "transparent",
                        textBoxShadowBlur: 0,
                        textBoxShadowOffsetX: 0,
                        textBoxShadowOffsetY: 0,
                        transformText: !1,
                        textRotation: 0,
                        textOrigin: null,
                        textBackgroundColor: null,
                        textBorderColor: null,
                        textBorderWidth: 0,
                        textBorderRadius: 0,
                        textPadding: null,
                        rich: null,
                        truncate: null,
                        blend: null,
                        bind: function(t, e, r) {
                            var o = r && r.style,
                                s = !o || t.__attrCachedBy !== i.STYLE_BIND;
                            t.__attrCachedBy = i.STYLE_BIND;
                            for (var l = 0; l < a.length; l++) {
                                var h = a[l],
                                    u = h[0];
                                (s || this[u] !== o[u]) &&
                                    (t[u] = n(t, u, this[u] || h[1]));
                            }
                            if (
                                ((s || this.fill !== o.fill) &&
                                    (t.fillStyle = this.fill),
                                (s || this.stroke !== o.stroke) &&
                                    (t.strokeStyle = this.stroke),
                                (s || this.opacity !== o.opacity) &&
                                    (t.globalAlpha =
                                        null == this.opacity
                                            ? 1
                                            : this.opacity),
                                (s || this.blend !== o.blend) &&
                                    (t.globalCompositeOperation =
                                        this.blend || "source-over"),
                                this.hasStroke())
                            ) {
                                var c = this.lineWidth;
                                t.lineWidth =
                                    c /
                                    (this.strokeNoScale && e && e.getLineScale
                                        ? e.getLineScale()
                                        : 1);
                            }
                        },
                        hasFill: function() {
                            var t = this.fill;
                            return null != t && "none" !== t;
                        },
                        hasStroke: function() {
                            var t = this.stroke;
                            return (
                                null != t && "none" !== t && this.lineWidth > 0
                            );
                        },
                        extendFrom: function(t, e) {
                            if (t)
                                for (var r in t)
                                    !t.hasOwnProperty(r) ||
                                        (!0 !== e &&
                                            (!1 === e
                                                ? this.hasOwnProperty(r)
                                                : null == t[r])) ||
                                        (this[r] = t[r]);
                        },
                        set: function(t, e) {
                            "string" == typeof t
                                ? (this[t] = e)
                                : this.extendFrom(t, !0);
                        },
                        clone: function() {
                            var t = new this.constructor();
                            return t.extendFrom(this, !0), t;
                        },
                        getGradient: function(t, e, r) {
                            for (
                                var n = ("radial" === e.type ? l : s)(t, e, r),
                                    i = e.colorStops,
                                    a = 0;
                                a < i.length;
                                a++
                            )
                                n.addColorStop(i[a].offset, i[a].color);
                            return n;
                        },
                    }),
                    u = 0;
                u < a.length;
                u++
            ) {
                var c = a[u];
                c[0] in h || (h[c[0]] = c[1]);
            }
            o.getGradient = h.getGradient;
            var f = o;
            t.exports = f;
        },
        function(t, e) {
            var r = 2311;
            t.exports = function() {
                return r++;
            };
        },
        function(t, e) {
            var r = Array.prototype.slice,
                n = function(t) {
                    (this._$handlers = {}), (this._$eventProcessor = t);
                };
            function i(t, e, r, n, i, a) {
                var o = t._$handlers;
                if (
                    ("function" == typeof r && ((i = n), (n = r), (r = null)),
                    !n || !e)
                )
                    return t;
                (r = (function(t, e) {
                    var r = t._$eventProcessor;
                    return (
                        null != e &&
                            r &&
                            r.normalizeQuery &&
                            (e = r.normalizeQuery(e)),
                        e
                    );
                })(t, r)),
                    o[e] || (o[e] = []);
                for (var s = 0; s < o[e].length; s++)
                    if (o[e][s].h === n) return t;
                var l = {
                        h: n,
                        one: a,
                        query: r,
                        ctx: i || t,
                        callAtLast: n.zrEventfulCallAtLast,
                    },
                    h = o[e].length - 1,
                    u = o[e][h];
                return (
                    u && u.callAtLast ? o[e].splice(h, 0, l) : o[e].push(l), t
                );
            }
            n.prototype = {
                constructor: n,
                one: function(t, e, r, n) {
                    return i(this, t, e, r, n, !0);
                },
                on: function(t, e, r, n) {
                    return i(this, t, e, r, n, !1);
                },
                isSilent: function(t) {
                    var e = this._$handlers;
                    return !e[t] || !e[t].length;
                },
                off: function(t, e) {
                    var r = this._$handlers;
                    if (!t) return (this._$handlers = {}), this;
                    if (e) {
                        if (r[t]) {
                            for (var n = [], i = 0, a = r[t].length; i < a; i++)
                                r[t][i].h !== e && n.push(r[t][i]);
                            r[t] = n;
                        }
                        r[t] && 0 === r[t].length && delete r[t];
                    } else delete r[t];
                    return this;
                },
                trigger: function(t) {
                    var e = this._$handlers[t],
                        n = this._$eventProcessor;
                    if (e) {
                        var i = arguments,
                            a = i.length;
                        a > 3 && (i = r.call(i, 1));
                        for (var o = e.length, s = 0; s < o; ) {
                            var l = e[s];
                            if (
                                n &&
                                n.filter &&
                                null != l.query &&
                                !n.filter(t, l.query)
                            )
                                s++;
                            else {
                                switch (a) {
                                    case 1:
                                        l.h.call(l.ctx);
                                        break;
                                    case 2:
                                        l.h.call(l.ctx, i[1]);
                                        break;
                                    case 3:
                                        l.h.call(l.ctx, i[1], i[2]);
                                        break;
                                    default:
                                        l.h.apply(l.ctx, i);
                                }
                                l.one ? (e.splice(s, 1), o--) : s++;
                            }
                        }
                    }
                    return n && n.afterTrigger && n.afterTrigger(t), this;
                },
                triggerWithContext: function(t) {
                    var e = this._$handlers[t],
                        n = this._$eventProcessor;
                    if (e) {
                        var i = arguments,
                            a = i.length;
                        a > 4 && (i = r.call(i, 1, i.length - 1));
                        for (
                            var o = i[i.length - 1], s = e.length, l = 0;
                            l < s;

                        ) {
                            var h = e[l];
                            if (
                                n &&
                                n.filter &&
                                null != h.query &&
                                !n.filter(t, h.query)
                            )
                                l++;
                            else {
                                switch (a) {
                                    case 1:
                                        h.h.call(o);
                                        break;
                                    case 2:
                                        h.h.call(o, i[1]);
                                        break;
                                    case 3:
                                        h.h.call(o, i[1], i[2]);
                                        break;
                                    default:
                                        h.h.apply(o, i);
                                }
                                h.one ? (e.splice(l, 1), s--) : l++;
                            }
                        }
                    }
                    return n && n.afterTrigger && n.afterTrigger(t), this;
                },
            };
            var a = n;
            t.exports = a;
        },
        function(t, e, r) {
            var n = r(46),
                i = r(49),
                a = r(0),
                o = a.isString,
                s = a.isFunction,
                l = a.isObject,
                h = a.isArrayLike,
                u = a.indexOf,
                c = function() {
                    this.animators = [];
                };
            function f(t, e, r, n, i, a, u, c) {
                o(n)
                    ? ((a = i), (i = n), (n = 0))
                    : s(i)
                    ? ((a = i), (i = "linear"), (n = 0))
                    : s(n)
                    ? ((a = n), (n = 0))
                    : s(r)
                    ? ((a = r), (r = 500))
                    : r || (r = 500),
                    t.stopAnimation(),
                    (function t(e, r, n, i, a, o, s) {
                        var u = {},
                            c = 0;
                        for (var f in i)
                            i.hasOwnProperty(f) &&
                                (null != n[f]
                                    ? l(i[f]) && !h(i[f])
                                        ? t(
                                              e,
                                              r ? r + "." + f : f,
                                              n[f],
                                              i[f],
                                              a,
                                              o,
                                              s
                                          )
                                        : (s
                                              ? ((u[f] = n[f]),
                                                d(e, r, f, i[f]))
                                              : (u[f] = i[f]),
                                          c++)
                                    : null == i[f] || s || d(e, r, f, i[f]));
                        c > 0 &&
                            e
                                .animate(r, !1)
                                .when(null == a ? 500 : a, u)
                                .delay(o || 0);
                    })(t, "", t, e, r, n, c);
                var f = t.animators.slice(),
                    p = f.length;
                function v() {
                    --p || (a && a());
                }
                p || (a && a());
                for (var g = 0; g < f.length; g++) f[g].done(v).start(i, u);
            }
            function d(t, e, r, n) {
                if (e) {
                    var i = {};
                    (i[e] = {}), (i[e][r] = n), t.attr(i);
                } else t.attr(r, n);
            }
            c.prototype = {
                constructor: c,
                animate: function(t, e) {
                    var r,
                        a = !1,
                        o = this,
                        s = this.__zr;
                    if (t) {
                        var l = t.split("."),
                            h = o;
                        a = "shape" === l[0];
                        for (var c = 0, f = l.length; c < f; c++)
                            h && (h = h[l[c]]);
                        h && (r = h);
                    } else r = o;
                    if (r) {
                        var d = o.animators,
                            p = new n(r, e);
                        return (
                            p
                                .during(function(t) {
                                    o.dirty(a);
                                })
                                .done(function() {
                                    d.splice(u(d, p), 1);
                                }),
                            d.push(p),
                            s && s.animation.addAnimator(p),
                            p
                        );
                    }
                    i('Property "' + t + '" is not existed in element ' + o.id);
                },
                stopAnimation: function(t) {
                    for (
                        var e = this.animators, r = e.length, n = 0;
                        n < r;
                        n++
                    )
                        e[n].stop(t);
                    return (e.length = 0), this;
                },
                animateTo: function(t, e, r, n, i, a) {
                    f(this, t, e, r, n, i, a);
                },
                animateFrom: function(t, e, r, n, i, a) {
                    f(this, t, e, r, n, i, a, !0);
                },
            };
            var p = c;
            t.exports = p;
        },
        function(t, e, r) {
            var n = r(47),
                i = r(21),
                a = r(0).isArrayLike,
                o = Array.prototype.slice;
            function s(t, e) {
                return t[e];
            }
            function l(t, e, r) {
                t[e] = r;
            }
            function h(t, e, r) {
                return (e - t) * r + t;
            }
            function u(t, e, r) {
                return r > 0.5 ? e : t;
            }
            function c(t, e, r, n, i) {
                var a = t.length;
                if (1 === i)
                    for (var o = 0; o < a; o++) n[o] = h(t[o], e[o], r);
                else {
                    var s = a && t[0].length;
                    for (o = 0; o < a; o++)
                        for (var l = 0; l < s; l++)
                            n[o][l] = h(t[o][l], e[o][l], r);
                }
            }
            function f(t, e, r) {
                var n = t.length,
                    i = e.length;
                if (n !== i)
                    if (n > i) t.length = i;
                    else
                        for (var a = n; a < i; a++)
                            t.push(1 === r ? e[a] : o.call(e[a]));
                var s = t[0] && t[0].length;
                for (a = 0; a < t.length; a++)
                    if (1 === r) isNaN(t[a]) && (t[a] = e[a]);
                    else
                        for (var l = 0; l < s; l++)
                            isNaN(t[a][l]) && (t[a][l] = e[a][l]);
            }
            function d(t, e, r) {
                if (t === e) return !0;
                var n = t.length;
                if (n !== e.length) return !1;
                if (1 === r) {
                    for (var i = 0; i < n; i++) if (t[i] !== e[i]) return !1;
                } else {
                    var a = t[0].length;
                    for (i = 0; i < n; i++)
                        for (var o = 0; o < a; o++)
                            if (t[i][o] !== e[i][o]) return !1;
                }
                return !0;
            }
            function p(t, e, r, n, i, a, o, s, l) {
                var h = t.length;
                if (1 === l)
                    for (var u = 0; u < h; u++)
                        s[u] = v(t[u], e[u], r[u], n[u], i, a, o);
                else {
                    var c = t[0].length;
                    for (u = 0; u < h; u++)
                        for (var f = 0; f < c; f++)
                            s[u][f] = v(
                                t[u][f],
                                e[u][f],
                                r[u][f],
                                n[u][f],
                                i,
                                a,
                                o
                            );
                }
            }
            function v(t, e, r, n, i, a, o) {
                var s = 0.5 * (r - t),
                    l = 0.5 * (n - e);
                return (
                    (2 * (e - r) + s + l) * o +
                    (-3 * (e - r) - 2 * s - l) * a +
                    s * i +
                    e
                );
            }
            function g(t) {
                if (a(t)) {
                    var e = t.length;
                    if (a(t[0])) {
                        for (var r = [], n = 0; n < e; n++)
                            r.push(o.call(t[n]));
                        return r;
                    }
                    return o.call(t);
                }
                return t;
            }
            function y(t) {
                return (
                    (t[0] = Math.floor(t[0])),
                    (t[1] = Math.floor(t[1])),
                    (t[2] = Math.floor(t[2])),
                    "rgba(" + t.join(",") + ")"
                );
            }
            function m(t, e, r, o, s, l) {
                var g = t._getter,
                    m = t._setter,
                    x = "spline" === e,
                    _ = o.length;
                if (_) {
                    var b,
                        w = o[0].value,
                        S = a(w),
                        T = !1,
                        P = !1,
                        M = S
                            ? (function(t) {
                                  var e = t[t.length - 1].value;
                                  return a(e && e[0]) ? 2 : 1;
                              })(o)
                            : 0;
                    o.sort(function(t, e) {
                        return t.time - e.time;
                    }),
                        (b = o[_ - 1].time);
                    for (
                        var O = [], k = [], C = o[0].value, A = !0, D = 0;
                        D < _;
                        D++
                    ) {
                        O.push(o[D].time / b);
                        var I = o[D].value;
                        if (
                            ((S && d(I, C, M)) || (!S && I === C) || (A = !1),
                            (C = I),
                            "string" == typeof I)
                        ) {
                            var L = i.parse(I);
                            L ? ((I = L), (T = !0)) : (P = !0);
                        }
                        k.push(I);
                    }
                    if (l || !A) {
                        var R = k[_ - 1];
                        for (D = 0; D < _ - 1; D++)
                            S
                                ? f(k[D], R, M)
                                : !isNaN(k[D]) ||
                                  isNaN(R) ||
                                  P ||
                                  T ||
                                  (k[D] = R);
                        S && f(g(t._target, s), R, M);
                        var B,
                            F,
                            E,
                            N,
                            z,
                            W = 0,
                            q = 0;
                        if (T) var H = [0, 0, 0, 0];
                        var j = new n({
                            target: t._target,
                            life: b,
                            loop: t._loop,
                            delay: t._delay,
                            onframe: function(t, e) {
                                var r;
                                if (e < 0) r = 0;
                                else if (e < q) {
                                    for (
                                        r = Math.min(W + 1, _ - 1);
                                        r >= 0 && !(O[r] <= e);
                                        r--
                                    );
                                    r = Math.min(r, _ - 2);
                                } else {
                                    for (r = W; r < _ && !(O[r] > e); r++);
                                    r = Math.min(r - 1, _ - 2);
                                }
                                (W = r), (q = e);
                                var n = O[r + 1] - O[r];
                                if (0 !== n)
                                    if (((B = (e - O[r]) / n), x))
                                        if (
                                            ((E = k[r]),
                                            (F = k[0 === r ? r : r - 1]),
                                            (N = k[r > _ - 2 ? _ - 1 : r + 1]),
                                            (z = k[r > _ - 3 ? _ - 1 : r + 2]),
                                            S)
                                        )
                                            p(
                                                F,
                                                E,
                                                N,
                                                z,
                                                B,
                                                B * B,
                                                B * B * B,
                                                g(t, s),
                                                M
                                            );
                                        else {
                                            if (T)
                                                (i = p(
                                                    F,
                                                    E,
                                                    N,
                                                    z,
                                                    B,
                                                    B * B,
                                                    B * B * B,
                                                    H,
                                                    1
                                                )),
                                                    (i = y(H));
                                            else {
                                                if (P) return u(E, N, B);
                                                i = v(
                                                    F,
                                                    E,
                                                    N,
                                                    z,
                                                    B,
                                                    B * B,
                                                    B * B * B
                                                );
                                            }
                                            m(t, s, i);
                                        }
                                    else if (S)
                                        c(k[r], k[r + 1], B, g(t, s), M);
                                    else {
                                        var i;
                                        if (T)
                                            c(k[r], k[r + 1], B, H, 1),
                                                (i = y(H));
                                        else {
                                            if (P) return u(k[r], k[r + 1], B);
                                            i = h(k[r], k[r + 1], B);
                                        }
                                        m(t, s, i);
                                    }
                            },
                            ondestroy: r,
                        });
                        return e && "spline" !== e && (j.easing = e), j;
                    }
                }
            }
            var x = function(t, e, r, n) {
                (this._tracks = {}),
                    (this._target = t),
                    (this._loop = e || !1),
                    (this._getter = r || s),
                    (this._setter = n || l),
                    (this._clipCount = 0),
                    (this._delay = 0),
                    (this._doneList = []),
                    (this._onframeList = []),
                    (this._clipList = []);
            };
            x.prototype = {
                when: function(t, e) {
                    var r = this._tracks;
                    for (var n in e)
                        if (e.hasOwnProperty(n)) {
                            if (!r[n]) {
                                r[n] = [];
                                var i = this._getter(this._target, n);
                                if (null == i) continue;
                                0 !== t && r[n].push({ time: 0, value: g(i) });
                            }
                            r[n].push({ time: t, value: e[n] });
                        }
                    return this;
                },
                during: function(t) {
                    return this._onframeList.push(t), this;
                },
                pause: function() {
                    for (var t = 0; t < this._clipList.length; t++)
                        this._clipList[t].pause();
                    this._paused = !0;
                },
                resume: function() {
                    for (var t = 0; t < this._clipList.length; t++)
                        this._clipList[t].resume();
                    this._paused = !1;
                },
                isPaused: function() {
                    return !!this._paused;
                },
                _doneCallback: function() {
                    (this._tracks = {}), (this._clipList.length = 0);
                    for (
                        var t = this._doneList, e = t.length, r = 0;
                        r < e;
                        r++
                    )
                        t[r].call(this);
                },
                start: function(t, e) {
                    var r,
                        n = this,
                        i = 0,
                        a = function() {
                            --i || n._doneCallback();
                        };
                    for (var o in this._tracks)
                        if (this._tracks.hasOwnProperty(o)) {
                            var s = m(this, t, a, this._tracks[o], o, e);
                            s &&
                                (this._clipList.push(s),
                                i++,
                                this.animation && this.animation.addClip(s),
                                (r = s));
                        }
                    if (r) {
                        var l = r.onframe;
                        r.onframe = function(t, e) {
                            l(t, e);
                            for (var r = 0; r < n._onframeList.length; r++)
                                n._onframeList[r](t, e);
                        };
                    }
                    return i || this._doneCallback(), this;
                },
                stop: function(t) {
                    for (
                        var e = this._clipList, r = this.animation, n = 0;
                        n < e.length;
                        n++
                    ) {
                        var i = e[n];
                        t && i.onframe(this._target, 1), r && r.removeClip(i);
                    }
                    e.length = 0;
                },
                delay: function(t) {
                    return (this._delay = t), this;
                },
                done: function(t) {
                    return t && this._doneList.push(t), this;
                },
                getClips: function() {
                    return this._clipList;
                },
            };
            var _ = x;
            t.exports = _;
        },
        function(t, e, r) {
            var n = r(48);
            function i(t) {
                (this._target = t.target),
                    (this._life = t.life || 1e3),
                    (this._delay = t.delay || 0),
                    (this._initialized = !1),
                    (this.loop = null != t.loop && t.loop),
                    (this.gap = t.gap || 0),
                    (this.easing = t.easing || "Linear"),
                    (this.onframe = t.onframe),
                    (this.ondestroy = t.ondestroy),
                    (this.onrestart = t.onrestart),
                    (this._pausedTime = 0),
                    (this._paused = !1);
            }
            i.prototype = {
                constructor: i,
                step: function(t, e) {
                    if (
                        (this._initialized ||
                            ((this._startTime = t + this._delay),
                            (this._initialized = !0)),
                        this._paused)
                    )
                        this._pausedTime += e;
                    else {
                        var r =
                            (t - this._startTime - this._pausedTime) /
                            this._life;
                        if (!(r < 0)) {
                            r = Math.min(r, 1);
                            var i = this.easing,
                                a = "string" == typeof i ? n[i] : i,
                                o = "function" == typeof a ? a(r) : r;
                            return (
                                this.fire("frame", o),
                                1 === r
                                    ? this.loop
                                        ? (this.restart(t), "restart")
                                        : ((this._needsRemove = !0), "destroy")
                                    : null
                            );
                        }
                    }
                },
                restart: function(t) {
                    var e =
                        (t - this._startTime - this._pausedTime) % this._life;
                    (this._startTime = t - e + this.gap),
                        (this._pausedTime = 0),
                        (this._needsRemove = !1);
                },
                fire: function(t, e) {
                    this[(t = "on" + t)] && this[t](this._target, e);
                },
                pause: function() {
                    this._paused = !0;
                },
                resume: function() {
                    this._paused = !1;
                },
            };
            var a = i;
            t.exports = a;
        },
        function(t, e) {
            var r = {
                    linear: function(t) {
                        return t;
                    },
                    quadraticIn: function(t) {
                        return t * t;
                    },
                    quadraticOut: function(t) {
                        return t * (2 - t);
                    },
                    quadraticInOut: function(t) {
                        return (t *= 2) < 1
                            ? 0.5 * t * t
                            : -0.5 * (--t * (t - 2) - 1);
                    },
                    cubicIn: function(t) {
                        return t * t * t;
                    },
                    cubicOut: function(t) {
                        return --t * t * t + 1;
                    },
                    cubicInOut: function(t) {
                        return (t *= 2) < 1
                            ? 0.5 * t * t * t
                            : 0.5 * ((t -= 2) * t * t + 2);
                    },
                    quarticIn: function(t) {
                        return t * t * t * t;
                    },
                    quarticOut: function(t) {
                        return 1 - --t * t * t * t;
                    },
                    quarticInOut: function(t) {
                        return (t *= 2) < 1
                            ? 0.5 * t * t * t * t
                            : -0.5 * ((t -= 2) * t * t * t - 2);
                    },
                    quinticIn: function(t) {
                        return t * t * t * t * t;
                    },
                    quinticOut: function(t) {
                        return --t * t * t * t * t + 1;
                    },
                    quinticInOut: function(t) {
                        return (t *= 2) < 1
                            ? 0.5 * t * t * t * t * t
                            : 0.5 * ((t -= 2) * t * t * t * t + 2);
                    },
                    sinusoidalIn: function(t) {
                        return 1 - Math.cos((t * Math.PI) / 2);
                    },
                    sinusoidalOut: function(t) {
                        return Math.sin((t * Math.PI) / 2);
                    },
                    sinusoidalInOut: function(t) {
                        return 0.5 * (1 - Math.cos(Math.PI * t));
                    },
                    exponentialIn: function(t) {
                        return 0 === t ? 0 : Math.pow(1024, t - 1);
                    },
                    exponentialOut: function(t) {
                        return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
                    },
                    exponentialInOut: function(t) {
                        return 0 === t
                            ? 0
                            : 1 === t
                            ? 1
                            : (t *= 2) < 1
                            ? 0.5 * Math.pow(1024, t - 1)
                            : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
                    },
                    circularIn: function(t) {
                        return 1 - Math.sqrt(1 - t * t);
                    },
                    circularOut: function(t) {
                        return Math.sqrt(1 - --t * t);
                    },
                    circularInOut: function(t) {
                        return (t *= 2) < 1
                            ? -0.5 * (Math.sqrt(1 - t * t) - 1)
                            : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
                    },
                    elasticIn: function(t) {
                        var e,
                            r = 0.1;
                        return 0 === t
                            ? 0
                            : 1 === t
                            ? 1
                            : (!r || r < 1
                                  ? ((r = 1), (e = 0.1))
                                  : (e =
                                        (0.4 * Math.asin(1 / r)) /
                                        (2 * Math.PI)),
                              -r *
                                  Math.pow(2, 10 * (t -= 1)) *
                                  Math.sin(((t - e) * (2 * Math.PI)) / 0.4));
                    },
                    elasticOut: function(t) {
                        var e,
                            r = 0.1;
                        return 0 === t
                            ? 0
                            : 1 === t
                            ? 1
                            : (!r || r < 1
                                  ? ((r = 1), (e = 0.1))
                                  : (e =
                                        (0.4 * Math.asin(1 / r)) /
                                        (2 * Math.PI)),
                              r *
                                  Math.pow(2, -10 * t) *
                                  Math.sin(((t - e) * (2 * Math.PI)) / 0.4) +
                                  1);
                    },
                    elasticInOut: function(t) {
                        var e,
                            r = 0.1,
                            n = 0.4;
                        return 0 === t
                            ? 0
                            : 1 === t
                            ? 1
                            : (!r || r < 1
                                  ? ((r = 1), (e = 0.1))
                                  : (e =
                                        (n * Math.asin(1 / r)) / (2 * Math.PI)),
                              (t *= 2) < 1
                                  ? r *
                                    Math.pow(2, 10 * (t -= 1)) *
                                    Math.sin(((t - e) * (2 * Math.PI)) / n) *
                                    -0.5
                                  : r *
                                        Math.pow(2, -10 * (t -= 1)) *
                                        Math.sin(
                                            ((t - e) * (2 * Math.PI)) / n
                                        ) *
                                        0.5 +
                                    1);
                    },
                    backIn: function(t) {
                        var e = 1.70158;
                        return t * t * ((e + 1) * t - e);
                    },
                    backOut: function(t) {
                        var e = 1.70158;
                        return --t * t * ((e + 1) * t + e) + 1;
                    },
                    backInOut: function(t) {
                        var e = 2.5949095;
                        return (t *= 2) < 1
                            ? t * t * ((e + 1) * t - e) * 0.5
                            : 0.5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
                    },
                    bounceIn: function(t) {
                        return 1 - r.bounceOut(1 - t);
                    },
                    bounceOut: function(t) {
                        return t < 1 / 2.75
                            ? 7.5625 * t * t
                            : t < 2 / 2.75
                            ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
                            : t < 2.5 / 2.75
                            ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                            : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
                    },
                    bounceInOut: function(t) {
                        return t < 0.5
                            ? 0.5 * r.bounceIn(2 * t)
                            : 0.5 * r.bounceOut(2 * t - 1) + 0.5;
                    },
                },
                n = r;
            t.exports = n;
        },
        function(t, e, r) {
            var n = function() {};
            1 === r(23).debugMode && (n = console.error);
            var i = n;
            t.exports = i;
        },
        function(t, e, r) {
            var n = r(24),
                i = r(3),
                a = r(7).WILL_BE_RESTORED,
                o = new i(),
                s = function() {};
            s.prototype = {
                constructor: s,
                drawRectText: function(t, e) {
                    var r = this.style;
                    (e = r.textRect || e),
                        this.__dirty && n.normalizeTextStyle(r, !0);
                    var i = r.text;
                    if ((null != i && (i += ""), n.needDrawText(i, r))) {
                        t.save();
                        var s = this.transform;
                        r.transformText
                            ? this.setTransform(t)
                            : s && (o.copy(e), o.applyTransform(s), (e = o)),
                            n.renderText(this, t, i, r, e, a),
                            t.restore();
                    }
                },
            };
            var l = s;
            t.exports = l;
        },
        function(t, e, r) {
            var n = r(2),
                i = r(4),
                a = Math.min,
                o = Math.max,
                s = Math.sin,
                l = Math.cos,
                h = 2 * Math.PI,
                u = n.create(),
                c = n.create(),
                f = n.create();
            var d = [],
                p = [];
            (e.fromPoints = function(t, e, r) {
                if (0 !== t.length) {
                    var n,
                        i = t[0],
                        s = i[0],
                        l = i[0],
                        h = i[1],
                        u = i[1];
                    for (n = 1; n < t.length; n++)
                        (i = t[n]),
                            (s = a(s, i[0])),
                            (l = o(l, i[0])),
                            (h = a(h, i[1])),
                            (u = o(u, i[1]));
                    (e[0] = s), (e[1] = h), (r[0] = l), (r[1] = u);
                }
            }),
                (e.fromLine = function(t, e, r, n, i, s) {
                    (i[0] = a(t, r)),
                        (i[1] = a(e, n)),
                        (s[0] = o(t, r)),
                        (s[1] = o(e, n));
                }),
                (e.fromCubic = function(t, e, r, n, s, l, h, u, c, f) {
                    var v,
                        g = i.cubicExtrema,
                        y = i.cubicAt,
                        m = g(t, r, s, h, d);
                    for (
                        c[0] = 1 / 0,
                            c[1] = 1 / 0,
                            f[0] = -1 / 0,
                            f[1] = -1 / 0,
                            v = 0;
                        v < m;
                        v++
                    ) {
                        var x = y(t, r, s, h, d[v]);
                        (c[0] = a(x, c[0])), (f[0] = o(x, f[0]));
                    }
                    for (m = g(e, n, l, u, p), v = 0; v < m; v++) {
                        var _ = y(e, n, l, u, p[v]);
                        (c[1] = a(_, c[1])), (f[1] = o(_, f[1]));
                    }
                    (c[0] = a(t, c[0])),
                        (f[0] = o(t, f[0])),
                        (c[0] = a(h, c[0])),
                        (f[0] = o(h, f[0])),
                        (c[1] = a(e, c[1])),
                        (f[1] = o(e, f[1])),
                        (c[1] = a(u, c[1])),
                        (f[1] = o(u, f[1]));
                }),
                (e.fromQuadratic = function(t, e, r, n, s, l, h, u) {
                    var c = i.quadraticExtremum,
                        f = i.quadraticAt,
                        d = o(a(c(t, r, s), 1), 0),
                        p = o(a(c(e, n, l), 1), 0),
                        v = f(t, r, s, d),
                        g = f(e, n, l, p);
                    (h[0] = a(t, s, v)),
                        (h[1] = a(e, l, g)),
                        (u[0] = o(t, s, v)),
                        (u[1] = o(e, l, g));
                }),
                (e.fromArc = function(t, e, r, i, a, o, d, p, v) {
                    var g = n.min,
                        y = n.max,
                        m = Math.abs(a - o);
                    if (m % h < 1e-4 && m > 1e-4)
                        return (
                            (p[0] = t - r),
                            (p[1] = e - i),
                            (v[0] = t + r),
                            void (v[1] = e + i)
                        );
                    if (
                        ((u[0] = l(a) * r + t),
                        (u[1] = s(a) * i + e),
                        (c[0] = l(o) * r + t),
                        (c[1] = s(o) * i + e),
                        g(p, u, c),
                        y(v, u, c),
                        (a %= h) < 0 && (a += h),
                        (o %= h) < 0 && (o += h),
                        a > o && !d ? (o += h) : a < o && d && (a += h),
                        d)
                    ) {
                        var x = o;
                        (o = a), (a = x);
                    }
                    for (var _ = 0; _ < o; _ += Math.PI / 2)
                        _ > a &&
                            ((f[0] = l(_) * r + t),
                            (f[1] = s(_) * i + e),
                            g(p, f, p),
                            y(v, f, v));
                });
        },
        function(t, e, r) {
            var n = r(8),
                i = r(53),
                a = r(54),
                o = r(55),
                s = r(56),
                l = r(26).normalizeRadian,
                h = r(4),
                u = r(57),
                c = n.CMD,
                f = 2 * Math.PI;
            var d = [-1, -1, -1],
                p = [-1, -1];
            function v(t, e, r, n, i, a, o, s, l, u) {
                if (
                    (u > e && u > n && u > a && u > s) ||
                    (u < e && u < n && u < a && u < s)
                )
                    return 0;
                var c,
                    f = h.cubicRootAt(e, n, a, s, u, d);
                if (0 === f) return 0;
                for (var v, g, y = 0, m = -1, x = 0; x < f; x++) {
                    var _ = d[x],
                        b = 0 === _ || 1 === _ ? 0.5 : 1;
                    h.cubicAt(t, r, i, o, _) < l ||
                        (m < 0 &&
                            ((m = h.cubicExtrema(e, n, a, s, p)),
                            p[1] < p[0] &&
                                m > 1 &&
                                ((c = void 0),
                                (c = p[0]),
                                (p[0] = p[1]),
                                (p[1] = c)),
                            (v = h.cubicAt(e, n, a, s, p[0])),
                            m > 1 && (g = h.cubicAt(e, n, a, s, p[1]))),
                        2 === m
                            ? _ < p[0]
                                ? (y += v < e ? b : -b)
                                : _ < p[1]
                                ? (y += g < v ? b : -b)
                                : (y += s < g ? b : -b)
                            : _ < p[0]
                            ? (y += v < e ? b : -b)
                            : (y += s < v ? b : -b));
                }
                return y;
            }
            function g(t, e, r, n, i, a, o, s) {
                if ((s > e && s > n && s > a) || (s < e && s < n && s < a))
                    return 0;
                var l = h.quadraticRootAt(e, n, a, s, d);
                if (0 === l) return 0;
                var u = h.quadraticExtremum(e, n, a);
                if (u >= 0 && u <= 1) {
                    for (
                        var c = 0, f = h.quadraticAt(e, n, a, u), p = 0;
                        p < l;
                        p++
                    ) {
                        var v = 0 === d[p] || 1 === d[p] ? 0.5 : 1;
                        h.quadraticAt(t, r, i, d[p]) < o ||
                            (d[p] < u
                                ? (c += f < e ? v : -v)
                                : (c += a < f ? v : -v));
                    }
                    return c;
                }
                v = 0 === d[0] || 1 === d[0] ? 0.5 : 1;
                return h.quadraticAt(t, r, i, d[0]) < o ? 0 : a < e ? v : -v;
            }
            function y(t, e, r, n, i, a, o, s) {
                if ((s -= e) > r || s < -r) return 0;
                var h = Math.sqrt(r * r - s * s);
                (d[0] = -h), (d[1] = h);
                var u = Math.abs(n - i);
                if (u < 1e-4) return 0;
                if (u % f < 1e-4) {
                    (n = 0), (i = f);
                    var c = a ? 1 : -1;
                    return o >= d[0] + t && o <= d[1] + t ? c : 0;
                }
                if (a) {
                    h = n;
                    (n = l(i)), (i = l(h));
                } else (n = l(n)), (i = l(i));
                n > i && (i += f);
                for (var p = 0, v = 0; v < 2; v++) {
                    var g = d[v];
                    if (g + t > o) {
                        var y = Math.atan2(s, g);
                        c = a ? 1 : -1;
                        y < 0 && (y = f + y),
                            ((y >= n && y <= i) ||
                                (y + f >= n && y + f <= i)) &&
                                (y > Math.PI / 2 &&
                                    y < 1.5 * Math.PI &&
                                    (c = -c),
                                (p += c));
                    }
                }
                return p;
            }
            function m(t, e, r, n, l) {
                for (
                    var h, f, d = 0, p = 0, m = 0, x = 0, _ = 0, b = 0;
                    b < t.length;

                ) {
                    var w = t[b++];
                    switch (
                        (w === c.M &&
                            b > 1 &&
                            (r || (d += u(p, m, x, _, n, l))),
                        1 === b && ((x = p = t[b]), (_ = m = t[b + 1])),
                        w)
                    ) {
                        case c.M:
                            (p = x = t[b++]), (m = _ = t[b++]);
                            break;
                        case c.L:
                            if (r) {
                                if (
                                    i.containStroke(
                                        p,
                                        m,
                                        t[b],
                                        t[b + 1],
                                        e,
                                        n,
                                        l
                                    )
                                )
                                    return !0;
                            } else d += u(p, m, t[b], t[b + 1], n, l) || 0;
                            (p = t[b++]), (m = t[b++]);
                            break;
                        case c.C:
                            if (r) {
                                if (
                                    a.containStroke(
                                        p,
                                        m,
                                        t[b++],
                                        t[b++],
                                        t[b++],
                                        t[b++],
                                        t[b],
                                        t[b + 1],
                                        e,
                                        n,
                                        l
                                    )
                                )
                                    return !0;
                            } else
                                d +=
                                    v(
                                        p,
                                        m,
                                        t[b++],
                                        t[b++],
                                        t[b++],
                                        t[b++],
                                        t[b],
                                        t[b + 1],
                                        n,
                                        l
                                    ) || 0;
                            (p = t[b++]), (m = t[b++]);
                            break;
                        case c.Q:
                            if (r) {
                                if (
                                    o.containStroke(
                                        p,
                                        m,
                                        t[b++],
                                        t[b++],
                                        t[b],
                                        t[b + 1],
                                        e,
                                        n,
                                        l
                                    )
                                )
                                    return !0;
                            } else
                                d +=
                                    g(
                                        p,
                                        m,
                                        t[b++],
                                        t[b++],
                                        t[b],
                                        t[b + 1],
                                        n,
                                        l
                                    ) || 0;
                            (p = t[b++]), (m = t[b++]);
                            break;
                        case c.A:
                            var S = t[b++],
                                T = t[b++],
                                P = t[b++],
                                M = t[b++],
                                O = t[b++],
                                k = t[b++];
                            b += 1;
                            var C = 1 - t[b++],
                                A = Math.cos(O) * P + S,
                                D = Math.sin(O) * M + T;
                            b > 1
                                ? (d += u(p, m, A, D, n, l))
                                : ((x = A), (_ = D));
                            var I = ((n - S) * M) / P + S;
                            if (r) {
                                if (
                                    s.containStroke(
                                        S,
                                        T,
                                        M,
                                        O,
                                        O + k,
                                        C,
                                        e,
                                        I,
                                        l
                                    )
                                )
                                    return !0;
                            } else d += y(S, T, M, O, O + k, C, I, l);
                            (p = Math.cos(O + k) * P + S),
                                (m = Math.sin(O + k) * M + T);
                            break;
                        case c.R:
                            (x = p = t[b++]), (_ = m = t[b++]);
                            (A = x + t[b++]), (D = _ + t[b++]);
                            if (r) {
                                if (
                                    i.containStroke(x, _, A, _, e, n, l) ||
                                    i.containStroke(A, _, A, D, e, n, l) ||
                                    i.containStroke(A, D, x, D, e, n, l) ||
                                    i.containStroke(x, D, x, _, e, n, l)
                                )
                                    return !0;
                            } else
                                (d += u(A, _, A, D, n, l)),
                                    (d += u(x, D, x, _, n, l));
                            break;
                        case c.Z:
                            if (r) {
                                if (i.containStroke(p, m, x, _, e, n, l))
                                    return !0;
                            } else d += u(p, m, x, _, n, l);
                            (p = x), (m = _);
                    }
                }
                return (
                    r ||
                        ((h = m), (f = _), Math.abs(h - f) < 1e-4) ||
                        (d += u(p, m, x, _, n, l) || 0),
                    0 !== d
                );
            }
            (e.contain = function(t, e, r) {
                return m(t, 0, !1, e, r);
            }),
                (e.containStroke = function(t, e, r, n) {
                    return m(t, e, !0, r, n);
                });
        },
        function(t, e) {
            e.containStroke = function(t, e, r, n, i, a, o) {
                if (0 === i) return !1;
                var s = i,
                    l = 0;
                if (
                    (o > e + s && o > n + s) ||
                    (o < e - s && o < n - s) ||
                    (a > t + s && a > r + s) ||
                    (a < t - s && a < r - s)
                )
                    return !1;
                if (t === r) return Math.abs(a - t) <= s / 2;
                var h =
                    (l = (e - n) / (t - r)) * a - o + (t * n - r * e) / (t - r);
                return (h * h) / (l * l + 1) <= ((s / 2) * s) / 2;
            };
        },
        function(t, e, r) {
            var n = r(4);
            e.containStroke = function(t, e, r, i, a, o, s, l, h, u, c) {
                if (0 === h) return !1;
                var f = h;
                return (
                    !(
                        (c > e + f && c > i + f && c > o + f && c > l + f) ||
                        (c < e - f && c < i - f && c < o - f && c < l - f) ||
                        (u > t + f && u > r + f && u > a + f && u > s + f) ||
                        (u < t - f && u < r - f && u < a - f && u < s - f)
                    ) &&
                    n.cubicProjectPoint(t, e, r, i, a, o, s, l, u, c, null) <=
                        f / 2
                );
            };
        },
        function(t, e, r) {
            var n = r(4).quadraticProjectPoint;
            e.containStroke = function(t, e, r, i, a, o, s, l, h) {
                if (0 === s) return !1;
                var u = s;
                return (
                    !(
                        (h > e + u && h > i + u && h > o + u) ||
                        (h < e - u && h < i - u && h < o - u) ||
                        (l > t + u && l > r + u && l > a + u) ||
                        (l < t - u && l < r - u && l < a - u)
                    ) && n(t, e, r, i, a, o, l, h, null) <= u / 2
                );
            };
        },
        function(t, e, r) {
            var n = r(26).normalizeRadian,
                i = 2 * Math.PI;
            e.containStroke = function(t, e, r, a, o, s, l, h, u) {
                if (0 === l) return !1;
                var c = l;
                (h -= t), (u -= e);
                var f = Math.sqrt(h * h + u * u);
                if (f - c > r || f + c < r) return !1;
                if (Math.abs(a - o) % i < 1e-4) return !0;
                if (s) {
                    var d = a;
                    (a = n(o)), (o = n(d));
                } else (a = n(a)), (o = n(o));
                a > o && (o += i);
                var p = Math.atan2(u, h);
                return (
                    p < 0 && (p += i),
                    (p >= a && p <= o) || (p + i >= a && p + i <= o)
                );
            };
        },
        function(t, e) {
            t.exports = function(t, e, r, n, i, a) {
                if ((a > e && a > n) || (a < e && a < n)) return 0;
                if (n === e) return 0;
                var o = n < e ? 1 : -1,
                    s = (a - e) / (n - e);
                (1 !== s && 0 !== s) || (o = n < e ? 0.5 : -0.5);
                var l = s * (r - t) + t;
                return l === i ? 1 / 0 : l > i ? o : 0;
            };
        },
        function(t, e) {
            var r = function(t, e) {
                (this.image = t), (this.repeat = e), (this.type = "pattern");
            };
            r.prototype.getCanvasPattern = function(t) {
                return t.createPattern(this.image, this.repeat || "repeat");
            };
            var n = r;
            t.exports = n;
        },
        function(t, e, r) {
            var n = r(8),
                i = r(2).applyTransform,
                a = n.CMD,
                o = [[], [], []],
                s = Math.sqrt,
                l = Math.atan2;
            t.exports = function(t, e) {
                var r,
                    n,
                    h,
                    u,
                    c,
                    f = t.data,
                    d = a.M,
                    p = a.C,
                    v = a.L,
                    g = a.R,
                    y = a.A,
                    m = a.Q;
                for (h = 0, u = 0; h < f.length; ) {
                    switch (((r = f[h++]), (u = h), (n = 0), r)) {
                        case d:
                        case v:
                            n = 1;
                            break;
                        case p:
                            n = 3;
                            break;
                        case m:
                            n = 2;
                            break;
                        case y:
                            var x = e[4],
                                _ = e[5],
                                b = s(e[0] * e[0] + e[1] * e[1]),
                                w = s(e[2] * e[2] + e[3] * e[3]),
                                S = l(-e[1] / w, e[0] / b);
                            (f[h] *= b),
                                (f[h++] += x),
                                (f[h] *= w),
                                (f[h++] += _),
                                (f[h++] *= b),
                                (f[h++] *= w),
                                (f[h++] += S),
                                (f[h++] += S),
                                (u = h += 2);
                            break;
                        case g:
                            (T[0] = f[h++]),
                                (T[1] = f[h++]),
                                i(T, T, e),
                                (f[u++] = T[0]),
                                (f[u++] = T[1]),
                                (T[0] += f[h++]),
                                (T[1] += f[h++]),
                                i(T, T, e),
                                (f[u++] = T[0]),
                                (f[u++] = T[1]);
                    }
                    for (c = 0; c < n; c++) {
                        var T;
                        ((T = o[c])[0] = f[h++]),
                            (T[1] = f[h++]),
                            i(T, T, e),
                            (f[u++] = T[0]),
                            (f[u++] = T[1]);
                    }
                }
            };
        },
        function(t, e, r) {
            var n = r(6),
                i = r(3),
                a = r(0),
                o = r(12);
            function s(t) {
                n.call(this, t);
            }
            (s.prototype = {
                constructor: s,
                type: "image",
                brush: function(t, e) {
                    var r = this.style,
                        n = r.image;
                    r.bind(t, this, e);
                    var i = (this._image = o.createOrUpdateImage(
                        n,
                        this._image,
                        this,
                        this.onload
                    ));
                    if (i && o.isImageReady(i)) {
                        var a = r.x || 0,
                            s = r.y || 0,
                            l = r.width,
                            h = r.height,
                            u = i.width / i.height;
                        if (
                            (null == l && null != h
                                ? (l = h * u)
                                : null == h && null != l
                                ? (h = l / u)
                                : null == l &&
                                  null == h &&
                                  ((l = i.width), (h = i.height)),
                            this.setTransform(t),
                            r.sWidth && r.sHeight)
                        ) {
                            var c = r.sx || 0,
                                f = r.sy || 0;
                            t.drawImage(
                                i,
                                c,
                                f,
                                r.sWidth,
                                r.sHeight,
                                a,
                                s,
                                l,
                                h
                            );
                        } else if (r.sx && r.sy) {
                            var d = l - (c = r.sx),
                                p = h - (f = r.sy);
                            t.drawImage(i, c, f, d, p, a, s, l, h);
                        } else t.drawImage(i, a, s, l, h);
                        null != r.text &&
                            (this.restoreTransform(t),
                            this.drawRectText(t, this.getBoundingRect()));
                    }
                },
                getBoundingRect: function() {
                    var t = this.style;
                    return (
                        this._rect ||
                            (this._rect = new i(
                                t.x || 0,
                                t.y || 0,
                                t.width || 0,
                                t.height || 0
                            )),
                        this._rect
                    );
                },
            }),
                a.inherits(s, n);
            var l = s;
            t.exports = l;
        },
        function(t, e, r) {
            var n = r(0),
                i = r(19),
                a = r(3),
                o = function(t) {
                    for (var e in ((t = t || {}), i.call(this, t), t))
                        t.hasOwnProperty(e) && (this[e] = t[e]);
                    (this._children = []),
                        (this.__storage = null),
                        (this.__dirty = !0);
                };
            (o.prototype = {
                constructor: o,
                isGroup: !0,
                type: "group",
                silent: !1,
                children: function() {
                    return this._children.slice();
                },
                childAt: function(t) {
                    return this._children[t];
                },
                childOfName: function(t) {
                    for (var e = this._children, r = 0; r < e.length; r++)
                        if (e[r].name === t) return e[r];
                },
                childCount: function() {
                    return this._children.length;
                },
                add: function(t) {
                    return (
                        t &&
                            t !== this &&
                            t.parent !== this &&
                            (this._children.push(t), this._doAdd(t)),
                        this
                    );
                },
                addBefore: function(t, e) {
                    if (
                        t &&
                        t !== this &&
                        t.parent !== this &&
                        e &&
                        e.parent === this
                    ) {
                        var r = this._children,
                            n = r.indexOf(e);
                        n >= 0 && (r.splice(n, 0, t), this._doAdd(t));
                    }
                    return this;
                },
                _doAdd: function(t) {
                    t.parent && t.parent.remove(t), (t.parent = this);
                    var e = this.__storage,
                        r = this.__zr;
                    e &&
                        e !== t.__storage &&
                        (e.addToStorage(t),
                        t instanceof o && t.addChildrenToStorage(e)),
                        r && r.refresh();
                },
                remove: function(t) {
                    var e = this.__zr,
                        r = this.__storage,
                        i = this._children,
                        a = n.indexOf(i, t);
                    return (
                        a < 0 ||
                            (i.splice(a, 1),
                            (t.parent = null),
                            r &&
                                (r.delFromStorage(t),
                                t instanceof o && t.delChildrenFromStorage(r)),
                            e && e.refresh()),
                        this
                    );
                },
                removeAll: function() {
                    var t,
                        e,
                        r = this._children,
                        n = this.__storage;
                    for (e = 0; e < r.length; e++)
                        (t = r[e]),
                            n &&
                                (n.delFromStorage(t),
                                t instanceof o && t.delChildrenFromStorage(n)),
                            (t.parent = null);
                    return (r.length = 0), this;
                },
                eachChild: function(t, e) {
                    for (var r = this._children, n = 0; n < r.length; n++) {
                        var i = r[n];
                        t.call(e, i, n);
                    }
                    return this;
                },
                traverse: function(t, e) {
                    for (var r = 0; r < this._children.length; r++) {
                        var n = this._children[r];
                        t.call(e, n), "group" === n.type && n.traverse(t, e);
                    }
                    return this;
                },
                addChildrenToStorage: function(t) {
                    for (var e = 0; e < this._children.length; e++) {
                        var r = this._children[e];
                        t.addToStorage(r),
                            r instanceof o && r.addChildrenToStorage(t);
                    }
                },
                delChildrenFromStorage: function(t) {
                    for (var e = 0; e < this._children.length; e++) {
                        var r = this._children[e];
                        t.delFromStorage(r),
                            r instanceof o && r.delChildrenFromStorage(t);
                    }
                },
                dirty: function() {
                    return (
                        (this.__dirty = !0),
                        this.__zr && this.__zr.refresh(),
                        this
                    );
                },
                getBoundingRect: function(t) {
                    for (
                        var e = null,
                            r = new a(0, 0, 0, 0),
                            n = t || this._children,
                            i = [],
                            o = 0;
                        o < n.length;
                        o++
                    ) {
                        var s = n[o];
                        if (!s.ignore && !s.invisible) {
                            var l = s.getBoundingRect(),
                                h = s.getLocalTransform(i);
                            h
                                ? (r.copy(l),
                                  r.applyTransform(h),
                                  (e = e || r.clone()).union(r))
                                : (e = e || l.clone()).union(l);
                        }
                    }
                    return e || r;
                },
            }),
                n.inherits(o, i);
            var s = o;
            t.exports = s;
        },
        function(t, e, r) {
            var n = r(6),
                i = r(0),
                a = r(11),
                o = r(24),
                s = r(7).ContextCachedBy,
                l = function(t) {
                    n.call(this, t);
                };
            (l.prototype = {
                constructor: l,
                type: "text",
                brush: function(t, e) {
                    var r = this.style;
                    this.__dirty && o.normalizeTextStyle(r, !0),
                        (r.fill = r.stroke = r.shadowBlur = r.shadowColor = r.shadowOffsetX = r.shadowOffsetY = null);
                    var n = r.text;
                    null != n && (n += ""),
                        o.needDrawText(n, r)
                            ? (this.setTransform(t),
                              o.renderText(this, t, n, r, null, e),
                              this.restoreTransform(t))
                            : (t.__attrCachedBy = s.NONE);
                },
                getBoundingRect: function() {
                    var t = this.style;
                    if (
                        (this.__dirty && o.normalizeTextStyle(t, !0),
                        !this._rect)
                    ) {
                        var e = t.text;
                        null != e ? (e += "") : (e = "");
                        var r = a.getBoundingRect(
                            t.text + "",
                            t.font,
                            t.textAlign,
                            t.textVerticalAlign,
                            t.textPadding,
                            t.textLineHeight,
                            t.rich
                        );
                        if (
                            ((r.x += t.x || 0),
                            (r.y += t.y || 0),
                            o.getStroke(t.textStroke, t.textStrokeWidth))
                        ) {
                            var n = t.textStrokeWidth;
                            (r.x -= n / 2),
                                (r.y -= n / 2),
                                (r.width += n),
                                (r.height += n);
                        }
                        this._rect = r;
                    }
                    return this._rect;
                },
            }),
                i.inherits(l, n);
            var h = l;
            t.exports = h;
        },
        function(t, e, r) {
            var n = r(1).extend({
                type: "circle",
                shape: { cx: 0, cy: 0, r: 0 },
                buildPath: function(t, e, r) {
                    r && t.moveTo(e.cx + e.r, e.cy),
                        t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0);
                },
            });
            t.exports = n;
        },
        function(t, e, r) {
            var n = r(1),
                i = r(65),
                a = n.extend({
                    type: "sector",
                    shape: {
                        cx: 0,
                        cy: 0,
                        r0: 0,
                        r: 0,
                        startAngle: 0,
                        endAngle: 2 * Math.PI,
                        clockwise: !0,
                    },
                    brush: i(n.prototype.brush),
                    buildPath: function(t, e) {
                        var r = e.cx,
                            n = e.cy,
                            i = Math.max(e.r0 || 0, 0),
                            a = Math.max(e.r, 0),
                            o = e.startAngle,
                            s = e.endAngle,
                            l = e.clockwise,
                            h = Math.cos(o),
                            u = Math.sin(o);
                        t.moveTo(h * i + r, u * i + n),
                            t.lineTo(h * a + r, u * a + n),
                            t.arc(r, n, a, o, s, !l),
                            t.lineTo(Math.cos(s) * i + r, Math.sin(s) * i + n),
                            0 !== i && t.arc(r, n, i, s, o, l),
                            t.closePath();
                    },
                });
            t.exports = a;
        },
        function(t, e, r) {
            var n = r(15),
                i = [
                    ["shadowBlur", 0],
                    ["shadowColor", "#000"],
                    ["shadowOffsetX", 0],
                    ["shadowOffsetY", 0],
                ];
            t.exports = function(t) {
                return n.browser.ie && n.browser.version >= 11
                    ? function() {
                          var e,
                              r = this.__clipPaths,
                              n = this.style;
                          if (r)
                              for (var a = 0; a < r.length; a++) {
                                  var o = r[a],
                                      s = o && o.shape,
                                      l = o && o.type;
                                  if (
                                      s &&
                                      (("sector" === l &&
                                          s.startAngle === s.endAngle) ||
                                          ("rect" === l &&
                                              (!s.width || !s.height)))
                                  ) {
                                      for (var h = 0; h < i.length; h++)
                                          (i[h][2] = n[i[h][0]]),
                                              (n[i[h][0]] = i[h][1]);
                                      e = !0;
                                      break;
                                  }
                              }
                          if ((t.apply(this, arguments), e))
                              for (h = 0; h < i.length; h++)
                                  n[i[h][0]] = i[h][2];
                      }
                    : t;
            };
        },
        function(t, e, r) {
            var n = r(1).extend({
                type: "ring",
                shape: { cx: 0, cy: 0, r: 0, r0: 0 },
                buildPath: function(t, e) {
                    var r = e.cx,
                        n = e.cy,
                        i = 2 * Math.PI;
                    t.moveTo(r + e.r, n),
                        t.arc(r, n, e.r, 0, i, !1),
                        t.moveTo(r + e.r0, n),
                        t.arc(r, n, e.r0, 0, i, !0);
                },
            });
            t.exports = n;
        },
        function(t, e, r) {
            var n = r(1),
                i = r(27),
                a = n.extend({
                    type: "polygon",
                    shape: { points: null, smooth: !1, smoothConstraint: null },
                    buildPath: function(t, e) {
                        i.buildPath(t, e, !0);
                    },
                });
            t.exports = a;
        },
        function(t, e, r) {
            var n = r(2).distance;
            function i(t, e, r, n, i, a, o) {
                var s = 0.5 * (r - t),
                    l = 0.5 * (n - e);
                return (
                    (2 * (e - r) + s + l) * o +
                    (-3 * (e - r) - 2 * s - l) * a +
                    s * i +
                    e
                );
            }
            t.exports = function(t, e) {
                for (var r = t.length, a = [], o = 0, s = 1; s < r; s++)
                    o += n(t[s - 1], t[s]);
                var l = o / 2;
                for (l = l < r ? r : l, s = 0; s < l; s++) {
                    var h,
                        u,
                        c,
                        f = (s / (l - 1)) * (e ? r : r - 1),
                        d = Math.floor(f),
                        p = f - d,
                        v = t[d % r];
                    e
                        ? ((h = t[(d - 1 + r) % r]),
                          (u = t[(d + 1) % r]),
                          (c = t[(d + 2) % r]))
                        : ((h = t[0 === d ? d : d - 1]),
                          (u = t[d > r - 2 ? r - 1 : d + 1]),
                          (c = t[d > r - 3 ? r - 1 : d + 2]));
                    var g = p * p,
                        y = p * g;
                    a.push([
                        i(h[0], v[0], u[0], c[0], p, g, y),
                        i(h[1], v[1], u[1], c[1], p, g, y),
                    ]);
                }
                return a;
            };
        },
        function(t, e, r) {
            var n = r(2),
                i = n.min,
                a = n.max,
                o = n.scale,
                s = n.distance,
                l = n.add,
                h = n.clone,
                u = n.sub;
            t.exports = function(t, e, r, n) {
                var c,
                    f,
                    d,
                    p,
                    v = [],
                    g = [],
                    y = [],
                    m = [];
                if (n) {
                    (d = [1 / 0, 1 / 0]), (p = [-1 / 0, -1 / 0]);
                    for (var x = 0, _ = t.length; x < _; x++)
                        i(d, d, t[x]), a(p, p, t[x]);
                    i(d, d, n[0]), a(p, p, n[1]);
                }
                for (x = 0, _ = t.length; x < _; x++) {
                    var b = t[x];
                    if (r) (c = t[x ? x - 1 : _ - 1]), (f = t[(x + 1) % _]);
                    else {
                        if (0 === x || x === _ - 1) {
                            v.push(h(t[x]));
                            continue;
                        }
                        (c = t[x - 1]), (f = t[x + 1]);
                    }
                    u(g, f, c), o(g, g, e);
                    var w = s(b, c),
                        S = s(b, f),
                        T = w + S;
                    0 !== T && ((w /= T), (S /= T)), o(y, g, -w), o(m, g, S);
                    var P = l([], b, y),
                        M = l([], b, m);
                    n && (a(P, P, d), i(P, P, p), a(M, M, d), i(M, M, p)),
                        v.push(P),
                        v.push(M);
                }
                return r && v.push(v.shift()), v;
            };
        },
        function(t, e, r) {
            var n = r(1),
                i = r(27),
                a = n.extend({
                    type: "polyline",
                    shape: { points: null, smooth: !1, smoothConstraint: null },
                    style: { stroke: "#000", fill: null },
                    buildPath: function(t, e) {
                        i.buildPath(t, e, !1);
                    },
                });
            t.exports = a;
        },
        function(t, e, r) {
            var n = r(1),
                i = r(25),
                a = r(13).subPixelOptimizeRect,
                o = {},
                s = n.extend({
                    type: "rect",
                    shape: { r: 0, x: 0, y: 0, width: 0, height: 0 },
                    buildPath: function(t, e) {
                        var r, n, s, l;
                        this.subPixelOptimize
                            ? (a(o, e, this.style),
                              (r = o.x),
                              (n = o.y),
                              (s = o.width),
                              (l = o.height),
                              (o.r = e.r),
                              (e = o))
                            : ((r = e.x),
                              (n = e.y),
                              (s = e.width),
                              (l = e.height)),
                            e.r ? i.buildPath(t, e) : t.rect(r, n, s, l),
                            t.closePath();
                    },
                });
            t.exports = s;
        },
        function(t, e, r) {
            var n = r(1),
                i = r(13).subPixelOptimizeLine,
                a = {},
                o = n.extend({
                    type: "line",
                    shape: { x1: 0, y1: 0, x2: 0, y2: 0, percent: 1 },
                    style: { stroke: "#000", fill: null },
                    buildPath: function(t, e) {
                        var r, n, o, s;
                        this.subPixelOptimize
                            ? (i(a, e, this.style),
                              (r = a.x1),
                              (n = a.y1),
                              (o = a.x2),
                              (s = a.y2))
                            : ((r = e.x1), (n = e.y1), (o = e.x2), (s = e.y2));
                        var l = e.percent;
                        0 !== l &&
                            (t.moveTo(r, n),
                            l < 1 &&
                                ((o = r * (1 - l) + o * l),
                                (s = n * (1 - l) + s * l)),
                            t.lineTo(o, s));
                    },
                    pointAt: function(t) {
                        var e = this.shape;
                        return [
                            e.x1 * (1 - t) + e.x2 * t,
                            e.y1 * (1 - t) + e.y2 * t,
                        ];
                    },
                });
            t.exports = o;
        },
        function(t, e, r) {
            var n = r(1),
                i = r(2),
                a = r(4),
                o = a.quadraticSubdivide,
                s = a.cubicSubdivide,
                l = a.quadraticAt,
                h = a.cubicAt,
                u = a.quadraticDerivativeAt,
                c = a.cubicDerivativeAt,
                f = [];
            function d(t, e, r) {
                var n = t.cpx2,
                    i = t.cpy2;
                return null === n || null === i
                    ? [
                          (r ? c : h)(t.x1, t.cpx1, t.cpx2, t.x2, e),
                          (r ? c : h)(t.y1, t.cpy1, t.cpy2, t.y2, e),
                      ]
                    : [
                          (r ? u : l)(t.x1, t.cpx1, t.x2, e),
                          (r ? u : l)(t.y1, t.cpy1, t.y2, e),
                      ];
            }
            var p = n.extend({
                type: "bezier-curve",
                shape: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0,
                    cpx1: 0,
                    cpy1: 0,
                    percent: 1,
                },
                style: { stroke: "#000", fill: null },
                buildPath: function(t, e) {
                    var r = e.x1,
                        n = e.y1,
                        i = e.x2,
                        a = e.y2,
                        l = e.cpx1,
                        h = e.cpy1,
                        u = e.cpx2,
                        c = e.cpy2,
                        d = e.percent;
                    0 !== d &&
                        (t.moveTo(r, n),
                        null == u || null == c
                            ? (d < 1 &&
                                  (o(r, l, i, d, f),
                                  (l = f[1]),
                                  (i = f[2]),
                                  o(n, h, a, d, f),
                                  (h = f[1]),
                                  (a = f[2])),
                              t.quadraticCurveTo(l, h, i, a))
                            : (d < 1 &&
                                  (s(r, l, u, i, d, f),
                                  (l = f[1]),
                                  (u = f[2]),
                                  (i = f[3]),
                                  s(n, h, c, a, d, f),
                                  (h = f[1]),
                                  (c = f[2]),
                                  (a = f[3])),
                              t.bezierCurveTo(l, h, u, c, i, a)));
                },
                pointAt: function(t) {
                    return d(this.shape, t, !1);
                },
                tangentAt: function(t) {
                    var e = d(this.shape, t, !0);
                    return i.normalize(e, e);
                },
            });
            t.exports = p;
        },
        function(t, e, r) {
            var n = r(1).extend({
                type: "arc",
                shape: {
                    cx: 0,
                    cy: 0,
                    r: 0,
                    startAngle: 0,
                    endAngle: 2 * Math.PI,
                    clockwise: !0,
                },
                style: { stroke: "#000", fill: null },
                buildPath: function(t, e) {
                    var r = e.cx,
                        n = e.cy,
                        i = Math.max(e.r, 0),
                        a = e.startAngle,
                        o = e.endAngle,
                        s = e.clockwise,
                        l = Math.cos(a),
                        h = Math.sin(a);
                    t.moveTo(l * i + r, h * i + n), t.arc(r, n, i, a, o, !s);
                },
            });
            t.exports = n;
        },
        function(t, e, r) {
            var n = r(1),
                i = n.extend({
                    type: "compound",
                    shape: { paths: null },
                    _updatePathDirty: function() {
                        for (
                            var t = this.__dirtyPath,
                                e = this.shape.paths,
                                r = 0;
                            r < e.length;
                            r++
                        )
                            t = t || e[r].__dirtyPath;
                        (this.__dirtyPath = t),
                            (this.__dirty = this.__dirty || t);
                    },
                    beforeBrush: function() {
                        this._updatePathDirty();
                        for (
                            var t = this.shape.paths || [],
                                e = this.getGlobalScale(),
                                r = 0;
                            r < t.length;
                            r++
                        )
                            t[r].path || t[r].createPathProxy(),
                                t[r].path.setScale(
                                    e[0],
                                    e[1],
                                    t[r].segmentIgnoreThreshold
                                );
                    },
                    buildPath: function(t, e) {
                        for (var r = e.paths || [], n = 0; n < r.length; n++)
                            r[n].buildPath(t, r[n].shape, !0);
                    },
                    afterBrush: function() {
                        for (
                            var t = this.shape.paths || [], e = 0;
                            e < t.length;
                            e++
                        )
                            t[e].__dirtyPath = !1;
                    },
                    getBoundingRect: function() {
                        return (
                            this._updatePathDirty(),
                            n.prototype.getBoundingRect.call(this)
                        );
                    },
                });
            t.exports = i;
        },
        function(t, e, r) {
            var n = r(0),
                i = r(28),
                a = function(t, e, r, n, a, o) {
                    (this.x = null == t ? 0 : t),
                        (this.y = null == e ? 0 : e),
                        (this.x2 = null == r ? 1 : r),
                        (this.y2 = null == n ? 0 : n),
                        (this.type = "linear"),
                        (this.global = o || !1),
                        i.call(this, a);
                };
            (a.prototype = { constructor: a }), n.inherits(a, i);
            var o = a;
            t.exports = o;
        },
        function(t, e, r) {
            var n = r(0),
                i = r(28),
                a = function(t, e, r, n, a) {
                    (this.x = null == t ? 0.5 : t),
                        (this.y = null == e ? 0.5 : e),
                        (this.r = null == r ? 0.5 : r),
                        (this.type = "radial"),
                        (this.global = a || !1),
                        i.call(this, n);
                };
            (a.prototype = { constructor: a }), n.inherits(a, i);
            var o = a;
            t.exports = o;
        },
        function(t, e, r) {
            var n = r(0).inherits,
                i = r(6),
                a = r(3);
            function o(t) {
                i.call(this, t),
                    (this._displayables = []),
                    (this._temporaryDisplayables = []),
                    (this._cursor = 0),
                    (this.notClear = !0);
            }
            (o.prototype.incremental = !0),
                (o.prototype.clearDisplaybles = function() {
                    (this._displayables = []),
                        (this._temporaryDisplayables = []),
                        (this._cursor = 0),
                        this.dirty(),
                        (this.notClear = !1);
                }),
                (o.prototype.addDisplayable = function(t, e) {
                    e
                        ? this._temporaryDisplayables.push(t)
                        : this._displayables.push(t),
                        this.dirty();
                }),
                (o.prototype.addDisplayables = function(t, e) {
                    e = e || !1;
                    for (var r = 0; r < t.length; r++)
                        this.addDisplayable(t[r], e);
                }),
                (o.prototype.eachPendingDisplayable = function(t) {
                    for (
                        var e = this._cursor;
                        e < this._displayables.length;
                        e++
                    )
                        t && t(this._displayables[e]);
                    for (e = 0; e < this._temporaryDisplayables.length; e++)
                        t && t(this._temporaryDisplayables[e]);
                }),
                (o.prototype.update = function() {
                    this.updateTransform();
                    for (
                        var t = this._cursor;
                        t < this._displayables.length;
                        t++
                    ) {
                        ((e = this._displayables[t]).parent = this),
                            e.update(),
                            (e.parent = null);
                    }
                    for (t = 0; t < this._temporaryDisplayables.length; t++) {
                        var e;
                        ((e = this._temporaryDisplayables[t]).parent = this),
                            e.update(),
                            (e.parent = null);
                    }
                }),
                (o.prototype.brush = function(t, e) {
                    for (
                        var r = this._cursor;
                        r < this._displayables.length;
                        r++
                    ) {
                        (n = this._displayables[r]).beforeBrush &&
                            n.beforeBrush(t),
                            n.brush(
                                t,
                                r === this._cursor
                                    ? null
                                    : this._displayables[r - 1]
                            ),
                            n.afterBrush && n.afterBrush(t);
                    }
                    this._cursor = r;
                    for (r = 0; r < this._temporaryDisplayables.length; r++) {
                        var n;
                        (n = this._temporaryDisplayables[r]).beforeBrush &&
                            n.beforeBrush(t),
                            n.brush(
                                t,
                                0 === r
                                    ? null
                                    : this._temporaryDisplayables[r - 1]
                            ),
                            n.afterBrush && n.afterBrush(t);
                    }
                    (this._temporaryDisplayables = []), (this.notClear = !0);
                });
            var s = [];
            (o.prototype.getBoundingRect = function() {
                if (!this._rect) {
                    for (
                        var t = new a(1 / 0, 1 / 0, -1 / 0, -1 / 0), e = 0;
                        e < this._displayables.length;
                        e++
                    ) {
                        var r = this._displayables[e],
                            n = r.getBoundingRect().clone();
                        r.needLocalTransform() &&
                            n.applyTransform(r.getLocalTransform(s)),
                            t.union(n);
                    }
                    this._rect = t;
                }
                return this._rect;
            }),
                (o.prototype.contain = function(t, e) {
                    var r = this.transformCoordToLocal(t, e);
                    if (this.getBoundingRect().contain(r[0], r[1]))
                        for (var n = 0; n < this._displayables.length; n++) {
                            if (this._displayables[n].contain(t, e)) return !0;
                        }
                    return !1;
                }),
                n(o, i);
            var l = o;
            t.exports = l;
        },
        function(t, e, r) {
            var n = r(5);
            function i(t, e, r, n) {
                return 0 === e
                    ? [
                          [t + (0.5 * r) / Math.PI / 2, n / 2],
                          [t + (0.5 * r) / Math.PI, n],
                          [t + r / 4, n],
                      ]
                    : 1 === e
                    ? [
                          [t + ((0.5 * r) / Math.PI / 2) * (Math.PI - 2), n],
                          [
                              t + ((0.5 * r) / Math.PI / 2) * (Math.PI - 1),
                              n / 2,
                          ],
                          [t + r / 4, 0],
                      ]
                    : 2 === e
                    ? [
                          [t + (0.5 * r) / Math.PI / 2, -n / 2],
                          [t + (0.5 * r) / Math.PI, -n],
                          [t + r / 4, -n],
                      ]
                    : [
                          [t + ((0.5 * r) / Math.PI / 2) * (Math.PI - 2), -n],
                          [
                              t + ((0.5 * r) / Math.PI / 2) * (Math.PI - 1),
                              -n / 2,
                          ],
                          [t + r / 4, 0],
                      ];
            }
            t.exports = n.graphic.extendShape({
                type: "ec-liquid-fill",
                shape: {
                    waveLength: 0,
                    radius: 0,
                    radiusY: 0,
                    cx: 0,
                    cy: 0,
                    waterLevel: 0,
                    amplitude: 0,
                    phase: 0,
                    inverse: !1,
                },
                buildPath: function(t, e) {
                    null == e.radiusY && (e.radiusY = e.radius);
                    for (
                        var r = Math.max(
                            2 * Math.ceil(((2 * e.radius) / e.waveLength) * 4),
                            8
                        );
                        e.phase < 2 * -Math.PI;

                    )
                        e.phase += 2 * Math.PI;
                    for (; e.phase > 0; ) e.phase -= 2 * Math.PI;
                    var n = (e.phase / Math.PI / 2) * e.waveLength,
                        a = e.cx - e.radius + n - 2 * e.radius;
                    t.moveTo(a, e.waterLevel);
                    for (var o = 0, s = 0; s < r; ++s) {
                        var l = s % 4,
                            h = i(
                                (s * e.waveLength) / 4,
                                l,
                                e.waveLength,
                                e.amplitude
                            );
                        t.bezierCurveTo(
                            h[0][0] + a,
                            -h[0][1] + e.waterLevel,
                            h[1][0] + a,
                            -h[1][1] + e.waterLevel,
                            h[2][0] + a,
                            -h[2][1] + e.waterLevel
                        ),
                            s === r - 1 && (o = h[2][0]);
                    }
                    e.inverse
                        ? (t.lineTo(o + a, e.cy - e.radiusY),
                          t.lineTo(a, e.cy - e.radiusY),
                          t.lineTo(a, e.waterLevel))
                        : (t.lineTo(o + a, e.cy + e.radiusY),
                          t.lineTo(a, e.cy + e.radiusY),
                          t.lineTo(a, e.waterLevel)),
                        t.closePath();
                },
            });
        },
        function(t, e, r) {
            var n = r(0).createHashMap;
            t.exports = function(t) {
                return {
                    getTargetSeries: function(e) {
                        var r = {},
                            i = n();
                        return (
                            e.eachSeriesByType(t, function(t) {
                                (t.__paletteScope = r), i.set(t.uid, t);
                            }),
                            i
                        );
                    },
                    reset: function(t, e) {
                        var r = t.getRawData(),
                            n = {},
                            i = t.getData();
                        i.each(function(t) {
                            var e = i.getRawIndex(t);
                            n[e] = t;
                        }),
                            r.each(function(e) {
                                var a,
                                    o = n[e],
                                    s =
                                        null != o &&
                                        i.getItemVisual(o, "color", !0),
                                    l =
                                        null != o &&
                                        i.getItemVisual(o, "borderColor", !0);
                                if (((s && l) || (a = r.getItemModel(e)), !s)) {
                                    var h =
                                        a.get("itemStyle.color") ||
                                        t.getColorFromPalette(
                                            r.getName(e) || e + "",
                                            t.__paletteScope,
                                            r.count()
                                        );
                                    null != o && i.setItemVisual(o, "color", h);
                                }
                                if (!l) {
                                    var u = a.get("itemStyle.borderColor");
                                    null != o &&
                                        i.setItemVisual(o, "borderColor", u);
                                }
                            });
                    },
                };
            };
        },
    ]);
});
//# sourceMappingURL=echarts-liquidfill.min.js.map
