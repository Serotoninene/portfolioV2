import { useEffect, useMemo, useRef } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

import * as THREE from "three";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

const ParticleMesh = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { nodes } = useGLTF(
    "/assets/ThreeModels/Serotonine_Icon/untitled2.glb"
  );

  const count = 2000;

  const uniforms = useMemo(() => ({}), []);

  const particlesPosition = useMemo(() => {
    if (!nodes) return null;
    const originalPosition = nodes.Plane.geometry.attributes.position.array;
    return originalPosition;
  }, [nodes]);

  if (!particlesPosition)
    return (
      <mesh>
        <boxGeometry />
      </mesh>
    );

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </points>
  );
};

{
}

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
