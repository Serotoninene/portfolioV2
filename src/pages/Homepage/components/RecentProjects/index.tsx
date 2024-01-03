import { Marquee, ProjectLines } from "./components";

export const RecentProjects = () => {
  return (
    <div className="relative">
      <div className="mb-20">
        <Marquee />
      </div>
      <ProjectLines />
    </div>
  );
};
