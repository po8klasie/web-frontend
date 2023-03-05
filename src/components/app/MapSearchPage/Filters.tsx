import FilterComponent from './filters/FilterComponent';
import { useProjectConfig } from '../../../config/projectConfigContext';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setFilterValue } from '../../../store/slices/mapSearchPageDataSlice';
import { SearchViewConfig } from '../../../config/types';

const Filters = () => {
  const filtersState = useAppSelector((state) => state.mapSearchPageData.filters);
  const dispatch = useAppDispatch();
  const { searchView } = useProjectConfig();
  const filters = (searchView as SearchViewConfig).filters;

  const createValueSetter = (filterName: string) => (value: unknown) =>
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
