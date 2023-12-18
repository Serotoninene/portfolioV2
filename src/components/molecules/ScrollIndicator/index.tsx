import { useEffect, useRef } from "react";
import gsap from "gsap";

export function ScrollIndicator() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(lineRef.current, {
      opacity: 1,
      delay: 1.5,
    });
    tl.to(lineRef.current, {
      scaleY: 0,
      scrollTrigger: {
        start: "top top",
        end: "bottom bottom", // correct end
        scrub: true,
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

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
