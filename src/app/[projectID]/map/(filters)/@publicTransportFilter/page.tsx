'use client';

import { FC } from 'react';
import CollapsibleFilterWrapper from '../_components/CollapsibleFilterWrapper';
import { IoMdBus } from '@react-icons/all-files/io/IoMdBus';
import { MdTrain } from '@react-icons/all-files/md/MdTrain';
import { MdTram } from '@react-icons/all-files/md/MdTram';
import { MdSubway } from '@react-icons/all-files/md/MdSubway';
import useFilterValue from '../_hook/useFilterValue';
import { toggleElementInArray } from '../../../../../utils/misc';

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

const PublicTransportFilter: FC = () => {
  const { value, setValue } = useFilterValue<string[]>('public_transportation_stop', []);
  const handleChange = (id: string) => {
    setValue(toggleElementInArray(value, id));
  };

  return (
    <CollapsibleFilterWrapper title="Komunikacja miejska">
      <span className="mb-1 block">{'<'}250m od szkoły znajduje się:</span>
      <ul>
        {stationTypes.map(({ name, id, icon: Icon }) => (
          <li>
            <label className="flex items-center">
              <input
                type="checkbox"
                onChange={() => handleChange(id)}
                checked={value.includes(id)}
                className="bg-primary focus:ring-primary rounded"
              />
              <Icon className="mx-1" />
              <span className="">{name}</span>
            </label>
          </li>
        ))}
      </ul>
    </CollapsibleFilterWrapper>
  );
};

export default PublicTransportFilter;
