import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ProjectConfig } from '../../config/types';
import { DehydratedState } from '@tanstack/react-query';
import { getProjectConfigProps } from '../../config/nextHelpers';
import withProjectConfig from '../../config/withProjectConfig';
import AppLayout from '../../components/app/AppLayout';
import FavoritesPage from '../../components/app/FavoritesPage/FavoritesPage';
import { ProjectSpecificSeo } from '../../Seo';
import React from 'react';

const ProjectFavoritesPage = ({ PROJECT }) => (
  <AppLayout projectAppearance={PROJECT.appearance} className="min-h-[100vh]">
    <ProjectSpecificSeo appearanceConfig={PROJECT.appearance} title="Ulubione szkoły" />
    <FavoritesPage />
  </AppLayout>
);

export default withProjectConfig(ProjectFavoritesPage);

interface SchoolPageParams extends ParsedUrlQuery {
  schoolID: string;
  projectID: string;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext<SchoolPageParams>,
): Promise<
  GetServerSidePropsResult<{ PROJECT: Partial<ProjectConfig>; dehydratedState: DehydratedState }>
> => {
  const projectID = context?.params?.projectID;

  if (!projectID)
    return {
      notFound: true,
    };

  return {
    props: {
      PROJECT: await getProjectConfigProps(['appearance'], projectID),
    },
  };
};
