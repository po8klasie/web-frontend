'use client'
import { createContext, useContext } from 'react';
import { fetchProjectConfig } from "./projectConfig";
import { ProjectConfig } from "../../config/types";

export const projectConfigContext = createContext<ProjectConfig>({});

export const useProjectConfig = () => useContext(projectConfigContext);

const ProjectConfigProvider = ({projectConfig, children}) => (
  <projectConfigContext.Provider value={projectConfig}>
    {children}
  </projectConfigContext.Provider>
)


export default ProjectConfigProvider
