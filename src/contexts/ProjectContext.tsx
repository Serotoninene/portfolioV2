import React, { createContext, useMemo, useState } from "react";
import { Project } from "../pages/Homepage/components/RecentProjects/types";

interface ProjectContextProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  isHover: boolean;
  setIsHover: (isHover: boolean) => void;
}

interface ProjectProviderProps {
  children: React.ReactNode;
}

export const ProjectContext = createContext<ProjectContextProps>({
  selectedProject: null,
  setSelectedProject: () => {},
  isHover: false,
  setIsHover: () => {},
});

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [isHover, setIsHover] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const value = useMemo(
    () => ({ selectedProject, setSelectedProject, isHover, setIsHover }),
    [selectedProject, isHover]
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
