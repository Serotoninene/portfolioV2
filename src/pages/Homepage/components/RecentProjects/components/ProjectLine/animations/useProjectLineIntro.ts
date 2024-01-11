import { useLayoutEffect, useRef } from "react";
import gsap, { Power3 } from "gsap";
type Props = {
  line: React.RefObject<HTMLDivElement>;
  numRef: React.RefObject<HTMLSpanElement[]>;
  titleRef: React.RefObject<HTMLSpanElement[]>;
  subtitleRef: React.RefObject<HTMLSpanElement[]>;
  arrow: React.RefObject<HTMLImageElement>;
};

export const useProjectLineIntro = ({
  line,
  numRef,
  titleRef,
  subtitleRef,
  arrow,
}: Props) => {
  const setInitialPositions = () => {
    gsap.set(line.current, {
      scaleX: 0,
    });
    gsap.set(numRef.current, {
      yPercent: -100,
      opacity: 0,
    });
    gsap.set(titleRef.current, {
      yPercent: -100,
      opacity: 0,
    });
    gsap.set(subtitleRef.current, {
      yPercent: -100,
      opacity: 0,
    });
    gsap.set(arrow.current, {
      yPercent: -100,
      xPercent: 100,
    });
  };

  const introTL = useRef<gsap.core.Timeline>();

  useLayoutEffect(() => {
    setInitialPositions();
    introTL.current = gsap.timeline({
      scrollTrigger: {
        trigger: line.current,
        start: "top 90%",
        // markers: true,
      },
      defaults: { ease: Power3.easeOut },
    });

    introTL.current.to(
      line.current,
      {
        scaleX: 1,
      },
      "<0.1"
    );
    introTL.current.to(
      numRef.current,
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.1,
      },
      "<0.1"
    );
    introTL.current.to(
      titleRef.current,
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.01,
      },
      "<0.01"
    );
    introTL.current.to(
      subtitleRef.current,
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.005,
      },
      "<0.2"
    );
    introTL.current.to(arrow.current, {
      yPercent: 0,
      xPercent: 0,
    });
  }, []);
};
