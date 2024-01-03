import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import { MutableRefObject, useRef } from "react";

import { FollowingProject, ProjectLine } from "..";
import { projects } from "../../data";

export const ProjectLines = () => {
  const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const dimensions = ref.current?.getBoundingClientRect();
  //   const moveDiv = (e: MouseEvent) => {
  //     if (dimensions) {
  //       gsap.to(ref.current, {
  //         x: e.clientX - dimensions.width / 2,
  //         y: e.clientY - dimensions.height / 2,
  //         ease: Power1.easeOut,
  //       });
  //     }
  //   };

  //   window.addEventListener("mousemove", moveDiv);

  //   return () => {
  //     window.removeEventListener("mousemove", moveDiv);
  //   };
  // }, []);

  return (
    <>
      <div className="relative mt-[64px] ml-5 overflow-hidden">
        {projects.map((item, index) => (
          <ProjectLine key={item.title} {...item} num={index + 1} />
        ))}
        <div className="absolute inset-0 border border-red-400 flex justify-center items-center">
          <div
            ref={ref}
            className="w-[70%] aspect-[16/9] pointer-events-none bg-red-400 opacity-50"
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
