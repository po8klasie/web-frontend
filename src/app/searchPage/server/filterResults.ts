import * as qs from 'querystring'
import resolveServerCustomization from '../../../lib/customizations/server/resolveServerCustomization'
import { CUSTOMIZATION_NAME } from '../../../lib/customizations/customizationName'
import { getFilters } from '../../../lib/customizations/filters/getFilters'
import { CustomizationContext } from '../../../lib/customizations/customizationContext'

export const filterSearchResults = async (
    queryString,
    customizationCtx: CustomizationContext
) => {
    const filterSchools = await resolveServerCustomization(
        CUSTOMIZATION_NAME.DATA__FILTER_SCHOOLS,
        customizationCtx
    )

    const filters = await getFilters(customizationCtx)

    const parsedQueryString = qs.parse(queryString)

    const schools = await filterSchools({
        customizationCtx,
        filterFunctions: filters.map((filter) =>
            filter.filter(parsedQueryString[filter.queryParam])
        ),
    })

    return { schools }
}
