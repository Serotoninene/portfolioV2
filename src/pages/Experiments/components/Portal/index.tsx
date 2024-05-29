import { useRef, useState } from "react";

import {
  CameraControls,
  Environment,
  MeshPortalMaterial,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  PortalMaterialType,
  useCursor,
} from "@react-three/drei";
import * as THREE from "three";

import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { CustomCanvas } from "../../../../components/three";

type Props = {
  children: React.ReactNode;
};

export function Frame({ children }: Props) {
  const portal = useRef<PortalMaterialType>(null);
  const mesh = useRef<THREE.Mesh>(null);

  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const handleClick = () => {
    if (!mesh.current) return;

    gsap.to(portal.current, {
      blend: 1,
    });
  };

  useFrame(() => {
    if (!portal.current) return;
  });

  return (
    <mesh
      ref={mesh}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[0.3, 0.4, 0.1]} />
      <MeshPortalMaterial ref={portal} side={THREE.DoubleSide} blend={0}>
        {children}
      </MeshPortalMaterial>
    </mesh>
  );
}

const Scene = () => {
  return (
    <>
      <Frame>
        <mesh scale={3}>
          <sphereGeometry />
          <MeshTransmissionMaterial
            chromaticAberration={1}
            thickness={0.3}
            roughness={0.3}
            transmission={1}
            anisotropy={0.5}
            distortion={5}
            distortionScale={1.5}
            temporalDistortion={0.1}
            metalness={0.1}
            backside
            resolution={32}
            side={THREE.DoubleSide}
            backsideResolution={32}
          />
        </mesh>
        <CameraControls makeDefault maxZoom={0} minZoom={0} />
        <Environment preset="city" />
        <PerspectiveCamera
          fov={14}
          position={[2.74, 1.2, 0.62]}
          makeDefault
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
      </Frame>
    </>
  );
};

export const Portal = () => {
  return (
    <CustomCanvas isCameraControls={true}>
      <Scene />
    </CustomCanvas>
  );
};
