import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { FC, useEffect, useState } from 'react';
import useDebouncedValue from '../../hooks/useDebouncedValue';
import { useQuery } from '@tanstack/react-query';
import styles from './styles/SearchField.module.css';
import { useProjectConfig } from '../../config/projectConfigContext';
export interface SearchFieldInstitutionItem {
  name: string;
  rspo: string;
  projectId: string;
}

interface AutocompleteOptionProps {
  institution: SearchFieldInstitutionItem;
  onClick: () => void;
}

const AutocompleteOption: FC<AutocompleteOptionProps> = ({ institution, onClick }) => (
  <button
    onClick={onClick}
    onTouchStart={onClick} // HACK(micorix): click event is not fired on iOS Safari
    type="button"
    className={[
      'w-full text-left px-5 py-2 text-lg text-red border-b border-lighten first:border-b-0',
      'hover:bg-lighten hover:bg-opacity-60 rounded-xl',
    ].join(' ')}
  >
    {institution.name}
  </button>
);

interface SearchFieldProps {
  query?: string;
  onInstitutionSelect: (item: SearchFieldInstitutionItem) => void;
  onSubmit: (query: string) => void;
  className?: string;
  narrowAutoCompleteWrapper?: boolean;
}

const SearchField: FC<SearchFieldProps> = ({
  query,
  onInstitutionSelect,
  onSubmit,
  className,
  narrowAutoCompleteWrapper,
}) => {
  const { projectId } = useProjectConfig();
  const [localQuery, setLocalQuery] = useState(query ?? '');

  useEffect(() => {
    setLocalQuery(query ?? '');
  }, [query]);

  const [debouncedQuery] = useDebouncedValue(localQuery, 300);
  const isAutocompleteEnabled = debouncedQuery.trim().length >= 3;

  const { data } = useQuery<SearchFieldInstitutionItem[]>(
    [`/search/autocomplete?query=${debouncedQuery}&project_id=${projectId}`],
    {
      enabled: isAutocompleteEnabled,
    },
  );
  const autocompleteItems = data ? data : [];

  const handleSelect = (institution?: SearchFieldInstitutionItem) => {
    if (institution) {
      onInstitutionSelect(institution);
    }
  };

  const handleQueryFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(localQuery);
  };

  return (
    <div className={[styles.searchField, className ?? ''].join(' ')}>
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
      <div className={styles.searchFieldAutocompleteDropdown} style={{ zIndex: 9999999 }}>
        <div
          className={[
            narrowAutoCompleteWrapper ? 'mx-10' : '',
            'bg-appBg bg-opacity-95 shadow-2xl rounded-xl',
          ].join(' ')}
        >
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

export default SearchField;
