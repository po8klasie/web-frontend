import { useQuery } from '@tanstack/react-query';
import SchoolCard, { SchoolCardPlaceholder } from '../../../components/app/SchoolCard';
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
import InstitutionListing from './InstitutionListing';
import { parseFiltersFromUrl, parseQueryFromURL } from '../../../utils/searchParser';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  resetFilterValues,
  setDefaultFiltersValues,
  setFiltersValues,
  setQuery,
} from '../../../store/slices/mapSearchPageDataSlice';

const MapSearchPage = () => {
  const router = useRouter();
  const {
    searchView: { filters },
  } = useProjectConfig();
  const formMethods = useForm();
  const mapSearchPageData = useAppSelector((state) => state.mapSearchPageData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const defaultFiltersValues = filters.reduce(
      (acc, filter) => ({
        ...acc,
        [filter.name]: filter.defaultValue,
      }),
      {},
    );
    dispatch(setDefaultFiltersValues(defaultFiltersValues));
    dispatch(
      setFiltersValues({
        ...defaultFiltersValues,
        ...parseFiltersFromUrl(router.asPath, filters),
      }),
    );
    dispatch(setQuery(parseQueryFromURL(router.asPath)));
  }, []);

  const { debouncedBboxString } = useMapData();
  const { projectID } = useProjectConfig();

  const serializedClientPath = useMemo(
    () =>
      serializeSearchData(mapSearchPageData.filters, mapSearchPageData.defaultFiltersValues, {
        query: mapSearchPageData.query,
      }),
    [mapSearchPageData.filters, mapSearchPageData.defaultFiltersValues, mapSearchPageData.query],
  );

  const serializedAPIPath = useMemo(
    () =>
      serializeSearchData(mapSearchPageData.filters, mapSearchPageData.defaultFiltersValues, {
        query: mapSearchPageData.query,
        project_id: projectID,
        bbox: debouncedBboxString,
      }),
    [
      mapSearchPageData.filters,
      mapSearchPageData.defaultFiltersValues,
      mapSearchPageData.query,
      debouncedBboxString,
      projectID,
    ],
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
            <InstitutionListing serializedAPIPath={serializedAPIPath} />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
export default MapSearchPage;
