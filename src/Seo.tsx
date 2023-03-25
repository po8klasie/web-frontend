import { DefaultSeo as DefaultNextSeo, DefaultSeoProps, NextSeo, NextSeoProps } from 'next-seo';
import { publicRuntimeConfig } from './runtimeConfig';
import { AppearanceConfig } from './config/types';
import { FC } from 'react';

const { APP_ENVIRONMENT } = publicRuntimeConfig;

export const defaultSeoConfig: DefaultSeoProps = {
  dangerouslySetAllPagesToNoIndex: APP_ENVIRONMENT !== 'production', // do not index test server
  defaultTitle: 'po8klasie - wyszukiwarka szkół średnich',
  titleTemplate: '%s | po8klasie',
  twitter: {
    handle: '@po8klasie',
    cardType: 'summary_large_image',
  },
};

interface ProjectSpecificSeoProps extends NextSeoProps {
  appearanceConfig: AppearanceConfig;
}

export const ProjectSpecificSeo: FC<ProjectSpecificSeoProps> = ({ appearanceConfig, ...props }) => {
  const titleTemplate = `%s | po8klasie ${appearanceConfig.appName}`;
  return <NextSeo titleTemplate={titleTemplate} {...props} />;
};

export const DefaultSeo = () => <DefaultNextSeo {...defaultSeoConfig} />;
