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
