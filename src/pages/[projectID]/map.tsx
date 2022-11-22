// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';
import AppLayout from '../../components/app/AppLayout';
import dynamic from 'next/dynamic';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ProjectConfig } from '../../config/types';
import { dehydrate, DehydratedState, QueryClient, useQuery } from '@tanstack/react-query';
import { queryClientOptions } from '../../api/queryClient';
import { getProjectConfigProps } from '../../config/nextHelpers';
import withProjectConfig from '../../config/withProjectConfig';
import SchoolCard from '../../components/app/SchoolCard';
// import { BsFillGearFill } from "@react-icons/all-files/bs/BsFillGearFill";
import { BsGearWideConnected } from '@react-icons/all-files/bs/BsGearWideConnected';
// import { MdOutlineMapsHomeWork } from "react-icons/all";
import { MdWork } from '@react-icons/all-files/md/MdWork';
import { FaSchool } from '@react-icons/all-files/fa/FaSchool';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { FiLayers } from '@react-icons/all-files/fi/FiLayers';
import MapWrapper from '../../components/app/MapSearchPage/MapWrapper';
import Filters from '../../components/app/MapSearchPage/Filters';
import { useForm, FormProvider } from 'react-hook-form';
import { parse, stringify } from 'query-string';
import { useEffect, useMemo } from 'react';
import useDebouncedValue from '../../hooks/useDebouncedValue';
import { SelectedSchoolProvider } from '../../hooks/useSelectedSchool';
import SelectedSchoolCard from '../../components/app/MapSearchPage/SelectedSchoolCard';
import { useRouter } from 'next/router';

const parseQS = (asPath: string) => parse(new URL(`http://example.com${asPath}`).search);

const MapSearchPage = () => {
  const router = useRouter();
  const formMethods = useForm({
    defaultValues: {
      query: '',
      ...parseQS(router.asPath),
    },
  });
  const watched = formMethods.watch();
  const debouncedWatched = useDebouncedValue(watched, 200);
  const serialized = useMemo(
    () =>
      stringify(debouncedWatched, {
        skipNull: true,
        skipEmptyString: true,
      }),
    [debouncedWatched],
  );

  useEffect(() => {
    window.history.replaceState(
      null,
      '',
      serialized ? `${window.location.pathname}?${serialized}` : window.location.pathname,
    );
  }, [serialized]);

  const { data } = useQuery<any>([`/search/institution/?${serialized}`], {
    placeholderData: [],
  });
  console.log(data);

  return (
    <AppLayout wideNavbar noFooter>
      <div className="w-full h-full">
        <SelectedSchoolProvider>
          <FormProvider {...formMethods}>
            <div className="grid grid-cols-12 h-full pt-2">
              <div className="col-span-2 overflow-y-scroll">
                <Filters />
              </div>
              <div className="col-span-7 relative">
                <MapWrapper />
              </div>
              <div className="col-span-3 overflow-y-scroll">
                <div className="px-2">
                  <SelectedSchoolCard />
                  {data.map((school) => (
                    <div className="p-1" key={school.rspo}>
                      <SchoolCard school={school} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FormProvider>
        </SelectedSchoolProvider>
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
