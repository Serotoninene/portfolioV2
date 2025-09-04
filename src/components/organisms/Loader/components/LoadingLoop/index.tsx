import { useEffect, useRef } from "react";
import { splitWords } from "../../../../../utils";
import { useLoadingLoop } from "./animations/useLoadingLoop";
import { useLoadingProgress } from "../../../../../store/useLoadingProgress";

type Props = {
  className?: string;
};

export const LoadingLoop = ({ className }: Props) => {
  const loading = useRef<HTMLSpanElement[]>([]);
  const shadowLoading = useRef<HTMLSpanElement[]>([]);
  const progress = useLoadingProgress((state) => state.progress);

  const tl = useLoadingLoop(loading, shadowLoading);

  // ending the loop when progress = 100
  useEffect(() => {
    if (progress === 100) {
      tl.current?.play().call(() => {
        tl.current?.pause();
      });
    }
  }, [progress]);

  return (
    <div
      className={`loading-loop relative overflow-hidden font-extrabold ${className}`}
    >
      <p>{splitWords("LOADING", loading, "visible")}</p>
      <p className="absolute top-0 left-0">
        {splitWords("LOADING", shadowLoading, "visible")}
      </p>
    </div>
  );
};
