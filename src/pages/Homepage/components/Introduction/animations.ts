import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export const useShrinkOnScroll = (ref: React.RefObject<HTMLDivElement>) => {
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: 0.8,
        markers: true,
      },
      scale: 0,
      borderRadius: "25px",
    });

    return () => {
      tl.current?.kill();
    };
  });
};
