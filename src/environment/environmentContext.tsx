'use client';
import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { IEnvironment } from './types';
import publicEnvironment from './server';

export const environmentContext = createContext<IEnvironment>({
  publicEnvironment,
});

export const useEnvironment = () => useContext(environmentContext);

interface EnvironmentProviderProps {
  environment: IEnvironment;
}

const EnvironmentProvider: FC<PropsWithChildren<EnvironmentProviderProps>> = ({
  environment,
  children,
}) => <environmentContext.Provider value={environment}>{children}</environmentContext.Provider>;

export default EnvironmentProvider;
