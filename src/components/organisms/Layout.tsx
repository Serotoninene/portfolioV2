import { useRef } from "react";
import { GlobalCanvas, SmoothScrollbar } from "@14islands/r3f-scroll-rig";
import { Navbar, ScrollIndicator } from "../molecules";
import { Lights } from "../three/Lights/Lights";
import { Perf } from "r3f-perf";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const eventSource = useRef<HTMLDivElement>(null);
  return (
    <main ref={eventSource} className="text-dark bg-secondary-200">
      <GlobalCanvas eventSource={eventSource} eventPrefix="client">
        {/* <Perf /> */}
        <Lights />
      </GlobalCanvas>
      <SmoothScrollbar />
      <Navbar />
      {children}
      <ScrollIndicator />
    </main>
  );
};
