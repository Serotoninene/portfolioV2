import { useRef } from "react";
import { useShrinkOnScroll } from "./animations";

export const Introduction = () => {
  const ref = useRef<HTMLDivElement>(null);

  useShrinkOnScroll(ref);

  return (
    <div className="relative overflow-hidden h-[200vh] text-secondary-400">
      <div ref={ref} className="bg-dark h-screen top-0"></div>
    </div>
  );
};
