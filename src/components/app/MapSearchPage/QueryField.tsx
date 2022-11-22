import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { Combobox } from '@headlessui/react';
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

const people = [
  'Durward Reynolds',
  'Kenton Towne',
  'Therese Wunsch',
  'Benedict Kessler',
  'Katelyn Rohan',
];

interface AutocompleteOptionProps {
  institution: AutocompleteInstitutionItem;
}

const AutocompleteOption: FC<AutocompleteOptionProps> = ({ institution }) => (
  <Combobox.Option
    key={institution.rspo}
    value={institution}
    className={({ active }) =>
      [
        'px-5 py-2 border-b border-lighten first:border-b-0',
        active ? 'bg-lighten bg-opacity-60' : 'bg-transparent',
      ].join(' ')
    }
  >
    {institution.name}
  </Combobox.Option>
);

const QueryField = () => {
  const { projectID } = useProjectConfig();
  const { register, watch } = useFormContext();
  const router = useRouter();
  const [
    selectedInstitution,
    setSelectedInstitution,
  ] = useState<AutocompleteInstitutionItem | null>(null);
  // controller tutaj
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
      <Combobox value={selectedInstitution} onChange={handleSelect} nullable>
        <div className="px-5 py-5 flex items-center text-2xl">
          <FiSearch className="text-lightGray mr-5" />
          <Combobox.Input
            type="text"
            placeholder="Wpisz nazwę szkoły"
            autoComplete="off"
            {...register('query')}
            displayValue={(institution: AutocompleteInstitutionItem) => institution?.name}
            className="w-full h-full outline-none bg-transparent placeholder-lightGray transition focus:placeholder-gray"
          />
          <button className="bg-primaryBg flex items-center justify-center p-2 w-10 h-10 rounded-lg">
            <FiSearch className="text-primary text-2xl" />
          </button>
        </div>
        <Combobox.Options
          className="absolute top-full left-0 w-full bg-appBg bg-opacity-95 mt-1 px-5 rounded-xl shadow-2xl"
          style={{ zIndex: 9999999 }}
        >
          {query.length > 0 && (
            <Combobox.Option value={{ id: null, name: query }}>Create "{query}"</Combobox.Option>
          )}
          {autocompleteItems.map((institution) => (
            <AutocompleteOption institution={institution} key={institution.rspo} />
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default QueryField;
