"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [293],
  {
    4558: (e, t, i) => {
      i.d(t, { AH: () => E, nV: () => u, s0: () => f });
      var r = i(3751),
        n = class {
          constructor() {
            (this.startTime = performance.now()),
              (this.previousTime = 0),
              (this.currentTime = 0),
              (this._delta = 0),
              (this._elapsed = 0),
              (this._fixedDelta = 1e3 / 60),
              (this.timescale = 1),
              (this.useFixedDelta = !1),
              (this._autoReset = !1);
          }
          get autoReset() {
            return this._autoReset;
          }
          set autoReset(e) {
            "undefined" != typeof document &&
              void 0 !== document.hidden &&
              (e
                ? document.addEventListener("visibilitychange", this)
                : document.removeEventListener("visibilitychange", this),
              (this._autoReset = e));
          }
          get delta() {
            return 0.001 * this._delta;
          }
          get fixedDelta() {
            return 0.001 * this._fixedDelta;
          }
          set fixedDelta(e) {
            this._fixedDelta = 1e3 * e;
          }
          get elapsed() {
            return 0.001 * this._elapsed;
          }
          update(e) {
            this.useFixedDelta
              ? (this._delta = this.fixedDelta)
              : ((this.previousTime = this.currentTime),
                (this.currentTime =
                  (void 0 !== e ? e : performance.now()) - this.startTime),
                (this._delta = this.currentTime - this.previousTime)),
              (this._delta *= this.timescale),
              (this._elapsed += this._delta);
          }
          reset() {
            (this._delta = 0),
              (this._elapsed = 0),
              (this.currentTime = performance.now() - this.startTime);
          }
          getDelta() {
            return this.delta;
          }
          getElapsed() {
            return this.elapsed;
          }
          handleEvent(e) {
            document.hidden ||
              (this.currentTime = performance.now() - this.startTime);
          }
          dispose() {
            this.autoReset = !1;
          }
        },
        s = (() => {
          let e = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
            t = new Float32Array([0, 0, 2, 0, 0, 2]),
            i = new r.LoY();
          return (
            i.setAttribute("position", new r.THS(e, 3)),
            i.setAttribute("uv", new r.THS(t, 2)),
            i
          );
        })(),
        a = class e {
          static get fullscreenGeometry() {
            return s;
          }
          constructor(e = "Pass", t = new r.Z58(), i = new r.i7d()) {
            (this.name = e),
              (this.renderer = null),
              (this.scene = t),
              (this.camera = i),
              (this.screen = null),
              (this.rtt = !0),
              (this.needsSwap = !0),
              (this.needsDepthTexture = !1),
              (this.enabled = !0);
          }
          get renderToScreen() {
            return !this.rtt;
          }
          set renderToScreen(e) {
            if (this.rtt === e) {
              let t = this.fullscreenMaterial;
              null !== t && (t.needsUpdate = !0), (this.rtt = !e);
            }
          }
          set mainScene(e) {}
          set mainCamera(e) {}
          setRenderer(e) {
            this.renderer = e;
          }
          isEnabled() {
            return this.enabled;
          }
          setEnabled(e) {
            this.enabled = e;
          }
          get fullscreenMaterial() {
            return null !== this.screen ? this.screen.material : null;
          }
          set fullscreenMaterial(t) {
            let i = this.screen;
            null !== i
              ? (i.material = t)
              : (((i = new r.eaF(e.fullscreenGeometry, t)).frustumCulled = !1),
                null === this.scene && (this.scene = new r.Z58()),
                this.scene.add(i),
                (this.screen = i));
          }
          getFullscreenMaterial() {
            return this.fullscreenMaterial;
          }
          setFullscreenMaterial(e) {
            this.fullscreenMaterial = e;
          }
          getDepthTexture() {
            return null;
          }
          setDepthTexture(e, t = r.Rkk) {}
          render(e, t, i, r, n) {
            throw Error("Render method not implemented!");
          }
          setSize(e, t) {}
          initialize(e, t, i) {}
          dispose() {
            for (let t of Object.keys(this)) {
              let i = this[t];
              (i instanceof r.nWS ||
                i instanceof r.imn ||
                i instanceof r.gPd ||
                i instanceof e) &&
                this[t].dispose();
            }
            null !== this.fullscreenMaterial &&
              this.fullscreenMaterial.dispose();
          }
        },
        l = class extends a {
          constructor() {
            super("ClearMaskPass", null, null), (this.needsSwap = !1);
          }
          render(e, t, i, r, n) {
            let s = e.state.buffers.stencil;
            s.setLocked(!1), s.setTest(!1);
          }
        },
        o =
          "varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",
        c = class extends r.BKk {
          constructor() {
            super({
              name: "CopyMaterial",
              uniforms: { inputBuffer: new r.nc$(null), opacity: new r.nc$(1) },
              blending: r.XIg,
              toneMapped: !1,
              depthWrite: !1,
              depthTest: !1,
              fragmentShader:
                "#include <common>\n#include <dithering_pars_fragment>\n#ifdef FRAMEBUFFER_PRECISION_HIGH\nuniform mediump sampler2D inputBuffer;\n#else\nuniform lowp sampler2D inputBuffer;\n#endif\nuniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;\n#include <colorspace_fragment>\n#include <dithering_fragment>\n}",
              vertexShader: o,
            });
          }
          set inputBuffer(e) {
            this.uniforms.inputBuffer.value = e;
          }
          setInputBuffer(e) {
            this.uniforms.inputBuffer.value = e;
          }
          getOpacity(e) {
            return this.uniforms.opacity.value;
          }
          setOpacity(e) {
            this.uniforms.opacity.value = e;
          }
        },
        u = class extends a {
          constructor(e, t = !0) {
            super("CopyPass"),
              (this.fullscreenMaterial = new c()),
              (this.needsSwap = !1),
              (this.renderTarget = e),
              void 0 === e &&
                ((this.renderTarget = new r.nWS(1, 1, {
                  minFilter: r.k6q,
                  magFilter: r.k6q,
                  stencilBuffer: !1,
                  depthBuffer: !1,
                })),
                (this.renderTarget.texture.name = "CopyPass.Target")),
              (this.autoResize = t);
          }
          get resize() {
            return this.autoResize;
          }
          set resize(e) {
            this.autoResize = e;
          }
          get texture() {
            return this.renderTarget.texture;
          }
          getTexture() {
            return this.renderTarget.texture;
          }
          setAutoResizeEnabled(e) {
            this.autoResize = e;
          }
          render(e, t, i, r, n) {
            (this.fullscreenMaterial.inputBuffer = t.texture),
              e.setRenderTarget(this.renderToScreen ? null : this.renderTarget),
              e.render(this.scene, this.camera);
          }
          setSize(e, t) {
            this.autoResize && this.renderTarget.setSize(e, t);
          }
          initialize(e, t, i) {
            void 0 !== i &&
              ((this.renderTarget.texture.type = i),
              i !== r.OUM
                ? (this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH =
                    "1")
                : null !== e &&
                  e.outputColorSpace === r.er$ &&
                  (this.renderTarget.texture.colorSpace = r.er$));
          }
        },
        h = new r.Q1f(),
        v = class extends a {
          constructor(e = !0, t = !0, i = !1) {
            super("ClearPass", null, null),
              (this.needsSwap = !1),
              (this.color = e),
              (this.depth = t),
              (this.stencil = i),
              (this.overrideClearColor = null),
              (this.overrideClearAlpha = -1);
          }
          setClearFlags(e, t, i) {
            (this.color = e), (this.depth = t), (this.stencil = i);
          }
          getOverrideClearColor() {
            return this.overrideClearColor;
          }
          setOverrideClearColor(e) {
            this.overrideClearColor = e;
          }
          getOverrideClearAlpha() {
            return this.overrideClearAlpha;
          }
          setOverrideClearAlpha(e) {
            this.overrideClearAlpha = e;
          }
          render(e, t, i, r, n) {
            let s = this.overrideClearColor,
              a = this.overrideClearAlpha,
              l = e.getClearAlpha(),
              o = null !== s,
              c = a >= 0;
            o
              ? (e.getClearColor(h), e.setClearColor(s, c ? a : l))
              : c && e.setClearAlpha(a),
              e.setRenderTarget(this.renderToScreen ? null : t),
              e.clear(this.color, this.depth, this.stencil),
              o ? e.setClearColor(h, l) : c && e.setClearAlpha(l);
          }
        },
        d = class extends a {
          constructor(e, t) {
            super("MaskPass", e, t),
              (this.needsSwap = !1),
              (this.clearPass = new v(!1, !1, !0)),
              (this.inverse = !1);
          }
          set mainScene(e) {
            this.scene = e;
          }
          set mainCamera(e) {
            this.camera = e;
          }
          get inverted() {
            return this.inverse;
          }
          set inverted(e) {
            this.inverse = e;
          }
          get clear() {
            return this.clearPass.enabled;
          }
          set clear(e) {
            this.clearPass.enabled = e;
          }
          getClearPass() {
            return this.clearPass;
          }
          isInverted() {
            return this.inverted;
          }
          setInverted(e) {
            this.inverted = e;
          }
          render(e, t, i, r, n) {
            let s = e.getContext(),
              a = e.state.buffers,
              l = this.scene,
              o = this.camera,
              c = this.clearPass,
              u = this.inverted ? 0 : 1;
            a.color.setMask(!1),
              a.depth.setMask(!1),
              a.color.setLocked(!0),
              a.depth.setLocked(!0),
              a.stencil.setTest(!0),
              a.stencil.setOp(s.REPLACE, s.REPLACE, s.REPLACE),
              a.stencil.setFunc(s.ALWAYS, u, 0xffffffff),
              a.stencil.setClear(1 - u),
              a.stencil.setLocked(!0),
              this.clearPass.enabled &&
                (this.renderToScreen
                  ? c.render(e, null)
                  : (c.render(e, t), c.render(e, i))),
              this.renderToScreen
                ? e.setRenderTarget(null)
                : (e.setRenderTarget(t), e.render(l, o), e.setRenderTarget(i)),
              e.render(l, o),
              a.color.setLocked(!1),
              a.depth.setLocked(!1),
              a.stencil.setLocked(!1),
              a.stencil.setFunc(s.EQUAL, 1, 0xffffffff),
              a.stencil.setOp(s.KEEP, s.KEEP, s.KEEP),
              a.stencil.setLocked(!0);
          }
        },
        f = class {
          constructor(
            e = null,
            {
              depthBuffer: t = !0,
              stencilBuffer: i = !1,
              multisampling: r = 0,
              frameBufferType: s,
            } = {}
          ) {
            (this.renderer = null),
              (this.inputBuffer = this.createBuffer(t, i, s, r)),
              (this.outputBuffer = this.inputBuffer.clone()),
              (this.copyPass = new u()),
              (this.depthTexture = null),
              (this.passes = []),
              (this.timer = new n()),
              (this.autoRenderToScreen = !0),
              this.setRenderer(e);
          }
          get multisampling() {
            return this.inputBuffer.samples || 0;
          }
          set multisampling(e) {
            let t = this.inputBuffer,
              i = this.multisampling;
            i > 0 && e > 0
              ? ((this.inputBuffer.samples = e),
                (this.outputBuffer.samples = e),
                this.inputBuffer.dispose(),
                this.outputBuffer.dispose())
              : i !== e &&
                (this.inputBuffer.dispose(),
                this.outputBuffer.dispose(),
                (this.inputBuffer = this.createBuffer(
                  t.depthBuffer,
                  t.stencilBuffer,
                  t.texture.type,
                  e
                )),
                (this.inputBuffer.depthTexture = this.depthTexture),
                (this.outputBuffer = this.inputBuffer.clone()));
          }
          getTimer() {
            return this.timer;
          }
          getRenderer() {
            return this.renderer;
          }
          setRenderer(e) {
            if (((this.renderer = e), null !== e)) {
              let t = e.getSize(new r.I9Y()),
                i = e.getContext().getContextAttributes().alpha,
                n = this.inputBuffer.texture.type;
              for (let s of (n === r.OUM &&
                e.outputColorSpace === r.er$ &&
                ((this.inputBuffer.texture.colorSpace = r.er$),
                (this.outputBuffer.texture.colorSpace = r.er$),
                this.inputBuffer.dispose(),
                this.outputBuffer.dispose()),
              (e.autoClear = !1),
              this.setSize(t.width, t.height),
              this.passes))
                s.initialize(e, i, n);
            }
          }
          replaceRenderer(e, t = !0) {
            let i = this.renderer,
              r = i.domElement.parentNode;
            return (
              this.setRenderer(e),
              t &&
                null !== r &&
                (r.removeChild(i.domElement), r.appendChild(e.domElement)),
              i
            );
          }
          createDepthTexture() {
            let e = (this.depthTexture = new r.VCu());
            return (
              (this.inputBuffer.depthTexture = e),
              this.inputBuffer.dispose(),
              this.inputBuffer.stencilBuffer
                ? ((e.format = r.dcC), (e.type = r.V3x))
                : (e.type = r.bkx),
              e
            );
          }
          deleteDepthTexture() {
            if (null !== this.depthTexture)
              for (let e of (this.depthTexture.dispose(),
              (this.depthTexture = null),
              (this.inputBuffer.depthTexture = null),
              this.inputBuffer.dispose(),
              this.passes))
                e.setDepthTexture(null);
          }
          createBuffer(e, t, i, n) {
            let s = this.renderer,
              a =
                null === s ? new r.I9Y() : s.getDrawingBufferSize(new r.I9Y()),
              l = {
                minFilter: r.k6q,
                magFilter: r.k6q,
                stencilBuffer: t,
                depthBuffer: e,
                type: i,
              },
              o = new r.nWS(a.width, a.height, l);
            return (
              n > 0 &&
                ((o.ignoreDepthForMultisampleCopy = !1), (o.samples = n)),
              i === r.OUM &&
                null !== s &&
                s.outputColorSpace === r.er$ &&
                (o.texture.colorSpace = r.er$),
              (o.texture.name = "EffectComposer.Buffer"),
              (o.texture.generateMipmaps = !1),
              o
            );
          }
          setMainScene(e) {
            for (let t of this.passes) t.mainScene = e;
          }
          setMainCamera(e) {
            for (let t of this.passes) t.mainCamera = e;
          }
          addPass(e, t) {
            let i = this.passes,
              n = this.renderer,
              s = n.getDrawingBufferSize(new r.I9Y()),
              a = n.getContext().getContextAttributes().alpha,
              l = this.inputBuffer.texture.type;
            if (
              (e.setRenderer(n),
              e.setSize(s.width, s.height),
              e.initialize(n, a, l),
              this.autoRenderToScreen &&
                (i.length > 0 && (i[i.length - 1].renderToScreen = !1),
                e.renderToScreen && (this.autoRenderToScreen = !1)),
              void 0 !== t ? i.splice(t, 0, e) : i.push(e),
              this.autoRenderToScreen && (i[i.length - 1].renderToScreen = !0),
              e.needsDepthTexture || null !== this.depthTexture)
            ) {
              if (null === this.depthTexture) {
                let t = this.createDepthTexture();
                for (e of i) e.setDepthTexture(t);
              } else e.setDepthTexture(this.depthTexture);
            }
          }
          removePass(e) {
            let t = this.passes,
              i = t.indexOf(e);
            -1 !== i &&
              t.splice(i, 1).length > 0 &&
              (null === this.depthTexture ||
                t.reduce((e, t) => e || t.needsDepthTexture, !1) ||
                (e.getDepthTexture() === this.depthTexture &&
                  e.setDepthTexture(null),
                this.deleteDepthTexture()),
              this.autoRenderToScreen &&
                i === t.length &&
                ((e.renderToScreen = !1),
                t.length > 0 && (t[t.length - 1].renderToScreen = !0)));
          }
          removeAllPasses() {
            let e = this.passes;
            this.deleteDepthTexture(),
              e.length > 0 &&
                (this.autoRenderToScreen &&
                  (e[e.length - 1].renderToScreen = !1),
                (this.passes = []));
          }
          render(e) {
            let t, i, r;
            let n = this.renderer,
              s = this.copyPass,
              a = this.inputBuffer,
              o = this.outputBuffer,
              c = !1;
            for (let u of (void 0 === e &&
              (this.timer.update(), (e = this.timer.getDelta())),
            this.passes))
              u.enabled &&
                (u.render(n, a, o, e, c),
                u.needsSwap &&
                  (c &&
                    ((s.renderToScreen = u.renderToScreen),
                    (t = n.getContext()),
                    (i = n.state.buffers.stencil).setFunc(
                      t.NOTEQUAL,
                      1,
                      0xffffffff
                    ),
                    s.render(n, a, o, e, c),
                    i.setFunc(t.EQUAL, 1, 0xffffffff)),
                  (r = a),
                  (a = o),
                  (o = r)),
                u instanceof d ? (c = !0) : u instanceof l && (c = !1));
          }
          setSize(e, t, i) {
            let n = this.renderer,
              s = n.getSize(new r.I9Y());
            (void 0 === e || void 0 === t) && ((e = s.width), (t = s.height)),
              (s.width !== e || s.height !== t) && n.setSize(e, t, i);
            let a = n.getDrawingBufferSize(new r.I9Y());
            for (let e of (this.inputBuffer.setSize(a.width, a.height),
            this.outputBuffer.setSize(a.width, a.height),
            this.passes))
              e.setSize(a.width, a.height);
          }
          reset() {
            this.dispose(), (this.autoRenderToScreen = !0);
          }
          dispose() {
            for (let e of this.passes) e.dispose();
            (this.passes = []),
              null !== this.inputBuffer && this.inputBuffer.dispose(),
              null !== this.outputBuffer && this.outputBuffer.dispose(),
              this.deleteDepthTexture(),
              this.copyPass.dispose(),
              this.timer.dispose(),
              a.fullscreenGeometry.dispose();
          }
        },
        p = { NONE: 0 };
      function y(e) {
        let t;
        if (0 === e) t = new Float64Array(0);
        else if (1 === e) t = new Float64Array([1]);
        else if (e > 1) {
          let i = new Float64Array(e),
            r = new Float64Array(e);
          for (let n = 1; n <= e; ++n) {
            for (let e = 0; e < n; ++e)
              r[e] = 0 === e || e === n - 1 ? 1 : i[e - 1] + i[e];
            (t = r), (r = i), (i = t);
          }
        }
        return t;
      }
      var m = !1,
        g = class {
          constructor(e = null) {
            (this.originalMaterials = new Map()),
              (this.material = null),
              (this.materials = null),
              (this.materialsBackSide = null),
              (this.materialsDoubleSide = null),
              (this.materialsFlatShaded = null),
              (this.materialsFlatShadedBackSide = null),
              (this.materialsFlatShadedDoubleSide = null),
              this.setMaterial(e),
              (this.meshCount = 0),
              (this.replaceMaterial = (e) => {
                if (e.isMesh) {
                  let t;
                  if (e.material.flatShading)
                    switch (e.material.side) {
                      case r.$EB:
                        t = this.materialsFlatShadedDoubleSide;
                        break;
                      case r.hsX:
                        t = this.materialsFlatShadedBackSide;
                        break;
                      default:
                        t = this.materialsFlatShaded;
                    }
                  else
                    switch (e.material.side) {
                      case r.$EB:
                        t = this.materialsDoubleSide;
                        break;
                      case r.hsX:
                        t = this.materialsBackSide;
                        break;
                      default:
                        t = this.materials;
                    }
                  this.originalMaterials.set(e, e.material),
                    e.isSkinnedMesh
                      ? (e.material = t[2])
                      : e.isInstancedMesh
                      ? (e.material = t[1])
                      : (e.material = t[0]),
                    ++this.meshCount;
                }
              });
          }
          cloneMaterial(e) {
            if (!(e instanceof r.BKk)) return e.clone();
            let t = e.uniforms,
              i = new Map();
            for (let e in t) {
              let r = t[e].value;
              r.isRenderTargetTexture && ((t[e].value = null), i.set(e, r));
            }
            let n = e.clone();
            for (let e of i)
              (t[e[0]].value = e[1]), (n.uniforms[e[0]].value = e[1]);
            return n;
          }
          setMaterial(e) {
            if ((this.disposeMaterials(), (this.material = e), null !== e)) {
              let t = (this.materials = [
                this.cloneMaterial(e),
                this.cloneMaterial(e),
                this.cloneMaterial(e),
              ]);
              for (let i of t)
                (i.uniforms = Object.assign({}, e.uniforms)), (i.side = r.hB5);
              (t[2].skinning = !0),
                (this.materialsBackSide = t.map((t) => {
                  let i = this.cloneMaterial(t);
                  return (
                    (i.uniforms = Object.assign({}, e.uniforms)),
                    (i.side = r.hsX),
                    i
                  );
                })),
                (this.materialsDoubleSide = t.map((t) => {
                  let i = this.cloneMaterial(t);
                  return (
                    (i.uniforms = Object.assign({}, e.uniforms)),
                    (i.side = r.$EB),
                    i
                  );
                })),
                (this.materialsFlatShaded = t.map((t) => {
                  let i = this.cloneMaterial(t);
                  return (
                    (i.uniforms = Object.assign({}, e.uniforms)),
                    (i.flatShading = !0),
                    i
                  );
                })),
                (this.materialsFlatShadedBackSide = t.map((t) => {
                  let i = this.cloneMaterial(t);
                  return (
                    (i.uniforms = Object.assign({}, e.uniforms)),
                    (i.flatShading = !0),
                    (i.side = r.hsX),
                    i
                  );
                })),
                (this.materialsFlatShadedDoubleSide = t.map((t) => {
                  let i = this.cloneMaterial(t);
                  return (
                    (i.uniforms = Object.assign({}, e.uniforms)),
                    (i.flatShading = !0),
                    (i.side = r.$EB),
                    i
                  );
                }));
            }
          }
          render(e, t, i) {
            let r = e.shadowMap.enabled;
            if (((e.shadowMap.enabled = !1), m)) {
              let r = this.originalMaterials;
              for (let n of ((this.meshCount = 0),
              t.traverse(this.replaceMaterial),
              e.render(t, i),
              r))
                n[0].material = n[1];
              this.meshCount !== r.size && r.clear();
            } else {
              let r = t.overrideMaterial;
              (t.overrideMaterial = this.material),
                e.render(t, i),
                (t.overrideMaterial = r);
            }
            e.shadowMap.enabled = r;
          }
          disposeMaterials() {
            if (null !== this.material)
              for (let e of this.materials
                .concat(this.materialsBackSide)
                .concat(this.materialsDoubleSide)
                .concat(this.materialsFlatShaded)
                .concat(this.materialsFlatShadedBackSide)
                .concat(this.materialsFlatShadedDoubleSide))
                e.dispose();
          }
          dispose() {
            this.originalMaterials.clear(), this.disposeMaterials();
          }
          static get workaroundEnabled() {
            return m;
          }
          static set workaroundEnabled(e) {
            m = e;
          }
        },
        x = class extends r.Qev {
          constructor(e, t = -1, i = -1, n = 1) {
            super(),
              (this.resizable = e),
              (this.baseSize = new r.I9Y(1, 1)),
              (this.preferredSize = new r.I9Y(t, i)),
              (this.target = this.preferredSize),
              (this.s = n),
              (this.effectiveSize = new r.I9Y()),
              this.addEventListener("change", () => this.updateEffectiveSize()),
              this.updateEffectiveSize();
          }
          updateEffectiveSize() {
            let e = this.baseSize,
              t = this.preferredSize,
              i = this.effectiveSize,
              r = this.scale;
            -1 !== t.width
              ? (i.width = t.width)
              : -1 !== t.height
              ? (i.width = Math.round(
                  t.height * (e.width / Math.max(e.height, 1))
                ))
              : (i.width = Math.round(e.width * r)),
              -1 !== t.height
                ? (i.height = t.height)
                : -1 !== t.width
                ? (i.height = Math.round(
                    t.width / Math.max(e.width / Math.max(e.height, 1), 1)
                  ))
                : (i.height = Math.round(e.height * r));
          }
          get width() {
            return this.effectiveSize.width;
          }
          set width(e) {
            this.preferredWidth = e;
          }
          get height() {
            return this.effectiveSize.height;
          }
          set height(e) {
            this.preferredHeight = e;
          }
          getWidth() {
            return this.width;
          }
          getHeight() {
            return this.height;
          }
          get scale() {
            return this.s;
          }
          set scale(e) {
            this.s !== e &&
              ((this.s = e),
              this.preferredSize.setScalar(-1),
              this.dispatchEvent({ type: "change" }),
              this.resizable.setSize(
                this.baseSize.width,
                this.baseSize.height
              ));
          }
          getScale() {
            return this.scale;
          }
          setScale(e) {
            this.scale = e;
          }
          get baseWidth() {
            return this.baseSize.width;
          }
          set baseWidth(e) {
            this.baseSize.width !== e &&
              ((this.baseSize.width = e),
              this.dispatchEvent({ type: "change" }),
              this.resizable.setSize(
                this.baseSize.width,
                this.baseSize.height
              ));
          }
          getBaseWidth() {
            return this.baseWidth;
          }
          setBaseWidth(e) {
            this.baseWidth = e;
          }
          get baseHeight() {
            return this.baseSize.height;
          }
          set baseHeight(e) {
            this.baseSize.height !== e &&
              ((this.baseSize.height = e),
              this.dispatchEvent({ type: "change" }),
              this.resizable.setSize(
                this.baseSize.width,
                this.baseSize.height
              ));
          }
          getBaseHeight() {
            return this.baseHeight;
          }
          setBaseHeight(e) {
            this.baseHeight = e;
          }
          setBaseSize(e, t) {
            (this.baseSize.width !== e || this.baseSize.height !== t) &&
              (this.baseSize.set(e, t),
              this.dispatchEvent({ type: "change" }),
              this.resizable.setSize(
                this.baseSize.width,
                this.baseSize.height
              ));
          }
          get preferredWidth() {
            return this.preferredSize.width;
          }
          set preferredWidth(e) {
            this.preferredSize.width !== e &&
              ((this.preferredSize.width = e),
              this.dispatchEvent({ type: "change" }),
              this.resizable.setSize(
                this.baseSize.width,
                this.baseSize.height
              ));
          }
          getPreferredWidth() {
            return this.preferredWidth;
          }
          setPreferredWidth(e) {
            this.preferredWidth = e;
          }
          get preferredHeight() {
            return this.preferredSize.height;
          }
          set preferredHeight(e) {
            this.preferredSize.height !== e &&
              ((this.preferredSize.height = e),
              this.dispatchEvent({ type: "change" }),
              this.resizable.setSize(
                this.baseSize.width,
                this.baseSize.height
              ));
          }
          getPreferredHeight() {
            return this.preferredHeight;
          }
          setPreferredHeight(e) {
            this.preferredHeight = e;
          }
          setPreferredSize(e, t) {
            (this.preferredSize.width !== e ||
              this.preferredSize.height !== t) &&
              (this.preferredSize.set(e, t),
              this.dispatchEvent({ type: "change" }),
              this.resizable.setSize(
                this.baseSize.width,
                this.baseSize.height
              ));
          }
          copy(e) {
            (this.s = e.scale),
              this.baseSize.set(e.baseWidth, e.baseHeight),
              this.preferredSize.set(e.preferredWidth, e.preferredHeight),
              this.dispatchEvent({ type: "change" }),
              this.resizable.setSize(this.baseSize.width, this.baseSize.height);
          }
          static get AUTO_SIZE() {
            return -1;
          }
        },
        S = {
          ADD: 0,
          ALPHA: 1,
          AVERAGE: 2,
          COLOR: 3,
          COLOR_BURN: 4,
          COLOR_DODGE: 5,
          DARKEN: 6,
          DIFFERENCE: 7,
          DIVIDE: 8,
          DST: 9,
          EXCLUSION: 10,
          HARD_LIGHT: 11,
          HARD_MIX: 12,
          HUE: 13,
          INVERT: 14,
          INVERT_RGB: 15,
          LIGHTEN: 16,
          LINEAR_BURN: 17,
          LINEAR_DODGE: 18,
          LINEAR_LIGHT: 19,
          LUMINOSITY: 20,
          MULTIPLY: 21,
          NEGATION: 22,
          NORMAL: 23,
          OVERLAY: 24,
          PIN_LIGHT: 25,
          REFLECT: 26,
          SATURATION: 27,
          SCREEN: 28,
          SOFT_LIGHT: 29,
          SRC: 30,
          SUBTRACT: 31,
          VIVID_LIGHT: 32,
        },
        w = new Map([
          [
            S.ADD,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y,opacity);}",
          ],
          [
            S.ALPHA,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,min(y.a,opacity));}",
          ],
          [
            S.AVERAGE,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y)*0.5,opacity);}",
          ],
          [
            S.COLOR,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.rg,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",
          ],
          [
            S.COLOR_BURN,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(step(0.0,y)*(1.0-min(vec4(1.0),(1.0-x)/y)),vec4(1.0),step(1.0,x));return mix(x,z,opacity);}",
          ],
          [
            S.COLOR_DODGE,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=step(0.0,x)*mix(min(vec4(1.0),x/max(1.0-y,1e-9)),vec4(1.0),step(1.0,y));return mix(x,z,opacity);}",
          ],
          [
            S.DARKEN,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x,y),opacity);}",
          ],
          [
            S.DIFFERENCE,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,abs(x-y),opacity);}",
          ],
          [
            S.DIVIDE,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x/max(y,1e-12),opacity);}",
          ],
          [S.DST, null],
          [
            S.EXCLUSION,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y-2.0*x*y),opacity);}",
          ],
          [
            S.HARD_LIGHT,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 a=min(x,1.0),b=min(y,1.0);vec4 z=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,y));return mix(x,z,opacity);}",
          ],
          [
            S.HARD_MIX,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,step(1.0,x+y),opacity);}",
          ],
          [
            S.HUE,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.r,xHSL.gb));return vec4(mix(x.rgb,z,opacity),y.a);}",
          ],
          [
            S.INVERT,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-y,opacity);}",
          ],
          [
            S.INVERT_RGB,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y*(1.0-x),opacity);}",
          ],
          [
            S.LIGHTEN,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x,y),opacity);}",
          ],
          [
            S.LINEAR_BURN,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(y+x-1.0,0.0,1.0),opacity);}",
          ],
          [
            S.LINEAR_DODGE,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x+y,1.0),opacity);}",
          ],
          [
            S.LINEAR_LIGHT,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(2.0*y+x-1.0,0.0,1.0),opacity);}",
          ],
          [
            S.LUMINOSITY,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.rg,yHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",
          ],
          [
            S.MULTIPLY,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x*y,opacity);}",
          ],
          [
            S.NEGATION,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-abs(1.0-x-y),opacity);}",
          ],
          [
            S.NORMAL,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,opacity);}",
          ],
          [
            S.OVERLAY,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(2.0*y*x,1.0-2.0*(1.0-y)*(1.0-x),step(0.5,x));return mix(x,z,opacity);}",
          ],
          [
            S.PIN_LIGHT,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 z=mix(mix(y2,x,step(0.5*x,y)),max(vec4(0.0),y2-1.0),step(x,(y2-1.0)));return mix(x,z,opacity);}",
          ],
          [
            S.REFLECT,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(min(x*x/max(1.0-y,1e-12),1.0),y,step(1.0,y));return mix(x,z,opacity);}",
          ],
          [
            S.SATURATION,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.r,yHSL.g,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",
          ],
          [
            S.SCREEN,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y-min(x*y,1.0),opacity);}",
          ],
          [
            S.SOFT_LIGHT,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 w=step(0.5,y);vec4 z=mix(x-(1.0-y2)*x*(1.0-x),mix(x+(y2-1.0)*(sqrt(x)-x),x+(y2-1.0)*x*((16.0*x-12.0)*x+3.0),w*(1.0-step(0.25,x))),w);return mix(x,z,opacity);}",
          ],
          [
            S.SRC,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return y;}",
          ],
          [
            S.SUBTRACT,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x+y-1.0,0.0),opacity);}",
          ],
          [
            S.VIVID_LIGHT,
            "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(max(1.0-min((1.0-x)/(2.0*y),1.0),0.0),min(x/(2.0*(1.0-y)),1.0),step(0.5,y));return mix(x,z,opacity);}",
          ],
        ]),
        U = class extends r.Qev {
          constructor(e, t = 1) {
            super(), (this._blendFunction = e), (this.opacity = new r.nc$(t));
          }
          getOpacity() {
            return this.opacity.value;
          }
          setOpacity(e) {
            this.opacity.value = e;
          }
          get blendFunction() {
            return this._blendFunction;
          }
          set blendFunction(e) {
            (this._blendFunction = e), this.dispatchEvent({ type: "change" });
          }
          getBlendFunction() {
            return this.blendFunction;
          }
          setBlendFunction(e) {
            this.blendFunction = e;
          }
          getShaderCode() {
            return w.get(this.blendFunction);
          }
        },
        B = { MEDIUM: 2 },
        T = [
          new Float32Array([0, 0]),
          new Float32Array([0, 1, 1]),
          new Float32Array([0, 1, 1, 2]),
          new Float32Array([0, 1, 2, 2, 3]),
          new Float32Array([0, 1, 2, 3, 4, 4, 5]),
          new Float32Array([0, 1, 2, 3, 4, 5, 7, 8, 9, 10]),
        ],
        b = class extends r.BKk {
          constructor(e = new r.IUQ()) {
            super({
              name: "KawaseBlurMaterial",
              uniforms: {
                inputBuffer: new r.nc$(null),
                texelSize: new r.nc$(new r.IUQ()),
                scale: new r.nc$(1),
                kernel: new r.nc$(0),
              },
              blending: r.XIg,
              toneMapped: !1,
              depthWrite: !1,
              depthTest: !1,
              fragmentShader:
                "#ifdef FRAMEBUFFER_PRECISION_HIGH\nuniform mediump sampler2D inputBuffer;\n#else\nuniform lowp sampler2D inputBuffer;\n#endif\nvarying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;\n#include <colorspace_fragment>\n}",
              vertexShader:
                "uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",
            }),
              this.setTexelSize(e.x, e.y),
              (this.kernelSize = B.MEDIUM);
          }
          set inputBuffer(e) {
            this.uniforms.inputBuffer.value = e;
          }
          setInputBuffer(e) {
            this.inputBuffer = e;
          }
          get kernelSequence() {
            return T[this.kernelSize];
          }
          get scale() {
            return this.uniforms.scale.value;
          }
          set scale(e) {
            this.uniforms.scale.value = e;
          }
          getScale() {
            return this.uniforms.scale.value;
          }
          setScale(e) {
            this.uniforms.scale.value = e;
          }
          getKernel() {
            return null;
          }
          get kernel() {
            return this.uniforms.kernel.value;
          }
          set kernel(e) {
            this.uniforms.kernel.value = e;
          }
          setKernel(e) {
            this.kernel = e;
          }
          setTexelSize(e, t) {
            this.uniforms.texelSize.value.set(e, t, 0.5 * e, 0.5 * t);
          }
          setSize(e, t) {
            let i = 1 / e,
              r = 1 / t;
            this.uniforms.texelSize.value.set(i, r, 0.5 * i, 0.5 * r);
          }
        },
        A = class extends r.BKk {
          constructor(e = !1, t = null) {
            super({
              name: "LuminanceMaterial",
              defines: { THREE_REVISION: r.sPf.replace(/\D+/g, "") },
              uniforms: {
                inputBuffer: new r.nc$(null),
                threshold: new r.nc$(0),
                smoothing: new r.nc$(1),
                range: new r.nc$(null),
              },
              blending: r.XIg,
              toneMapped: !1,
              depthWrite: !1,
              depthTest: !1,
              fragmentShader:
                "#include <common>\n#ifdef FRAMEBUFFER_PRECISION_HIGH\nuniform mediump sampler2D inputBuffer;\n#else\nuniform lowp sampler2D inputBuffer;\n#endif\n#ifdef RANGE\nuniform vec2 range;\n#elif defined(THRESHOLD)\nuniform float threshold;uniform float smoothing;\n#endif\nvarying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);float l=luminance(texel.rgb);\n#ifdef RANGE\nfloat low=step(range.x,l);float high=step(l,range.y);l*=low*high;\n#elif defined(THRESHOLD)\nl=smoothstep(threshold,threshold+smoothing,l)*l;\n#endif\n#ifdef COLOR\ngl_FragColor=vec4(texel.rgb*clamp(l,0.0,1.0),l);\n#else\ngl_FragColor=vec4(l);\n#endif\n}",
              vertexShader: o,
            }),
              (this.colorOutput = e),
              (this.luminanceRange = t);
          }
          set inputBuffer(e) {
            this.uniforms.inputBuffer.value = e;
          }
          setInputBuffer(e) {
            this.uniforms.inputBuffer.value = e;
          }
          get threshold() {
            return this.uniforms.threshold.value;
          }
          set threshold(e) {
            this.smoothing > 0 || e > 0
              ? (this.defines.THRESHOLD = "1")
              : delete this.defines.THRESHOLD,
              (this.uniforms.threshold.value = e);
          }
          getThreshold() {
            return this.threshold;
          }
          setThreshold(e) {
            this.threshold = e;
          }
          get smoothing() {
            return this.uniforms.smoothing.value;
          }
          set smoothing(e) {
            this.threshold > 0 || e > 0
              ? (this.defines.THRESHOLD = "1")
              : delete this.defines.THRESHOLD,
              (this.uniforms.smoothing.value = e);
          }
          getSmoothingFactor() {
            return this.smoothing;
          }
          setSmoothingFactor(e) {
            this.smoothing = e;
          }
          get useThreshold() {
            return this.threshold > 0 || this.smoothing > 0;
          }
          set useThreshold(e) {}
          get colorOutput() {
            return void 0 !== this.defines.COLOR;
          }
          set colorOutput(e) {
            e ? (this.defines.COLOR = "1") : delete this.defines.COLOR,
              (this.needsUpdate = !0);
          }
          isColorOutputEnabled(e) {
            return this.colorOutput;
          }
          setColorOutputEnabled(e) {
            this.colorOutput = e;
          }
          get useRange() {
            return null !== this.luminanceRange;
          }
          set useRange(e) {
            this.luminanceRange = null;
          }
          get luminanceRange() {
            return this.uniforms.range.value;
          }
          set luminanceRange(e) {
            null !== e ? (this.defines.RANGE = "1") : delete this.defines.RANGE,
              (this.uniforms.range.value = e),
              (this.needsUpdate = !0);
          }
          getLuminanceRange() {
            return this.luminanceRange;
          }
          setLuminanceRange(e) {
            this.luminanceRange = e;
          }
        },
        z = class extends r.BKk {
          constructor() {
            super({
              name: "DownsamplingMaterial",
              uniforms: {
                inputBuffer: new r.nc$(null),
                texelSize: new r.nc$(new r.I9Y()),
              },
              blending: r.XIg,
              toneMapped: !1,
              depthWrite: !1,
              depthTest: !1,
              fragmentShader:
                "#ifdef FRAMEBUFFER_PRECISION_HIGH\nuniform mediump sampler2D inputBuffer;\n#else\nuniform lowp sampler2D inputBuffer;\n#endif\n#define WEIGHT_INNER 0.125\n#define WEIGHT_OUTER 0.0555555\nvarying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;\n#include <colorspace_fragment>\n}",
              vertexShader:
                "uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",
            });
          }
          set inputBuffer(e) {
            this.uniforms.inputBuffer.value = e;
          }
          setSize(e, t) {
            this.uniforms.texelSize.value.set(1 / e, 1 / t);
          }
        },
        R = class extends r.BKk {
          constructor() {
            super({
              name: "UpsamplingMaterial",
              uniforms: {
                inputBuffer: new r.nc$(null),
                supportBuffer: new r.nc$(null),
                texelSize: new r.nc$(new r.I9Y()),
                radius: new r.nc$(0.85),
              },
              blending: r.XIg,
              toneMapped: !1,
              depthWrite: !1,
              depthTest: !1,
              fragmentShader:
                "#ifdef FRAMEBUFFER_PRECISION_HIGH\nuniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;\n#else\nuniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;\n#endif\nuniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);\n#include <colorspace_fragment>\n}",
              vertexShader:
                "uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",
            });
          }
          set inputBuffer(e) {
            this.uniforms.inputBuffer.value = e;
          }
          set supportBuffer(e) {
            this.uniforms.supportBuffer.value = e;
          }
          get radius() {
            return this.uniforms.radius.value;
          }
          set radius(e) {
            this.uniforms.radius.value = e;
          }
          setSize(e, t) {
            this.uniforms.texelSize.value.set(1 / e, 1 / t);
          }
        };
      r.Qev, r.BKk;
      r.BKk, r.BKk, r.GYF;
      var E =
        (r.BKk,
        r.BKk,
        class extends a {
          constructor(e, t, i = null) {
            super("RenderPass", e, t),
              (this.needsSwap = !1),
              (this.clearPass = new v()),
              (this.overrideMaterialManager = null === i ? null : new g(i)),
              (this.ignoreBackground = !1),
              (this.skipShadowMapUpdate = !1),
              (this.selection = null);
          }
          set mainScene(e) {
            this.scene = e;
          }
          set mainCamera(e) {
            this.camera = e;
          }
          get renderToScreen() {
            return super.renderToScreen;
          }
          set renderToScreen(e) {
            (super.renderToScreen = e), (this.clearPass.renderToScreen = e);
          }
          get overrideMaterial() {
            let e = this.overrideMaterialManager;
            return null !== e ? e.material : null;
          }
          set overrideMaterial(e) {
            let t = this.overrideMaterialManager;
            null !== e
              ? null !== t
                ? t.setMaterial(e)
                : (this.overrideMaterialManager = new g(e))
              : null !== t &&
                (t.dispose(), (this.overrideMaterialManager = null));
          }
          getOverrideMaterial() {
            return this.overrideMaterial;
          }
          setOverrideMaterial(e) {
            this.overrideMaterial = e;
          }
          get clear() {
            return this.clearPass.enabled;
          }
          set clear(e) {
            this.clearPass.enabled = e;
          }
          getSelection() {
            return this.selection;
          }
          setSelection(e) {
            this.selection = e;
          }
          isBackgroundDisabled() {
            return this.ignoreBackground;
          }
          setBackgroundDisabled(e) {
            this.ignoreBackground = e;
          }
          isShadowMapDisabled() {
            return this.skipShadowMapUpdate;
          }
          setShadowMapDisabled(e) {
            this.skipShadowMapUpdate = e;
          }
          getClearPass() {
            return this.clearPass;
          }
          render(e, t, i, r, n) {
            let s = this.scene,
              a = this.camera,
              l = this.selection,
              o = a.layers.mask,
              c = s.background,
              u = e.shadowMap.autoUpdate,
              h = this.renderToScreen ? null : t;
            null !== l && a.layers.set(l.getLayer()),
              this.skipShadowMapUpdate && (e.shadowMap.autoUpdate = !1),
              (this.ignoreBackground ||
                null !== this.clearPass.overrideClearColor) &&
                (s.background = null),
              this.clearPass.enabled && this.clearPass.render(e, t),
              e.setRenderTarget(h),
              null !== this.overrideMaterialManager
                ? this.overrideMaterialManager.render(e, s, a)
                : e.render(s, a),
              (a.layers.mask = o),
              (s.background = c),
              (e.shadowMap.autoUpdate = u);
          }
        });
      function F(e, t, i) {
        let r = document.createElement("canvas"),
          n = r.getContext("2d");
        if (((r.width = e), (r.height = t), i instanceof Image))
          n.drawImage(i, 0, 0);
        else {
          let r = n.createImageData(e, t);
          r.data.set(i), n.putImageData(r, 0, 0);
        }
        return r;
      }
      var D = (r.dYF, { FULL: 0 }),
        M =
          (r.BKk,
          r.BKk,
          r.BKk,
          r.BKk,
          r.BKk,
          r.BKk,
          r.BKk,
          r.BKk,
          r.BKk,
          r.BKk,
          r.BKk,
          r.sPf.replace(/\D+/g, ""),
          255 / 256);
      new Float32Array([
        255 / 256 / 0x1000000,
        255 / 256 / 65536,
        255 / 256 / 256,
        255 / 256,
      ]),
        new Float32Array([M, M / 256, M / 65536, 1 / 0x1000000]),
        new Float32Array(3),
        new Float32Array(3),
        new Float32Array(3),
        new Float32Array(3),
        new Float32Array(3),
        new Float32Array(3),
        new Float32Array([0, 0, 0]),
        new Float32Array([1, 0, 0]),
        new Float32Array([1, 1, 0]),
        new Float32Array([1, 1, 1]),
        new Float32Array([0, 0, 0]),
        new Float32Array([1, 0, 0]),
        new Float32Array([1, 0, 1]),
        new Float32Array([1, 1, 1]),
        new Float32Array([0, 0, 0]),
        new Float32Array([0, 0, 1]),
        new Float32Array([1, 0, 1]),
        new Float32Array([1, 1, 1]),
        new Float32Array([0, 0, 0]),
        new Float32Array([0, 1, 0]),
        new Float32Array([1, 1, 0]),
        new Float32Array([1, 1, 1]),
        new Float32Array([0, 0, 0]),
        new Float32Array([0, 1, 0]),
        new Float32Array([0, 1, 1]),
        new Float32Array([1, 1, 1]),
        new Float32Array([0, 0, 0]),
        new Float32Array([0, 0, 1]),
        new Float32Array([0, 1, 1]),
        new Float32Array([1, 1, 1]);
      var C = [new Float32Array(2), new Float32Array(2)],
        I =
          (new Float32Array([0, -0.25, 0.25, -0.125, 0.125, -0.375, 0.375]),
          new Float32Array([0, 0]),
          new Float32Array([0.25, -0.25]),
          new Float32Array([-0.25, 0.25]),
          new Float32Array([0.125, -0.125]),
          new Float32Array([-0.125, 0.125]),
          new Uint8Array([0, 0]),
          new Uint8Array([3, 0]),
          new Uint8Array([0, 3]),
          new Uint8Array([3, 3]),
          new Uint8Array([1, 0]),
          new Uint8Array([4, 0]),
          new Uint8Array([1, 3]),
          new Uint8Array([4, 3]),
          new Uint8Array([0, 1]),
          new Uint8Array([3, 1]),
          new Uint8Array([0, 4]),
          new Uint8Array([3, 4]),
          new Uint8Array([1, 1]),
          new Uint8Array([4, 1]),
          new Uint8Array([1, 4]),
          new Uint8Array([4, 4]),
          [
            new Uint8Array([0, 0]),
            new Uint8Array([1, 0]),
            new Uint8Array([0, 2]),
            new Uint8Array([1, 2]),
            new Uint8Array([2, 0]),
            new Uint8Array([3, 0]),
            new Uint8Array([2, 2]),
            new Uint8Array([3, 2]),
            new Uint8Array([0, 1]),
            new Uint8Array([1, 1]),
            new Uint8Array([0, 3]),
            new Uint8Array([1, 3]),
            new Uint8Array([2, 1]),
            new Uint8Array([3, 1]),
            new Uint8Array([2, 3]),
            new Uint8Array([3, 3]),
          ]);
      function L(e, t, i, r, n, s) {
        let a = 0;
        for (let l = 0; l < 30; ++l)
          for (let o = 0; o < 30; ++o)
            (function (e, t, i, r, n, s) {
              let a = e === i && t === r;
              return (
                a ||
                  (a =
                    (r - t) * (n - (e + i) / 2) + (e - i) * (s - (t + r) / 2) >
                    0),
                a
              );
            })(e, t, i, r, n + o / 29, s + l / 29) && ++a;
        return a / 900;
      }
      function H(e, t, i, r) {
        var n;
        return (n = e + (t - e) * 0.75) + (i + (r - i) * 0.75 - n) * 0.875;
      }
      H(0, 0, 0, 0),
        new Float32Array([0, 0, 0, 0]),
        H(0, 0, 0, 1),
        new Float32Array([0, 0, 0, 1]),
        H(0, 0, 1, 0),
        new Float32Array([0, 0, 1, 0]),
        H(0, 0, 1, 1),
        new Float32Array([0, 0, 1, 1]),
        H(0, 1, 0, 0),
        new Float32Array([0, 1, 0, 0]),
        H(0, 1, 0, 1),
        new Float32Array([0, 1, 0, 1]),
        H(0, 1, 1, 0),
        new Float32Array([0, 1, 1, 0]),
        H(0, 1, 1, 1),
        new Float32Array([0, 1, 1, 1]),
        H(1, 0, 0, 0),
        new Float32Array([1, 0, 0, 0]),
        H(1, 0, 0, 1),
        new Float32Array([1, 0, 0, 1]),
        H(1, 0, 1, 0),
        new Float32Array([1, 0, 1, 0]),
        H(1, 0, 1, 1),
        new Float32Array([1, 0, 1, 1]),
        H(1, 1, 0, 0),
        new Float32Array([1, 1, 0, 0]),
        H(1, 1, 0, 1),
        new Float32Array([1, 1, 0, 1]),
        H(1, 1, 1, 0),
        new Float32Array([1, 1, 1, 0]),
        H(1, 1, 1, 1),
        new Float32Array([1, 1, 1, 1]);
    },
  },
]);
