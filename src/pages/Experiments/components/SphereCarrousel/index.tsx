import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

function Scene() {
  return (
    <>
      <mesh>
        <sphereGeometry />
      </mesh>
    </>
  );
}

export function SphereCarrousel() {
  return (
    <div className="h-full">
      <Canvas>
        <Scene />
        <color attach="background" args={[new THREE.Color("#030303")]} />
      </Canvas>
    </div>
  );
}
