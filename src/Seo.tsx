import { DefaultSeo as DefaultNextSeo, DefaultSeoProps, NextSeo, NextSeoProps } from 'next-seo';
import { publicRuntimeConfig } from './runtimeConfig';
import { FC } from 'react';

const { APP_ENVIRONMENT } = publicRuntimeConfig;

export const defaultSeoConfig: DefaultSeoProps = {
  dangerouslySetAllPagesToNoIndex: APP_ENVIRONMENT !== 'production', // do not index test server
  defaultTitle: 'po8klasie - wyszukiwarka szkół średnich',
  description: 'Najprostsza i najszybsza wyszukiwarka szkół średnich',
  titleTemplate: '%s | po8klasie',
  twitter: {
    handle: '@po8klasie',
    cardType: 'summary_large_image',
  },
};

interface ProjectSpecificSeoProps extends NextSeoProps {
  projectName: string;
}

export const ProjectSpecificSeo: FC<ProjectSpecificSeoProps> = ({ projectName, ...props }) => {
  const titleTemplate = `%s | po8klasie ${projectName}`;
  return <NextSeo titleTemplate={titleTemplate} {...props} />;
};

export const DefaultSeo = () => <DefaultNextSeo {...defaultSeoConfig} />;
