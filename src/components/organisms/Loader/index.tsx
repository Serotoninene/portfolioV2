import gsap, { Power2, Power4 } from "gsap";
import { RefObject, useEffect, useLayoutEffect, useRef } from "react";
import { splitWords } from "../../../utils";
import { useProgress } from "@react-three/drei";
import { useHasLoadedStore } from "../../../store/useHasLoaded";

type Props = {
  className?: string;
  isPaused?: boolean;
};

const LoadingLoop = ({ className, isPaused }: Props) => {
  const loading = useRef<HTMLSpanElement[]>([]);
  const shadowLoading = useRef<HTMLSpanElement[]>([]);
  const { progress } = useProgress();

  const tl = useRef<gsap.core.Timeline>();

  useLayoutEffect(() => {
    if (!loading.current || !shadowLoading.current) return;

    tl.current = gsap.timeline({
      paused: isPaused,
      defaults: {
        stagger: {
          // from: "center",
          amount: 0.3,
        },
        duration: 1,
        ease: Power4.easeOut,
      },
      repeatDelay: 0.5,
      repeat: -1,
    });

    gsap.set(shadowLoading.current, {
      yPercent: 100,
    });

    tl.current.to(loading.current, {
      yPercent: -100,
    });
    tl.current.to(
      shadowLoading.current,
      {
        yPercent: 0,
      },
      "<"
    );

    tl.current.set(loading.current, {
      yPercent: 0,
      stagger: 0,
    });
    tl.current.set(shadowLoading.current, {
      yPercent: 100,
      stagger: 0,
    });

    return () => {
      tl.current?.kill();
    };
  }, []);

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

export const Loader = () => {
  // const ref = useRef<HTMLElement>();
  const loadingArr = new Array(8).fill(0);
  const container = useRef<HTMLDivElement>();
  const ref = useRef<HTMLDivElement>();
  const { progress } = useProgress();

  const { setHasLoaded } = useHasLoadedStore();

  const tl = useRef<gsap.core.Timeline>();

  // End of the loading animation
  useLayoutEffect(() => {
    if (!ref.current || !container.current) return;
    tl.current = gsap.timeline({
      defaults: {
        duration: 1,
        ease: Power4.easeOut,
      },
      paused: true,
      delay: 0.5,
    });

    const loadingLoops = gsap.utils.toArray(".loading-loop");
    const length = loadingLoops.length;

    loadingLoops.forEach((loop, i) => {
      tl.current?.to(
        loop?.children,
        {
          yPercent: Math.sign(i - length / 2 + 1) * 100,
          stagger: 0.3,
          onComplete: () => {
            setHasLoaded(true);
          },
        },
        "<0.03"
      );
    });
    tl.current?.to(
      loadingLoops[3].children,
      {
        yPercent: 200,
        stagger: 0.3,
      },
      "<1"
    );
    tl.current.to(
      container.current,
      {
        yPercent: -100,
      },
      "<0.1"
    );

    return () => {
      tl.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      tl.current?.play();
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
