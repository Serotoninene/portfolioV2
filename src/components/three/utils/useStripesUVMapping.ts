import { MutableRefObject, useLayoutEffect } from "react";
import * as THREE from "three";

type Props = {
  planeGeometry: MutableRefObject<THREE.PlaneGeometry | null>;
  stripeGeometries: MutableRefObject<THREE.PlaneGeometry[] | []>;
  nbStripes: number;
};

export const useStripesUVMapping = ({
  planeGeometry,
  stripeGeometries,
  nbStripes,
}: Props) => {
  useLayoutEffect(() => {
    const planeUV = planeGeometry.current?.getAttribute("uv");
    if (!planeUV) return;

    const range = 1 / nbStripes; // Adjusted the range calculation

    stripeGeometries.current?.forEach((stripeGeometry, index) => {
      const startV = index * range; // Starting V coordinate
      const endV = (index + 1) * range; // Ending V coordinate

      const stripeUV = new Float32Array(planeUV.count * 2);
      for (let i = 0; i < planeUV.count; i += 2) {
        stripeUV[i] = planeUV.array[i]; // U coordinate stays the same
        stripeUV[i + 1] = THREE.MathUtils.lerp(
          startV,
          endV,
          planeUV.array[i + 1] // Lerp the V coordinate based on the original V coordinate
        );
      }
      stripeGeometry.setAttribute("uv", new THREE.BufferAttribute(stripeUV, 2));
    });
  }, []);
};
