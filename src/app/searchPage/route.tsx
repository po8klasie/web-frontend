import FiltersBar from './filters/FiltersBar'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import Map from './Map'
import { useAtom } from 'jotai'
import filtersAtom, { useHydrateFiltersAtom } from './filters/filtersAtom'
import qs from 'query-string'
import { useDebounce } from 'use-debounce'
import { filterSearchResults } from './server/filterResults'

import SearchResults from './SearchResults'
import getDefaultFilterValues from '../../lib/customizations/filters/getDefaultFilterValues'
import {
    getCustomizationCtxFromParams,
    useCustomizationCtx,
} from '../../lib/customizations/customizationContext'
import type { Route } from '../../../.react-router/types/src/app/+types/route.ts'

export const loader = async ({ request, params }: Route.LoaderArgs) => {
    const customizationCtx = await getCustomizationCtxFromParams(params)

    const queryString = request.url.split('?')[1]
    const parsed = qs.parse(queryString)

    const defaultFilterValues = await getDefaultFilterValues(customizationCtx)
    return {
        parsed: {
            ...defaultFilterValues,
            ...parsed,
        },
        qs: queryString,
        customizationCtx,
        initialResults: await filterSearchResults(
            queryString,
            customizationCtx
        ),
    }
}

const SearchPage = ({ loaderData }: Route.ComponentProps) => {
    const { projectId } = useCustomizationCtx()
    useHydrateFiltersAtom(loaderData.parsed)

    const [filters] = useAtom(filtersAtom)
    const [debouncedFilters] = useDebounce(filters, 500)
    const [debouncedQueryString, setDebouncedQueryString] = useState(
        loaderData.qs ?? ''
    )

    useEffect(() => {
        requestIdleCallback(
            () => {
                let queryString = qs.stringify(debouncedFilters, {
                    skipNull: true,
                    skipEmptyString: true,
                })
                queryString = queryString.length > 0 ? `?${queryString}` : ''
                setDebouncedQueryString(queryString)
                window.history.replaceState(
                    {},
                    '',
                    `${window.location.pathname}${queryString}`
                )
            },
            { timeout: 1000 }
        )
    }, [debouncedFilters])

    const { data: schools } = useQuery({
        queryKey: ['schools', debouncedQueryString],
        queryFn: () => {
            return fetch(`/app/${projectId}/api/search${debouncedQueryString}`)
                .then((res) => res.json())
                .then((data) => data.schools)
        },
        placeholderData: {
            features: [],
        },
        initialData: loaderData.initialResults.schools,
    })

    return (
        <div className="">
            <div className="w-full">
                <FiltersBar customizationCtx={loaderData.customizationCtx} />
            </div>
            <div
                className="grid grid-cols-2"
                style={{ height: 'calc(100vh - var(--navbar-height) * 2)' }}
            >
                <div className="h-full">
                    <SearchResults
                        customizationCtx={loaderData.customizationCtx}
                        schoolFeatures={schools.features ?? []}
                    />
                </div>
                <div className="h-full w-full">
                    <div className="h-full w-full">
                        {schools.features.length > 0 && (
                            <Map schools={schools} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage
