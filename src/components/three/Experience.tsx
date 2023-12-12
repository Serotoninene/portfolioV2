import { CustomCanvas } from ".";
import { FallingLogos } from "./FallingLogos";
import { Lights } from "./Lights";
// import Particles from "./Particles";

export const Experience = () => {
  return (
    <div className="h-full">
      <CustomCanvas>
        {/* <Particles /> */}
        <FallingLogos />
        <Lights />
        {/* <OrbitControls autoRotate={false} /> */}
      </CustomCanvas>
    </div>
  );
};
