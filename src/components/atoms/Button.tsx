import gsap, { Power3 } from "gsap";
import { useEffect, useRef, useState } from "react";
import { useColorContext } from "../../hooks/useColorContext";
import { splitWords } from "../../utils";

interface Props {
  children: string;
}

export const Button = ({ children }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { colors } = useColorContext();

  const buttonLetters = useRef<HTMLSpanElement[]>([]);
  const buttonLettersShadow = useRef<HTMLSpanElement[]>([]);
  const whiteBackground = useRef<HTMLDivElement>(null);

  const hoveredTl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    hoveredTl.current = gsap.timeline({ paused: true });

    gsap.set(buttonLetters.current, {
      y: "120%",
    });
    gsap.set(whiteBackground.current, {
      rotate: 45,
      yPercent: 100,
      xPercent: -50,
    });

    hoveredTl.current.to(buttonLetters.current, {
      duration: 0.5,
      y: "-120%",
      stagger: 0.02,
      ease: Power3.easeOut,
    });
    hoveredTl.current.to(
      buttonLettersShadow.current,
      {
        y: "-120%",
        stagger: 0.02,
        ease: Power3.easeOut,
      },
      "<"
    );
    hoveredTl.current.to(
      whiteBackground.current,
      {
        rotate: 0,
        yPercent: 0,
        xPercent: 0,
        ease: Power3.easeOut,
      },
      "<"
    );

    gsap.to(buttonLetters.current, {
      y: 0,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: buttonLetters.current,
        start: "bottom top",
        markers: true,
      },
    });
  }, []);

  useEffect(() => {
    if (isHovered) {
      hoveredTl.current?.play();
    } else {
      hoveredTl.current?.reverse();
    }
  }, [isHovered]);

  return (
    <div
      className={`button relative overflow-hidden inline-block border border-[${colors.light}] rounded-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={whiteBackground}
        className="absolute h-20 w-[200%] top-[0] left-0"
        style={{ background: colors.light }}
      />
      <button className="relative my-2 mx-4">
        {splitWords(children, buttonLetters, "visible")}
        <span
          className="absolute top-[120%] left-0"
          style={{ color: colors.dark }}
        >
          {splitWords(children, buttonLettersShadow, "visible")}
        </span>
      </button>
    </div>
  );
};
