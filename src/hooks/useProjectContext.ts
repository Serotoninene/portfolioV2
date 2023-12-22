import { useContext } from "react";
import { ProjectContext } from "../contexts/ProjectContext";

export const useProjectContext = () => {
  const { selectedProject, setSelectedProject } = useContext(ProjectContext);
  return { selectedProject, setSelectedProject };
};
