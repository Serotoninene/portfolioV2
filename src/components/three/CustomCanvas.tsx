import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useWindowSize } from "../../hooks";

type Props = {
  children: React.ReactNode;
};

const CustomCamera = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { height, width } = useWindowSize();
  const [correctFov, setCorrectFov] = useState(0);

  useEffect(() => {
    if (!height || !width) return;

    setCorrectFov(((Math.atan(height / 2 / 600) * 180) / Math.PI) * 2);
  }, [height, width]);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={correctFov}
      position={[0, 0, 600]}
      near={1}
      far={4000}
    />
  );
};

export const CustomCanvas = ({ children }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas flat ref={canvasRef}>
      <Perf position="top-left" />
      <CustomCamera />
      <OrbitControls />
      {children}
    </Canvas>
  );
};
