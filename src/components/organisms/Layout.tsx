import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";

import { MutableRefObject, useRef, useState } from "react";
import { ProjectProvider } from "../../contexts/ProjectContext";
import { useColorContext } from "../../hooks/useColorContext";
import { CustomCursor, Navbar, ScrollIndicator } from "../molecules";
import { Lights } from "../three/Lights/Lights";
import { Menu } from ".";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const { colors } = useColorContext();
  const eventSource = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const { wheelMultiplier, lerp } = useControls("smoothScroll", {
  //   wheelMultiplier: { value: 1.3, min: 0, max: 5, step: 0.01 },
  //   lerp: { value: 0.1, min: 0, max: 1, step: 0.01 },
  // });

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
        {/* --------------- R3F-SCROLL-RIG PART --------------- */}
        <GlobalCanvas
          globalRender={false}
          eventSource={eventSource as MutableRefObject<HTMLElement>}
          eventPrefix="client"
        >
          <Lights />
        </GlobalCanvas>
        <SmoothScrollbar
          config={{
            wheelMultiplier: 1.3,
            lerp: 0.1,
            autoResize: true,
          }}
        />
        {/* --------------- R3F-SCROLL-RIG PART --------------- */}
        <Navbar isMenuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
        <Menu isMenuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
        <CustomCursor />
        {children}
        <ScrollIndicator />
      </main>
    </ProjectProvider>
  );
};
