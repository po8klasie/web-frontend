import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ProjectConfig } from '../../config/types';
import { DehydratedState } from '@tanstack/react-query';
import withProjectConfig from '../../config/withProjectConfig';
import AppLayout from '../../components/app/AppLayout';
import FavoritesPage from '../../components/app/FavoritesPage/FavoritesPage';
import { ProjectSpecificSeo } from '../../Seo';
import React from 'react';
import { fetchProjectConfig } from '../../config/fetchProjectConfig';

const ProjectFavoritesPage = ({ PROJECT }) => (
  <AppLayout projectName={PROJECT.projectName} className="min-h-[100vh]">
    <ProjectSpecificSeo projectName={PROJECT.projectName} title="Ulubione szkoły" />
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
      PROJECT: await fetchProjectConfig(projectID, []),
    },
  };
};
