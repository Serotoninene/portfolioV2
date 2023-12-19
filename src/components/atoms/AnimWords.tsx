import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  string?: string;
  delay?: number;
  ease?: string;
  duration?: number;
  stagger?: number;
  start?: boolean;
  fontWeight?: string;
  leading?: string;
  absolute?: boolean;
}

export const AnimWords = ({
  string,
  delay = 0.4,
  ease = "power3.out",
  duration = 0.45,
  stagger = 0.2,
  start = true,
  fontWeight = "font-normal",
  absolute,
}: Props) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (start && containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
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
    <span
      ref={containerRef}
      key={string}
      id={string}
      className={`${absolute ? "absolute w-[100px]" : ""}
      overflow-hidden inline-block align-bottom`}
    >
      {words?.map((word) => (
        <span
          key={`${word}-${string}`}
          className={`${fontWeight} overflow-hidden inline-block align-bottom`}
        >
          {word}
        </span>
      ))}
    </span>
  );
};
