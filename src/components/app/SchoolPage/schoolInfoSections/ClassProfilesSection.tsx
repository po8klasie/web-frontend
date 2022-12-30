import { FC, useMemo } from "react";
import SchoolInfoSection from './SchoolInfoSection';
import { Tab } from '@headlessui/react'
import { getLanguageEmoji } from "../../../../utils/apiDataMapping";

interface ClassSymbolProps {
  classSymbol: string;
}

const ClassSymbol: FC<ClassSymbolProps> = ({ classSymbol }) => (
  <span className="inline-flex items-center justify-center rounded-full bg-lightBlue px-2 font-bold m-1">
    {classSymbol.toUpperCase()}
  </span>
);

const ClassRow = ({class_symbol, class_name, available_languages, extended_subjects, points_stats_min}) => (
  <tr key={class_name} className="even:bg-lightBlue">
    <td className="px-3 py-2 flex items-center">
      <ClassSymbol classSymbol={class_symbol ?? ''} />
    </td>
    <td className="px-3 py-2">{class_name}</td>
    <td className="px-3 py-2">{extended_subjects && extended_subjects.join(', ')}</td>
    <td className="px-3 py-2">{available_languages && available_languages.map(lang => (
      <span className="mx-1 first:ml-0">
        {getLanguageEmoji(lang)}
      </span>
    ))}</td>
    <td className="px-3 py-2 text-right">{points_stats_min}</td>
  </tr>
)

const ClassMobileDetails = ({class_symbol, class_name, available_languages, extended_subjects, points_stats_min}) => (
  <details className="px-2 mt-2">
    <summary>
      <ClassSymbol classSymbol={class_symbol} />
      <span className="ml-2 font-semibold">{class_name}</span>
    </summary>
    <div className="px-4 mb-7">
      <h5 className="mt-2">Przedmioty rozszerzone</h5>
      <ul className="list-disc pl-6">
        {extended_subjects && extended_subjects.map((subject) => (
          <li>{subject}</li>
        ))}
      </ul>
      <span className="mt-2"><span className="mr-2">Języki:</span>
      {available_languages && available_languages.map(lang => (
        <span className="mx-1 first:ml-0">
        {getLanguageEmoji(lang)}
      </span>
      ))}</span>
      <h5 className="mt-2">Próg punktowy: {points_stats_min}</h5>
    </div>
  </details>
)

const ClassesForYearTable = ({classesForYear}) => (
  <table className="mt-2 w-full hidden lg:table">
    <thead className="text-gray text-left">
    <tr>
      <th className="px-3">Symbol</th>
      <th className="px-3">Klasa</th>
      <th className="px-3">Przedmioty rozszerzone</th>
      <th className="px-3">Języki</th>
      <th className="px-3 text-right">Próg punktowy</th>
    </tr>
    </thead>
    <tbody className="">
    {classesForYear.map(
      (classInfo) => (
        <ClassRow key={classInfo.class_name} {...classInfo} />
      ),
    )}
    </tbody>
  </table>
)

const ClassProfiles = ({ classesEntries }) => (
  <div className="">
    <Tab.Group>
      <div className="flex">
        <div className="mt-5 border-r border-t rounded-tr-xl">
          <Tab.List>
            {classesEntries.map(([year], i) => (
              <Tab key={year} className={({selected}) => [
                'px-4 py-1 block w-full',
                selected ? 'bg-gray-100 font-bold' : '',
                i == 0 ? 'rounded-tr-xl' : '' // first: doesn't work somehow
              ].join(' ')}>
                <span >{year}</span>
              </Tab>
            ))}
          </Tab.List>
        </div>
        <div className="w-full">
          <Tab.Panels>
            {classesEntries.map(([year, classesForYear]) => (
              <Tab.Panel key={year}>
                <div className="hidden lg:block">
                  <ClassesForYearTable classesForYear={classesForYear} />
                </div>
                <div className="lg:hidden pb-5">
                  {
                    classesForYear.map(class_ => (
                      <ClassMobileDetails {...class_} />
                    ))
                  }
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </div>
      </div>

    </Tab.Group>

  </div>
)

const ClassProfilesSection: FC = ({school}) => {
  const classesEntries = useMemo(() => {
    const { classes } = school
    let entries = Object.entries(classes)
    entries.sort()
    entries.reverse()
    return entries
  }, [school])
  const isClassesDataAvailable = classesEntries.length > 0

  return (
    <SchoolInfoSection
      id="classProfiles"
      updateTime={new Date().toDateString()}
    >
      <div className="p-3 pb-0">
        <h3 className="text-lg font-bold text-dark">Profile klas</h3>
      </div>
      {
        isClassesDataAvailable ? (
          <ClassProfiles classesEntries={classesEntries} />
        ) : (
          <p className="m-3">Brak danych</p>
        )
      }
    </SchoolInfoSection>
  );
};

export default ClassProfilesSection;
