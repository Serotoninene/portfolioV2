import { useGSAP } from "@gsap/react";
import gsap, { Power3 } from "gsap";
import { useRef, useState } from "react";

export const useIntro = ({ containerRef }) => {
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [isRevealCenter, setIsRevealCenter] = useState(false);

  useGSAP(
    () => {
      const hasAlreadyLoaded = sessionStorage.getItem("isVisited") === "true";

      gsap.set(["#Logo_Alex", "#Center_Navbar", "#Menu_Button"], {
        opacity: 0,
      });

      gsap.set(containerRef.current, { scaleX: 0 });

      tl.current = gsap.timeline({
        defaults: { ease: Power3.easeOut },
        delay: !hasAlreadyLoaded ? 0.5 : 0,
        paused: true,
      });

      tl.current.to(containerRef.current, {
        scaleX: 1,
        duration: 1,
        ease: Power3.easeInOut,
      });

      tl.current.fromTo(
        "#Logo_Alex",
        {
          opacity: 1,
          scaleX: 0,
        },
        { scaleX: 1 }
      );
      tl.current.to(
        "#Menu_Button",
        {
          opacity: 1,
          duration: 0.5,
        },
        "<"
      );
      tl.current.to(
        "#Center_Navbar",
        {
          opacity: 1,
          onStart: () => setIsRevealCenter(true),
        },
        "<+=1"
      );
    },
    { scope: containerRef }
  );

  return { tl, isRevealCenter };
};
