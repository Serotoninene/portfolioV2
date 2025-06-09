import React, { useEffect, useRef, useState } from "react";
import { data } from "./index";
import gsap from "gsap";

import { useSphereCarrouselIndex } from "../../../../store/useSphereCarrouselIndex";

interface ButtonProps {
  children: React.ReactNode;
}

const Title = ({ index }: { index: number }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [displayedIndex, setDisplayedIndex] = useState(index);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const tl = gsap.timeline();

    tl.to(el, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        setDisplayedIndex(index); // switch title text after out animation
      },
    });

    tl.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [index]);

  return (
    <h1 ref={titleRef} className="text-xl w-[250px] text-center">
      {data[displayedIndex]?.title.toUpperCase()}
    </h1>
  );
};

const Button = ({ children }: ButtonProps) => {
  const handleClick = () => {
    console.log("Button clicked");
  };
  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded-3xl hover:bg-white hover:text-black transition-colors ease-out duration-200 pointer-events-auto"
    >
      {children}
    </button>
  );
};

export const Overlay = () => {
  const { index } = useSphereCarrouselIndex();

  return (
    <div className="top-0 left-0 absolute h-screen w-screen text-white pointer-events-none">
      <div className="relative h-full w-full flex justify-between items-center px-3 md:px-5">
        <Button>PREV</Button>
        <Title index={index} />
        <Button>NEXT</Button>
      </div>
    </div>
  );
};
