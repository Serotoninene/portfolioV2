import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export const useAnimation = () => {
  const tl = useRef<gsap.core.Timeline>();

  useGSAP(() => {
    gsap.set("#showreal__video-container", {
      clipPath: "polygon(20% 40%, 80% 40%, 95% 60%, 5% 60%)",
    });

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#showreal__main-container",
        start: "top bottom",
        end: "bottom bottom",

        scrub: 0.9,
      },
    });

    tl.current.to("#showreal__video-container", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });
  });
};
