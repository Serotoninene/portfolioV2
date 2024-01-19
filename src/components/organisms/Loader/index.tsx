import { useProgress } from "@react-three/drei";
import { RefObject, useEffect, useRef } from "react";
import { useEndOfLoading } from "./animations/useEndOfLoading";
import { LoadingLoop } from "./components/LoadingLoop";

export const Loader = () => {
  // const ref = useRef<HTMLElement>();
  const loadingArr = new Array(8).fill(0);
  const container = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { progress } = useProgress();

  const tl = useEndOfLoading(ref, container);

  useEffect(() => {
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
      {/* <div>{progress}</div> */}
    </div>
  );
};
