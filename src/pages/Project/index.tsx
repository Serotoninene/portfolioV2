import { useParams } from "react-router-dom";

// Components
import { HeaderDuo } from "./components/HeaderDuo";
import { ProjectContent } from "./components/ProjectContent";

// Data + Types
import { projects, projectsData } from "../../data";
import { ProjectData } from "../../types/custom";

export default function Project() {
  const { slug } = useParams<{ slug: string }>();
  const projectData = projectsData[slug!] as ProjectData;

  // I need to get the index of the project in the array
  const projectIndex = projects.findIndex((project) => project.slug === slug);
  const nextProjectIndex = (projectIndex + 1) % projects.length;
  const nextProject = projects[nextProjectIndex];

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
    <div className="min-h-screen relative">
      <header className="mb-6 pt-14 md:pt-[240px] px-3 md:px-5">
        <h1 className="font-bold text:2xl md:text-6xl">{projectData.title}</h1>
        <p className="md:w-[75%] text-justify md:text-xl mt-6">
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
        <h3 className="absolute inset-0 flex justify-center items-center text-secondary-400 text-3xl font-semibold">
          NEXT PROJECT
        </h3>
      </footer>
    </div>
  );
}
