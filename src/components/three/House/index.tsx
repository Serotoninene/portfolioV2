import { useRef } from "react";
import { Float, useGLTF } from "@react-three/drei";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Object3D } from "three";

// import { mergeTimelines, useIntroAnim, useScrollAnim } from "./animations";
import { useWindowSize } from "../../../hooks";

const HOUSE_SRC = "./assets/ThreeModels/House/house2.glb";
gsap.registerPlugin(ScrollTrigger);

export const House = () => {
  // set up
  const model = useGLTF(HOUSE_SRC);
  // const { active } = useProgress();
  const houseRef = useRef<Object3D>();
  const { width } = useWindowSize();

  const houseScale = width ? width * 0.01 : 0;

  // // anims
  // const introTl = useIntroAnim({
  //   ref: houseRef as React.RefObject<Object3D>,
  // });
  // const scrollTl = useScrollAnim({
  //   ref: houseRef as React.RefObject<Object3D>,
  // });

  // triggering the introTl only when the model is done loading
  // useEffect(() => {
  //   if (!introTl.current || !scrollTl.current) return;
  //   const masterTl = mergeTimelines([introTl?.current]);

  //   if (!active) {
  //     masterTl.play();
  //   }

  //   return () => {
  //     masterTl.kill();
  //   };
  // }, [active]);

  return (
    <Float
      speed={10} // Animation speed, defaults to 1
      rotationIntensity={1} // XYZ rotation intensity, defaults to 1
      floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[1, 10]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <primitive
        ref={houseRef}
        object={model.scene}
        scale={[houseScale, houseScale, houseScale]}
      />
    </Float>
  );
};
