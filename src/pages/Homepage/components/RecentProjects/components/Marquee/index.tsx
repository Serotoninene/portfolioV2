import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const Marquee = () => {
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
        speed = 0.1 + Math.abs(self.getVelocity()) / 2000; // Adjust the speed based on the scroll velocity
      },
    });
  }, []);

  const projectTitles = new Array(3).fill(0);

  return (
    <div className="relative text-[80px] w-fit font-bold">
      <div ref={slider}>
        <h2>RECENT PROJECTS -&nbsp;</h2>
        {projectTitles.map((_, index) => (
          <p
            key={index}
            className={`absolute left-[${(index + 1) * 100}%] top-0 w-full`}
          >
            RECENT PROJECTS -
          </p>
        ))}
      </div>
    </div>
  );
};
