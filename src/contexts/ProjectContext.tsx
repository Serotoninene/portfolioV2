import React, { createContext, useMemo, useState } from "react";
import { Project } from "../pages/Homepage/components/RecentProjects/types";

interface ProjectContextProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

interface ProjectProviderProps {
  children: React.ReactNode;
}

export const ProjectContext = createContext<ProjectContextProps>({
  selectedProject: null,
  setSelectedProject: () => {},
});

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const value = useMemo(
    () => ({ selectedProject, setSelectedProject }),
    [selectedProject]
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
