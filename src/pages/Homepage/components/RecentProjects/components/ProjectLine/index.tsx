import { useRef } from "react";
import { useProjectContext } from "../../../../../../hooks/useProjectContext";
import { splitWords } from "../../../../../../utils";
import { Project } from "../../types";

import { useCursorStore } from "../../../../../../store/useCursorStyle";

import {
  useProjectLineHover,
  useProjectLineIntro,
  useProjectLineScrollAnimation,
} from "./animations";

type Props = {
  project: Project;
  num: number;
  isLast: boolean;
};

export const ProjectLine = ({ project, num, isLast }: Props) => {
  const formattedNum = num.toString().padStart(2, "0");

  const line = useRef<HTMLDivElement>(null);
  const shadowLine = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement[]>([]);
  const titleRef = useRef<HTMLSpanElement[]>([]);
  const subtitleRef = useRef<HTMLSpanElement[]>([]);
  const arrow = useRef<HTMLImageElement>(null);
  const shadowArrow = useRef<HTMLImageElement>(null);

  const { setCursorStyle } = useCursorStore();
  const { selectedProject, setSelectedProject } = useProjectContext();

  const isSelected = selectedProject?.title === project.title;

  useProjectLineIntro({
    line,
    numRef,
    titleRef,
    subtitleRef,
    arrow,
  });

  useProjectLineScrollAnimation(shadowLine, project, num - 1);
  const hoverTl = useProjectLineHover(arrow, shadowArrow);

  return (
    <a
      href={project.href}
      onMouseEnter={() => {
        setCursorStyle("none");
        setSelectedProject(project);
        hoverTl.current?.play();
      }}
      onMouseLeave={() => {
        setCursorStyle("default");
        hoverTl.current?.reverse();
      }}
      className={isLast ? "pb-2" : "pb-10"}
    >
      <div className="relative pt-6 grid grid-cols-6 gap-6 cursor-pointer">
        <div
          ref={line}
          className="absolute top-0 bg-dark h-[1px] w-full origin-left opacity-30"
        />
        <div
          ref={shadowLine}
          className="absolute top-0 bg-dark h-[1px] w-full origin-left scale-x-0"
        />
        <div className="col-span-3 grid grid-cols-6">
          <div className="font-medium text-xs ">
            {splitWords(formattedNum, numRef)}
          </div>
          <h3
            className={`col-span-5 text-[14px] font-bold transition-opacity duration-300 leading-[110%]  md:text-base ${
              isSelected ? "" : "opacity-50"
            }`}
          >
            {splitWords(project.title, titleRef)}
          </h3>
        </div>
        <p className="text-[14px] col-span-2 leading-[110%] md:text-[16px]">
          {splitWords(project.subtitle, subtitleRef)}
        </p>
        <div className="flex justify-end pr-4">
          <div className="relative overflow-hidden h-fit">
            <img
              ref={arrow}
              className="w-4 h-4"
              src="/assets/Icons/Arrow.svg"
              alt="Arrow"
            />
            <img
              ref={shadowArrow}
              className="w-4 h-4 absolute top-full right-full"
              src="/assets/Icons/Arrow.svg"
              alt="Arrow"
            />
          </div>
        </div>
      </div>
    </a>
  );
};
