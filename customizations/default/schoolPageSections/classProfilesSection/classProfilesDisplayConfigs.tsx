import React, { FC, ReactNode } from 'react'

interface ClassSymbolProps {
    classSymbol: string
}

export const ClassSymbol: FC<ClassSymbolProps> = ({ classSymbol }) => (
    <span className="inline-flex items-center justify-center rounded-full bg-lightBlue px-2 font-bold m-1">
        {classSymbol.toUpperCase()}
    </span>
)

const getExtendedSubjectsList = (extendedSubjects) => {
    if (!extendedSubjects) return []
    const groupedBySubjectSet = Object.groupBy(
        extendedSubjects,
        (subject) => subject.subject_set_id
    )
    return Object.entries(groupedBySubjectSet).map(
        ([, extendedSubjectsForSet]) => {
            const subjectNames = extendedSubjectsForSet.map(
                (subject) => subject.subject_name
            )
            if (subjectNames.length == 1) return subjectNames[0]

            const joinedList = subjectNames.join(' lub ')
            return (
                <span className="">
                    (
                    {subjectNames.map((el, i, arr) => (
                        <>
                            {el}
                            {i < arr.length - 1 ? (
                                <span className="text-sm text-gray-700 mx-0.5">
                                    lub
                                </span>
                            ) : null}
                        </>
                    ))}
                    )
                </span>
            )
        }
    )
}

interface IClassProfileDisplayConfig {
    name: string
    headingCellClassName?: string
    isNotEmpty: (classProfileData: any) => unknown
    renderCell: (classProfileData: any) => ReactNode
    renderDetails: (classProfileData: any) => ReactNode
    showOnMobile: boolean
}

export const classProfileDefaultDisplayConfig = [
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
        renderCell: ({ class_name }) => (
            <td className="px-3 py-2">{class_name}</td>
        ),
        showOnMobile: false,
        renderDetails: () => null,
    },
    {
        name: 'Przedmioty rozszerzone',
        isNotEmpty: ({ extended_subjects }) =>
            extended_subjects && extended_subjects.length,
        renderCell: ({ extended_subjects }) => (
            <td className="px-3 py-2">
                {getExtendedSubjectsList(extended_subjects).map(
                    (el, i, arr) => (
                        <>
                            {el}
                            {i < arr.length - 1 ? ', ' : ''}
                        </>
                    )
                )}
            </td>
        ),
        showOnMobile: true,
        renderDetails: ({ extended_subjects }) => (
            <div className="">
                <h5 className="mt-2">Przedmioty rozszerzone</h5>
                <ul className="list-disc pl-6">
                    {getExtendedSubjectsList(extended_subjects).map(
                        (subject_set) => (
                            <li>{subject_set}</li>
                        )
                    )}
                </ul>
            </div>
        ),
    },
    {
        name: 'Zawód',
        isNotEmpty: ({ occupation }) => occupation,
        renderCell: ({ occupation }) => (
            <td className="px-3 py-2">{occupation}</td>
        ),
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
                        <span className="mx-1 first:ml-0">{lang}</span>
                    ))}
            </td>
        ),
        showOnMobile: true,
        renderDetails: ({ availableLanguages }) => (
            <div className="mt-2">
                <span className="mr-2">Języki:</span>
                {availableLanguages &&
                    availableLanguages.map((lang) => (
                        <span className="mx-1 first:ml-0">{lang}</span>
                    ))}
            </div>
        ),
    },
    {
        name: 'Próg punktowy',
        isNotEmpty: ({ points_stats_min }) => points_stats_min,
        renderCell: ({ points_stats_min }) => (
            <td className="px-3 py-2">{points_stats_min}</td>
        ),
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
] satisfies IClassProfileDisplayConfig[]

export const prepareClassProfilesDisplayConfig = (
    classProfiles: any[]
): IClassProfileDisplayConfig[] => {
    return classProfileDefaultDisplayConfig.filter((propertyDisplayConfig) => {
        return classProfiles.some(propertyDisplayConfig.isNotEmpty)
    })
}
