import { useCallback, useRef } from "react";
import { useProjectContext } from "../../../../../../hooks/useProjectContext";
import { splitWords } from "../../../../../../utils";
import { useProjectLineIntro } from "./animations/useProjectLineIntro";

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

  const { setSelectedProject } = useProjectContext();
  useProjectLineIntro({
    line,
    numRef,
    titleRef,
    subtitleRef,
    arrow,
  });

  const handleHover = useCallback(() => {
    setSelectedProject({ title, subtitle, img });
  }, [setSelectedProject, title, subtitle, img]);

  const handleLeave = useCallback(() => {
    setSelectedProject(null);
  }, [setSelectedProject]);

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
        <div className="flex justify-end pr-4 overflow-hidden">
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
