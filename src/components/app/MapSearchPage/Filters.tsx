import FilterComponent from './filters/FilterComponent';
import { useFormContext } from 'react-hook-form';
import { useProjectConfig } from '../../../config/projectConfigContext';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setFilterValue } from '../../../store/slices/mapSearchPageDataSlice';

const Filters = () => {
  const defaultFiltersValues = useAppSelector(
    (state) => state.mapSearchPageData.defaultFiltersValues,
  );
  const filtersState = useAppSelector((state) => state.mapSearchPageData.filters);
  const dispatch = useAppDispatch();
  const { searchView } = useProjectConfig();
  const filters = searchView!.filters;

  const createValueSetter = (filterName: string) => (value: any) =>
    dispatch(
      setFilterValue({
        filterName,
        value,
      }),
    );

  if (Object.keys(filtersState).length === 0) return null;

  return (
    <div className="px-2">
      {filters.map(({ name, component }) => (
        <FilterComponent
          setValue={createValueSetter(name)}
          value={filtersState[name]}
          filterComponentId={component}
          key={name}
        />
      ))}
    </div>
  );
};
export default Filters;
