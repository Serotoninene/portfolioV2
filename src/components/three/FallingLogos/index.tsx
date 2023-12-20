import { useLogo } from "./hooks/useLogo";

import * as THREE from "three";
import { useWindowSize } from "../../../hooks";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

type Tuple = [number, number, number];

export const FallingLogos = () => {
  const COUNT = 10;
  const ARR = new Array(COUNT).fill(0);

  const { width, height } = useWindowSize();
  const { geometry } = useLogo();

  const logos = useRef<THREE.Mesh[]>([]);
  const initialPosition = useMemo<Tuple[]>(() => {
    const height = window.innerHeight;
    const width = window.innerWidth;

    return ARR.map((_, i) => {
      const range = i % 2 === 0 ? -width / 2 : width / 2;

      const x = Math.random() * range;
      const y = (-height / 2 - i * height) / 2;
      return [x, y, -500];
    });
  }, [ARR]);

  useFrame(({ clock }) => {
    if (!logos.current || !height) return;
    const time = clock.getElapsedTime();

    logos.current.forEach((logo, i) => {
      logo.position.y = initialPosition[i][1] + time * 100;
      const speed = 0.0001;
      const rot = time * speed;
      logo.rotation.y = rot;
      logo.rotation.x = rot;

      if (logo.position.y > height) {
        logo.position.y -= height * 2;
      }
    });
  });

  return (
    <>
      {ARR.map((_, i) => {
        const randomRotation = Math.random() * 90;
        return (
          <mesh
            key={i}
            ref={(e) => (logos.current[i] = e as THREE.Mesh)}
            scale={[100, 160, 160]}
            rotation={[randomRotation, 0, 90]}
            position={initialPosition[i]}
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
