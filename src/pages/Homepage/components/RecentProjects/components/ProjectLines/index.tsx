import { UseCanvas, useScrollRig } from "@14islands/r3f-scroll-rig";
import { StickyScrollScene } from "@14islands/r3f-scroll-rig/powerups";
import { useEffect, useRef } from "react";

import { FollowingProject, ProjectLine } from "..";
import { useProjectContext } from "../../../../../../hooks/useProjectContext";
import { useProjectMeshRect } from "../../../../../../store/useProjectMeshRect";
import { projects } from "../../data";

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
        className="h-[300vh] mt-0 mx-5 grid grid-cols-5 gap-0 md:gap-10 lg:mt-[64px] xl:gap-[112px] "
      >
        <div className="sticky justify-between top-[64px] h-screen md:h-fit col-span-5 lg:col-span-2 flex flex-col z-10 md:pt-[80px] md:top-0">
          {projects.map((item, index) => (
            <ProjectLine
              key={item.title}
              project={item}
              idx={index}
              isLast={index === projects.length - 1}
            />
          ))}
          <div className="block mt-10 h-full md:hidden">
            <img
              className="w-full h-[calc(100%-84px)] object-cover self-end pointer-events-none"
              src={selectedProject?.img}
            />
          </div>
        </div>
        <div
          ref={ref}
          className="hidden md:block sticky top-[64px] left-0 col-span-3 pointer-events-none pt-[80px] h-[calc(90vh-20px)] lg:top-[80px]"
          style={{ opacity: hasSmoothScrollbar ? 0 : 1 }}
        >
          <img
            className="w-full h-[90%] self-end pointer-events-none"
            src={selectedProject?.img}
          />
        </div>
      </div>

      {hasSmoothScrollbar && (
        <UseCanvas>
          <StickyScrollScene track={ref} inViewportMargin="1000%">
            {(props: any) => <FollowingProject scrollScene={props} />}
          </StickyScrollScene>
        </UseCanvas>
      )}
    </>
  );
};
