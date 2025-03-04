import { Text } from "@react-three/drei";
import gsap, { Power3 } from "gsap";
import { useEffect, useMemo, useRef } from "react";

import * as THREE from "three";
import fragmentShader from "./shader/fragment.glsl";
import vertexShader from "./shader/vertex.glsl";

interface AnimatedText3DProps {
  color: string;
  children: string;
  position?: [number, number, number];
  size?: number;
}

export const AnimatedText3D = ({
  color = "fff",
  children = "",
  position = [0, 0, 0],
  size = 1,
}: AnimatedText3DProps) => {
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
        depthWrite: true,
      }),
    [uniforms]
  );

  useEffect(() => {
    // Animate the progress uniform
    tl.current?.to(uniforms.uClipProgress, {
      value: 1,
      duration: 0.5,
      ease: Power3.easeOut,
      delay: 2.5,
    });
  }, [tl.current]);

  // If the color of the text change (in case of dark / light modes)
  useEffect(() => {
    if (textRef.current) {
      const material = textRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uColor.value = new THREE.Color(color);
    }
  }, [color]);

  return (
    <group ref={groupRef} position={position}>
      <Text
        ref={textRef}
        font="https://o1vj7bm9yy.ufs.sh/f/YS7X7tdqhV1FA7KxBhgER1qt6JFlP5UTNYh2kKHzviujeDwO"
        fontSize={size}
        position={[0, 0, 0]} // Move the text away from the center
        anchorX="center"
        anchorY="middle"
        material={material}
      >
        {children}
      </Text>
    </group>
  );
};
