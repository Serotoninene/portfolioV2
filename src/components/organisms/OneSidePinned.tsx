import { useRef, useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  sliderArray: string[];
};

gsap.registerPlugin(ScrollTrigger);

export const OneSidePinned = ({ sliderArray }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const leftSide = useRef<HTMLDivElement>(null);
  const rightSide = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftSide.current,
      snap: 1 / (sliderArray.length - 1),
    });

    rightSide.current.forEach((panel: HTMLDivElement | null) => {
      gsap.from(panel, {
        scrollTrigger: {
          trigger: panel,
        },
      });
    });
  }, []);

  return (
    <div
      ref={ref}
      className="bg-blue-200 flex"
      style={{
        height: sliderArray.length * 100 + "vh",
      }}
    >
      <div
        ref={leftSide}
        className="bg-red-300 h-screen w-1/2 flex justify-center items-center"
      >
        STICKY PART
      </div>
      <div className="w-1/2">
        {sliderArray.map((color, idx) => (
          <div
            key={color}
            ref={(e) => (rightSide.current[idx] = e)}
            className="h-screen border border-red-400 w-full"
            style={{
              background: color,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};
