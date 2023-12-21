import { useEffect, useRef } from "react";
import gsap from "gsap";
import { splitWords } from "../../../utils";

export const StickyText = () => {
  const container = useRef<HTMLDivElement>(null);
  const letters = useRef<HTMLSpanElement[]>([]);
  const tl = useRef<gsap.core.Timeline>();

  const phrase =
    "Creative developer driven by a love for crafting digital magic. With a passion for innovative solutions, I transform ideas into captivating online experiences. ";

  useEffect(() => {
    gsap.set(letters.current, { opacity: 0.1 });
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "200% top",
        pin: true,
        pinSpacing: true,
        scrub: true,
      },
    });

    tl.current.to(letters.current, {
      opacity: 1,
      stagger: 0.05,
    });
  }, []);

  return (
    <div
      ref={container}
      className="h-screen flex justify-center items-center sm:p-[160px] 2xl:p-[320px]  "
    >
      <div className="text-5xl font-medium text-center leading-[150%]">
        {splitWords(phrase, letters)}
      </div>
    </div>
  );
};
