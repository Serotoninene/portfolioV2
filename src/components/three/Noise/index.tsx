import { useEffect, useMemo, useRef } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useWindowSize } from "../../../hooks";
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
import TouchTexture from "../TouchTexture";

export const Noise = () => {
  const shader = useRef<THREE.ShaderMaterial>(null);
  const { width, height } = useWindowSize();
  const touchTexture = useMemo(() => new TouchTexture(true), []);

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

  const handleMouseMoveWithPointer = ({ pointer }: ThreeEvent<MouseEvent>) => {
    const mappedX = (pointer.x + 1) / 2;
    const mappedY = THREE.MathUtils.mapLinear(pointer.y, -1, 1, 0, 1);

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
    <mesh scale={[1, 1, 1]} position={[0, 0, 100]}>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        ref={shader}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent={true}
        // blending={THREE.MultiplyBlending}
      />
    </mesh>
  );
};