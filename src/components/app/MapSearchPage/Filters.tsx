import FilterComponent from './filters/FilterComponent';
import { useFormContext } from 'react-hook-form';
import { useProjectConfig } from '../../../config/projectConfigContext';

const Filters = () => {
  const { control } = useFormContext();
  const { searchView } = useProjectConfig();
  const filters = searchView!.filters;

  return (
    <div className="px-2">
      {filters.map(({ name, defaultValue, component }) => (
        <FilterComponent
          control={control}
          filterComponentId={component}
          name={name}
          defaultValue={defaultValue}
          key={name}
        />
      ))}
    </div>
  );
};
export default Filters;
