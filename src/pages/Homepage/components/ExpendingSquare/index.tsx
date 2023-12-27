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
        pinSpacing: true,
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
        contactTl.current?.reverse();
      },
    });

    return () => {
      // mainTl.current?.kill(); <- if i kill the main tl it makes the whole component disappear when
      backgroundTl.current?.kill();
    };
  }, []);
  return (
    <div
      ref={container}
      id="ExpendingSquare"
      className="h-screen flex justify-center items-center border-4"
    >
      <div
        ref={square}
        className="h-screen absolute top-0 left-0 right-0 scale-x-[0.2] scale-y-75"
        style={{ background: colors.dark }}
      >
        <Contact tl={contactTl} />
      </div>
    </div>
  );
};
