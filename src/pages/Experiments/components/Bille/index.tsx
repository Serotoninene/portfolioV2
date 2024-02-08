import { MeshTransmissionMaterial } from "@react-three/drei";

import { useControls } from "leva";

export const Bille = () => {
  const controls = useControls("Bille controls", {
    roughness: { value: 0.3, min: 0, max: 1, step: 0.01 },
    distortion: { value: 5, min: 0, max: 10, step: 0.1 },
    distortionScale: { value: 1.5, min: 0, max: 10, step: 0.1 },
    metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    transmission: { value: 1, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0.3, min: 0, max: 1, step: 0.01 },
  });
  return (
    <>
      <mesh>
        <sphereGeometry />
        <MeshTransmissionMaterial
          chromaticAberration={1}
          thickness={controls.thickness}
          roughness={controls.roughness}
          transmission={controls.transmission}
          anisotropy={0.5}
          distortion={controls.distortion}
          distortionScale={controls.distortionScale}
          temporalDistortion={0.1}
          metalness={controls.metalness}
          backside
          resolution={32}
          backsideResolution={32}
        />
      </mesh>

      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
};
