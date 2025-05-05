import { useScrollRig } from "@14islands/r3f-scroll-rig";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useWindowSize } from "../../../hooks";

interface Props {
  geometry: THREE.BufferGeometry;
}

export const FallingLogos = ({ geometry }: Props) => {
  const COUNT = 10;
  const SPEED = 200;
  const { width, height } = useWindowSize();
  const { hasSmoothScrollbar } = useScrollRig();

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const ARR = new Array(COUNT).fill(0);
  const positions = useMemo(() => {
    if (!width || !height) return null;
    return ARR.map((_, i) => {
      const range = i % 2 === 0 ? -width : width;

      const x = Math.random() * range;
      const y = (-height - i * height) / 2;

      return new THREE.Vector3(x, y, -500);
    });
  }, [width, height]);
  const rotations = useMemo(() => {
    return ARR.map(() => ({
      x: Math.random() * Math.PI,
      y: Math.random() * Math.PI,
      z: Math.random() * Math.PI,
    }));
  }, []);
  const scaleMultipliers = useMemo(() => {
    return new Array(COUNT)
      .fill(null)
      .map(() => THREE.MathUtils.lerp(0.5, 0.7, Math.random()));
  }, [COUNT]);

  useFrame((_, delta) => {
    if (
      !positions ||
      !height ||
      !width ||
      !meshRef.current ||
      !hasSmoothScrollbar
    )
      return;
    const scrollY = window.scrollY;

    for (let i = 0; i < COUNT; i++) {
      const range = i % 2 === 0 ? -width : width;
      const pos = positions[i];
      const rot = rotations[i];
      const scale = scaleMultipliers[i];
      pos.y += delta * SPEED;

      // Reset when off screen or when start scrolling
      if (scrollY === 0 && pos.y > height * 1.5) {
        pos.y = -height - (i * height) / 2;
        pos.x = Math.random() * range;
      }

      // Smooth rotation
      rot.x += delta * 0.5;
      rot.z += delta * 0.3;

      dummy.position.copy(pos);
      dummy.rotation.set(rot.x, rot.y, rot.z);

      dummy.scale.set(100 * scale, 160 * scale, 160 * scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  if (!width || !height || !hasSmoothScrollbar) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, COUNT]}
      frustumCulled={false}
    >
      <meshStandardMaterial color="#fe0505" />
    </instancedMesh>
  );
};
