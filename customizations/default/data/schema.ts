import {
    pgTable,
    serial,
    text,
    boolean,
    integer,
    doublePrecision,
} from 'drizzle-orm/pg-core'
import { InferSelectModel, relations } from 'drizzle-orm'

export const secondarySchools = pgTable('app_secondary_schools', {
    rspo: serial(),
    name: text(),
    description: text(),
    rspo_institution_type: integer(),
    street: text(),
    house_number: text(),
    apartment_number: text(),
    postal_code: text(),
    city: text(),
    phone: text(),
    email: text(),
    website: text(),
    latitude: text(),
    longitude: text(),
    project_id: text(),
})

export type SecondarySchoolSchema = InferSelectModel<typeof secondarySchools>

export const secondarySchoolsRelations = relations(
    secondarySchools,
    ({ one, many }) => ({
        classes: many(secondarySchoolClasses),
        extracurricular_activities: many(schoolExtracurricularActivities),
        zwzt_ranking: many(zwztRanking),
        school_events: many(schoolEvents),
        sport_activities: many(sportActivities),
        school_infrastructure: many(schoolInfrastructure),
    })
)

export const secondarySchoolClasses = pgTable('app_secondary_school_classes', {
    institution_rspo: serial().references(() => secondarySchools.rspo),
    class_name: text(),
    class_symbol: text(),
    class_type: text(),
    class_size: text(),
    year: text(),
    description: text(),
    occupation: text(),
    qualifications: text(),
    points_stats_min: text(),
    points_stats_avg: text(),
    points_stats_max: text(),
    url: text(),
    id: serial(),
    is_latest: boolean(),
})

export const secondarySchoolClassesRelations = relations(
    secondarySchoolClasses,
    ({ one, many }) => ({
        school: one(secondarySchools, {
            fields: [secondarySchoolClasses.institution_rspo],
            references: [secondarySchools.rspo],
        }),
        extended_subjects: many(extendedSubjects),
    })
)

export const extendedSubjects = pgTable(
    'app_secondary_school_classes_extended_subjects',
    {
        class_id: serial().references(() => secondarySchoolClasses.id),
        subject_set_id: serial(),
        subject_set_index: integer(),
        subject_name: text(),
    }
)

export const extendedSubjectsRelations = relations(
    extendedSubjects,
    ({ one, many }) => ({
        class: one(secondarySchoolClasses, {
            fields: [extendedSubjects.class_id],
            references: [secondarySchoolClasses.id],
        }),
    })
)

export const schoolExtracurricularActivities = pgTable(
    'app_secondary_school_extracurricular_activities',
    {
        rspo: serial().references(() => secondarySchools.rspo),
        activity_name: text(),
        id: serial().primaryKey(),
    }
)

export const schoolExtracurricularActivitiesRelations = relations(
    schoolExtracurricularActivities,
    ({ one, many }) => ({
        school: one(secondarySchools, {
            fields: [schoolExtracurricularActivities.rspo],
            references: [secondarySchools.rspo],
        }),
    })
)

export const zwztRanking = pgTable('app_zwzt_ranking', {
    rspo: serial().references(() => secondarySchools.rspo),
    id: serial().primaryKey(),
    year: integer(),
    place_in_country: integer(),
    place_in_voivodeship: integer(),
    indicator_value: doublePrecision(),
})

export const zwztRankingRelations = relations(zwztRanking, ({ one, many }) => ({
    school: one(secondarySchools, {
        fields: [zwztRanking.rspo],
        references: [secondarySchools.rspo],
    }),
}))

export const schoolEvents = pgTable('app_secondary_school_school_events', {
    rspo: serial().references(() => secondarySchools.rspo),
    id: serial().primaryKey(),
    event_name: text(),
})

export const schoolEventsRelations = relations(
    schoolEvents,
    ({ one, many }) => ({
        school: one(secondarySchools, {
            fields: [schoolEvents.rspo],
            references: [secondarySchools.rspo],
        }),
    })
)

export const sportActivities = pgTable(
    'app_secondary_school_sport_activities',
    {
        rspo: serial().references(() => secondarySchools.rspo),
        id: serial().primaryKey(),
        activity_name: text(),
    }
)

export const sportActivitiesRelations = relations(
    sportActivities,
    ({ one, many }) => ({
        school: one(secondarySchools, {
            fields: [sportActivities.rspo],
            references: [secondarySchools.rspo],
        }),
    })
)

export const schoolInfrastructure = pgTable(
    'app_secondary_school_infrastructure',
    {
        rspo: serial().references(() => secondarySchools.rspo),
        id: serial().primaryKey(),
        name: text(),
    }
)

export const schoolInfrastructureRelations = relations(
    schoolInfrastructure,
    ({ one, many }) => ({
        school: one(secondarySchools, {
            fields: [schoolInfrastructure.rspo],
            references: [secondarySchools.rspo],
        }),
    })
)
