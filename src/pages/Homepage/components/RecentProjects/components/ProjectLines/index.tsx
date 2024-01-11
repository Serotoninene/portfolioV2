import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import { MutableRefObject, useRef } from "react";

import { FollowingProject, ProjectLine } from "..";
import { projects } from "../../data";

export const ProjectLines = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="relative grid grid-cols-5 gap-10 mt-[64px] ml-5 overflow-hidden">
        <div className="col-span-2 flex flex-col">
          {projects.map((item, index) => (
            <ProjectLine
              key={item.title}
              {...item}
              num={index + 1}
              isLast={index === projects.length - 1}
            />
          ))}
        </div>
        <div className="col-span-3 pointer-events-none pr-5">
          <div ref={ref} className="w-full h-full pointer-events-none" />
        </div>
      </div>

      <UseCanvas>
        <ScrollScene
          track={ref as MutableRefObject<HTMLDivElement>}
          inViewportMargin="400%"
        >
          {(props) => <FollowingProject scrollScene={props} />}
        </ScrollScene>
      </UseCanvas>
    </>
  );
};
