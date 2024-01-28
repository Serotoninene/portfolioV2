import { useEffect, useRef } from "react";

import gsap, { Power3 } from "gsap";
import { Flip } from "gsap/Flip";

import { useCursorStore } from "../../../store/useCursorStyle";
import { splitWords } from "../../../utils";

gsap.registerPlugin(Flip);

export const CustomCursor = () => {
  const cursor = useRef(null);
  const textContainer = useRef<HTMLSpanElement>(null);
  const leftParenthesis = useRef<HTMLSpanElement>(null);
  const rightParenthesis = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement[]>([]);
  const { cursorStyle, cursorText } = useCursorStore();

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
  }, [cursorStyle, cursorText]);

  return (
    <div
      ref={cursor}
      className="fixed top-0 left-0 aspect-square rounded-full mix-blend-difference pointer-events-none z-50"
      style={{
        opacity: cursorStyle === "none" ? 0 : 1,
        border: cursorStyle === "text" ? "none" : "2px solid white",
      }}
    >
      <div
        className="absolute italic flex items-center text-white w-24 overflow-hidden"
        style={{ opacity: cursorStyle === "text" ? 1 : 0 }}
      >
        <span ref={leftParenthesis}>(&nbsp; </span>
        <span key={cursorText} ref={textContainer}>
          {splitWords(cursorText, textRef)}
        </span>
        <span ref={rightParenthesis}>&nbsp;)</span>
      </div>
    </div>
  );
};
