import { useRef } from "react";
import { splitLetters } from "../../../utils";
import { useScrollShrink } from "./animations";

export function ScrollIndicator() {
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLElement[]>([]);

  useScrollShrink(lineRef, textRef);

  return (
    <div
      id="ScrollIndicator"
      className="hidden fixed bottom-3 right-5 flex-col align-center gap-2 md:flex"
    >
      <div
        ref={lineRef}
        className="h-20 w-[1px] self-center bg-dark origin-bottom"
      />
      <p className="font-medium overflow-hidden">
        {splitLetters("Scroll", textRef)}
      </p>
    </div>
  );
}
