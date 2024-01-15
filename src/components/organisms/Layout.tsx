import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";

import { MutableRefObject, useRef, useState } from "react";
import { Menu } from ".";
import { ProjectProvider } from "../../contexts/ProjectContext";
import { useColorContext } from "../../hooks/useColorContext";
import { CustomCursor, Navbar, ScrollIndicator } from "../molecules";
import { Lights } from "../three/Lights/Lights";
import { Noise } from "../three";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const { colors } = useColorContext();
  const eventSource = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          config={{
            wheelMultiplier: 1.3,
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
            className="z-10"
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
