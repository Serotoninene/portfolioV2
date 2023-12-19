import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import { useRef } from "react";
import { Logo } from "../../../../../components/three";

export const HeroLogo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex justify-center items-center"
    >
      <div
        ref={ref}
        className="h-[65vh] aspect-[2/4] bg-gray-400 opacity-0 "
      ></div>
      <UseCanvas>
        <ScrollScene track={ref}>
          {({ scale, inViewport }) => {
            return <Logo scale={scale} inViewport={inViewport} />;
          }}
        </ScrollScene>
      </UseCanvas>
    </div>
  );
};
