import React from 'react'
import { sql } from 'drizzle-orm'

const ZwztRankingFilter = ({ value, setValue }) => {
    const toggle = () => {
        if (value === 'true') setValue(null)
        else setValue('true')
    }
    return (
        <div>
            <button
                onClick={toggle}
                className={[
                    'flex border px-2 py-1 rounded-xl text-center',
                    value === 'true' ? 'bg-gray-100' : '',
                ].join(' ')}
            >
                Szkoła znajdowała się w przynajmniej jednej edycji* Rankingu.
            </button>
            <span className="mt-2 block text-gray-600 text-sm">
                * - edycje: 2021, 2022, 2023
            </span>
        </div>
    )
}

const zwztRankingFilter = {
    id: 'zwzt_ranking',
    filter: (rawValue) => () => {
        if (rawValue !== 'true') return undefined
        return sql`
                rspo in (
                    select rspo from app_zwzt_ranking
                )`
    },
    components: {
        full: ZwztRankingFilter,
    },
    defaultValue: [],
}

export default zwztRankingFilter
