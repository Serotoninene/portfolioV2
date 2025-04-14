import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { splitWords } from "../../../../utils";

export const StickyText = () => {
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  const phrase =
    "From Paris, France. Creative developer driven by a love for crafting digital magic. With a passion for innovative solutions, I transform ideas into captivating online experiences. ";

  useGSAP(
    () => {
      gsap.set("span", { opacity: 0.3 });
      gsap.set("#Sticky-Text__block", { yPercent: -120, rotate: 45 });
      gsap.set("#Sticky-Text__line", { scaleX: 0 });

      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top center",
          end: "bottom center",
          scrub: 0.7,
        },
      });

      tl.current.to("span", {
        opacity: 1,
        stagger: 0.05,
      });
      tl.current.to(
        "#Sticky-Text__block",
        {
          yPercent: 0,
          rotate: 0,
          duration: 5,
        },
        "<"
      );
      tl.current.to(
        "#Sticky-Text__line",
        {
          scaleX: 1,
          duration: 10,
        },
        "<"
      );

      tl.current.to("#Sticky-Text__line", {
        scaleX: 0,
        duration: 2,
        xPercent: 100,
      });
    },
    { scope: container }
  );

  return (
    <div
      id="StickyText"
      ref={container}
      className="relative h-[80vh] px-5 mt-24 mb-[10vh] md:h-[200vh]"
    >
      <div className="sticky top-[64px] flex justify-end items-end w-full">
        <div className="text-[24px] md:text-[32px] font-medium text-right leading-[150%] w-[640px]">
          {splitWords(phrase)}
        </div>
      </div>

      <div className="hidden absolute bottom-0 left-0 items-end gap-6 w-screen pl-5 pr-20 pb-5 md:flex ">
        <div className="overflow-hidden">
          <div id="Sticky-Text__block" className="w-6 aspect-square bg-dark" />
        </div>
        <div
          id="Sticky-Text__line"
          className="h-[1px] w-full bg-dark origin-left"
        />
      </div>
    </div>
  );
};
