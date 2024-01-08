import { useEffect, useLayoutEffect, useRef } from "react";

import gsap, { Power3 } from "gsap";

import { Button } from "../../atoms";

type Props = {
  isMenuOpen: boolean;
  setMenuOpen: (arg: boolean) => void;
};

export const Menu = ({ isMenuOpen, setMenuOpen }: Props) => {
  const tl = useRef<gsap.core.Timeline>();
  const container = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // set up the timeline for the animation
  useLayoutEffect(() => {
    gsap.set(container.current, {
      opacity: 0,
      y: 64,
    });

    tl.current = gsap.timeline({
      paused: true,
      defaults: { ease: Power3.easeOut },
    });
    tl.current.to("#Navbar", { yPercent: -150 });
    tl.current.to(
      container.current,
      {
        y: 0,
        opacity: 1,
      },
      "<"
    );
  }, []);

  // trigger the animation when the menu open/ close
  useEffect(() => {
    if (isMenuOpen) tl.current?.play();
    else tl.current?.reverse();
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
