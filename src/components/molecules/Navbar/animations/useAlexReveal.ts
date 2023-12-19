import { useState, useEffect } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

export const useAlexReveal = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: "#Hero",
      start: "top top", // Trigger after scrolling 100vh
      end: "80% top",
      onLeave: () => setHasScrolled(true),
      onEnterBack: () => setHasScrolled(false),
    });
  }, []);
  return hasScrolled;
};
