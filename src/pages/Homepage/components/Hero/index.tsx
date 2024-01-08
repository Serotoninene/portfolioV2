import { useEffect, useRef } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";

import { AnimLetters, AnimWords } from "../../../../components/atoms";
import { HeroThree } from "./components";

export const Hero = () => {
  const container = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const paragraph = useRef<HTMLParagraphElement>(null);

  const tl = useRef<gsap.core.Timeline>();
  const { progress } = useProgress();
  const hasLoaded = progress === 100;

  useEffect(() => {
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    tl.current.to(title.current, {
      yPercent: -100,
    });

    if (!paragraph.current) return;

    const paragraphWords = paragraph.current?.querySelectorAll("span");
    tl.current.to(
      paragraphWords,
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
    <div
      id="Hero"
      ref={container}
      className="relative h-[--fullScreen] flex flex-col gap-6 justify-center items-center text-black "
    >
      <HeroThree />
      <h1
        ref={title}
        className="font-extrabold text-[160px] leading-[80%] text-center z-10"
      >
        <AnimLetters string="ALEX" start={hasLoaded} /> <br />{" "}
        <AnimLetters string="PUJOL" start={hasLoaded} />
      </h1>
      {/* <UseCanvas>
        <ScrollScene track={title as MutableRefObject<HTMLElement>}>
          {(props) => <HeroTitle scrollScene={props} isMobile={isMobile} />}
        </ScrollScene>
      </UseCanvas> */}

      <p
        ref={paragraph}
        className="text-center text-base font-base leading-[130%] sm:w-[360px] z-10"
      >
        <AnimWords
          string="I'm a passionate creative developer dedicated to turning ideas into
        immersive digital experiences. From elegant websites to interactive applications."
          stagger={0.01}
          delay={0.5}
          start={hasLoaded}
        />
      </p>
      <div className="absolute bottom-3 left-5 w-5 aspect-square bg-dark" />
    </div>
  );
};
