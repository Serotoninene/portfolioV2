import { projects } from "../../../../../../../data";
import gsap from "gsap";

const scrollToProject = (idx: number) => {
  const projectsContainer = document.getElementById("ProjectLines");

  if (!projectsContainer) return;

  const projecsContainerRect = projectsContainer.getBoundingClientRect();
  const containerTop = projecsContainerRect.top + window.scrollY; // Account for current scroll position
  const containerHeight = projecsContainerRect.height;

  const scrollToPosition =
    containerTop +
    (idx / projects.length) * containerHeight +
    (containerHeight / projects.length) * 0.1;

  gsap.to(window, {
    duration: 0.8,
    ease: "power3.out",
    scrollTo: {
      y: scrollToPosition - 50,
    },
  });
};

export default scrollToProject;
