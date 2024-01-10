import { useEffect, useRef } from "react";

import gsap, { Power3 } from "gsap";
import { useCursorStore } from "../../../store/useCursorStyle";

export const CustomCursor = () => {
  const cursor = useRef(null);
  const { cursorStyle } = useCursorStore();
  const offset = cursorStyle === "pointer" ? 32 : 2;

  const moveCursor = (e: MouseEvent) => {
    gsap.to(cursor.current, {
      x: e.clientX - offset,
      y: e.clientY - offset,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorStyle]);

  useEffect(() => {
    if (cursorStyle === "pointer") {
      gsap.to(cursor.current, {
        width: 64,
        duration: 0.2, // adjust the duration as needed
        ease: Power3.easeOut, // adjust the easing as needed
      });
    } else {
      gsap.to(cursor.current, {
        width: 4,
        duration: 0.2, // adjust the duration as needed
        ease: Power3.easeOut, // adjust the easing as needed
      });
    }
  }, [cursorStyle]);

  return (
    <div
      ref={cursor}
      className="fixed top-0 left-0 aspect-square border-2 border-white rounded-full mix-blend-difference pointer-events-none z-30"
    ></div>
  );
};
