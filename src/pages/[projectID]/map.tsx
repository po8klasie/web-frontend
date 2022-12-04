// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';
import AppLayout from '../../components/app/AppLayout';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ProjectConfig } from '../../config/types';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import { queryClientOptions } from '../../api/queryClient';
import { getProjectConfigProps } from '../../config/nextHelpers';
import withProjectConfig from '../../config/withProjectConfig';
import { useState } from 'react';
import { SelectedSchoolProvider } from '../../hooks/useSelectedSchool';
import { BasicMapData, MapDataProvider } from '../../hooks/useMapData';
import MapPage from '../../components/app/MapSearchPage/MapPage';

const MapSearchPage = () => {
  const [basicMapData, setBasicMapData] = useState<BasicMapData>({
    bboxString: '',
    layers: [],
    zoom: -1,
    center: [0, 0],
  });

  return (
    <AppLayout wideNavbar noFooter>
      <div className="w-full h-full">
        <MapDataProvider basicMapData={basicMapData} setBasicMapData={setBasicMapData}>
          <SelectedSchoolProvider>
            <MapPage />
          </SelectedSchoolProvider>
        </MapDataProvider>
      </div>
    </AppLayout>
  );
};
export default withProjectConfig(MapSearchPage);

export const getServerSideProps = async (
  context: GetServerSidePropsContext<any>,
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

  return {
    props: {
      PROJECT: await getProjectConfigProps(['appearance', 'searchView'], projectID),
      dehydratedState: dehydrate(queryClient),
    },
  };
};
