import { useMemo } from "react";
import * as THREE from "three";
import { useLogo } from "./hooks/useLogo";
import { Physics, InstancedRigidBodies } from "@react-three/rapier";

type tupleOfNumbers = [number, number, number];

interface Instance {
  key: string;
  position: tupleOfNumbers;
  rotation: tupleOfNumbers;
  scale: tupleOfNumbers;
}

export const FallingLogos = () => {
  const count = 50;
  const { geometry, material } = useLogo();

  const instances = useMemo<Instance[]>(() => {
    const instances = [];
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < count; i++) {
      const range = i % 2 === 0 ? width / 2 : -width / 2;
      const x = Math.random() * range;
      const y = (-height - i * height) / 4;

      const randomRotation = Math.random() * 90;

      instances.push({
        key: "instance_" + i,
        position: [x, y, -500] as tupleOfNumbers,
        rotation: [randomRotation, 0, 90] as tupleOfNumbers,
        scale: [100, 160, 160] as tupleOfNumbers,
      });
    }

    return instances;
  }, []);

  return (
    <>
      <Physics gravity={[0, 10, 0]}>
        <InstancedRigidBodies instances={instances}>
          <instancedMesh args={[geometry, material, count]} />
        </InstancedRigidBodies>
      </Physics>
    </>
  );
};
