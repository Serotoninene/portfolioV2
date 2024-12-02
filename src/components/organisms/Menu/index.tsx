import { useEffect, useRef } from "react";

import { AnimLetters, AnimLink } from "../../atoms";
import { useIntro } from "./animations";
import { getFormattedDate } from "../../../utils";
import { useScrollbar } from "@14islands/r3f-scroll-rig";
import { Section } from "./components/Section";
import { useIsMenuOpen } from "../../../store/useIsMenuOpen";

const sections = [
  { idx: 1, name: "WORK", href: "/#RecentProjects" },
  { idx: 2, name: "EXPERIMENTS", href: "/experiments", isIncoming: true },
  { idx: 3, name: "ABOUT", isIncoming: true },
  { idx: 4, name: "CONTACT ME", isIncoming: true },
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

export const Menu = () => {
  const container = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const { isMenuOpen, setIsMenuOpen } = useIsMenuOpen();
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
    setIsMenuOpen(false);
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
      className="fixed inset-0 flex flex-col justify-between px-5 py-3 text-[#ebe9e5] bg-dark bg-opacity-70 backdrop-blur z-30 "
      style={{ pointerEvents: isMenuOpen ? "all" : "none" }}
    >
      <div>
        {/* HEADER */}
        <div className="flex justify-between items-end pb-1 mb-[120px]">
          <h2
            ref={logoRef}
            className="bg-secondary-200 px-1 text-dark text-xl font-extrabold origin-left h-fit w-fit"
          >
            <AnimLetters string="ALEX" y="120%" delay={0} stagger={0.01} />
          </h2>
          <ul className="hidden sm:flex gap-10">
            <li>Portfolio 2024</li>
            <li>{formattedDate}</li>
          </ul>

          <div className="font-medium text-lg overflow-hidden">
            <span className="italic">{"( "}</span>

            <AnimLink onClick={closeMenu}>Close</AnimLink>
            <span className="italic">{" )"}</span>
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
          <ul className="mt-[64px]">
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
