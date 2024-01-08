import { useCallback, useLayoutEffect, useRef } from "react";
import { useProjectContext } from "../../../../../../hooks/useProjectContext";
import { splitWords } from "../../../../../../utils";
import gsap from "gsap";

type Props = {
  title: string;
  subtitle: string;
  num: number;
  img: string;
};

export const ProjectLine = ({ title, subtitle, num, img }: Props) => {
  const formattedNum = num.toString().padStart(2, "0");
  const line = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement[]>([]);
  const titleRef = useRef<HTMLSpanElement[]>([]);
  const subtitleRef = useRef<HTMLSpanElement[]>([]);
  const arrow = useRef<HTMLImageElement>(null);
  const introTL = useRef<gsap.core.Timeline>();

  const { setSelectedProject } = useProjectContext();

  const handleHover = useCallback(() => {
    setSelectedProject({ title, subtitle, img });
  }, [setSelectedProject, title, subtitle, img]);

  const handleLeave = useCallback(() => {
    setSelectedProject(null);
  }, [setSelectedProject]);

  const setInitialPositions = () => {
    gsap.set(line.current, {
      scaleX: 0,
    });
    gsap.set(numRef.current, {
      yPercent: -100,
      opacity: 0,
    });
    gsap.set(titleRef.current, {
      yPercent: -100,
      opacity: 0,
    });
    gsap.set(subtitleRef.current, {
      yPercent: -100,
      opacity: 0,
    });
    gsap.set(arrow.current, {
      yPercent: 100,
      xPercent: 100,
      opacity: 0,
    });
  };

  useLayoutEffect(() => {
    setInitialPositions();
    introTL.current = gsap.timeline({
      // scrollTrigger: {
      //   trigger: line.current,
      //   start: "top top",
      //   markers: true,
      // },
    });

    introTL.current.to(line.current, {
      scaleX: 1,
    });
    introTL.current.to(numRef.current, {
      yPercent: 0,
      opacity: 1,
      stagger: 0.1,
    });
    introTL.current.to(titleRef.current, {
      yPercent: 0,
      opacity: 1,
      stagger: 0.1,
    });
    introTL.current.to(subtitleRef.current, {
      yPercent: 0,
      opacity: 1,
      stagger: 0.1,
    });
    introTL.current.to(arrow.current, {
      yPercent: 0,
      xPercent: 0,
      opacity: 1,
    });
  }, []);

  return (
    <div onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      <div className="relative pt-6 pb-10 grid grid-cols-6 mr-[160px]">
        <div
          ref={line}
          className="absolute top-0 bg-dark h-[1px] w-full origin-left"
        />
        <div className="flex gap-5 col-span-3">
          <div className="font-medium mt-2">
            {splitWords(formattedNum, numRef)}
          </div>
          <h3 className="text-[32px] font-bold">
            {splitWords(title, titleRef)}
          </h3>
        </div>
        <p className="text-[20px] col-span-2">
          {splitWords(subtitle, subtitleRef)}
        </p>
        <div className="flex justify-end pr-4">
          <img
            ref={arrow}
            className="w-6 aspect-square"
            src="/assets/Icons/Arrow.svg"
            alt="Arrow"
          />
        </div>
      </div>
    </div>
  );
};
