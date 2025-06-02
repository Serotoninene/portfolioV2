import { useMemo } from "react";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

import { photos } from "../../experimentsData";

// Shaders
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

function Scene() {
  const texture = useLoader(THREE.TextureLoader, photos[1]);

  const controls = useControls({
    rotateY: {
      value: 0,
      step: 0.01,
      min: 0,
      max: 4,
    },
  });

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
    }),
    []
  );
  return (
    <>
      <mesh scale={7} rotation={[0, Math.PI / 2, 0]}>
        <sphereGeometry />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

export function SphereCarrousel() {
  return (
    <div className="h-full">
      <Canvas>
        <OrbitControls />
        <Scene />
        <color attach="background" args={[new THREE.Color("#030303")]} />
      </Canvas>
    </div>
  );
}
