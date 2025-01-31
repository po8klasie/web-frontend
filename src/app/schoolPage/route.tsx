import { LoaderFunctionArgs, useLoaderData } from 'react-router'
import { Suspense } from 'react'
import { useComponentCustomization } from '../../lib/customizations/isomorphic/resolveIsomorphicCustomization'
import { CUSTOMIZATION_NAME } from '../../lib/customizations/customizationName'
import resolveServerCustomization from '../../lib/customizations/server/resolveServerCustomization'
import getSections from '../../lib/customizations/schoolPageSections/getSections'
import { useSuspenseQuery } from '@tanstack/react-query'
import SchoolPageMenu from './SchoolPageMenu'
import readProjectConfig from '../../lib/config/readProjectConfig'
import {
    getCustomizationCtxFromParams,
    useCustomizationCtx,
} from '../../lib/customizations/customizationContext'

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const customizationCtx = await getCustomizationCtxFromParams(params)
    const getSchool = await resolveServerCustomization(
        CUSTOMIZATION_NAME.DATA__GET_SCHOOL,
        customizationCtx
    )
    const projectConfig = await readProjectConfig(params.projectId)
    return {
        school: await getSchool({ id: params.schoolId }),
        schoolViewSectionsConfig: projectConfig.schoolViewConfig.sectionsConfig,
    }
}

const Fallback = () => (
    <div className="mt-5 first:mt-0 border border-light rounded-lg bg-gray-300 animate-pulse">
        <div className="w-full h-20" />
        <div className="border-light border-t py-2 px-5 text-right text-gray text-sm">
            Loading...
        </div>
    </div>
)

const SchoolRoute = () => {
    const { school } = useLoaderData()
    const customizationCtx = useCustomizationCtx()
    const { data: sections } = useSuspenseQuery({
        queryKey: ['schoolSections'],
        queryFn: () => getSections(customizationCtx),
    })
    const SchoolHero = useComponentCustomization(
        CUSTOMIZATION_NAME.COMPONENTS__SCHOOL_HERO
    )

    return (
        <div className="">
            <Suspense fallback="loading...">
                <SchoolHero school={school} />
            </Suspense>
            <div className="w-container mx-auto grid md:grid-cols-5">
                <div className="">
                    <SchoolPageMenu sectionConfigs={sections} />
                </div>
                <div className="col-span-4 pt-5 pb-10">
                    {sections.map(({ id, component: SectionComponent }) => {
                        return (
                            <Suspense key={id} fallback={<Fallback />}>
                                <SectionComponent school={school} />
                            </Suspense>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default SchoolRoute
