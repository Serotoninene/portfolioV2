import { useGSAP } from "@gsap/react";
import gsap, { Power3, Power4 } from "gsap";
import { RefObject, useEffect, useRef } from "react";

export const useProjectLineHover = (
  container: RefObject<HTMLAnchorElement>
) => {
  const tl = useRef<gsap.core.Timeline>();

  useGSAP(
    () => {
      tl.current = gsap.timeline({ paused: true });

      tl.current.to(".Project-Line__arrow", {
        xPercent: 100,
        yPercent: -100,
        duration: 0.5,
        ease: Power3.easeOut,
      });

      tl.current.to(
        ".Project-Line__shadow-arrow",
        {
          xPercent: 100,
          yPercent: -100,
          duration: 0.6,
          ease: Power4.easeOut,
        },
        "<"
      );

      tl.current.to(
        ".Project-Line__shadow-line",
        {
          scaleX: 1,
          duration: 0.5,
          ease: Power3.easeOut,
        },
        "<"
      );
    },
    { scope: container }
  );

  useEffect(() => {}, []);

  return tl;
};
