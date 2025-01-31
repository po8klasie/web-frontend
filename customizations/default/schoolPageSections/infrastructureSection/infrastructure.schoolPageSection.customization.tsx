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

const InfrastructureSection = ({ school }) => {
    const infrastructureList = school.school_infrastructure.map(
        ({ name }) => name
    )

    return (
        <SchoolInfoSection
            overwriteFooter=""
            id="infrastructure"
            updateTime={new Date().toDateString()}
        >
            <div className="p-3">
                <SectionHeading title="Infrastructura" />
                <ItemsList
                    items={infrastructureList}
                    icon={CheckIcon}
                    title={null}
                    iconClassName="w-5 h-5"
                    gridClassName={gridClassName}
                />
            </div>
        </SchoolInfoSection>
    )
}

export default {
    id: 'infrastructure',
    name: 'Infrastruktura',
    component: InfrastructureSection,
}
