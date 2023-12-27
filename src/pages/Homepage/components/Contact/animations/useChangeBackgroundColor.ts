// useChangeBackgroundColor.ts
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useColorContext } from "../../../../../hooks/useColorContext";

export const useChangeBackgroundColor = () => {
  const { colors } = useColorContext();

  const backgroundTl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    backgroundTl.current = gsap.timeline({ paused: true });
    backgroundTl.current.to("#Layout", {
      backgroundColor: colors.dark,
      duration: 0,
    });

    return () => {
      backgroundTl.current?.kill();
    };
  }, []);

  return backgroundTl;
};
