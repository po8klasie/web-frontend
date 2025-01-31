import resolveIsomorphicCustomization from '../isomorphic/resolveIsomorphicCustomization'
import { CUSTOMIZATION_NAME } from '../customizationName'
import { CustomizationContext } from '../customizationContext'

const getDefaultFilterValues = async (
    customizationCtx: CustomizationContext
) => {
    const filterDefinitions = await resolveIsomorphicCustomization(
        CUSTOMIZATION_NAME.FILTERS__FILTER_DEFINITIONS,
        customizationCtx,
        {
            multiple: true,
        }
    )

    const filterDefinitionsMap = filterDefinitions.reduce(
        (acc, filterDefinition) => {
            return {
                ...acc,
                [filterDefinition.id]: filterDefinition,
            }
        },
        {}
    )

    const { filtersConfig: searchViewFiltersConfig } =
        customizationCtx.projectConfig.searchViewConfig

    return searchViewFiltersConfig.reduce((acc, { filters }) => {
        const defaultValuesForSection = filters.reduce(
            (acc, filter) => ({
                [filter.queryParam]:
                    filterDefinitionsMap[filter.id].defaultValue,
                ...acc,
            }),
            {}
        )

        return { ...acc, ...defaultValuesForSection }
    }, {})
}

export default getDefaultFilterValues
