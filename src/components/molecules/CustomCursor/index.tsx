import { useEffect, useRef } from "react";

import gsap from "gsap";
import { useCursorStore } from "../../../store/useCursorStyle";

export const CustomCursor = () => {
  const cursor = useRef(null);
  const { cursorStyle } = useCursorStore();

  const moveCursor = (e: MouseEvent) => {
    gsap.to(cursor.current, {
      x: e.clientX - 8,
      y: e.clientY - 8,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursor}
      className="fixed top-0 left-0 aspect-square w-4 border-2 border-white rounded-full mix-blend-difference pointer-events-none z-30"
    ></div>
  );
};
