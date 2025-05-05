import gsap, { Power4 } from "gsap";
import { RefObject, useLayoutEffect, useRef } from "react";
import { useHasLoadedStore } from "../../../../store/useHasLoaded";

export const useEndOfLoading = (
  ref: RefObject<HTMLDivElement>,
  container: RefObject<HTMLDivElement>
) => {
  const tl = useRef<gsap.core.Timeline>();
  const { setHasLoaded } = useHasLoadedStore();

  // End of the loading animation
  useLayoutEffect(() => {
    if (!ref.current || !container.current) return;
    tl.current = gsap.timeline({
      defaults: {
        duration: 1,
        ease: Power4.easeOut,
      },

      paused: true,
      delay: 0.5,
    });

    const loadingLoops: HTMLElement[] = gsap.utils.toArray(".loading-loop");
    const length = loadingLoops.length;

    // Removes all the "LOADING" except the one in the center
    loadingLoops.forEach((loop, i) => {
      tl.current?.to(
        loop.children,
        {
          yPercent: Math.sign(i - length / 2 + 1) * 100,
          ease: Power4.easeOut,
          duration: 0.5,
          stagger: 0.3,
          onComplete: () => {
            setHasLoaded(true);
          },
        },
        "<0.03"
      );
    });

    // removes the "LOADING" in the center
    tl.current?.to(
      loadingLoops[3].children,
      {
        yPercent: 200,
        stagger: 0.3,
      },
      "<1"
    );
    tl.current.to(
      container.current,
      {
        yPercent: -100,
      },
      "<0.1"
    );

    return () => {
      tl.current?.kill();
    };
  }, []);

  return tl;
};
