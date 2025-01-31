import { or, sql } from 'drizzle-orm'
import ExtendedSubjectsFilter from './ExtendedSubjectsFilter'
import { defaultValue, normalizeInitialValue } from './filterValueSchema'

const getSqlForSingleClassProfile = (
    extendedSubjectsForSingleClassProfile: string[]
) => sql`
    rspo in (
        select distinct institution_rspo from app_secondary_school_classes
        where app_secondary_school_classes.id in (
            select
                class_id
            from app_secondary_school_classes_extended_subjects extended_subjects
            where subject_name in ${extendedSubjectsForSingleClassProfile}
            group by extended_subjects.class_id
            having count(distinct extended_subjects.subject_set_id) = ${extendedSubjectsForSingleClassProfile.length}
        )
    )`

const extendedSubjectsFilter = {
    id: 'extendedSubjects',
    filter: (rawValue) => () => {
        const value = normalizeInitialValue(rawValue)
        if (value.length === 0) return undefined

        return or(...value.map(getSqlForSingleClassProfile))
    },
    components: {
        full: ExtendedSubjectsFilter,
    },
    defaultValue,
}

export default extendedSubjectsFilter
