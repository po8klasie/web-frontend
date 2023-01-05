import { FC, MouseEventHandler, ReactNode, useState } from "react";
import { FilterProps } from './types';
import { useController } from 'react-hook-form';
import CollapsibleFilterWrapper from './CollapsibleFilterWrapper';
import { toggleElementInArray } from '../../../../utils/misc';

const mainInstitutionTypes = [
  {
    rspoTypeId: '14',
    name: 'LO',
    icon: '🏫',
  },
  {
    rspoTypeId: '16',
    name: 'Technikum',
    icon: '🔧',
  },
  {
    rspoTypeId: '94',
    name: <span>Szkoła branżowa <br/> I st.</span>,
    icon: '💼',
  },
];

const extraInstitutionTypes = [
  {
    rspoTypeId: '90',
    name: 'Bednarska Szkoła Realna',
    icon: '📒',
  },
  {
    rspoTypeId: '17',
    name: 'Liceum ogólnokształcące uzupełniające dla absolwentów zasadniczych szkół zawodowych',
    icon: '💼',
  },
  {
    rspoTypeId: '15',
    name: 'Liceum profilowane',
    icon: '📓',
  },
  {
    rspoTypeId: '27',
    name: 'Liceum sztuk plastycznych',
    icon: '🎨',
  },
  {
    rspoTypeId: '24',
    name: 'Ogólnokształcąca szkoła muzyczna II stopnia',
    icon: '🎷',
  },
]

export const availableRspoInstitutionTypeIds: string[] = [
  ...mainInstitutionTypes.map(type => type.rspoTypeId),
  ...extraInstitutionTypes.map(type => type.rspoTypeId)
]

interface InstitutionTypeCardProps {
  name: ReactNode;
  icon: string;
  isActive: boolean;
  onClick: MouseEventHandler;
}

const InstitutionTypeCard: FC<InstitutionTypeCardProps> = ({ name, icon, isActive, onClick }) => (
  <button
    className={['border px-2 py-2 rounded-xl text-center', isActive ? 'bg-gray-100' : ''].join(
      ' ',
    )}
    onClick={onClick}
  >
    <span className="text-2xl block">{icon}</span>
    <span className="block mt-2 text-sm leading-4">{name}</span>
  </button>
);

const HorizontalInstitutionTypeCard: FC<InstitutionTypeCardProps> = ({ name, icon, isActive, onClick }) => (
  <button
    className={['flex items-center border px-2 py-1 rounded-xl text-center', isActive ? 'bg-gray-100' : ''].join(
      ' ',
    )}
    onClick={onClick}
  >
    <span className="text-xl block">{icon}</span>
    <span className="block w-full text-center text-sm leading-4">{name}</span>
  </button>
);

const InstitutionTypeFilter: FC<FilterProps<string[]>> = ({ value, setValue }) => {
  const [shouldShowMore, setShouldShowMore] = useState(false)
  const handleClick = (institutionTypeId: string) => () =>
    setValue(toggleElementInArray(value, institutionTypeId, mainInstitutionTypes.length+extraInstitutionTypes.length));

  return (
    <CollapsibleFilterWrapper title="Typ szkoły">
      <div className="grid grid-cols-3 gap-2">
        {mainInstitutionTypes.map(({ rspoTypeId, name, icon }) => (
          <InstitutionTypeCard
            key={rspoTypeId}
            name={name}
            icon={icon}
            isActive={value.includes(rspoTypeId)}
            onClick={handleClick(rspoTypeId)}
          />
        ))}

      </div>
      <div className="mt-1 mb-2">
        <button className="text-sm" onClick={() => setShouldShowMore(should => !should)}>
          Pokaż
          {shouldShowMore ? ' mniej ' : ' więcej '}
          typów szkół
        </button>
      </div>
      {shouldShowMore && (
        <div className="grid gap-y-1">
          {extraInstitutionTypes.map(({ rspoTypeId, name, icon }) => (
            <HorizontalInstitutionTypeCard
              key={rspoTypeId}
              name={name}
              icon={icon}
              isActive={value.includes(rspoTypeId)}
              onClick={handleClick(rspoTypeId)}
            />
          ))}
        </div>
      )}
    </CollapsibleFilterWrapper>
  );
};

export default InstitutionTypeFilter;
