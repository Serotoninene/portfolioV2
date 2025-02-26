import { useEffect, useMemo, useRef } from "react";

import { extend, Canvas, useFrame, createPortal } from "@react-three/fiber";
import { OrbitControls, useFBO, useGLTF } from "@react-three/drei";

import * as THREE from "three";

import SimulationMaterial from "./SimulationMaterial";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { useTouchTexture } from "../../../../components/three/TouchTexture";

extend({ SimulationMaterial: SimulationMaterial });

const ParticleMesh = () => {
  const size = 1024;
  const touchTexture = useTouchTexture({
    isOnScreen: true,
    maxAge: 30,
    radius: 0.1,
  });

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
    "/assets/ThreeModels/Serotonine_Icon/icon_remeshed_subdivided.glb"
  );

  const uniforms = useMemo(
    () => ({
      uPositions: { value: null },
    }),
    []
  );

  const particlesPosition = useMemo(() => {
    if (!nodes?.Plane) return null;

    // Get original model positions
    const originalPosition = nodes.Plane.geometry.attributes.position.array;
    const originalCount = originalPosition.length / 3;

    // FBO-compatible grid-based system
    const length = size * size; // Total particles
    const particles = new Float32Array(length * 3);

    for (let i = 0; i < length; i++) {
      const i3 = i * 3;

      // Pick a random point from the original model
      const originalIndex = (i % originalCount) * 3;
      const ox = originalPosition[originalIndex];
      const oy = originalPosition[originalIndex + 1];
      const oz = originalPosition[originalIndex + 2];

      // Apply small offsets to distribute particles more evenly inside the shape
      particles[i3 + 0] = ox + (Math.random() - 0.5) * 0.02; // Small jitter
      particles[i3 + 1] = oy + (Math.random() - 0.5) * 0.02;
      particles[i3 + 2] = oz + (Math.random() - 0.5) * 0.02;
    }

    return particles;
  }, [nodes, size]);

  const renderTarget = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    // samples: 2,
    stencilBuffer: false,
    type: THREE.FloatType,
  });

  useFrame((state) => {
    const { gl, clock, pointer } = state;

    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    if (materialRef.current) {
      materialRef.current.uniforms.uPositions.value = renderTarget.texture;
    }

    if (!touchTexture) return;
    touchTexture.update(pointer);
    if (simulationMaterialRef.current) {
      simulationMaterialRef.current.uniforms.uTime.value =
        clock.getElapsedTime();
      simulationMaterialRef.current.uniforms.uMouse.value =
        touchTexture.texture;
      simulationMaterialRef.current.uniforms.uMousePosition.value = pointer;
    }
  });

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
      <points ref={pointsRef} rotation={[0, 45, 0]}>
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
        <Canvas>
          <Scene />
        </Canvas>
      </div>
    </>
  );
};
