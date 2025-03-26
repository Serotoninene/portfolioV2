import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap, { Power3 } from "gsap";
import { useEffect, useMemo, useRef } from "react";

import * as THREE from "three";
import fragmentShader from "./shader/fragment.glsl";
import vertexShader from "./shader/vertex.glsl";

interface AnimatedCurvedText3DProps {
  color: string;
  children: string;
  position?: [number, number, number];
  size?: number;
  rotation?: [number, number, number];
  radius?: number;
}

export const AnimatedCurvedText3D = ({
  color = "fff",
  children = "",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = 1,
  radius = 3.14,
}: AnimatedCurvedText3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const tl = useRef<gsap.core.Timeline>(gsap.timeline());

  // Create uniforms as a single object
  const uniforms = useMemo(
    () => ({
      uFontSize: { value: size },
      uClipProgress: { value: 0 },
      uCharCount: { value: children.length / 2 },
      uColor: { value: new THREE.Color(color) },
    }),
    []
  );

  // Create shader material with proper uniforms structure
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
      }),
    [uniforms]
  );

  useEffect(() => {
    // Animate the progress uniform
    tl.current?.to(uniforms.uClipProgress, {
      value: 1,
      duration: 0.5,
      ease: Power3.easeOut,
      delay: 1,
    });
  }, [tl.current]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <Text
        ref={textRef}
        font="https://o1vj7bm9yy.ufs.sh/f/YS7X7tdqhV1FA7KxBhgER1qt6JFlP5UTNYh2kKHzviujeDwO"
        fontSize={size}
        position={[0, 0, -radius]} // Move the text away from the center
        anchorX="center"
        curveRadius={radius}
        anchorY="middle"
        material={material}
        fontWeight="900"
        onAfterRender={() => {
          if (textRef.current) textRef.current.material.side = THREE.DoubleSide;
        }}
      >
        {children}
      </Text>
    </group>
  );
};
