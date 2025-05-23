import { MouseEvent, useRef } from "react";
import { useProjectContext } from "../../../../../../hooks/useProjectContext";
import { splitWords } from "../../../../../../utils";

import gsap, { Power4 } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useCursorStore } from "../../../../../../store/useCursorStyle";

gsap.registerPlugin(ScrollToPlugin);

import { Link, useNavigate } from "react-router-dom";
import { useColorContext } from "../../../../../../hooks/useColorContext";
import { Project } from "../../../../../../types/custom";
import {
  useProjectLineHover,
  useProjectLineIntro,
  useProjectLineScrollAnimation,
} from "./animations";
import scrollToProject from "./utils/scrollToProject";

type Props = {
  project: Project;
  idx: number;
  isLast: boolean;
};

export const ProjectLine = ({ project, idx, isLast }: Props) => {
  const navigate = useNavigate();
  const formattedIdx = (idx + 1).toString().padStart(2, "0");
  const { colors } = useColorContext();

  const container = useRef<HTMLAnchorElement>(null);
  const shadowLine = useRef<HTMLDivElement>(null);

  const { setCursorStyle } = useCursorStore();
  const { selectedProject, setSelectedProject } = useProjectContext();

  const isSelected = selectedProject?.title === project.title;

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    const tl = gsap.timeline({
      defaults: { ease: Power4.easeOut, duration: 0.6 },
      onComplete: () => {
        const tl = gsap.timeline();
        navigate(`/projects/${project.slug}`);
        tl.set("#Layout", { clearProps: "all" });
      },
    });

    tl.to("#Layout", {
      rotate: 4,
      opacity: 0.3,
      scale: 0.8,
    });
    tl.fromTo(
      "#transition_panel",
      { scale: 0.8 },
      {
        yPercent: -100,
        scale: 1,
      },
      "<+=0.1"
    );
  };

  const handleMouseEnter = () => {
    setCursorStyle("none");
    scrollToProject(idx);
    hoverTl.current?.play();
    setSelectedProject(project);
  };

  const handleMouseLeave = () => {
    setCursorStyle("default");
    hoverTl.current?.reverse();
  };

  useProjectLineIntro(container);
  useProjectLineScrollAnimation(shadowLine, project, idx);
  const hoverTl = useProjectLineHover(container);

  return (
    <Link
      to={`/projects/${project.slug}`}
      ref={container}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={isLast ? "pb-2" : "pb-10"}
    >
      <div className="relative pt-6 grid grid-cols-6 gap-6 cursor-pointer">
        <div
          className="Project-Line__line absolute top-0 h-[1px] w-full origin-left opacity-30"
          style={{
            background: colors.secondaryColor,
          }}
        />
        <div
          className="Project-Line__shadow-line absolute top-0 h-[1px] w-full origin-left scale-x-0"
          style={{
            background: colors.secondaryColor,
          }}
        />
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
    </Link>
  );
};
