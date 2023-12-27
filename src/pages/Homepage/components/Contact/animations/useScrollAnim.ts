import { useRef, useEffect } from "react";
import { useColorContext } from "../../../../../hooks/useColorContext";
import gsap, { Power0 } from "gsap";

export const useScrollAnim = (
  container: React.MutableRefObject<HTMLElement | null>,
  backgroundTl: React.MutableRefObject<gsap.core.Timeline | undefined>
) => {
  const { colors } = useColorContext();
  const containerTl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    containerTl.current = gsap.timeline({
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
        onEnterBack: () => {
          backgroundTl.current?.reverse();
        },
      },
      defaults: {
        ease: Power0.easeNone,
      },
    });

    containerTl.current.to("#Contact", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });

    containerTl.current.to(
      "#Layout",
      {
        color: colors.light,
      },
      "<"
    );

    containerTl.current.to(
      "#ScrollIndicator div",
      {
        backgroundColor: colors.light,
      },
      "<"
    );

    containerTl.current.to("#Navbar", {
      borderColor: colors.light,
    });
  }, []);

  return containerTl;
};
