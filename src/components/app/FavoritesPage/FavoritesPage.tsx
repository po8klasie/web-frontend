import useFavoriteInstitutions from '../../../hooks/useFavoriteInstitutions';
import { useQuery } from '@tanstack/react-query';
import SchoolCard, { SchoolCardPlaceholder } from '../SchoolCard';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import { stringify } from 'query-string';
import { FiStar } from '@react-icons/all-files/fi/FiStar';

const FavoritesPage = () => {
  const { favoriteInstitutionsRspos, toggleIsInstitutionFavorite, isInstitutionFavorite } =
    useFavoriteInstitutions();

  const queryString = useMemo(
    () => stringify({ rspo: favoriteInstitutionsRspos }),
    [favoriteInstitutionsRspos],
  );

  const { data, isFetching } = useQuery([`/school/multiple?${queryString}`], {
    enabled: favoriteInstitutionsRspos.length > 0,
  });

  const parsedData = data ? data : [];

  return (
    <div className="w-4/5 mx-auto mt-10 h-full">
      <h1 className="text-center font-primary text-2xl text-bold">Ulubione szkoły</h1>
      <div className="mt-5 md:w-1/2 mx-auto">
        {!isFetching && parsedData.length === 0 && (
          <div className="">
            <h2 className="text-gray-700 text-center text-lg mt-10">Brak szkół w ulubionych</h2>
            <p className="text-gray-700 text-center mt-2">
              Klikając <FiStar className="inline stroke-current text-primary" /> przy danej szkole,
              dodasz ją do ulubionych.
            </p>
          </div>
        )}
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
    </div>
  );
};

export default FavoritesPage;
