import { useEffect, useRef } from "react";
import gsap, { Power3 } from "gsap";

interface Props {
  string?: string;
  delay?: number;
  ease?: "easeIn" | "easeOut" | "easeInOut";
  duration?: number;
  staggerStart?:
    | number
    | "start"
    | "center"
    | "end"
    | "edges"
    | "random"
    | [number, number];
  rotate?: number;
  stagger?: number;
  start?: boolean;
  y?: number | string;
  absolute?: boolean;
}

const easingFunctions: Record<string, gsap.EaseFunction> = {
  easeIn: Power3.easeIn,
  easeOut: Power3.easeOut,
  easeInOut: Power3.easeInOut,
};

export const AnimLetters = ({
  string,
  y = 400,
  rotate = 0,
  delay = 0.4,
  ease = "easeOut",
  duration = 0.45,
  stagger = 0.02,
  staggerStart = "start",
  start = true,
}: Props) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const letters = useRef<(HTMLSpanElement | null)[]>([]);

  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    gsap.set(letters.current, { y: y, rotation: rotate });
    tl.current = gsap.timeline({ paused: true });
    tl.current
      // PHASE 1
      .to(letters.current, {
        y: 0,
        rotation: 0,
        ease: easingFunctions[ease],
        duration: duration,
        stagger: { each: stagger, from: staggerStart },
        delay: delay,
      });

    tl.current.tweenTo(0);
  }, []);

  useEffect(() => {
    if (start) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [start]);

  const words = string?.split(" ");

  return (
    <span
      ref={containerRef}
      key={string}
      className="overflow-hidden inline-block align-bottom"
    >
      {words?.map((word) => (
        <span key={word}>
          {[...word].map((letter, idx) => (
            <span
              key={`letter${idx}`}
              ref={(el) => letters.current.push(el)}
              className={`inline-block`}
            >
              {letter}
            </span>
          ))}{" "}
        </span>
      ))}
    </span>
  );
};
