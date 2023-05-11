import { FC, useEffect, useMemo, useState } from 'react';
import { FilterProps } from './types';
import { Combobox } from '@headlessui/react';
import CollapsibleFilterWrapper from './CollapsibleFilterWrapper';
import { FiX } from '@react-icons/all-files/fi/FiX';
import { removeFromArray } from '../../../../utils/misc';

// see /api/institution-classes/languages
const languages = {
  ang: {
    id: 'ang',
    name: 'angielski',
    icon: '🇬🇧',
  },
  niem: {
    id: 'niem',
    name: 'niemiecki',
    icon: '🇩🇪',
  },
  fra: {
    id: 'fra',
    name: 'francuski',
    icon: '🇫🇷',
  },
  hisz: {
    id: 'hisz',
    name: 'hiszpański',
    icon: '🇪🇸',
  },
  wlo: {
    id: 'wlo',
    name: 'włoski',
    icon: '🇮🇹',
  },
  por: {
    id: 'por',
    name: 'portugalski',
    icon: '🇵🇹',
  },
  ros: {
    id: 'ros',
    name: 'rosyjski',
    icon: '🇷🇺'
  },
  szwe: {
    id: 'szwe',
    name: 'szwedzki',
    icon: '🇸🇪'
  },
  'łac': {
    id: 'łac',
    name: 'łacina',
    icon: null
  },
  'łać': {
    id: 'łać',
    name: 'łacina',
    icon: null
  },
  'greka klasyczna': {
    id: 'greka klasyczna',
    name: 'greka klasyczna',
    icon: null,
  },
  'język obcy': {
    id: 'język obcy',
    name: 'język obcy',
    icon: null
  },
};

type LanguageId = keyof typeof languages;
const languageIds = Object.keys(languages) as LanguageId[];

const LanguagesFilter: FC<FilterProps<string[]>> = ({ value, setValue }) => {
  const [query, setQuery] = useState('');

  const updateLangIds = (langIds: string[]) => {
    console.log(langIds);
    setValue(langIds);
  };

  useEffect(() => {
    setQuery('');
  }, [value]);

  const filteredLangIds = useMemo(() => {
    const isQueryEmpty = query === '';
    if (isQueryEmpty) return [];

    return languageIds.filter((langId) => {
      const langInQuery = languages[langId].name.toLowerCase().includes(query.toLowerCase());
      const isAlreadySelected = value.includes(langId);

      return !isAlreadySelected && langInQuery;
    });
  }, [query, value]);

  return (
    <CollapsibleFilterWrapper title="Języki obce">
      <div>
        <Combobox
          as="div"
          value={value}
          onChange={updateLangIds}
          nullable
          multiple
          className="relative"
        >
          <Combobox.Input
            className="outline-none bg-gray-200 border-2 focus:border-gray-300 px-2 py-1 rounded w-full"
            placeholder="Wpisz język"
            autoComplete="off"
            onChange={(event) => setQuery(event.target.value)}
          />
          {query.trim().length > 0 && (
            <Combobox.Options static className="bg-gray-100 w-full absolute top-full left-0">
              {filteredLangIds.map((id) => (
                <Combobox.Option
                  key={id}
                  value={id}
                  className="px-2 py-1 focus:bg-gray-200 cursor-pointer"
                >
                  {languages[id].icon} {languages[id].name}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </Combobox>
        {value.length > 0 && (
          <ul className="mt-2">
            {value.map((id) => (
              <li
                key={id}
                className="border border-gray-300 rounded px-1 text-sm py-1 inline-flex mr-1 mb-1"
              >
                {languages[id].icon} {languages[id].name}
                <button className="ml-1" onClick={() => updateLangIds(removeFromArray(value, id))}>
                  <FiX className="w-3" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </CollapsibleFilterWrapper>
  );
};

export default LanguagesFilter;
