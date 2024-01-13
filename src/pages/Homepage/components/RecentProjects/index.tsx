import { Marquee, ProjectLines } from "./components";

export const RecentProjects = () => {
  return (
    <div className="relative h-[300vh] pb-5 ">
      <div className="pt-10 pb-6">
        <Marquee />
      </div>
      <ProjectLines />
    </div>
  );
};
