import { useProgress } from "@react-three/drei";
import { MutableRefObject, useRef } from "react";
import { AnimLetters, AnimWords } from "../../../../components/atoms";
import { HeroThree, HeroTitle } from "./components";
import { UseCanvas, ScrollScene } from "@14islands/r3f-scroll-rig";

export const Hero = () => {
  const title = useRef<HTMLHeadingElement>(null);

  const { progress } = useProgress();
  const hasLoaded = progress === 100;

  return (
    <div
      id="Hero"
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
      <UseCanvas>
        <ScrollScene track={title as MutableRefObject<HTMLElement>}>
          {(props) => <HeroTitle title={title} scrollScene={props} />}
        </ScrollScene>
      </UseCanvas>

      <p className="text-center text-base font-base leading-[130%] sm:w-[360px] z-10">
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
