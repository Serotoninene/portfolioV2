import { RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import { useProgress } from "@react-three/drei";

export const useScrollShrink = (
  lineRef: RefObject<HTMLElement>,
  textRef: RefObject<HTMLElement[]>
) => {
  const tl = useRef<gsap.core.Timeline>();
  const { progress } = useProgress();

  useEffect(() => {
    gsap.set(textRef.current, { y: "100%" });
    gsap.set(lineRef.current, { opacity: 0 });

    tl.current = gsap.timeline({ paused: true });
    tl.current.to(lineRef.current, {
      opacity: 1,
    });
    tl.current.to(textRef.current, { y: "0%", stagger: 0.03 }, "<");
    tl.current.fromTo(
      lineRef.current,
      {
        scaleY: 1,
      },
      {
        scaleY: 0,
        scrollTrigger: {
          start: "1% top",
          end: "bottom bottom",
          markers: true,
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

    if (progress === 100) {
      tl.current.play();
    }

    return () => {
      tl.current?.kill();
    };
  }, [progress]);
};
