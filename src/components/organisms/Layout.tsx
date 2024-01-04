import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";

import { MutableRefObject, useRef } from "react";
import { ProjectProvider } from "../../contexts/ProjectContext";
import { Navbar, ScrollIndicator } from "../molecules";
import { Lights } from "../three/Lights/Lights";
import { useColorContext } from "../../hooks/useColorContext";
import { Effects } from "@react-three/drei";
import { DotScreen, EffectComposer, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const eventSource = useRef<HTMLDivElement>(null);
  const { colors } = useColorContext();

  return (
    <ProjectProvider>
      <main
        id="Layout"
        ref={eventSource}
        style={{
          background: colors.light,
          color: colors.dark,
        }}
      >
        <GlobalCanvas
          globalRender={false}
          eventSource={eventSource as MutableRefObject<HTMLElement>}
          eventPrefix="client"
        >
          <Lights />
          <EffectComposer>
            <DotScreen
              blendFunction={BlendFunction.NORMAL} // blend mode
              angle={Math.PI} // angle of the dot pattern
              scale={10.0} // scale of the dot pattern
            />
            {/* <Noise
              blendFunction={BlendFunction.OVERLAY}
              premultiply
              opacity={0.5}
            /> */}
          </EffectComposer>
        </GlobalCanvas>
        <SmoothScrollbar config={{ wheelMultiplier: 0.7 }} />
        <Navbar />
        {children}
        <ScrollIndicator />
      </main>
    </ProjectProvider>
  );
};
