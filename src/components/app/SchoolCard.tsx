import React, { FC } from 'react';
import Link from 'next/link';
import styles from './styles/SchoolCard.module.css';
import { ISchoolSearchData } from '../../types';
import {
  getLanguageEmoji,
  getSchoolTypeFromRspoInstitutionTypeId,
} from '../../utils/apiDataMapping';
import { nanoid } from 'nanoid';

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
}

const SchoolCard: FC<SchoolCardProps> = ({ school, highlighted }) => {
  return (
    <div
      className={`border border-light bg-white ${highlighted ? 'shadow-lg' : 'shadow'} rounded-md`}
    >
      <div className="m-4 text-gray">
        <h3 className="font-primary font-semibold text-lg text-dark hover:underline">
          <Link href={`/${school.projectId}/school/${school.rspo}`}>
            <a>{school.name}</a>
          </Link>
        </h3>
        <ul className={styles.schoolPropertiesList}>
          <li>{school.is_public ? 'Szkoła publiczna' : 'Szkoła niepubliczna'}</li>
          <li>{getSchoolTypeFromRspoInstitutionTypeId(school.rspoFacilityType)}</li>
          <li>
            {school.street} {school.buildingNumber}, {school.city}
          </li>
        </ul>
        <div className="mt-2 flex items-center">
          <span className="mr-4">Języki</span>
          <div>
            <ForeignLanguages foreignLanguages={school.available_languages} />
          </div>
        </div>
        <div className="mt-2 flex">
          <span className="whitespace-nowrap mr-4">Profile klas</span>
          {school.classes ? (
            <ul className={styles.schoolClassesList}>
              {[
                ...new Set(
                  school.classes.map((schoolClass) => schoolClass.extended_subjects.join('-')),
                ),
              ].map((schoolClass) => (
                <li key={nanoid()}>{schoolClass}</li>
              ))}
            </ul>
          ) : (
            <span>brak danych</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;
