import { useRef } from "react";

import * as THREE from "three";
import { Environment } from "@react-three/drei";

export const Lights = () => {
  const pointLight = useRef<THREE.PointLight>(null);

  return (
    <>
      <Environment preset="warehouse" />
      <pointLight
        position={[-80, -160, 0]}
        intensity={10000}
        scale={[-80, -160, 0]}
      />
      <pointLight
        ref={pointLight}
        position={[120, 180, 0]}
        intensity={5000}
        scale={[-80, 200, 40]}
      />
    </>
  );
};
