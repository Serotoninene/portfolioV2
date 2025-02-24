import { RefObject, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

import gsap, { Power3 } from "gsap";
import * as THREE from "three";

import fragmentShader from "./shader/fragment.glsl";
import vertexShader from "./shader/vertex.glsl";

interface PhotoProps {
  idx: number;
  x: number;
  y: number;
  width: number;
  height: number;
  momentum: RefObject<number>;
  url: string;
}

export const Photo = ({
  idx,
  x,
  y,
  width,
  height,
  momentum,
  url,
}: PhotoProps) => {
  const mesh = useRef<THREE.Mesh>(null);
  const shader = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(url);
  const tl = useRef<gsap.core.Timeline>(
    gsap.timeline({ delay: 2, ease: Power3.easeInOut })
  );
  const uniforms = useMemo(
    () => ({
      uMomentum: { value: 0 },
      uOffset: { value: 1 },
      uTexture: { value: texture },
      uTextureSize: {
        value: new THREE.Vector2(texture.image.width, texture.image.height),
      },
      uQuadSize: {
        value: new THREE.Vector2(width, height),
      },
    }),
    []
  );

  useEffect(() => {
    if (!mesh.current || !shader.current) return;

    tl.current.to(shader.current.uniforms.uOffset, {
      value: 0,
      ease: Power3.easeOut,
    });
    tl.current.to(mesh.current.position, { x, y, delay: idx * 0.003 });
  }, []);

  useFrame(() => {
    if (!shader.current?.uniforms) return;
    shader.current.uniforms.uMomentum.value = momentum.current;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={[1, 1, 1]}>
      <planeGeometry args={[width, height, 32, 32]} />
      <shaderMaterial
        ref={shader}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};
