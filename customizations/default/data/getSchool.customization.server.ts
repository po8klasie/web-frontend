import db from './db'

export const getSchool = async ({ projectCustomizationCtx, id }) => {
    const school = await db.query.secondarySchools.findFirst({
        where: (schools, { eq }) => eq(schools.rspo, id),
        with: {
            classes: {
                with: {
                    extended_subjects: true,
                },
            },
            extracurricular_activities: true,
            school_events: true,
            zwzt_ranking: true,
            sport_activities: true,
            school_infrastructure: true,
        },
    })

    console.log(school)

    return school
}

export default getSchool
