import React, { FC, ReactNode } from 'react';
import { getLanguageEmoji } from '../../../../../../utils/apiDataMapping';
import { FiExternalLink } from '@react-icons/all-files/fi/FiExternalLink';
import { IInstitutionDetailsClassProfileData } from '../types';

interface ClassSymbolProps {
  classSymbol: string;
}

export const ClassSymbol: FC<ClassSymbolProps> = ({ classSymbol }) => (
  <span className="inline-flex items-center justify-center rounded-full bg-lightBlue px-2 font-bold m-1">
    {classSymbol.toUpperCase()}
  </span>
);

interface IClassProfileDisplayConfig {
  name: string;
  headingCellClassName?: string;
  isNotEmpty: (classProfileData: IInstitutionDetailsClassProfileData) => unknown;
  renderCell: (classProfileData: IInstitutionDetailsClassProfileData) => ReactNode;
  renderDetails: (classProfileData: IInstitutionDetailsClassProfileData) => ReactNode;
  showOnMobile: boolean;
}

export const classProfileDefaultDisplayConfig = [
  {
    name: 'Symbol',
    isNotEmpty: ({ classSymbol }) => classSymbol,
    renderCell: ({ classSymbol }) => (
      <td className="px-3 py-2 flex items-center">
        <ClassSymbol classSymbol={classSymbol ?? ''} />
      </td>
    ),
    showOnMobile: false,
    renderDetails: () => null,
  },
  {
    name: 'Klasa',
    isNotEmpty: ({ className }) => className,
    renderCell: ({ className }) => <td className="px-3 py-2">{className}</td>,
    showOnMobile: false,
    renderDetails: () => null,
  },
  {
    name: 'Przedmioty rozszerzone',
    isNotEmpty: ({ extendedSubjects }) => extendedSubjects,
    renderCell: ({ extendedSubjects }) => (
      <td className="px-3 py-2">{extendedSubjects && extendedSubjects.join(', ')}</td>
    ),
    showOnMobile: true,
    renderDetails: ({ extendedSubjects }) => (
      <div className="">
        <h5 className="mt-2">Przedmioty rozszerzone</h5>
        <ul className="list-disc pl-6">
          {extendedSubjects && extendedSubjects.map((subject) => <li>{subject}</li>)}
        </ul>
      </div>
    ),
  },
  {
    name: 'Zawód',
    isNotEmpty: ({ occupation }) => occupation,
    renderCell: ({ occupation }) => <td className="px-3 py-2">{occupation}</td>,
    showOnMobile: true,
    renderDetails: ({ occupation }) => (
      <div className="">
        <h5 className="mt-2">Zawód</h5>
        <span className="">{occupation}</span>
      </div>
    ),
  },
  {
    name: 'Języki obce',
    isNotEmpty: ({ availableLanguages }) => availableLanguages,
    renderCell: ({ availableLanguages }) => (
      <td className="px-3 py-2 whitespace-nowrap">
        {availableLanguages &&
          availableLanguages.map((lang) => (
            <span className="mx-1 first:ml-0">{getLanguageEmoji(lang)}</span>
          ))}
      </td>
    ),
    showOnMobile: true,
    renderDetails: ({ availableLanguages }) => (
      <div className="mt-2">
        <span className="mr-2">Języki:</span>
        {availableLanguages &&
          availableLanguages.map((lang) => (
            <span className="mx-1 first:ml-0">{getLanguageEmoji(lang)}</span>
          ))}
      </div>
    ),
  },
  {
    name: 'Próg punktowy',
    isNotEmpty: ({ pointsStatsMin }) => pointsStatsMin,
    renderCell: ({ pointsStatsMin }) => <td className="px-3 py-2">{pointsStatsMin}</td>,
    showOnMobile: true,
    renderDetails: ({ pointsStatsMin }) => (
      <h5 className="mt-2">Próg punktowy: {pointsStatsMin}</h5>
    ),
  },
  {
    name: 'Zobacz oficjalną ofertę',
    headingCellClassName: 'text-center',
    isNotEmpty: ({ url }) => url,
    renderCell: ({ url }) => (
      <td className="px-3 py-2">
        <a
          href={url as string}
          target="_blank"
          rel="noreferrer noopener"
          className="flex justify-center text-gray-800"
        >
          <FiExternalLink />
        </a>
      </td>
    ),
    showOnMobile: true,
    renderDetails: ({ url }) => (
      <div className="mt-4">
        <a
          href={url as string}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center text-gray-800 hover:underline"
        >
          <FiExternalLink className="mr-2" /> Zobacz oficjalną ofertę
        </a>
      </div>
    ),
  },
] satisfies IClassProfileDisplayConfig[];

export const prepareClassProfilesDisplayConfig = (
  classProfiles: IInstitutionDetailsClassProfileData[],
): IClassProfileDisplayConfig[] => {
  return classProfileDefaultDisplayConfig.filter((propertyDisplayConfig) => {
    return classProfiles.some(propertyDisplayConfig.isNotEmpty);
  });
};
