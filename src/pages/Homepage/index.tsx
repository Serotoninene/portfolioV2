import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { RefObject, useEffect, useLayoutEffect, useRef } from "react";
import {
  Contact,
  ExpendingSquare,
  Hero,
  RecentProjects,
  StickyText,
} from "./components";

const Loader = () => {
  const ref = useRef<HTMLElement>();
  const container = useRef<HTMLDivElement>();
  const tl = useRef<gsap.core.Timeline>();
  const { progress } = useProgress();

  useLayoutEffect(() => {
    if (!ref.current || !container.current) return;
    tl.current = gsap.timeline();
    tl.current.to(ref.current, {
      scaleX: progress / 100,
    });

    if (progress === 100) gsap.to(container.current, { yPercent: -100 });
  }, [progress]);

  return (
    <div
      ref={container as RefObject<HTMLDivElement>}
      className="fixed top-0 left-0 w-screen h-screen bg-secondary-200 z-50 flex flex-col justify-center items-center"
    >
      <div
        ref={ref as RefObject<HTMLDivElement>}
        className="h-[1px] w-[50vw] origin-left scale-x-0 bg-dark"
      />
      <div>{progress}</div>
    </div>
  );
};

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
    <div id="Homepage">
      <Loader />
      {/* <Hero />
      <StickyText />
      <RecentProjects />*/}
      <ExpendingSquare />
      {/* <Contact /> */}
      <div className="h-screen bg-green-400"> </div>
      <div className="h-screen bg-blue-400"> </div>
    </div>
  );
}
