'use client';

import SearchField from '../../../../components/SearchField';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setQuery } from '../../../../store/slices/mapSearchPageDataSlice';

const QueryField = () => {
  const queryState = useAppSelector((state) => state.mapSearchPageData.query);
  const dispatch = useAppDispatch();
  const handleQueryFormSubmit = (query: string) => {
    dispatch(setQuery(query));
  };

  return (
    <SearchField
      query={queryState}
      onSubmit={handleQueryFormSubmit}
      narrowAutoCompleteWrapper={true}
    />
  );
};

export default QueryField;
