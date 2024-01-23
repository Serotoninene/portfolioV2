import { Marquee, ProjectLines } from "./components";

export const RecentProjects = () => {
  return (
    <div id="RecentProjects" className="relative pb-5 ">
      <div className="pt-10 pb-6">
        <Marquee />
      </div>
      <ProjectLines />
    </div>
  );
};
