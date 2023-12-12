import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  sliderArray: string[];
};

export const HorizontalScroll = ({ sliderArray }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(ref.current, {
      xPercent: -100 * (sliderArray.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        scrub: 0.8,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
        snap: 1 / (sliderArray.length - 1),
      },
    });
  }, []);

  return (
    <section
      ref={ref}
      className="flex flex-nowrap opacity-80"
      style={{
        height: sliderArray.length * 100 + "vh",
      }}
    >
      {sliderArray.map((color, idx) => (
        <div
          className="panel "
          style={{ backgroundColor: color }}
          key={idx}
        ></div>
      ))}
    </section>
  );
};
