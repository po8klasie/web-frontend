import { useQuery } from '@tanstack/react-query';
import SchoolCard from '../../../components/app/SchoolCard';
import MapWrapper from '../../../components/app/MapSearchPage/MapWrapper';
import Filters from '../../../components/app/MapSearchPage/Filters';
import { useForm, FormProvider } from 'react-hook-form';
import { parse } from 'query-string';
import { useEffect, useMemo } from 'react';
import SelectedSchoolCard from '../../../components/app/MapSearchPage/SelectedSchoolCard';
import { useRouter } from 'next/router';
import useMapData from '../../../hooks/useMapData';
import { serializeSearchData } from '../../../utils/searchSerializer';
import { useProjectConfig } from '../../../config/projectConfigContext';
import styles from './styles/MapPage.module.css';
const parseQS = (asPath: string) => parse(new URL(`http://example.com${asPath}`).search);

const MapPage = () => {
  const router = useRouter();
  const formMethods = useForm({
    defaultValues: {
      query: '',
      ...parseQS(router.asPath),
    },
  });

  const { debouncedBboxString } = useMapData();
  const { projectID } = useProjectConfig();

  const watched = formMethods.watch();
  const serializedClientPath = useMemo(() => serializeSearchData(watched, formMethods.formState), [
    watched,
    formMethods.formState,
  ]);
  const serializedAPIPath = useMemo(
    () =>
      serializeSearchData(watched, formMethods.formState, {
        project_id: projectID,
        bbox: debouncedBboxString,
      }),
    [watched, formMethods.formState, debouncedBboxString, projectID],
  );

  useEffect(() => {
    window.history.replaceState(
      null,
      '',
      serializedClientPath
        ? `${window.location.pathname}?${serializedClientPath}`
        : window.location.pathname,
    );
  }, [serializedClientPath]);

  const { data } = useQuery<any>([`/search/institution/?${serializedAPIPath}`], {
    placeholderData: [],
    // refetchInterval: false,
  });
  console.log(data);

  return (
    <FormProvider {...formMethods}>
      <div className="flex flex-col md:grid md:grid-cols-12 h-full pt-2">
        <div className={styles.filtersPane}>
          <Filters />
        </div>
        <div className={styles.mapPane}>
          <MapWrapper />
        </div>
        <div className={styles.institutionsPaneExpanded}>
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
  );
};
export default MapPage;
