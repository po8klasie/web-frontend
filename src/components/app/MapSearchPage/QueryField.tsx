
import { useProjectConfig } from '../../../config/projectConfigContext';import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setQuery } from '../../../store/slices/mapSearchPageDataSlice';
import SearchField, { SearchFieldInstitutionItem } from "../SearchField";


const QueryField = () => {
  const { projectID } = useProjectConfig();
  const router = useRouter();
  const queryState = useAppSelector((state) => state.mapSearchPageData.query);
  const dispatch = useAppDispatch();

  const handleSelect = (institution: SearchFieldInstitutionItem) => {
    router.push(`/${projectID}/school/${institution.rspo}`);
  };

  const handleQueryFormSubmit = (query: string) => {
    dispatch(setQuery(query));
  };

  return (
  <SearchField
    query={queryState}
    onSubmit={handleQueryFormSubmit}
    onInstitutionSelect={handleSelect} />
  );
};

export default QueryField;
