import { UseCanvas } from "@14islands/r3f-scroll-rig";
import { StickyScrollScene } from "@14islands/r3f-scroll-rig/powerups";
import { useRef } from "react";

import { FollowingProject, ProjectLine } from "..";
import { projects } from "../../data";
import { useGap } from "./hooks/useGap";

export const ProjectLines = () => {
  const container = useRef(null);
  const ref = useRef(null);
  const GAP = useGap();

  return (
    <>
      <div
        ref={container}
        className="mt-[64px] mx-5 grid grid-cols-4 h-[200vh] md"
        style={{ gap: GAP }}
      >
        <div className="sticky top-0 h-fit col-span-2 flex flex-col pt-[80px]">
          {projects.map((item, index) => (
            <ProjectLine
              key={item.title}
              {...item}
              num={index + 1}
              isLast={index === projects.length - 1}
            />
          ))}
        </div>
        <div
          ref={ref}
          className="sticky top-[80px] col-span-2 pointer-events-none pt-[80px] h-[calc(70vh-20px)] bg-red-200 opacity-25"
        >
          <div className="w-full h-full pointer-events-none" />
        </div>
      </div>

      <UseCanvas>
        <StickyScrollScene track={ref}>
          {(props) => (
            <>
              <FollowingProject scrollScene={props} />
            </>
          )}
        </StickyScrollScene>
      </UseCanvas>
    </>
  );
};
