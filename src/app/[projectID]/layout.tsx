import AppLayout from './_components/AppLayout';
import Providers from './Providers';
import React from 'react';
import { fetchProjectConfig } from '../../api/projectConfig/projectConfig';
import environment from '../../environment/server';
import { ProjectPageT } from '../../types';
import { defaultMetadata } from '../../utils/seo';
import Analytics from './_components/Analytics';

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
