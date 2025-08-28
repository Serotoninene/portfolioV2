import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";

export const LenisContext = createContext<{
  lenis: React.MutableRefObject<Lenis | undefined> | null;
}>({
  lenis: null,
});

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenis = useRef<Lenis>();

  const value = useMemo(
    () => ({
      lenis,
    }),
    [lenis]
  );

  useEffect(() => {
    lenis.current = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 10000,
    });

    lenis.current.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.current?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }, [lenis.current]);

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
};

export const useLenis = () => {
  const context = useContext(LenisContext);

  if (context === undefined) {
    throw new Error("useLoadingContext must be used within a LoadingProvider");
  }
  return context;
};
