import { filterSearchResults } from '../../app/searchPage/server/filterResults'
import { getCustomizationCtxFromParams } from '../../lib/customizations/customizationContext'
import { LoaderFunctionArgs } from 'react-router'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const customizationCtx = await getCustomizationCtxFromParams(params)
    const results = await filterSearchResults(
        request.url.split('?')[1],
        customizationCtx
    )
    return results
}
