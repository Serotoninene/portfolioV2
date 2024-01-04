import { useLogo } from "./hooks/useLogo";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useWindowSize } from "../../../hooks";

type Tuple = [number, number, number];

export const FallingLogos = () => {
  const COUNT = 5;
  const ARR = new Array(COUNT).fill(0);

  const { width, height } = useWindowSize();
  const { geometry } = useLogo();

  const logos = useRef<THREE.Mesh[]>([]);

  useFrame((_, delta) => {
    if (!logos.current || !height || !width) return;
    const scrollY = window.scrollY;
    const speed = 500;

    logos.current.forEach((logo, i) => {
      if (!logo) return;
      logo.position.y += delta * speed;
      logo.rotation.x += delta;
      logo.rotation.y += delta;

      if (scrollY === 0 && logo.position.y > height * 1.5) {
        const range = i % 2 === 0 ? -width : width;
        logo.position.x = Math.random() * range;
        // logo.position.x = width * Math.random();
        logo.position.y = -height - (i * height) / 1.5;
      }
    });
  });

  if (!width || !height) return null;

  return (
    <>
      {ARR.map((_, i) => {
        const range = i % 2 === 0 ? -width : width;
        const x = Math.random() * range;
        const y = (-height - i * height) / 2;
        const position: Tuple = [x, y, -500];
        const rotation: Tuple = [Math.random() * 90, 0, Math.random() * 90]; // Set your initial rotation here

        return (
          <mesh
            key={i}
            ref={(e) => (logos.current[i] = e as THREE.Mesh)}
            scale={[100, 160, 160]}
            position={position}
            rotation={rotation}
          >
            <bufferGeometry {...geometry} />
            <meshStandardMaterial color="#ebe9e5" />
          </mesh>
        );
      })}
      <mesh position={[0, height ? height : 0, 0]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color={new THREE.Color("#fdfcfc")} />
      </mesh>
    </>
  );
};
