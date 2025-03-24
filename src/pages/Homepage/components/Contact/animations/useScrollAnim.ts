import gsap, { Power0 } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { useColorContext } from "../../../../../hooks/useColorContext";

export const useScrollAnim = (
  container: React.MutableRefObject<HTMLElement | null>
) => {
  const { colors } = useColorContext();
  const containerTl = useRef<gsap.core.Timeline>();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      containerTl.current = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          pinSpacing: true,
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
          color: colors.mainColor,
        },
        "<"
      );

      containerTl.current.to(
        "#ScrollIndicator div",
        {
          backgroundColor: colors.mainColor,
        },
        "<"
      );

      containerTl.current.to("#Navbar", {
        borderColor: colors.mainColor,
      });
    });

    return () => {
      ctx.revert();
    };
  }, [colors]);

  return containerTl;
};
