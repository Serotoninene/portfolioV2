import React from "react";
import { useSphereCarrouselIndex } from "../../../../store/useSphereCarrouselIndex";

interface ButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <button className="px-4 py-2 rounded-3xl hover:bg-white hover:text-black transition-colors ease-out duration-200">
      {children}
    </button>
  );
};

export const Overlay = () => {
  const { index } = useSphereCarrouselIndex();

  return (
    <div className="top-0 left-0 absolute h-screen w-screen text-white">
      <div className="relative h-full w-full flex justify-between items-center px-3 md:px-5">
        <Button>PREV</Button>
        <p className="w-[250px] text-center">{index}</p>
        <Button>NEXT</Button>
      </div>
    </div>
  );
};
