import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";

export const ExpendingSquare = () => {
  const container = useRef<HTMLDivElement>(null);
  const square = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline>();

  useLayoutEffect(() => {
    gsap.set(square.current, {
      scaleX: 0.3,
      scaleY: 0.6,
    });

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        scrub: 1.1,
      },
    });

    tl.current.to(square.current, {
      scaleX: 1,
      scaleY: 1,
    });

    tl.current.to("#Layout", {
      backgroundColor: "#0B0B0B",
      color: "#ebe9e5",
    });

    tl.current.to("#ScrollIndicator div", {
      backgroundColor: "#ebe9e5",
    });
  }, []);
  return (
    <div
      ref={container}
      className="h-[--fullScreen]  flex justify-center items-center"
    >
      <div
        ref={square}
        className="h-[--fullScreen] w-screen bg-[#0B0B0B]"
      ></div>
    </div>
  );
};
