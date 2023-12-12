import { useGLTF } from "@react-three/drei";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Vector3 } from "three";

import { useWindowSize } from "../../../hooks";

const LOGO_SRC = "./assets/ThreeModels/Serotonine_Icon/untitled.glb";
gsap.registerPlugin(ScrollTrigger);

type Props = {
  position?: Vector3;
};

export const Logo = ({ position }: Props) => {
  // set up
  const model = useGLTF(LOGO_SRC);
  const { width } = useWindowSize();

  const logoScale = width ? width * 0.05 : 0;

  return (
    <primitive
      object={model.scene}
      scale={[logoScale, logoScale, logoScale]}
      position={position}
    />
  );
};
