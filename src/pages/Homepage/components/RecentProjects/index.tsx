import { Marquee, ProjectLines } from "./components";
import { Project } from "./types";

const data: Project[] = [
  {
    title: "SIMON EYCHENNE",
    subtitle: "Photo portfolio",
    img: "/assets/Image/SimonEychenne.png",
  },
  {
    title: "AVAA ARCHITECTES",
    subtitle: "Architect's website",
    img: "/assets/Image/AvaArchitectes.png",
  },
  {
    title: "VIRGILE HASSELMANN",
    subtitle: "Video-maker portfolio",
    img: "/assets/Image/VirgileHasselmann.png",
  },
  {
    title: "SEROTONINENE",
    subtitle: "Illustration shop",
    img: "/assets/Image/Serotoninene.png",
  },
  {
    title: "SALINGER YOU'RE MY HERO",
    subtitle: "Personal project",
    img: "/assets/Image/Salinger.png",
  },
];

export const RecentProjects = () => {
  return (
    <div className="overflow-hidden">
      <Marquee />
      <ProjectLines projects={data} />
    </div>
  );
};
