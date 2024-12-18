import { RefObject, useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  mainContainer: RefObject<HTMLDivElement>;
  videoContainer: RefObject<HTMLDivElement>;
};

export const useAnimation = ({ mainContainer, videoContainer }: Props) => {
  const tl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    gsap.set(videoContainer.current, {
      clipPath: "polygon(20% 40%, 80% 40%, 95% 60%, 5% 60%)",
    });

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainer.current,
        start: "top bottom",
        end: "bottom bottom",

        scrub: 0.9,
      },
    });

    tl.current.to(videoContainer.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });

    return () => {
      tl.current?.kill();
    };
  }, []);
};
