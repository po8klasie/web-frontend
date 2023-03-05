import React, { FC } from 'react';
import Link from 'next/link';
import { BsArrowLeftShort } from '@react-icons/all-files/bs/BsArrowLeftShort';
import { ISchoolData } from '../../../types';
import { useProjectConfig } from '../../../config/projectConfigContext';
import { getSchoolTypeFromRspoInstitutionTypeId } from '../../../utils/apiDataMapping';
import { FiStar } from '@react-icons/all-files/fi/FiStar';
import useFavoriteInstitutions from '../../../hooks/useFavoriteInstitutions';

interface SchoolHeroProps {
  school: ISchoolData;
}

const SchoolHero: FC<SchoolHeroProps> = ({ school }) => {
  const { projectID } = useProjectConfig();
  const { isInstitutionFavorite, toggleIsInstitutionFavorite } = useFavoriteInstitutions();
  const isFavorite = isInstitutionFavorite(school.rspo);

  const descriptors = [
    school.isPublic ? 'Szkoła publiczna' : 'Szkoła niepubliczna',
    getSchoolTypeFromRspoInstitutionTypeId(school.rspoFacilityType),
    school.city,
  ];

  return (
    <div className="bg-white border-b border-lighten">
      <div className="w-container mx-auto flex justify-between flex-col-reverse md:flex-row">
        <div className="py-6">
          <Link href={`/${projectID}/map`}>
            <a className="flex items-center">
              <BsArrowLeftShort className="mr-1 text-3xl" />
              Powrót do mapy
            </a>
          </Link>
          <div className="mt-2">
            <button
              onClick={() => toggleIsInstitutionFavorite(school.rspo)}
              title={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
              className={[
                'rounded-xl px-2 py-1 text-primary inline-flex items-center border',
                isFavorite ? 'bg-primaryBg border-transparent' : 'border-primaryBg',
              ].join(' ')}
            >
              <FiStar
                className={`text-primary stroke-current mr-2 ${isFavorite ? 'fill-current' : ''}`}
              />
              <span>
                {isFavorite ? 'Szkoła dodana do ulubionych' : 'Dodaj szkołę do ulubionych'}
              </span>
            </button>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mt-2">{school.name}</h1>
          <ul className="lg:flex lg:mt-0 mt-2">
            {descriptors.map((d) => (
              <li key={d} className="lg:mx-2 first:ml-0 text-gray">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default SchoolHero;
