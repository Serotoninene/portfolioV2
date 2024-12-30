import { useEffect, useRef } from "react";
import { useProjectContext } from "../../../../../../hooks/useProjectContext";
import { splitWords } from "../../../../../../utils";
import { Project } from "../../types";

import { useCursorStore } from "../../../../../../store/useCursorStyle";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

import {
  useProjectLineHover,
  useProjectLineIntro,
  useProjectLineScrollAnimation,
} from "./animations";
import { projects } from "../../data";

type Props = {
  project: Project;
  idx: number;
  isLast: boolean;
};

export const ProjectLine = ({ project, idx, isLast }: Props) => {
  const formattedIdx = (idx + 1).toString().padStart(2, "0");

  const container = useRef<HTMLAnchorElement>(null);
  const shadowLine = useRef<HTMLDivElement>(null);

  const { setCursorStyle } = useCursorStore();
  const { selectedProject, setSelectedProject } = useProjectContext();

  const isSelected = selectedProject?.title === project.title;

  useProjectLineIntro({
    container,
  });

  useProjectLineScrollAnimation(shadowLine, project, idx);

  const scrollToProject = () => {
    const projectsContainer = document.getElementById("ProjectLines");

    if (!projectsContainer) return;

    // const position =
    //   (idx / (projects.length + 1)) * window.innerHeight * 1.5 +
    //   projectsContainer.offsetTop;

    // gsap.to(window, {
    //   duration: { position },
    //   scrollTo: {
    //     y: position,
    //     autoKill: false,
    //   },
    //   onComplete: () => {
    //     setSelectedProject(project);
    //   },
    // });
  };

  useEffect(() => {
    const projectsContainer = document.getElementById("ProjectLines");
    console.log(projectsContainer?.offsetHeight);
  }, []);

  const hoverTl = useProjectLineHover(container);

  return (
    <a
      href={project.href}
      ref={container}
      id={project.title}
      onMouseEnter={() => {
        setCursorStyle("none");
        scrollToProject();
        hoverTl.current?.play();
      }}
      onMouseLeave={() => {
        setCursorStyle("default");
        hoverTl.current?.reverse();
      }}
      className={isLast ? "pb-2" : "pb-10"}
    >
      <div className="relative pt-6 grid grid-cols-6 gap-6 cursor-pointer">
        <div className="Project-Line__line absolute top-0 bg-dark h-[1px] w-full origin-left opacity-30" />
        <div className="Project-Line__shadow-line absolute top-0 bg-dark h-[1px] w-full origin-left scale-x-0" />
        <div className="col-span-3 grid grid-cols-6">
          <div className="Project-Line__index font-medium text-xs ">
            {splitWords(formattedIdx)}
          </div>
          <h3
            className={`Project-Line__title col-span-5 text-[14px] font-bold transition-opacity duration-300 leading-[110%]  md:text-base ${
              isSelected ? "" : "opacity-50"
            }`}
          >
            {splitWords(project.title)}
          </h3>
        </div>
        <p className="Project-Line__subtitle text-[14px] col-span-2 leading-[110%] md:text-[16px]">
          {splitWords(project.subtitle)}
        </p>
        <div className="flex justify-end pr-4">
          <div className="relative overflow-hidden h-fit">
            <img
              className="Project-Line__arrow w-4 h-4"
              src="/assets/Icons/Arrow.svg"
              alt="Arrow"
            />
            <img
              className="Project-Line__shadow-arrow w-4 h-4 absolute top-full right-full"
              src="/assets/Icons/Arrow.svg"
              alt="Arrow"
            />
          </div>
        </div>
      </div>
    </a>
  );
};
