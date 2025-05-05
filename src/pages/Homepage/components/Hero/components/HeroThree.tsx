import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import { MutableRefObject, useRef } from "react";

import { useGLTF } from "@react-three/drei";
import { Logo } from "../../../../../components/three";
import { FallingLogos } from "../../../../../components/three/FallingLogos";

const LOGO_SRC = "./assets/ThreeModels/Serotonine_Icon/serotonine_icon.glb";

export const HeroThree = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Instancing the geometry for the children components
  const { nodes } = useGLTF(LOGO_SRC) as any;
  const geometry = nodes.Plane.geometry;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex justify-center items-center"
    >
      <div ref={ref} className="h-[65vh] aspect-[2/4] opacity-0" />

      <UseCanvas>
        <ScrollScene
          track={ref as MutableRefObject<HTMLElement>}
          inViewportMargin="400%"
        >
          {({ scale, inViewport }) => {
            return (
              <>
                <FallingLogos geometry={geometry} />
                <Logo
                  scale={scale}
                  inViewport={inViewport}
                  geometry={geometry}
                />
              </>
            );
          }}
        </ScrollScene>
      </UseCanvas>
    </div>
  );
};
