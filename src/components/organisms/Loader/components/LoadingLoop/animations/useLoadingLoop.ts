import React, { RefObject, useLayoutEffect } from "react";
import gsap, { Power4 } from "gsap";

export const useLoadingLoop = (
  loading: RefObject<HTMLSpanElement[]>,
  shadowLoading: RefObject<HTMLSpanElement[]>
) => {
  const tl = React.useRef<gsap.core.Timeline>();
  useLayoutEffect(() => {
    if (!loading.current || !shadowLoading.current) return;

    tl.current = gsap.timeline({
      defaults: {
        stagger: {
          // from: "center",
          amount: 0.3,
        },
        duration: 1,
        ease: Power4.easeOut,
      },
      repeatDelay: 0.5,
      repeat: -1,
    });

    gsap.set(shadowLoading.current, {
      yPercent: 100,
    });

    tl.current.to(loading.current, {
      yPercent: -100,
    });
    tl.current.to(
      shadowLoading.current,
      {
        yPercent: 0,
      },
      "<"
    );

    tl.current.set(loading.current, {
      yPercent: 0,
      stagger: 0,
    });
    tl.current.set(shadowLoading.current, {
      yPercent: 100,
      stagger: 0,
    });

    return () => {
      tl.current?.kill();
    };
  }, []);

  return tl;
};
