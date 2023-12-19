import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useState } from "react";

export const useInView = (ref: React.RefObject<HTMLElement>) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end: "bottom top",
      onEnter: () => setInView(true),
      onLeave: () => setInView(false),
      onEnterBack: () => setInView(true),
      onLeaveBack: () => setInView(false),
    });
  }, []);

  return inView;
};
