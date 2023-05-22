'use client';

import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { setFilterValue } from "../../../../../store/slices/mapSearchPageDataSlice";
import { useCallback, useMemo } from "react";

const useFiltersValue = <T = unknown>(filterName: string, emptyValue: T | null = null) => {
  const filtersState = useAppSelector((state) => state.mapSearchPageData.filters);
  const dispatch = useAppDispatch();
  const value = filtersState[filterName] as T | null

  const setValue = useCallback((value: T | null) =>
    dispatch(
      setFilterValue({
        filterName,
        value,
      }),
    ), [filterName, dispatch])

  const safeValue = useMemo(() => value ?? emptyValue, [
    JSON.stringify(value),
    JSON.stringify(emptyValue)
  ])

  return useMemo(() => ({
    value: safeValue,
    setValue
  }), [safeValue, setValue])
}

export default useFiltersValue

