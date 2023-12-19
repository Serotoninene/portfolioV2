import React, { useEffect, useRef, useState } from "react";
import gsap, { Power3 } from "gsap";
type Props = {
  containerRef: React.RefObject<HTMLElement>;
  logoRef: React.RefObject<HTMLElement>;
  middleRef: React.RefObject<HTMLElement>;
  menuRef: React.RefObject<HTMLElement>;
};

export const useIntro = ({
  containerRef,
  logoRef,
  middleRef,
  menuRef,
}: Props) => {
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [isRevealCenter, setIsRevealCenter] = useState(false);

  useEffect(() => {
    gsap.set([logoRef.current, middleRef.current, menuRef.current], {
      opacity: 0,
    });
    gsap.set(containerRef.current, { scaleX: 0 });
    tl.current = gsap.timeline({
      defaults: { ease: Power3.easeOut },
      delay: 1,
    });
    tl.current.to(containerRef.current, {
      scaleX: 1,
      duration: 1,
      ease: Power3.easeInOut,
    });
    tl.current.fromTo(
      logoRef.current,
      {
        opacity: 1,
        scaleX: 0,
      },
      { scaleX: 1 }
    );
    tl.current.to(middleRef.current, {
      opacity: 1,
      onStart: () => setIsRevealCenter(true),
    });
    tl.current.to(menuRef.current, {
      opacity: 1,
      duration: 0.5,
      delay: 0.6,
    });
  }, []);

  return { isRevealCenter };
};
