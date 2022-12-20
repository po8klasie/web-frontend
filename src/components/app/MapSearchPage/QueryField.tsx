import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { FC, useEffect, useState } from 'react';
import { useProjectConfig } from '../../../config/projectConfigContext';
import { useFormContext } from 'react-hook-form';
import useDebouncedValue from '../../../hooks/useDebouncedValue';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setQuery } from '../../../store/slices/mapSearchPageDataSlice';

interface AutocompleteInstitutionItem {
  name: string;
  rspo: string;
  projectId: string;
}

interface AutocompleteOptionProps {
  institution: AutocompleteInstitutionItem;
}

const AutocompleteOption: FC<AutocompleteOptionProps> = ({ institution, onClick }) => (
  <button
    onClick={onClick}
    className={[
      'w-full text-left px-5 py-2 text-lg text-red border-b border-lighten first:border-b-0',
      'hover:bg-lighten hover:bg-opacity-60',
    ].join(' ')}
  >
    {institution.name}
  </button>
);

const QueryField = () => {
  const { projectID } = useProjectConfig();
  const router = useRouter();
  const [
    selectedInstitution,
    setSelectedInstitution,
  ] = useState<AutocompleteInstitutionItem | null>(null);
  const queryState = useAppSelector((state) => state.mapSearchPageData.query);
  const dispatch = useAppDispatch();
  const [localQuery, setLocalQuery] = useState(queryState);

  useEffect(() => {
    setLocalQuery(queryState);
  }, [queryState]);

  const debouncedQuery = useDebouncedValue(localQuery, 300);
  const isAutocompleteEnabled = debouncedQuery.trim().length > 3;

  const { data } = useQuery<AutocompleteInstitutionItem[]>(
    [`/search/autocomplete?query=${debouncedQuery}`],
    {
      enabled: isAutocompleteEnabled,
    },
  );
  const autocompleteItems = isAutocompleteEnabled && data ? data : [];

  const handleSelect = (institution?: AutocompleteInstitutionItem) => {
    if (institution) {
      setSelectedInstitution(institution);
      router.push(`/${projectID}/school/${institution.rspo}`);
    }
  };

  const handleQueryFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setQuery(localQuery));
  };

  return (
    <div className="relative bg-white">
      <form onSubmit={handleQueryFormSubmit}>
        <div className="px-5 py-5 flex items-center text-2xl">
          <FiSearch className="text-lightGray mr-5" />
          <input
            type="text"
            placeholder="Wpisz nazwę szkoły"
            autoComplete="off"
            onChange={(e) => setLocalQuery(e.target.value)}
            value={localQuery}
            className="w-full h-full outline-none bg-transparent placeholder-lightGray transition focus:placeholder-gray"
          />
          <button
            type="submit"
            className="bg-primaryBg flex items-center justify-center p-2 w-10 h-10 rounded-lg"
          >
            <FiSearch className="text-primary text-2xl" />
          </button>
        </div>
      </form>
      <div className="absolute top-full left-0 w-full mt-1" style={{ zIndex: 9999999 }}>
        <div className="mx-10 bg-appBg bg-opacity-95 rounded-xl shadow-2xl">
          {autocompleteItems.map((institution) => (
            <AutocompleteOption
              key={institution.rspo}
              onClick={() => handleSelect(institution)}
              institution={institution}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QueryField;
