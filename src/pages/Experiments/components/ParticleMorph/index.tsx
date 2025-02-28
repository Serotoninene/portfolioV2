import { useEffect, useMemo, useRef } from "react";

import { OrbitControls, useFBO, useGLTF } from "@react-three/drei";
import { Canvas, createPortal, extend, useFrame } from "@react-three/fiber";

import * as THREE from "three";

import SimulationMaterial from "./SimulationMaterial";
import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";

extend({ SimulationMaterial: SimulationMaterial });
const ParticleMesh = () => {
  const size = 1024;

  const pointsRef = useRef<THREE.Points>(null);
  const simulationMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(
    -1,
    1,
    1,
    -1,
    1 / Math.pow(2, 53),
    1
  );
  const positions = new Float32Array([
    -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
  ]);
  const uvs = new Float32Array([
    0,
    0, // bottom-left
    1,
    0, // bottom-right
    1,
    1, // top-right
    0,
    0, // bottom-left
    1,
    1, // top-right
    0,
    1, // top-left
  ]);

  const { nodes } = useGLTF(
    "/assets/ThreeModels/Serotonine_Icon/reset_serotonine_icon.glb"
  );

  // const { nodes } = useGLTF(
  //   "/assets/ThreeModels/Serotonine_Icon/icon_remeshed_subdivided.glb"
  // );

  const uniforms = useMemo(
    () => ({
      uPositions: { value: null },
      uMouse: { value: new THREE.Vector2() },
    }),
    []
  );

  const particlesPosition = useMemo(() => {
    // FBO-compatible grid-based system
    const length = size * size; // Total particles
    const particles = new Float32Array(length * 3);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const index = i * size + j; // Calculate the linear index
        const i3 = index * 3;

        // Apply small offsets to distribute particles more evenly inside the shape
        particles[i3 + 0] = i / size;
        particles[i3 + 1] = j / size;
      }
    }

    return particles;
  }, [size]);

  const renderTarget = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  });

  useFrame((state) => {
    const { gl, clock, pointer, viewport } = state;

    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    const mouse = {
      x: pointer.y * viewport.height * 0.5, // Map -1 to 1 to world space
      y: pointer.x * viewport.width * 0.5,
    };

    if (materialRef.current) {
      materialRef.current.uniforms.uPositions.value = renderTarget.texture;
      materialRef.current.uniforms.uMouse.value = mouse;
    }

    if (simulationMaterialRef.current) {
      simulationMaterialRef.current.uniforms.uTime.value =
        clock.getElapsedTime();

      simulationMaterialRef.current.uniforms.uMouse.value = mouse;
    }
  });

  const atan = THREE.MathUtils.degToRad(-90);

  if (!particlesPosition)
    return (
      <mesh>
        <boxGeometry />
      </mesh>
    );

  return (
    <>
      {createPortal(
        <mesh>
          <simulationMaterial
            ref={simulationMaterialRef}
            args={[size, nodes]}
          />
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-uv"
              count={uvs.length / 2}
              array={uvs}
              itemSize={2}
            />
          </bufferGeometry>
        </mesh>,
        scene
      )}
      <points ref={pointsRef} rotation={[0, atan, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlesPosition, 3]}
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
    </>
  );
};

const Scene = () => {
  useEffect(() => {}, []);
  return (
    <>
      <ParticleMesh />
      <OrbitControls />
      <ambientLight intensity={1000} />
    </>
  );
};

export const ParticleMorph = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[--fullScreen]">
        <Canvas camera={{ position: new THREE.Vector3(0, 0, -5) }}>
          <Scene />
        </Canvas>
      </div>
    </>
  );
};
