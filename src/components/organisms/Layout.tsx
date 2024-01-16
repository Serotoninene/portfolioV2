import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";

import { MutableRefObject, useRef, useState } from "react";
import { Menu } from ".";
import { ProjectProvider } from "../../contexts/ProjectContext";
import { useMediaQuery } from "../../hooks";
import { useColorContext } from "../../hooks/useColorContext";
import { CustomCursor, Navbar, ScrollIndicator } from "../molecules";
import { Noise } from "../three";
import { Lights } from "../three/Lights/Lights";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const { colors } = useColorContext();
  const eventSource = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery(768);

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

        <SmoothScrollbar
          enabled={!isMobile}
          config={{
            wheelMultiplier: 1.8,
            lerp: 0.1,
            autoResize: true,
          }}
        />
        {/* --------------- R3F-SCROLL-RIG PART --------------- */}
        <CustomCursor />
        <div>
          <Menu isMenuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
          <Navbar isMenuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
          {children}
          <GlobalCanvas
            eventSource={eventSource as MutableRefObject<HTMLDivElement>}
          >
            <Lights />
            <Noise />
          </GlobalCanvas>
        </div>
        <ScrollIndicator />
      </main>
    </ProjectProvider>
  );
};
