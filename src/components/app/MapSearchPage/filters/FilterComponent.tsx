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

interface FilterComponentProps extends FilterProps {
  filterComponentId: keyof typeof filterComponents;
}

const FilterComponent: FC<FilterComponentProps> = ({ filterComponentId, ...props }) => {
  const componentRef = useRef(getFilterComponent(filterComponentId));
  const Component = componentRef.current;

  if (!Component) return null;

  return <Component {...props} />;
};

export default FilterComponent;
