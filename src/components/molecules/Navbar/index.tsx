import { useRef } from "react";
import { getFormattedDate, splitWords } from "../../../utils";
import { AnimLetters } from "../../atoms";
import { useAlexReveal, useHoverMenu, useIntro } from "./animations";

type Props = {
  isMenuOpen: boolean;
  setMenuOpen: (arg: boolean) => void;
};

export const Navbar = ({ setMenuOpen }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLSpanElement[]>([]);
  const menuShadowRef = useRef<HTMLSpanElement[]>([]);

  const formattedDate = getFormattedDate();
  const hasScrolled = useAlexReveal();
  const { isRevealCenter } = useIntro({
    containerRef,
    logoRef,
    middleRef,
    menuRef,
  });
  const hoverMenuTl = useHoverMenu(menuRef, menuShadowRef);

  const handleMouseEnter = () => {
    hoverMenuTl.current?.play();
  };

  const handleMouseLeave = () => {
    hoverMenuTl.current?.reverse();
  };

  const openMenu = () => {
    setMenuOpen(true);
  };

  return (
    <div
      id="Navbar"
      ref={containerRef}
      className="fixed top-0 left-0 right-0 flex items-end justify-between mt-3 mx-5 pb-1 z-10 border-b border-black origin-left"
    >
      <h1
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
      </h1>

      <div
        ref={middleRef}
        className="flex gap-10 text-sm font-medium overflow-hidden"
      >
        <AnimLetters
          string="Portfolio 2004"
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
      <button
        className=" relative font-extrabold text-lg cursor-pointer leading-5 overflow-hidden"
        onClick={openMenu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p> {splitWords("menu", menuRef, "visible")}</p>

        <p className="absolute leading-5 top-full">
          {splitWords("menu", menuShadowRef, "visible")}
        </p>
      </button>
    </div>
  );
};
