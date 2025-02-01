import resolveIsomorphicCustomization from '../isomorphic/resolveIsomorphicCustomization'
import { CUSTOMIZATION_NAME } from '../customizationName'
import { CustomizationContext } from '../customizationContext'

const getFilterCategoriesWithFilters = async (
    customizationCtx: CustomizationContext
) => {
    const filterCategories = await resolveIsomorphicCustomization(
        CUSTOMIZATION_NAME.FILTERS__FILTER_CATEGORIES,
        customizationCtx
    )
    const filterDefinitions = await resolveIsomorphicCustomization(
        CUSTOMIZATION_NAME.FILTERS__FILTER_DEFINITIONS,
        customizationCtx,
        {
            multiple: true,
        }
    )

    const filtersCategoriesMap = filterCategories.reduce(
        (acc, filterCategory) => {
            acc[filterCategory.id] = filterCategory
            return acc
        }
    )

    const filterDefinitionsMap = filterDefinitions.reduce(
        (acc, filterDefinition) => {
            acc[filterDefinition.id] = filterDefinition
            return acc
        },
        {}
    )

    const { filtersConfig: searchViewFiltersConfig } =
        customizationCtx.projectConfig.searchViewConfig

    return searchViewFiltersConfig.map(({ id, filters }) => ({
        id,
        ...filtersCategoriesMap[id],
        filters: filters.map((filter) => {
            return {
                ...filterDefinitionsMap[filter.id],
                queryParam: filter.queryParam,
            }
        }),
    }))
}

export const getFilters = async (
    customizationCtx: CustomizationContext,
    filterPredicate = () => true
) => {
    const filterDefinitions = await resolveIsomorphicCustomization(
        CUSTOMIZATION_NAME.FILTERS__FILTER_DEFINITIONS,
        customizationCtx,
        {
            multiple: true,
        }
    )

    const filterDefinitionsMap = filterDefinitions.reduce(
        (acc, filterDefinition) => ({
            ...acc,
            [filterDefinition.id]: filterDefinition,
        }),
        {}
    )

    const { filtersConfig: searchViewFiltersConfig } =
        customizationCtx.projectConfig.searchViewConfig

    return searchViewFiltersConfig.flatMap(({ filters }) => {
        return filters
            .filter((filterConfig, i) =>
                filterPredicate({
                    filterConfig,
                    i,
                    filter: filterDefinitionsMap[filterConfig.id],
                })
            )
            .map((filter) => ({
                ...filterDefinitionsMap[filter.id],
                queryParam: filter.queryParam,
            }))
    })
}

export const getInlineFilters = async (
    customizationCtx: CustomizationContext
) => {
    const filterPredicate = ({ filterConfig, filter }) => {
        return filterConfig.inline === true && Boolean(filter.components.inline)
    }
    const filters = await getFilters(customizationCtx, filterPredicate)
    return filters
}
export default getFilterCategoriesWithFilters
