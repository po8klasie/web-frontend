import SelectedSchoolCard from './SelectedSchoolCard';
import SchoolCard, { SchoolCardPlaceholder } from '../SchoolCard';
import { useQuery } from '@tanstack/react-query';
import { FC, useMemo } from 'react';
import { nanoid } from 'nanoid';
import useFavoriteInstitutions from '../../../hooks/useFavoriteInstitutions';
import { useAppSelector } from '../../../store/hooks';
import { ISchoolOverview } from '../../../types';

interface InstitutionListingProps {
  serializedAPIQueryString: string;
}

const InstitutionListing: FC<InstitutionListingProps> = ({ serializedAPIQueryString }) => {
  const { data, isFetching } = useQuery<ISchoolOverview[]>(
    [`/search/institution/?${serializedAPIQueryString}`],
    {
      placeholderData: [],
    },
  );
  const parsedData = data && data.length ? data : [];
  const { isInstitutionFavorite, toggleIsInstitutionFavorite } = useFavoriteInstitutions();
  const selectedExtendedSubjectsJSON = useAppSelector(
    (state) => state.mapSearchPageData.filters.extended_subjects,
  );
  const selectedExtendedSubjects = useMemo(() => {
    try {
      return JSON.parse(`${selectedExtendedSubjectsJSON}`);
    } catch {
      return [];
    }
  }, [selectedExtendedSubjectsJSON]);

  return (
    <div>
      <SelectedSchoolCard />
      {parsedData.map((school) => (
        <div className="p-1" key={school.rspo}>
          <SchoolCard
            school={school}
            onFavoriteClick={() => toggleIsInstitutionFavorite(school.rspo)}
            isFavorite={isInstitutionFavorite(school.rspo)}
            selectedExtendedSubjects={selectedExtendedSubjects}
          />
        </div>
      ))}
      {isFetching &&
        new Array(3).fill(0).map(() => (
          <div className="p-1" key={nanoid()}>
            <SchoolCardPlaceholder />
          </div>
        ))}
      {!isFetching && !parsedData.length && (
        <div className="text-center">
          <span className="">Brak szkół spełniających kryteria</span>
        </div>
      )}
    </div>
  );
};

export default InstitutionListing;
