import { PerspectiveCamera, SpotLight, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { extendMaterial } from "../../../../components/three/utils/extendMaterial";

import { CustomCanvas } from "../../../../components/three";

const MyMaterial = extendMaterial(THREE.MeshStandardMaterial, {
  vertexHeader: "uniform float offsetScale; uniform float uTime;",
  vertex: {
    transformEnd: "transformed.y += sin((uTime + position.x) * 2.1) * 0.5;",
  },
  uniforms: {
    uTime: {
      mixed: true,
      linked: true,
      value: 0,
    },
    diffuse: new THREE.Color(0xffffff),
    roughness: 0.75,
    offsetScale: {
      mixed: true, // Uniform will be passed to a derivative material (MeshDepthMaterial below)
      linked: true, // Similar as shared, but only for derivative materials, so wavingMaterial will have it's own, but share with it's shadow material
      value: 0,
    },
  },
});

const CustomDepthMeshMaterial = extendMaterial(THREE.MeshDepthMaterial, {
  template: MyMaterial,
});

const DistortedMesh = ({ position }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const shader = useRef<THREE.ShaderMaterial>(null);
  const customDepth = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (shader.current) {
      shader.current.uniforms.uTime.value = clock.getElapsedTime();
    }

    if (customDepth.current) {
      customDepth.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={mesh} position={position} castShadow>
      <boxGeometry args={[6, 1, 1, 32, 32]} />
      <primitive ref={shader} object={MyMaterial} attach="material" />
      <primitive
        ref={customDepth}
        object={CustomDepthMeshMaterial}
        attach="customDepthMaterial"
      />
    </mesh>
  );
};

const FloorMesh = () => {
  const texture = useTexture("/textures/distorted-rectangle__baked.jpg");

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      position={[0, -1, 0]}
      receiveShadow={true}
    >
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const getPivotData = (element: null | THREE.SpotLight) => {
  element?.updateMatrixWorld(true);
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  element?.getWorldPosition(position);
  element?.getWorldQuaternion(quaternion);
  const rotation = new THREE.Euler().setFromQuaternion(quaternion);
  return { position, rotation };
};

const SceneLights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <SpotLight
        castShadow
        position={[0, 4.5, 6]}
        angle={0.65}
        penumbra={1}
        intensity={1000}
        color={"#ffffff"}
        distance={500}
        decay={2.3}
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />
      <SpotLight
        position={[5.201835070133405, -1.91465018023303, -0.5758197299536444]}
        rotation={[
          -0.23656296849234418, -0.3804504852400494, -0.5758197299536444,
        ]}
        angle={0.9}
        penumbra={1}
        intensity={50}
        color={"#ffffff"}
        distance={10}
        decay={2.3}
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />
    </>
  );
};

// 4.00218761823236
// y: 6.325774146053557
// z : 6.463544345937725

const Scene = () => {
  useFrame(({ gl, camera }) => {
    camera.lookAt(0, 0, 0);
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap; // Choose the type of shadow map
  });

  return (
    <>
      <DistortedMesh position={[0, 0, 0]} />
      <SceneLights />
      <FloorMesh />
      <PerspectiveCamera makeDefault position={[4, 6.32, 6.47]} />
    </>
  );
};

export const DistortedRectangle = () => {
  return (
    <CustomCanvas isCameraControls={true}>
      <Scene />
    </CustomCanvas>
  );
};
