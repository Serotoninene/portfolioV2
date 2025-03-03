import gsap from "gsap";
import { useEffect, useRef } from "react";

import { AnimLetters, AnimWords } from "../../../../components/atoms";
import { useHasLoadedStore } from "../../../../store/useHasLoaded";
import { HeroThree } from "./components";

const HeroText = () => {
  const container = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const paragraph = useRef<HTMLParagraphElement>(null);

  const tl = useRef<gsap.core.Timeline>();
  const { hasLoaded, setHasLoaded } = useHasLoadedStore();

  useEffect(() => {
    if (sessionStorage.getItem("hasAlreadyLoaded") === "true") {
      setHasLoaded(true);
    }
  }, []);

  // scroll anim
  useEffect(() => {
    if (!paragraph.current || !title.current) return;
    gsap.set(title.current, { yPercent: 0 });
    gsap.set(paragraph.current, { yPercent: 0 });

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    tl.current.to(
      title.current,

      {
        yPercent: -100,
      }
    );

    const paragraphWords = paragraph.current?.querySelectorAll("span");
    tl.current.fromTo(
      paragraphWords,
      {
        yPercent: 0,
      },
      {
        yPercent: -120,
        stagger: 0.01,
      },
      "<"
    );

    return () => {
      tl.current?.kill();
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 justify-between items-center h-full pt-[128px] pb-[64px] md:px-0 md:justify-center">
      <h1
        ref={title}
        className="font-extrabold text-[56px] leading-[100%] text-center z-10 md:block md:text-[160px]"
      >
        <div className="hidden md:block">
          <AnimLetters string="HI, I'M" start={hasLoaded} />
          <br />
          <AnimLetters string=" ALEX" start={hasLoaded} />
        </div>
        <div className="block md:hidden">
          <AnimLetters
            string="HI, I'M ALEX"
            // start={hasLoaded}
          />
        </div>
      </h1>

      <p
        ref={paragraph}
        className="text-center text-base font-base leading-[130%] px-6 sm:w-[360px] z-10"
      >
        <AnimWords
          string="I'm a passionate creative developer dedicated to turning ideas into
  immersive digital experiences. From elegant websites to interactive applications."
          stagger={0.01}
          delay={0.5}
          start={hasLoaded}
        />
      </p>
    </div>
  );
};

export const Hero = () => {
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      id="Hero"
      ref={container}
      className="relative h-screen z-20 text-black"
    >
      <HeroThree />
      <HeroText />
      <div className="absolute bottom-3 left-3  w-5 aspect-square bg-dark md:left-5" />
    </div>
  );
};
