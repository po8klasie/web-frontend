import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { FC, useState } from 'react';
import { useProjectConfig } from '../../../config/projectConfigContext';
import { useFormContext } from 'react-hook-form';
import useDebouncedValue from '../../../hooks/useDebouncedValue';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

interface AutocompleteInstitutionItem {
  name: string;
  rspo: string;
  projectId: string;
}

interface AutocompleteOptionProps {
  institution: AutocompleteInstitutionItem;
}

const AutocompleteOption: FC<AutocompleteOptionProps> = ({ institution, onClick }) => (
  <div
    onClick={onClick}
    className={({ active }) =>
      [
        'px-5 py-2 border-b border-lighten first:border-b-0',
        active ? 'bg-lighten bg-opacity-60' : 'bg-transparent',
      ].join(' ')
    }
  >
    {institution.name}
  </div>
);

const QueryField = () => {
  const { projectID } = useProjectConfig();
  const { register, watch } = useFormContext();
  const router = useRouter();
  const [
    selectedInstitution,
    setSelectedInstitution,
  ] = useState<AutocompleteInstitutionItem | null>(null);
  const query = watch('query');
  const debouncedQuery = useDebouncedValue(query, 300);
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

  return (
    <div className="relative bg-white">
      <div className="px-5 py-5 flex items-center text-2xl">
        <FiSearch className="text-lightGray mr-5" />
        <input
          type="text"
          placeholder="Wpisz nazwę szkoły"
          autoComplete="off"
          {...register('query')}
          className="w-full h-full outline-none bg-transparent placeholder-lightGray transition focus:placeholder-gray"
        />
        <button className="bg-primaryBg flex items-center justify-center p-2 w-10 h-10 rounded-lg">
          <FiSearch className="text-primary text-2xl" />
        </button>
      </div>
      <div
        className="absolute top-full left-0 w-full bg-appBg bg-opacity-95 mt-1 px-5 rounded-xl shadow-2xl"
        style={{ zIndex: 9999999 }}
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
  );
};

export default QueryField;
