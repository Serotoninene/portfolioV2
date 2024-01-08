import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { RefObject, useEffect, useLayoutEffect, useRef } from "react";
import {
  Contact,
  Footer,
  Hero,
  RecentProjects,
  Showreal,
  StickyText,
} from "./components";

export default function Homepage() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div id="Homepage" className="overflow-hidden ">
      {/* <Loader /> */}
      {/* <Hero /> */}
      {/* <Showreal /> */}
      {/* <StickyText />
      <RecentProjects />
      <Contact />
      <Footer /> */}
    </div>
  );
}
