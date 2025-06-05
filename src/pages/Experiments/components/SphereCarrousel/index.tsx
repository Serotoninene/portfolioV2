import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Data
import { photos } from "../../experimentsData";

// Shaders
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { useControls } from "leva";

function Scene() {
  const textures = useLoader(THREE.TextureLoader, photos);

  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef(new THREE.Vector3(0, 0, 0));

  const [textureIndex, setTextureIndex] = useState(0);

  const { lerp } = THREE.MathUtils;

  const uniforms = useMemo(
    () => ({
      uTexture1: { value: textures[textureIndex] },
      uTexture2: { value: textures[textureIndex + 1] },
      uRefractionStrength: { value: 0.1 },
      uCenterScale: { value: 2 },
    }),
    []
  );

  const controls = useControls({
    refractionStrength: {
      value: uniforms.uRefractionStrength.value,
      min: 0,
      max: 1,
      onChange: (value) => {
        uniforms.uRefractionStrength.value = value;
      },
    },
    centerScale: {
      value: uniforms.uCenterScale.value,
      min: 1,
      max: 10,
      onChange: (value) => {
        uniforms.uCenterScale.value = value;
      },
    },
  });

  const [rotation, setRotation] = useState([0, 0, 0]);

  useFrame(({ pointer }) => {
    // Target rotation range: -PI/10 to PI/10
    const maxRotation = Math.PI / 10;

    // Update target rotation based on current mouse position
    targetRotation.current.x = THREE.MathUtils.lerp(
      targetRotation.current.x,
      pointer.y * maxRotation,
      0.1
    );
    targetRotation.current.y = THREE.MathUtils.lerp(
      targetRotation.current.y,
      pointer.x * maxRotation + Math.PI / 2,
      0.1
    );

    if (meshRef.current) {
      meshRef.current.rotation.x = targetRotation.current.x;
      meshRef.current.rotation.y = targetRotation.current.y;
    }
  });

  return (
    <>
      <mesh ref={meshRef} scale={7} rotation={[0, Math.PI / 2, 0]}>
        <sphereGeometry />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

export function SphereCarrousel() {
  return (
    <div className="h-full">
      <Canvas>
        <OrbitControls />
        <Scene />
        <color attach="background" args={[new THREE.Color("#030303")]} />
      </Canvas>
    </div>
  );
}
