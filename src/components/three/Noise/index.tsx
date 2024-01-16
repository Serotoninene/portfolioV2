import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { useWindowSize } from "../../../hooks";
import TouchTexture from "../TouchTexture";
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";

export const Noise = () => {
  const shader = useRef<THREE.ShaderMaterial>(null);
  const { width, height } = useWindowSize();
  const touchTexture = useMemo(() => new TouchTexture(), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTouchTexture: { value: touchTexture.texture },
    }),
    []
  );

  const handleMouseMoveWithEventListener = (e: MouseEvent) => {
    const mappedX = THREE.MathUtils.mapLinear(
      e.clientX,
      0,
      window.innerWidth,
      0,
      1
    );
    const mappedY = THREE.MathUtils.mapLinear(
      e.clientY,
      0,
      window.innerHeight,
      1,
      0
    );

    touchTexture.addTouch(new THREE.Vector2(mappedX, mappedY));
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMoveWithEventListener);
    return () => {
      window.removeEventListener("mousemove", handleMouseMoveWithEventListener);
    };
  }, []);

  useFrame(({ clock }) => {
    if (!shader.current) return;
    shader.current.uniforms.uTime.value = clock.getElapsedTime();

    if (!touchTexture) return;
    touchTexture.update();
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
