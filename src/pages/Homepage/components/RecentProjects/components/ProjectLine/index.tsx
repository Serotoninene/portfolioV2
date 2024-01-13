import { useCallback, useEffect, useRef } from "react";
import { useProjectContext } from "../../../../../../hooks/useProjectContext";
import { splitWords } from "../../../../../../utils";
import { useProjectLineIntro } from "./animations/useProjectLineIntro";
import gsap, { Power3 } from "gsap";

type Props = {
  title: string;
  subtitle: string;
  num: number;
  img: string;
  isLast: boolean;
};

export const ProjectLine = ({ title, subtitle, num, img, isLast }: Props) => {
  const formattedNum = num.toString().padStart(2, "0");
  const container = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const shadowLine = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement[]>([]);
  const titleRef = useRef<HTMLSpanElement[]>([]);
  const subtitleRef = useRef<HTMLSpanElement[]>([]);
  const arrow = useRef<HTMLImageElement>(null);

  const tl = useRef<gsap.core.Timeline>();

  const { setSelectedProject } = useProjectContext();
  useProjectLineIntro({
    line,
    numRef,
    titleRef,
    subtitleRef,
    arrow,
  });

  useEffect(() => {
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: num === 1 ? "top" : "bottom" + " top",
        end: "200% top",
        markers: true,
        toggleActions: "play reverse play reverse",
        onEnter: () => {
          setSelectedProject({ title, subtitle, img });
        },
        onEnterBack: () => {
          setSelectedProject({ title, subtitle, img });
        },
      },
    });

    tl.current.to(shadowLine.current, {
      scaleX: 1,
      duration: 0.5,
      ease: Power3.easeOut,
    });

    return () => {
      tl.current?.kill();
    };
  }, []);

  const handleHover = useCallback(() => {
    setSelectedProject({ title, subtitle, img });
  }, [setSelectedProject, title, subtitle, img]);

  return (
    <div
      ref={container}
      onMouseEnter={handleHover}
      className={isLast ? "pb-2" : "pb-10"}
    >
      <div className="relative pt-6 grid grid-cols-6 gap-6">
        <div
          ref={line}
          className="absolute top-0 bg-dark h-[1px] w-full origin-left opacity-30"
        />
        <div
          ref={shadowLine}
          className="absolute top-0 bg-dark h-[1px] w-full origin-left scale-x-0"
        />
        <div className="col-span-3 grid grid-cols-6">
          <div className="font-medium mt-1 text-[12px] ">
            {splitWords(formattedNum, numRef)}
          </div>
          <h3 className="col-span-5 text-[20px] font-bold">
            {splitWords(title, titleRef)}
          </h3>
        </div>
        <p className="text-[16px] col-span-2">
          {splitWords(subtitle, subtitleRef)}
        </p>
        <div className="flex justify-end pr-4 overflow-hidden ">
          <img
            ref={arrow}
            className="w-4 h-4"
            src="/assets/Icons/Arrow.svg"
            alt="Arrow"
          />
        </div>
      </div>
    </div>
  );
};
