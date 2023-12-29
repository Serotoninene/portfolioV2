import { Marquee, ProjectLines } from "./components";

export const RecentProjects = () => {
  return (
    <div className="overflow-hidden">
      <div className="mb-20">
        <Marquee />
      </div>
      <ProjectLines />
    </div>
  );
};
