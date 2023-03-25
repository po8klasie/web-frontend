import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ProjectConfig } from '../../config/types';
import { DehydratedState } from '@tanstack/react-query';
import { getProjectConfigProps } from '../../config/nextHelpers';
import withProjectConfig from '../../config/withProjectConfig';
import AppLayout from '../../components/app/AppLayout';
import ProjectDashboardPage from '../../components/app/ProjectDashboardPage/ProjectDashboardPage';

const ProjectIndexPage = ({ PROJECT }) => (
  <AppLayout projectAppearance={PROJECT.appearance} className="h-full">
    <ProjectDashboardPage />
  </AppLayout>
);

export default withProjectConfig(ProjectIndexPage);

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

  if (!projectID?.trim())
    return {
      notFound: true,
    };

  let projectConfigProps;

  try {
    projectConfigProps = await getProjectConfigProps(['appearance'], projectID);
  } catch {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      PROJECT: projectConfigProps,
    },
  };
};
