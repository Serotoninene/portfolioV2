import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";

import React, { MutableRefObject, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from ".";
import { ProjectProvider } from "../../contexts/ProjectContext";
import { useMediaQuery } from "../../hooks";
import { useColorContext } from "../../hooks/useColorContext";
import { CustomCursor, Navbar } from "../molecules";
import { ColorButton } from "../molecules/ColorButton";
import { Noise } from "../three";
import { Lights } from "../three/Lights/Lights";
import gsap from "gsap";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const { colors } = useColorContext();
  const eventSource = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery(768);
  const { pathname } = useLocation();

  useEffect(() => {
    gsap.set("#Navbar", {
      borderColor: colors.secondaryColor,
    });
  }, [pathname]);

  return (
    <ProjectProvider>
      <div id="mainContainer">
        <main
          id="Layout"
          ref={eventSource}
          style={{
            background: colors.mainColor,
            color: colors.secondaryColor,
          }}
        >
          <div className="fixed inset-0 grid grid-cols-8 gap-5 mx-5">
            {new Array(8).fill(0).map((_, i) => (
              <div key={i}>
                <div className="h-full w-[0.5px] bg-secondary-700" />
                {i === 8 - 1 && (
                  <div className="absolute right-0 top-0 h-full w-[0.5px] bg-secondary-700" />
                )}
              </div>
            ))}
          </div>
          {/* --------------- R3F-SCROLL-RIG PART --------------- */}
          <SmoothScrollbar
            enabled={!isMobile}
            config={{
              wheelMultiplier: 0.8,
              lerp: 0.1,
              autoResize: true,
            }}
          />
          {/* --------------- R3F-SCROLL-RIG PART --------------- */}
          <CustomCursor />
          <div>
            <Menu />
            <Navbar />

            {children}
            <GlobalCanvas
              shadows={true}
              globalRender={pathname === "/experiments" ? false : true}
              eventSource={eventSource as MutableRefObject<HTMLDivElement>}
              key={location.pathname}
              orthographic={pathname === "/" ? true : false}
            >
              {/* <Perf position="top-left" /> */}
              <Lights />
              <Noise />
            </GlobalCanvas>
          </div>
          <ColorButton />
        </main>
        <div
          id="transition_panel"
          className="fixed top-full h-screen w-screen shadow-sm"
          style={{ background: colors.mainColor }}
        />
      </div>
    </ProjectProvider>
  );
};
