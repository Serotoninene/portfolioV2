import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useHover } from "./animations/useHover";

import { useIsMenuOpen } from "../../../../../store/useIsMenuOpen";
import { splitWords } from "../../../../../utils";

type SectionProps = {
  idx: number;
  name: string;
  href?: string;
  isIncoming?: boolean;
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

export const Section = ({ idx, name, href, isIncoming }: SectionProps) => {
  const arrows = useRef<HTMLDivElement[]>([]);
  const lineShadow = useRef<HTMLDivElement>(null);
  const hoverTl = useHover(arrows, lineShadow);
  const { setIsMenuOpen } = useIsMenuOpen();
  const navigate = useNavigate();

  const redirectToSection = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isIncoming) return;

    setIsMenuOpen(false);
    if (!href) return;

    if (href?.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
  };

  return (
    <li
      className="menu-section relative flex justify-between max-w-[480px] pb-[20px]"
      style={{ cursor: isIncoming ? "not-allowed" : "pointer" }}
      onClick={redirectToSection}
      onMouseEnter={() => hoverTl.current?.play()}
      onMouseLeave={() => hoverTl.current?.reverse()}
    >
      <div className="flex pl-2 gap-[24px] md:gap-[80px]">
        <p className="menu-section__idx italic font-thin overflow-hidden text-[12px] md:text-base md:pt-[0.5px]">
          {idx.toString().padStart(2, "0")}
        </p>
        <h3 className="relative menu-section__title font-medium leading-[100%] text-[20px] md:text-[36px]">
          {splitWords(name)}
          {isIncoming && (
            <span className="text-xs absolute left-full bottom-0 ml-2 md:bottom-2">
              (INCOMING)
            </span>
          )}
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
