import gsap from "gsap";
import { RefObject, useEffect, useRef } from "react";

export const useScrollShrink = (
  lineRef: RefObject<HTMLElement>,
  textRef: RefObject<HTMLElement[]>
) => {
  const tl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    // gsap.set(lineRef.current, { scaleY: 0 });
    gsap.set(textRef.current, { y: "100%" });
    tl.current = gsap.timeline();
    tl.current.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
      }
    );
    tl.current.to(textRef.current, { y: "0%", stagger: 0.03 }, "<");
    tl.current.fromTo(
      lineRef.current,
      {
        scaleY: 1,
      },
      {
        scaleY: 0,
        scrollTrigger: {
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      }
    );
    tl.current.addLabel("hiding text");
    tl.current.to(textRef.current, {
      scrollTrigger: {
        end: "98% bottom",
        onLeave: () => {
          gsap.to(textRef.current, { y: "-100%", stagger: 0.03 });
        },
        onEnterBack: () => {
          gsap.to(textRef.current, { y: "0%", stagger: 0.03 });
        },
      },
    });

    return () => {
      tl.current?.kill();
    };
  }, []);
};
