import MoreFilters from './MoreFilters'
import ResetFilters from './ResetFilters'
import FilterStateOuterWrapper from './FilterStateOuterWrapper'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getInlineFilters } from '../../../lib/customizations/filters/getFilters'
import { useCustomizationCtx } from '../../../lib/customizations/customizationContext'

const FiltersBar = () => {
    const customizationCtx = useCustomizationCtx()
    const { data: inlineFilters } = useSuspenseQuery({
        queryKey: ['getInlineFilters'],
        queryFn: () => getInlineFilters(customizationCtx),
    })

    return (
        <div className="w-full bg-white border-b border-lighten font-primary h-navbarHeight flex items-center">
            <div
                className={`w-wideContainer mx-auto lg:flex items-center py-3`}
            >
                {inlineFilters.map((filter) => (
                    <div className="mx-2" key={filter.id}>
                        <FilterStateOuterWrapper
                            component={filter.components.inline}
                            queryParam={filter.queryParam}
                        />
                    </div>
                ))}
                <MoreFilters />
                <ResetFilters />
            </div>
        </div>
    )
}
export default FiltersBar
