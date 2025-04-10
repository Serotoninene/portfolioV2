import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface MarqueeProps {
  text?: string;
  speed?: number;
  direction?: 1 | -1;
}

export const Marquee = ({
  text = "RECENT PROJECT",
  speed = 0.2,
  direction = -1,
}: MarqueeProps) => {
  const slider = React.useRef<HTMLDivElement[]>([]);

  let xPercent = 0;

  const animation = () => {
    if (xPercent <= -100) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(slider.current, { xPercent });
    xPercent += speed * direction;
    requestAnimationFrame(animation);
  };

  useEffect(() => {
    requestAnimationFrame(animation);
    ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        direction = self.direction === 1 ? -1 : 1;
        // speed = 0.1 + Math.abs(self.getVelocity()) / 2000; // Adjust the speed based on the scroll velocity
      },
    });
  }, []);

  const textArray = new Array(5).fill(text);

  return (
    <div className="relative  italic w-fit font-semibold text-[32px] md:text-[64px] lg:text-[80px]">
      <h2 ref={(e) => e && slider.current.push(e)}>{text} -&nbsp;</h2>

      <p
        ref={(e) => e && slider.current.push(e)}
        className="absolute left-[100%] top-0 w-full whitespace-nowrap"
      >
        {textArray.join(" - ")}
      </p>
    </div>
  );
};
