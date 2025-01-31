import SchoolInfoSection from '../SchoolInfoSection'
import { SectionHeading } from '../reusableUI'

const PublicTransportSection = ({ school }) => {
    return (
        <SchoolInfoSection
            overwriteFooter=""
            id="sport"
            updateTime={new Date().toDateString()}
        >
            <div className="p-3">
                <SectionHeading title="Komunikacja miejska" />
                Wkrótce
            </div>
        </SchoolInfoSection>
    )
}

export default {
    id: 'publicTransport',
    name: 'Komunikacja miejska',
    component: PublicTransportSection,
}
