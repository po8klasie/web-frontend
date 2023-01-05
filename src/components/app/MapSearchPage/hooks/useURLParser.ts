import { useRouter } from "next/router";
import { useProjectConfig } from "../../../../config/projectConfigContext";
import { useAppDispatch } from "../../../../store/hooks";
import { useEffect } from "react";
import {
  setDefaultFiltersValues,
  setFiltersValues,
  setDesiredMapPosition,
  setQuery
} from "../../../../store/slices/mapSearchPageDataSlice";
import { parseFiltersFromUrl, parseMapPositionFromURL, parseQueryFromURL } from "../../../../utils/searchParser";

const getFiltersDefaultValues = (filters) => filters.reduce(
  (acc, filter) => ({
    ...acc,
    [filter.name]: filter.defaultValue,
  }),
  {},
)

const useURLParser = () => {
  const router = useRouter();
  const {
    searchView: { filters },
  } = useProjectConfig();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const defaultFiltersValues = getFiltersDefaultValues(filters)
    dispatch(setDefaultFiltersValues(defaultFiltersValues));
    dispatch(
      setFiltersValues({
        ...defaultFiltersValues,
        ...parseFiltersFromUrl(router.asPath, filters),
      }),
    );
    dispatch(setQuery(parseQueryFromURL(router.asPath)));
    dispatch(setDesiredMapPosition(parseMapPositionFromURL(router.asPath)))
  }, []);
}

export default useURLParser