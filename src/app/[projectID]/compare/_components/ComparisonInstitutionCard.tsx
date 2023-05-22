import React, { FC } from 'react';
import styles from './styles/SchoolComparisonCard.module.css';
import LoadingPlaceholder from '../../../../components/LoadingPlaceholder';
import ComparablePropertiesRenderer from './ComparablePropertiesRenderer';
import { ComparisonInstitutionI, PropertiesMaxLengthsI } from './types';
import SchoolCardActionButtons from '../../../../components/SchoolCardActionButtons';
import ProjectLink from '../../../../components/ProjectLink';
import { getInstitutionPath } from '../../../../utils/projectLinksHelpers';

export interface SchoolComparisonCardProps {
  institution: ComparisonInstitutionI;
  propertiesMaxLengths: PropertiesMaxLengthsI;
}

const ComparisonInstitutionCard: FC<SchoolComparisonCardProps> = ({
  institution: { name, rspo, comparison },
  propertiesMaxLengths,
}) => {
  return (
    <div className={`border border-light bg-white rounded-md h-full`}>
      <div className="m-4 text-gray">
        <SchoolCardActionButtons rspo={rspo} className="my-4 flex items-center justify-between" />
        <h3 className="font-primary font-semibold text-lg text-dark hover:underline">
          <ProjectLink href={getInstitutionPath(rspo)}>{name}</ProjectLink>
        </h3>
        <ComparablePropertiesRenderer
          comparisonItems={comparison}
          propertiesMaxLengths={propertiesMaxLengths}
        />
      </div>
    </div>
  );
};

export default ComparisonInstitutionCard;

export const SchoolComparisonCardPlaceholder: FC = () => {
  return (
    <div className={`border border-light bg-white rounded-md`}>
      <div className="m-4 text-gray">
        <h3 className="font-primary font-semibold text-lg text-dark hover:underline">
          <LoadingPlaceholder className="h-6" />
        </h3>
        <div className={styles.schoolPropertiesList}>
          <LoadingPlaceholder className="mt-3 h-3 w-full" />
        </div>
        <div className="mt-2 flex items-center">
          <LoadingPlaceholder className="h-3 w-full" />
        </div>
        <div className="mt-2 flex">
          <LoadingPlaceholder className="h-3 w-full" />
        </div>
      </div>
    </div>
  );
};
