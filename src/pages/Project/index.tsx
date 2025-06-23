import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

// Components
import { AnimLetters } from "../../components/atoms";
import { HeaderDuo } from "./components/HeaderDuo";
import { ProjectContent } from "./components/ProjectContent";

// GSAP
import { useGSAP } from "@gsap/react";
import gsap, { Expo, Power3 } from "gsap";

// Data + Types
import { projects, projectsData } from "../../data";
import { ProjectData } from "../../types/custom";
import { useColorContext } from "../../hooks/useColorContext";

export default function Project() {
  const container = useRef<HTMLDivElement>(null);
  const { slug } = useParams<{ slug: string }>();
  const { colors } = useColorContext();
  const projectData = projectsData[slug!] as ProjectData;

  // I need to get the index of the project in the array
  const projectIndex = projects.findIndex((project) => project.slug === slug);
  const nextProjectIndex = (projectIndex + 1) % projects.length;
  const nextProject = projects[nextProjectIndex];

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  // Intro animation
  useGSAP(
    () => {
      const images = gsap.utils.toArray("img");
      const headerDuos = gsap.utils.toArray(".Project_Header-Duo");

      const tl = gsap.timeline({
        default: { ease: Expo.easeInOut, duration: 0.2, delay: 0.5 },
        delay: 1,
      });

      tl.to(".intro-layer", {
        yPercent: 100,
      });

      tl.set("video", { yPercent: 10 });

      tl.to(".Project_intro-paragraph", {
        opacity: 1,
        y: 0,
      });
      tl.to(headerDuos, { opacity: 1, y: 0, rotate: 0, stagger: 0.13 }, "<0.2");
      tl.to(
        "video",
        { opacity: 1, yPercent: 0, rotate: 0, ease: Power3.easeOut },
        "<0.2"
      );
      tl.to(images, { opacity: 1, y: 0, rotate: 0 }, "<0.2");
    },
    { scope: container }
  );

  if (!slug || !projectsData[slug]) {
    return (
      <>
        <div className="h-screen relative px-5 pt-[128px]">
          Project not found
        </div>
      </>
    );
  }

  return (
    <div ref={container} className="min-h-screen relative">
      <div
        className="intro-layer fixed inset-0 top-0 left-0"
        style={{ background: colors.mainColor }}
      ></div>
      <header className="mb-6 pt-14 md:pt-[240px] px-3 md:px-5">
        <h1 className="font-bold text:2xl md:text-6xl">
          <AnimLetters string={projectData.title} stagger={0.01} delay={0.75} />
        </h1>
        <p className="Project_intro-paragraph opacity-0 md:w-[75%] text-justify md:text-xl mt-6">
          {projectData.introParagraph}
        </p>

        <div className="grid md:grid-cols-6 gap-5 mt-10">
          <HeaderDuo
            idx={0}
            content={projectData.client}
            url={projectData.clientUrl}
          />
          <HeaderDuo idx={1} content={projectData.project} />
          <HeaderDuo
            idx={2}
            content={projectData.websiteName}
            url={projectData.websiteUrl}
          />
        </div>
      </header>
      <ProjectContent data={projectData} />
      <footer className="relative w-full mt-6 md:mt-10 h-[50vh]">
        <a
          className="absolute inset-0 z-10"
          href={`/projects/${nextProject.slug}`}
        />
        <img className="h-full w-full object-cover" src={nextProject.img} />
        <h3 className="absolute inset-0 flex justify-center items-center text-dark text-3xl font-semibold text-white">
          NEXT PROJECT
        </h3>
      </footer>
    </div>
  );
}
