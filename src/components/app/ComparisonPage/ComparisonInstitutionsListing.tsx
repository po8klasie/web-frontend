import { ComparisonInstitutionI, PropertiesMaxLengthsI } from './types';
import { FC } from 'react';
import ComparisonInstitutionCard from './ComparisonInstitutionCard';

interface ComparisonInstitutionsListingProps {
  institutions: ComparisonInstitutionI[];
  propertiesMaxLengths: PropertiesMaxLengthsI;
}

const ComparisonInstitutionsListing: FC<ComparisonInstitutionsListingProps> = ({
  institutions,
  propertiesMaxLengths,
}) => {
  return (
    <div className="grid gap-y-10 sm:flex justify-center">
      {institutions.map((institution) => (
        <div className="p-1 mx-auto sm:mx-0" key={institution.rspo} style={{ maxWidth: '15rem' }}>
          <ComparisonInstitutionCard
            institution={institution}
            propertiesMaxLengths={propertiesMaxLengths}
          />
        </div>
      ))}
    </div>
  );
};

export default ComparisonInstitutionsListing;
