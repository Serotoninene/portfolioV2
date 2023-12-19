import { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (start && containerRef.current) {
      const targets = gsap.utils.toArray(".word");
      gsap.fromTo(
        targets,
        { y: "120%" },
        {
          y: 0,
          ease: ease,
          duration: duration,
          stagger: stagger,
          delay: delay,
        }
      );
    }
  }, [start, delay, ease, duration, stagger]);

  const words = string?.split(" ");

  return (
    <span ref={containerRef} id={string} className="inline-block align-bottom">
      {words?.map((word, idx) => (
        <>
          <span
            key={`${word}-${string}-${idx}`}
            className="overflow-hidden  inline-block align-bottom"
          >
            <span className="inline-block word">{word}</span>{" "}
          </span>{" "}
        </>
      ))}
      &nbsp;
    </span>
  );
};
