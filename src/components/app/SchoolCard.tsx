import React, { FC, useMemo } from 'react';
import Link from 'next/link';
import styles from './styles/SchoolCard.module.css';
import { ISchoolSearchData } from '../../types';
import {
  getLanguageEmoji,
  getSchoolTypeFromRspoInstitutionTypeId,
} from '../../utils/apiDataMapping';
import LoadingPlaceholder from './LoadingPlaceholder';
import useLinks from '../../hooks/useLinks';
import SchoolCardActionButtons from './SchoolCardActionButtons';
import { uniq } from 'lodash';

const stringifyExtendedSubjects = (subjectsList: string[][]) =>
  subjectsList.map((subjects) => {
    const clone = [...subjects];
    clone.sort();
    return clone.join('-');
  });

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

const ExtendedSubjects = ({ classes, selectedExtendedSubjects }) => {
  const extendedSubjectsList = useMemo(() => {
    if (!classes) return [];
    const joinedSubjects = stringifyExtendedSubjects(
      classes.map((schoolClass) => schoolClass.extended_subjects),
    );
    return uniq(joinedSubjects);
  }, [classes]);
  const selectedSubjectsList = useMemo(
    () => (selectedExtendedSubjects ? stringifyExtendedSubjects(selectedExtendedSubjects) : []),
    [selectedExtendedSubjects],
  );

  if (extendedSubjectsList.length === 0) return <span className="block">Brak danych</span>;

  return (
    <div className="flex">
      <ul className={styles.schoolClassesList}>
        {extendedSubjectsList.map((extendedSubjects) => (
          <li
            className={
              selectedSubjectsList.includes(extendedSubjects) ? 'bg-primaryBg rounded' : ''
            }
            key={extendedSubjects}
          >
            {extendedSubjects}
          </li>
        ))}
      </ul>
    </div>
  );
};

export interface SchoolCardProps {
  school: ISchoolSearchData;
  highlighted?: boolean;
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
  selectedExtendedSubjects: string[][];
}

const SchoolCard: FC<SchoolCardProps> = ({ school, highlighted, selectedExtendedSubjects }) => {
  const { getSchoolPath } = useLinks();
  return (
    <div
      className={`border border-light bg-white ${
        highlighted ? 'shadow-lg' : 'shadow'
      } rounded-md flex`}
    >
      <div className="m-4 text-gray w-full">
        <h3 className="font-primary font-semibold text-lg text-dark hover:underline">
          <Link href={getSchoolPath(school.rspo)}>
            {school.name}
          </Link>
        </h3>
        <ul className={styles.schoolPropertiesList}>
          <li>{school.is_public ? 'Szkoła publiczna' : 'Szkoła niepubliczna'}</li>
          <li>{getSchoolTypeFromRspoInstitutionTypeId(school.rspo_institution_type)}</li>
          <li>
            {school.street} {school.building_number}, {school.city}
          </li>
        </ul>
        <div className="mt-2">
          Najniższy próg klasy 2022/2023:{' '}
          <strong>{school.points_stats_min > 0 ? school.points_stats_min : 'brak danych'}</strong>
        </div>
        <div className="mt-2 flex items-center">
          <span className="mr-4">Języki</span>
          <div>
            <ForeignLanguages foreignLanguages={school.available_languages} />
          </div>
        </div>
        <div className="mt-2">
          <span className="whitespace-nowrap mr-4">Profile klas 2022/2023:</span>
          <ExtendedSubjects
            classes={school.classes}
            selectedExtendedSubjects={selectedExtendedSubjects}
          />
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
