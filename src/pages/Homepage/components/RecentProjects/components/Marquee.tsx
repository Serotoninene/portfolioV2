import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const Marquee = () => {
  const ref = React.useRef<HTMLElement[]>([]);
  const slider = React.useRef<HTMLDivElement>(null);
  let xPercent = 0;
  let speed = 0.1;
  let direction = -1;

  const animation = () => {
    if (xPercent <= -100) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -100;
    }

    gsap.set(ref.current, { xPercent });
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
        speed = Math.abs(self.getVelocity()) / 2000; // Adjust the speed based on the scroll velocity
      },
    });
  }, []);

  return (
    <div className="relative text-[80px] w-fit font-bold">
      <div ref={slider}>
        <h2 ref={(e) => ref.current.push(e as HTMLElement)}>
          RECENT PROJECTS -&nbsp;
        </h2>
        <p
          ref={(e) => ref.current.push(e as HTMLElement)}
          className="absolute left-[100%] top-0 w-full"
        >
          RECENT PROJECTS -
        </p>
        <p
          ref={(e) => ref.current.push(e as HTMLElement)}
          className="absolute left-[200%] top-0 w-full"
        >
          RECENT PROJECTS -
        </p>
      </div>
    </div>
  );
};
