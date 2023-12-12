import React, { useLayoutEffect } from "react";
import gsap from "gsap";

export const useShrinkOnScroll = (ref: React.RefObject<HTMLDivElement>) => {
  useLayoutEffect(() => {
    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
        pinSpacing: false,
        markers: true,
      },
      scale: 0,
      borderRadius: "25px",
    });
  });
};
