import { useRef } from "react";
import { splitWords } from "../../../../../utils";
import { useHover } from "./animations/useHover";

type SectionProps = {
  idx: number;
  name: string;
  href?: string;
};

const Arrow = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 16L16 1M16 1H4.75M16 1V12.25"
      stroke="#ebe9e5"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Section = ({ idx, name, href }: SectionProps) => {
  const arrows = useRef<HTMLDivElement[]>([]);
  const lineShadow = useRef<HTMLDivElement>(null);
  const hoverTl = useHover(arrows, lineShadow);

  const redirectToSection = () => {
    console.log(href);
  };

  return (
    <li
      className="menu-section relative flex justify-between max-w-[480px] pb-[20px]"
      onClick={redirectToSection}
      onMouseEnter={() => hoverTl.current?.play()}
      onMouseLeave={() => hoverTl.current?.reverse()}
    >
      <div className="flex pl-2 gap-[32px] md:gap-[80px]">
        <p className="menu-section__idx italic font-thin overflow-hidden text-[12px] md:text-base md:pt-[0.5px]">
          {idx.toString().padStart(2, "0")}
        </p>
        <h3 className="menu-section__title font-medium leading-[100%] text-[20px] md:text-[36px]">
          {splitWords(name)}
        </h3>
      </div>
      <div className="relative h-fit overflow-hidden">
        <div
          ref={(e) => arrows.current.push(e as HTMLDivElement)}
          className="menu-section__arrow pt-[5px]"
        >
          <Arrow />
        </div>
        <div
          ref={(e) => arrows.current.push(e as HTMLDivElement)}
          className="absolute top-full right-full menu-section__arrow pt-[5px]"
        >
          <Arrow />
        </div>
      </div>
      {/* line */}

      <div className="menu-section__line absolute bottom-0 left-0 right-0 h-[0.5px] bg-secondary-400 bg-opacity-20 origin-left" />
      <div
        ref={lineShadow}
        className="menu-section__line__shadow absolute bottom-0 left-0 right-0 h-[0.5px] bg-secondary-400 origin-left scale-x-0"
      />
    </li>
  );
};
