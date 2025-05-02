import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { useWindowSize } from "../../../hooks";
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";

export const Noise = () => {
  const shader = useRef<THREE.ShaderMaterial>(null);
  const { width, height } = useWindowSize();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!shader.current) return;
    shader.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  if (!width || !height) return null;
  return (
    <mesh scale={[1, 1, 1]} position={[0, 0, -800]}>
      <planeGeometry args={[width * 3, height * 3]} />
      <shaderMaterial
        ref={shader}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent={true}
        blending={THREE.CustomBlending}
        // blendEquation={THREE.AddEquation}
      />
    </mesh>
  );
};
