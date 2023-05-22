'use client';

import { FC, Fragment, useMemo } from 'react';
import { Tab } from '@headlessui/react';
import {
  classProfileDefaultDisplayConfig,
  ClassSymbol,
  prepareClassProfilesDisplayConfig,
} from './classProfilesDisplayConfigs';
import { IInstitutionDetailsClassProfileData } from '../types';
import { ClassEntriesT } from './types';

interface ClassesForYearTableProps {
  classesForYear: IInstitutionDetailsClassProfileData[];
}

const ClassesForYearTable: FC<ClassesForYearTableProps> = ({ classesForYear }) => {
  const displayConfig = useMemo(
    () => prepareClassProfilesDisplayConfig(classesForYear),
    [classesForYear],
  );

  return (
    <table className="mt-2 w-full hidden lg:table">
      <thead className="text-gray text-left">
        <tr>
          {displayConfig.map(({ name, headingCellClassName }) => (
            <th key={name} className={['px-3', headingCellClassName ?? ''].join(' ')}>
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="">
        {classesForYear.map((classProfile) => (
          <tr className="even:bg-lightBlue">
            {displayConfig.map(({ renderCell }) => (
              <Fragment key={classProfile.extendedSubjects.join('-')}>
                {renderCell(classProfile)}
              </Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface ClassMobileDetailsProps {
  classProfile: IInstitutionDetailsClassProfileData;
}

const ClassMobileDetails: FC<ClassMobileDetailsProps> = ({ classProfile }) => (
  <details className="px-2 mt-2">
    <summary>
      <ClassSymbol classSymbol={classProfile.classSymbol ?? ''} />
      <span className="ml-2 font-semibold">{classProfile.className}</span>
    </summary>
    <div className="px-4 mb-7">
      {classProfileDefaultDisplayConfig
        .filter(
          (propertyConfig) =>
            propertyConfig.isNotEmpty(classProfile) && propertyConfig.showOnMobile,
        )
        .map(({ renderDetails }) => renderDetails(classProfile))}
    </div>
  </details>
);

interface YearTabButtonProps {
  year: string;
  i: number;
}

const YearTabButton: FC<YearTabButtonProps> = ({ year, i }) => (
  <Tab
    className={({ selected }) =>
      [
        'px-4 py-1 block w-full',
        selected ? 'bg-gray-100 font-bold' : '',
        i == 0 ? 'rounded-tr-xl' : '', // first: doesn't work somehow
      ].join(' ')
    }
  >
    <span>{year}</span>
  </Tab>
);

interface YearTabPanelProps {
  classesForYear: IInstitutionDetailsClassProfileData[];
}

const YearTabPanel: FC<YearTabPanelProps> = ({ classesForYear }) => (
  <Tab.Panel>
    <div className="hidden lg:block">
      <ClassesForYearTable classesForYear={classesForYear} />
    </div>
    <div className="lg:hidden pb-5">
      {classesForYear.map((classProfile) => (
        <ClassMobileDetails
          key={classProfile.extendedSubjects.join('-')}
          classProfile={classProfile}
        />
      ))}
    </div>
  </Tab.Panel>
);

interface ClassProfilesProps {
  classesEntries: ClassEntriesT;
}

const ClassProfiles: FC<ClassProfilesProps> = ({ classesEntries }) => (
  <div className="">
    <Tab.Group>
      <div className="flex">
        <div className="mt-5 border-r border-t rounded-tr-xl">
          <Tab.List>
            {classesEntries.map(([year], i) => (
              <YearTabButton key={year} year={year} i={i} />
            ))}
          </Tab.List>
        </div>
        <div className="w-full">
          <Tab.Panels>
            {classesEntries.map(([year, classesForYear]) => (
              <YearTabPanel key={year} classesForYear={classesForYear} />
            ))}
          </Tab.Panels>
        </div>
      </div>
    </Tab.Group>
  </div>
);

export default ClassProfiles;
