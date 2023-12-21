import { useLogo } from "./hooks/useLogo";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useWindowSize } from "../../../hooks";

type Tuple = [number, number, number];
type PositionRotation = { position: Tuple; rotation: Tuple };

export const FallingLogos = () => {
  const COUNT = 5;
  const ARR = new Array(COUNT).fill(0);

  const { width, height } = useWindowSize();
  const { geometry } = useLogo();

  const logos = useRef<THREE.Mesh[]>([]);

  // INITIAL POSITION ------------------------------------------
  const initialPosition = useMemo<PositionRotation[]>(() => {
    const height = window.innerHeight;
    const width = window.innerWidth;

    return ARR.map((_, i) => {
      const range = i % 2 === 0 ? -width / 2 : width / 2;
      const x = Math.random() * range;
      const y = (-height / 2 - i * height) / 2;
      const position: Tuple = [x, y, -500];
      const rotation: Tuple = [Math.random() * 90, 0, Math.random() * 90]; // Set your initial rotation here
      return { position, rotation };
    });
  }, [ARR]);

  useFrame((_, delta) => {
    if (!logos.current || !height || !width) return;
    const scrollY = window.scrollY;
    const speed = 500;

    logos.current.forEach((logo, i) => {
      logo.position.y += delta * speed;
      logo.rotation.x += delta;
      logo.rotation.y += delta;

      if (scrollY === 0 && logo.position.y > height * 1.5) {
        logo.scale.set(100, 160, 160);
        logo.position.x = Math.random() * width - width / 2;
        logo.position.y = -height - (i * height) / 1.5;
        logo.position.z = -500;
      }
    });
  });

  return (
    <>
      {ARR.map((_, i) => {
        return (
          <mesh
            key={i}
            ref={(e) => (logos.current[i] = e as THREE.Mesh)}
            // scale={[100, 160, 160]}
            rotation={initialPosition[i].rotation}
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
