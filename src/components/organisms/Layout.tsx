import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";
import { MutableRefObject, useRef } from "react";
import { Navbar, ScrollIndicator } from "../molecules";
import { Lights } from "../three/Lights/Lights";
import { Perf } from "r3f-perf";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const eventSource = useRef<HTMLDivElement>(null);
  return (
    <main ref={eventSource} className="text-dark bg-secondary-400">
      <GlobalCanvas
        eventSource={eventSource as MutableRefObject<HTMLElement>}
        eventPrefix="client"
      >
        <Perf />
        <Lights />
      </GlobalCanvas>
      <SmoothScrollbar />
      <Navbar />
      {children}
      <ScrollIndicator />
    </main>
  );
};
