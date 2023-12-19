import { useGLTF } from "@react-three/drei";

import { useEffect, useRef } from "react";
import { Mesh, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";

const LOGO_SRC = "./assets/ThreeModels/Serotonine_Icon/untitled2.glb";

type Props = {
  scale?: vec3;
  inViewport?: boolean;
};

export const Logo = ({ scale, inViewport }: Props) => {
  const ref = useRef<Mesh>(null);
  const model = useGLTF(LOGO_SRC);
  // @ts-ignore
  const geometry = model.nodes.Plane.geometry;

  const targetRotationY = useRef(1.6);
  const targetRotationX = useRef(-0.2);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.rotation.set(-0.2, 1.6, 0);
  }, []);

  useFrame(({ pointer }) => {
    if (!ref.current || !inViewport) return;
    // i need to map pointer.x to be in between -1 and 0

    const mappedX = (pointer.x - 1) / 2;
    const mappedY = (pointer.y - 1) / 2;

    targetRotationY.current = 1.6 + mappedX * 0.5;
    targetRotationX.current = -0.2 + mappedY * 0.1;

    ref.current.rotation.y = MathUtils.lerp(
      ref.current.rotation.y,
      targetRotationY.current,
      0.1
    );
    ref.current.rotation.x = MathUtils.lerp(
      ref.current.rotation.x,
      targetRotationX.current,
      0.1
    );
  });

  if (!scale) return null;

  return (
    <mesh
      ref={ref}
      geometry={geometry}
      scale={[scale?.x * 0.6, scale?.x * 0.6, scale?.x]}
    >
      <meshStandardMaterial />
    </mesh>
  );
};
