"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [7056],
  {
    4457: (t, e, i) => {
      i.d(e, { y: () => r });
      var s = i(6015);
      function r(...t) {
        let e = s.useRef([]);
        return (
          (e.current = t.map((t) => s.useContext(t))),
          s.useMemo(
            () =>
              ({ children: i }) =>
                t.reduceRight(
                  (t, i, r) =>
                    s.createElement(i.Provider, {
                      value: e.current[r],
                      children: t,
                    }),
                  i
                ),
            []
          )
        );
      }
    },
    9165: (t, e, i) => {
      i.d(e, { E: () => a });
      var s = i(6015),
        r = i(8131);
      function a(t, e) {
        let i = (0, s.useRef)(t);
        (i.current = t),
          (0, s.useEffect)(
            () =>
              r.A.add(function () {
                for (var t = arguments.length, e = Array(t), s = 0; s < t; s++)
                  e[s] = arguments[s];
                i.current(...e);
              }, e),
            [JSON.stringify(e)]
          );
      }
    },
    8131: (t, e, i) => {
      i.d(e, { A: () => o });
      var s = 0,
        r = "undefined" != typeof window,
        a = r && window.requestAnimationFrame,
        h = r && window.cancelAnimationFrame,
        n = class {
          callbacks;
          fps;
          time;
          lastTickDate;
          constructor(t = Number.POSITIVE_INFINITY) {
            (this.callbacks = []),
              (this.fps = t),
              (this.time = 0),
              (this.lastTickDate = performance.now());
          }
          get executionTime() {
            return 1e3 / this.fps;
          }
          dispatch(t, e) {
            for (let i = 0; i < this.callbacks.length; i++)
              this.callbacks[i]?.callback(t, e);
          }
          raf(t, e) {
            if (((this.time += e), this.fps === Number.POSITIVE_INFINITY))
              this.dispatch(t, e);
            else if (this.time >= this.executionTime) {
              this.time = this.time % this.executionTime;
              let e = t - this.lastTickDate;
              (this.lastTickDate = t), this.dispatch(t, e);
            }
          }
          add({ callback: t, priority: e }) {
            "function" != typeof t &&
              console.error("Tempus.add: callback is not a function");
            let i = s++;
            return (
              this.callbacks.push({ callback: t, priority: e, uid: i }),
              this.callbacks.sort((t, e) => t.priority - e.priority),
              () => this.remove(i)
            );
          }
          remove(t) {
            this.callbacks = this.callbacks.filter(({ uid: e }) => t !== e);
          }
        },
        o = new (class {
          framerates;
          time;
          constructor() {
            if (
              ((this.framerates = {}),
              (this.time = r ? performance.now() : 0),
              !r)
            )
              return;
            requestAnimationFrame(this.raf);
          }
          add(t, { priority: e = 0, fps: i = Number.POSITIVE_INFINITY } = {}) {
            if (r && "number" == typeof i)
              return (
                this.framerates[i] || (this.framerates[i] = new n(i)),
                this.framerates[i].add({ callback: t, priority: e })
              );
          }
          raf = (t) => {
            if (!r) return;
            requestAnimationFrame(this.raf, !0);
            let e = t - this.time;
            for (let i of ((this.time = t), Object.values(this.framerates)))
              i.raf(t, e);
          };
          patch() {
            r &&
              ((window.requestAnimationFrame = (
                t,
                { priority: e = 0, fps: i = Number.POSITIVE_INFINITY } = {}
              ) =>
                t !== this.raf &&
                t.toString().includes("requestAnimationFrame(")
                  ? (t.__tempusPatched ||
                      ((t.__tempusPatched = !0),
                      (t.__tempusUnsubscribe = this.add(t, {
                        priority: e,
                        fps: i,
                      }))),
                    t.__tempusUnsubscribe)
                  : a(t)),
              (window.cancelAnimationFrame = (t) => {
                if ("function" == typeof t) {
                  t?.();
                  return;
                }
                return h(t);
              }));
          }
          unpatch() {
            r &&
              ((window.requestAnimationFrame = a),
              (window.cancelAnimationFrame = h));
          }
        })();
    },
    8183: (t, e, i) => {
      i.d(e, { q: () => n });
      var s = i(7429),
        r = i(9474),
        a = i(4753);
      class h extends a.B {
        constructor() {
          super(),
            (this.isCamera = !0),
            (this.type = "Camera"),
            (this.matrixWorldInverse = new r.k()),
            (this.projectionMatrix = new r.k()),
            (this.projectionMatrixInverse = new r.k()),
            (this.coordinateSystem = s.TdN);
        }
        copy(t, e) {
          return (
            super.copy(t, e),
            this.matrixWorldInverse.copy(t.matrixWorldInverse),
            this.projectionMatrix.copy(t.projectionMatrix),
            this.projectionMatrixInverse.copy(t.projectionMatrixInverse),
            (this.coordinateSystem = t.coordinateSystem),
            this
          );
        }
        getWorldDirection(t) {
          return super.getWorldDirection(t).negate();
        }
        updateMatrixWorld(t) {
          super.updateMatrixWorld(t),
            this.matrixWorldInverse.copy(this.matrixWorld).invert();
        }
        updateWorldMatrix(t, e) {
          super.updateWorldMatrix(t, e),
            this.matrixWorldInverse.copy(this.matrixWorld).invert();
        }
        clone() {
          return new this.constructor().copy(this);
        }
      }
      class n extends h {
        constructor(t = -1, e = 1, i = 1, s = -1, r = 0.1, a = 2e3) {
          super(),
            (this.isOrthographicCamera = !0),
            (this.type = "OrthographicCamera"),
            (this.zoom = 1),
            (this.view = null),
            (this.left = t),
            (this.right = e),
            (this.top = i),
            (this.bottom = s),
            (this.near = r),
            (this.far = a),
            this.updateProjectionMatrix();
        }
        copy(t, e) {
          return (
            super.copy(t, e),
            (this.left = t.left),
            (this.right = t.right),
            (this.top = t.top),
            (this.bottom = t.bottom),
            (this.near = t.near),
            (this.far = t.far),
            (this.zoom = t.zoom),
            (this.view = null === t.view ? null : Object.assign({}, t.view)),
            this
          );
        }
        setViewOffset(t, e, i, s, r, a) {
          null === this.view &&
            (this.view = {
              enabled: !0,
              fullWidth: 1,
              fullHeight: 1,
              offsetX: 0,
              offsetY: 0,
              width: 1,
              height: 1,
            }),
            (this.view.enabled = !0),
            (this.view.fullWidth = t),
            (this.view.fullHeight = e),
            (this.view.offsetX = i),
            (this.view.offsetY = s),
            (this.view.width = r),
            (this.view.height = a),
            this.updateProjectionMatrix();
        }
        clearViewOffset() {
          null !== this.view && (this.view.enabled = !1),
            this.updateProjectionMatrix();
        }
        updateProjectionMatrix() {
          let t = (this.right - this.left) / (2 * this.zoom),
            e = (this.top - this.bottom) / (2 * this.zoom),
            i = (this.right + this.left) / 2,
            s = (this.top + this.bottom) / 2,
            r = i - t,
            a = i + t,
            h = s + e,
            n = s - e;
          if (null !== this.view && this.view.enabled) {
            let t = (this.right - this.left) / this.view.fullWidth / this.zoom,
              e = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
            (r += t * this.view.offsetX),
              (a = r + t * this.view.width),
              (h -= e * this.view.offsetY),
              (n = h - e * this.view.height);
          }
          this.projectionMatrix.makeOrthographic(
            r,
            a,
            h,
            n,
            this.near,
            this.far,
            this.coordinateSystem
          ),
            this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
        }
        toJSON(t) {
          let e = super.toJSON(t);
          return (
            (e.object.zoom = this.zoom),
            (e.object.left = this.left),
            (e.object.right = this.right),
            (e.object.top = this.top),
            (e.object.bottom = this.bottom),
            (e.object.near = this.near),
            (e.object.far = this.far),
            null !== this.view &&
              (e.object.view = Object.assign({}, this.view)),
            e
          );
        }
      }
    },
    7429: (t, e, i) => {
      i.d(e, {
        $_I: () => f,
        GJx: () => d,
        GWd: () => M,
        KLL: () => _,
        NTi: () => a,
        OUM: () => g,
        OuU: () => o,
        RQf: () => b,
        TdN: () => P,
        UTZ: () => c,
        VVr: () => A,
        VxR: () => v,
        Zr2: () => S,
        agE: () => k,
        caT: () => u,
        er$: () => z,
        gO9: () => h,
        ghU: () => p,
        hB5: () => s,
        hsX: () => r,
        hxR: () => y,
        i7u: () => B,
        ie2: () => n,
        jf0: () => w,
        k6q: () => x,
        kTW: () => m,
        sKt: () => T,
        xSv: () => l,
      });
      let s = 0,
        r = 1,
        a = 1,
        h = 100,
        n = 204,
        o = 205,
        l = 3,
        u = 0,
        c = 300,
        d = 1e3,
        p = 1001,
        m = 1002,
        y = 1003,
        x = 1006,
        f = 1008,
        g = 1009,
        b = 1015,
        M = 1023,
        w = "",
        z = "srgb",
        S = "srgb-linear",
        v = "linear",
        _ = "srgb",
        A = 7680,
        T = 519,
        k = 35044,
        P = 2e3,
        B = 2001;
    },
    4644: (t, e, i) => {
      i.d(e, { TH: () => l, qt: () => d, A$: () => u, MW: () => c });
      var s = i(5117),
        r = i(453),
        a = i(8962),
        h = i(7429);
      let n = new s.P(),
        o = new r.I();
      class l {
        constructor(t, e, i = !1) {
          if (Array.isArray(t))
            throw TypeError(
              "THREE.BufferAttribute: array should be a Typed Array."
            );
          (this.isBufferAttribute = !0),
            (this.name = ""),
            (this.array = t),
            (this.itemSize = e),
            (this.count = void 0 !== t ? t.length / e : 0),
            (this.normalized = i),
            (this.usage = h.agE),
            (this.updateRanges = []),
            (this.gpuType = h.RQf),
            (this.version = 0);
        }
        onUploadCallback() {}
        set needsUpdate(t) {
          !0 === t && this.version++;
        }
        setUsage(t) {
          return (this.usage = t), this;
        }
        addUpdateRange(t, e) {
          this.updateRanges.push({ start: t, count: e });
        }
        clearUpdateRanges() {
          this.updateRanges.length = 0;
        }
        copy(t) {
          return (
            (this.name = t.name),
            (this.array = new t.array.constructor(t.array)),
            (this.itemSize = t.itemSize),
            (this.count = t.count),
            (this.normalized = t.normalized),
            (this.usage = t.usage),
            (this.gpuType = t.gpuType),
            this
          );
        }
        copyAt(t, e, i) {
          (t *= this.itemSize), (i *= e.itemSize);
          for (let s = 0, r = this.itemSize; s < r; s++)
            this.array[t + s] = e.array[i + s];
          return this;
        }
        copyArray(t) {
          return this.array.set(t), this;
        }
        applyMatrix3(t) {
          if (2 === this.itemSize)
            for (let e = 0, i = this.count; e < i; e++)
              o.fromBufferAttribute(this, e),
                o.applyMatrix3(t),
                this.setXY(e, o.x, o.y);
          else if (3 === this.itemSize)
            for (let e = 0, i = this.count; e < i; e++)
              n.fromBufferAttribute(this, e),
                n.applyMatrix3(t),
                this.setXYZ(e, n.x, n.y, n.z);
          return this;
        }
        applyMatrix4(t) {
          for (let e = 0, i = this.count; e < i; e++)
            n.fromBufferAttribute(this, e),
              n.applyMatrix4(t),
              this.setXYZ(e, n.x, n.y, n.z);
          return this;
        }
        applyNormalMatrix(t) {
          for (let e = 0, i = this.count; e < i; e++)
            n.fromBufferAttribute(this, e),
              n.applyNormalMatrix(t),
              this.setXYZ(e, n.x, n.y, n.z);
          return this;
        }
        transformDirection(t) {
          for (let e = 0, i = this.count; e < i; e++)
            n.fromBufferAttribute(this, e),
              n.transformDirection(t),
              this.setXYZ(e, n.x, n.y, n.z);
          return this;
        }
        set(t, e = 0) {
          return this.array.set(t, e), this;
        }
        getComponent(t, e) {
          let i = this.array[t * this.itemSize + e];
          return this.normalized && (i = (0, a.NU)(i, this.array)), i;
        }
        setComponent(t, e, i) {
          return (
            this.normalized && (i = (0, a.S8)(i, this.array)),
            (this.array[t * this.itemSize + e] = i),
            this
          );
        }
        getX(t) {
          let e = this.array[t * this.itemSize];
          return this.normalized && (e = (0, a.NU)(e, this.array)), e;
        }
        setX(t, e) {
          return (
            this.normalized && (e = (0, a.S8)(e, this.array)),
            (this.array[t * this.itemSize] = e),
            this
          );
        }
        getY(t) {
          let e = this.array[t * this.itemSize + 1];
          return this.normalized && (e = (0, a.NU)(e, this.array)), e;
        }
        setY(t, e) {
          return (
            this.normalized && (e = (0, a.S8)(e, this.array)),
            (this.array[t * this.itemSize + 1] = e),
            this
          );
        }
        getZ(t) {
          let e = this.array[t * this.itemSize + 2];
          return this.normalized && (e = (0, a.NU)(e, this.array)), e;
        }
        setZ(t, e) {
          return (
            this.normalized && (e = (0, a.S8)(e, this.array)),
            (this.array[t * this.itemSize + 2] = e),
            this
          );
        }
        getW(t) {
          let e = this.array[t * this.itemSize + 3];
          return this.normalized && (e = (0, a.NU)(e, this.array)), e;
        }
        setW(t, e) {
          return (
            this.normalized && (e = (0, a.S8)(e, this.array)),
            (this.array[t * this.itemSize + 3] = e),
            this
          );
        }
        setXY(t, e, i) {
          return (
            (t *= this.itemSize),
            this.normalized &&
              ((e = (0, a.S8)(e, this.array)), (i = (0, a.S8)(i, this.array))),
            (this.array[t + 0] = e),
            (this.array[t + 1] = i),
            this
          );
        }
        setXYZ(t, e, i, s) {
          return (
            (t *= this.itemSize),
            this.normalized &&
              ((e = (0, a.S8)(e, this.array)),
              (i = (0, a.S8)(i, this.array)),
              (s = (0, a.S8)(s, this.array))),
            (this.array[t + 0] = e),
            (this.array[t + 1] = i),
            (this.array[t + 2] = s),
            this
          );
        }
        setXYZW(t, e, i, s, r) {
          return (
            (t *= this.itemSize),
            this.normalized &&
              ((e = (0, a.S8)(e, this.array)),
              (i = (0, a.S8)(i, this.array)),
              (s = (0, a.S8)(s, this.array)),
              (r = (0, a.S8)(r, this.array))),
            (this.array[t + 0] = e),
            (this.array[t + 1] = i),
            (this.array[t + 2] = s),
            (this.array[t + 3] = r),
            this
          );
        }
        onUpload(t) {
          return (this.onUploadCallback = t), this;
        }
        clone() {
          return new this.constructor(this.array, this.itemSize).copy(this);
        }
        toJSON() {
          let t = {
            itemSize: this.itemSize,
            type: this.array.constructor.name,
            array: Array.from(this.array),
            normalized: this.normalized,
          };
          return (
            "" !== this.name && (t.name = this.name),
            this.usage !== h.agE && (t.usage = this.usage),
            t
          );
        }
      }
      class u extends l {
        constructor(t, e, i) {
          super(new Uint16Array(t), e, i);
        }
      }
      class c extends l {
        constructor(t, e, i) {
          super(new Uint32Array(t), e, i);
        }
      }
      class d extends l {
        constructor(t, e, i) {
          super(new Float32Array(t), e, i);
        }
      }
    },
    8274: (t, e, i) => {
      i.d(e, { L: () => w });
      var s = i(5117),
        r = i(453),
        a = i(7389),
        h = i(5901),
        n = i(4644),
        o = i(5426),
        l = i(4753),
        u = i(9474),
        c = i(5395),
        d = i(8962),
        p = i(7993);
      let m = 0,
        y = new u.k(),
        x = new l.B(),
        f = new s.P(),
        g = new a.N(),
        b = new a.N(),
        M = new s.P();
      class w extends h.Q {
        constructor() {
          super(),
            (this.isBufferGeometry = !0),
            Object.defineProperty(this, "id", { value: m++ }),
            (this.uuid = (0, d.lk)()),
            (this.name = ""),
            (this.type = "BufferGeometry"),
            (this.index = null),
            (this.indirect = null),
            (this.attributes = {}),
            (this.morphAttributes = {}),
            (this.morphTargetsRelative = !1),
            (this.groups = []),
            (this.boundingBox = null),
            (this.boundingSphere = null),
            (this.drawRange = { start: 0, count: 1 / 0 }),
            (this.userData = {});
        }
        getIndex() {
          return this.index;
        }
        setIndex(t) {
          return (
            Array.isArray(t)
              ? (this.index = new ((0, p.AQ)(t) ? n.MW : n.A$)(t, 1))
              : (this.index = t),
            this
          );
        }
        setIndirect(t) {
          return (this.indirect = t), this;
        }
        getIndirect() {
          return this.indirect;
        }
        getAttribute(t) {
          return this.attributes[t];
        }
        setAttribute(t, e) {
          return (this.attributes[t] = e), this;
        }
        deleteAttribute(t) {
          return delete this.attributes[t], this;
        }
        hasAttribute(t) {
          return void 0 !== this.attributes[t];
        }
        addGroup(t, e, i = 0) {
          this.groups.push({ start: t, count: e, materialIndex: i });
        }
        clearGroups() {
          this.groups = [];
        }
        setDrawRange(t, e) {
          (this.drawRange.start = t), (this.drawRange.count = e);
        }
        applyMatrix4(t) {
          let e = this.attributes.position;
          void 0 !== e && (e.applyMatrix4(t), (e.needsUpdate = !0));
          let i = this.attributes.normal;
          if (void 0 !== i) {
            let e = new c.d().getNormalMatrix(t);
            i.applyNormalMatrix(e), (i.needsUpdate = !0);
          }
          let s = this.attributes.tangent;
          return (
            void 0 !== s && (s.transformDirection(t), (s.needsUpdate = !0)),
            null !== this.boundingBox && this.computeBoundingBox(),
            null !== this.boundingSphere && this.computeBoundingSphere(),
            this
          );
        }
        applyQuaternion(t) {
          return y.makeRotationFromQuaternion(t), this.applyMatrix4(y), this;
        }
        rotateX(t) {
          return y.makeRotationX(t), this.applyMatrix4(y), this;
        }
        rotateY(t) {
          return y.makeRotationY(t), this.applyMatrix4(y), this;
        }
        rotateZ(t) {
          return y.makeRotationZ(t), this.applyMatrix4(y), this;
        }
        translate(t, e, i) {
          return y.makeTranslation(t, e, i), this.applyMatrix4(y), this;
        }
        scale(t, e, i) {
          return y.makeScale(t, e, i), this.applyMatrix4(y), this;
        }
        lookAt(t) {
          return (
            x.lookAt(t), x.updateMatrix(), this.applyMatrix4(x.matrix), this
          );
        }
        center() {
          return (
            this.computeBoundingBox(),
            this.boundingBox.getCenter(f).negate(),
            this.translate(f.x, f.y, f.z),
            this
          );
        }
        setFromPoints(t) {
          let e = this.getAttribute("position");
          if (void 0 === e) {
            let e = [];
            for (let i = 0, s = t.length; i < s; i++) {
              let s = t[i];
              e.push(s.x, s.y, s.z || 0);
            }
            this.setAttribute("position", new n.qt(e, 3));
          } else {
            let i = Math.min(t.length, e.count);
            for (let s = 0; s < i; s++) {
              let i = t[s];
              e.setXYZ(s, i.x, i.y, i.z || 0);
            }
            t.length > e.count &&
              console.warn(
                "THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."
              ),
              (e.needsUpdate = !0);
          }
          return this;
        }
        computeBoundingBox() {
          null === this.boundingBox && (this.boundingBox = new a.N());
          let t = this.attributes.position,
            e = this.morphAttributes.position;
          if (t && t.isGLBufferAttribute) {
            console.error(
              "THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",
              this
            ),
              this.boundingBox.set(
                new s.P(-1 / 0, -1 / 0, -1 / 0),
                new s.P(Infinity, Infinity, Infinity)
              );
            return;
          }
          if (void 0 !== t) {
            if ((this.boundingBox.setFromBufferAttribute(t), e))
              for (let t = 0, i = e.length; t < i; t++) {
                let i = e[t];
                g.setFromBufferAttribute(i),
                  this.morphTargetsRelative
                    ? (M.addVectors(this.boundingBox.min, g.min),
                      this.boundingBox.expandByPoint(M),
                      M.addVectors(this.boundingBox.max, g.max),
                      this.boundingBox.expandByPoint(M))
                    : (this.boundingBox.expandByPoint(g.min),
                      this.boundingBox.expandByPoint(g.max));
              }
          } else this.boundingBox.makeEmpty();
          (isNaN(this.boundingBox.min.x) ||
            isNaN(this.boundingBox.min.y) ||
            isNaN(this.boundingBox.min.z)) &&
            console.error(
              'THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
              this
            );
        }
        computeBoundingSphere() {
          null === this.boundingSphere && (this.boundingSphere = new o.i());
          let t = this.attributes.position,
            e = this.morphAttributes.position;
          if (t && t.isGLBufferAttribute) {
            console.error(
              "THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",
              this
            ),
              this.boundingSphere.set(new s.P(), 1 / 0);
            return;
          }
          if (t) {
            let i = this.boundingSphere.center;
            if ((g.setFromBufferAttribute(t), e))
              for (let t = 0, i = e.length; t < i; t++) {
                let i = e[t];
                b.setFromBufferAttribute(i),
                  this.morphTargetsRelative
                    ? (M.addVectors(g.min, b.min),
                      g.expandByPoint(M),
                      M.addVectors(g.max, b.max),
                      g.expandByPoint(M))
                    : (g.expandByPoint(b.min), g.expandByPoint(b.max));
              }
            g.getCenter(i);
            let s = 0;
            for (let e = 0, r = t.count; e < r; e++)
              M.fromBufferAttribute(t, e),
                (s = Math.max(s, i.distanceToSquared(M)));
            if (e)
              for (let r = 0, a = e.length; r < a; r++) {
                let a = e[r],
                  h = this.morphTargetsRelative;
                for (let e = 0, r = a.count; e < r; e++)
                  M.fromBufferAttribute(a, e),
                    h && (f.fromBufferAttribute(t, e), M.add(f)),
                    (s = Math.max(s, i.distanceToSquared(M)));
              }
            (this.boundingSphere.radius = Math.sqrt(s)),
              isNaN(this.boundingSphere.radius) &&
                console.error(
                  'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
                  this
                );
          }
        }
        computeTangents() {
          let t = this.index,
            e = this.attributes;
          if (
            null === t ||
            void 0 === e.position ||
            void 0 === e.normal ||
            void 0 === e.uv
          ) {
            console.error(
              "THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)"
            );
            return;
          }
          let i = e.position,
            a = e.normal,
            h = e.uv;
          !1 === this.hasAttribute("tangent") &&
            this.setAttribute(
              "tangent",
              new n.TH(new Float32Array(4 * i.count), 4)
            );
          let o = this.getAttribute("tangent"),
            l = [],
            u = [];
          for (let t = 0; t < i.count; t++)
            (l[t] = new s.P()), (u[t] = new s.P());
          let c = new s.P(),
            d = new s.P(),
            p = new s.P(),
            m = new r.I(),
            y = new r.I(),
            x = new r.I(),
            f = new s.P(),
            g = new s.P(),
            b = this.groups;
          0 === b.length && (b = [{ start: 0, count: t.count }]);
          for (let e = 0, s = b.length; e < s; ++e) {
            let s = b[e],
              r = s.start,
              a = s.count;
            for (let e = r, s = r + a; e < s; e += 3)
              !(function (t, e, s) {
                c.fromBufferAttribute(i, t),
                  d.fromBufferAttribute(i, e),
                  p.fromBufferAttribute(i, s),
                  m.fromBufferAttribute(h, t),
                  y.fromBufferAttribute(h, e),
                  x.fromBufferAttribute(h, s),
                  d.sub(c),
                  p.sub(c),
                  y.sub(m),
                  x.sub(m);
                let r = 1 / (y.x * x.y - x.x * y.y);
                isFinite(r) &&
                  (f
                    .copy(d)
                    .multiplyScalar(x.y)
                    .addScaledVector(p, -y.y)
                    .multiplyScalar(r),
                  g
                    .copy(p)
                    .multiplyScalar(y.x)
                    .addScaledVector(d, -x.x)
                    .multiplyScalar(r),
                  l[t].add(f),
                  l[e].add(f),
                  l[s].add(f),
                  u[t].add(g),
                  u[e].add(g),
                  u[s].add(g));
              })(t.getX(e + 0), t.getX(e + 1), t.getX(e + 2));
          }
          let M = new s.P(),
            w = new s.P(),
            z = new s.P(),
            S = new s.P();
          function v(t) {
            z.fromBufferAttribute(a, t), S.copy(z);
            let e = l[t];
            M.copy(e),
              M.sub(z.multiplyScalar(z.dot(e))).normalize(),
              w.crossVectors(S, e);
            let i = w.dot(u[t]);
            o.setXYZW(t, M.x, M.y, M.z, i < 0 ? -1 : 1);
          }
          for (let e = 0, i = b.length; e < i; ++e) {
            let i = b[e],
              s = i.start,
              r = i.count;
            for (let e = s, i = s + r; e < i; e += 3)
              v(t.getX(e + 0)), v(t.getX(e + 1)), v(t.getX(e + 2));
          }
        }
        computeVertexNormals() {
          let t = this.index,
            e = this.getAttribute("position");
          if (void 0 !== e) {
            let i = this.getAttribute("normal");
            if (void 0 === i)
              (i = new n.TH(new Float32Array(3 * e.count), 3)),
                this.setAttribute("normal", i);
            else for (let t = 0, e = i.count; t < e; t++) i.setXYZ(t, 0, 0, 0);
            let r = new s.P(),
              a = new s.P(),
              h = new s.P(),
              o = new s.P(),
              l = new s.P(),
              u = new s.P(),
              c = new s.P(),
              d = new s.P();
            if (t)
              for (let s = 0, n = t.count; s < n; s += 3) {
                let n = t.getX(s + 0),
                  p = t.getX(s + 1),
                  m = t.getX(s + 2);
                r.fromBufferAttribute(e, n),
                  a.fromBufferAttribute(e, p),
                  h.fromBufferAttribute(e, m),
                  c.subVectors(h, a),
                  d.subVectors(r, a),
                  c.cross(d),
                  o.fromBufferAttribute(i, n),
                  l.fromBufferAttribute(i, p),
                  u.fromBufferAttribute(i, m),
                  o.add(c),
                  l.add(c),
                  u.add(c),
                  i.setXYZ(n, o.x, o.y, o.z),
                  i.setXYZ(p, l.x, l.y, l.z),
                  i.setXYZ(m, u.x, u.y, u.z);
              }
            else
              for (let t = 0, s = e.count; t < s; t += 3)
                r.fromBufferAttribute(e, t + 0),
                  a.fromBufferAttribute(e, t + 1),
                  h.fromBufferAttribute(e, t + 2),
                  c.subVectors(h, a),
                  d.subVectors(r, a),
                  c.cross(d),
                  i.setXYZ(t + 0, c.x, c.y, c.z),
                  i.setXYZ(t + 1, c.x, c.y, c.z),
                  i.setXYZ(t + 2, c.x, c.y, c.z);
            this.normalizeNormals(), (i.needsUpdate = !0);
          }
        }
        normalizeNormals() {
          let t = this.attributes.normal;
          for (let e = 0, i = t.count; e < i; e++)
            M.fromBufferAttribute(t, e),
              M.normalize(),
              t.setXYZ(e, M.x, M.y, M.z);
        }
        toNonIndexed() {
          function t(t, e) {
            let i = t.array,
              s = t.itemSize,
              r = t.normalized,
              a = new i.constructor(e.length * s),
              h = 0,
              o = 0;
            for (let r = 0, n = e.length; r < n; r++) {
              h = t.isInterleavedBufferAttribute
                ? e[r] * t.data.stride + t.offset
                : e[r] * s;
              for (let t = 0; t < s; t++) a[o++] = i[h++];
            }
            return new n.TH(a, s, r);
          }
          if (null === this.index)
            return (
              console.warn(
                "THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."
              ),
              this
            );
          let e = new w(),
            i = this.index.array,
            s = this.attributes;
          for (let r in s) {
            let a = t(s[r], i);
            e.setAttribute(r, a);
          }
          let r = this.morphAttributes;
          for (let s in r) {
            let a = [],
              h = r[s];
            for (let e = 0, s = h.length; e < s; e++) {
              let s = t(h[e], i);
              a.push(s);
            }
            e.morphAttributes[s] = a;
          }
          e.morphTargetsRelative = this.morphTargetsRelative;
          let a = this.groups;
          for (let t = 0, i = a.length; t < i; t++) {
            let i = a[t];
            e.addGroup(i.start, i.count, i.materialIndex);
          }
          return e;
        }
        toJSON() {
          let t = {
            metadata: {
              version: 4.6,
              type: "BufferGeometry",
              generator: "BufferGeometry.toJSON",
            },
          };
          if (
            ((t.uuid = this.uuid),
            (t.type = this.type),
            "" !== this.name && (t.name = this.name),
            Object.keys(this.userData).length > 0 &&
              (t.userData = this.userData),
            void 0 !== this.parameters)
          ) {
            let e = this.parameters;
            for (let i in e) void 0 !== e[i] && (t[i] = e[i]);
            return t;
          }
          t.data = { attributes: {} };
          let e = this.index;
          null !== e &&
            (t.data.index = {
              type: e.array.constructor.name,
              array: Array.prototype.slice.call(e.array),
            });
          let i = this.attributes;
          for (let e in i) {
            let s = i[e];
            t.data.attributes[e] = s.toJSON(t.data);
          }
          let s = {},
            r = !1;
          for (let e in this.morphAttributes) {
            let i = this.morphAttributes[e],
              a = [];
            for (let e = 0, s = i.length; e < s; e++) {
              let s = i[e];
              a.push(s.toJSON(t.data));
            }
            a.length > 0 && ((s[e] = a), (r = !0));
          }
          r &&
            ((t.data.morphAttributes = s),
            (t.data.morphTargetsRelative = this.morphTargetsRelative));
          let a = this.groups;
          a.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(a)));
          let h = this.boundingSphere;
          return (
            null !== h &&
              (t.data.boundingSphere = {
                center: h.center.toArray(),
                radius: h.radius,
              }),
            t
          );
        }
        clone() {
          return new this.constructor().copy(this);
        }
        copy(t) {
          (this.index = null),
            (this.attributes = {}),
            (this.morphAttributes = {}),
            (this.groups = []),
            (this.boundingBox = null),
            (this.boundingSphere = null);
          let e = {};
          this.name = t.name;
          let i = t.index;
          null !== i && this.setIndex(i.clone(e));
          let s = t.attributes;
          for (let t in s) {
            let i = s[t];
            this.setAttribute(t, i.clone(e));
          }
          let r = t.morphAttributes;
          for (let t in r) {
            let i = [],
              s = r[t];
            for (let t = 0, r = s.length; t < r; t++) i.push(s[t].clone(e));
            this.morphAttributes[t] = i;
          }
          this.morphTargetsRelative = t.morphTargetsRelative;
          let a = t.groups;
          for (let t = 0, e = a.length; t < e; t++) {
            let e = a[t];
            this.addGroup(e.start, e.count, e.materialIndex);
          }
          let h = t.boundingBox;
          null !== h && (this.boundingBox = h.clone());
          let n = t.boundingSphere;
          return (
            null !== n && (this.boundingSphere = n.clone()),
            (this.drawRange.start = t.drawRange.start),
            (this.drawRange.count = t.drawRange.count),
            (this.userData = t.userData),
            this
          );
        }
        dispose() {
          this.dispatchEvent({ type: "dispose" });
        }
      }
    },
    5901: (t, e, i) => {
      i.d(e, { Q: () => s });
      class s {
        addEventListener(t, e) {
          void 0 === this._listeners && (this._listeners = {});
          let i = this._listeners;
          void 0 === i[t] && (i[t] = []),
            -1 === i[t].indexOf(e) && i[t].push(e);
        }
        hasEventListener(t, e) {
          if (void 0 === this._listeners) return !1;
          let i = this._listeners;
          return void 0 !== i[t] && -1 !== i[t].indexOf(e);
        }
        removeEventListener(t, e) {
          if (void 0 === this._listeners) return;
          let i = this._listeners[t];
          if (void 0 !== i) {
            let t = i.indexOf(e);
            -1 !== t && i.splice(t, 1);
          }
        }
        dispatchEvent(t) {
          if (void 0 === this._listeners) return;
          let e = this._listeners[t.type];
          if (void 0 !== e) {
            t.target = this;
            let i = e.slice(0);
            for (let e = 0, s = i.length; e < s; e++) i[e].call(this, t);
            t.target = null;
          }
        }
      }
    },
    4753: (t, e, i) => {
      i.d(e, { B: () => A });
      var s = i(5531),
        r = i(5117),
        a = i(9474),
        h = i(5901),
        n = i(168);
      class o {
        constructor() {
          this.mask = 1;
        }
        set(t) {
          this.mask = ((1 << t) | 0) >>> 0;
        }
        enable(t) {
          this.mask |= (1 << t) | 0;
        }
        enableAll() {
          this.mask = -1;
        }
        toggle(t) {
          this.mask ^= (1 << t) | 0;
        }
        disable(t) {
          this.mask &= ~((1 << t) | 0);
        }
        disableAll() {
          this.mask = 0;
        }
        test(t) {
          return (this.mask & t.mask) != 0;
        }
        isEnabled(t) {
          return (this.mask & ((1 << t) | 0)) != 0;
        }
      }
      var l = i(5395),
        u = i(8962);
      let c = 0,
        d = new r.P(),
        p = new s.P(),
        m = new a.k(),
        y = new r.P(),
        x = new r.P(),
        f = new r.P(),
        g = new s.P(),
        b = new r.P(1, 0, 0),
        M = new r.P(0, 1, 0),
        w = new r.P(0, 0, 1),
        z = { type: "added" },
        S = { type: "removed" },
        v = { type: "childadded", child: null },
        _ = { type: "childremoved", child: null };
      class A extends h.Q {
        constructor() {
          super(),
            (this.isObject3D = !0),
            Object.defineProperty(this, "id", { value: c++ }),
            (this.uuid = (0, u.lk)()),
            (this.name = ""),
            (this.type = "Object3D"),
            (this.parent = null),
            (this.children = []),
            (this.up = A.DEFAULT_UP.clone());
          let t = new r.P(),
            e = new n.O(),
            i = new s.P(),
            h = new r.P(1, 1, 1);
          e._onChange(function () {
            i.setFromEuler(e, !1);
          }),
            i._onChange(function () {
              e.setFromQuaternion(i, void 0, !1);
            }),
            Object.defineProperties(this, {
              position: { configurable: !0, enumerable: !0, value: t },
              rotation: { configurable: !0, enumerable: !0, value: e },
              quaternion: { configurable: !0, enumerable: !0, value: i },
              scale: { configurable: !0, enumerable: !0, value: h },
              modelViewMatrix: { value: new a.k() },
              normalMatrix: { value: new l.d() },
            }),
            (this.matrix = new a.k()),
            (this.matrixWorld = new a.k()),
            (this.matrixAutoUpdate = A.DEFAULT_MATRIX_AUTO_UPDATE),
            (this.matrixWorldAutoUpdate = A.DEFAULT_MATRIX_WORLD_AUTO_UPDATE),
            (this.matrixWorldNeedsUpdate = !1),
            (this.layers = new o()),
            (this.visible = !0),
            (this.castShadow = !1),
            (this.receiveShadow = !1),
            (this.frustumCulled = !0),
            (this.renderOrder = 0),
            (this.animations = []),
            (this.userData = {});
        }
        onBeforeShadow() {}
        onAfterShadow() {}
        onBeforeRender() {}
        onAfterRender() {}
        applyMatrix4(t) {
          this.matrixAutoUpdate && this.updateMatrix(),
            this.matrix.premultiply(t),
            this.matrix.decompose(this.position, this.quaternion, this.scale);
        }
        applyQuaternion(t) {
          return this.quaternion.premultiply(t), this;
        }
        setRotationFromAxisAngle(t, e) {
          this.quaternion.setFromAxisAngle(t, e);
        }
        setRotationFromEuler(t) {
          this.quaternion.setFromEuler(t, !0);
        }
        setRotationFromMatrix(t) {
          this.quaternion.setFromRotationMatrix(t);
        }
        setRotationFromQuaternion(t) {
          this.quaternion.copy(t);
        }
        rotateOnAxis(t, e) {
          return p.setFromAxisAngle(t, e), this.quaternion.multiply(p), this;
        }
        rotateOnWorldAxis(t, e) {
          return p.setFromAxisAngle(t, e), this.quaternion.premultiply(p), this;
        }
        rotateX(t) {
          return this.rotateOnAxis(b, t);
        }
        rotateY(t) {
          return this.rotateOnAxis(M, t);
        }
        rotateZ(t) {
          return this.rotateOnAxis(w, t);
        }
        translateOnAxis(t, e) {
          return (
            d.copy(t).applyQuaternion(this.quaternion),
            this.position.add(d.multiplyScalar(e)),
            this
          );
        }
        translateX(t) {
          return this.translateOnAxis(b, t);
        }
        translateY(t) {
          return this.translateOnAxis(M, t);
        }
        translateZ(t) {
          return this.translateOnAxis(w, t);
        }
        localToWorld(t) {
          return (
            this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld)
          );
        }
        worldToLocal(t) {
          return (
            this.updateWorldMatrix(!0, !1),
            t.applyMatrix4(m.copy(this.matrixWorld).invert())
          );
        }
        lookAt(t, e, i) {
          t.isVector3 ? y.copy(t) : y.set(t, e, i);
          let s = this.parent;
          this.updateWorldMatrix(!0, !1),
            x.setFromMatrixPosition(this.matrixWorld),
            this.isCamera || this.isLight
              ? m.lookAt(x, y, this.up)
              : m.lookAt(y, x, this.up),
            this.quaternion.setFromRotationMatrix(m),
            s &&
              (m.extractRotation(s.matrixWorld),
              p.setFromRotationMatrix(m),
              this.quaternion.premultiply(p.invert()));
        }
        add(t) {
          if (arguments.length > 1) {
            for (let t = 0; t < arguments.length; t++) this.add(arguments[t]);
            return this;
          }
          return (
            t === this
              ? console.error(
                  "THREE.Object3D.add: object can't be added as a child of itself.",
                  t
                )
              : t && t.isObject3D
              ? (t.removeFromParent(),
                (t.parent = this),
                this.children.push(t),
                t.dispatchEvent(z),
                (v.child = t),
                this.dispatchEvent(v),
                (v.child = null))
              : console.error(
                  "THREE.Object3D.add: object not an instance of THREE.Object3D.",
                  t
                ),
            this
          );
        }
        remove(t) {
          if (arguments.length > 1) {
            for (let t = 0; t < arguments.length; t++)
              this.remove(arguments[t]);
            return this;
          }
          let e = this.children.indexOf(t);
          return (
            -1 !== e &&
              ((t.parent = null),
              this.children.splice(e, 1),
              t.dispatchEvent(S),
              (_.child = t),
              this.dispatchEvent(_),
              (_.child = null)),
            this
          );
        }
        removeFromParent() {
          let t = this.parent;
          return null !== t && t.remove(this), this;
        }
        clear() {
          return this.remove(...this.children);
        }
        attach(t) {
          return (
            this.updateWorldMatrix(!0, !1),
            m.copy(this.matrixWorld).invert(),
            null !== t.parent &&
              (t.parent.updateWorldMatrix(!0, !1),
              m.multiply(t.parent.matrixWorld)),
            t.applyMatrix4(m),
            t.removeFromParent(),
            (t.parent = this),
            this.children.push(t),
            t.updateWorldMatrix(!1, !0),
            t.dispatchEvent(z),
            (v.child = t),
            this.dispatchEvent(v),
            (v.child = null),
            this
          );
        }
        getObjectById(t) {
          return this.getObjectByProperty("id", t);
        }
        getObjectByName(t) {
          return this.getObjectByProperty("name", t);
        }
        getObjectByProperty(t, e) {
          if (this[t] === e) return this;
          for (let i = 0, s = this.children.length; i < s; i++) {
            let s = this.children[i].getObjectByProperty(t, e);
            if (void 0 !== s) return s;
          }
        }
        getObjectsByProperty(t, e, i = []) {
          this[t] === e && i.push(this);
          let s = this.children;
          for (let r = 0, a = s.length; r < a; r++)
            s[r].getObjectsByProperty(t, e, i);
          return i;
        }
        getWorldPosition(t) {
          return (
            this.updateWorldMatrix(!0, !1),
            t.setFromMatrixPosition(this.matrixWorld)
          );
        }
        getWorldQuaternion(t) {
          return (
            this.updateWorldMatrix(!0, !1),
            this.matrixWorld.decompose(x, t, f),
            t
          );
        }
        getWorldScale(t) {
          return (
            this.updateWorldMatrix(!0, !1),
            this.matrixWorld.decompose(x, g, t),
            t
          );
        }
        getWorldDirection(t) {
          this.updateWorldMatrix(!0, !1);
          let e = this.matrixWorld.elements;
          return t.set(e[8], e[9], e[10]).normalize();
        }
        raycast() {}
        traverse(t) {
          t(this);
          let e = this.children;
          for (let i = 0, s = e.length; i < s; i++) e[i].traverse(t);
        }
        traverseVisible(t) {
          if (!1 === this.visible) return;
          t(this);
          let e = this.children;
          for (let i = 0, s = e.length; i < s; i++) e[i].traverseVisible(t);
        }
        traverseAncestors(t) {
          let e = this.parent;
          null !== e && (t(e), e.traverseAncestors(t));
        }
        updateMatrix() {
          this.matrix.compose(this.position, this.quaternion, this.scale),
            (this.matrixWorldNeedsUpdate = !0);
        }
        updateMatrixWorld(t) {
          this.matrixAutoUpdate && this.updateMatrix(),
            (this.matrixWorldNeedsUpdate || t) &&
              (!0 === this.matrixWorldAutoUpdate &&
                (null === this.parent
                  ? this.matrixWorld.copy(this.matrix)
                  : this.matrixWorld.multiplyMatrices(
                      this.parent.matrixWorld,
                      this.matrix
                    )),
              (this.matrixWorldNeedsUpdate = !1),
              (t = !0));
          let e = this.children;
          for (let i = 0, s = e.length; i < s; i++) e[i].updateMatrixWorld(t);
        }
        updateWorldMatrix(t, e) {
          let i = this.parent;
          if (
            (!0 === t && null !== i && i.updateWorldMatrix(!0, !1),
            this.matrixAutoUpdate && this.updateMatrix(),
            !0 === this.matrixWorldAutoUpdate &&
              (null === this.parent
                ? this.matrixWorld.copy(this.matrix)
                : this.matrixWorld.multiplyMatrices(
                    this.parent.matrixWorld,
                    this.matrix
                  )),
            !0 === e)
          ) {
            let t = this.children;
            for (let e = 0, i = t.length; e < i; e++)
              t[e].updateWorldMatrix(!1, !0);
          }
        }
        toJSON(t) {
          let e = void 0 === t || "string" == typeof t,
            i = {};
          e &&
            ((t = {
              geometries: {},
              materials: {},
              textures: {},
              images: {},
              shapes: {},
              skeletons: {},
              animations: {},
              nodes: {},
            }),
            (i.metadata = {
              version: 4.6,
              type: "Object",
              generator: "Object3D.toJSON",
            }));
          let s = {};
          function r(e, i) {
            return void 0 === e[i.uuid] && (e[i.uuid] = i.toJSON(t)), i.uuid;
          }
          if (
            ((s.uuid = this.uuid),
            (s.type = this.type),
            "" !== this.name && (s.name = this.name),
            !0 === this.castShadow && (s.castShadow = !0),
            !0 === this.receiveShadow && (s.receiveShadow = !0),
            !1 === this.visible && (s.visible = !1),
            !1 === this.frustumCulled && (s.frustumCulled = !1),
            0 !== this.renderOrder && (s.renderOrder = this.renderOrder),
            Object.keys(this.userData).length > 0 &&
              (s.userData = this.userData),
            (s.layers = this.layers.mask),
            (s.matrix = this.matrix.toArray()),
            (s.up = this.up.toArray()),
            !1 === this.matrixAutoUpdate && (s.matrixAutoUpdate = !1),
            this.isInstancedMesh &&
              ((s.type = "InstancedMesh"),
              (s.count = this.count),
              (s.instanceMatrix = this.instanceMatrix.toJSON()),
              null !== this.instanceColor &&
                (s.instanceColor = this.instanceColor.toJSON())),
            this.isBatchedMesh &&
              ((s.type = "BatchedMesh"),
              (s.perObjectFrustumCulled = this.perObjectFrustumCulled),
              (s.sortObjects = this.sortObjects),
              (s.drawRanges = this._drawRanges),
              (s.reservedRanges = this._reservedRanges),
              (s.visibility = this._visibility),
              (s.active = this._active),
              (s.bounds = this._bounds.map((t) => ({
                boxInitialized: t.boxInitialized,
                boxMin: t.box.min.toArray(),
                boxMax: t.box.max.toArray(),
                sphereInitialized: t.sphereInitialized,
                sphereRadius: t.sphere.radius,
                sphereCenter: t.sphere.center.toArray(),
              }))),
              (s.maxInstanceCount = this._maxInstanceCount),
              (s.maxVertexCount = this._maxVertexCount),
              (s.maxIndexCount = this._maxIndexCount),
              (s.geometryInitialized = this._geometryInitialized),
              (s.geometryCount = this._geometryCount),
              (s.matricesTexture = this._matricesTexture.toJSON(t)),
              null !== this._colorsTexture &&
                (s.colorsTexture = this._colorsTexture.toJSON(t)),
              null !== this.boundingSphere &&
                (s.boundingSphere = {
                  center: s.boundingSphere.center.toArray(),
                  radius: s.boundingSphere.radius,
                }),
              null !== this.boundingBox &&
                (s.boundingBox = {
                  min: s.boundingBox.min.toArray(),
                  max: s.boundingBox.max.toArray(),
                })),
            this.isScene)
          )
            this.background &&
              (this.background.isColor
                ? (s.background = this.background.toJSON())
                : this.background.isTexture &&
                  (s.background = this.background.toJSON(t).uuid)),
              this.environment &&
                this.environment.isTexture &&
                !0 !== this.environment.isRenderTargetTexture &&
                (s.environment = this.environment.toJSON(t).uuid);
          else if (this.isMesh || this.isLine || this.isPoints) {
            s.geometry = r(t.geometries, this.geometry);
            let e = this.geometry.parameters;
            if (void 0 !== e && void 0 !== e.shapes) {
              let i = e.shapes;
              if (Array.isArray(i))
                for (let e = 0, s = i.length; e < s; e++) {
                  let s = i[e];
                  r(t.shapes, s);
                }
              else r(t.shapes, i);
            }
          }
          if (
            (this.isSkinnedMesh &&
              ((s.bindMode = this.bindMode),
              (s.bindMatrix = this.bindMatrix.toArray()),
              void 0 !== this.skeleton &&
                (r(t.skeletons, this.skeleton),
                (s.skeleton = this.skeleton.uuid))),
            void 0 !== this.material)
          ) {
            if (Array.isArray(this.material)) {
              let e = [];
              for (let i = 0, s = this.material.length; i < s; i++)
                e.push(r(t.materials, this.material[i]));
              s.material = e;
            } else s.material = r(t.materials, this.material);
          }
          if (this.children.length > 0) {
            s.children = [];
            for (let e = 0; e < this.children.length; e++)
              s.children.push(this.children[e].toJSON(t).object);
          }
          if (this.animations.length > 0) {
            s.animations = [];
            for (let e = 0; e < this.animations.length; e++) {
              let i = this.animations[e];
              s.animations.push(r(t.animations, i));
            }
          }
          if (e) {
            let e = a(t.geometries),
              s = a(t.materials),
              r = a(t.textures),
              h = a(t.images),
              n = a(t.shapes),
              o = a(t.skeletons),
              l = a(t.animations),
              u = a(t.nodes);
            e.length > 0 && (i.geometries = e),
              s.length > 0 && (i.materials = s),
              r.length > 0 && (i.textures = r),
              h.length > 0 && (i.images = h),
              n.length > 0 && (i.shapes = n),
              o.length > 0 && (i.skeletons = o),
              l.length > 0 && (i.animations = l),
              u.length > 0 && (i.nodes = u);
          }
          return (i.object = s), i;
          function a(t) {
            let e = [];
            for (let i in t) {
              let s = t[i];
              delete s.metadata, e.push(s);
            }
            return e;
          }
        }
        clone(t) {
          return new this.constructor().copy(this, t);
        }
        copy(t, e = !0) {
          if (
            ((this.name = t.name),
            this.up.copy(t.up),
            this.position.copy(t.position),
            (this.rotation.order = t.rotation.order),
            this.quaternion.copy(t.quaternion),
            this.scale.copy(t.scale),
            this.matrix.copy(t.matrix),
            this.matrixWorld.copy(t.matrixWorld),
            (this.matrixAutoUpdate = t.matrixAutoUpdate),
            (this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate),
            (this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate),
            (this.layers.mask = t.layers.mask),
            (this.visible = t.visible),
            (this.castShadow = t.castShadow),
            (this.receiveShadow = t.receiveShadow),
            (this.frustumCulled = t.frustumCulled),
            (this.renderOrder = t.renderOrder),
            (this.animations = t.animations.slice()),
            (this.userData = JSON.parse(JSON.stringify(t.userData))),
            !0 === e)
          )
            for (let e = 0; e < t.children.length; e++) {
              let i = t.children[e];
              this.add(i.clone());
            }
          return this;
        }
      }
      (A.DEFAULT_UP = new r.P(0, 1, 0)),
        (A.DEFAULT_MATRIX_AUTO_UPDATE = !0),
        (A.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0);
    },
    7114: (t, e, i) => {
      i.d(e, { b: () => a });
      var s = i(8274),
        r = i(4644);
      class a extends s.L {
        constructor(t = 1, e = 1, i = 1, s = 1) {
          super(),
            (this.type = "PlaneGeometry"),
            (this.parameters = {
              width: t,
              height: e,
              widthSegments: i,
              heightSegments: s,
            });
          let a = t / 2,
            h = e / 2,
            n = Math.floor(i),
            o = Math.floor(s),
            l = n + 1,
            u = o + 1,
            c = t / n,
            d = e / o,
            p = [],
            m = [],
            y = [],
            x = [];
          for (let t = 0; t < u; t++) {
            let e = t * d - h;
            for (let i = 0; i < l; i++) {
              let s = i * c - a;
              m.push(s, -e, 0),
                y.push(0, 0, 1),
                x.push(i / n),
                x.push(1 - t / o);
            }
          }
          for (let t = 0; t < o; t++)
            for (let e = 0; e < n; e++) {
              let i = e + l * t,
                s = e + l * (t + 1),
                r = e + 1 + l * (t + 1),
                a = e + 1 + l * t;
              p.push(i, s, a), p.push(s, r, a);
            }
          this.setIndex(p),
            this.setAttribute("position", new r.qt(m, 3)),
            this.setAttribute("normal", new r.qt(y, 3)),
            this.setAttribute("uv", new r.qt(x, 2));
        }
        copy(t) {
          return (
            super.copy(t),
            (this.parameters = Object.assign({}, t.parameters)),
            this
          );
        }
        static fromJSON(t) {
          return new a(t.width, t.height, t.widthSegments, t.heightSegments);
        }
      }
    },
    7389: (t, e, i) => {
      i.d(e, { N: () => r });
      var s = i(5117);
      class r {
        constructor(
          t = new s.P(Infinity, Infinity, Infinity),
          e = new s.P(-1 / 0, -1 / 0, -1 / 0)
        ) {
          (this.isBox3 = !0), (this.min = t), (this.max = e);
        }
        set(t, e) {
          return this.min.copy(t), this.max.copy(e), this;
        }
        setFromArray(t) {
          this.makeEmpty();
          for (let e = 0, i = t.length; e < i; e += 3)
            this.expandByPoint(h.fromArray(t, e));
          return this;
        }
        setFromBufferAttribute(t) {
          this.makeEmpty();
          for (let e = 0, i = t.count; e < i; e++)
            this.expandByPoint(h.fromBufferAttribute(t, e));
          return this;
        }
        setFromPoints(t) {
          this.makeEmpty();
          for (let e = 0, i = t.length; e < i; e++) this.expandByPoint(t[e]);
          return this;
        }
        setFromCenterAndSize(t, e) {
          let i = h.copy(e).multiplyScalar(0.5);
          return this.min.copy(t).sub(i), this.max.copy(t).add(i), this;
        }
        setFromObject(t, e = !1) {
          return this.makeEmpty(), this.expandByObject(t, e);
        }
        clone() {
          return new this.constructor().copy(this);
        }
        copy(t) {
          return this.min.copy(t.min), this.max.copy(t.max), this;
        }
        makeEmpty() {
          return (
            (this.min.x = this.min.y = this.min.z = Infinity),
            (this.max.x = this.max.y = this.max.z = -1 / 0),
            this
          );
        }
        isEmpty() {
          return (
            this.max.x < this.min.x ||
            this.max.y < this.min.y ||
            this.max.z < this.min.z
          );
        }
        getCenter(t) {
          return this.isEmpty()
            ? t.set(0, 0, 0)
            : t.addVectors(this.min, this.max).multiplyScalar(0.5);
        }
        getSize(t) {
          return this.isEmpty()
            ? t.set(0, 0, 0)
            : t.subVectors(this.max, this.min);
        }
        expandByPoint(t) {
          return this.min.min(t), this.max.max(t), this;
        }
        expandByVector(t) {
          return this.min.sub(t), this.max.add(t), this;
        }
        expandByScalar(t) {
          return this.min.addScalar(-t), this.max.addScalar(t), this;
        }
        expandByObject(t, e = !1) {
          t.updateWorldMatrix(!1, !1);
          let i = t.geometry;
          if (void 0 !== i) {
            let s = i.getAttribute("position");
            if (!0 === e && void 0 !== s && !0 !== t.isInstancedMesh)
              for (let e = 0, i = s.count; e < i; e++)
                !0 === t.isMesh
                  ? t.getVertexPosition(e, h)
                  : h.fromBufferAttribute(s, e),
                  h.applyMatrix4(t.matrixWorld),
                  this.expandByPoint(h);
            else
              void 0 !== t.boundingBox
                ? (null === t.boundingBox && t.computeBoundingBox(),
                  n.copy(t.boundingBox))
                : (null === i.boundingBox && i.computeBoundingBox(),
                  n.copy(i.boundingBox)),
                n.applyMatrix4(t.matrixWorld),
                this.union(n);
          }
          let s = t.children;
          for (let t = 0, i = s.length; t < i; t++)
            this.expandByObject(s[t], e);
          return this;
        }
        containsPoint(t) {
          return (
            t.x >= this.min.x &&
            t.x <= this.max.x &&
            t.y >= this.min.y &&
            t.y <= this.max.y &&
            t.z >= this.min.z &&
            t.z <= this.max.z
          );
        }
        containsBox(t) {
          return (
            this.min.x <= t.min.x &&
            t.max.x <= this.max.x &&
            this.min.y <= t.min.y &&
            t.max.y <= this.max.y &&
            this.min.z <= t.min.z &&
            t.max.z <= this.max.z
          );
        }
        getParameter(t, e) {
          return e.set(
            (t.x - this.min.x) / (this.max.x - this.min.x),
            (t.y - this.min.y) / (this.max.y - this.min.y),
            (t.z - this.min.z) / (this.max.z - this.min.z)
          );
        }
        intersectsBox(t) {
          return (
            t.max.x >= this.min.x &&
            t.min.x <= this.max.x &&
            t.max.y >= this.min.y &&
            t.min.y <= this.max.y &&
            t.max.z >= this.min.z &&
            t.min.z <= this.max.z
          );
        }
        intersectsSphere(t) {
          return (
            this.clampPoint(t.center, h),
            h.distanceToSquared(t.center) <= t.radius * t.radius
          );
        }
        intersectsPlane(t) {
          let e, i;
          return (
            t.normal.x > 0
              ? ((e = t.normal.x * this.min.x), (i = t.normal.x * this.max.x))
              : ((e = t.normal.x * this.max.x), (i = t.normal.x * this.min.x)),
            t.normal.y > 0
              ? ((e += t.normal.y * this.min.y), (i += t.normal.y * this.max.y))
              : ((e += t.normal.y * this.max.y),
                (i += t.normal.y * this.min.y)),
            t.normal.z > 0
              ? ((e += t.normal.z * this.min.z), (i += t.normal.z * this.max.z))
              : ((e += t.normal.z * this.max.z),
                (i += t.normal.z * this.min.z)),
            e <= -t.constant && i >= -t.constant
          );
        }
        intersectsTriangle(t) {
          if (this.isEmpty()) return !1;
          this.getCenter(m),
            y.subVectors(this.max, m),
            o.subVectors(t.a, m),
            l.subVectors(t.b, m),
            u.subVectors(t.c, m),
            c.subVectors(l, o),
            d.subVectors(u, l),
            p.subVectors(o, u);
          let e = [
            0,
            -c.z,
            c.y,
            0,
            -d.z,
            d.y,
            0,
            -p.z,
            p.y,
            c.z,
            0,
            -c.x,
            d.z,
            0,
            -d.x,
            p.z,
            0,
            -p.x,
            -c.y,
            c.x,
            0,
            -d.y,
            d.x,
            0,
            -p.y,
            p.x,
            0,
          ];
          return (
            !!(
              g(e, o, l, u, y) &&
              g((e = [1, 0, 0, 0, 1, 0, 0, 0, 1]), o, l, u, y)
            ) && (x.crossVectors(c, d), g((e = [x.x, x.y, x.z]), o, l, u, y))
          );
        }
        clampPoint(t, e) {
          return e.copy(t).clamp(this.min, this.max);
        }
        distanceToPoint(t) {
          return this.clampPoint(t, h).distanceTo(t);
        }
        getBoundingSphere(t) {
          return (
            this.isEmpty()
              ? t.makeEmpty()
              : (this.getCenter(t.center),
                (t.radius = 0.5 * this.getSize(h).length())),
            t
          );
        }
        intersect(t) {
          return (
            this.min.max(t.min),
            this.max.min(t.max),
            this.isEmpty() && this.makeEmpty(),
            this
          );
        }
        union(t) {
          return this.min.min(t.min), this.max.max(t.max), this;
        }
        applyMatrix4(t) {
          return (
            this.isEmpty() ||
              (a[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t),
              a[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t),
              a[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t),
              a[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t),
              a[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t),
              a[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t),
              a[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t),
              a[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t),
              this.setFromPoints(a)),
            this
          );
        }
        translate(t) {
          return this.min.add(t), this.max.add(t), this;
        }
        equals(t) {
          return t.min.equals(this.min) && t.max.equals(this.max);
        }
      }
      let a = [
          new s.P(),
          new s.P(),
          new s.P(),
          new s.P(),
          new s.P(),
          new s.P(),
          new s.P(),
          new s.P(),
        ],
        h = new s.P(),
        n = new r(),
        o = new s.P(),
        l = new s.P(),
        u = new s.P(),
        c = new s.P(),
        d = new s.P(),
        p = new s.P(),
        m = new s.P(),
        y = new s.P(),
        x = new s.P(),
        f = new s.P();
      function g(t, e, i, s, r) {
        for (let a = 0, h = t.length - 3; a <= h; a += 3) {
          f.fromArray(t, a);
          let h =
              r.x * Math.abs(f.x) + r.y * Math.abs(f.y) + r.z * Math.abs(f.z),
            n = e.dot(f),
            o = i.dot(f),
            l = s.dot(f);
          if (Math.max(-Math.max(n, o, l), Math.min(n, o, l)) > h) return !1;
        }
        return !0;
      }
    },
    6917: (t, e, i) => {
      i.d(e, { dk: () => o, pp: () => n, rd: () => l });
      var s = i(7429),
        r = i(5395);
      let a = new r.d().set(
          0.4123908,
          0.3575843,
          0.1804808,
          0.212639,
          0.7151687,
          0.0721923,
          0.0193308,
          0.1191948,
          0.9505322
        ),
        h = new r.d().set(
          3.2409699,
          -1.5373832,
          -0.4986108,
          -0.9692436,
          1.8759675,
          0.0415551,
          0.0556301,
          -0.203977,
          1.0569715
        ),
        n = (function () {
          let t = {
              enabled: !0,
              workingColorSpace: s.Zr2,
              spaces: {},
              convert: function (t, e, i) {
                return (
                  !1 !== this.enabled &&
                    e !== i &&
                    e &&
                    i &&
                    (this.spaces[e].transfer === s.KLL &&
                      ((t.r = o(t.r)), (t.g = o(t.g)), (t.b = o(t.b))),
                    this.spaces[e].primaries !== this.spaces[i].primaries &&
                      (t.applyMatrix3(this.spaces[e].toXYZ),
                      t.applyMatrix3(this.spaces[i].fromXYZ)),
                    this.spaces[i].transfer === s.KLL &&
                      ((t.r = l(t.r)), (t.g = l(t.g)), (t.b = l(t.b)))),
                  t
                );
              },
              fromWorkingColorSpace: function (t, e) {
                return this.convert(t, this.workingColorSpace, e);
              },
              toWorkingColorSpace: function (t, e) {
                return this.convert(t, e, this.workingColorSpace);
              },
              getPrimaries: function (t) {
                return this.spaces[t].primaries;
              },
              getTransfer: function (t) {
                return t === s.jf0 ? s.VxR : this.spaces[t].transfer;
              },
              getLuminanceCoefficients: function (
                t,
                e = this.workingColorSpace
              ) {
                return t.fromArray(this.spaces[e].luminanceCoefficients);
              },
              define: function (t) {
                Object.assign(this.spaces, t);
              },
              _getMatrix: function (t, e, i) {
                return t
                  .copy(this.spaces[e].toXYZ)
                  .multiply(this.spaces[i].fromXYZ);
              },
              _getDrawingBufferColorSpace: function (t) {
                return this.spaces[t].outputColorSpaceConfig
                  .drawingBufferColorSpace;
              },
              _getUnpackColorSpace: function (t = this.workingColorSpace) {
                return this.spaces[t].workingColorSpaceConfig.unpackColorSpace;
              },
            },
            e = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06],
            i = [0.2126, 0.7152, 0.0722],
            r = [0.3127, 0.329];
          return (
            t.define({
              [s.Zr2]: {
                primaries: e,
                whitePoint: r,
                transfer: s.VxR,
                toXYZ: a,
                fromXYZ: h,
                luminanceCoefficients: i,
                workingColorSpaceConfig: { unpackColorSpace: s.er$ },
                outputColorSpaceConfig: { drawingBufferColorSpace: s.er$ },
              },
              [s.er$]: {
                primaries: e,
                whitePoint: r,
                transfer: s.KLL,
                toXYZ: a,
                fromXYZ: h,
                luminanceCoefficients: i,
                outputColorSpaceConfig: { drawingBufferColorSpace: s.er$ },
              },
            }),
            t
          );
        })();
      function o(t) {
        return t < 0.04045
          ? 0.0773993808 * t
          : Math.pow(0.9478672986 * t + 0.0521327014, 2.4);
      }
      function l(t) {
        return t < 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 0.41666) - 0.055;
      }
    },
    168: (t, e, i) => {
      i.d(e, { O: () => o });
      var s = i(5531),
        r = i(9474),
        a = i(8962);
      let h = new r.k(),
        n = new s.P();
      class o {
        constructor(t = 0, e = 0, i = 0, s = o.DEFAULT_ORDER) {
          (this.isEuler = !0),
            (this._x = t),
            (this._y = e),
            (this._z = i),
            (this._order = s);
        }
        get x() {
          return this._x;
        }
        set x(t) {
          (this._x = t), this._onChangeCallback();
        }
        get y() {
          return this._y;
        }
        set y(t) {
          (this._y = t), this._onChangeCallback();
        }
        get z() {
          return this._z;
        }
        set z(t) {
          (this._z = t), this._onChangeCallback();
        }
        get order() {
          return this._order;
        }
        set order(t) {
          (this._order = t), this._onChangeCallback();
        }
        set(t, e, i, s = this._order) {
          return (
            (this._x = t),
            (this._y = e),
            (this._z = i),
            (this._order = s),
            this._onChangeCallback(),
            this
          );
        }
        clone() {
          return new this.constructor(this._x, this._y, this._z, this._order);
        }
        copy(t) {
          return (
            (this._x = t._x),
            (this._y = t._y),
            (this._z = t._z),
            (this._order = t._order),
            this._onChangeCallback(),
            this
          );
        }
        setFromRotationMatrix(t, e = this._order, i = !0) {
          let s = t.elements,
            r = s[0],
            h = s[4],
            n = s[8],
            o = s[1],
            l = s[5],
            u = s[9],
            c = s[2],
            d = s[6],
            p = s[10];
          switch (e) {
            case "XYZ":
              (this._y = Math.asin((0, a.qE)(n, -1, 1))),
                0.9999999 > Math.abs(n)
                  ? ((this._x = Math.atan2(-u, p)),
                    (this._z = Math.atan2(-h, r)))
                  : ((this._x = Math.atan2(d, l)), (this._z = 0));
              break;
            case "YXZ":
              (this._x = Math.asin(-(0, a.qE)(u, -1, 1))),
                0.9999999 > Math.abs(u)
                  ? ((this._y = Math.atan2(n, p)), (this._z = Math.atan2(o, l)))
                  : ((this._y = Math.atan2(-c, r)), (this._z = 0));
              break;
            case "ZXY":
              (this._x = Math.asin((0, a.qE)(d, -1, 1))),
                0.9999999 > Math.abs(d)
                  ? ((this._y = Math.atan2(-c, p)),
                    (this._z = Math.atan2(-h, l)))
                  : ((this._y = 0), (this._z = Math.atan2(o, r)));
              break;
            case "ZYX":
              (this._y = Math.asin(-(0, a.qE)(c, -1, 1))),
                0.9999999 > Math.abs(c)
                  ? ((this._x = Math.atan2(d, p)), (this._z = Math.atan2(o, r)))
                  : ((this._x = 0), (this._z = Math.atan2(-h, l)));
              break;
            case "YZX":
              (this._z = Math.asin((0, a.qE)(o, -1, 1))),
                0.9999999 > Math.abs(o)
                  ? ((this._x = Math.atan2(-u, l)),
                    (this._y = Math.atan2(-c, r)))
                  : ((this._x = 0), (this._y = Math.atan2(n, p)));
              break;
            case "XZY":
              (this._z = Math.asin(-(0, a.qE)(h, -1, 1))),
                0.9999999 > Math.abs(h)
                  ? ((this._x = Math.atan2(d, l)), (this._y = Math.atan2(n, r)))
                  : ((this._x = Math.atan2(-u, p)), (this._y = 0));
              break;
            default:
              console.warn(
                "THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " +
                  e
              );
          }
          return (this._order = e), !0 === i && this._onChangeCallback(), this;
        }
        setFromQuaternion(t, e, i) {
          return (
            h.makeRotationFromQuaternion(t), this.setFromRotationMatrix(h, e, i)
          );
        }
        setFromVector3(t, e = this._order) {
          return this.set(t.x, t.y, t.z, e);
        }
        reorder(t) {
          return n.setFromEuler(this), this.setFromQuaternion(n, t);
        }
        equals(t) {
          return (
            t._x === this._x &&
            t._y === this._y &&
            t._z === this._z &&
            t._order === this._order
          );
        }
        fromArray(t) {
          return (
            (this._x = t[0]),
            (this._y = t[1]),
            (this._z = t[2]),
            void 0 !== t[3] && (this._order = t[3]),
            this._onChangeCallback(),
            this
          );
        }
        toArray(t = [], e = 0) {
          return (
            (t[e] = this._x),
            (t[e + 1] = this._y),
            (t[e + 2] = this._z),
            (t[e + 3] = this._order),
            t
          );
        }
        _onChange(t) {
          return (this._onChangeCallback = t), this;
        }
        _onChangeCallback() {}
        *[Symbol.iterator]() {
          yield this._x, yield this._y, yield this._z, yield this._order;
        }
      }
      o.DEFAULT_ORDER = "XYZ";
    },
    8962: (t, e, i) => {
      i.d(e, {
        Cc: () => n,
        NU: () => o,
        S8: () => l,
        lk: () => r,
        qE: () => a,
        rl: () => h,
      });
      let s = [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "0a",
        "0b",
        "0c",
        "0d",
        "0e",
        "0f",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "1a",
        "1b",
        "1c",
        "1d",
        "1e",
        "1f",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "2a",
        "2b",
        "2c",
        "2d",
        "2e",
        "2f",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "3a",
        "3b",
        "3c",
        "3d",
        "3e",
        "3f",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "4a",
        "4b",
        "4c",
        "4d",
        "4e",
        "4f",
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "59",
        "5a",
        "5b",
        "5c",
        "5d",
        "5e",
        "5f",
        "60",
        "61",
        "62",
        "63",
        "64",
        "65",
        "66",
        "67",
        "68",
        "69",
        "6a",
        "6b",
        "6c",
        "6d",
        "6e",
        "6f",
        "70",
        "71",
        "72",
        "73",
        "74",
        "75",
        "76",
        "77",
        "78",
        "79",
        "7a",
        "7b",
        "7c",
        "7d",
        "7e",
        "7f",
        "80",
        "81",
        "82",
        "83",
        "84",
        "85",
        "86",
        "87",
        "88",
        "89",
        "8a",
        "8b",
        "8c",
        "8d",
        "8e",
        "8f",
        "90",
        "91",
        "92",
        "93",
        "94",
        "95",
        "96",
        "97",
        "98",
        "99",
        "9a",
        "9b",
        "9c",
        "9d",
        "9e",
        "9f",
        "a0",
        "a1",
        "a2",
        "a3",
        "a4",
        "a5",
        "a6",
        "a7",
        "a8",
        "a9",
        "aa",
        "ab",
        "ac",
        "ad",
        "ae",
        "af",
        "b0",
        "b1",
        "b2",
        "b3",
        "b4",
        "b5",
        "b6",
        "b7",
        "b8",
        "b9",
        "ba",
        "bb",
        "bc",
        "bd",
        "be",
        "bf",
        "c0",
        "c1",
        "c2",
        "c3",
        "c4",
        "c5",
        "c6",
        "c7",
        "c8",
        "c9",
        "ca",
        "cb",
        "cc",
        "cd",
        "ce",
        "cf",
        "d0",
        "d1",
        "d2",
        "d3",
        "d4",
        "d5",
        "d6",
        "d7",
        "d8",
        "d9",
        "da",
        "db",
        "dc",
        "dd",
        "de",
        "df",
        "e0",
        "e1",
        "e2",
        "e3",
        "e4",
        "e5",
        "e6",
        "e7",
        "e8",
        "e9",
        "ea",
        "eb",
        "ec",
        "ed",
        "ee",
        "ef",
        "f0",
        "f1",
        "f2",
        "f3",
        "f4",
        "f5",
        "f6",
        "f7",
        "f8",
        "f9",
        "fa",
        "fb",
        "fc",
        "fd",
        "fe",
        "ff",
      ];
      function r() {
        let t = (0xffffffff * Math.random()) | 0,
          e = (0xffffffff * Math.random()) | 0,
          i = (0xffffffff * Math.random()) | 0,
          r = (0xffffffff * Math.random()) | 0;
        return (
          s[255 & t] +
          s[(t >> 8) & 255] +
          s[(t >> 16) & 255] +
          s[(t >> 24) & 255] +
          "-" +
          s[255 & e] +
          s[(e >> 8) & 255] +
          "-" +
          s[((e >> 16) & 15) | 64] +
          s[(e >> 24) & 255] +
          "-" +
          s[(63 & i) | 128] +
          s[(i >> 8) & 255] +
          "-" +
          s[(i >> 16) & 255] +
          s[(i >> 24) & 255] +
          s[255 & r] +
          s[(r >> 8) & 255] +
          s[(r >> 16) & 255] +
          s[(r >> 24) & 255]
        ).toLowerCase();
      }
      function a(t, e, i) {
        return Math.max(e, Math.min(i, t));
      }
      function h(t, e) {
        return ((t % e) + e) % e;
      }
      function n(t, e, i) {
        return (1 - i) * t + i * e;
      }
      function o(t, e) {
        switch (e.constructor) {
          case Float32Array:
            return t;
          case Uint32Array:
            return t / 0xffffffff;
          case Uint16Array:
            return t / 65535;
          case Uint8Array:
            return t / 255;
          case Int32Array:
            return Math.max(t / 0x7fffffff, -1);
          case Int16Array:
            return Math.max(t / 32767, -1);
          case Int8Array:
            return Math.max(t / 127, -1);
          default:
            throw Error("Invalid component type.");
        }
      }
      function l(t, e) {
        switch (e.constructor) {
          case Float32Array:
            return t;
          case Uint32Array:
            return Math.round(0xffffffff * t);
          case Uint16Array:
            return Math.round(65535 * t);
          case Uint8Array:
            return Math.round(255 * t);
          case Int32Array:
            return Math.round(0x7fffffff * t);
          case Int16Array:
            return Math.round(32767 * t);
          case Int8Array:
            return Math.round(127 * t);
          default:
            throw Error("Invalid component type.");
        }
      }
    },
    5395: (t, e, i) => {
      i.d(e, { d: () => s });
      class s {
        constructor(t, e, i, r, a, h, n, o, l) {
          (s.prototype.isMatrix3 = !0),
            (this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]),
            void 0 !== t && this.set(t, e, i, r, a, h, n, o, l);
        }
        set(t, e, i, s, r, a, h, n, o) {
          let l = this.elements;
          return (
            (l[0] = t),
            (l[1] = s),
            (l[2] = h),
            (l[3] = e),
            (l[4] = r),
            (l[5] = n),
            (l[6] = i),
            (l[7] = a),
            (l[8] = o),
            this
          );
        }
        identity() {
          return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
        }
        copy(t) {
          let e = this.elements,
            i = t.elements;
          return (
            (e[0] = i[0]),
            (e[1] = i[1]),
            (e[2] = i[2]),
            (e[3] = i[3]),
            (e[4] = i[4]),
            (e[5] = i[5]),
            (e[6] = i[6]),
            (e[7] = i[7]),
            (e[8] = i[8]),
            this
          );
        }
        extractBasis(t, e, i) {
          return (
            t.setFromMatrix3Column(this, 0),
            e.setFromMatrix3Column(this, 1),
            i.setFromMatrix3Column(this, 2),
            this
          );
        }
        setFromMatrix4(t) {
          let e = t.elements;
          return (
            this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]),
            this
          );
        }
        multiply(t) {
          return this.multiplyMatrices(this, t);
        }
        premultiply(t) {
          return this.multiplyMatrices(t, this);
        }
        multiplyMatrices(t, e) {
          let i = t.elements,
            s = e.elements,
            r = this.elements,
            a = i[0],
            h = i[3],
            n = i[6],
            o = i[1],
            l = i[4],
            u = i[7],
            c = i[2],
            d = i[5],
            p = i[8],
            m = s[0],
            y = s[3],
            x = s[6],
            f = s[1],
            g = s[4],
            b = s[7],
            M = s[2],
            w = s[5],
            z = s[8];
          return (
            (r[0] = a * m + h * f + n * M),
            (r[3] = a * y + h * g + n * w),
            (r[6] = a * x + h * b + n * z),
            (r[1] = o * m + l * f + u * M),
            (r[4] = o * y + l * g + u * w),
            (r[7] = o * x + l * b + u * z),
            (r[2] = c * m + d * f + p * M),
            (r[5] = c * y + d * g + p * w),
            (r[8] = c * x + d * b + p * z),
            this
          );
        }
        multiplyScalar(t) {
          let e = this.elements;
          return (
            (e[0] *= t),
            (e[3] *= t),
            (e[6] *= t),
            (e[1] *= t),
            (e[4] *= t),
            (e[7] *= t),
            (e[2] *= t),
            (e[5] *= t),
            (e[8] *= t),
            this
          );
        }
        determinant() {
          let t = this.elements,
            e = t[0],
            i = t[1],
            s = t[2],
            r = t[3],
            a = t[4],
            h = t[5],
            n = t[6],
            o = t[7],
            l = t[8];
          return (
            e * a * l -
            e * h * o -
            i * r * l +
            i * h * n +
            s * r * o -
            s * a * n
          );
        }
        invert() {
          let t = this.elements,
            e = t[0],
            i = t[1],
            s = t[2],
            r = t[3],
            a = t[4],
            h = t[5],
            n = t[6],
            o = t[7],
            l = t[8],
            u = l * a - h * o,
            c = h * n - l * r,
            d = o * r - a * n,
            p = e * u + i * c + s * d;
          if (0 === p) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
          let m = 1 / p;
          return (
            (t[0] = u * m),
            (t[1] = (s * o - l * i) * m),
            (t[2] = (h * i - s * a) * m),
            (t[3] = c * m),
            (t[4] = (l * e - s * n) * m),
            (t[5] = (s * r - h * e) * m),
            (t[6] = d * m),
            (t[7] = (i * n - o * e) * m),
            (t[8] = (a * e - i * r) * m),
            this
          );
        }
        transpose() {
          let t;
          let e = this.elements;
          return (
            (t = e[1]),
            (e[1] = e[3]),
            (e[3] = t),
            (t = e[2]),
            (e[2] = e[6]),
            (e[6] = t),
            (t = e[5]),
            (e[5] = e[7]),
            (e[7] = t),
            this
          );
        }
        getNormalMatrix(t) {
          return this.setFromMatrix4(t).invert().transpose();
        }
        transposeIntoArray(t) {
          let e = this.elements;
          return (
            (t[0] = e[0]),
            (t[1] = e[3]),
            (t[2] = e[6]),
            (t[3] = e[1]),
            (t[4] = e[4]),
            (t[5] = e[7]),
            (t[6] = e[2]),
            (t[7] = e[5]),
            (t[8] = e[8]),
            this
          );
        }
        setUvTransform(t, e, i, s, r, a, h) {
          let n = Math.cos(r),
            o = Math.sin(r);
          return (
            this.set(
              i * n,
              i * o,
              -i * (n * a + o * h) + a + t,
              -s * o,
              s * n,
              -s * (-o * a + n * h) + h + e,
              0,
              0,
              1
            ),
            this
          );
        }
        scale(t, e) {
          return this.premultiply(r.makeScale(t, e)), this;
        }
        rotate(t) {
          return this.premultiply(r.makeRotation(-t)), this;
        }
        translate(t, e) {
          return this.premultiply(r.makeTranslation(t, e)), this;
        }
        makeTranslation(t, e) {
          return (
            t.isVector2
              ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1)
              : this.set(1, 0, t, 0, 1, e, 0, 0, 1),
            this
          );
        }
        makeRotation(t) {
          let e = Math.cos(t),
            i = Math.sin(t);
          return this.set(e, -i, 0, i, e, 0, 0, 0, 1), this;
        }
        makeScale(t, e) {
          return this.set(t, 0, 0, 0, e, 0, 0, 0, 1), this;
        }
        equals(t) {
          let e = this.elements,
            i = t.elements;
          for (let t = 0; t < 9; t++) if (e[t] !== i[t]) return !1;
          return !0;
        }
        fromArray(t, e = 0) {
          for (let i = 0; i < 9; i++) this.elements[i] = t[i + e];
          return this;
        }
        toArray(t = [], e = 0) {
          let i = this.elements;
          return (
            (t[e] = i[0]),
            (t[e + 1] = i[1]),
            (t[e + 2] = i[2]),
            (t[e + 3] = i[3]),
            (t[e + 4] = i[4]),
            (t[e + 5] = i[5]),
            (t[e + 6] = i[6]),
            (t[e + 7] = i[7]),
            (t[e + 8] = i[8]),
            t
          );
        }
        clone() {
          return new this.constructor().fromArray(this.elements);
        }
      }
      let r = new s();
    },
    9474: (t, e, i) => {
      i.d(e, { k: () => a });
      var s = i(7429),
        r = i(5117);
      class a {
        constructor(t, e, i, s, r, h, n, o, l, u, c, d, p, m, y, x) {
          (a.prototype.isMatrix4 = !0),
            (this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
            void 0 !== t &&
              this.set(t, e, i, s, r, h, n, o, l, u, c, d, p, m, y, x);
        }
        set(t, e, i, s, r, a, h, n, o, l, u, c, d, p, m, y) {
          let x = this.elements;
          return (
            (x[0] = t),
            (x[4] = e),
            (x[8] = i),
            (x[12] = s),
            (x[1] = r),
            (x[5] = a),
            (x[9] = h),
            (x[13] = n),
            (x[2] = o),
            (x[6] = l),
            (x[10] = u),
            (x[14] = c),
            (x[3] = d),
            (x[7] = p),
            (x[11] = m),
            (x[15] = y),
            this
          );
        }
        identity() {
          return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
        }
        clone() {
          return new a().fromArray(this.elements);
        }
        copy(t) {
          let e = this.elements,
            i = t.elements;
          return (
            (e[0] = i[0]),
            (e[1] = i[1]),
            (e[2] = i[2]),
            (e[3] = i[3]),
            (e[4] = i[4]),
            (e[5] = i[5]),
            (e[6] = i[6]),
            (e[7] = i[7]),
            (e[8] = i[8]),
            (e[9] = i[9]),
            (e[10] = i[10]),
            (e[11] = i[11]),
            (e[12] = i[12]),
            (e[13] = i[13]),
            (e[14] = i[14]),
            (e[15] = i[15]),
            this
          );
        }
        copyPosition(t) {
          let e = this.elements,
            i = t.elements;
          return (e[12] = i[12]), (e[13] = i[13]), (e[14] = i[14]), this;
        }
        setFromMatrix3(t) {
          let e = t.elements;
          return (
            this.set(
              e[0],
              e[3],
              e[6],
              0,
              e[1],
              e[4],
              e[7],
              0,
              e[2],
              e[5],
              e[8],
              0,
              0,
              0,
              0,
              1
            ),
            this
          );
        }
        extractBasis(t, e, i) {
          return (
            t.setFromMatrixColumn(this, 0),
            e.setFromMatrixColumn(this, 1),
            i.setFromMatrixColumn(this, 2),
            this
          );
        }
        makeBasis(t, e, i) {
          return (
            this.set(
              t.x,
              e.x,
              i.x,
              0,
              t.y,
              e.y,
              i.y,
              0,
              t.z,
              e.z,
              i.z,
              0,
              0,
              0,
              0,
              1
            ),
            this
          );
        }
        extractRotation(t) {
          let e = this.elements,
            i = t.elements,
            s = 1 / h.setFromMatrixColumn(t, 0).length(),
            r = 1 / h.setFromMatrixColumn(t, 1).length(),
            a = 1 / h.setFromMatrixColumn(t, 2).length();
          return (
            (e[0] = i[0] * s),
            (e[1] = i[1] * s),
            (e[2] = i[2] * s),
            (e[3] = 0),
            (e[4] = i[4] * r),
            (e[5] = i[5] * r),
            (e[6] = i[6] * r),
            (e[7] = 0),
            (e[8] = i[8] * a),
            (e[9] = i[9] * a),
            (e[10] = i[10] * a),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            this
          );
        }
        makeRotationFromEuler(t) {
          let e = this.elements,
            i = t.x,
            s = t.y,
            r = t.z,
            a = Math.cos(i),
            h = Math.sin(i),
            n = Math.cos(s),
            o = Math.sin(s),
            l = Math.cos(r),
            u = Math.sin(r);
          if ("XYZ" === t.order) {
            let t = a * l,
              i = a * u,
              s = h * l,
              r = h * u;
            (e[0] = n * l),
              (e[4] = -n * u),
              (e[8] = o),
              (e[1] = i + s * o),
              (e[5] = t - r * o),
              (e[9] = -h * n),
              (e[2] = r - t * o),
              (e[6] = s + i * o),
              (e[10] = a * n);
          } else if ("YXZ" === t.order) {
            let t = n * l,
              i = n * u,
              s = o * l,
              r = o * u;
            (e[0] = t + r * h),
              (e[4] = s * h - i),
              (e[8] = a * o),
              (e[1] = a * u),
              (e[5] = a * l),
              (e[9] = -h),
              (e[2] = i * h - s),
              (e[6] = r + t * h),
              (e[10] = a * n);
          } else if ("ZXY" === t.order) {
            let t = n * l,
              i = n * u,
              s = o * l,
              r = o * u;
            (e[0] = t - r * h),
              (e[4] = -a * u),
              (e[8] = s + i * h),
              (e[1] = i + s * h),
              (e[5] = a * l),
              (e[9] = r - t * h),
              (e[2] = -a * o),
              (e[6] = h),
              (e[10] = a * n);
          } else if ("ZYX" === t.order) {
            let t = a * l,
              i = a * u,
              s = h * l,
              r = h * u;
            (e[0] = n * l),
              (e[4] = s * o - i),
              (e[8] = t * o + r),
              (e[1] = n * u),
              (e[5] = r * o + t),
              (e[9] = i * o - s),
              (e[2] = -o),
              (e[6] = h * n),
              (e[10] = a * n);
          } else if ("YZX" === t.order) {
            let t = a * n,
              i = a * o,
              s = h * n,
              r = h * o;
            (e[0] = n * l),
              (e[4] = r - t * u),
              (e[8] = s * u + i),
              (e[1] = u),
              (e[5] = a * l),
              (e[9] = -h * l),
              (e[2] = -o * l),
              (e[6] = i * u + s),
              (e[10] = t - r * u);
          } else if ("XZY" === t.order) {
            let t = a * n,
              i = a * o,
              s = h * n,
              r = h * o;
            (e[0] = n * l),
              (e[4] = -u),
              (e[8] = o * l),
              (e[1] = t * u + r),
              (e[5] = a * l),
              (e[9] = i * u - s),
              (e[2] = s * u - i),
              (e[6] = h * l),
              (e[10] = r * u + t);
          }
          return (
            (e[3] = 0),
            (e[7] = 0),
            (e[11] = 0),
            (e[12] = 0),
            (e[13] = 0),
            (e[14] = 0),
            (e[15] = 1),
            this
          );
        }
        makeRotationFromQuaternion(t) {
          return this.compose(o, t, l);
        }
        lookAt(t, e, i) {
          let s = this.elements;
          return (
            d.subVectors(t, e),
            0 === d.lengthSq() && (d.z = 1),
            d.normalize(),
            u.crossVectors(i, d),
            0 === u.lengthSq() &&
              (1 === Math.abs(i.z) ? (d.x += 1e-4) : (d.z += 1e-4),
              d.normalize(),
              u.crossVectors(i, d)),
            u.normalize(),
            c.crossVectors(d, u),
            (s[0] = u.x),
            (s[4] = c.x),
            (s[8] = d.x),
            (s[1] = u.y),
            (s[5] = c.y),
            (s[9] = d.y),
            (s[2] = u.z),
            (s[6] = c.z),
            (s[10] = d.z),
            this
          );
        }
        multiply(t) {
          return this.multiplyMatrices(this, t);
        }
        premultiply(t) {
          return this.multiplyMatrices(t, this);
        }
        multiplyMatrices(t, e) {
          let i = t.elements,
            s = e.elements,
            r = this.elements,
            a = i[0],
            h = i[4],
            n = i[8],
            o = i[12],
            l = i[1],
            u = i[5],
            c = i[9],
            d = i[13],
            p = i[2],
            m = i[6],
            y = i[10],
            x = i[14],
            f = i[3],
            g = i[7],
            b = i[11],
            M = i[15],
            w = s[0],
            z = s[4],
            S = s[8],
            v = s[12],
            _ = s[1],
            A = s[5],
            T = s[9],
            k = s[13],
            P = s[2],
            B = s[6],
            C = s[10],
            E = s[14],
            I = s[3],
            O = s[7],
            F = s[11],
            R = s[15];
          return (
            (r[0] = a * w + h * _ + n * P + o * I),
            (r[4] = a * z + h * A + n * B + o * O),
            (r[8] = a * S + h * T + n * C + o * F),
            (r[12] = a * v + h * k + n * E + o * R),
            (r[1] = l * w + u * _ + c * P + d * I),
            (r[5] = l * z + u * A + c * B + d * O),
            (r[9] = l * S + u * T + c * C + d * F),
            (r[13] = l * v + u * k + c * E + d * R),
            (r[2] = p * w + m * _ + y * P + x * I),
            (r[6] = p * z + m * A + y * B + x * O),
            (r[10] = p * S + m * T + y * C + x * F),
            (r[14] = p * v + m * k + y * E + x * R),
            (r[3] = f * w + g * _ + b * P + M * I),
            (r[7] = f * z + g * A + b * B + M * O),
            (r[11] = f * S + g * T + b * C + M * F),
            (r[15] = f * v + g * k + b * E + M * R),
            this
          );
        }
        multiplyScalar(t) {
          let e = this.elements;
          return (
            (e[0] *= t),
            (e[4] *= t),
            (e[8] *= t),
            (e[12] *= t),
            (e[1] *= t),
            (e[5] *= t),
            (e[9] *= t),
            (e[13] *= t),
            (e[2] *= t),
            (e[6] *= t),
            (e[10] *= t),
            (e[14] *= t),
            (e[3] *= t),
            (e[7] *= t),
            (e[11] *= t),
            (e[15] *= t),
            this
          );
        }
        determinant() {
          let t = this.elements,
            e = t[0],
            i = t[4],
            s = t[8],
            r = t[12],
            a = t[1],
            h = t[5],
            n = t[9],
            o = t[13],
            l = t[2],
            u = t[6],
            c = t[10],
            d = t[14],
            p = t[3];
          return (
            p *
              (+r * n * u -
                s * o * u -
                r * h * c +
                i * o * c +
                s * h * d -
                i * n * d) +
            t[7] *
              (+e * n * d -
                e * o * c +
                r * a * c -
                s * a * d +
                s * o * l -
                r * n * l) +
            t[11] *
              (+e * o * u -
                e * h * d -
                r * a * u +
                i * a * d +
                r * h * l -
                i * o * l) +
            t[15] *
              (-s * h * l -
                e * n * u +
                e * h * c +
                s * a * u -
                i * a * c +
                i * n * l)
          );
        }
        transpose() {
          let t;
          let e = this.elements;
          return (
            (t = e[1]),
            (e[1] = e[4]),
            (e[4] = t),
            (t = e[2]),
            (e[2] = e[8]),
            (e[8] = t),
            (t = e[6]),
            (e[6] = e[9]),
            (e[9] = t),
            (t = e[3]),
            (e[3] = e[12]),
            (e[12] = t),
            (t = e[7]),
            (e[7] = e[13]),
            (e[13] = t),
            (t = e[11]),
            (e[11] = e[14]),
            (e[14] = t),
            this
          );
        }
        setPosition(t, e, i) {
          let s = this.elements;
          return (
            t.isVector3
              ? ((s[12] = t.x), (s[13] = t.y), (s[14] = t.z))
              : ((s[12] = t), (s[13] = e), (s[14] = i)),
            this
          );
        }
        invert() {
          let t = this.elements,
            e = t[0],
            i = t[1],
            s = t[2],
            r = t[3],
            a = t[4],
            h = t[5],
            n = t[6],
            o = t[7],
            l = t[8],
            u = t[9],
            c = t[10],
            d = t[11],
            p = t[12],
            m = t[13],
            y = t[14],
            x = t[15],
            f =
              u * y * o -
              m * c * o +
              m * n * d -
              h * y * d -
              u * n * x +
              h * c * x,
            g =
              p * c * o -
              l * y * o -
              p * n * d +
              a * y * d +
              l * n * x -
              a * c * x,
            b =
              l * m * o -
              p * u * o +
              p * h * d -
              a * m * d -
              l * h * x +
              a * u * x,
            M =
              p * u * n -
              l * m * n -
              p * h * c +
              a * m * c +
              l * h * y -
              a * u * y,
            w = e * f + i * g + s * b + r * M;
          if (0 === w)
            return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          let z = 1 / w;
          return (
            (t[0] = f * z),
            (t[1] =
              (m * c * r -
                u * y * r -
                m * s * d +
                i * y * d +
                u * s * x -
                i * c * x) *
              z),
            (t[2] =
              (h * y * r -
                m * n * r +
                m * s * o -
                i * y * o -
                h * s * x +
                i * n * x) *
              z),
            (t[3] =
              (u * n * r -
                h * c * r -
                u * s * o +
                i * c * o +
                h * s * d -
                i * n * d) *
              z),
            (t[4] = g * z),
            (t[5] =
              (l * y * r -
                p * c * r +
                p * s * d -
                e * y * d -
                l * s * x +
                e * c * x) *
              z),
            (t[6] =
              (p * n * r -
                a * y * r -
                p * s * o +
                e * y * o +
                a * s * x -
                e * n * x) *
              z),
            (t[7] =
              (a * c * r -
                l * n * r +
                l * s * o -
                e * c * o -
                a * s * d +
                e * n * d) *
              z),
            (t[8] = b * z),
            (t[9] =
              (p * u * r -
                l * m * r -
                p * i * d +
                e * m * d +
                l * i * x -
                e * u * x) *
              z),
            (t[10] =
              (a * m * r -
                p * h * r +
                p * i * o -
                e * m * o -
                a * i * x +
                e * h * x) *
              z),
            (t[11] =
              (l * h * r -
                a * u * r -
                l * i * o +
                e * u * o +
                a * i * d -
                e * h * d) *
              z),
            (t[12] = M * z),
            (t[13] =
              (l * m * s -
                p * u * s +
                p * i * c -
                e * m * c -
                l * i * y +
                e * u * y) *
              z),
            (t[14] =
              (p * h * s -
                a * m * s -
                p * i * n +
                e * m * n +
                a * i * y -
                e * h * y) *
              z),
            (t[15] =
              (a * u * s -
                l * h * s +
                l * i * n -
                e * u * n -
                a * i * c +
                e * h * c) *
              z),
            this
          );
        }
        scale(t) {
          let e = this.elements,
            i = t.x,
            s = t.y,
            r = t.z;
          return (
            (e[0] *= i),
            (e[4] *= s),
            (e[8] *= r),
            (e[1] *= i),
            (e[5] *= s),
            (e[9] *= r),
            (e[2] *= i),
            (e[6] *= s),
            (e[10] *= r),
            (e[3] *= i),
            (e[7] *= s),
            (e[11] *= r),
            this
          );
        }
        getMaxScaleOnAxis() {
          let t = this.elements;
          return Math.sqrt(
            Math.max(
              t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
              t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
              t[8] * t[8] + t[9] * t[9] + t[10] * t[10]
            )
          );
        }
        makeTranslation(t, e, i) {
          return (
            t.isVector3
              ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1)
              : this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, i, 0, 0, 0, 1),
            this
          );
        }
        makeRotationX(t) {
          let e = Math.cos(t),
            i = Math.sin(t);
          return (
            this.set(1, 0, 0, 0, 0, e, -i, 0, 0, i, e, 0, 0, 0, 0, 1), this
          );
        }
        makeRotationY(t) {
          let e = Math.cos(t),
            i = Math.sin(t);
          return (
            this.set(e, 0, i, 0, 0, 1, 0, 0, -i, 0, e, 0, 0, 0, 0, 1), this
          );
        }
        makeRotationZ(t) {
          let e = Math.cos(t),
            i = Math.sin(t);
          return (
            this.set(e, -i, 0, 0, i, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
          );
        }
        makeRotationAxis(t, e) {
          let i = Math.cos(e),
            s = Math.sin(e),
            r = 1 - i,
            a = t.x,
            h = t.y,
            n = t.z,
            o = r * a,
            l = r * h;
          return (
            this.set(
              o * a + i,
              o * h - s * n,
              o * n + s * h,
              0,
              o * h + s * n,
              l * h + i,
              l * n - s * a,
              0,
              o * n - s * h,
              l * n + s * a,
              r * n * n + i,
              0,
              0,
              0,
              0,
              1
            ),
            this
          );
        }
        makeScale(t, e, i) {
          return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this;
        }
        makeShear(t, e, i, s, r, a) {
          return this.set(1, i, r, 0, t, 1, a, 0, e, s, 1, 0, 0, 0, 0, 1), this;
        }
        compose(t, e, i) {
          let s = this.elements,
            r = e._x,
            a = e._y,
            h = e._z,
            n = e._w,
            o = r + r,
            l = a + a,
            u = h + h,
            c = r * o,
            d = r * l,
            p = r * u,
            m = a * l,
            y = a * u,
            x = h * u,
            f = n * o,
            g = n * l,
            b = n * u,
            M = i.x,
            w = i.y,
            z = i.z;
          return (
            (s[0] = (1 - (m + x)) * M),
            (s[1] = (d + b) * M),
            (s[2] = (p - g) * M),
            (s[3] = 0),
            (s[4] = (d - b) * w),
            (s[5] = (1 - (c + x)) * w),
            (s[6] = (y + f) * w),
            (s[7] = 0),
            (s[8] = (p + g) * z),
            (s[9] = (y - f) * z),
            (s[10] = (1 - (c + m)) * z),
            (s[11] = 0),
            (s[12] = t.x),
            (s[13] = t.y),
            (s[14] = t.z),
            (s[15] = 1),
            this
          );
        }
        decompose(t, e, i) {
          let s = this.elements,
            r = h.set(s[0], s[1], s[2]).length(),
            a = h.set(s[4], s[5], s[6]).length(),
            o = h.set(s[8], s[9], s[10]).length();
          0 > this.determinant() && (r = -r),
            (t.x = s[12]),
            (t.y = s[13]),
            (t.z = s[14]),
            n.copy(this);
          let l = 1 / r,
            u = 1 / a,
            c = 1 / o;
          return (
            (n.elements[0] *= l),
            (n.elements[1] *= l),
            (n.elements[2] *= l),
            (n.elements[4] *= u),
            (n.elements[5] *= u),
            (n.elements[6] *= u),
            (n.elements[8] *= c),
            (n.elements[9] *= c),
            (n.elements[10] *= c),
            e.setFromRotationMatrix(n),
            (i.x = r),
            (i.y = a),
            (i.z = o),
            this
          );
        }
        makePerspective(t, e, i, r, a, h, n = s.TdN) {
          let o, l;
          let u = this.elements;
          if (n === s.TdN)
            (o = -(h + a) / (h - a)), (l = (-2 * h * a) / (h - a));
          else if (n === s.i7u) (o = -h / (h - a)), (l = (-h * a) / (h - a));
          else
            throw Error(
              "THREE.Matrix4.makePerspective(): Invalid coordinate system: " + n
            );
          return (
            (u[0] = (2 * a) / (e - t)),
            (u[4] = 0),
            (u[8] = (e + t) / (e - t)),
            (u[12] = 0),
            (u[1] = 0),
            (u[5] = (2 * a) / (i - r)),
            (u[9] = (i + r) / (i - r)),
            (u[13] = 0),
            (u[2] = 0),
            (u[6] = 0),
            (u[10] = o),
            (u[14] = l),
            (u[3] = 0),
            (u[7] = 0),
            (u[11] = -1),
            (u[15] = 0),
            this
          );
        }
        makeOrthographic(t, e, i, r, a, h, n = s.TdN) {
          let o, l;
          let u = this.elements,
            c = 1 / (e - t),
            d = 1 / (i - r),
            p = 1 / (h - a);
          if (n === s.TdN) (o = (h + a) * p), (l = -2 * p);
          else if (n === s.i7u) (o = a * p), (l = -1 * p);
          else
            throw Error(
              "THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " +
                n
            );
          return (
            (u[0] = 2 * c),
            (u[4] = 0),
            (u[8] = 0),
            (u[12] = -((e + t) * c)),
            (u[1] = 0),
            (u[5] = 2 * d),
            (u[9] = 0),
            (u[13] = -((i + r) * d)),
            (u[2] = 0),
            (u[6] = 0),
            (u[10] = l),
            (u[14] = -o),
            (u[3] = 0),
            (u[7] = 0),
            (u[11] = 0),
            (u[15] = 1),
            this
          );
        }
        equals(t) {
          let e = this.elements,
            i = t.elements;
          for (let t = 0; t < 16; t++) if (e[t] !== i[t]) return !1;
          return !0;
        }
        fromArray(t, e = 0) {
          for (let i = 0; i < 16; i++) this.elements[i] = t[i + e];
          return this;
        }
        toArray(t = [], e = 0) {
          let i = this.elements;
          return (
            (t[e] = i[0]),
            (t[e + 1] = i[1]),
            (t[e + 2] = i[2]),
            (t[e + 3] = i[3]),
            (t[e + 4] = i[4]),
            (t[e + 5] = i[5]),
            (t[e + 6] = i[6]),
            (t[e + 7] = i[7]),
            (t[e + 8] = i[8]),
            (t[e + 9] = i[9]),
            (t[e + 10] = i[10]),
            (t[e + 11] = i[11]),
            (t[e + 12] = i[12]),
            (t[e + 13] = i[13]),
            (t[e + 14] = i[14]),
            (t[e + 15] = i[15]),
            t
          );
        }
      }
      let h = new r.P(),
        n = new a(),
        o = new r.P(0, 0, 0),
        l = new r.P(1, 1, 1),
        u = new r.P(),
        c = new r.P(),
        d = new r.P();
    },
    5531: (t, e, i) => {
      i.d(e, { P: () => r });
      var s = i(8962);
      class r {
        constructor(t = 0, e = 0, i = 0, s = 1) {
          (this.isQuaternion = !0),
            (this._x = t),
            (this._y = e),
            (this._z = i),
            (this._w = s);
        }
        static slerpFlat(t, e, i, s, r, a, h) {
          let n = i[s + 0],
            o = i[s + 1],
            l = i[s + 2],
            u = i[s + 3],
            c = r[a + 0],
            d = r[a + 1],
            p = r[a + 2],
            m = r[a + 3];
          if (0 === h) {
            (t[e + 0] = n), (t[e + 1] = o), (t[e + 2] = l), (t[e + 3] = u);
            return;
          }
          if (1 === h) {
            (t[e + 0] = c), (t[e + 1] = d), (t[e + 2] = p), (t[e + 3] = m);
            return;
          }
          if (u !== m || n !== c || o !== d || l !== p) {
            let t = 1 - h,
              e = n * c + o * d + l * p + u * m,
              i = e >= 0 ? 1 : -1,
              s = 1 - e * e;
            if (s > Number.EPSILON) {
              let r = Math.sqrt(s),
                a = Math.atan2(r, e * i);
              (t = Math.sin(t * a) / r), (h = Math.sin(h * a) / r);
            }
            let r = h * i;
            if (
              ((n = n * t + c * r),
              (o = o * t + d * r),
              (l = l * t + p * r),
              (u = u * t + m * r),
              t === 1 - h)
            ) {
              let t = 1 / Math.sqrt(n * n + o * o + l * l + u * u);
              (n *= t), (o *= t), (l *= t), (u *= t);
            }
          }
          (t[e] = n), (t[e + 1] = o), (t[e + 2] = l), (t[e + 3] = u);
        }
        static multiplyQuaternionsFlat(t, e, i, s, r, a) {
          let h = i[s],
            n = i[s + 1],
            o = i[s + 2],
            l = i[s + 3],
            u = r[a],
            c = r[a + 1],
            d = r[a + 2],
            p = r[a + 3];
          return (
            (t[e] = h * p + l * u + n * d - o * c),
            (t[e + 1] = n * p + l * c + o * u - h * d),
            (t[e + 2] = o * p + l * d + h * c - n * u),
            (t[e + 3] = l * p - h * u - n * c - o * d),
            t
          );
        }
        get x() {
          return this._x;
        }
        set x(t) {
          (this._x = t), this._onChangeCallback();
        }
        get y() {
          return this._y;
        }
        set y(t) {
          (this._y = t), this._onChangeCallback();
        }
        get z() {
          return this._z;
        }
        set z(t) {
          (this._z = t), this._onChangeCallback();
        }
        get w() {
          return this._w;
        }
        set w(t) {
          (this._w = t), this._onChangeCallback();
        }
        set(t, e, i, s) {
          return (
            (this._x = t),
            (this._y = e),
            (this._z = i),
            (this._w = s),
            this._onChangeCallback(),
            this
          );
        }
        clone() {
          return new this.constructor(this._x, this._y, this._z, this._w);
        }
        copy(t) {
          return (
            (this._x = t.x),
            (this._y = t.y),
            (this._z = t.z),
            (this._w = t.w),
            this._onChangeCallback(),
            this
          );
        }
        setFromEuler(t, e = !0) {
          let i = t._x,
            s = t._y,
            r = t._z,
            a = t._order,
            h = Math.cos,
            n = Math.sin,
            o = h(i / 2),
            l = h(s / 2),
            u = h(r / 2),
            c = n(i / 2),
            d = n(s / 2),
            p = n(r / 2);
          switch (a) {
            case "XYZ":
              (this._x = c * l * u + o * d * p),
                (this._y = o * d * u - c * l * p),
                (this._z = o * l * p + c * d * u),
                (this._w = o * l * u - c * d * p);
              break;
            case "YXZ":
              (this._x = c * l * u + o * d * p),
                (this._y = o * d * u - c * l * p),
                (this._z = o * l * p - c * d * u),
                (this._w = o * l * u + c * d * p);
              break;
            case "ZXY":
              (this._x = c * l * u - o * d * p),
                (this._y = o * d * u + c * l * p),
                (this._z = o * l * p + c * d * u),
                (this._w = o * l * u - c * d * p);
              break;
            case "ZYX":
              (this._x = c * l * u - o * d * p),
                (this._y = o * d * u + c * l * p),
                (this._z = o * l * p - c * d * u),
                (this._w = o * l * u + c * d * p);
              break;
            case "YZX":
              (this._x = c * l * u + o * d * p),
                (this._y = o * d * u + c * l * p),
                (this._z = o * l * p - c * d * u),
                (this._w = o * l * u - c * d * p);
              break;
            case "XZY":
              (this._x = c * l * u - o * d * p),
                (this._y = o * d * u - c * l * p),
                (this._z = o * l * p + c * d * u),
                (this._w = o * l * u + c * d * p);
              break;
            default:
              console.warn(
                "THREE.Quaternion: .setFromEuler() encountered an unknown order: " +
                  a
              );
          }
          return !0 === e && this._onChangeCallback(), this;
        }
        setFromAxisAngle(t, e) {
          let i = e / 2,
            s = Math.sin(i);
          return (
            (this._x = t.x * s),
            (this._y = t.y * s),
            (this._z = t.z * s),
            (this._w = Math.cos(i)),
            this._onChangeCallback(),
            this
          );
        }
        setFromRotationMatrix(t) {
          let e = t.elements,
            i = e[0],
            s = e[4],
            r = e[8],
            a = e[1],
            h = e[5],
            n = e[9],
            o = e[2],
            l = e[6],
            u = e[10],
            c = i + h + u;
          if (c > 0) {
            let t = 0.5 / Math.sqrt(c + 1);
            (this._w = 0.25 / t),
              (this._x = (l - n) * t),
              (this._y = (r - o) * t),
              (this._z = (a - s) * t);
          } else if (i > h && i > u) {
            let t = 2 * Math.sqrt(1 + i - h - u);
            (this._w = (l - n) / t),
              (this._x = 0.25 * t),
              (this._y = (s + a) / t),
              (this._z = (r + o) / t);
          } else if (h > u) {
            let t = 2 * Math.sqrt(1 + h - i - u);
            (this._w = (r - o) / t),
              (this._x = (s + a) / t),
              (this._y = 0.25 * t),
              (this._z = (n + l) / t);
          } else {
            let t = 2 * Math.sqrt(1 + u - i - h);
            (this._w = (a - s) / t),
              (this._x = (r + o) / t),
              (this._y = (n + l) / t),
              (this._z = 0.25 * t);
          }
          return this._onChangeCallback(), this;
        }
        setFromUnitVectors(t, e) {
          let i = t.dot(e) + 1;
          return (
            i < Number.EPSILON
              ? ((i = 0),
                Math.abs(t.x) > Math.abs(t.z)
                  ? ((this._x = -t.y), (this._y = t.x), (this._z = 0))
                  : ((this._x = 0), (this._y = -t.z), (this._z = t.y)))
              : ((this._x = t.y * e.z - t.z * e.y),
                (this._y = t.z * e.x - t.x * e.z),
                (this._z = t.x * e.y - t.y * e.x)),
            (this._w = i),
            this.normalize()
          );
        }
        angleTo(t) {
          return 2 * Math.acos(Math.abs((0, s.qE)(this.dot(t), -1, 1)));
        }
        rotateTowards(t, e) {
          let i = this.angleTo(t);
          if (0 === i) return this;
          let s = Math.min(1, e / i);
          return this.slerp(t, s), this;
        }
        identity() {
          return this.set(0, 0, 0, 1);
        }
        invert() {
          return this.conjugate();
        }
        conjugate() {
          return (
            (this._x *= -1),
            (this._y *= -1),
            (this._z *= -1),
            this._onChangeCallback(),
            this
          );
        }
        dot(t) {
          return (
            this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w
          );
        }
        lengthSq() {
          return (
            this._x * this._x +
            this._y * this._y +
            this._z * this._z +
            this._w * this._w
          );
        }
        length() {
          return Math.sqrt(
            this._x * this._x +
              this._y * this._y +
              this._z * this._z +
              this._w * this._w
          );
        }
        normalize() {
          let t = this.length();
          return (
            0 === t
              ? ((this._x = 0), (this._y = 0), (this._z = 0), (this._w = 1))
              : ((t = 1 / t),
                (this._x = this._x * t),
                (this._y = this._y * t),
                (this._z = this._z * t),
                (this._w = this._w * t)),
            this._onChangeCallback(),
            this
          );
        }
        multiply(t) {
          return this.multiplyQuaternions(this, t);
        }
        premultiply(t) {
          return this.multiplyQuaternions(t, this);
        }
        multiplyQuaternions(t, e) {
          let i = t._x,
            s = t._y,
            r = t._z,
            a = t._w,
            h = e._x,
            n = e._y,
            o = e._z,
            l = e._w;
          return (
            (this._x = i * l + a * h + s * o - r * n),
            (this._y = s * l + a * n + r * h - i * o),
            (this._z = r * l + a * o + i * n - s * h),
            (this._w = a * l - i * h - s * n - r * o),
            this._onChangeCallback(),
            this
          );
        }
        slerp(t, e) {
          if (0 === e) return this;
          if (1 === e) return this.copy(t);
          let i = this._x,
            s = this._y,
            r = this._z,
            a = this._w,
            h = a * t._w + i * t._x + s * t._y + r * t._z;
          if (
            (h < 0
              ? ((this._w = -t._w),
                (this._x = -t._x),
                (this._y = -t._y),
                (this._z = -t._z),
                (h = -h))
              : this.copy(t),
            h >= 1)
          )
            return (
              (this._w = a), (this._x = i), (this._y = s), (this._z = r), this
            );
          let n = 1 - h * h;
          if (n <= Number.EPSILON) {
            let t = 1 - e;
            return (
              (this._w = t * a + e * this._w),
              (this._x = t * i + e * this._x),
              (this._y = t * s + e * this._y),
              (this._z = t * r + e * this._z),
              this.normalize(),
              this
            );
          }
          let o = Math.sqrt(n),
            l = Math.atan2(o, h),
            u = Math.sin((1 - e) * l) / o,
            c = Math.sin(e * l) / o;
          return (
            (this._w = a * u + this._w * c),
            (this._x = i * u + this._x * c),
            (this._y = s * u + this._y * c),
            (this._z = r * u + this._z * c),
            this._onChangeCallback(),
            this
          );
        }
        slerpQuaternions(t, e, i) {
          return this.copy(t).slerp(e, i);
        }
        random() {
          let t = 2 * Math.PI * Math.random(),
            e = 2 * Math.PI * Math.random(),
            i = Math.random(),
            s = Math.sqrt(1 - i),
            r = Math.sqrt(i);
          return this.set(
            s * Math.sin(t),
            s * Math.cos(t),
            r * Math.sin(e),
            r * Math.cos(e)
          );
        }
        equals(t) {
          return (
            t._x === this._x &&
            t._y === this._y &&
            t._z === this._z &&
            t._w === this._w
          );
        }
        fromArray(t, e = 0) {
          return (
            (this._x = t[e]),
            (this._y = t[e + 1]),
            (this._z = t[e + 2]),
            (this._w = t[e + 3]),
            this._onChangeCallback(),
            this
          );
        }
        toArray(t = [], e = 0) {
          return (
            (t[e] = this._x),
            (t[e + 1] = this._y),
            (t[e + 2] = this._z),
            (t[e + 3] = this._w),
            t
          );
        }
        fromBufferAttribute(t, e) {
          return (
            (this._x = t.getX(e)),
            (this._y = t.getY(e)),
            (this._z = t.getZ(e)),
            (this._w = t.getW(e)),
            this._onChangeCallback(),
            this
          );
        }
        toJSON() {
          return this.toArray();
        }
        _onChange(t) {
          return (this._onChangeCallback = t), this;
        }
        _onChangeCallback() {}
        *[Symbol.iterator]() {
          yield this._x, yield this._y, yield this._z, yield this._w;
        }
      }
    },
    5426: (t, e, i) => {
      i.d(e, { i: () => o });
      var s = i(7389),
        r = i(5117);
      let a = new s.N(),
        h = new r.P(),
        n = new r.P();
      class o {
        constructor(t = new r.P(), e = -1) {
          (this.isSphere = !0), (this.center = t), (this.radius = e);
        }
        set(t, e) {
          return this.center.copy(t), (this.radius = e), this;
        }
        setFromPoints(t, e) {
          let i = this.center;
          void 0 !== e ? i.copy(e) : a.setFromPoints(t).getCenter(i);
          let s = 0;
          for (let e = 0, r = t.length; e < r; e++)
            s = Math.max(s, i.distanceToSquared(t[e]));
          return (this.radius = Math.sqrt(s)), this;
        }
        copy(t) {
          return this.center.copy(t.center), (this.radius = t.radius), this;
        }
        isEmpty() {
          return this.radius < 0;
        }
        makeEmpty() {
          return this.center.set(0, 0, 0), (this.radius = -1), this;
        }
        containsPoint(t) {
          return t.distanceToSquared(this.center) <= this.radius * this.radius;
        }
        distanceToPoint(t) {
          return t.distanceTo(this.center) - this.radius;
        }
        intersectsSphere(t) {
          let e = this.radius + t.radius;
          return t.center.distanceToSquared(this.center) <= e * e;
        }
        intersectsBox(t) {
          return t.intersectsSphere(this);
        }
        intersectsPlane(t) {
          return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
        }
        clampPoint(t, e) {
          let i = this.center.distanceToSquared(t);
          return (
            e.copy(t),
            i > this.radius * this.radius &&
              (e.sub(this.center).normalize(),
              e.multiplyScalar(this.radius).add(this.center)),
            e
          );
        }
        getBoundingBox(t) {
          return (
            this.isEmpty()
              ? t.makeEmpty()
              : (t.set(this.center, this.center),
                t.expandByScalar(this.radius)),
            t
          );
        }
        applyMatrix4(t) {
          return (
            this.center.applyMatrix4(t),
            (this.radius = this.radius * t.getMaxScaleOnAxis()),
            this
          );
        }
        translate(t) {
          return this.center.add(t), this;
        }
        expandByPoint(t) {
          if (this.isEmpty())
            return this.center.copy(t), (this.radius = 0), this;
          h.subVectors(t, this.center);
          let e = h.lengthSq();
          if (e > this.radius * this.radius) {
            let t = Math.sqrt(e),
              i = (t - this.radius) * 0.5;
            this.center.addScaledVector(h, i / t), (this.radius += i);
          }
          return this;
        }
        union(t) {
          return (
            t.isEmpty() ||
              (this.isEmpty()
                ? this.copy(t)
                : !0 === this.center.equals(t.center)
                ? (this.radius = Math.max(this.radius, t.radius))
                : (n.subVectors(t.center, this.center).setLength(t.radius),
                  this.expandByPoint(h.copy(t.center).add(n)),
                  this.expandByPoint(h.copy(t.center).sub(n)))),
            this
          );
        }
        equals(t) {
          return t.center.equals(this.center) && t.radius === this.radius;
        }
        clone() {
          return new this.constructor().copy(this);
        }
      }
    },
    453: (t, e, i) => {
      i.d(e, { I: () => r });
      var s = i(8962);
      class r {
        constructor(t = 0, e = 0) {
          (r.prototype.isVector2 = !0), (this.x = t), (this.y = e);
        }
        get width() {
          return this.x;
        }
        set width(t) {
          this.x = t;
        }
        get height() {
          return this.y;
        }
        set height(t) {
          this.y = t;
        }
        set(t, e) {
          return (this.x = t), (this.y = e), this;
        }
        setScalar(t) {
          return (this.x = t), (this.y = t), this;
        }
        setX(t) {
          return (this.x = t), this;
        }
        setY(t) {
          return (this.y = t), this;
        }
        setComponent(t, e) {
          switch (t) {
            case 0:
              this.x = e;
              break;
            case 1:
              this.y = e;
              break;
            default:
              throw Error("index is out of range: " + t);
          }
          return this;
        }
        getComponent(t) {
          switch (t) {
            case 0:
              return this.x;
            case 1:
              return this.y;
            default:
              throw Error("index is out of range: " + t);
          }
        }
        clone() {
          return new this.constructor(this.x, this.y);
        }
        copy(t) {
          return (this.x = t.x), (this.y = t.y), this;
        }
        add(t) {
          return (this.x += t.x), (this.y += t.y), this;
        }
        addScalar(t) {
          return (this.x += t), (this.y += t), this;
        }
        addVectors(t, e) {
          return (this.x = t.x + e.x), (this.y = t.y + e.y), this;
        }
        addScaledVector(t, e) {
          return (this.x += t.x * e), (this.y += t.y * e), this;
        }
        sub(t) {
          return (this.x -= t.x), (this.y -= t.y), this;
        }
        subScalar(t) {
          return (this.x -= t), (this.y -= t), this;
        }
        subVectors(t, e) {
          return (this.x = t.x - e.x), (this.y = t.y - e.y), this;
        }
        multiply(t) {
          return (this.x *= t.x), (this.y *= t.y), this;
        }
        multiplyScalar(t) {
          return (this.x *= t), (this.y *= t), this;
        }
        divide(t) {
          return (this.x /= t.x), (this.y /= t.y), this;
        }
        divideScalar(t) {
          return this.multiplyScalar(1 / t);
        }
        applyMatrix3(t) {
          let e = this.x,
            i = this.y,
            s = t.elements;
          return (
            (this.x = s[0] * e + s[3] * i + s[6]),
            (this.y = s[1] * e + s[4] * i + s[7]),
            this
          );
        }
        min(t) {
          return (
            (this.x = Math.min(this.x, t.x)),
            (this.y = Math.min(this.y, t.y)),
            this
          );
        }
        max(t) {
          return (
            (this.x = Math.max(this.x, t.x)),
            (this.y = Math.max(this.y, t.y)),
            this
          );
        }
        clamp(t, e) {
          return (
            (this.x = (0, s.qE)(this.x, t.x, e.x)),
            (this.y = (0, s.qE)(this.y, t.y, e.y)),
            this
          );
        }
        clampScalar(t, e) {
          return (
            (this.x = (0, s.qE)(this.x, t, e)),
            (this.y = (0, s.qE)(this.y, t, e)),
            this
          );
        }
        clampLength(t, e) {
          let i = this.length();
          return this.divideScalar(i || 1).multiplyScalar((0, s.qE)(i, t, e));
        }
        floor() {
          return (
            (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this
          );
        }
        ceil() {
          return (
            (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this
          );
        }
        round() {
          return (
            (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this
          );
        }
        roundToZero() {
          return (
            (this.x = Math.trunc(this.x)), (this.y = Math.trunc(this.y)), this
          );
        }
        negate() {
          return (this.x = -this.x), (this.y = -this.y), this;
        }
        dot(t) {
          return this.x * t.x + this.y * t.y;
        }
        cross(t) {
          return this.x * t.y - this.y * t.x;
        }
        lengthSq() {
          return this.x * this.x + this.y * this.y;
        }
        length() {
          return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        manhattanLength() {
          return Math.abs(this.x) + Math.abs(this.y);
        }
        normalize() {
          return this.divideScalar(this.length() || 1);
        }
        angle() {
          return Math.atan2(-this.y, -this.x) + Math.PI;
        }
        angleTo(t) {
          let e = Math.sqrt(this.lengthSq() * t.lengthSq());
          if (0 === e) return Math.PI / 2;
          let i = this.dot(t) / e;
          return Math.acos((0, s.qE)(i, -1, 1));
        }
        distanceTo(t) {
          return Math.sqrt(this.distanceToSquared(t));
        }
        distanceToSquared(t) {
          let e = this.x - t.x,
            i = this.y - t.y;
          return e * e + i * i;
        }
        manhattanDistanceTo(t) {
          return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
        }
        setLength(t) {
          return this.normalize().multiplyScalar(t);
        }
        lerp(t, e) {
          return (
            (this.x += (t.x - this.x) * e), (this.y += (t.y - this.y) * e), this
          );
        }
        lerpVectors(t, e, i) {
          return (
            (this.x = t.x + (e.x - t.x) * i),
            (this.y = t.y + (e.y - t.y) * i),
            this
          );
        }
        equals(t) {
          return t.x === this.x && t.y === this.y;
        }
        fromArray(t, e = 0) {
          return (this.x = t[e]), (this.y = t[e + 1]), this;
        }
        toArray(t = [], e = 0) {
          return (t[e] = this.x), (t[e + 1] = this.y), t;
        }
        fromBufferAttribute(t, e) {
          return (this.x = t.getX(e)), (this.y = t.getY(e)), this;
        }
        rotateAround(t, e) {
          let i = Math.cos(e),
            s = Math.sin(e),
            r = this.x - t.x,
            a = this.y - t.y;
          return (
            (this.x = r * i - a * s + t.x), (this.y = r * s + a * i + t.y), this
          );
        }
        random() {
          return (this.x = Math.random()), (this.y = Math.random()), this;
        }
        *[Symbol.iterator]() {
          yield this.x, yield this.y;
        }
      }
    },
    5117: (t, e, i) => {
      i.d(e, { P: () => a });
      var s = i(8962),
        r = i(5531);
      class a {
        constructor(t = 0, e = 0, i = 0) {
          (a.prototype.isVector3 = !0),
            (this.x = t),
            (this.y = e),
            (this.z = i);
        }
        set(t, e, i) {
          return (
            void 0 === i && (i = this.z),
            (this.x = t),
            (this.y = e),
            (this.z = i),
            this
          );
        }
        setScalar(t) {
          return (this.x = t), (this.y = t), (this.z = t), this;
        }
        setX(t) {
          return (this.x = t), this;
        }
        setY(t) {
          return (this.y = t), this;
        }
        setZ(t) {
          return (this.z = t), this;
        }
        setComponent(t, e) {
          switch (t) {
            case 0:
              this.x = e;
              break;
            case 1:
              this.y = e;
              break;
            case 2:
              this.z = e;
              break;
            default:
              throw Error("index is out of range: " + t);
          }
          return this;
        }
        getComponent(t) {
          switch (t) {
            case 0:
              return this.x;
            case 1:
              return this.y;
            case 2:
              return this.z;
            default:
              throw Error("index is out of range: " + t);
          }
        }
        clone() {
          return new this.constructor(this.x, this.y, this.z);
        }
        copy(t) {
          return (this.x = t.x), (this.y = t.y), (this.z = t.z), this;
        }
        add(t) {
          return (this.x += t.x), (this.y += t.y), (this.z += t.z), this;
        }
        addScalar(t) {
          return (this.x += t), (this.y += t), (this.z += t), this;
        }
        addVectors(t, e) {
          return (
            (this.x = t.x + e.x),
            (this.y = t.y + e.y),
            (this.z = t.z + e.z),
            this
          );
        }
        addScaledVector(t, e) {
          return (
            (this.x += t.x * e), (this.y += t.y * e), (this.z += t.z * e), this
          );
        }
        sub(t) {
          return (this.x -= t.x), (this.y -= t.y), (this.z -= t.z), this;
        }
        subScalar(t) {
          return (this.x -= t), (this.y -= t), (this.z -= t), this;
        }
        subVectors(t, e) {
          return (
            (this.x = t.x - e.x),
            (this.y = t.y - e.y),
            (this.z = t.z - e.z),
            this
          );
        }
        multiply(t) {
          return (this.x *= t.x), (this.y *= t.y), (this.z *= t.z), this;
        }
        multiplyScalar(t) {
          return (this.x *= t), (this.y *= t), (this.z *= t), this;
        }
        multiplyVectors(t, e) {
          return (
            (this.x = t.x * e.x),
            (this.y = t.y * e.y),
            (this.z = t.z * e.z),
            this
          );
        }
        applyEuler(t) {
          return this.applyQuaternion(n.setFromEuler(t));
        }
        applyAxisAngle(t, e) {
          return this.applyQuaternion(n.setFromAxisAngle(t, e));
        }
        applyMatrix3(t) {
          let e = this.x,
            i = this.y,
            s = this.z,
            r = t.elements;
          return (
            (this.x = r[0] * e + r[3] * i + r[6] * s),
            (this.y = r[1] * e + r[4] * i + r[7] * s),
            (this.z = r[2] * e + r[5] * i + r[8] * s),
            this
          );
        }
        applyNormalMatrix(t) {
          return this.applyMatrix3(t).normalize();
        }
        applyMatrix4(t) {
          let e = this.x,
            i = this.y,
            s = this.z,
            r = t.elements,
            a = 1 / (r[3] * e + r[7] * i + r[11] * s + r[15]);
          return (
            (this.x = (r[0] * e + r[4] * i + r[8] * s + r[12]) * a),
            (this.y = (r[1] * e + r[5] * i + r[9] * s + r[13]) * a),
            (this.z = (r[2] * e + r[6] * i + r[10] * s + r[14]) * a),
            this
          );
        }
        applyQuaternion(t) {
          let e = this.x,
            i = this.y,
            s = this.z,
            r = t.x,
            a = t.y,
            h = t.z,
            n = t.w,
            o = 2 * (a * s - h * i),
            l = 2 * (h * e - r * s),
            u = 2 * (r * i - a * e);
          return (
            (this.x = e + n * o + a * u - h * l),
            (this.y = i + n * l + h * o - r * u),
            (this.z = s + n * u + r * l - a * o),
            this
          );
        }
        project(t) {
          return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(
            t.projectionMatrix
          );
        }
        unproject(t) {
          return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(
            t.matrixWorld
          );
        }
        transformDirection(t) {
          let e = this.x,
            i = this.y,
            s = this.z,
            r = t.elements;
          return (
            (this.x = r[0] * e + r[4] * i + r[8] * s),
            (this.y = r[1] * e + r[5] * i + r[9] * s),
            (this.z = r[2] * e + r[6] * i + r[10] * s),
            this.normalize()
          );
        }
        divide(t) {
          return (this.x /= t.x), (this.y /= t.y), (this.z /= t.z), this;
        }
        divideScalar(t) {
          return this.multiplyScalar(1 / t);
        }
        min(t) {
          return (
            (this.x = Math.min(this.x, t.x)),
            (this.y = Math.min(this.y, t.y)),
            (this.z = Math.min(this.z, t.z)),
            this
          );
        }
        max(t) {
          return (
            (this.x = Math.max(this.x, t.x)),
            (this.y = Math.max(this.y, t.y)),
            (this.z = Math.max(this.z, t.z)),
            this
          );
        }
        clamp(t, e) {
          return (
            (this.x = (0, s.qE)(this.x, t.x, e.x)),
            (this.y = (0, s.qE)(this.y, t.y, e.y)),
            (this.z = (0, s.qE)(this.z, t.z, e.z)),
            this
          );
        }
        clampScalar(t, e) {
          return (
            (this.x = (0, s.qE)(this.x, t, e)),
            (this.y = (0, s.qE)(this.y, t, e)),
            (this.z = (0, s.qE)(this.z, t, e)),
            this
          );
        }
        clampLength(t, e) {
          let i = this.length();
          return this.divideScalar(i || 1).multiplyScalar((0, s.qE)(i, t, e));
        }
        floor() {
          return (
            (this.x = Math.floor(this.x)),
            (this.y = Math.floor(this.y)),
            (this.z = Math.floor(this.z)),
            this
          );
        }
        ceil() {
          return (
            (this.x = Math.ceil(this.x)),
            (this.y = Math.ceil(this.y)),
            (this.z = Math.ceil(this.z)),
            this
          );
        }
        round() {
          return (
            (this.x = Math.round(this.x)),
            (this.y = Math.round(this.y)),
            (this.z = Math.round(this.z)),
            this
          );
        }
        roundToZero() {
          return (
            (this.x = Math.trunc(this.x)),
            (this.y = Math.trunc(this.y)),
            (this.z = Math.trunc(this.z)),
            this
          );
        }
        negate() {
          return (
            (this.x = -this.x), (this.y = -this.y), (this.z = -this.z), this
          );
        }
        dot(t) {
          return this.x * t.x + this.y * t.y + this.z * t.z;
        }
        lengthSq() {
          return this.x * this.x + this.y * this.y + this.z * this.z;
        }
        length() {
          return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
        manhattanLength() {
          return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
        }
        normalize() {
          return this.divideScalar(this.length() || 1);
        }
        setLength(t) {
          return this.normalize().multiplyScalar(t);
        }
        lerp(t, e) {
          return (
            (this.x += (t.x - this.x) * e),
            (this.y += (t.y - this.y) * e),
            (this.z += (t.z - this.z) * e),
            this
          );
        }
        lerpVectors(t, e, i) {
          return (
            (this.x = t.x + (e.x - t.x) * i),
            (this.y = t.y + (e.y - t.y) * i),
            (this.z = t.z + (e.z - t.z) * i),
            this
          );
        }
        cross(t) {
          return this.crossVectors(this, t);
        }
        crossVectors(t, e) {
          let i = t.x,
            s = t.y,
            r = t.z,
            a = e.x,
            h = e.y,
            n = e.z;
          return (
            (this.x = s * n - r * h),
            (this.y = r * a - i * n),
            (this.z = i * h - s * a),
            this
          );
        }
        projectOnVector(t) {
          let e = t.lengthSq();
          if (0 === e) return this.set(0, 0, 0);
          let i = t.dot(this) / e;
          return this.copy(t).multiplyScalar(i);
        }
        projectOnPlane(t) {
          return h.copy(this).projectOnVector(t), this.sub(h);
        }
        reflect(t) {
          return this.sub(h.copy(t).multiplyScalar(2 * this.dot(t)));
        }
        angleTo(t) {
          let e = Math.sqrt(this.lengthSq() * t.lengthSq());
          if (0 === e) return Math.PI / 2;
          let i = this.dot(t) / e;
          return Math.acos((0, s.qE)(i, -1, 1));
        }
        distanceTo(t) {
          return Math.sqrt(this.distanceToSquared(t));
        }
        distanceToSquared(t) {
          let e = this.x - t.x,
            i = this.y - t.y,
            s = this.z - t.z;
          return e * e + i * i + s * s;
        }
        manhattanDistanceTo(t) {
          return (
            Math.abs(this.x - t.x) +
            Math.abs(this.y - t.y) +
            Math.abs(this.z - t.z)
          );
        }
        setFromSpherical(t) {
          return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
        }
        setFromSphericalCoords(t, e, i) {
          let s = Math.sin(e) * t;
          return (
            (this.x = s * Math.sin(i)),
            (this.y = Math.cos(e) * t),
            (this.z = s * Math.cos(i)),
            this
          );
        }
        setFromCylindrical(t) {
          return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
        }
        setFromCylindricalCoords(t, e, i) {
          return (
            (this.x = t * Math.sin(e)),
            (this.y = i),
            (this.z = t * Math.cos(e)),
            this
          );
        }
        setFromMatrixPosition(t) {
          let e = t.elements;
          return (this.x = e[12]), (this.y = e[13]), (this.z = e[14]), this;
        }
        setFromMatrixScale(t) {
          let e = this.setFromMatrixColumn(t, 0).length(),
            i = this.setFromMatrixColumn(t, 1).length(),
            s = this.setFromMatrixColumn(t, 2).length();
          return (this.x = e), (this.y = i), (this.z = s), this;
        }
        setFromMatrixColumn(t, e) {
          return this.fromArray(t.elements, 4 * e);
        }
        setFromMatrix3Column(t, e) {
          return this.fromArray(t.elements, 3 * e);
        }
        setFromEuler(t) {
          return (this.x = t._x), (this.y = t._y), (this.z = t._z), this;
        }
        setFromColor(t) {
          return (this.x = t.r), (this.y = t.g), (this.z = t.b), this;
        }
        equals(t) {
          return t.x === this.x && t.y === this.y && t.z === this.z;
        }
        fromArray(t, e = 0) {
          return (
            (this.x = t[e]), (this.y = t[e + 1]), (this.z = t[e + 2]), this
          );
        }
        toArray(t = [], e = 0) {
          return (t[e] = this.x), (t[e + 1] = this.y), (t[e + 2] = this.z), t;
        }
        fromBufferAttribute(t, e) {
          return (
            (this.x = t.getX(e)),
            (this.y = t.getY(e)),
            (this.z = t.getZ(e)),
            this
          );
        }
        random() {
          return (
            (this.x = Math.random()),
            (this.y = Math.random()),
            (this.z = Math.random()),
            this
          );
        }
        randomDirection() {
          let t = Math.random() * Math.PI * 2,
            e = 2 * Math.random() - 1,
            i = Math.sqrt(1 - e * e);
          return (
            (this.x = i * Math.cos(t)),
            (this.y = e),
            (this.z = i * Math.sin(t)),
            this
          );
        }
        *[Symbol.iterator]() {
          yield this.x, yield this.y, yield this.z;
        }
      }
      let h = new a(),
        n = new r.P();
    },
    9120: (t, e, i) => {
      i.d(e, { I: () => r });
      var s = i(8962);
      class r {
        constructor(t = 0, e = 0, i = 0, s = 1) {
          (r.prototype.isVector4 = !0),
            (this.x = t),
            (this.y = e),
            (this.z = i),
            (this.w = s);
        }
        get width() {
          return this.z;
        }
        set width(t) {
          this.z = t;
        }
        get height() {
          return this.w;
        }
        set height(t) {
          this.w = t;
        }
        set(t, e, i, s) {
          return (this.x = t), (this.y = e), (this.z = i), (this.w = s), this;
        }
        setScalar(t) {
          return (this.x = t), (this.y = t), (this.z = t), (this.w = t), this;
        }
        setX(t) {
          return (this.x = t), this;
        }
        setY(t) {
          return (this.y = t), this;
        }
        setZ(t) {
          return (this.z = t), this;
        }
        setW(t) {
          return (this.w = t), this;
        }
        setComponent(t, e) {
          switch (t) {
            case 0:
              this.x = e;
              break;
            case 1:
              this.y = e;
              break;
            case 2:
              this.z = e;
              break;
            case 3:
              this.w = e;
              break;
            default:
              throw Error("index is out of range: " + t);
          }
          return this;
        }
        getComponent(t) {
          switch (t) {
            case 0:
              return this.x;
            case 1:
              return this.y;
            case 2:
              return this.z;
            case 3:
              return this.w;
            default:
              throw Error("index is out of range: " + t);
          }
        }
        clone() {
          return new this.constructor(this.x, this.y, this.z, this.w);
        }
        copy(t) {
          return (
            (this.x = t.x),
            (this.y = t.y),
            (this.z = t.z),
            (this.w = void 0 !== t.w ? t.w : 1),
            this
          );
        }
        add(t) {
          return (
            (this.x += t.x),
            (this.y += t.y),
            (this.z += t.z),
            (this.w += t.w),
            this
          );
        }
        addScalar(t) {
          return (
            (this.x += t), (this.y += t), (this.z += t), (this.w += t), this
          );
        }
        addVectors(t, e) {
          return (
            (this.x = t.x + e.x),
            (this.y = t.y + e.y),
            (this.z = t.z + e.z),
            (this.w = t.w + e.w),
            this
          );
        }
        addScaledVector(t, e) {
          return (
            (this.x += t.x * e),
            (this.y += t.y * e),
            (this.z += t.z * e),
            (this.w += t.w * e),
            this
          );
        }
        sub(t) {
          return (
            (this.x -= t.x),
            (this.y -= t.y),
            (this.z -= t.z),
            (this.w -= t.w),
            this
          );
        }
        subScalar(t) {
          return (
            (this.x -= t), (this.y -= t), (this.z -= t), (this.w -= t), this
          );
        }
        subVectors(t, e) {
          return (
            (this.x = t.x - e.x),
            (this.y = t.y - e.y),
            (this.z = t.z - e.z),
            (this.w = t.w - e.w),
            this
          );
        }
        multiply(t) {
          return (
            (this.x *= t.x),
            (this.y *= t.y),
            (this.z *= t.z),
            (this.w *= t.w),
            this
          );
        }
        multiplyScalar(t) {
          return (
            (this.x *= t), (this.y *= t), (this.z *= t), (this.w *= t), this
          );
        }
        applyMatrix4(t) {
          let e = this.x,
            i = this.y,
            s = this.z,
            r = this.w,
            a = t.elements;
          return (
            (this.x = a[0] * e + a[4] * i + a[8] * s + a[12] * r),
            (this.y = a[1] * e + a[5] * i + a[9] * s + a[13] * r),
            (this.z = a[2] * e + a[6] * i + a[10] * s + a[14] * r),
            (this.w = a[3] * e + a[7] * i + a[11] * s + a[15] * r),
            this
          );
        }
        divide(t) {
          return (
            (this.x /= t.x),
            (this.y /= t.y),
            (this.z /= t.z),
            (this.w /= t.w),
            this
          );
        }
        divideScalar(t) {
          return this.multiplyScalar(1 / t);
        }
        setAxisAngleFromQuaternion(t) {
          this.w = 2 * Math.acos(t.w);
          let e = Math.sqrt(1 - t.w * t.w);
          return (
            e < 1e-4
              ? ((this.x = 1), (this.y = 0), (this.z = 0))
              : ((this.x = t.x / e), (this.y = t.y / e), (this.z = t.z / e)),
            this
          );
        }
        setAxisAngleFromRotationMatrix(t) {
          let e, i, s, r;
          let a = t.elements,
            h = a[0],
            n = a[4],
            o = a[8],
            l = a[1],
            u = a[5],
            c = a[9],
            d = a[2],
            p = a[6],
            m = a[10];
          if (
            0.01 > Math.abs(n - l) &&
            0.01 > Math.abs(o - d) &&
            0.01 > Math.abs(c - p)
          ) {
            if (
              0.1 > Math.abs(n + l) &&
              0.1 > Math.abs(o + d) &&
              0.1 > Math.abs(c + p) &&
              0.1 > Math.abs(h + u + m - 3)
            )
              return this.set(1, 0, 0, 0), this;
            e = Math.PI;
            let t = (h + 1) / 2,
              a = (u + 1) / 2,
              y = (m + 1) / 2,
              x = (n + l) / 4,
              f = (o + d) / 4,
              g = (c + p) / 4;
            return (
              t > a && t > y
                ? t < 0.01
                  ? ((i = 0), (s = 0.707106781), (r = 0.707106781))
                  : ((s = x / (i = Math.sqrt(t))), (r = f / i))
                : a > y
                ? a < 0.01
                  ? ((i = 0.707106781), (s = 0), (r = 0.707106781))
                  : ((i = x / (s = Math.sqrt(a))), (r = g / s))
                : y < 0.01
                ? ((i = 0.707106781), (s = 0.707106781), (r = 0))
                : ((i = f / (r = Math.sqrt(y))), (s = g / r)),
              this.set(i, s, r, e),
              this
            );
          }
          let y = Math.sqrt(
            (p - c) * (p - c) + (o - d) * (o - d) + (l - n) * (l - n)
          );
          return (
            0.001 > Math.abs(y) && (y = 1),
            (this.x = (p - c) / y),
            (this.y = (o - d) / y),
            (this.z = (l - n) / y),
            (this.w = Math.acos((h + u + m - 1) / 2)),
            this
          );
        }
        setFromMatrixPosition(t) {
          let e = t.elements;
          return (
            (this.x = e[12]),
            (this.y = e[13]),
            (this.z = e[14]),
            (this.w = e[15]),
            this
          );
        }
        min(t) {
          return (
            (this.x = Math.min(this.x, t.x)),
            (this.y = Math.min(this.y, t.y)),
            (this.z = Math.min(this.z, t.z)),
            (this.w = Math.min(this.w, t.w)),
            this
          );
        }
        max(t) {
          return (
            (this.x = Math.max(this.x, t.x)),
            (this.y = Math.max(this.y, t.y)),
            (this.z = Math.max(this.z, t.z)),
            (this.w = Math.max(this.w, t.w)),
            this
          );
        }
        clamp(t, e) {
          return (
            (this.x = (0, s.qE)(this.x, t.x, e.x)),
            (this.y = (0, s.qE)(this.y, t.y, e.y)),
            (this.z = (0, s.qE)(this.z, t.z, e.z)),
            (this.w = (0, s.qE)(this.w, t.w, e.w)),
            this
          );
        }
        clampScalar(t, e) {
          return (
            (this.x = (0, s.qE)(this.x, t, e)),
            (this.y = (0, s.qE)(this.y, t, e)),
            (this.z = (0, s.qE)(this.z, t, e)),
            (this.w = (0, s.qE)(this.w, t, e)),
            this
          );
        }
        clampLength(t, e) {
          let i = this.length();
          return this.divideScalar(i || 1).multiplyScalar((0, s.qE)(i, t, e));
        }
        floor() {
          return (
            (this.x = Math.floor(this.x)),
            (this.y = Math.floor(this.y)),
            (this.z = Math.floor(this.z)),
            (this.w = Math.floor(this.w)),
            this
          );
        }
        ceil() {
          return (
            (this.x = Math.ceil(this.x)),
            (this.y = Math.ceil(this.y)),
            (this.z = Math.ceil(this.z)),
            (this.w = Math.ceil(this.w)),
            this
          );
        }
        round() {
          return (
            (this.x = Math.round(this.x)),
            (this.y = Math.round(this.y)),
            (this.z = Math.round(this.z)),
            (this.w = Math.round(this.w)),
            this
          );
        }
        roundToZero() {
          return (
            (this.x = Math.trunc(this.x)),
            (this.y = Math.trunc(this.y)),
            (this.z = Math.trunc(this.z)),
            (this.w = Math.trunc(this.w)),
            this
          );
        }
        negate() {
          return (
            (this.x = -this.x),
            (this.y = -this.y),
            (this.z = -this.z),
            (this.w = -this.w),
            this
          );
        }
        dot(t) {
          return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
        }
        lengthSq() {
          return (
            this.x * this.x +
            this.y * this.y +
            this.z * this.z +
            this.w * this.w
          );
        }
        length() {
          return Math.sqrt(
            this.x * this.x +
              this.y * this.y +
              this.z * this.z +
              this.w * this.w
          );
        }
        manhattanLength() {
          return (
            Math.abs(this.x) +
            Math.abs(this.y) +
            Math.abs(this.z) +
            Math.abs(this.w)
          );
        }
        normalize() {
          return this.divideScalar(this.length() || 1);
        }
        setLength(t) {
          return this.normalize().multiplyScalar(t);
        }
        lerp(t, e) {
          return (
            (this.x += (t.x - this.x) * e),
            (this.y += (t.y - this.y) * e),
            (this.z += (t.z - this.z) * e),
            (this.w += (t.w - this.w) * e),
            this
          );
        }
        lerpVectors(t, e, i) {
          return (
            (this.x = t.x + (e.x - t.x) * i),
            (this.y = t.y + (e.y - t.y) * i),
            (this.z = t.z + (e.z - t.z) * i),
            (this.w = t.w + (e.w - t.w) * i),
            this
          );
        }
        equals(t) {
          return (
            t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w
          );
        }
        fromArray(t, e = 0) {
          return (
            (this.x = t[e]),
            (this.y = t[e + 1]),
            (this.z = t[e + 2]),
            (this.w = t[e + 3]),
            this
          );
        }
        toArray(t = [], e = 0) {
          return (
            (t[e] = this.x),
            (t[e + 1] = this.y),
            (t[e + 2] = this.z),
            (t[e + 3] = this.w),
            t
          );
        }
        fromBufferAttribute(t, e) {
          return (
            (this.x = t.getX(e)),
            (this.y = t.getY(e)),
            (this.z = t.getZ(e)),
            (this.w = t.getW(e)),
            this
          );
        }
        random() {
          return (
            (this.x = Math.random()),
            (this.y = Math.random()),
            (this.z = Math.random()),
            (this.w = Math.random()),
            this
          );
        }
        *[Symbol.iterator]() {
          yield this.x, yield this.y, yield this.z, yield this.w;
        }
      }
    },
    8892: (t, e, i) => {
      i.d(e, { e: () => ts });
      var s = i(5117),
        r = i(453),
        a = i(5426);
      let h = new s.P(),
        n = new s.P(),
        o = new s.P(),
        l = new s.P(),
        u = new s.P(),
        c = new s.P(),
        d = new s.P();
      class p {
        constructor(t = new s.P(), e = new s.P(0, 0, -1)) {
          (this.origin = t), (this.direction = e);
        }
        set(t, e) {
          return this.origin.copy(t), this.direction.copy(e), this;
        }
        copy(t) {
          return (
            this.origin.copy(t.origin), this.direction.copy(t.direction), this
          );
        }
        at(t, e) {
          return e.copy(this.origin).addScaledVector(this.direction, t);
        }
        lookAt(t) {
          return this.direction.copy(t).sub(this.origin).normalize(), this;
        }
        recast(t) {
          return this.origin.copy(this.at(t, h)), this;
        }
        closestPointToPoint(t, e) {
          e.subVectors(t, this.origin);
          let i = e.dot(this.direction);
          return i < 0
            ? e.copy(this.origin)
            : e.copy(this.origin).addScaledVector(this.direction, i);
        }
        distanceToPoint(t) {
          return Math.sqrt(this.distanceSqToPoint(t));
        }
        distanceSqToPoint(t) {
          let e = h.subVectors(t, this.origin).dot(this.direction);
          return e < 0
            ? this.origin.distanceToSquared(t)
            : (h.copy(this.origin).addScaledVector(this.direction, e),
              h.distanceToSquared(t));
        }
        distanceSqToSegment(t, e, i, s) {
          let r, a, h, u;
          n.copy(t).add(e).multiplyScalar(0.5),
            o.copy(e).sub(t).normalize(),
            l.copy(this.origin).sub(n);
          let c = 0.5 * t.distanceTo(e),
            d = -this.direction.dot(o),
            p = l.dot(this.direction),
            m = -l.dot(o),
            y = l.lengthSq(),
            x = Math.abs(1 - d * d);
          if (x > 0) {
            if (((r = d * m - p), (a = d * p - m), (u = c * x), r >= 0)) {
              if (a >= -u) {
                if (a <= u) {
                  let t = 1 / x;
                  (r *= t),
                    (a *= t),
                    (h = r * (r + d * a + 2 * p) + a * (d * r + a + 2 * m) + y);
                } else
                  h =
                    -(r = Math.max(0, -(d * (a = c) + p))) * r +
                    a * (a + 2 * m) +
                    y;
              } else
                h =
                  -(r = Math.max(0, -(d * (a = -c) + p))) * r +
                  a * (a + 2 * m) +
                  y;
            } else
              a <= -u
                ? ((a =
                    (r = Math.max(0, -(-d * c + p))) > 0
                      ? -c
                      : Math.min(Math.max(-c, -m), c)),
                  (h = -r * r + a * (a + 2 * m) + y))
                : a <= u
                ? ((r = 0),
                  (h = (a = Math.min(Math.max(-c, -m), c)) * (a + 2 * m) + y))
                : ((a =
                    (r = Math.max(0, -(d * c + p))) > 0
                      ? c
                      : Math.min(Math.max(-c, -m), c)),
                  (h = -r * r + a * (a + 2 * m) + y));
          } else
            (a = d > 0 ? -c : c),
              (h = -(r = Math.max(0, -(d * a + p))) * r + a * (a + 2 * m) + y);
          return (
            i && i.copy(this.origin).addScaledVector(this.direction, r),
            s && s.copy(n).addScaledVector(o, a),
            h
          );
        }
        intersectSphere(t, e) {
          h.subVectors(t.center, this.origin);
          let i = h.dot(this.direction),
            s = h.dot(h) - i * i,
            r = t.radius * t.radius;
          if (s > r) return null;
          let a = Math.sqrt(r - s),
            n = i - a,
            o = i + a;
          return o < 0 ? null : n < 0 ? this.at(o, e) : this.at(n, e);
        }
        intersectsSphere(t) {
          return this.distanceSqToPoint(t.center) <= t.radius * t.radius;
        }
        distanceToPlane(t) {
          let e = t.normal.dot(this.direction);
          if (0 === e) return 0 === t.distanceToPoint(this.origin) ? 0 : null;
          let i = -(this.origin.dot(t.normal) + t.constant) / e;
          return i >= 0 ? i : null;
        }
        intersectPlane(t, e) {
          let i = this.distanceToPlane(t);
          return null === i ? null : this.at(i, e);
        }
        intersectsPlane(t) {
          let e = t.distanceToPoint(this.origin);
          return !!(0 === e || t.normal.dot(this.direction) * e < 0);
        }
        intersectBox(t, e) {
          let i, s, r, a, h, n;
          let o = 1 / this.direction.x,
            l = 1 / this.direction.y,
            u = 1 / this.direction.z,
            c = this.origin;
          return (o >= 0
            ? ((i = (t.min.x - c.x) * o), (s = (t.max.x - c.x) * o))
            : ((i = (t.max.x - c.x) * o), (s = (t.min.x - c.x) * o)),
          l >= 0
            ? ((r = (t.min.y - c.y) * l), (a = (t.max.y - c.y) * l))
            : ((r = (t.max.y - c.y) * l), (a = (t.min.y - c.y) * l)),
          i > a || r > s)
            ? null
            : ((r > i || isNaN(i)) && (i = r),
              (a < s || isNaN(s)) && (s = a),
              u >= 0
                ? ((h = (t.min.z - c.z) * u), (n = (t.max.z - c.z) * u))
                : ((h = (t.max.z - c.z) * u), (n = (t.min.z - c.z) * u)),
              i > n || h > s)
            ? null
            : ((h > i || i != i) && (i = h),
              (n < s || s != s) && (s = n),
              s < 0)
            ? null
            : this.at(i >= 0 ? i : s, e);
        }
        intersectsBox(t) {
          return null !== this.intersectBox(t, h);
        }
        intersectTriangle(t, e, i, s, r) {
          let a;
          u.subVectors(e, t), c.subVectors(i, t), d.crossVectors(u, c);
          let h = this.direction.dot(d);
          if (h > 0) {
            if (s) return null;
            a = 1;
          } else {
            if (!(h < 0)) return null;
            (a = -1), (h = -h);
          }
          l.subVectors(this.origin, t);
          let n = a * this.direction.dot(c.crossVectors(l, c));
          if (n < 0) return null;
          let o = a * this.direction.dot(u.cross(l));
          if (o < 0 || n + o > h) return null;
          let p = -a * l.dot(d);
          return p < 0 ? null : this.at(p / h, r);
        }
        applyMatrix4(t) {
          return (
            this.origin.applyMatrix4(t),
            this.direction.transformDirection(t),
            this
          );
        }
        equals(t) {
          return (
            t.origin.equals(this.origin) && t.direction.equals(this.direction)
          );
        }
        clone() {
          return new this.constructor().copy(this);
        }
      }
      var m = i(9474),
        y = i(4753),
        x = i(9120);
      let f = new s.P(),
        g = new s.P(),
        b = new s.P(),
        M = new s.P(),
        w = new s.P(),
        z = new s.P(),
        S = new s.P(),
        v = new s.P(),
        _ = new s.P(),
        A = new s.P(),
        T = new x.I(),
        k = new x.I(),
        P = new x.I();
      class B {
        constructor(t = new s.P(), e = new s.P(), i = new s.P()) {
          (this.a = t), (this.b = e), (this.c = i);
        }
        static getNormal(t, e, i, s) {
          s.subVectors(i, e), f.subVectors(t, e), s.cross(f);
          let r = s.lengthSq();
          return r > 0 ? s.multiplyScalar(1 / Math.sqrt(r)) : s.set(0, 0, 0);
        }
        static getBarycoord(t, e, i, s, r) {
          f.subVectors(s, e), g.subVectors(i, e), b.subVectors(t, e);
          let a = f.dot(f),
            h = f.dot(g),
            n = f.dot(b),
            o = g.dot(g),
            l = g.dot(b),
            u = a * o - h * h;
          if (0 === u) return r.set(0, 0, 0), null;
          let c = 1 / u,
            d = (o * n - h * l) * c,
            p = (a * l - h * n) * c;
          return r.set(1 - d - p, p, d);
        }
        static containsPoint(t, e, i, s) {
          return (
            null !== this.getBarycoord(t, e, i, s, M) &&
            M.x >= 0 &&
            M.y >= 0 &&
            M.x + M.y <= 1
          );
        }
        static getInterpolation(t, e, i, s, r, a, h, n) {
          return null === this.getBarycoord(t, e, i, s, M)
            ? ((n.x = 0),
              (n.y = 0),
              "z" in n && (n.z = 0),
              "w" in n && (n.w = 0),
              null)
            : (n.setScalar(0),
              n.addScaledVector(r, M.x),
              n.addScaledVector(a, M.y),
              n.addScaledVector(h, M.z),
              n);
        }
        static getInterpolatedAttribute(t, e, i, s, r, a) {
          return (
            T.setScalar(0),
            k.setScalar(0),
            P.setScalar(0),
            T.fromBufferAttribute(t, e),
            k.fromBufferAttribute(t, i),
            P.fromBufferAttribute(t, s),
            a.setScalar(0),
            a.addScaledVector(T, r.x),
            a.addScaledVector(k, r.y),
            a.addScaledVector(P, r.z),
            a
          );
        }
        static isFrontFacing(t, e, i, s) {
          return f.subVectors(i, e), g.subVectors(t, e), 0 > f.cross(g).dot(s);
        }
        set(t, e, i) {
          return this.a.copy(t), this.b.copy(e), this.c.copy(i), this;
        }
        setFromPointsAndIndices(t, e, i, s) {
          return this.a.copy(t[e]), this.b.copy(t[i]), this.c.copy(t[s]), this;
        }
        setFromAttributeAndIndices(t, e, i, s) {
          return (
            this.a.fromBufferAttribute(t, e),
            this.b.fromBufferAttribute(t, i),
            this.c.fromBufferAttribute(t, s),
            this
          );
        }
        clone() {
          return new this.constructor().copy(this);
        }
        copy(t) {
          return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
        }
        getArea() {
          return (
            f.subVectors(this.c, this.b),
            g.subVectors(this.a, this.b),
            0.5 * f.cross(g).length()
          );
        }
        getMidpoint(t) {
          return t
            .addVectors(this.a, this.b)
            .add(this.c)
            .multiplyScalar(1 / 3);
        }
        getNormal(t) {
          return B.getNormal(this.a, this.b, this.c, t);
        }
        getPlane(t) {
          return t.setFromCoplanarPoints(this.a, this.b, this.c);
        }
        getBarycoord(t, e) {
          return B.getBarycoord(t, this.a, this.b, this.c, e);
        }
        getInterpolation(t, e, i, s, r) {
          return B.getInterpolation(t, this.a, this.b, this.c, e, i, s, r);
        }
        containsPoint(t) {
          return B.containsPoint(t, this.a, this.b, this.c);
        }
        isFrontFacing(t) {
          return B.isFrontFacing(this.a, this.b, this.c, t);
        }
        intersectsBox(t) {
          return t.intersectsTriangle(this);
        }
        closestPointToPoint(t, e) {
          let i, s;
          let r = this.a,
            a = this.b,
            h = this.c;
          w.subVectors(a, r), z.subVectors(h, r), v.subVectors(t, r);
          let n = w.dot(v),
            o = z.dot(v);
          if (n <= 0 && o <= 0) return e.copy(r);
          _.subVectors(t, a);
          let l = w.dot(_),
            u = z.dot(_);
          if (l >= 0 && u <= l) return e.copy(a);
          let c = n * u - l * o;
          if (c <= 0 && n >= 0 && l <= 0)
            return (i = n / (n - l)), e.copy(r).addScaledVector(w, i);
          A.subVectors(t, h);
          let d = w.dot(A),
            p = z.dot(A);
          if (p >= 0 && d <= p) return e.copy(h);
          let m = d * o - n * p;
          if (m <= 0 && o >= 0 && p <= 0)
            return (s = o / (o - p)), e.copy(r).addScaledVector(z, s);
          let y = l * p - d * u;
          if (y <= 0 && u - l >= 0 && d - p >= 0)
            return (
              S.subVectors(h, a),
              (s = (u - l) / (u - l + (d - p))),
              e.copy(a).addScaledVector(S, s)
            );
          let x = 1 / (y + m + c);
          return (
            (i = m * x),
            (s = c * x),
            e.copy(r).addScaledVector(w, i).addScaledVector(z, s)
          );
        }
        equals(t) {
          return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
        }
      }
      var C = i(7429),
        E = i(8962),
        I = i(6917);
      let O = {
          aliceblue: 0xf0f8ff,
          antiquewhite: 0xfaebd7,
          aqua: 65535,
          aquamarine: 8388564,
          azure: 0xf0ffff,
          beige: 0xf5f5dc,
          bisque: 0xffe4c4,
          black: 0,
          blanchedalmond: 0xffebcd,
          blue: 255,
          blueviolet: 9055202,
          brown: 0xa52a2a,
          burlywood: 0xdeb887,
          cadetblue: 6266528,
          chartreuse: 8388352,
          chocolate: 0xd2691e,
          coral: 0xff7f50,
          cornflowerblue: 6591981,
          cornsilk: 0xfff8dc,
          crimson: 0xdc143c,
          cyan: 65535,
          darkblue: 139,
          darkcyan: 35723,
          darkgoldenrod: 0xb8860b,
          darkgray: 0xa9a9a9,
          darkgreen: 25600,
          darkgrey: 0xa9a9a9,
          darkkhaki: 0xbdb76b,
          darkmagenta: 9109643,
          darkolivegreen: 5597999,
          darkorange: 0xff8c00,
          darkorchid: 0x9932cc,
          darkred: 9109504,
          darksalmon: 0xe9967a,
          darkseagreen: 9419919,
          darkslateblue: 4734347,
          darkslategray: 3100495,
          darkslategrey: 3100495,
          darkturquoise: 52945,
          darkviolet: 9699539,
          deeppink: 0xff1493,
          deepskyblue: 49151,
          dimgray: 6908265,
          dimgrey: 6908265,
          dodgerblue: 2003199,
          firebrick: 0xb22222,
          floralwhite: 0xfffaf0,
          forestgreen: 2263842,
          fuchsia: 0xff00ff,
          gainsboro: 0xdcdcdc,
          ghostwhite: 0xf8f8ff,
          gold: 0xffd700,
          goldenrod: 0xdaa520,
          gray: 8421504,
          green: 32768,
          greenyellow: 0xadff2f,
          grey: 8421504,
          honeydew: 0xf0fff0,
          hotpink: 0xff69b4,
          indianred: 0xcd5c5c,
          indigo: 4915330,
          ivory: 0xfffff0,
          khaki: 0xf0e68c,
          lavender: 0xe6e6fa,
          lavenderblush: 0xfff0f5,
          lawngreen: 8190976,
          lemonchiffon: 0xfffacd,
          lightblue: 0xadd8e6,
          lightcoral: 0xf08080,
          lightcyan: 0xe0ffff,
          lightgoldenrodyellow: 0xfafad2,
          lightgray: 0xd3d3d3,
          lightgreen: 9498256,
          lightgrey: 0xd3d3d3,
          lightpink: 0xffb6c1,
          lightsalmon: 0xffa07a,
          lightseagreen: 2142890,
          lightskyblue: 8900346,
          lightslategray: 7833753,
          lightslategrey: 7833753,
          lightsteelblue: 0xb0c4de,
          lightyellow: 0xffffe0,
          lime: 65280,
          limegreen: 3329330,
          linen: 0xfaf0e6,
          magenta: 0xff00ff,
          maroon: 8388608,
          mediumaquamarine: 6737322,
          mediumblue: 205,
          mediumorchid: 0xba55d3,
          mediumpurple: 9662683,
          mediumseagreen: 3978097,
          mediumslateblue: 8087790,
          mediumspringgreen: 64154,
          mediumturquoise: 4772300,
          mediumvioletred: 0xc71585,
          midnightblue: 1644912,
          mintcream: 0xf5fffa,
          mistyrose: 0xffe4e1,
          moccasin: 0xffe4b5,
          navajowhite: 0xffdead,
          navy: 128,
          oldlace: 0xfdf5e6,
          olive: 8421376,
          olivedrab: 7048739,
          orange: 0xffa500,
          orangered: 0xff4500,
          orchid: 0xda70d6,
          palegoldenrod: 0xeee8aa,
          palegreen: 0x98fb98,
          paleturquoise: 0xafeeee,
          palevioletred: 0xdb7093,
          papayawhip: 0xffefd5,
          peachpuff: 0xffdab9,
          peru: 0xcd853f,
          pink: 0xffc0cb,
          plum: 0xdda0dd,
          powderblue: 0xb0e0e6,
          purple: 8388736,
          rebeccapurple: 6697881,
          red: 0xff0000,
          rosybrown: 0xbc8f8f,
          royalblue: 4286945,
          saddlebrown: 9127187,
          salmon: 0xfa8072,
          sandybrown: 0xf4a460,
          seagreen: 3050327,
          seashell: 0xfff5ee,
          sienna: 0xa0522d,
          silver: 0xc0c0c0,
          skyblue: 8900331,
          slateblue: 6970061,
          slategray: 7372944,
          slategrey: 7372944,
          snow: 0xfffafa,
          springgreen: 65407,
          steelblue: 4620980,
          tan: 0xd2b48c,
          teal: 32896,
          thistle: 0xd8bfd8,
          tomato: 0xff6347,
          turquoise: 4251856,
          violet: 0xee82ee,
          wheat: 0xf5deb3,
          white: 0xffffff,
          whitesmoke: 0xf5f5f5,
          yellow: 0xffff00,
          yellowgreen: 0x9acd32,
        },
        F = { h: 0, s: 0, l: 0 },
        R = { h: 0, s: 0, l: 0 };
      function q(t, e, i) {
        return (i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6)
          ? t + (e - t) * 6 * i
          : i < 0.5
          ? e
          : i < 2 / 3
          ? t + (e - t) * 6 * (2 / 3 - i)
          : t;
      }
      class N {
        constructor(t, e, i) {
          return (
            (this.isColor = !0),
            (this.r = 1),
            (this.g = 1),
            (this.b = 1),
            this.set(t, e, i)
          );
        }
        set(t, e, i) {
          return (
            void 0 === e && void 0 === i
              ? t && t.isColor
                ? this.copy(t)
                : "number" == typeof t
                ? this.setHex(t)
                : "string" == typeof t && this.setStyle(t)
              : this.setRGB(t, e, i),
            this
          );
        }
        setScalar(t) {
          return (this.r = t), (this.g = t), (this.b = t), this;
        }
        setHex(t, e = C.er$) {
          return (
            (t = Math.floor(t)),
            (this.r = ((t >> 16) & 255) / 255),
            (this.g = ((t >> 8) & 255) / 255),
            (this.b = (255 & t) / 255),
            I.pp.toWorkingColorSpace(this, e),
            this
          );
        }
        setRGB(t, e, i, s = I.pp.workingColorSpace) {
          return (
            (this.r = t),
            (this.g = e),
            (this.b = i),
            I.pp.toWorkingColorSpace(this, s),
            this
          );
        }
        setHSL(t, e, i, s = I.pp.workingColorSpace) {
          if (
            ((t = (0, E.rl)(t, 1)),
            (e = (0, E.qE)(e, 0, 1)),
            (i = (0, E.qE)(i, 0, 1)),
            0 === e)
          )
            this.r = this.g = this.b = i;
          else {
            let s = i <= 0.5 ? i * (1 + e) : i + e - i * e,
              r = 2 * i - s;
            (this.r = q(r, s, t + 1 / 3)),
              (this.g = q(r, s, t)),
              (this.b = q(r, s, t - 1 / 3));
          }
          return I.pp.toWorkingColorSpace(this, s), this;
        }
        setStyle(t, e = C.er$) {
          let i;
          function s(e) {
            void 0 !== e &&
              1 > parseFloat(e) &&
              console.warn(
                "THREE.Color: Alpha component of " + t + " will be ignored."
              );
          }
          if ((i = /^(\w+)\(([^\)]*)\)/.exec(t))) {
            let r;
            let a = i[1],
              h = i[2];
            switch (a) {
              case "rgb":
              case "rgba":
                if (
                  (r =
                    /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                      h
                    ))
                )
                  return (
                    s(r[4]),
                    this.setRGB(
                      Math.min(255, parseInt(r[1], 10)) / 255,
                      Math.min(255, parseInt(r[2], 10)) / 255,
                      Math.min(255, parseInt(r[3], 10)) / 255,
                      e
                    )
                  );
                if (
                  (r =
                    /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                      h
                    ))
                )
                  return (
                    s(r[4]),
                    this.setRGB(
                      Math.min(100, parseInt(r[1], 10)) / 100,
                      Math.min(100, parseInt(r[2], 10)) / 100,
                      Math.min(100, parseInt(r[3], 10)) / 100,
                      e
                    )
                  );
                break;
              case "hsl":
              case "hsla":
                if (
                  (r =
                    /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
                      h
                    ))
                )
                  return (
                    s(r[4]),
                    this.setHSL(
                      parseFloat(r[1]) / 360,
                      parseFloat(r[2]) / 100,
                      parseFloat(r[3]) / 100,
                      e
                    )
                  );
                break;
              default:
                console.warn("THREE.Color: Unknown color model " + t);
            }
          } else if ((i = /^\#([A-Fa-f\d]+)$/.exec(t))) {
            let s = i[1],
              r = s.length;
            if (3 === r)
              return this.setRGB(
                parseInt(s.charAt(0), 16) / 15,
                parseInt(s.charAt(1), 16) / 15,
                parseInt(s.charAt(2), 16) / 15,
                e
              );
            if (6 === r) return this.setHex(parseInt(s, 16), e);
            console.warn("THREE.Color: Invalid hex color " + t);
          } else if (t && t.length > 0) return this.setColorName(t, e);
          return this;
        }
        setColorName(t, e = C.er$) {
          let i = O[t.toLowerCase()];
          return (
            void 0 !== i
              ? this.setHex(i, e)
              : console.warn("THREE.Color: Unknown color " + t),
            this
          );
        }
        clone() {
          return new this.constructor(this.r, this.g, this.b);
        }
        copy(t) {
          return (this.r = t.r), (this.g = t.g), (this.b = t.b), this;
        }
        copySRGBToLinear(t) {
          return (
            (this.r = (0, I.dk)(t.r)),
            (this.g = (0, I.dk)(t.g)),
            (this.b = (0, I.dk)(t.b)),
            this
          );
        }
        copyLinearToSRGB(t) {
          return (
            (this.r = (0, I.rd)(t.r)),
            (this.g = (0, I.rd)(t.g)),
            (this.b = (0, I.rd)(t.b)),
            this
          );
        }
        convertSRGBToLinear() {
          return this.copySRGBToLinear(this), this;
        }
        convertLinearToSRGB() {
          return this.copyLinearToSRGB(this), this;
        }
        getHex(t = C.er$) {
          return (
            I.pp.fromWorkingColorSpace(V.copy(this), t),
            65536 * Math.round((0, E.qE)(255 * V.r, 0, 255)) +
              256 * Math.round((0, E.qE)(255 * V.g, 0, 255)) +
              Math.round((0, E.qE)(255 * V.b, 0, 255))
          );
        }
        getHexString(t = C.er$) {
          return ("000000" + this.getHex(t).toString(16)).slice(-6);
        }
        getHSL(t, e = I.pp.workingColorSpace) {
          let i, s;
          I.pp.fromWorkingColorSpace(V.copy(this), e);
          let r = V.r,
            a = V.g,
            h = V.b,
            n = Math.max(r, a, h),
            o = Math.min(r, a, h),
            l = (o + n) / 2;
          if (o === n) (i = 0), (s = 0);
          else {
            let t = n - o;
            switch (((s = l <= 0.5 ? t / (n + o) : t / (2 - n - o)), n)) {
              case r:
                i = (a - h) / t + (a < h ? 6 : 0);
                break;
              case a:
                i = (h - r) / t + 2;
                break;
              case h:
                i = (r - a) / t + 4;
            }
            i /= 6;
          }
          return (t.h = i), (t.s = s), (t.l = l), t;
        }
        getRGB(t, e = I.pp.workingColorSpace) {
          return (
            I.pp.fromWorkingColorSpace(V.copy(this), e),
            (t.r = V.r),
            (t.g = V.g),
            (t.b = V.b),
            t
          );
        }
        getStyle(t = C.er$) {
          I.pp.fromWorkingColorSpace(V.copy(this), t);
          let e = V.r,
            i = V.g,
            s = V.b;
          return t !== C.er$
            ? `color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`
            : `rgb(${Math.round(255 * e)},${Math.round(255 * i)},${Math.round(
                255 * s
              )})`;
        }
        offsetHSL(t, e, i) {
          return this.getHSL(F), this.setHSL(F.h + t, F.s + e, F.l + i);
        }
        add(t) {
          return (this.r += t.r), (this.g += t.g), (this.b += t.b), this;
        }
        addColors(t, e) {
          return (
            (this.r = t.r + e.r),
            (this.g = t.g + e.g),
            (this.b = t.b + e.b),
            this
          );
        }
        addScalar(t) {
          return (this.r += t), (this.g += t), (this.b += t), this;
        }
        sub(t) {
          return (
            (this.r = Math.max(0, this.r - t.r)),
            (this.g = Math.max(0, this.g - t.g)),
            (this.b = Math.max(0, this.b - t.b)),
            this
          );
        }
        multiply(t) {
          return (this.r *= t.r), (this.g *= t.g), (this.b *= t.b), this;
        }
        multiplyScalar(t) {
          return (this.r *= t), (this.g *= t), (this.b *= t), this;
        }
        lerp(t, e) {
          return (
            (this.r += (t.r - this.r) * e),
            (this.g += (t.g - this.g) * e),
            (this.b += (t.b - this.b) * e),
            this
          );
        }
        lerpColors(t, e, i) {
          return (
            (this.r = t.r + (e.r - t.r) * i),
            (this.g = t.g + (e.g - t.g) * i),
            (this.b = t.b + (e.b - t.b) * i),
            this
          );
        }
        lerpHSL(t, e) {
          this.getHSL(F), t.getHSL(R);
          let i = (0, E.Cc)(F.h, R.h, e),
            s = (0, E.Cc)(F.s, R.s, e),
            r = (0, E.Cc)(F.l, R.l, e);
          return this.setHSL(i, s, r), this;
        }
        setFromVector3(t) {
          return (this.r = t.x), (this.g = t.y), (this.b = t.z), this;
        }
        applyMatrix3(t) {
          let e = this.r,
            i = this.g,
            s = this.b,
            r = t.elements;
          return (
            (this.r = r[0] * e + r[3] * i + r[6] * s),
            (this.g = r[1] * e + r[4] * i + r[7] * s),
            (this.b = r[2] * e + r[5] * i + r[8] * s),
            this
          );
        }
        equals(t) {
          return t.r === this.r && t.g === this.g && t.b === this.b;
        }
        fromArray(t, e = 0) {
          return (
            (this.r = t[e]), (this.g = t[e + 1]), (this.b = t[e + 2]), this
          );
        }
        toArray(t = [], e = 0) {
          return (t[e] = this.r), (t[e + 1] = this.g), (t[e + 2] = this.b), t;
        }
        fromBufferAttribute(t, e) {
          return (
            (this.r = t.getX(e)),
            (this.g = t.getY(e)),
            (this.b = t.getZ(e)),
            this
          );
        }
        toJSON() {
          return this.getHex();
        }
        *[Symbol.iterator]() {
          yield this.r, yield this.g, yield this.b;
        }
      }
      let V = new N();
      N.NAMES = O;
      var U = i(5901);
      let W = 0;
      class D extends U.Q {
        constructor() {
          super(),
            (this.isMaterial = !0),
            Object.defineProperty(this, "id", { value: W++ }),
            (this.uuid = (0, E.lk)()),
            (this.name = ""),
            (this.type = "Material"),
            (this.blending = C.NTi),
            (this.side = C.hB5),
            (this.vertexColors = !1),
            (this.opacity = 1),
            (this.transparent = !1),
            (this.alphaHash = !1),
            (this.blendSrc = C.ie2),
            (this.blendDst = C.OuU),
            (this.blendEquation = C.gO9),
            (this.blendSrcAlpha = null),
            (this.blendDstAlpha = null),
            (this.blendEquationAlpha = null),
            (this.blendColor = new N(0, 0, 0)),
            (this.blendAlpha = 0),
            (this.depthFunc = C.xSv),
            (this.depthTest = !0),
            (this.depthWrite = !0),
            (this.stencilWriteMask = 255),
            (this.stencilFunc = C.sKt),
            (this.stencilRef = 0),
            (this.stencilFuncMask = 255),
            (this.stencilFail = C.VVr),
            (this.stencilZFail = C.VVr),
            (this.stencilZPass = C.VVr),
            (this.stencilWrite = !1),
            (this.clippingPlanes = null),
            (this.clipIntersection = !1),
            (this.clipShadows = !1),
            (this.shadowSide = null),
            (this.colorWrite = !0),
            (this.precision = null),
            (this.polygonOffset = !1),
            (this.polygonOffsetFactor = 0),
            (this.polygonOffsetUnits = 0),
            (this.dithering = !1),
            (this.alphaToCoverage = !1),
            (this.premultipliedAlpha = !1),
            (this.forceSinglePass = !1),
            (this.visible = !0),
            (this.toneMapped = !0),
            (this.userData = {}),
            (this.version = 0),
            (this._alphaTest = 0);
        }
        get alphaTest() {
          return this._alphaTest;
        }
        set alphaTest(t) {
          this._alphaTest > 0 != t > 0 && this.version++, (this._alphaTest = t);
        }
        onBeforeRender() {}
        onBeforeCompile() {}
        customProgramCacheKey() {
          return this.onBeforeCompile.toString();
        }
        setValues(t) {
          if (void 0 !== t)
            for (let e in t) {
              let i = t[e];
              if (void 0 === i) {
                console.warn(
                  `THREE.Material: parameter '${e}' has value of undefined.`
                );
                continue;
              }
              let s = this[e];
              if (void 0 === s) {
                console.warn(
                  `THREE.Material: '${e}' is not a property of THREE.${this.type}.`
                );
                continue;
              }
              s && s.isColor
                ? s.set(i)
                : s && s.isVector3 && i && i.isVector3
                ? s.copy(i)
                : (this[e] = i);
            }
        }
        toJSON(t) {
          let e = void 0 === t || "string" == typeof t;
          e && (t = { textures: {}, images: {} });
          let i = {
            metadata: {
              version: 4.6,
              type: "Material",
              generator: "Material.toJSON",
            },
          };
          function s(t) {
            let e = [];
            for (let i in t) {
              let s = t[i];
              delete s.metadata, e.push(s);
            }
            return e;
          }
          if (
            ((i.uuid = this.uuid),
            (i.type = this.type),
            "" !== this.name && (i.name = this.name),
            this.color && this.color.isColor && (i.color = this.color.getHex()),
            void 0 !== this.roughness && (i.roughness = this.roughness),
            void 0 !== this.metalness && (i.metalness = this.metalness),
            void 0 !== this.sheen && (i.sheen = this.sheen),
            this.sheenColor &&
              this.sheenColor.isColor &&
              (i.sheenColor = this.sheenColor.getHex()),
            void 0 !== this.sheenRoughness &&
              (i.sheenRoughness = this.sheenRoughness),
            this.emissive &&
              this.emissive.isColor &&
              (i.emissive = this.emissive.getHex()),
            void 0 !== this.emissiveIntensity &&
              1 !== this.emissiveIntensity &&
              (i.emissiveIntensity = this.emissiveIntensity),
            this.specular &&
              this.specular.isColor &&
              (i.specular = this.specular.getHex()),
            void 0 !== this.specularIntensity &&
              (i.specularIntensity = this.specularIntensity),
            this.specularColor &&
              this.specularColor.isColor &&
              (i.specularColor = this.specularColor.getHex()),
            void 0 !== this.shininess && (i.shininess = this.shininess),
            void 0 !== this.clearcoat && (i.clearcoat = this.clearcoat),
            void 0 !== this.clearcoatRoughness &&
              (i.clearcoatRoughness = this.clearcoatRoughness),
            this.clearcoatMap &&
              this.clearcoatMap.isTexture &&
              (i.clearcoatMap = this.clearcoatMap.toJSON(t).uuid),
            this.clearcoatRoughnessMap &&
              this.clearcoatRoughnessMap.isTexture &&
              (i.clearcoatRoughnessMap =
                this.clearcoatRoughnessMap.toJSON(t).uuid),
            this.clearcoatNormalMap &&
              this.clearcoatNormalMap.isTexture &&
              ((i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid),
              (i.clearcoatNormalScale = this.clearcoatNormalScale.toArray())),
            void 0 !== this.dispersion && (i.dispersion = this.dispersion),
            void 0 !== this.iridescence && (i.iridescence = this.iridescence),
            void 0 !== this.iridescenceIOR &&
              (i.iridescenceIOR = this.iridescenceIOR),
            void 0 !== this.iridescenceThicknessRange &&
              (i.iridescenceThicknessRange = this.iridescenceThicknessRange),
            this.iridescenceMap &&
              this.iridescenceMap.isTexture &&
              (i.iridescenceMap = this.iridescenceMap.toJSON(t).uuid),
            this.iridescenceThicknessMap &&
              this.iridescenceThicknessMap.isTexture &&
              (i.iridescenceThicknessMap =
                this.iridescenceThicknessMap.toJSON(t).uuid),
            void 0 !== this.anisotropy && (i.anisotropy = this.anisotropy),
            void 0 !== this.anisotropyRotation &&
              (i.anisotropyRotation = this.anisotropyRotation),
            this.anisotropyMap &&
              this.anisotropyMap.isTexture &&
              (i.anisotropyMap = this.anisotropyMap.toJSON(t).uuid),
            this.map && this.map.isTexture && (i.map = this.map.toJSON(t).uuid),
            this.matcap &&
              this.matcap.isTexture &&
              (i.matcap = this.matcap.toJSON(t).uuid),
            this.alphaMap &&
              this.alphaMap.isTexture &&
              (i.alphaMap = this.alphaMap.toJSON(t).uuid),
            this.lightMap &&
              this.lightMap.isTexture &&
              ((i.lightMap = this.lightMap.toJSON(t).uuid),
              (i.lightMapIntensity = this.lightMapIntensity)),
            this.aoMap &&
              this.aoMap.isTexture &&
              ((i.aoMap = this.aoMap.toJSON(t).uuid),
              (i.aoMapIntensity = this.aoMapIntensity)),
            this.bumpMap &&
              this.bumpMap.isTexture &&
              ((i.bumpMap = this.bumpMap.toJSON(t).uuid),
              (i.bumpScale = this.bumpScale)),
            this.normalMap &&
              this.normalMap.isTexture &&
              ((i.normalMap = this.normalMap.toJSON(t).uuid),
              (i.normalMapType = this.normalMapType),
              (i.normalScale = this.normalScale.toArray())),
            this.displacementMap &&
              this.displacementMap.isTexture &&
              ((i.displacementMap = this.displacementMap.toJSON(t).uuid),
              (i.displacementScale = this.displacementScale),
              (i.displacementBias = this.displacementBias)),
            this.roughnessMap &&
              this.roughnessMap.isTexture &&
              (i.roughnessMap = this.roughnessMap.toJSON(t).uuid),
            this.metalnessMap &&
              this.metalnessMap.isTexture &&
              (i.metalnessMap = this.metalnessMap.toJSON(t).uuid),
            this.emissiveMap &&
              this.emissiveMap.isTexture &&
              (i.emissiveMap = this.emissiveMap.toJSON(t).uuid),
            this.specularMap &&
              this.specularMap.isTexture &&
              (i.specularMap = this.specularMap.toJSON(t).uuid),
            this.specularIntensityMap &&
              this.specularIntensityMap.isTexture &&
              (i.specularIntensityMap =
                this.specularIntensityMap.toJSON(t).uuid),
            this.specularColorMap &&
              this.specularColorMap.isTexture &&
              (i.specularColorMap = this.specularColorMap.toJSON(t).uuid),
            this.envMap &&
              this.envMap.isTexture &&
              ((i.envMap = this.envMap.toJSON(t).uuid),
              void 0 !== this.combine && (i.combine = this.combine)),
            void 0 !== this.envMapRotation &&
              (i.envMapRotation = this.envMapRotation.toArray()),
            void 0 !== this.envMapIntensity &&
              (i.envMapIntensity = this.envMapIntensity),
            void 0 !== this.reflectivity &&
              (i.reflectivity = this.reflectivity),
            void 0 !== this.refractionRatio &&
              (i.refractionRatio = this.refractionRatio),
            this.gradientMap &&
              this.gradientMap.isTexture &&
              (i.gradientMap = this.gradientMap.toJSON(t).uuid),
            void 0 !== this.transmission &&
              (i.transmission = this.transmission),
            this.transmissionMap &&
              this.transmissionMap.isTexture &&
              (i.transmissionMap = this.transmissionMap.toJSON(t).uuid),
            void 0 !== this.thickness && (i.thickness = this.thickness),
            this.thicknessMap &&
              this.thicknessMap.isTexture &&
              (i.thicknessMap = this.thicknessMap.toJSON(t).uuid),
            void 0 !== this.attenuationDistance &&
              this.attenuationDistance !== 1 / 0 &&
              (i.attenuationDistance = this.attenuationDistance),
            void 0 !== this.attenuationColor &&
              (i.attenuationColor = this.attenuationColor.getHex()),
            void 0 !== this.size && (i.size = this.size),
            null !== this.shadowSide && (i.shadowSide = this.shadowSide),
            void 0 !== this.sizeAttenuation &&
              (i.sizeAttenuation = this.sizeAttenuation),
            this.blending !== C.NTi && (i.blending = this.blending),
            this.side !== C.hB5 && (i.side = this.side),
            !0 === this.vertexColors && (i.vertexColors = !0),
            this.opacity < 1 && (i.opacity = this.opacity),
            !0 === this.transparent && (i.transparent = !0),
            this.blendSrc !== C.ie2 && (i.blendSrc = this.blendSrc),
            this.blendDst !== C.OuU && (i.blendDst = this.blendDst),
            this.blendEquation !== C.gO9 &&
              (i.blendEquation = this.blendEquation),
            null !== this.blendSrcAlpha &&
              (i.blendSrcAlpha = this.blendSrcAlpha),
            null !== this.blendDstAlpha &&
              (i.blendDstAlpha = this.blendDstAlpha),
            null !== this.blendEquationAlpha &&
              (i.blendEquationAlpha = this.blendEquationAlpha),
            this.blendColor &&
              this.blendColor.isColor &&
              (i.blendColor = this.blendColor.getHex()),
            0 !== this.blendAlpha && (i.blendAlpha = this.blendAlpha),
            this.depthFunc !== C.xSv && (i.depthFunc = this.depthFunc),
            !1 === this.depthTest && (i.depthTest = this.depthTest),
            !1 === this.depthWrite && (i.depthWrite = this.depthWrite),
            !1 === this.colorWrite && (i.colorWrite = this.colorWrite),
            255 !== this.stencilWriteMask &&
              (i.stencilWriteMask = this.stencilWriteMask),
            this.stencilFunc !== C.sKt && (i.stencilFunc = this.stencilFunc),
            0 !== this.stencilRef && (i.stencilRef = this.stencilRef),
            255 !== this.stencilFuncMask &&
              (i.stencilFuncMask = this.stencilFuncMask),
            this.stencilFail !== C.VVr && (i.stencilFail = this.stencilFail),
            this.stencilZFail !== C.VVr && (i.stencilZFail = this.stencilZFail),
            this.stencilZPass !== C.VVr && (i.stencilZPass = this.stencilZPass),
            !0 === this.stencilWrite && (i.stencilWrite = this.stencilWrite),
            void 0 !== this.rotation &&
              0 !== this.rotation &&
              (i.rotation = this.rotation),
            !0 === this.polygonOffset && (i.polygonOffset = !0),
            0 !== this.polygonOffsetFactor &&
              (i.polygonOffsetFactor = this.polygonOffsetFactor),
            0 !== this.polygonOffsetUnits &&
              (i.polygonOffsetUnits = this.polygonOffsetUnits),
            void 0 !== this.linewidth &&
              1 !== this.linewidth &&
              (i.linewidth = this.linewidth),
            void 0 !== this.dashSize && (i.dashSize = this.dashSize),
            void 0 !== this.gapSize && (i.gapSize = this.gapSize),
            void 0 !== this.scale && (i.scale = this.scale),
            !0 === this.dithering && (i.dithering = !0),
            this.alphaTest > 0 && (i.alphaTest = this.alphaTest),
            !0 === this.alphaHash && (i.alphaHash = !0),
            !0 === this.alphaToCoverage && (i.alphaToCoverage = !0),
            !0 === this.premultipliedAlpha && (i.premultipliedAlpha = !0),
            !0 === this.forceSinglePass && (i.forceSinglePass = !0),
            !0 === this.wireframe && (i.wireframe = !0),
            this.wireframeLinewidth > 1 &&
              (i.wireframeLinewidth = this.wireframeLinewidth),
            "round" !== this.wireframeLinecap &&
              (i.wireframeLinecap = this.wireframeLinecap),
            "round" !== this.wireframeLinejoin &&
              (i.wireframeLinejoin = this.wireframeLinejoin),
            !0 === this.flatShading && (i.flatShading = !0),
            !1 === this.visible && (i.visible = !1),
            !1 === this.toneMapped && (i.toneMapped = !1),
            !1 === this.fog && (i.fog = !1),
            Object.keys(this.userData).length > 0 &&
              (i.userData = this.userData),
            e)
          ) {
            let e = s(t.textures),
              r = s(t.images);
            e.length > 0 && (i.textures = e), r.length > 0 && (i.images = r);
          }
          return i;
        }
        clone() {
          return new this.constructor().copy(this);
        }
        copy(t) {
          (this.name = t.name),
            (this.blending = t.blending),
            (this.side = t.side),
            (this.vertexColors = t.vertexColors),
            (this.opacity = t.opacity),
            (this.transparent = t.transparent),
            (this.blendSrc = t.blendSrc),
            (this.blendDst = t.blendDst),
            (this.blendEquation = t.blendEquation),
            (this.blendSrcAlpha = t.blendSrcAlpha),
            (this.blendDstAlpha = t.blendDstAlpha),
            (this.blendEquationAlpha = t.blendEquationAlpha),
            this.blendColor.copy(t.blendColor),
            (this.blendAlpha = t.blendAlpha),
            (this.depthFunc = t.depthFunc),
            (this.depthTest = t.depthTest),
            (this.depthWrite = t.depthWrite),
            (this.stencilWriteMask = t.stencilWriteMask),
            (this.stencilFunc = t.stencilFunc),
            (this.stencilRef = t.stencilRef),
            (this.stencilFuncMask = t.stencilFuncMask),
            (this.stencilFail = t.stencilFail),
            (this.stencilZFail = t.stencilZFail),
            (this.stencilZPass = t.stencilZPass),
            (this.stencilWrite = t.stencilWrite);
          let e = t.clippingPlanes,
            i = null;
          if (null !== e) {
            let t = e.length;
            i = Array(t);
            for (let s = 0; s !== t; ++s) i[s] = e[s].clone();
          }
          return (
            (this.clippingPlanes = i),
            (this.clipIntersection = t.clipIntersection),
            (this.clipShadows = t.clipShadows),
            (this.shadowSide = t.shadowSide),
            (this.colorWrite = t.colorWrite),
            (this.precision = t.precision),
            (this.polygonOffset = t.polygonOffset),
            (this.polygonOffsetFactor = t.polygonOffsetFactor),
            (this.polygonOffsetUnits = t.polygonOffsetUnits),
            (this.dithering = t.dithering),
            (this.alphaTest = t.alphaTest),
            (this.alphaHash = t.alphaHash),
            (this.alphaToCoverage = t.alphaToCoverage),
            (this.premultipliedAlpha = t.premultipliedAlpha),
            (this.forceSinglePass = t.forceSinglePass),
            (this.visible = t.visible),
            (this.toneMapped = t.toneMapped),
            (this.userData = JSON.parse(JSON.stringify(t.userData))),
            this
          );
        }
        dispose() {
          this.dispatchEvent({ type: "dispose" });
        }
        set needsUpdate(t) {
          !0 === t && this.version++;
        }
        onBuild() {
          console.warn("Material: onBuild() has been removed.");
        }
      }
      var L = i(168);
      class j extends D {
        constructor(t) {
          super(),
            (this.isMeshBasicMaterial = !0),
            (this.type = "MeshBasicMaterial"),
            (this.color = new N(0xffffff)),
            (this.map = null),
            (this.lightMap = null),
            (this.lightMapIntensity = 1),
            (this.aoMap = null),
            (this.aoMapIntensity = 1),
            (this.specularMap = null),
            (this.alphaMap = null),
            (this.envMap = null),
            (this.envMapRotation = new L.O()),
            (this.combine = C.caT),
            (this.reflectivity = 1),
            (this.refractionRatio = 0.98),
            (this.wireframe = !1),
            (this.wireframeLinewidth = 1),
            (this.wireframeLinecap = "round"),
            (this.wireframeLinejoin = "round"),
            (this.fog = !0),
            this.setValues(t);
        }
        copy(t) {
          return (
            super.copy(t),
            this.color.copy(t.color),
            (this.map = t.map),
            (this.lightMap = t.lightMap),
            (this.lightMapIntensity = t.lightMapIntensity),
            (this.aoMap = t.aoMap),
            (this.aoMapIntensity = t.aoMapIntensity),
            (this.specularMap = t.specularMap),
            (this.alphaMap = t.alphaMap),
            (this.envMap = t.envMap),
            this.envMapRotation.copy(t.envMapRotation),
            (this.combine = t.combine),
            (this.reflectivity = t.reflectivity),
            (this.refractionRatio = t.refractionRatio),
            (this.wireframe = t.wireframe),
            (this.wireframeLinewidth = t.wireframeLinewidth),
            (this.wireframeLinecap = t.wireframeLinecap),
            (this.wireframeLinejoin = t.wireframeLinejoin),
            (this.fog = t.fog),
            this
          );
        }
      }
      var X = i(8274);
      let Z = new m.k(),
        Y = new p(),
        H = new a.i(),
        J = new s.P(),
        G = new s.P(),
        Q = new s.P(),
        $ = new s.P(),
        K = new s.P(),
        tt = new s.P(),
        te = new s.P(),
        ti = new s.P();
      class ts extends y.B {
        constructor(t = new X.L(), e = new j()) {
          super(),
            (this.isMesh = !0),
            (this.type = "Mesh"),
            (this.geometry = t),
            (this.material = e),
            this.updateMorphTargets();
        }
        copy(t, e) {
          return (
            super.copy(t, e),
            void 0 !== t.morphTargetInfluences &&
              (this.morphTargetInfluences = t.morphTargetInfluences.slice()),
            void 0 !== t.morphTargetDictionary &&
              (this.morphTargetDictionary = Object.assign(
                {},
                t.morphTargetDictionary
              )),
            (this.material = Array.isArray(t.material)
              ? t.material.slice()
              : t.material),
            (this.geometry = t.geometry),
            this
          );
        }
        updateMorphTargets() {
          let t = this.geometry.morphAttributes,
            e = Object.keys(t);
          if (e.length > 0) {
            let i = t[e[0]];
            if (void 0 !== i) {
              (this.morphTargetInfluences = []),
                (this.morphTargetDictionary = {});
              for (let t = 0, e = i.length; t < e; t++) {
                let e = i[t].name || String(t);
                this.morphTargetInfluences.push(0),
                  (this.morphTargetDictionary[e] = t);
              }
            }
          }
        }
        getVertexPosition(t, e) {
          let i = this.geometry,
            s = i.attributes.position,
            r = i.morphAttributes.position,
            a = i.morphTargetsRelative;
          e.fromBufferAttribute(s, t);
          let h = this.morphTargetInfluences;
          if (r && h) {
            tt.set(0, 0, 0);
            for (let i = 0, s = r.length; i < s; i++) {
              let s = h[i],
                n = r[i];
              0 !== s &&
                (K.fromBufferAttribute(n, t),
                a ? tt.addScaledVector(K, s) : tt.addScaledVector(K.sub(e), s));
            }
            e.add(tt);
          }
          return e;
        }
        raycast(t, e) {
          let i = this.geometry,
            s = this.material,
            r = this.matrixWorld;
          if (void 0 !== s) {
            if (
              (null === i.boundingSphere && i.computeBoundingSphere(),
              H.copy(i.boundingSphere),
              H.applyMatrix4(r),
              Y.copy(t.ray).recast(t.near),
              (!1 === H.containsPoint(Y.origin) &&
                (null === Y.intersectSphere(H, J) ||
                  Y.origin.distanceToSquared(J) > (t.far - t.near) ** 2)) ||
                (Z.copy(r).invert(),
                Y.copy(t.ray).applyMatrix4(Z),
                null !== i.boundingBox &&
                  !1 === Y.intersectsBox(i.boundingBox)))
            )
              return;
            this._computeIntersections(t, e, Y);
          }
        }
        _computeIntersections(t, e, i) {
          let s;
          let r = this.geometry,
            a = this.material,
            h = r.index,
            n = r.attributes.position,
            o = r.attributes.uv,
            l = r.attributes.uv1,
            u = r.attributes.normal,
            c = r.groups,
            d = r.drawRange;
          if (null !== h) {
            if (Array.isArray(a))
              for (let r = 0, n = c.length; r < n; r++) {
                let n = c[r],
                  p = a[n.materialIndex],
                  m = Math.max(n.start, d.start),
                  y = Math.min(
                    h.count,
                    Math.min(n.start + n.count, d.start + d.count)
                  );
                for (let r = m; r < y; r += 3)
                  (s = tr(
                    this,
                    p,
                    t,
                    i,
                    o,
                    l,
                    u,
                    h.getX(r),
                    h.getX(r + 1),
                    h.getX(r + 2)
                  )) &&
                    ((s.faceIndex = Math.floor(r / 3)),
                    (s.face.materialIndex = n.materialIndex),
                    e.push(s));
              }
            else {
              let r = Math.max(0, d.start),
                n = Math.min(h.count, d.start + d.count);
              for (let c = r; c < n; c += 3)
                (s = tr(
                  this,
                  a,
                  t,
                  i,
                  o,
                  l,
                  u,
                  h.getX(c),
                  h.getX(c + 1),
                  h.getX(c + 2)
                )) && ((s.faceIndex = Math.floor(c / 3)), e.push(s));
            }
          } else if (void 0 !== n) {
            if (Array.isArray(a))
              for (let r = 0, h = c.length; r < h; r++) {
                let h = c[r],
                  p = a[h.materialIndex],
                  m = Math.max(h.start, d.start),
                  y = Math.min(
                    n.count,
                    Math.min(h.start + h.count, d.start + d.count)
                  );
                for (let r = m; r < y; r += 3)
                  (s = tr(this, p, t, i, o, l, u, r, r + 1, r + 2)) &&
                    ((s.faceIndex = Math.floor(r / 3)),
                    (s.face.materialIndex = h.materialIndex),
                    e.push(s));
              }
            else {
              let r = Math.max(0, d.start),
                h = Math.min(n.count, d.start + d.count);
              for (let n = r; n < h; n += 3)
                (s = tr(this, a, t, i, o, l, u, n, n + 1, n + 2)) &&
                  ((s.faceIndex = Math.floor(n / 3)), e.push(s));
            }
          }
        }
      }
      function tr(t, e, i, a, h, n, o, l, u, c) {
        t.getVertexPosition(l, G),
          t.getVertexPosition(u, Q),
          t.getVertexPosition(c, $);
        let d = (function (t, e, i, s, r, a, h, n) {
          if (
            null ===
            (e.side === C.hsX
              ? s.intersectTriangle(h, a, r, !0, n)
              : s.intersectTriangle(r, a, h, e.side === C.hB5, n))
          )
            return null;
          ti.copy(n), ti.applyMatrix4(t.matrixWorld);
          let o = i.ray.origin.distanceTo(ti);
          return o < i.near || o > i.far
            ? null
            : { distance: o, point: ti.clone(), object: t };
        })(t, e, i, a, G, Q, $, te);
        if (d) {
          let t = new s.P();
          B.getBarycoord(te, G, Q, $, t),
            h && (d.uv = B.getInterpolatedAttribute(h, l, u, c, t, new r.I())),
            n && (d.uv1 = B.getInterpolatedAttribute(n, l, u, c, t, new r.I())),
            o &&
              ((d.normal = B.getInterpolatedAttribute(
                o,
                l,
                u,
                c,
                t,
                new s.P()
              )),
              d.normal.dot(a.direction) > 0 && d.normal.multiplyScalar(-1));
          let e = { a: l, b: u, c: c, normal: new s.P(), materialIndex: 0 };
          B.getNormal(G, Q, $, e.normal), (d.face = e), (d.barycoord = t);
        }
        return d;
      }
    },
    2077: (t, e, i) => {
      let s;
      i.d(e, { n: () => b });
      var r = i(5901),
        a = i(7429),
        h = i(8962),
        n = i(453),
        o = i(5395),
        l = i(7993),
        u = i(6917);
      class c {
        static getDataURL(t) {
          let e;
          if (/^data:/i.test(t.src) || "undefined" == typeof HTMLCanvasElement)
            return t.src;
          if (t instanceof HTMLCanvasElement) e = t;
          else {
            void 0 === s && (s = (0, l.qq)("canvas")),
              (s.width = t.width),
              (s.height = t.height);
            let i = s.getContext("2d");
            t instanceof ImageData
              ? i.putImageData(t, 0, 0)
              : i.drawImage(t, 0, 0, t.width, t.height),
              (e = s);
          }
          return e.width > 2048 || e.height > 2048
            ? (console.warn(
                "THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",
                t
              ),
              e.toDataURL("image/jpeg", 0.6))
            : e.toDataURL("image/png");
        }
        static sRGBToLinear(t) {
          if (
            ("undefined" != typeof HTMLImageElement &&
              t instanceof HTMLImageElement) ||
            ("undefined" != typeof HTMLCanvasElement &&
              t instanceof HTMLCanvasElement) ||
            ("undefined" != typeof ImageBitmap && t instanceof ImageBitmap)
          ) {
            let e = (0, l.qq)("canvas");
            (e.width = t.width), (e.height = t.height);
            let i = e.getContext("2d");
            i.drawImage(t, 0, 0, t.width, t.height);
            let s = i.getImageData(0, 0, t.width, t.height),
              r = s.data;
            for (let t = 0; t < r.length; t++)
              r[t] = 255 * (0, u.dk)(r[t] / 255);
            return i.putImageData(s, 0, 0), e;
          }
          if (!t.data)
            return (
              console.warn(
                "THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."
              ),
              t
            );
          {
            let e = t.data.slice(0);
            for (let t = 0; t < e.length; t++)
              e instanceof Uint8Array || e instanceof Uint8ClampedArray
                ? (e[t] = Math.floor(255 * (0, u.dk)(e[t] / 255)))
                : (e[t] = (0, u.dk)(e[t]));
            return { data: e, width: t.width, height: t.height };
          }
        }
      }
      let d = 0;
      class p {
        constructor(t = null) {
          (this.isSource = !0),
            Object.defineProperty(this, "id", { value: d++ }),
            (this.uuid = (0, h.lk)()),
            (this.data = t),
            (this.dataReady = !0),
            (this.version = 0);
        }
        set needsUpdate(t) {
          !0 === t && this.version++;
        }
        toJSON(t) {
          let e = void 0 === t || "string" == typeof t;
          if (!e && void 0 !== t.images[this.uuid]) return t.images[this.uuid];
          let i = { uuid: this.uuid, url: "" },
            s = this.data;
          if (null !== s) {
            let t;
            if (Array.isArray(s)) {
              t = [];
              for (let e = 0, i = s.length; e < i; e++)
                s[e].isDataTexture ? t.push(m(s[e].image)) : t.push(m(s[e]));
            } else t = m(s);
            i.url = t;
          }
          return e || (t.images[this.uuid] = i), i;
        }
      }
      function m(t) {
        return ("undefined" != typeof HTMLImageElement &&
          t instanceof HTMLImageElement) ||
          ("undefined" != typeof HTMLCanvasElement &&
            t instanceof HTMLCanvasElement) ||
          ("undefined" != typeof ImageBitmap && t instanceof ImageBitmap)
          ? c.getDataURL(t)
          : t.data
          ? {
              data: Array.from(t.data),
              width: t.width,
              height: t.height,
              type: t.data.constructor.name,
            }
          : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
      }
      let y = 0;
      class x extends r.Q {
        constructor(
          t = x.DEFAULT_IMAGE,
          e = x.DEFAULT_MAPPING,
          i = a.ghU,
          s = a.ghU,
          r = a.k6q,
          l = a.$_I,
          u = a.GWd,
          c = a.OUM,
          d = x.DEFAULT_ANISOTROPY,
          m = a.jf0
        ) {
          super(),
            (this.isTexture = !0),
            Object.defineProperty(this, "id", { value: y++ }),
            (this.uuid = (0, h.lk)()),
            (this.name = ""),
            (this.source = new p(t)),
            (this.mipmaps = []),
            (this.mapping = e),
            (this.channel = 0),
            (this.wrapS = i),
            (this.wrapT = s),
            (this.magFilter = r),
            (this.minFilter = l),
            (this.anisotropy = d),
            (this.format = u),
            (this.internalFormat = null),
            (this.type = c),
            (this.offset = new n.I(0, 0)),
            (this.repeat = new n.I(1, 1)),
            (this.center = new n.I(0, 0)),
            (this.rotation = 0),
            (this.matrixAutoUpdate = !0),
            (this.matrix = new o.d()),
            (this.generateMipmaps = !0),
            (this.premultiplyAlpha = !1),
            (this.flipY = !0),
            (this.unpackAlignment = 4),
            (this.colorSpace = m),
            (this.userData = {}),
            (this.version = 0),
            (this.onUpdate = null),
            (this.renderTarget = null),
            (this.isRenderTargetTexture = !1),
            (this.pmremVersion = 0);
        }
        get image() {
          return this.source.data;
        }
        set image(t = null) {
          this.source.data = t;
        }
        updateMatrix() {
          this.matrix.setUvTransform(
            this.offset.x,
            this.offset.y,
            this.repeat.x,
            this.repeat.y,
            this.rotation,
            this.center.x,
            this.center.y
          );
        }
        clone() {
          return new this.constructor().copy(this);
        }
        copy(t) {
          return (
            (this.name = t.name),
            (this.source = t.source),
            (this.mipmaps = t.mipmaps.slice(0)),
            (this.mapping = t.mapping),
            (this.channel = t.channel),
            (this.wrapS = t.wrapS),
            (this.wrapT = t.wrapT),
            (this.magFilter = t.magFilter),
            (this.minFilter = t.minFilter),
            (this.anisotropy = t.anisotropy),
            (this.format = t.format),
            (this.internalFormat = t.internalFormat),
            (this.type = t.type),
            this.offset.copy(t.offset),
            this.repeat.copy(t.repeat),
            this.center.copy(t.center),
            (this.rotation = t.rotation),
            (this.matrixAutoUpdate = t.matrixAutoUpdate),
            this.matrix.copy(t.matrix),
            (this.generateMipmaps = t.generateMipmaps),
            (this.premultiplyAlpha = t.premultiplyAlpha),
            (this.flipY = t.flipY),
            (this.unpackAlignment = t.unpackAlignment),
            (this.colorSpace = t.colorSpace),
            (this.renderTarget = t.renderTarget),
            (this.isRenderTargetTexture = t.isRenderTargetTexture),
            (this.userData = JSON.parse(JSON.stringify(t.userData))),
            (this.needsUpdate = !0),
            this
          );
        }
        toJSON(t) {
          let e = void 0 === t || "string" == typeof t;
          if (!e && void 0 !== t.textures[this.uuid])
            return t.textures[this.uuid];
          let i = {
            metadata: {
              version: 4.6,
              type: "Texture",
              generator: "Texture.toJSON",
            },
            uuid: this.uuid,
            name: this.name,
            image: this.source.toJSON(t).uuid,
            mapping: this.mapping,
            channel: this.channel,
            repeat: [this.repeat.x, this.repeat.y],
            offset: [this.offset.x, this.offset.y],
            center: [this.center.x, this.center.y],
            rotation: this.rotation,
            wrap: [this.wrapS, this.wrapT],
            format: this.format,
            internalFormat: this.internalFormat,
            type: this.type,
            colorSpace: this.colorSpace,
            minFilter: this.minFilter,
            magFilter: this.magFilter,
            anisotropy: this.anisotropy,
            flipY: this.flipY,
            generateMipmaps: this.generateMipmaps,
            premultiplyAlpha: this.premultiplyAlpha,
            unpackAlignment: this.unpackAlignment,
          };
          return (
            Object.keys(this.userData).length > 0 &&
              (i.userData = this.userData),
            e || (t.textures[this.uuid] = i),
            i
          );
        }
        dispose() {
          this.dispatchEvent({ type: "dispose" });
        }
        transformUv(t) {
          if (this.mapping !== a.UTZ) return t;
          if ((t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1))
            switch (this.wrapS) {
              case a.GJx:
                t.x = t.x - Math.floor(t.x);
                break;
              case a.ghU:
                t.x = t.x < 0 ? 0 : 1;
                break;
              case a.kTW:
                1 === Math.abs(Math.floor(t.x) % 2)
                  ? (t.x = Math.ceil(t.x) - t.x)
                  : (t.x = t.x - Math.floor(t.x));
            }
          if (t.y < 0 || t.y > 1)
            switch (this.wrapT) {
              case a.GJx:
                t.y = t.y - Math.floor(t.y);
                break;
              case a.ghU:
                t.y = t.y < 0 ? 0 : 1;
                break;
              case a.kTW:
                1 === Math.abs(Math.floor(t.y) % 2)
                  ? (t.y = Math.ceil(t.y) - t.y)
                  : (t.y = t.y - Math.floor(t.y));
            }
          return this.flipY && (t.y = 1 - t.y), t;
        }
        set needsUpdate(t) {
          !0 === t && (this.version++, (this.source.needsUpdate = !0));
        }
        set needsPMREMUpdate(t) {
          !0 === t && this.pmremVersion++;
        }
      }
      (x.DEFAULT_IMAGE = null),
        (x.DEFAULT_MAPPING = a.UTZ),
        (x.DEFAULT_ANISOTROPY = 1);
      var f = i(9120);
      class g extends r.Q {
        constructor(t = 1, e = 1, i = {}) {
          super(),
            (this.isRenderTarget = !0),
            (this.width = t),
            (this.height = e),
            (this.depth = 1),
            (this.scissor = new f.I(0, 0, t, e)),
            (this.scissorTest = !1),
            (this.viewport = new f.I(0, 0, t, e));
          let s = new x(
            { width: t, height: e, depth: 1 },
            (i = Object.assign(
              {
                generateMipmaps: !1,
                internalFormat: null,
                minFilter: a.k6q,
                depthBuffer: !0,
                stencilBuffer: !1,
                resolveDepthBuffer: !0,
                resolveStencilBuffer: !0,
                depthTexture: null,
                samples: 0,
                count: 1,
              },
              i
            )).mapping,
            i.wrapS,
            i.wrapT,
            i.magFilter,
            i.minFilter,
            i.format,
            i.type,
            i.anisotropy,
            i.colorSpace
          );
          (s.flipY = !1),
            (s.generateMipmaps = i.generateMipmaps),
            (s.internalFormat = i.internalFormat),
            (this.textures = []);
          let r = i.count;
          for (let t = 0; t < r; t++)
            (this.textures[t] = s.clone()),
              (this.textures[t].isRenderTargetTexture = !0),
              (this.textures[t].renderTarget = this);
          (this.depthBuffer = i.depthBuffer),
            (this.stencilBuffer = i.stencilBuffer),
            (this.resolveDepthBuffer = i.resolveDepthBuffer),
            (this.resolveStencilBuffer = i.resolveStencilBuffer),
            (this._depthTexture = null),
            (this.depthTexture = i.depthTexture),
            (this.samples = i.samples);
        }
        get texture() {
          return this.textures[0];
        }
        set texture(t) {
          this.textures[0] = t;
        }
        set depthTexture(t) {
          null !== this._depthTexture &&
            (this._depthTexture.renderTarget = null),
            null !== t && (t.renderTarget = this),
            (this._depthTexture = t);
        }
        get depthTexture() {
          return this._depthTexture;
        }
        setSize(t, e, i = 1) {
          if (this.width !== t || this.height !== e || this.depth !== i) {
            (this.width = t), (this.height = e), (this.depth = i);
            for (let s = 0, r = this.textures.length; s < r; s++)
              (this.textures[s].image.width = t),
                (this.textures[s].image.height = e),
                (this.textures[s].image.depth = i);
            this.dispose();
          }
          this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e);
        }
        clone() {
          return new this.constructor().copy(this);
        }
        copy(t) {
          (this.width = t.width),
            (this.height = t.height),
            (this.depth = t.depth),
            this.scissor.copy(t.scissor),
            (this.scissorTest = t.scissorTest),
            this.viewport.copy(t.viewport),
            (this.textures.length = 0);
          for (let e = 0, i = t.textures.length; e < i; e++)
            (this.textures[e] = t.textures[e].clone()),
              (this.textures[e].isRenderTargetTexture = !0),
              (this.textures[e].renderTarget = this);
          let e = Object.assign({}, t.texture.image);
          return (
            (this.texture.source = new p(e)),
            (this.depthBuffer = t.depthBuffer),
            (this.stencilBuffer = t.stencilBuffer),
            (this.resolveDepthBuffer = t.resolveDepthBuffer),
            (this.resolveStencilBuffer = t.resolveStencilBuffer),
            null !== t.depthTexture &&
              (this.depthTexture = t.depthTexture.clone()),
            (this.samples = t.samples),
            this
          );
        }
        dispose() {
          this.dispatchEvent({ type: "dispose" });
        }
      }
      class b extends g {
        constructor(t = 1, e = 1, i = {}) {
          super(t, e, i), (this.isWebGLRenderTarget = !0);
        }
      }
    },
    2166: (t, e, i) => {
      i.d(e, { Z: () => a });
      var s = i(4753),
        r = i(168);
      class a extends s.B {
        constructor() {
          super(),
            (this.isScene = !0),
            (this.type = "Scene"),
            (this.background = null),
            (this.environment = null),
            (this.fog = null),
            (this.backgroundBlurriness = 0),
            (this.backgroundIntensity = 1),
            (this.backgroundRotation = new r.O()),
            (this.environmentIntensity = 1),
            (this.environmentRotation = new r.O()),
            (this.overrideMaterial = null),
            "undefined" != typeof __THREE_DEVTOOLS__ &&
              __THREE_DEVTOOLS__.dispatchEvent(
                new CustomEvent("observe", { detail: this })
              );
        }
        copy(t, e) {
          return (
            super.copy(t, e),
            null !== t.background && (this.background = t.background.clone()),
            null !== t.environment &&
              (this.environment = t.environment.clone()),
            null !== t.fog && (this.fog = t.fog.clone()),
            (this.backgroundBlurriness = t.backgroundBlurriness),
            (this.backgroundIntensity = t.backgroundIntensity),
            this.backgroundRotation.copy(t.backgroundRotation),
            (this.environmentIntensity = t.environmentIntensity),
            this.environmentRotation.copy(t.environmentRotation),
            null !== t.overrideMaterial &&
              (this.overrideMaterial = t.overrideMaterial.clone()),
            (this.matrixAutoUpdate = t.matrixAutoUpdate),
            this
          );
        }
        toJSON(t) {
          let e = super.toJSON(t);
          return (
            null !== this.fog && (e.object.fog = this.fog.toJSON()),
            this.backgroundBlurriness > 0 &&
              (e.object.backgroundBlurriness = this.backgroundBlurriness),
            1 !== this.backgroundIntensity &&
              (e.object.backgroundIntensity = this.backgroundIntensity),
            (e.object.backgroundRotation = this.backgroundRotation.toArray()),
            1 !== this.environmentIntensity &&
              (e.object.environmentIntensity = this.environmentIntensity),
            (e.object.environmentRotation = this.environmentRotation.toArray()),
            e
          );
        }
      }
    },
    7993: (t, e, i) => {
      function s(t) {
        for (let e = t.length - 1; e >= 0; --e) if (t[e] >= 65535) return !0;
        return !1;
      }
      function r(t) {
        return document.createElementNS("http://www.w3.org/1999/xhtml", t);
      }
      i.d(e, { AQ: () => s, qq: () => r }),
        Int8Array,
        Uint8Array,
        Uint8ClampedArray,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array;
    },
    4800: (t, e, i) => {
      i.d(e, { v: () => n });
      var s = i(6015),
        r = i(2232);
      let a = (t) => t,
        h = (t) => {
          let e = (0, r.y)(t),
            i = (t) =>
              (function (t, e = a) {
                let i = s.useSyncExternalStore(
                  t.subscribe,
                  () => e(t.getState()),
                  () => e(t.getInitialState())
                );
                return s.useDebugValue(i), i;
              })(e, t);
          return Object.assign(i, e), i;
        },
        n = (t) => (t ? h(t) : h);
    },
    2232: (t, e, i) => {
      i.d(e, { y: () => r });
      let s = (t) => {
          let e;
          let i = new Set(),
            s = (t, s) => {
              let r = "function" == typeof t ? t(e) : t;
              if (!Object.is(r, e)) {
                let t = e;
                (e = (null != s ? s : "object" != typeof r || null === r)
                  ? r
                  : Object.assign({}, e, r)),
                  i.forEach((i) => i(e, t));
              }
            },
            r = () => e,
            a = {
              setState: s,
              getState: r,
              getInitialState: () => h,
              subscribe: (t) => (i.add(t), () => i.delete(t)),
            },
            h = (e = t(s, r, a));
          return a;
        },
        r = (t) => (t ? s(t) : s);
    },
  },
]);
