import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";

import { EffectComposer, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { MutableRefObject, useRef } from "react";
import { ProjectProvider } from "../../contexts/ProjectContext";
import { useColorContext } from "../../hooks/useColorContext";
import { CustomCursor, Navbar, ScrollIndicator } from "../molecules";
import { Lights } from "../three/Lights/Lights";
import { useControls } from "leva";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const eventSource = useRef<HTMLDivElement>(null);
  const { colors } = useColorContext();

  const { opacity } = useControls("noise", {
    opacity: { value: 0.1, min: 0, max: 1, step: 0.01 },
  });

  const { wheelMultiplier, lerp } = useControls("smoothScroll", {
    wheelMultiplier: { value: 0.8, min: 0, max: 5, step: 0.01 },
    lerp: { value: 0.1, min: 0, max: 1, step: 0.01 },
  });

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
            {/* <DotScreen
              blendFunction={BlendFunction.NORMAL} // blend mode
              angle={Math.PI} // angle of the dot pattern
              scale={10.0} // scale of the dot pattern
            /> */}
            <Noise
              blendFunction={BlendFunction.DIFFERENCE}
              premultiply
              opacity={opacity}
            />
          </EffectComposer>
        </GlobalCanvas>
        <SmoothScrollbar
          config={{
            wheelMultiplier: wheelMultiplier,
            lerp: lerp,
            autoResize: true,
          }}
        />
        <Navbar />
        <CustomCursor />
        {children}
        <ScrollIndicator />
      </main>
    </ProjectProvider>
  );
};
