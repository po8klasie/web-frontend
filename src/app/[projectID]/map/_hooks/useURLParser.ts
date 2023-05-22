import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../../store/hooks';
import { useEffect } from 'react';
import {
  setDefaultFiltersValues,
  setFiltersValues,
  setDesiredMapPosition,
  setQueryInitial,
} from '../../../../store/slices/mapSearchPageDataSlice';
import {
  parseFiltersFromUrl,
  parseMapPositionFromURL,
  parseQueryFromURL,
} from '../../../../utils/searchParser';
import { useProjectConfig } from "../../../../api/projectConfig/projectConfigContext";
import { useSearchParams } from "next/navigation";

const getFiltersDefaultValues = (filters) =>
  filters.reduce(
    (acc, filter) => ({
      ...acc,
      [filter.name]: filter.defaultValue,
    }),
    {},
  );

const useURLParser = () => {
  const searchParams = useSearchParams();
  const {
    searchViewConfig: { filters },
  } = useProjectConfig();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const defaultFiltersValues = getFiltersDefaultValues(filters);
    dispatch(setDefaultFiltersValues(defaultFiltersValues));
    dispatch(
      setFiltersValues({
        ...defaultFiltersValues,
        ...parseFiltersFromUrl(searchParams?.toString() ?? '', filters),
      }),
    );
    dispatch(setQueryInitial(parseQueryFromURL(searchParams?.toString() ?? '')));
    dispatch(setDesiredMapPosition(parseMapPositionFromURL(searchParams?.toString() ?? '')));
    // eslint-disable-next-line react-_hooks/exhaustive-deps
  }, []);
};

export default useURLParser;
