import React, { useEffect, useRef, useState } from "react";
import { data } from "./index";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

import { useSphereCarrouselIndex } from "../../../../store/useSphereCarrouselIndex";

interface ButtonProps {
  children: React.ReactNode;
  isIntroDone: boolean;
}

function wrapCharsWithOverflow(split: SplitText) {
  split.chars.forEach((char) => {
    const wrapper = document.createElement("span");
    wrapper.style.display = "inline-block";
    wrapper.style.overflow = "hidden";
    wrapper.style.position = "relative";

    char.parentNode?.insertBefore(wrapper, char);
    wrapper.appendChild(char);
  });
}

const Title = ({
  index,
  isIntroDone,
}: {
  index: number;
  isIntroDone: boolean;
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [displayedIndex, setDisplayedIndex] = useState(index);
  const splitRef = useRef<SplitText>(null);

  useEffect(() => {
    titleRef.current!.style.opacity = "0";
    if (!titleRef.current || !isIntroDone) return;
    titleRef.current.style.opacity = "1";
    const el = titleRef.current;

    if (splitRef.current) {
      splitRef.current.revert();
    }

    const tl = gsap.timeline();

    // First: split the current text and animate it out
    splitRef.current = new SplitText(el, { type: "words,chars", mask: true });

    wrapCharsWithOverflow(splitRef.current);

    tl.to(splitRef.current.chars, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.015,
      ease: "power3.out",
      onComplete: () => {
        // Update the text after animation out
        setDisplayedIndex(index);
      },
    });
  }, [index, isIntroDone]);

  // Now a second effect that runs AFTER displayedIndex changes
  useEffect(() => {
    if (!titleRef.current || !isIntroDone) return;

    if (splitRef.current) {
      splitRef.current.revert();
    }

    splitRef.current = new SplitText(titleRef.current!, {
      type: "words,chars",
    });

    wrapCharsWithOverflow(splitRef.current);

    gsap.fromTo(
      splitRef.current.chars,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.015,
        ease: "power3.out",
      }
    );
  }, [displayedIndex, isIntroDone]);

  return (
    <h1 ref={titleRef} className="text-xl w-[300px] text-center ">
      {data[displayedIndex]?.title.toUpperCase()}
    </h1>
  );
};

const Button = ({ children, isIntroDone }: ButtonProps) => {
  const ref = useRef(null);
  const { index, setIndex } = useSphereCarrouselIndex();
  const handleClick = () => {
    let newIndex = index;
    if (children === "NEXT") {
      newIndex = (index + 1) % data.length;
    } else if (children === "PREV") {
      newIndex = (index - 1 + data.length) % data.length; // Ensure it wraps around correctly
    } else {
      return; // If children is not "NEXT" or "PREV", do nothing
    }

    setIndex(newIndex);
  };

  useEffect(() => {
    gsap.set(ref.current, {
      y: 20,
      opacity: 0,
    });
    if (!isIntroDone) return;

    gsap.to(ref.current, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      ease: "expo.inOut",
    });
  }, [isIntroDone]);
  return (
    <button
      ref={ref}
      onClick={handleClick}
      className="px-4 py-2 rounded-3xl hover:bg-white hover:text-black transition-colors ease-out duration-200 pointer-events-auto"
    >
      {children}
    </button>
  );
};

export const Overlay = ({ isIntroDone }: { isIntroDone: boolean }) => {
  const { index } = useSphereCarrouselIndex();

  return (
    <div className="top-0 left-0 absolute h-screen w-screen text-white pointer-events-none">
      <div className="relative h-full w-full flex justify-between items-center px-3 md:px-5">
        <Button isIntroDone={isIntroDone}>PREV</Button>
        <Title index={index} isIntroDone={isIntroDone} />
        <Button isIntroDone={isIntroDone}>NEXT</Button>
      </div>
    </div>
  );
};
