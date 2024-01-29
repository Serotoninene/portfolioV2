import { useProgress } from "@react-three/drei";
import { RefObject, useEffect, useRef } from "react";
import { useEndOfLoading } from "./animations/useEndOfLoading";
import { LoadingLoop } from "./components/LoadingLoop";

import gsap from "gsap";

export const Loader = () => {
  // const ref = useRef<HTMLElement>();
  const loadingArr = new Array(8).fill(0);
  const container = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const bgLines = useRef<HTMLDivElement[]>([]);
  const { progress } = useProgress();

  const tl = useEndOfLoading(ref, container);

  useEffect(() => {
    gsap.set(bgLines.current, { scaleY: 0 });
    gsap.to(bgLines.current, {
      scaleY: progress / 100,
      stagger: 0.01,
    });

    if (progress === 100 && tl.current) {
      tl.current.play();
    }
  }, [progress]);

  return (
    <div
      ref={container as RefObject<HTMLDivElement>}
      className="fixed -top-[10vh] -left-[10vw] w-[120vw] h-[120vh] bg-secondary-200 z-50 flex flex-col justify-center items-center gap-4"
    >
      {/* Multiple LoadingLoops */}
      {loadingArr.map((_, i) => (
        <LoadingLoop key={i} className="text-[120px] leading-[100%]" />
      ))}
      <div
        ref={ref as RefObject<HTMLDivElement>}
        className="h-[1px] w-[50vw] origin-left scale-x-0 bg-dark"
      />
      <div className="fixed inset-0 grid grid-cols-8 gap-5 mx-5">
        {new Array(8).fill(0).map((_, i) => (
          <div key={i}>
            <div
              ref={(e) => e && bgLines.current?.push(e)}
              className="h-full w-[0.5px] bg-secondary-700 origin-top"
            />
            {i === 8 - 1 && (
              <div
                ref={(e) => e && bgLines.current?.push(e)}
                className="absolute right-0 top-0 h-full w-[0.5px] bg-secondary-700 origin-top"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
