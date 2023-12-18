import { RefObject, useEffect } from "react";
import gsap from "gsap";

type Props = {
  ref: RefObject<HTMLDivElement>;
};

export const useScrollShrink = ({ ref }: Props) => {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(ref.current, {
      opacity: 1,
      delay: 1.5,
    });
    tl.to(ref.current, {
      scaleY: 0,
      scrollTrigger: {
        start: "top top",
        end: "bottom bottom", // correct end
        scrub: true,
      },
    });

    return () => {
      tl.kill();
    };
  }, []);
};
