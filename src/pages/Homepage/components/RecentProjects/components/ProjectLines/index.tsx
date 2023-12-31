import { MutableRefObject, useEffect, useRef } from "react";
import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import gsap, { Power1 } from "gsap";

import { FollowingProject, ProjectLine } from "..";
import { projects } from "../../data";

export const ProjectLines = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dimensions = ref.current?.getBoundingClientRect();
    const moveDiv = (e: MouseEvent) => {
      if (dimensions) {
        gsap.to(ref.current, {
          x: e.clientX - dimensions.width / 2,
          y: e.clientY - dimensions.height / 2 + window.scrollY,
          ease: Power1.easeOut,
        });
      }
    };

    window.addEventListener("mousemove", moveDiv);

    return () => {
      window.removeEventListener("mousemove", moveDiv);
    };
  }, []);

  return (
    <>
      <div className="relative mt-[64px] ml-5 mr-[160px]">
        {projects.map((item, index) => (
          <ProjectLine key={item.title} {...item} num={index + 1} />
        ))}
      </div>

      <div
        ref={ref}
        className="absolute top-0 left-0 w-[300px] aspect-[3/5] pointer-events-none bg-red-400 opacity-50"
      />

      <UseCanvas>
        <ScrollScene track={ref as MutableRefObject<HTMLDivElement>}>
          {(props) => <FollowingProject scrollScene={props} />}
        </ScrollScene>
      </UseCanvas>
    </>
  );
};
