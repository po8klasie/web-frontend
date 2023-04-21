import AppLayout from '../../components/app/AppLayout';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ProjectConfig } from '../../config/types';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import { queryClientOptions } from '../../api/queryClient';
import withProjectConfig from '../../config/withProjectConfig';
import { SelectedSchoolProvider } from '../../hooks/useSelectedSchool';
import MapSearchPageInternals from '../../components/app/MapSearchPage/MapSearchPage';
import { ProjectSpecificSeo } from '../../Seo';
import React from 'react';
import { fetchProjectConfig } from '../../config/fetchProjectConfig';

const MapSearchPage = ({ PROJECT }) => {
  return (
    <AppLayout projectName={PROJECT.projectName} wideNavbar noFooter className="h-full">
      <ProjectSpecificSeo
        projectName={PROJECT.projectName}
        title="Mapa szkół"
        description="Wyszukaj szkoły średnie z po8klasie"
      />
      <div className="w-full h-full">
        <SelectedSchoolProvider>
          <MapSearchPageInternals />
        </SelectedSchoolProvider>
      </div>
    </AppLayout>
  );
};
export default withProjectConfig(MapSearchPage);

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ projectID: string }>,
): Promise<
  GetServerSidePropsResult<{ PROJECT: Partial<ProjectConfig>; dehydratedState: DehydratedState }>
> => {
  const projectID = context?.params?.projectID;

  if (!projectID)
    return {
      notFound: true,
    };

  const queryClient = new QueryClient(queryClientOptions);

  // TODO(micorix): Prefetch with params
  await queryClient.prefetchQuery([`/institution/?project_id=${projectID}`]);

  console.log(await fetchProjectConfig(projectID, ['search_view_config']));

  return {
    props: {
      PROJECT: await fetchProjectConfig(projectID, ['search_view_config']),
      dehydratedState: dehydrate(queryClient),
    },
  };
};
