import dynamic from 'next/dynamic';
import { FC, useRef } from 'react';
import { UseControllerProps } from 'react-hook-form';
import { FilterProps } from './types';

const filterComponents: Record<string, any> = {
  isPublicFilter: dynamic(() => import('./IsPublicFilter')),
  institutionTypeFilter: dynamic(() => import('./InstitutionTypeFilter')),
  warsawDistrictsFilter: dynamic(() => import('./WarsawDistrictsFilter')),
  languagesFilter: dynamic(() => import('./LanguagesFilter')),
  recruitmentPointsFilter: dynamic(() => import('./RecruitmentPointsFilter')),
  publicTransportFilter: dynamic(() => import('./PublicTransportFilter')),
};

const getFilterComponent = (componentId: keyof typeof filterComponents) => {
  return filterComponents[componentId];
};

interface FilterComponentProps {
  filterComponentId: keyof typeof filterComponents;
  control: UseControllerProps['control'];
}

const FilterComponent: FC<FilterComponentProps> = ({ control, filterComponentId }) => {
  const componentRef = useRef(getFilterComponent(filterComponentId));
  const Component = componentRef.current;

  console.log(filterComponentId, Component);

  if (!Component) return null;

  return <Component control={control} />;
};

export default FilterComponent;
