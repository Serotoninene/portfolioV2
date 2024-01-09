import { useEffect, useRef } from "react";
import gsap from "gsap";
import { splitWords } from "../../../../utils";

export const StickyText = () => {
  const container = useRef<HTMLDivElement>(null);
  const letters = useRef<HTMLSpanElement[]>([]);
  const block = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  const phrase =
    "Creative developer driven by a love for crafting digital magic. With a passion for innovative solutions, I transform ideas into captivating online experiences. ";

  useEffect(() => {
    gsap.set(letters.current, { opacity: 0.1 });
    gsap.set(block.current, { yPercent: -120, rotate: 45 });
    gsap.set(line.current, { scaleX: 0 });
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "bottom bottom",
        end: "bottom center",
        pin: true,
        markers: true,
        pinSpacing: true,
        scrub: 0.7,
      },
    });

    tl.current.to(letters.current, {
      opacity: 1,
      stagger: 0.05,
    });
    tl.current.to(
      block.current,
      {
        yPercent: 0,
        rotate: 0,
        duration: 5,
      },
      "<"
    );
    tl.current.to(
      line.current,
      {
        scaleX: 1,
        duration: 10,
      },
      "<"
    );

    tl.current.to(line.current, {
      scaleX: 0,
      duration: 2,
      xPercent: 100,
    });

    return () => {
      tl.current?.kill();
    };
  }, []);

  return (
    <div
      ref={container}
      className="relative flex items-center w-full h-[50vh] px-5 sm:mt-10 mb-[20vh]"
    >
      <div className="flex justify-between items-end w-full">
        <p className="self-end font-thin italic text-sm">Lorem Ipsum</p>
        <div className="text-xl font-medium text-right leading-[150%] w-[400px]">
          {splitWords(phrase, letters)}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 flex items-end gap-6 w-screen pl-5 pr-20 pb-5">
        <div className="overflow-hidden">
          <div ref={block} className=" w-6 aspect-square bg-dark" />
        </div>
        <div ref={line} className="h-[1px] w-full bg-dark origin-left" />
      </div>
    </div>
  );
};
