import React, { FC } from 'react';
import { ProjectConfigProvider } from './projectConfigContext';
import { ProjectConfig } from './types';

export interface ProjectConfigConsumerProps<T extends keyof ProjectConfig> {
  PROJECT: Pick<ProjectConfig, T>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withProjectConfig = <T extends ProjectConfigConsumerProps<any>>(
  WrappedComponent: FC<T>,
): FC<T> => (props) => {
  return (
    <ProjectConfigProvider value={props.PROJECT ?? {}}>
      <WrappedComponent {...props} />
    </ProjectConfigProvider>
  );
};

export default withProjectConfig;
