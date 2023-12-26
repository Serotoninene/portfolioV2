import { useLayoutEffect, useRef } from "react";

import gsap, { Power0 } from "gsap";
import { Contact } from "..";
import { useColorContext } from "../../../../hooks/useColorContext";

export const ExpendingSquare = () => {
  const container = useRef<HTMLDivElement>(null);
  const square = useRef<HTMLDivElement>(null);
  const { colors } = useColorContext();

  const tl = useRef<gsap.core.Timeline>();

  useLayoutEffect(() => {
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        markers: true,
        scrub: true,
        // set a easing of none
      },
      defaults: {
        ease: Power0.easeNone,
      },
    });

    tl.current.to(square.current, {
      scaleX: 1,
      scaleY: 1,
    });

    tl.current.to(
      "#Layout",
      {
        backgroundColor: colors.dark,
        color: colors.light,
      },
      "<"
    );

    tl.current.to("#ScrollIndicator div", {
      backgroundColor: colors.light,
    });

    return () => {
      tl.current?.kill();
    };
  }, []);
  return (
    <div ref={container} className="h-[200vh]">
      <div
        id="ExpendingSquare"
        className="h-screen sticky top-0 flex justify-center items-center border-4 border-red-400"
      >
        <div
          ref={square}
          className="h-[--fullScreen] scale-x-[0.2] scale-y-75 w-screen"
          style={{ background: colors.dark }}
        ></div>
      </div>
      <Contact />
    </div>
  );
};
