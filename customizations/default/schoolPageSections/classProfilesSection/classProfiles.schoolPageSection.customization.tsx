//
import ClassProfiles from './ClassProfiles'
// import { ClassEntriesT } from './types';
import { FC } from 'react'
// import SchoolInfoSection from '../SchoolInfoSection';
//
const prepareClassEntries = (classes: any) => {
    const entries = Object.entries(
        Object.groupBy(classes, (classProfile) => classProfile.year)
    )
    entries.sort()
    entries.reverse()
    return entries
}

const ClassesDataInfo: FC = () => (
    <span
        role="alert"
        className="bg-blue-100 border-l-4 border-blue-600 p-1 rounded block text-sm mt-2"
    >
        {/*<AiOutlineCheck className="inline-block text-xl text-blue-600 translate-y-[-2px] mr-1" />*/}
        Dokładamy wszelkich starań, aby dane, które prezentujemy były dokładne.
        Pamiętaj jednak, aby sprawdzić wybrany profil szkoły z oficjalną ofertą
        szkoły.
    </span>
)

import SchoolInfoSection from '../SchoolInfoSection'

const ClassProfilesSection: any = ({ school }) => {
    const classesEntries = prepareClassEntries(school.classes)
    const isClassesDataAvailable = classesEntries.length > 0

    return (
        <SchoolInfoSection id="classProfiles" updateTime={new Date(2023, 4, 9)}>
            <div className="p-3">
                <h3 className="text-lg font-bold text-dark mr-5">
                    Profile klas
                </h3>
                <ClassesDataInfo />
            </div>
            {isClassesDataAvailable ? (
                <ClassProfiles classesEntries={classesEntries} />
            ) : (
                <p className="m-3">Brak danych</p>
            )}
        </SchoolInfoSection>
    )
}

export default {
    id: 'classProfiles',
    name: 'Profile klas',
    component: ClassProfilesSection,
}
