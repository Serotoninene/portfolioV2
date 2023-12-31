import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const Marquee = () => {
  const slider = React.useRef<HTMLDivElement[]>([]);

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

  const projectTitles = new Array(10).fill(0);

  return (
    <div className="relative text-[160px] italic w-fit font-bold">
      <h2 ref={(e) => e && slider.current.push(e)}>RECENT PROJECTS -&nbsp;</h2>

      <p
        ref={(e) => e && slider.current.push(e)}
        className={`absolute left-[100%] top-0 w-full whitespace-nowrap`}
      >
        RECENT PROJECTS - RECENT PROJECTS
      </p>
    </div>
  );
};
