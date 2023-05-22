'use client';

import { createContext, FC, useContext } from 'react';
import { ProjectConfig } from './types';

export const projectConfigContext = createContext<ProjectConfig>({});

export const useProjectConfig = () => useContext(projectConfigContext);

interface ProjectConfigProviderProps {
  projectConfig: ProjectConfig;
}
const ProjectConfigProvider: FC<ProjectConfigProviderProps> = ({ projectConfig, children }) => (
  <projectConfigContext.Provider value={projectConfig}>{children}</projectConfigContext.Provider>
);

export default ProjectConfigProvider;
