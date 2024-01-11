import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { Loader } from "../../components/organisms";
import {
  Contact,
  Footer,
  Hero,
  RecentProjects,
  Showreal,
  StickyText,
} from "./components";

const Test = () => {
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        markers: true,
        pin: true,
        pinSpacing: false,
      },
    });

    return () => {
      tl.current?.kill();
    };
  }, []);

  return (
    <div ref={container} className="h-screen w-full">
      <div className="h-[50vh] bg-red-400 border-8 border-green-300 w-full" />
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
    <div id="Homepage" className="overflow-hidden ">
      <Loader />
      <Hero />
      <Showreal />
      <StickyText />
      <RecentProjects />
      <Contact />
      <Footer />
    </div>
  );
}
