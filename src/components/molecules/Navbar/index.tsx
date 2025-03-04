import { useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useColorContext } from "../../../hooks/useColorContext";
import { useIsMenuOpen } from "../../../store/useIsMenuOpen";
import { getFormattedDate } from "../../../utils";
import { AnimLetters, AnimLink } from "../../atoms";
import { useAlexReveal, useIntro } from "./animations";

export const Navbar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { colors } = useColorContext();

  const { progress } = useProgress();

  const { setIsMenuOpen } = useIsMenuOpen();

  const formattedDate = getFormattedDate();
  const hasScrolled = useAlexReveal();
  const { tl, isRevealCenter } = useIntro({ containerRef });

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  useEffect(() => {
    if (progress === 100) {
      tl.current?.play();
    }
  }, [progress]);

  return (
    <div
      id="Navbar"
      ref={containerRef}
      className="fixed top-0 left-0 right-0 flex border-b items-end justify-between mx-3 mt-3 pb-1 z-30 origin-left md:mx-5"
      style={{
        borderColor: colors.secondaryColor,
      }}
    >
      <h2
        id="Logo_Alex"
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
        id="Center_Navbar"
        className="gap-10 text-sm font-medium overflow-hidden md:flex"
      >
        <AnimLetters
          string="Portfolio 2025"
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
        id="Menu_Button"
        className="text-lg font-medium leading-5 pointer-events-auto overflow-hidden"
      >
        <span className="italic">{"( "}</span>
        <AnimLink onClick={openMenu}>Menu</AnimLink>
        <span className="italic">{" )"}</span>
      </div>
    </div>
  );
};
