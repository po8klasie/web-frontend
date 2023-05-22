import React, { FC } from 'react';
import { BsArrowLeftShort } from '@react-icons/all-files/bs/BsArrowLeftShort';
import { getSchoolTypeFromRspoInstitutionTypeId } from '../../../../../utils/apiDataMapping';
import ProjectLink from '../../../../../components/ProjectLink';
import { PROJECT_PAGES } from '../../../../../utils/projectLinksHelpers';
import SchoolFavoritesButton from './SchoolFavoritesButton';
import { IInstitutionDetails } from '../(sections)/types';

interface SchoolHeroProps {
  institutionDetails: IInstitutionDetails;
}

const SchoolHero: FC<SchoolHeroProps> = ({ institutionDetails }) => {
  const descriptors = [
    institutionDetails.isPublic ? 'Szkoła publiczna' : 'Szkoła niepubliczna',
    getSchoolTypeFromRspoInstitutionTypeId(institutionDetails.rspoInstitutionType),
    institutionDetails.city,
  ];

  return (
    <div className="bg-white border-b border-lighten">
      <div className="w-container mx-auto flex justify-between flex-col-reverse md:flex-row">
        <div className="py-6">
          <ProjectLink href={PROJECT_PAGES.MAP_SEARCH_PAGE} className="flex items-center">
            <BsArrowLeftShort className="mr-1 text-3xl" />
            Powrót do mapy
          </ProjectLink>
          <div className="mt-2">
            <SchoolFavoritesButton schoolRspo={institutionDetails.rspo} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mt-2">{institutionDetails.name}</h1>
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
