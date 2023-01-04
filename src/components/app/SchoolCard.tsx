import React, { FC, MouseEventHandler } from "react";
import Link from 'next/link';
import styles from './styles/SchoolCard.module.css';
import { ISchoolSearchData } from '../../types';
import {
  getLanguageEmoji,
  getSchoolTypeFromRspoInstitutionTypeId,
} from '../../utils/apiDataMapping';
import LoadingPlaceholder from './LoadingPlaceholder';
import { FiStar } from "@react-icons/all-files/fi/FiStar";
import useLinks from "../../hooks/useLinks";
import { RectangleStackIcon as RectangleStackIconSolid } from "@heroicons/react/24/solid";
import { RectangleStackIcon as RectangleStackIconOutline } from "@heroicons/react/24/outline";
import useComparisonInstitutions from "../../hooks/useComparisonInstitutions";
import useFavoriteInstitutions from "../../hooks/useFavoriteInstitutions";
import SchoolCardActionButtons from "./SchoolCardActionButtons";

interface ForeignLanguagesProps {
  foreignLanguages: string[] | null;
}

const ForeignLanguages: FC<ForeignLanguagesProps> = ({ foreignLanguages }) => {
  if (!foreignLanguages || foreignLanguages.length === 0) return <span>brak danych</span>;
  return (
    <>
      {foreignLanguages.map((lang: string) => (
        <span className="first:ml-0 mx-2">{getLanguageEmoji(lang)}</span>
      ))}
    </>
  );
};

export interface SchoolCardProps {
  school: ISchoolSearchData;
  highlighted?: boolean;
  isFavorite?: boolean;
  onFavoriteClick?: () => void
}

const SchoolCard: FC<SchoolCardProps> = ({ school, highlighted, isFavorite, onFavoriteClick }) => {
  const { getSchoolPath } = useLinks()
  return (
    <div
      className={`border border-light bg-white ${highlighted ? 'shadow-lg' : 'shadow'} rounded-md flex`}
    >
      <div className="m-4 text-gray w-full">
        <h3 className="font-primary font-semibold text-lg text-dark hover:underline">
          <Link href={getSchoolPath(school.rspo)}>
            <a>{school.name}</a>
          </Link>
        </h3>
        <ul className={styles.schoolPropertiesList}>
          <li>{school.is_public ? 'Szkoła publiczna' : 'Szkoła niepubliczna'}</li>
          <li>{getSchoolTypeFromRspoInstitutionTypeId(school.rspoFacilityType)}</li>
          <li>
            {school.street} {school.building_number}, {school.city}
          </li>
        </ul>
        <div className="mt-2 flex items-center">
          <span className="mr-4">Języki</span>
          <div>
            <ForeignLanguages foreignLanguages={school.available_languages} />
          </div>
        </div>
        <div className="mt-2">
          <span className="whitespace-nowrap mr-4">Profile klas 2022/2023:</span>
          <div className="flex">
            {school.classes ? (
              <ul className={styles.schoolClassesList}>
                {[
                  ...new Set(
                    school.classes.map((schoolClass) => schoolClass.extended_subjects.join('-')),
                  ),
                ].map((schoolClass) => (
                  <li key={schoolClass}>{schoolClass}</li>
                ))}
              </ul>
            ) : (
              <span>brak danych</span>
            )}
          </div>
        </div>
      </div>
      <div className="mr-4 my-4">
        <SchoolCardActionButtons rspo={school.rspo} className="grid gap-y-3" />
      </div>
    </div>
  );
};

export default SchoolCard;

export const SchoolCardPlaceholder: FC = () => {
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
