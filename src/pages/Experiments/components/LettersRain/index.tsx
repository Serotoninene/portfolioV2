import { useEffect, useMemo, useRef } from "react";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import * as THREE from "three";

// Shaders
import fragmentShader from "./shaders/fragment.glsl";
import fragmentShaderPosition from "./shaders/fragmentShaderPosition.glsl";
import fragmentShaderVelocity from "./shaders/fragmentShaderVelocity.glsl";
import vertexShader from "./shaders/vertex.glsl";

import { useGSAP } from "@gsap/react";
import gsap, { Power3 } from "gsap";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";

const SIZE = 256;
const LENGTH = SIZE * SIZE;

const fillPositionTexture = (gpuCompute, viewport) => {
  const positionTexture = gpuCompute.createTexture();
  const positionData = positionTexture.image.data;

  for (let i = 0; i < LENGTH; i++) {
    const i4 = i * 4;

    // Store rotated position
    positionData[i4] =
      ((i % SIZE) / SIZE) * viewport.width * 1.2 - viewport.width / 2;
    positionData[i4 + 1] =
      (i / SIZE / SIZE) * viewport.height - viewport.height / 2;
    positionData[i4 + 2] = 0;
    positionData[i4 + 3] = 1; // w component for homogeneous coordinates
  }

  return positionTexture;
};

const ParticleMesh = () => {
  const pointsRef = useRef(null);
  const materialRef = useRef(null);

  const { viewport } = useThree();

  // --------- HANDLING THE OG PARTICLES POSITION AND UVS ---------
  const particlesPosition = useMemo(() => {
    const particles = new Float32Array(LENGTH * 3);
    for (let i = 0; i < LENGTH; i++) {
      const i3 = i * 3;
      particles[i3 + 0] = (i % SIZE) / SIZE - 0.5;
      particles[i3 + 1] = i / SIZE / SIZE - 0.5;
      particles[i3 + 2] = 0;
    }
    return particles;
  }, [SIZE]);

  const particlesReference = useMemo(() => {
    const references = new Float32Array(LENGTH * 2);
    for (let i = 0; i < LENGTH; i++) {
      references[i * 2] = (i % SIZE) / SIZE;
      references[i * 2 + 1] = Math.floor(i / SIZE) / SIZE;
    }

    return references;
  }, [SIZE]);

  const uniforms = useMemo(
    () => ({
      uMouse: { value: new THREE.Vector2() },
      uPositionTexture: { value: null },
      uDensityTexture: { value: null },
    }),
    []
  );

  // --------- SETTING UP THE FBO ---------
  const { gl } = useThree();

  const gpuCompute = useMemo(
    () => new GPUComputationRenderer(SIZE, SIZE, gl),
    [gl]
  );

  const positionVariable = useRef();
  const velocityVariable = useRef();

  const positionUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDelta: { value: 0 },
      uIntroProgress: { value: 0 },
      uTexturePosition: { value: null },
    }),
    []
  );

  const velocityUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDelta: { value: 0 },
      uMouse: { value: new THREE.Vector2(-1) },

      // Vortex Uniforms
      uVortexStrength: { value: 0.7 },
      uVortexMultiplicator: { value: 1.02 },

      // Turbulence
      uTurbulenceStrength: { value: 0.82 },

      // Velocity
      uVelocityStrength: { value: 19 },
      uVelocityReduce: { value: 0.64 },
    }),
    []
  );

  useEffect(() => {
    if (!gl) return;

    const positionTexture = fillPositionTexture(gpuCompute, viewport);
    const velocityTexture = gpuCompute.createTexture();

    velocityVariable.current = gpuCompute.addVariable(
      "uTextureVelocity",
      fragmentShaderVelocity,
      velocityTexture
    );

    positionVariable.current = gpuCompute.addVariable(
      "uTexturePosition",
      fragmentShaderPosition,
      positionTexture
    );

    gpuCompute.setVariableDependencies(velocityVariable.current, [
      positionVariable.current,
      velocityVariable.current,
    ]);

    gpuCompute.setVariableDependencies(positionVariable.current, [
      positionVariable.current,
      velocityVariable.current,
    ]);

    positionVariable.current.material.uniforms = positionUniforms;
    velocityVariable.current.material.uniforms = velocityUniforms;

    velocityVariable.current.material.uniforms.uOriginalPosition = {
      value: positionTexture,
    };

    const error = gpuCompute.init();

    if (error) {
      console.error("❌ GPU Compute init error:", error);
    }
  }, []);

  useGSAP(() => {
    gsap.to(positionUniforms.uIntroProgress, {
      value: 1,
      duration: 2,
      ease: Power3.easeOut,
    });
  }, []);

  useFrame((state, delta) => {
    if (!gpuCompute || !positionVariable.current) return;

    const { clock, pointer, viewport } = state;

    positionUniforms.uTime.value = clock.getElapsedTime();
    positionUniforms.uDelta.value = delta;
    velocityUniforms.uTime.value = clock.getElapsedTime();
    velocityUniforms.uDelta.value = delta;

    const mouse = {
      x: pointer.x * viewport.width * 0.5, // Map -1 to 1 to world space
      y: pointer.y * viewport.height * 0.5,
    };

    if (!materialRef.current) return;
    velocityUniforms.uMouse.value = mouse;

    gpuCompute.compute();

    materialRef.current.uniforms.uPositionTexture.value =
      gpuCompute.getCurrentRenderTarget(positionVariable.current).texture;

    materialRef.current.uniforms.uMouse.value = mouse;
  });

  return (
    <points ref={pointsRef} rotation={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
        <bufferAttribute
          attach="attributes-reference"
          args={[particlesReference, 2]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </points>
  );
};

const Scene = () => {
  useEffect(() => {}, []);
  return (
    <>
      <ParticleMesh />
      <OrbitControls />
    </>
  );
};

export const LettersRain = () => {
  return (
    <>
      <div className="h-[--fullScreen]">
        <Canvas camera={{ position: new THREE.Vector3(0, 0, 5) }}>
          <Scene />
        </Canvas>
      </div>
    </>
  );
};
