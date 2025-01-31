import SchoolInfoSection from '../SchoolInfoSection'
import {
    DataPresentGuard,
    ItemsList,
    SectionHeading,
    SectionSubHeading,
} from '../reusableUI'
import { CheckIcon } from 'lucide-react'

const gridClassName =
    'mt-3 grid md:grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-4 text-gray'

const EducationalOfferSection = ({ school }) => {
    const extracurricularActivitiesList = school.extracurricular_activities.map(
        ({ activity_name }) => activity_name
    )
    const schoolEventsList = school.school_events.map(
        ({ event_name }) => event_name
    )

    return (
        <SchoolInfoSection
            overwriteFooter=""
            id="educationalOffer"
            updateTime={new Date().toDateString()}
        >
            <div className="p-3">
                <SectionHeading title="Oferta edukacyjna" />
                <ItemsList
                    items={extracurricularActivitiesList}
                    icon={CheckIcon}
                    title="Zajęcia dodatkowe"
                    iconClassName="w-5 h-5"
                    gridClassName={gridClassName}
                />
                <ItemsList
                    items={schoolEventsList}
                    icon={CheckIcon}
                    title="Wydarzenia szkolne"
                    iconClassName="w-4 h-4"
                    gridClassName={gridClassName}
                />
                <SectionSubHeading title="Liczba wycieczek szkolnych na rok" />
                {/*<DataPresentGuard*/}
                {/*  data={institutionDetails.noOfSchoolTripsPerYear}*/}
                {/*  NAClassName="mt-3"*/}
                {/*  render={(data) => <p className="mt-3">{data}</p>}*/}
                {/*/>*/}
            </div>
        </SchoolInfoSection>
    )
}

export default {
    id: 'educationalOffer',
    name: 'Oferta edukacyjna',
    component: EducationalOfferSection,
}
