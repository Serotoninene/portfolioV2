import { useProgress } from "@react-three/drei";
import { RefObject, useRef } from "react";
import { useEndOfLoading } from "./animations/useEndOfLoading";
import { LoadingLoop } from "./components/LoadingLoop";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Loader = () => {
  // const ref = useRef<HTMLElement>();
  const loadingArr = new Array(8).fill(0);
  const container = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const { progress } = useProgress();
  const simulateProgress = useRef({ value: 0 });

  // The End of Loading animation = animates out the "LOADING" (loading loop) + the loading container
  const tl = useEndOfLoading(ref, container);

  useGSAP(
    () => {
      const bgLines = gsap.utils.toArray<HTMLElement>(".bg-line");
      const numLines = bgLines.length;

      gsap.set(bgLines, { scaleY: 0 });

      // Watch progress change
      const updateBars = (simulatedProgress: number) => {
        bgLines.forEach((line, i) => {
          const segmentSize = 100 / numLines; // % per bar
          const start = i * segmentSize;
          const end = (i + 1) * segmentSize;

          let fill = 0;
          if (simulatedProgress >= end) {
            fill = 1; // fully filled
          } else if (simulatedProgress <= start) {
            fill = 0; // empty
          } else {
            fill = (simulatedProgress - start) / segmentSize; // partial
          }

          // Animate to target fill
          gsap.to(line, {
            scaleY: fill,
            duration: 0.4,
            ease: "power2.out",
          });

          if (progress === 100) {
            gsap.to(line, {
              scaleY: 1,
              duration: 0.5, // give it some time to ramp
              ease: "power4.in", // starts slow → accelerates hard
              stagger: 0.05, // optional stagger for a wave effect
              onComplete: () => {
                tl.current?.play();
              },
            });
          }
        });
      };
      // Animate simulated progress to 100 in 3s
      gsap.to(simulateProgress.current, {
        value: 100,
        duration: 3,
        ease: "power1.inOut",
        onUpdate: () => {
          updateBars(simulateProgress.current.value);
        },
      });
    },
    {
      scope: container,
    }
  );

  return (
    <div
      ref={container as RefObject<HTMLDivElement>}
      className="fixed -top-[10vh] -left-[10vw] w-[120vw] h-[120vh] bg-secondary-200 z-50 flex flex-col justify-center items-center gap-4"
    >
      {/* Multiple LoadingLoops */}
      {loadingArr.map((_, i) => (
        <LoadingLoop
          key={i}
          className="text-[32px] md:text-[60px] leading-[100%]"
        />
      ))}
      <div
        ref={ref as RefObject<HTMLDivElement>}
        className="h-[1px] w-[50vw] origin-left scale-x-0 bg-dark"
      />
      <div className="fixed inset-0 grid grid-cols-8 gap-5 mx-5">
        {new Array(8).fill(0).map((_, i) => (
          <div key={i}>
            <div className="bg-line h-full w-[0.5px] bg-secondary-700 origin-top" />
            {i === 8 - 1 && (
              <div className="bg-line absolute right-0 top-0 h-full w-[0.5px] bg-secondary-700 origin-top" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
