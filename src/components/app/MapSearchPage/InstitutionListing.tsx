import SelectedSchoolCard from './SelectedSchoolCard';
import SchoolCard, { SchoolCardPlaceholder } from '../SchoolCard';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { nanoid } from 'nanoid';
import { useAppSelector } from "../../../store/hooks";
import useFavoriteInstitutions from "../../../hooks/useFavoriteInstitutions";

interface InstitutionListingProps {
  serializedAPIPath: string;
}

const InstitutionListing: FC<InstitutionListingProps> = ({ serializedAPIPath }) => {
  const { data, isFetching } = useQuery<any>([`/search/institution/?${serializedAPIPath}`], {
    placeholderData: [],
  });
  const parsedData = data && data.length ? data : [];
  const {isInstitutionFavorite, toggleIsInstitutionFavorite} = useFavoriteInstitutions()

  return (
    <div>
      <SelectedSchoolCard />
      {parsedData.map((school) => (
        <div className="p-1" key={school.rspo}>
          <SchoolCard
            school={school}
            onFavoriteClick={() => toggleIsInstitutionFavorite(school.rspo)}
            isFavorite={isInstitutionFavorite(school.rspo)} />
        </div>
      ))}
      {isFetching &&
        new Array(3).fill(0).map((school) => (
          <div className="p-1" key={nanoid()}>
            <SchoolCardPlaceholder />
          </div>
        ))}
    </div>
  );
};

export default InstitutionListing;
