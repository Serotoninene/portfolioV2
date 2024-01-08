import { RefObject, useLayoutEffect, useRef } from "react";
import gsap, { Power3 } from "gsap";

export const useIntro = (container: RefObject<HTMLDivElement>) => {
  const tl = useRef<gsap.core.Timeline>();
  // set up the timeline for the animation
  useLayoutEffect(() => {
    tl.current = gsap.timeline({
      paused: true,
      defaults: { ease: Power3.easeOut },
    });
    tl.current.to("#Navbar", { yPercent: -150 });
    tl.current.fromTo(
      container.current,
      {
        opacity: 0,
        y: 64,
      },
      {
        y: 0,
        opacity: 1,
      },
      "<"
    );
  }, []);

  return tl;
};
