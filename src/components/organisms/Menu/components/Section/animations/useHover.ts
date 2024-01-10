import gsap, { Power3, Power4 } from "gsap";
import { RefObject, useEffect, useRef } from "react";

export const useHover = (
  arrows: RefObject<HTMLDivElement[]>,
  lineShadow: RefObject<HTMLDivElement>
) => {
  const tl = useRef<gsap.core.Timeline>();
  console.log(lineShadow.current);

  useEffect(() => {
    tl.current = gsap.timeline({
      paused: true,
      default: { ease: Power3.easeOut },
    });

    tl.current.to(arrows.current, {
      duration: 0.4,
      xPercent: 100,
      yPercent: -100,
      ease: Power4.easeOut,
    });

    tl.current.to(
      lineShadow.current,
      {
        duration: 0.3,
        scaleX: 1,
      },
      "<"
    );

    return () => {
      tl.current?.kill();
    };
  }, []);

  return tl;
};
