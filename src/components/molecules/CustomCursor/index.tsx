import { useEffect, useRef } from "react";
import { useColorContext } from "../../../hooks/useColorContext";

import gsap from "gsap";

export const CustomCursor = () => {
  const { colors } = useColorContext();
  const cursor = useRef(null);

  const moveCursor = (e: MouseEvent) => {
    gsap.to(cursor.current, {
      x: e.clientX + 3,
      y: e.clientY + 3,
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
      className="fixed top-0 left-0 aspect-square w-2 rounded-full border"
      style={{
        border: `1px solid ${colors.dark}`,
      }}
    ></div>
  );
};
