import useDebouncedBbox from './useDebouncedBbox';

import { useMemo } from 'react';
import {
  createFiltersObjectWithoutDefaults,
  stringifyMapPosition,
  stringifyQueryString,
} from '../../../../utils/searchSerializer';
import { useAppSelector } from '../../../../store/hooks';
import { useProjectConfig } from "../../../../api/projectConfig/projectConfigContext";

export const useFiltersObjectWithoutDefaults = () => {
  const filters = useAppSelector((state) => state.mapSearchPageData.filters);
  const defaultFiltersValues = useAppSelector(
    (state) => state.mapSearchPageData.defaultFiltersValues,
  );
  return useMemo(
    () => createFiltersObjectWithoutDefaults(filters, defaultFiltersValues),
    [filters, defaultFiltersValues],
  );
};

const useURLSerializer = () => {
  const { projectId } = useProjectConfig();

  const query = useAppSelector((state) => state.mapSearchPageData.query);
  const currentMapPosition = useAppSelector((state) => state.mapSearchPageData.currentMapPosition);
  const debouncedBbox = useDebouncedBbox();
  const filterObjWithoutDefaults = useFiltersObjectWithoutDefaults();

  const serializedClientQueryString = useMemo(
    () =>
      stringifyQueryString({
        ...filterObjWithoutDefaults,
        query,
      }),
    [filterObjWithoutDefaults, query],
  );

  const serializedAPIQueryString = useMemo(
    () =>
      stringifyQueryString({
        ...filterObjWithoutDefaults,
        query,
        project_id: projectId,
        bbox: debouncedBbox,
      }),
    [filterObjWithoutDefaults, query, debouncedBbox, projectId],
  );

  const serializedMapPosition = useMemo(() => {
    if (!currentMapPosition) return '';
    return stringifyMapPosition(currentMapPosition.center, currentMapPosition.zoom);
  }, [currentMapPosition]);

  return {
    serializedAPIQueryString,
    serializedClientQueryString,
    serializedMapPosition,
  };
};

export default useURLSerializer;