import { useEffect, useMemo, useRef } from "react";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import * as THREE from "three";

// Shaders
import fragmentShader from "./shaders/fragment.glsl";
import fragmentShaderDensity from "./shaders/fragmentShaderDensity.glsl";
import fragmentShaderPosition from "./shaders/fragmentShaderPosition.glsl";
import fragmentShaderVelocity from "./shaders/fragmentShaderVelocity.glsl";
import vertexShader from "./shaders/vertex.glsl";

import { useGSAP } from "@gsap/react";
import gsap, { Power3 } from "gsap";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";

const SIZE = 512;
const LENGTH = SIZE * SIZE;

const fillPositionTexture = (gpuCompute, model) => {
  const positionTexture = gpuCompute.createTexture();
  const positionData = positionTexture.image.data;

  // SERoto icon
  const data = model.Plane || null;
  // Hand
  // const data = model.Object_4 || null;
  // ADN
  // const data = model.DNA || null;

  if (!data) return data;

  const geometry = data.geometry;
  const originalPosition = geometry.attributes.position.array;
  const vertexCount = geometry.attributes.position.count; // Total number of vertices

  // Rotation Matrix (90 degrees around Z-axis)
  const rotationMatrix = new THREE.Matrix4().makeRotationY(Math.PI / 2);

  for (let i = 0; i < LENGTH; i++) {
    let i4 = i * 4;

    // Ensure we don't go out of bounds
    const index = i < vertexCount ? i : Math.floor(Math.random() * vertexCount);

    // Original vertex position
    const vertex = new THREE.Vector3(
      originalPosition[index * 3], // x
      originalPosition[index * 3 + 1], // y
      originalPosition[index * 3 + 2] // z
    );

    // Apply rotation
    vertex.applyMatrix4(rotationMatrix);

    const noiseStrength = 0.1; // Adjust strength based on gaps

    vertex.x += (Math.random() - 0.5) * noiseStrength;
    vertex.y += (Math.random() - 0.5) * noiseStrength;
    // vertex.z += noise;

    // Store rotated position
    positionData[i4] = vertex.x;
    positionData[i4 + 1] = vertex.y;
    positionData[i4 + 2] = 0;
    positionData[i4 + 3] = 1; // w component for homogeneous coordinates
  }

  return positionTexture;
};

const ParticleMesh = () => {
  const pointsRef = useRef(null);
  const materialRef = useRef(null);
  const { nodes } = useGLTF(
    "/assets/ThreeModels/Serotonine_Icon/icon_remeshed_subdivided.glb"
  );
  // const { nodes } = useGLTF(
  //   "https://5f6x5qowvd.ufs.sh/f/skRwIEbJ4UkGEld38l0QWy37Bbrxkg1OpSnGeljiUFKDvahc"
  // );

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
      uIntroProgress: { value: 0 },
      uTexturePosition: { value: null },
    }),
    []
  );

  // const positionControls = useControls("intro", {
  //   uIntroProgress: {
  //     value: 0.0,
  //     min: 0,
  //     max: 1,
  //     step: 0.01,
  //     onChange: (e) => {
  //       positionUniforms.uIntroProgress.value = e;
  //     },
  //   },
  // });

  // // Leva GUI controls
  // const controls = useControls("Physics", {
  //   uVortexStrength: {
  //     value: 0.7,
  //     min: 0,
  //     max: 2,
  //     step: 0.01,
  //     onChange: (e) => {
  //       velocityUniforms.uVortexStrength.value = e;
  //     },
  //   },
  //   uVortexMultiplicator: {
  //     value: 1.02,
  //     min: 0.01,
  //     max: 20,
  //     step: 0.01,
  //     onChange: (e) => {
  //       velocityUniforms.uVortexMultiplicator.value = e;
  //     },
  //   },
  //   uTurbulenceStrength: {
  //     value: 0.8,
  //     min: 0,
  //     max: 1,
  //     step: 0.01,
  //     onChange: (e) => {
  //       velocityUniforms.uTurbulenceStrength.value = e;
  //     },
  //   },
  //   uVelocityStrength: {
  //     value: 19,
  //     min: 1,
  //     max: 50,
  //     step: 1,
  //     onChange: (e) => {
  //       velocityUniforms.uVelocityStrength.value = e;
  //     },
  //   },
  //   uVelocityReduce: {
  //     value: 0.64,
  //     min: 0.5,
  //     max: 1,
  //     step: 0.01,
  //     onChange: (e) => {
  //       velocityUniforms.uVelocityReduce.value = e;
  //     },
  //   },
  // });

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
        <Canvas camera={{ position: new THREE.Vector3(0, 0, 5) }}>
          <Scene />
        </Canvas>
      </div>
    </>
  );
};
