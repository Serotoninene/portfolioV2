import { MutableRefObject, useLayoutEffect, useRef, useState } from "react";
import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import gsap from "gsap";

import { FollowingProject, ProjectLine } from "..";
import { projects } from "../../data";

export const ProjectLines = () => {
  const container = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline>();

  useLayoutEffect(() => {
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom center",
        pin: true,
        markers: true,
      },
    });

    return () => {
      tl.current?.kill();
    };
  }, []);

  return (
    <>
      <div
        ref={container}
        className="relative grid grid-cols-5 gap-10 xl:gap-28 mt-[64px] mx-5 overflow-hidden"
      >
        <div className="col-span-2 flex flex-col pt-[80px]">
          {projects.map((item, index) => (
            <ProjectLine
              key={item.title}
              {...item}
              num={index + 1}
              isLast={index === projects.length - 1}
            />
          ))}
        </div>
        <div className="col-span-3 pointer-events-none pr-5 pt-[80px] h-[calc(100vh-20px)]">
          <div ref={ref} className="w-full h-full pointer-events-none" />
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
