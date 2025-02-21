import { useEffect, useRef } from "react";
import { useWindowSize } from "../../../../../../hooks";

export const useScrollEvents = () => {
  const scrollPosition = useRef(0);
  const momentum = useRef(0);
  const { width } = useWindowSize();
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaX + e.deltaY;
    scrollPosition.current += delta * 0.5; // Reduced from 0.001 to 0.0005
    momentum.current = delta;
  };

  let touchStartY = 0;
  let touchStartX = 0;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const deltaY = touchStartY - e.touches[0].clientY;
    const deltaX = touchStartX - e.touches[0].clientX;

    const delta = deltaY + deltaX; // Combine both directions for smooth scrolling
    scrollPosition.current += delta;
    momentum.current = delta;

    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [width]);

  return { momentum, scrollPosition };
};
