import { Fragment, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  string?: string;
  delay?: number;
  ease?: string;
  duration?: number;
  stagger?: number;
  start?: boolean;
  leading?: string;
}

export const AnimWords = ({
  string,
  delay = 0.4,
  ease = "power3.out",
  duration = 0.45,
  stagger = 0.2,
  start = true,
}: Props) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (start && containerRef.current) {
      const targets = gsap.utils.toArray(".word");
      // Set initial state immediately to prevent flash

      gsap.to(targets, {
        y: 0,
        ease: ease,
        duration: duration,
        stagger: stagger,
        delay: delay,
      });
    }
  }, [start, delay, ease, duration, stagger]);

  const words = string?.split(" ");

  return (
    <span ref={containerRef} id={string} className="inline-block align-bottom">
      {words?.map((word, idx) => (
        <Fragment key={`${word}-${string}-${idx}`}>
          <span
            key={`${word}-${string}-${idx}`}
            className="overflow-hidden  inline-block align-bottom"
          >
            <span className="inline-block word translate-y-[120%]">{word}</span>{" "}
          </span>{" "}
        </Fragment>
      ))}
      &nbsp;
    </span>
  );
};
