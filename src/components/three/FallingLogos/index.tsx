import { useMemo } from "react";
import * as THREE from "three";
import { useLogo } from "./hooks/useLogo";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { useWindowSize } from "../../../hooks";

export const FallingLogos = () => {
  const count = 500;
  const { width, height } = useWindowSize();
  const { geometry, material } = useLogo();

  const instances = useMemo<InstancedRigidBodies>(() => {
    const instances = [];
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < count; i++) {
      const matrix = new THREE.Matrix4();
      // positions
      const x = Math.random() * width - width / 2;
      const y = i * height;
      // rotations : first on the z axis, then on the x axis
      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
      const xQuaternion = new THREE.Quaternion();
      xQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      quaternion.multiply(xQuaternion);

      matrix.compose(
        new THREE.Vector3(x, y, 0),
        quaternion,
        new THREE.Vector3(100, 100, 100)
      );

      instances.push({
        key: "instance_" + i,
        position: [x, y, 0],
        rotation: [90, 0, 90],
        scale: [100, 100, 100],
      });
    }

    return instances;
  }, []);

  // if (!width || !height) return null;

  const boxWidth = width || 0.5;
  const boxHeight = height || 0.5;

  return (
    <>
      <Physics gravity={[0, -500, 0]}>
        <InstancedRigidBodies instances={instances}>
          <instancedMesh args={[geometry, material, count]} />
        </InstancedRigidBodies>
        <RigidBody type="fixed">
          <CuboidCollider
            args={[boxWidth, 10, boxWidth]}
            position={[0, 0, 0]}
          />
          <CuboidCollider
            args={[0.5, boxHeight, boxWidth]}
            position={[boxWidth / 2, 0, 0]}
          />
          <CuboidCollider
            args={[0.5, boxHeight, boxWidth]}
            position={[-boxWidth / 2, 0, 0]}
          />
          <CuboidCollider
            args={[boxWidth, boxHeight, 0.5]}
            position={[0, 0, boxWidth / 2]}
          />
          <CuboidCollider
            args={[boxWidth, boxHeight, 0.5]}
            position={[0, 0, -boxWidth / 2]}
          />
        </RigidBody>
      </Physics>
    </>
  );
};
