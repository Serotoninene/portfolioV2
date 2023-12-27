import gsap from "gsap";
import { Power3 } from "gsap/gsap-core";
import { useLayoutEffect, useRef } from "react";

export const useIntroAnim = () => {
  const tl = useRef<gsap.core.Timeline>();

  useLayoutEffect(() => {
    gsap.set("#ContactImage", {
      opacity: 0,
      scale: 1.2,
    });

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#Contact",
        start: "51% top",
        markers: true,
        toggleActions: "play reverse play none",
      },
      defaults: { ease: Power3.easeOut },
    });

    // image
    tl.current.to("#ContactImage", {
      opacity: 1,
      scale: 1,
    });

    // header
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
