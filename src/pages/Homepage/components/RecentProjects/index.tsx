import { Marquee, ProjectLines } from "./components";

export const RecentProjects = () => {
  return (
    <div className="overflow-hidden">
      <Marquee />
      <ProjectLines />
    </div>
  );
};
