import { useControls } from "leva";

export const useSkateControls = () => {
  const skateControls = useControls("Position and Rotation", {
    rotation: {
      value: [-1.5, 0.35, -0.55],
      min: -180,
      max: 180,
      step: 0.01,
    },
    position: {
      value: [4, 0, 0],
      min: -180,
      max: 180,
    },
  });

  return skateControls;
};
