import { useRef } from "react";
import { useScrollShrink } from "./animations/useScrollShrink";

export function ScrollIndicator() {
  const lineRef = useRef<HTMLDivElement>(null);
  useScrollShrink({ ref: lineRef });

  return (
    <div
      id="ScrollIndicator"
      className="fixed bottom-3 right-5 flex flex-col align-center gap-2"
    >
      <div
        ref={lineRef}
        className="h-20 w-[1px] self-center bg-dark origin-bottom"
      />
      <p className="font-medium">Scroll</p>
    </div>
  );
}
