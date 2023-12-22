import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";

import { MutableRefObject, useRef } from "react";
import { ProjectProvider } from "../../contexts/ProjectContext";
import { Navbar, ScrollIndicator } from "../molecules";
import { Lights } from "../three/Lights/Lights";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const eventSource = useRef<HTMLDivElement>(null);

  return (
    <ProjectProvider>
      <main
        id="Layout"
        ref={eventSource}
        className="bg-secondary-400 text-dark"
      >
        <GlobalCanvas
          eventSource={eventSource as MutableRefObject<HTMLElement>}
          eventPrefix="client"
        >
          {/* <Perf /> */}
          <EffectComposer>
            <Noise
              blendFunction={BlendFunction.OVERLAY}
              premultiply
              opacity={0.5}
            />
          </EffectComposer>
          <Lights />
        </GlobalCanvas>
        <SmoothScrollbar config={{ wheelMultiplier: 0.7 }} />
        <Navbar />
        {children}
        <ScrollIndicator />
      </main>
    </ProjectProvider>
  );
};
