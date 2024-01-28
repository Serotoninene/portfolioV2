import { useEffect, useRef } from "react";

import gsap, { Power3 } from "gsap";
import { Flip } from "gsap/Flip";

import { useCursorStore } from "../../../store/useCursorStyle";
import { splitWords } from "../../../utils";
import { text } from "stream/consumers";

gsap.registerPlugin(Flip);

export const CustomCursor = () => {
  const cursor = useRef(null);
  const textContainer = useRef<HTMLSpanElement>(null);
  const leftParenthesis = useRef<HTMLSpanElement>(null);
  const rightParenthesis = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement[]>([]);
  const { cursorStyle, cursorText } = useCursorStore();

  const textTl = useRef<gsap.core.Timeline>();
  const offset = cursorStyle === "pointer" ? 32 : 2;

  const moveCursor = (e: MouseEvent) => {
    gsap.to(cursor.current, {
      x: e.clientX - offset,
      y: e.clientY - offset,
    });
  };

  useEffect(() => {
    gsap.set(textRef.current, { yPercent: 100 });

    textTl.current = gsap.timeline({ paused: true });

    textTl.current.to(textContainer.current, {
      opacity: 1,
      duration: 0.1,
    });
    textTl.current.to(
      textRef.current,
      {
        yPercent: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: Power3.easeOut,
      },
      "<"
    );

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  useEffect(() => {
    if (cursorStyle === "pointer") {
      gsap.to(cursor.current, {
        width: 64,
        duration: 0.2, // adjust the duration as needed
        ease: Power3.easeOut, // adjust the easing as needed
      });
    } else if (cursorStyle === "text") {
      const flipState = Flip.getState([
        leftParenthesis.current,
        rightParenthesis.current,
        textContainer.current,
      ]);

      if (textContainer.current) {
        textContainer.current.style.width = "fit-content";
      }

      Flip.from(flipState, {
        delay: 0.5,
        duration: 0.5,
        ease: Power3.easeOut,
        absolute: true,
        scale: true,
        onComplete: () => {
          gsap.set(textRef.current, {
            yPercent: 100,
          });
          gsap.set(textContainer.current, {
            opacity: 1,
          });

          gsap.to(textRef.current, {
            yPercent: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: Power3.easeIn,
          });
        },
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
      className="fixed top-0 left-0 aspect-square rounded-full mix-blend-difference pointer-events-none z-50"
      style={{
        opacity: cursorStyle === "none" ? 0 : 1,
        border: cursorStyle === "text" ? "none" : "2px solid white",
      }}
    >
      {cursorStyle === "text" && (
        <>
          <div className="absolute italic flex items-center text-white w-24">
            <span ref={leftParenthesis}>( &nbsp;</span>
            <span ref={textContainer} className="w-0 opacity-0">
              {splitWords(cursorText, textRef)}
            </span>
            <span ref={rightParenthesis}> &nbsp; )</span>
          </div>
        </>
      )}
    </div>
  );
};
