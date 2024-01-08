import { useEffect, useRef } from "react";

import { Button } from "../../atoms";
import { useIntro } from "./animations";

type Props = {
  isMenuOpen: boolean;
  setMenuOpen: (arg: boolean) => void;
};

export const Menu = ({ isMenuOpen, setMenuOpen }: Props) => {
  const container = useRef<HTMLDivElement>(null);

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
      className="fixed inset-0 first-letter px-5 py-3 bg-dark bg-opacity-70 backdrop-blur z-20 pointer-events-none"
      style={{ pointerEvents: isMenuOpen ? "all" : "none" }}
    >
      <div className="flex justify-end text-white">
        <Button onClick={closeMenu}>Close</Button>
      </div>
    </div>
  );
};
