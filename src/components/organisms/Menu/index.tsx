import { useEffect, useRef } from "react";

import { AnimLetters, AnimLink } from "../../atoms";
import { useIntro } from "./animations";
import { getFormattedDate } from "../../../utils";

type Props = {
  isMenuOpen: boolean;
  setMenuOpen: (arg: boolean) => void;
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
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

type SectionProps = {
  idx: number;
  name: string;
  href?: string;
};

const Section = ({ idx, name, href }: SectionProps) => {
  return (
    <li className="relative flex justify-between w-2/6 pb-[24px]">
      <div className="flex gap-[96px] pl-2">
        <p className="italic font-thin pt-[0.5px]">
          {idx.toString().padStart(2, "0")}
        </p>
        <h3 className="text-[36px] font-medium leading-[100%]">{name}</h3>
      </div>
      <div className="pt-[5px]">
        <Arrow />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-secondary-400" />
    </li>
  );
};

const sections = [
  { idx: 1, name: "WORK" },
  { idx: 2, name: "EXPERIMENTS" },
  { idx: 3, name: "ABOUT" },
  { idx: 4, name: "CONTACT ME" },
];

export const Menu = ({ isMenuOpen, setMenuOpen }: Props) => {
  const container = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const formattedDate = getFormattedDate();

  const closeMenu = () => {
    setMenuOpen(false);
  };
  const introTl = useIntro(container);

  // trigger the animation when the menu open/ close
  useEffect(() => {
    if (isMenuOpen) introTl.current?.play();
    else introTl.current?.reverse();
  }, [isMenuOpen]);

  return (
    <div
      ref={container}
      className="fixed inset-0 flex flex-col justify-between px-5 py-3 text-[#ebe9e5] bg-dark bg-opacity-70 backdrop-blur z-20"
      style={{ pointerEvents: isMenuOpen ? "all" : "none" }}
    >
      <div>
        <div className="flex justify-between items-end pb-1 mb-[120px]">
          <h2
            ref={logoRef}
            className="bg-secondary-200 px-1 text-dark text-xl font-extrabold origin-left h-fit w-fit"
          >
            <AnimLetters string="ALEX" y="120%" delay={0} stagger={0.01} />
          </h2>
          <ul className="flex gap-10">
            <li>Portfolio 2024</li>
            <li>{formattedDate}</li>
          </ul>

          <div className="font-medium text-lg">
            <AnimLink onClick={closeMenu}>Close</AnimLink>
          </div>
        </div>
        <div>
          {/* une ligne  */}
          <ul className="flex flex-col gap-4">
            {sections.map((section, idx) => (
              <Section {...section} key={idx} />
            ))}
          </ul>
        </div>
      </div>
      <div>
        <img src="./assets/Icons/Menu_Text.svg" className="w-full" />
      </div>
    </div>
  );
};
