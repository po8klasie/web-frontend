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

const SportSection = ({ school }) => {
    const sportActivitiesList = school.sport_activities.map(
        ({ activity_name }) => activity_name
    )

    return (
        <SchoolInfoSection
            overwriteFooter=""
            id="sport"
            updateTime={new Date().toDateString()}
        >
            <div className="p-3">
                <SectionHeading title="Sport" />
                <ItemsList
                    items={sportActivitiesList}
                    icon={CheckIcon}
                    title="Zajęcia sportowe"
                    iconClassName="w-5 h-5"
                    gridClassName={gridClassName}
                />
            </div>
        </SchoolInfoSection>
    )
}

export default {
    id: 'sport',
    name: 'Sport',
    component: SportSection,
}
