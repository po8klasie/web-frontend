import { FC, MouseEventHandler } from 'react';
import { FilterProps } from './types';
import { useController } from 'react-hook-form';
import CollapsibleFilterWrapper from './CollapsibleFilterWrapper';
import { toggleElementInArray } from '../../../../utils/misc';

const institutionTypes = [
  {
    id: 'highSchool',
    name: 'Liceum',
    icon: '🏫',
  },
  {
    id: 'vocationalSchool',
    name: 'Technikum',
    icon: '🔧',
  },
  {
    id: 'branzowa',
    name: 'Szkoła branżowa',
    icon: '💼',
  },
];

interface InstitutionTypeCardProps {
  name: string;
  icon: string;
  isActive: boolean;
  onClick: MouseEventHandler;
}

const InstitutionTypeCard: FC<InstitutionTypeCardProps> = ({ name, icon, isActive, onClick }) => (
  <button
    className={['my-2 border px-2 py-2 rounded-xl text-center', isActive ? 'bg-gray-100' : ''].join(
      ' ',
    )}
    onClick={onClick}
  >
    <span className="text-2xl block">{icon}</span>
    <span className="block mt-2 text-sm leading-4">{name}</span>
  </button>
);

const InstitutionTypeFilter: FC<FilterProps> = ({ control, name, defaultValue }) => {
  const {
    field: { value, onChange },
  } = useController({ control, name, defaultValue });

  const handleClick = (institutionTypeId: string) => () =>
    onChange(toggleElementInArray(value, institutionTypeId, institutionTypes.length));

  return (
    <CollapsibleFilterWrapper title="Typ szkoły">
      <div className="grid grid-cols-3 gap-2">
        {institutionTypes.map(({ id, name, icon }) => (
          <InstitutionTypeCard
            key={id}
            name={name}
            icon={icon}
            isActive={value.includes(id)}
            onClick={handleClick(id)}
          />
        ))}
      </div>
    </CollapsibleFilterWrapper>
  );
};

export default InstitutionTypeFilter;
