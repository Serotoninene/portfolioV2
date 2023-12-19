import { AnimLetters, AnimWords } from "../../../../components/atoms";
import { HeroLogo } from "./components/HeroLogo";

export const Hero = () => {
  return (
    <div
      id="Hero"
      className="relative h-[--fullScreen] flex flex-col gap-6 justify-center items-center text-black "
    >
      <HeroLogo />
      <h1 className="font-extrabold text-[160px] leading-[80%] text-center z-10">
        <AnimLetters string="ALEX" /> <br /> <AnimLetters string="PUJOL" />
      </h1>

      <p className="text-center text-base font-medium leading-[130%] sm:w-[360px] z-10">
        <AnimWords
          string="I'm a passionate creative developer dedicated to turning ideas into
        immersive digital experiences. From elegant websites to interactive applications."
          stagger={0.01}
          delay={0.5}
        />
      </p>
      <div className="fixed bottom-3 left-5 w-5 aspect-square bg-dark"></div>
    </div>
  );
};
