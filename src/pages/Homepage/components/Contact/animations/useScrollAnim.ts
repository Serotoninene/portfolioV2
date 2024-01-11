import gsap, { Power0 } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { useColorContext } from "../../../../../hooks/useColorContext";

export const useScrollAnim = (
  container: React.MutableRefObject<HTMLElement | null>,
  backgroundTl: React.MutableRefObject<gsap.core.Timeline | undefined>
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
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return containerTl;
};
