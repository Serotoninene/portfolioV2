import gsap, { Power3 } from "gsap";
import { RefObject, useEffect, useRef } from "react";
import { useProjectContext } from "../../../../../../../hooks/useProjectContext";
import { projects } from "../../../data";

export const useProjectLineScrollAnimation = (
  shadowLine: RefObject<HTMLDivElement>,
  project: { title: string; subtitle: string; img: string },
  idx: number
) => {
  const tl = useRef<gsap.core.Timeline>();

  const { setSelectedProject } = useProjectContext();

  const handleSelectProject = () => {
    setSelectedProject(project);
  };
  useEffect(() => {
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#ProjectLines",
        start: `${(idx / (projects.length + 1)) * 100}% top`,
        end: `${((idx + 1) / (projects.length + 1)) * 100}% top`,
        toggleActions: "play reverse play reverse",
        onEnter: handleSelectProject,
        onEnterBack: handleSelectProject,
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
};
