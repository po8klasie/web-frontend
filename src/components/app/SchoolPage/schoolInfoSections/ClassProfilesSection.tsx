import { FC, useMemo } from 'react';
import SchoolInfoSection from './SchoolInfoSection';
import { Tab } from '@headlessui/react';
import { getLanguageEmoji } from '../../../../utils/apiDataMapping';
import { AiOutlineCheck } from '@react-icons/all-files/ai/AiOutlineCheck';
import { FiExternalLink } from '@react-icons/all-files/fi/FiExternalLink';

interface ClassSymbolProps {
  classSymbol: string;
}

const ClassSymbol: FC<ClassSymbolProps> = ({ classSymbol }) => (
  <span className="inline-flex items-center justify-center rounded-full bg-lightBlue px-2 font-bold m-1">
    {classSymbol.toUpperCase()}
  </span>
);

const classProfileDefaultDisplayConfig = [
  {
    name: 'Symbol',
    isNotEmpty: ({ class_symbol }) => class_symbol,
    renderCell: ({ class_symbol }) => (
      <td className="px-3 py-2 flex items-center">
        <ClassSymbol classSymbol={class_symbol ?? ''} />
      </td>
    ),
    showOnMobile: false,
    renderDetails: () => null,
  },
  {
    name: 'Klasa',
    isNotEmpty: ({ class_name }) => class_name,
    renderCell: ({ class_name }) => <td className="px-3 py-2">{class_name}</td>,
    showOnMobile: false,
    renderDetails: () => null,
  },
  {
    name: 'Przedmioty rozszerzone',
    isNotEmpty: ({ extended_subjects }) => extended_subjects,
    renderCell: ({ extended_subjects }) => (
      <td className="px-3 py-2">{extended_subjects && extended_subjects.join(', ')}</td>
    ),
    showOnMobile: true,
    renderDetails: ({ extended_subjects }) => (
      <div className="">
        <h5 className="mt-2">Przedmioty rozszerzone</h5>
        <ul className="list-disc pl-6">
          {extended_subjects && extended_subjects.map((subject) => <li>{subject}</li>)}
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
    isNotEmpty: ({ available_languages }) => available_languages,
    renderCell: ({ available_languages }) => (
      <td className="px-3 py-2 whitespace-nowrap">
        {available_languages &&
          available_languages.map((lang) => (
            <span className="mx-1 first:ml-0">{getLanguageEmoji(lang)}</span>
          ))}
      </td>
    ),
    showOnMobile: true,
    renderDetails: ({ available_languages }) => (
      <div className="mt-2">
        <span className="mr-2">Języki:</span>
        {available_languages &&
          available_languages.map((lang) => (
            <span className="mx-1 first:ml-0">{getLanguageEmoji(lang)}</span>
          ))}
      </div>
    ),
  },
  {
    name: 'Próg punktowy',
    isNotEmpty: ({ points_stats_min }) => points_stats_min,
    renderCell: ({ points_stats_min }) => <td className="px-3 py-2">{points_stats_min}</td>,
    showOnMobile: true,
    renderDetails: ({ points_stats_min }) => (
      <h5 className="mt-2">Próg punktowy: {points_stats_min}</h5>
    ),
  },
  {
    name: 'Zobacz oficjalną ofertę',
    headingCellClassName: 'text-center',
    isNotEmpty: ({ url }) => url,
    renderCell: ({ url }) => (
      <td className="px-3 py-2">
        <a
          href={url}
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
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center text-gray-800 hover:underline"
        >
          <FiExternalLink className="mr-2" /> Zobacz oficjalną ofertę
        </a>
      </div>
    ),
  },
] as const;

const prepareClassProfilesDisplayConfig = (classProfiles) => {
  return classProfileDefaultDisplayConfig.filter((propertyDisplayConfig) => {
    return classProfiles.some(propertyDisplayConfig.isNotEmpty);
  });
};

const ClassesForYearTable = ({ classesForYear }) => {
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
            {displayConfig.map(({ renderCell }) => renderCell(classProfile))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ClassMobileDetails = ({ classProfile }) => (
  <details className="px-2 mt-2">
    <summary>
      <ClassSymbol classSymbol={classProfile.class_symbol ?? ''} />
      <span className="ml-2 font-semibold">{classProfile.class_name}</span>
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

const YearTabButton = ({ year, i }) => (
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

const YearTabPanel = ({ classesForYear }) => (
  <Tab.Panel>
    <div className="hidden lg:block">
      <ClassesForYearTable classesForYear={classesForYear} />
    </div>
    <div className="lg:hidden pb-5">
      {classesForYear.map((classProfile) => (
        <ClassMobileDetails classProfile={classProfile} />
      ))}
    </div>
  </Tab.Panel>
);

const ClassProfiles = ({ classesEntries }) => (
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

const ClassesDataInfo = () => (
  <span
    role="alert"
    className="bg-blue-100 border-l-4 border-blue-600 p-1 rounded block text-sm mt-2"
  >
    <AiOutlineCheck className="inline-block text-xl text-blue-600 translate-y-[-2px] mr-1" />
    Dokładamy wszelkich starań, aby dane, które prezentujemy były dokładne. Pamiętaj jednak, aby
    sprawdzić wybrany profil szkoły z oficjalną ofertą szkoły.
  </span>
);

const ClassProfilesSection: FC = ({ school }) => {
  const classesEntries = useMemo(() => {
    const { classes } = school;
    const entries = Object.entries(classes);
    entries.sort();
    entries.reverse();
    return entries;
  }, [school]);
  const isClassesDataAvailable = classesEntries.length > 0;

  return (
    <SchoolInfoSection id="classProfiles" updateTime={new Date(2023, 5, 9)}>
      <div className="p-3">
        <h3 className="text-lg font-bold text-dark mr-5">Profile klas</h3>
        <ClassesDataInfo />
      </div>
      {isClassesDataAvailable ? (
        <ClassProfiles classesEntries={classesEntries} />
      ) : (
        <p className="m-3">Brak danych</p>
      )}
    </SchoolInfoSection>
  );
};

export default ClassProfilesSection;
