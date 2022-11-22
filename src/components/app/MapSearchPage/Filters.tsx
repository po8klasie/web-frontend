import { FaSchool } from '@react-icons/all-files/fa/FaSchool';
import { BsGearWideConnected } from '@react-icons/all-files/bs/BsGearWideConnected';
import { MdWork } from '@react-icons/all-files/md/MdWork';
import dynamic from 'next/dynamic';
import FilterComponent from './filters/FilterComponent';
import { useFormContext } from 'react-hook-form';

const filters = [
  'isPublicFilter',
  'institutionTypeFilter',
  'languagesFilter',
  'publicTransportFilter',
  'recruitmentPointsFilter',
  'warsawDistrictsFilter',
];

const Filters = () => {
  const { control } = useFormContext();
  return (
    <div className="px-2">
      {filters.map((filterId) => (
        <FilterComponent control={control} filterComponentId={filterId} key={filterId} />
      ))}
    </div>
  );
};
export default Filters;
