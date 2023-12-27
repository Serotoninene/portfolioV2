import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Power3 } from "gsap/gsap-core";

export const useIntroAnim = () => {
  const tl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    tl.current = gsap.timeline({
      paused: true,
      defaults: { ease: Power3.easeOut },
    });

    tl.current.to("#ContactImage", {
      opacity: 1,
      scale: 1,
    });

    tl.current.to("#ContactHeader h2", {
      y: 0,
      duration: 1,
    });

    return () => {
      tl.current?.kill();
    };
  }, []);

  return tl;
};
