import { useLayoutEffect, useRef } from "react";

import gsap, { Power0 } from "gsap";
import { Contact } from "..";
import { useColorContext } from "../../../../hooks/useColorContext";

export const ExpendingSquare = () => {
  const container = useRef<HTMLDivElement>(null);
  const square = useRef<HTMLDivElement>(null);
  const { colors } = useColorContext();

  const mainTl = useRef<gsap.core.Timeline>();
  const backgroundTl = useRef<gsap.core.Timeline>();
  const contactTl = useRef<gsap.core.Timeline>(null);

  useLayoutEffect(() => {
    backgroundTl.current = gsap.timeline({ paused: true });
    backgroundTl.current.to("#Layout", {
      backgroundColor: colors.dark,
      duration: 0,
    });

    mainTl.current = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        markers: true,
        scrub: true,
        pin: true,
        onLeave: () => {
          backgroundTl.current?.play();
        },
        onEnterBack: () => backgroundTl.current?.reverse(),
      },
      defaults: {
        ease: Power0.easeNone,
      },
    });

    mainTl.current.to(square.current, {
      scaleX: 1,
      scaleY: 1,
      onComplete: () => {
        console.log("complete");
        contactTl.current?.play();
      },
    });

    mainTl.current.to(
      "#Layout",
      {
        color: colors.light,
      },
      "<"
    );

    mainTl.current.to(
      "#ScrollIndicator div",
      {
        backgroundColor: colors.light,
      },
      "<"
    );

    mainTl.current.to("#Navbar", {
      borderColor: colors.light,

      onReverseComplete: () => {
        console.log("reverse");
        contactTl.current?.reverse();
      },
    });

    return () => {
      // mainTl.current?.kill();
      backgroundTl.current?.kill();
    };
  }, []);
  return (
    <div ref={container} className="h-[100vh]">
      <div
        id="ExpendingSquare"
        className="h-screen flex justify-center items-center border-4 border-red-400"
      >
        <div
          ref={square}
          className="h-[--fullScreen] scale-x-[0.2] scale-y-75 w-screen"
          style={{ background: colors.dark }}
        >
          <Contact tl={contactTl} />
        </div>
      </div>
    </div>
  );
};
