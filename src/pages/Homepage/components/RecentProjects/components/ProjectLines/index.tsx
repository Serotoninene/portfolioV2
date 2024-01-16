import { UseCanvas, useScrollRig } from "@14islands/r3f-scroll-rig";
import { StickyScrollScene } from "@14islands/r3f-scroll-rig/powerups";
import { useEffect, useRef } from "react";

import { FollowingProject, ProjectLine } from "..";
import { useProjectMeshRect } from "../../../../../../store/useProjectMeshRect";
import { projects } from "../../data";
import { useProjectContext } from "../../../../../../hooks/useProjectContext";

export const ProjectLines = () => {
  const container = useRef(null);
  const ref = useRef<HTMLDivElement>(null);
  const { setRect } = useProjectMeshRect();
  const { hasSmoothScrollbar } = useScrollRig();
  const { selectedProject } = useProjectContext();

  const handleSetRect = () => {
    const rect = ref.current?.getBoundingClientRect();
    setRect({
      y: rect ? rect.top : 0,
      x: rect ? rect.left : 0,
      width: rect ? rect.width : 0,
      height: rect ? rect.height : 0,
    });
  };

  useEffect(() => {
    if (!ref.current) return;
    handleSetRect();
    window.addEventListener("scroll", handleSetRect);

    return () => {
      window.removeEventListener("scroll", handleSetRect);
    };
  }, [ref.current]);

  return (
    <>
      <div
        ref={container}
        id="ProjectLines"
        className="h-[300vh] mt-[64px] mx-5 grid grid-cols-5 gap-0 md:gap-10 xl:gap-[112px] "
      >
        <div className="sticky top-0 h-fit col-span-2 flex flex-col pt-[80px]">
          {projects.map((item, index) => (
            <ProjectLine
              key={item.title}
              project={item}
              num={index + 1}
              isLast={index === projects.length - 1}
            />
          ))}
        </div>
        <div
          ref={ref}
          className="sticky top-[80px] left-0 col-span-3 pointer-events-none pt-[80px] h-[calc(90vh-20px)]"
          style={{ opacity: hasSmoothScrollbar ? 0 : 1 }}
        >
          <img
            className="w-full h-full pointer-events-none"
            src={selectedProject?.img}
          />
        </div>
      </div>

      {hasSmoothScrollbar && (
        <UseCanvas>
          <StickyScrollScene
            track={ref}
            scissor={false}
            inViewportMargin="1000%"
          >
            {(props) => <FollowingProject scrollScene={props} />}
          </StickyScrollScene>
        </UseCanvas>
      )}
    </>
  );
};
