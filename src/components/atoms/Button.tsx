import { useEffect, useState } from "react";
import { splitWords } from "../../utils";
import gsap from "gsap";

interface Props {
  children: string;
}

export const Button = ({ children }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      gsap.to("span", {
        duration: 0.5,
        y: "-100%",
        ease: "power2.out",
      });
    } else {
      gsap.to("span", {
        duration: 0.5,
        y: "0%",
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <button
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {splitWords(children)}
      <span className="absolute top-[100%] left-0">{splitWords(children)}</span>
    </button>
  );
};
