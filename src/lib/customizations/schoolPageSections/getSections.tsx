import resolveIsomorphicCustomization from '../isomorphic/resolveIsomorphicCustomization'
import { CUSTOMIZATION_NAME } from '../customizationName'
import { CustomizationContext } from '../customizationContext'

const getSections = async (customizationCtx: CustomizationContext) => {
    const sectionsDefinitions = await resolveIsomorphicCustomization(
        CUSTOMIZATION_NAME.SCHOOL_PAGE_SECTIONS__SECTIONS,
        customizationCtx,
        {
            multiple: true,
        }
    )

    const sectionsMap = sectionsDefinitions.reduce(
        (acc, sectionDefinition) => ({
            ...acc,
            [sectionDefinition.id]: sectionDefinition,
        }),
        {}
    )

    const {
        schoolViewConfig: { sectionsConfig },
    } = customizationCtx.projectConfig

    return sectionsConfig.map(({ id }) => sectionsMap[id])
}

export default getSections
