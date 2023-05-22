'use client';

import { store } from '../../store/store';
import { Provider as StoreProvider } from 'react-redux/es/exports';
import EnvironmentProvider from '../../environment/environmentContext';
import ProjectConfigProvider from '../../api/projectConfig/projectConfigContext';
import { IEnvironment } from '../../environment/types';
import { FC, PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../api/queryClient';
import { ProjectConfig } from '../../api/projectConfig/types';

interface ProvidersProps {
  environment: IEnvironment;
  projectConfig: ProjectConfig;
}

const Providers: FC<PropsWithChildren<ProvidersProps>> = ({
  children,
  environment,
  projectConfig,
}) => {
  return (
    <EnvironmentProvider environment={environment}>
      <ProjectConfigProvider projectConfig={projectConfig}>
        <QueryClientProvider client={queryClient}>
          <StoreProvider store={store}>{children}</StoreProvider>
        </QueryClientProvider>
      </ProjectConfigProvider>
    </EnvironmentProvider>
  );
};

export default Providers;
