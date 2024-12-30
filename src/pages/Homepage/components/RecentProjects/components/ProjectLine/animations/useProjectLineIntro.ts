import gsap, { Power3 } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
type Props = {
  container: React.RefObject<HTMLAnchorElement>;
};

export const useProjectLineIntro = ({ container }: Props) => {
  const setInitialPositions = () => {
    gsap.set(".Project-Line__line", {
      scaleX: 0,
    });
    gsap.set(".Project-Line__index span", {
      yPercent: -100,
      opacity: 0,
    });
    gsap.set(".Project-Line__title span", {
      yPercent: -100,
      opacity: 0,
    });
    gsap.set(".Project-Line__subtitle span", {
      yPercent: -100,
      opacity: 0,
    });
    gsap.set(".Project-Line__arrow", {
      yPercent: -100,
      xPercent: 100,
    });
  };

  const introTL = useRef<gsap.core.Timeline>();

  useGSAP(
    () => {
      setInitialPositions();
      introTL.current = gsap.timeline({
        scrollTrigger: {
          trigger: ".Project-Line__line",
          start: "top 90%",
        },
        defaults: { ease: Power3.easeOut },
      });

      introTL.current.to(
        ".Project-Line__line",
        {
          scaleX: 1,
        },
        "<0.1"
      );
      introTL.current.to(
        ".Project-Line__index span",
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.1,
        },
        "<0.1"
      );
      introTL.current.to(
        ".Project-Line__title span",
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.01,
        },
        "<0.01"
      );
      introTL.current.to(
        ".Project-Line__subtitle span",
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.005,
        },
        "<0.2"
      );
      introTL.current.to(".Project-Line__arrow", {
        yPercent: 0,
        xPercent: 0,
      });
    },
    { scope: container }
  );
};
