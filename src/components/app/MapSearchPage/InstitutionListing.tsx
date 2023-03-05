import SelectedSchoolCard from './SelectedSchoolCard';
import SchoolCard, { SchoolCardPlaceholder } from '../SchoolCard';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { nanoid } from 'nanoid';
import useFavoriteInstitutions from '../../../hooks/useFavoriteInstitutions';

interface InstitutionListingProps {
  serializedAPIQueryString: string;
}

const InstitutionListing: FC<InstitutionListingProps> = ({ serializedAPIQueryString }) => {
  const { data, isFetching } = useQuery([`/search/institution/?${serializedAPIQueryString}`], {
    placeholderData: [],
  });
  const parsedData = data && data.length ? data : [];
  const { isInstitutionFavorite, toggleIsInstitutionFavorite } = useFavoriteInstitutions();

  return (
    <div>
      <SelectedSchoolCard />
      {parsedData.map((school) => (
        <div className="p-1" key={school.rspo}>
          <SchoolCard
            school={school}
            onFavoriteClick={() => toggleIsInstitutionFavorite(school.rspo)}
            isFavorite={isInstitutionFavorite(school.rspo)}
          />
        </div>
      ))}
      {isFetching &&
        new Array(3).fill(0).map(() => (
          <div className="p-1" key={nanoid()}>
            <SchoolCardPlaceholder />
          </div>
        ))}
    </div>
  );
};

export default InstitutionListing;
