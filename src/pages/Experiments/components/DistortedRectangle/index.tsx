import {
  PerspectiveCamera,
  PivotControls,
  SpotLight,
  useHelper,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { extendMaterial } from "../../../../components/three/utils/extendMaterial";

import { CustomCanvas } from "../../../../components/three";
import { useControls } from "leva";

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

const getPivotPosition = (element: null | THREE.DirectionalLight) => {
  element?.updateMatrixWorld(true);
  const position = new THREE.Vector3();
  element?.getWorldPosition(position);
  return position;
};

const Scene = () => {
  const directionalLight = useRef<THREE.DirectionalLight>(null);
  const spotLight = useRef<THREE.SpotLight>(null);

  const controls = useControls("Lights", {
    ambientLight: {
      value: 0.3,
      min: 0,
      max: 5,
      step: 0.1,
    },
    directionalLight: {
      value: 30,
      min: 0,
      max: 5000,
      step: 1,
    },
  });

  const { x, y, z } = useControls("Wall", {
    x: {
      value: -10,
      min: -10,
      max: 10,
      step: 0.1,
    },
    y: {
      value: 3.7,
      min: -10,
      max: 10,
      step: 0.1,
    },
    z: {
      value: 10,
      min: -10,
      max: 100,
      step: 0.1,
    },
  });

  useFrame(({ gl, camera }) => {
    camera.lookAt(0, 0, 0);
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap; // Choose the type of shadow map
  });

  return (
    <>
      <DistortedMesh position={[0, 0, 0]} />
      {/* ---- lights ----  */}
      <ambientLight intensity={controls.ambientLight} />

      {/* <directionalLight
        castShadow
        ref={directionalLight}
        position={[0, 14.22, 15.7]}
        intensity={controls.directionalLight}
      /> */}
      <PivotControls>
        <SpotLight
          ref={spotLight}
          castShadow
          position={[0, 14.22, 25.7]}
          angle={Math.PI / 4}
          penumbra={0.05}
          intensity={1000}
          color={"#ffffff"}
          distance={200}
          decay={2}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
      </PivotControls>

      {/* ---- walls ---- */}
      <mesh rotation={[0, 0, 0]} position={[x, y, z]} castShadow={true}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial side={THREE.DoubleSide} />
      </mesh>

      {/* ---- floor ---- */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow={true}
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial />
      </mesh>
      <PerspectiveCamera
        makeDefault
        // position={[0, 0, 5]}
        position={[9.12, 10.33, -10.31]}
      />
    </>
  );
};

export const DistortedRectangle = () => {
  return (
    <CustomCanvas isCameraControls={false}>
      <Scene />
    </CustomCanvas>
  );
};
