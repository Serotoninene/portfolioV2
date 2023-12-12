import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { useWindowSize } from "../../../hooks";

import { useControls } from "leva";

export const ShaderGradient = () => {
  const { width, height } = useWindowSize();

  const { uScale, uSpeed, uNoiseStrength } = useControls({
    uScale: { value: 1.5, min: 0, max: 10 },
    uSpeed: { value: 0.5, min: 0, max: 1, step: 0.01 },
    uNoiseStrength: { value: 0.2, min: 0, max: 1, step: 0.01 },
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScale: { value: uScale },
      uSpeed: { value: uSpeed },
      uNoiseStrength: { value: uNoiseStrength },
    }),
    []
  );

  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  // Okay so I don't really know what to do,
  // I have no internet and no real direction for my portfolio

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (!shaderRef.current) return;
    shaderRef.current.uniforms.uTime.value = elapsedTime;
    shaderRef.current.uniforms.uScale.value = uScale;
    shaderRef.current.uniforms.uSpeed.value = uSpeed;
    shaderRef.current.uniforms.uNoiseStrength.value = uNoiseStrength;
  });

  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};
