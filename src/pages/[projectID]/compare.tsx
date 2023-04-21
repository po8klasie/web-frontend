import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ProjectConfig } from '../../config/types';
import { DehydratedState } from '@tanstack/react-query';
import withProjectConfig from '../../config/withProjectConfig';
import AppLayout from '../../components/app/AppLayout';
import ComparisonPage from '../../components/app/ComparisonPage/ComparisonPage';
import { ProjectSpecificSeo } from '../../Seo';
import React from 'react';
import { fetchProjectConfig } from '../../config/fetchProjectConfig';

const ProjectComparisonPage = ({ PROJECT }) => (
  <AppLayout projectName={PROJECT.projectName} className="min-h-[100vh]">
    <ProjectSpecificSeo
      projectName={PROJECT.projectName}
      title="Porównywarka szkół"
      description="Porównaj szkoły z porównywarką wyszukiwarki szkół średnich po8klasie"
    />
    <ComparisonPage />
  </AppLayout>
);

export default withProjectConfig(ProjectComparisonPage);

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
