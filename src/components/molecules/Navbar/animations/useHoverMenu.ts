import gsap, { Power4 } from "gsap";
import { RefObject, useLayoutEffect, useRef } from "react";

export const useHoverMenu = (
  menuRef: RefObject<HTMLSpanElement[]>,
  menuShadowRef: RefObject<HTMLSpanElement[]>
) => {
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    tl.current.to(menuRef.current, {
      yPercent: -100,
      stagger: 0.05,
      ease: Power4.easeOut,
      duration: 0.3,
    });

    tl.current.to(
      menuShadowRef.current,
      {
        yPercent: -100,
        stagger: 0.05,
        ease: Power4.easeOut,
        duration: 0.3,
      },
      "<"
    );

    return () => {
      tl.current?.kill();
    };
  }, []);

  return tl;
};
