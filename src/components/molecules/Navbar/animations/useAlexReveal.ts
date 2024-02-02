import { useState, useEffect } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";

export const useAlexReveal = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setHasScrolled(true);
      return;
    }

    setHasScrolled(false);
    ScrollTrigger.create({
      start: "top top", // Trigger after scrolling 100vh
      end: `${window.innerHeight}px top`,
      onLeave: () => setHasScrolled(true),
      onEnterBack: () => setHasScrolled(false),
    });
  }, [location]);
  return hasScrolled;
};
