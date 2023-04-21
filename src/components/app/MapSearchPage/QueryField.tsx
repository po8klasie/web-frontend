import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setQuery } from '../../../store/slices/mapSearchPageDataSlice';
import SearchField, { SearchFieldInstitutionItem } from '../SearchField';
import useLinks from '../../../hooks/useLinks';

const QueryField = () => {
  const links = useLinks();
  const router = useRouter();
  const queryState = useAppSelector((state) => state.mapSearchPageData.query);
  const dispatch = useAppDispatch();

  const handleSelect = (institution: SearchFieldInstitutionItem) => {
    router.push(links.getSchoolPath(institution.rspo));
  };

  const handleQueryFormSubmit = (query: string) => {
    dispatch(setQuery(query));
  };

  return (
    <SearchField
      query={queryState}
      onSubmit={handleQueryFormSubmit}
      onInstitutionSelect={handleSelect}
      narrowAutoCompleteWrapper={true}
    />
  );
};

export default QueryField;
