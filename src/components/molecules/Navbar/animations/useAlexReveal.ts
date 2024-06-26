import { useState, useEffect } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

export const useAlexReveal = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    setHasScrolled(false);
    ScrollTrigger.create({
      start: "top top", // Trigger after scrolling 100vh
      end: `${window.innerHeight}px top`,
      onLeave: () => setHasScrolled(true),
      onEnterBack: () => setHasScrolled(false),
    });
  }, []);
  return hasScrolled;
};
