import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";

import { MutableRefObject, useRef } from "react";
import { ProjectProvider } from "../../contexts/ProjectContext";
import { Navbar, ScrollIndicator } from "../molecules";
import { Lights } from "../three/Lights/Lights";
import { useColorContext } from "../../hooks/useColorContext";

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
          eventSource={eventSource as MutableRefObject<HTMLElement>}
          eventPrefix="client"
        >
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
