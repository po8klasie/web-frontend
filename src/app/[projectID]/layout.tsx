import AppLayout from './_components/AppLayout';
import Providers from './Providers';
import React from 'react';
import { fetchProjectConfig } from '../../api/projectConfig/projectConfig';
import environment from '../../environment/server';
import { ProjectPageT } from '../../types';
import { defaultMetadata } from '../../utils/seo';
import Analytics from './_components/Analytics';
import { ProjectConfig } from '../../api/projectConfig/types';

export const metadata = defaultMetadata;

const Layout: ProjectPageT = async ({ children, params }) => {
  const projectConfig = await fetchProjectConfig(params.projectID);
  return (
    <Providers projectConfig={projectConfig} environment={environment}>
      <Analytics />
      <AppLayout className="h-full">{children}</AppLayout>
    </Providers>
  );
};

export default Layout;

export async function generateStaticParams() {
  const API_URL = environment.publicEnvironment.API_URL;
  if (!API_URL) return [];

  const projectConfigs = (await fetch(`${environment.publicEnvironment.API_URL}/project`).then(
    (res) => res.json(),
  )) as ProjectConfig[];

  return projectConfigs.map(({ projectId }) => ({
    projectID: projectId,
  }));
}
