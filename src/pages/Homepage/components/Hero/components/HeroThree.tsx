import { MutableRefObject, useRef } from "react";
import {
  ScrollScene,
  UseCanvas,
  useScrollRig,
} from "@14islands/r3f-scroll-rig";

import { Logo } from "../../../../../components/three";
import { FallingLogos } from "../../../../../components/three/FallingLogos";

export const HeroThree = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { hasSmoothScrollbar } = useScrollRig();

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex justify-center items-center"
    >
      <div
        ref={ref}
        className="h-[65vh] aspect-[2/4] bg-gray-400"
        style={{ opacity: hasSmoothScrollbar ? 0 : 1 }}
      />

      {hasSmoothScrollbar && (
        <UseCanvas>
          <ScrollScene
            track={ref as MutableRefObject<HTMLElement>}
            inViewportMargin="400%"
          >
            {({ scale, inViewport }) => {
              return (
                <>
                  <FallingLogos />
                  <Logo scale={scale} inViewport={inViewport} />
                </>
              );
            }}
          </ScrollScene>
        </UseCanvas>
      )}
    </div>
  );
};
