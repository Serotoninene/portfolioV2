import { useEffect, useRef } from "react";

import { AnimLetters, AnimLink } from "../../atoms";
import { useIntro } from "./animations";
import { getFormattedDate, splitWords } from "../../../utils";
import { useScrollbar } from "@14islands/r3f-scroll-rig";

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
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type SectionProps = {
  idx: number;
  name: string;
  href?: string;
};

const Section = ({ idx, name, href }: SectionProps) => {
  const redirectToSection = () => {
    console.log(href);
  };

  return (
    <li
      className="menu-section relative flex justify-between max-w-[480px] pb-[20px]"
      onClick={redirectToSection}
    >
      <div className="flex gap-[80px] pl-2">
        <p className="menu-section__idx italic font-thin pt-[0.5px] overflow-hidden">
          {idx.toString().padStart(2, "0")}
        </p>
        <h3 className="menu-section__title text-[36px] font-medium leading-[100%]">
          {splitWords(name)}
        </h3>
      </div>
      <div className="overflow-hidden">
        <div className="menu-section__arrow pt-[5px]">
          <Arrow />
        </div>
      </div>
      {/* line */}
      <div className="menu-section__line absolute bottom-0 left-0 right-0 h-[0.5px] bg-secondary-400 origin-left" />
    </li>
  );
};

const sections = [
  { idx: 1, name: "WORK" },
  { idx: 2, name: "EXPERIMENTS" },
  { idx: 3, name: "ABOUT" },
  { idx: 4, name: "CONTACT ME" },
];

const coordonnees = [
  {
    name: "mail",
    value: "pujol.alexandre@hotmail.fr",
  },
  {
    name: "phone",
    value: "+ 33 6 03 53 11 63",
  },
  {
    name: "address",
    value: "51 TER rue Piat",
    extra: "75020 - Paris",
  },
];

export const Menu = ({ isMenuOpen, setMenuOpen }: Props) => {
  const container = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const formattedDate = getFormattedDate();

  const scroll = useScrollbar();

  const disableScroll = () => {
    document.body.classList.add("stop-scrolling");
    scroll.__lenis?.stop();
  };

  const enableScroll = () => {
    document.body.classList.remove("stop-scrolling");
    scroll.__lenis?.start();
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  const introTl = useIntro(container);

  // trigger the animation when the menu open/ close
  useEffect(() => {
    if (isMenuOpen) {
      introTl.current?.play();
      disableScroll();
    } else {
      introTl.current?.timeScale(2).reverse();
      enableScroll();
    }
  }, [isMenuOpen, scroll.__lenis]);

  return (
    <div
      ref={container}
      id="Menu"
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

          <div className="font-medium ">
            <AnimLink onClick={closeMenu}>Close</AnimLink>
          </div>
        </div>
        {/* une ligne  */}
        <div className="grid sm:grid-cols-3 gap-5">
          {/* sections */}
          <ul className="flex flex-col gap-6 sm:col-span-2">
            {sections.map((section, idx) => (
              <Section {...section} key={idx} />
            ))}
          </ul>
          {/* coordonnées */}
          <ul>
            {coordonnees.map((coord, idx) => (
              <li key={idx} className="menu-coordinate mb-2 font-medium">
                <h5 className="font-light italic text-sm mb-0.5">
                  {coord.name}
                </h5>
                <p>{coord.value} </p>
                <p>{coord.extra}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="menu-tagline">
        <img src="./assets/Icons/Menu_Text.svg" className=" w-full" />
      </div>
    </div>
  );
};
