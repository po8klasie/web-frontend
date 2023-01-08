import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ProjectConfig } from '../../config/types';
import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query";
import { getProjectConfigProps } from "../../config/nextHelpers";
import withProjectConfig from "../../config/withProjectConfig";
import AppLayout from "../../components/app/AppLayout";
import FavoritesPage from "../../components/app/FavoritesPage/FavoritesPage";


const ProjectFavoritesPage = ({PROJECT}) => (
  (
    <AppLayout projectAppearance={PROJECT.appearance} className="h-full">
      <FavoritesPage />
    </AppLayout>
  )
)

export default withProjectConfig(ProjectFavoritesPage)

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
