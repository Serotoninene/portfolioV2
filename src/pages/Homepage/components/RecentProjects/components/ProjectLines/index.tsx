import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import { MutableRefObject, useRef } from "react";

import { FollowingProject, ProjectLine } from "..";
import { projects } from "../../data";

export const ProjectLines = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="relative mt-[64px] ml-5 overflow-hidden">
        {projects.map((item, index) => (
          <ProjectLine key={item.title} {...item} num={index + 1} />
        ))}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div
            ref={ref}
            className="w-[70%] aspect-[16/9] pointer-events-none"
          />
        </div>
      </div>

      <UseCanvas>
        <ScrollScene track={ref as MutableRefObject<HTMLDivElement>}>
          {(props) => <FollowingProject scrollScene={props} />}
        </ScrollScene>
      </UseCanvas>
    </>
  );
};
