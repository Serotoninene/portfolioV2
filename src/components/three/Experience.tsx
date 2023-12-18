import { CustomCanvas } from ".";
// import { FallingLogos } from "./FallingLogos";
// import { Lights } from "./Lights/Lights";
// import Particles from "./Particles";

export const Experience = () => {
  return (
    <div className="h-full">
      <CustomCanvas>
        <mesh>
          <sphereBufferGeometry args={[100, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </CustomCanvas>
    </div>
  );
};
