import type { FC } from 'react'
import ProjectLink from '../../../src/components/ProjectLink'
import { SecondarySchoolSchema } from '../data/schema'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface SchoolCardProps {
    school: SecondarySchoolSchema
}

const SchoolCard: FC<SchoolCardProps> = ({ school }) => {
    const {
        rspo,
        name,
        street,
        house_number,
        postal_code,
        city,
        classes = [],
    } = { ...school }

    const classesYear = classes && classes[0] ? classes[0].year : null

    const schoolPageLink = `/school/${rspo}`

    return (
        <ProjectLink
            to={schoolPageLink}
            className="bg-white shadow rounded-md overflow-hidden"
        >
            <div className="py-4 px-5">
                <h3 className="font-primary font-semibold text-lg text-dark hover:underline">
                    {name || <Skeleton className="h-5" />}
                </h3>
                <p className="text-gray-700 text-base">
                    {school ? (
                        <span>
                            {street} {house_number}, {postal_code} {city}
                        </span>
                    ) : (
                        <Skeleton />
                    )}
                </p>
            </div>
            <div className="px-5 pb-4 pt-2">
                <span className="text-normal font-bold text-dark mr-5">
                    {school ? (
                        <span>
                            Profile klas{' '}
                            {classesYear
                                ? `${classesYear}/${classesYear + 1}`
                                : null}
                        </span>
                    ) : (
                        <Skeleton />
                    )}
                </span>
                <div className="mt-2 flex flex-wrap">
                    {school ? (
                        classes.map((cls) => (
                            <div className="my-1 mx-1 px-2 py-0.5 border border-blue-200 bg-blue-50 rounded-xl text-sm">
                                <span>{cls.class_name}</span>
                            </div>
                        ))
                    ) : (
                        <Skeleton className="w-1/3 h-4" />
                    )}
                    {school && classes.length === 0 && (
                        <span className="text-gray-500">Brak danych</span>
                    )}
                </div>
            </div>
        </ProjectLink>
    )
}

export default SchoolCard
