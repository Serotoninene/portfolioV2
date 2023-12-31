import { Marquee, ProjectLines } from "./components";

export const RecentProjects = () => {
  return (
    <div className="relative border border-red-400 overflow-hidden">
      <div className="mb-20">
        <Marquee />
      </div>
      <ProjectLines />
    </div>
  );
};
