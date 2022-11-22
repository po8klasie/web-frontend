import { FC, MouseEventHandler } from 'react';
import { FilterProps } from './types';
import { useController } from 'react-hook-form';
import CollapsibleFilterWrapper from './CollapsibleFilterWrapper';
import { IoMdBus } from '@react-icons/all-files/io/IoMdBus';
import { MdTrain } from '@react-icons/all-files/md/MdTrain';
import { MdTram } from '@react-icons/all-files/md/MdTram';
import { MdSubway } from '@react-icons/all-files/md/MdSubway';

const stationTypes = [
  {
    id: 'trolleybus',
    name: 'Przystanek trolejbusów',
    icon: IoMdBus,
  },
  {
    id: 'bus',
    name: 'Przystanek autobusowy',
    icon: IoMdBus,
  },
  {
    id: 'tram',
    name: 'Przystanek tramwajowy',
    icon: MdTram,
  },
  {
    id: 'train',
    name: 'Stacja pociągu',
    icon: MdTrain,
  },
  {
    id: 'subway',
    name: 'Stacja metra',
    icon: MdSubway,
  },
];

interface InstitutionTypeCardProps {
  name: string;
  icon: string;
  onClick: MouseEventHandler;
}

const InstitutionTypeCard: FC<InstitutionTypeCardProps> = ({ name, icon, onClick }) => (
  <button className="my-2 border px-2 py-2 rounded-xl text-center" onClick={onClick}>
    <span className="text-2xl block">{icon}</span>
    <span className="block mt-2 text-sm leading-4">{name}</span>
  </button>
);

const PublicTransportFilter: FC<FilterProps> = ({ control }) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name: 'institution_type',
  });

  const toggle = (val: boolean) => {
    if (value === val) onChange(null);
    else onChange(val);
  };

  return (
    <CollapsibleFilterWrapper title="Komunikacja miejska">
      <span className="mb-1 block">{'<'}500m od szkoły znajduje się:</span>
      <ul>
        {stationTypes.map(({ name, id, icon: Icon }) => (
          <li className="flex items-center">
            <input type="checkbox" className="bg-primary focus:ring-primary rounded" />
            <Icon className="mx-1" />
            <span className="">{name}</span>
          </li>
        ))}
      </ul>
    </CollapsibleFilterWrapper>
  );
};

export default PublicTransportFilter;
