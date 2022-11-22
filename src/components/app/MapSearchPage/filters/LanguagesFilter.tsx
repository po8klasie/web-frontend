import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { FilterProps } from './types';
import { useController } from 'react-hook-form';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { Combobox } from '@headlessui/react';
import CollapsibleFilterWrapper from './CollapsibleFilterWrapper';
import { FiX } from '@react-icons/all-files/fi/FiX';
import { removeFromArray } from '../../../../utils/misc';

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
};

type LanguageId = keyof typeof languages;
const languageIds = Object.keys(languages) as LanguageId[];

const LanguagesFilter: FC<FilterProps> = ({ control }) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name: 'languages',
    defaultValue: [],
  });
  const [query, setQuery] = useState('');

  const updateLangIds = (langIds: string[]) => {
    onChange(langIds);
  };

  useEffect(() => {
    setQuery('');
  }, [value]);

  const filteredLangIds =
    query === ''
      ? languageIds
      : languageIds.filter((langId) => {
          return languages[langId].name.toLowerCase().includes(query.toLowerCase());
        });

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
            displayValue={(langId) =>
              languages[langId as string] ? languages[langId as LanguageId].name : ''
            }
            onChange={(event) => setQuery(event.target.value)}
          />
          {query.trim().length > 0 && (
            <Combobox.Options static className="bg-gray-100 w-full absolute top-full left-0">
              {filteredLangIds.map((id) => (
                <Combobox.Option key={id} value={id} className="px-2 py-1 focus:bg-gray-200">
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
