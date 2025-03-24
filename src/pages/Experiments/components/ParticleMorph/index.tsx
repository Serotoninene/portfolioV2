import { useEffect, useMemo, useRef } from "react";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import * as THREE from "three";

// Shaders
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import fragmentShaderPosition from "./shaders/fragmentShaderPosition.glsl";
import fragmentShaderVelocity from "./shaders/fragmentShaderVelocity.glsl";
import fragmentShaderDensity from "./shaders/fragmentShaderDensity.glsl";

import { useControls } from "leva";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";

const SIZE = 1024;
const LENGTH = SIZE * SIZE;

const fillPositionTexture = (gpuCompute, model) => {
  const positionTexture = gpuCompute.createTexture();
  const positionData = positionTexture.image.data;

  if (!model?.Plane) return data;

  const geometry = model.Plane.geometry;
  const originalPosition = geometry.attributes.position.array;
  // Rotation Matrix (90 degrees around Z-axis)
  const rotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI / 2);

  for (let i = 0; i < LENGTH; i++) {
    let i4 = i * 4;

    // Original vertex position
    const vertex = new THREE.Vector3(
      originalPosition[i * 3], // x
      originalPosition[i * 3 + 1], // y
      originalPosition[i * 3 + 2] // z
    );

    // Apply rotation
    vertex.applyMatrix4(rotationMatrix);

    // Store rotated position
    positionData[i4] = vertex.x + (Math.random() - 0.5) * 0.05;
    positionData[i4 + 1] = vertex.y + (Math.random() - 0.5) * 0.05;
    positionData[i4 + 2] = 0;
    positionData[i4 + 3] = 1; // w component for homogeneous coordinates
  }

  return positionTexture;
};

const ParticleMesh = () => {
  const pointsRef = useRef(null);
  const materialRef = useRef(null);
  const { nodes } = useGLTF(
    "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGEld38l0QWy37Bbrxkg1OpSnGeljiUFKDvahc"
  );

  // --------- HANDLING THE OG PARTICLES POSITION AND UVS ---------
  const particlesPosition = useMemo(() => {
    const particles = new Float32Array(LENGTH * 3);
    for (let i = 0; i < LENGTH; i++) {
      let i3 = i * 3;
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

  const positionVariable = useRef(null);
  const velocityVariable = useRef(null);
  const densityVariable = useRef(null);

  const positionUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDelta: { value: 0 },
      uTexturePosition: { value: null },
    }),
    []
  );

  // Leva GUI controls
  const controls = useControls(
    "Physics",
    {
      uVortexStrength: {
        value: 0.85,
        min: 0,
        max: 2,
        step: 0.01,
        onChange: (e) => {
          velocityUniforms.uVortexStrength.value = e;
        },
      },
      uVortexMultiplicator: {
        value: 0.25,
        min: 0.01,
        max: 20,
        step: 0.01,
        onChange: (e) => {
          velocityUniforms.uVortexMultiplicator.value = e;
        },
      },
      uTurbulenceStrength: {
        value: 0.2,
        min: 0,
        max: 1,
        step: 0.01,
        onChange: (e) => {
          velocityUniforms.uTurbulenceStrength.value = e;
        },
      },
      uVelocityStrength: {
        value: 5,
        min: 1,
        max: 50,
        step: 1,
        onChange: (e) => {
          velocityUniforms.uVelocityStrength.value = e;
        },
      },
      uVelocityReduce: {
        value: 0.85,
        min: 0.5,
        max: 1,
        step: 0.01,
        onChange: (e) => {
          velocityUniforms.uVelocityReduce.value = e;
        },
      },
    },
    { hidden: true }
  );

  const velocityUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDelta: { value: 0 },
      uMouse: { value: new THREE.Vector2(-1) },

      // Vortex Uniforms
      uVortexStrength: { value: 0.85 },
      uVortexMultiplicator: { value: 0.25 },

      // Turbulence
      uTurbulenceStrength: { value: 0.2 },

      // Velocity
      uVelocityStrength: { value: 4 },
      uVelocityReduce: { value: 0.85 },
    }),
    []
  );

  useEffect(() => {
    if (!gl) return;

    const positionTexture = fillPositionTexture(gpuCompute, nodes);
    const velocityTexture = gpuCompute.createTexture();
    const densityTexture = gpuCompute.createTexture();

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

    densityVariable.current = gpuCompute.addVariable(
      "uTextureDensity",
      fragmentShaderDensity,
      densityTexture
    );

    gpuCompute.setVariableDependencies(velocityVariable.current, [
      positionVariable.current,
      velocityVariable.current,
      densityVariable.current,
    ]);

    gpuCompute.setVariableDependencies(positionVariable.current, [
      positionVariable.current,
      velocityVariable.current,
      densityVariable.current,
    ]);

    gpuCompute.setVariableDependencies(densityVariable.current, [
      positionVariable.current,
      densityVariable.current,
    ]);

    positionVariable.current.material.uniforms = positionUniforms;
    velocityVariable.current.material.uniforms = velocityUniforms;

    velocityVariable.current.material.uniforms.uOriginalPosition = {
      value: positionTexture,
    };
    densityVariable.current.material.uniforms.uOriginalPosition = {
      value: positionTexture,
    };

    const error = gpuCompute.init();

    if (error) {
      console.error("❌ GPU Compute init error:", error);
    }
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

    materialRef.current.uniforms.uDensityTexture.value =
      gpuCompute.getCurrentRenderTarget(densityVariable.current).texture;

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
      {/* <ambientLight intensity={1000} /> */}
    </>
  );
};

export const ParticleMorph = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[--fullScreen]">
        <Canvas camera={{ position: new THREE.Vector3(0, 0, 8) }}>
          <Scene />
        </Canvas>
      </div>
    </>
  );
};
