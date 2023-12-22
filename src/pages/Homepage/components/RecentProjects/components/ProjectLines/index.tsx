import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import { MutableRefObject, useRef } from "react";
import { FollowingProject, ProjectLine } from "..";
import { Project } from "../../types";

type Props = {
  projects: Project[];
};

export const ProjectLines = ({ projects }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="relative mt-[64px] ml-4 mr-[160px]">
        {projects.map((item, index) => (
          <ProjectLine key={index} {...item} num={index + 1} />
        ))}
      </div>

      <div
        ref={ref}
        className="fixed top-0 left-0 w-[300px] aspect-[3/5] "
      ></div>

      <UseCanvas>
        <ScrollScene track={ref as MutableRefObject<HTMLElement>}>
          {({ scale }) => {
            return <FollowingProject scale={scale} />;
          }}
        </ScrollScene>
      </UseCanvas>
    </>
  );
};
