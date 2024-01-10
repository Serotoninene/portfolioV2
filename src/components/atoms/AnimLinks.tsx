import { useLayoutEffect, useRef } from "react";
import gsap, { Power4 } from "gsap";
import { splitWords } from "../../utils";

type Props = {
  children: string;
  href?: string;
  onClick?: () => void;
};

export const AnimLink = ({ children, href, onClick }: Props) => {
  const ref = useRef<HTMLSpanElement[]>([]);
  const shadowRef = useRef<HTMLSpanElement[]>([]);
  const tl = useRef<gsap.core.Timeline>();

  const handleMouseEnter = () => {
    tl.current?.play();
  };

  const handleMouseLeave = () => {
    tl.current?.reverse();
  };

  const handleClick = () => {
    onClick?.();
    tl.current?.seek(0);
  };

  useLayoutEffect(() => {
    gsap.set(shadowRef.current, {
      yPercent: 120,
    });

    tl.current = gsap.timeline({ paused: true });

    tl.current.to(ref.current, {
      yPercent: -100,
      stagger: 0.02,
      ease: Power4.easeOut,
    });

    tl.current.to(
      shadowRef.current,
      {
        yPercent: 0,
        stagger: 0.02,
        ease: Power4.easeOut,
      },
      "<"
    );

    return () => {
      tl.current?.kill();
    };
  });

  if (!href)
    return (
      <button
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {splitWords(children, ref, "visible")}
        <span className="absolute top-0 left-0">
          {splitWords(children, shadowRef, "visible")}
        </span>
      </button>
    );

  return (
    <a
      className="relative overflow-hidden"
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {splitWords(children, ref, "visible")}
      <span className="absolute top-0 left-0">
        {splitWords(children, shadowRef, "visible")}
      </span>
    </a>
  );
};
