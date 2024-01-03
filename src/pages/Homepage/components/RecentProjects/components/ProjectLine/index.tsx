import { useCallback } from "react";
import { useProjectContext } from "../../../../../../hooks/useProjectContext";

type Props = {
  title: string;
  subtitle: string;
  num: number;
  img: string;
};

export const ProjectLine = ({ title, subtitle, num, img }: Props) => {
  const formattedNum = num.toString().padStart(2, "0");

  const { setSelectedProject } = useProjectContext();

  const handleHover = useCallback(() => {
    setSelectedProject({ title, subtitle, img });
  }, [setSelectedProject, title, subtitle, img]);

  const handleLeave = useCallback(() => {
    setSelectedProject(null);
  }, [setSelectedProject]);

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="border-t border-dark pt-6 pb-10 grid grid-cols-6"
    >
      <div className="flex gap-5 col-span-3">
        <div className="font-medium mt-2">{formattedNum}</div>
        <h3 className="text-[32px] font-bold">{title}</h3>
      </div>
      <p className="text-[20px] col-span-2">{subtitle}</p>
      <div className="flex justify-end pr-4">
        <img
          className="w-6 aspect-square"
          src="/assets/Icons/Arrow.svg"
          alt="Arrow"
        />
      </div>
    </div>
  );
};
