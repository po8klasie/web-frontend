import dynamic from 'next/dynamic';
import { ComponentType, FC, useRef } from 'react';
import { FilterProps } from './types';

// TODO(micorix): Stricter type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const filterComponents: Record<string, ComponentType<any>> = {
  isPublicFilter: dynamic(() => import('./IsPublicFilter')),
  institutionTypeFilter: dynamic(() => import('./InstitutionTypeFilter')),
  warsawDistrictsFilter: dynamic(() => import('./WarsawDistrictsFilter')),
  languagesFilter: dynamic(() => import('./LanguagesFilter')),
  recruitmentPointsFilter: dynamic(() => import('./RecruitmentPointsFilter')),
  publicTransportFilter: dynamic(() => import('./PublicTransportFilter')),
  extendedSubjectsFilter: dynamic(() => import('./ExtendedSubjectsFilter')),
};

const getFilterComponent = (componentId: keyof typeof filterComponents) => {
  return filterComponents[componentId] as FC;
};

interface FilterComponentProps<T> extends FilterProps<T> {
  filterComponentId: keyof typeof filterComponents;
}

const FilterComponent: FC<FilterComponentProps<unknown>> = ({ filterComponentId, ...props }) => {
  const componentRef = useRef(getFilterComponent(filterComponentId));
  const Component = componentRef.current;

  if (!Component) return null;

  return <Component {...props} />;
};

export default FilterComponent;
