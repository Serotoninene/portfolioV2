import { getFormattedDate } from "../../../utils";
import { AnimLetters } from "../../atoms";
import { useAlexReveal } from "./animations";

export const Navbar = () => {
  const formattedDate = getFormattedDate();
  const hasScrolled = useAlexReveal();

  return (
    <div className="fixed top-0 left-0 right-0 flex items-end justify-between mt-3 mx-5 pb-1 z-10 border-b border-black">
      <h1 className="bg-dark px-1 text-secondary-200 text-xl font-extrabold">
        <AnimLetters string="ALEX" delay={0} y="120%" start={hasScrolled} />
      </h1>
      <div className="flex gap-10 text-sm font-medium">
        <p>Portfolio 2004</p>
        <p>{formattedDate}</p>
      </div>
      <button className="font-extrabold text-lg cursor-pointer leading-5">
        menu
      </button>
    </div>
  );
};
