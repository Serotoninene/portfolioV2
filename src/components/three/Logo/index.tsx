import { Float, useGLTF } from "@react-three/drei";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { MathUtils, Mesh } from "three";

import gsap from "gsap";

const LOGO_SRC = "./assets/ThreeModels/Serotonine_Icon/untitled2.glb";

type Props = {
  scale?: vec3;
  inViewport?: boolean;
};

export const Logo = ({ scale, inViewport }: Props) => {
  const ref = useRef<Mesh>(null);
  const tl = useRef<gsap.core.Timeline>();
  const model = useGLTF(LOGO_SRC);
  const geometry = model.nodes.Plane.geometry;

  const targetRotationY = useRef(1.6);
  const targetRotationX = useRef(-0.2);

  useEffect(() => {
    if (!ref.current) return;
    tl.current = gsap.timeline({ delay: 2.2 });
    ref.current.rotation.set(-0.2, 2, 0);

    tl.current.from(ref.current.rotation, { x: 1 });
    tl.current.from(ref.current.position, { y: -300, z: -600 }, "<");
  }, []);

  useFrame(({ pointer }) => {
    if (!ref.current || !inViewport) return;

    const mappedX = (pointer.x - 1) / 2;
    const mappedY = MathUtils.mapLinear(pointer.y, 0, 1, -1, 1.6);

    targetRotationY.current = 1.6 + mappedX * 0.5;
    targetRotationX.current = -0.2 + mappedY * 0.05;

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
    <Float
      speed={3.85}
      rotationIntensity={0.8} // XYZ rotation intensity, defaults to 1
      floatIntensity={2.05} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[1, 10]}
    >
      <mesh
        ref={ref}
        geometry={geometry}
        scale={[scale?.x * 0.6, scale?.x * 0.6, scale?.x]}
      >
        <meshStandardMaterial />
      </mesh>
    </Float>
  );
};
