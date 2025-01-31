import { FC } from 'react'
import SchoolInfoSection from '../SchoolInfoSection'
import { SectionHeading } from '../reusableUI'
import { HomeIcon, LinkIcon, PhoneIcon, MailIcon } from 'lucide-react'
import SchoolLocationMapClient from './SchoolLocationMap.client'
import { ClientOnly } from 'remix-utils/client-only'
import SchoolDescription from './SchoolDescription'

const linkClassName = 'hover:underline'

const ItemWithIcon: FC<any> = ({ children, icon: Icon }) => (
    <span className="flex items-center">
        <span className="bg-primaryBg rounded-full p-1 text-lg">
            <Icon className="w-5 h-5" />
        </span>
        <span className="ml-3">{children}</span>
    </span>
)

const OverviewSection = ({ school }) => {
    return (
        <SchoolInfoSection id="overview" overwriteFooter="" updateTime="">
            <div className="py-3 px-5">
                <div className="grid lg:grid-cols-6">
                    <div className="col-span-3 xl:col-span-2">
                        <SectionHeading title="Podstawowe informacje" />
                        <ul className="mt-2 text-gray">
                            <li className="my-2">
                                <ItemWithIcon icon={HomeIcon}>
                                    {school.street} {school.house_number},{' '}
                                    {school.postal_code} {school.city}
                                </ItemWithIcon>
                            </li>
                            <li className="my-2">
                                <a
                                    href={school.website}
                                    rel="noreferrer noopener"
                                    target="_blank"
                                    className={linkClassName}
                                >
                                    <ItemWithIcon icon={LinkIcon}>
                                        {school.website}
                                    </ItemWithIcon>
                                </a>
                            </li>
                            <li className="my-2">
                                <a
                                    href={`tel:${school.phone}`}
                                    rel="noreferrer noopener"
                                    target="_blank"
                                    className={linkClassName}
                                >
                                    <ItemWithIcon icon={PhoneIcon}>
                                        {school.phone}
                                    </ItemWithIcon>
                                </a>
                            </li>
                            <li className="my-2">
                                <a
                                    href={`mailto:${school.email}`}
                                    rel="noreferrer noopener"
                                    target="_blank"
                                    className={linkClassName}
                                >
                                    <ItemWithIcon icon={MailIcon}>
                                        {school.email}
                                    </ItemWithIcon>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-3 xl:col-span-4 h-72 xl:mt-0 mt-2">
                        <ClientOnly fallback={null}>
                            {() => (
                                <SchoolLocationMapClient
                                    position={{
                                        longitude: school.longitude,
                                        latitude: school.latitude,
                                    }}
                                />
                            )}
                        </ClientOnly>
                    </div>
                </div>
            </div>
            {school.description && school.description.trim().length > 0 && (
                <SchoolDescription description={school.description.trim()} />
            )}
        </SchoolInfoSection>
    )
}

export default {
    id: 'overview',
    name: 'Podstawowe informacje',
    component: OverviewSection,
}
