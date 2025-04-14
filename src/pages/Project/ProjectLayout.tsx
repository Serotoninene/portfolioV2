import { useParams } from "react-router-dom";

import { projectsData } from "./projectsData";
export const ProjectLayout = () => {
  const { id } = useParams<{ id: string }>();

  if (!id || !projectsData[id]) {
    return (
      <>
        <div>Project not found</div>
      </>
    );
  }

  return <div className="h-screen relative"></div>;
};
