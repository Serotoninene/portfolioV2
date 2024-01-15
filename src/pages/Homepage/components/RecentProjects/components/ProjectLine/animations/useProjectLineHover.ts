import gsap, { Power3, Power4 } from "gsap";
import { RefObject, useEffect, useRef } from "react";

export const useProjectLineHover = (
  arrow: RefObject<HTMLDivElement>,
  shadowArrow: RefObject<HTMLDivElement>
) => {
  const tl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    tl.current.to(arrow.current, {
      xPercent: 100,
      yPercent: -100,
      duration: 0.5,
      ease: Power3.easeOut,
    });

    tl.current.to(
      shadowArrow.current,
      {
        xPercent: 100,
        yPercent: -100,
        duration: 0.6,
        ease: Power4.easeOut,
      },
      "<"
    );
  }, []);

  return tl;
};
