import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '../../../components/primitives/Dialog'
import { ListFilter } from 'lucide-react'
import { useMemo } from 'react'
import FilterStateOuterWrapper from './FilterStateOuterWrapper'
import { useQuery } from '@tanstack/react-query'
import getFilterCategoriesWithFilters from '../../../lib/customizations/filters/getFilters'
import { useCustomizationCtx } from '../../../lib/customizations/customizationContext'

const triggerClassName = `
inline-flex items-center whitespace-nowrap 
rounded-md text-sm font-medium ring-offset-background
transition-colors focus-visible:outline-none 
focus-visible:ring-2 focus-visible:ring-ring 
focus-visible:ring-offset-2 disabled:pointer-events-none
disabled:opacity-50 border border-input bg-background 
hover:bg-[hsl(240_4.8%_95.9%)] hover:text-accent-foreground 
h-10 px-4 py-2 justify-between`

const MoreFilters = () => {
    const customizationCtx = useCustomizationCtx()
    const { data: filterCategoriesWithFilters } = useQuery({
        queryKey: ['getFilters'],
        queryFn: () => getFilterCategoriesWithFilters(customizationCtx),
    })

    const filterCategories = useMemo(
        () =>
            !filterCategoriesWithFilters
                ? []
                : filterCategoriesWithFilters.map((category) => ({
                      id: category.id,
                      title: category.title,
                      icon: category.icon,
                  })),
        [filterCategoriesWithFilters]
    )

    return (
        <div className="h-full flex items-center">
            <span className="w-[1px] h-full border-r mr-2 block"></span>
            <Dialog>
                <DialogTrigger className={triggerClassName}>
                    <ListFilter className="w-5 h-5 mr-2" />
                    More filters
                </DialogTrigger>
                <DialogContent className="max-w-[50vw] p-0">
                    <div className="flex max-h-[calc(100vh-4rem)]">
                        <div className="rounded-l-lg border-r mr-4 pr-4 pl-6 py-6  bg-gray-100 min-w-60">
                            <div className="grid gap-4">
                                {filterCategories &&
                                    filterCategories.map(
                                        ({ icon: Icon, title }) => (
                                            <button
                                                key={title}
                                                className="flex items-center py-2 hover:bg-gray-200 rounded-lg px-2 py-1 bold"
                                            >
                                                <Icon className="w-6 h-6 mr-4" />
                                                <span className="text-left">
                                                    {title}
                                                </span>
                                            </button>
                                        )
                                    )}
                            </div>
                        </div>
                        <div className="pl-4 pr-8 py-6 grid gap-y-4 w-full overflow-auto">
                            {filterCategoriesWithFilters &&
                                filterCategoriesWithFilters.map(
                                    ({ id, title, filters }) => (
                                        <div key={id} className="">
                                            <h5 className="text-lg font-semibold mb-2">
                                                {title}
                                            </h5>
                                            <div className="grid gap-y-2">
                                                {filters.map((filter) => (
                                                    <div
                                                        key={filter.queryParam}
                                                        className=""
                                                    >
                                                        <FilterStateOuterWrapper
                                                            component={
                                                                filter
                                                                    .components
                                                                    .full
                                                            }
                                                            queryParam={
                                                                filter.queryParam
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default MoreFilters
