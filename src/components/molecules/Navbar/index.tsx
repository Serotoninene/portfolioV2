import { useRef } from "react";
import { useIsMenuOpen } from "../../../store/useIsMenuOpen";
import { getFormattedDate } from "../../../utils";
import { AnimLetters, AnimLink } from "../../atoms";
import { useAlexReveal, useIntro } from "./animations";

export const Navbar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { setIsMenuOpen } = useIsMenuOpen();

  const formattedDate = getFormattedDate();
  const hasScrolled = useAlexReveal();
  const { isRevealCenter } = useIntro({
    containerRef,
    logoRef,
    middleRef,
    menuRef,
  });

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  return (
    <div
      id="Navbar"
      ref={containerRef}
      className="fixed top-0 left-0 right-0 flex items-end justify-between mx-3 mt-3 pb-1 z-30 border-b border-black origin-left md:mx-5"
    >
      <h2
        ref={logoRef}
        className="bg-dark px-1 text-secondary-200 text-xl font-extrabold origin-left"
      >
        <AnimLetters
          string="ALEX"
          y="120%"
          delay={0}
          stagger={0.01}
          start={hasScrolled}
        />
      </h2>

      <div
        ref={middleRef}
        className="hidden gap-10 text-sm font-medium overflow-hidden md:flex"
      >
        <AnimLetters
          string="Portfolio 2024"
          delay={0}
          ease="easeOut"
          stagger={0.005}
          start={isRevealCenter}
        />
        <AnimLetters
          string={formattedDate}
          delay={0}
          ease="easeOut"
          stagger={0.005}
          staggerStart="end"
          start={isRevealCenter}
        />
      </div>
      <div
        ref={menuRef}
        className="text-lg font-medium leading-5 pointer-events-auto overflow-hidden"
      >
        <span className="italic">{"( "}</span>
        <AnimLink onClick={openMenu}>Menu</AnimLink>
        <span className="italic">{" )"}</span>
      </div>
    </div>
  );
};
