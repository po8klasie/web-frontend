import db from './db'
import { and, sql } from 'drizzle-orm'
import { SecondarySchoolSchema } from './schema'
import { CustomizationContext } from '../../../src/lib/customizations/customizationContext'

const createGeojson = (features) => ({
    name: 'schools',
    type: 'FeatureCollection',
    features,
})

const createFeature = (school: SecondarySchoolSchema) => ({
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [school.longitude, school.latitude],
    },
    properties: {
        school,
    },
})

interface FilterSchoolsArgs {
    filterFunctions: any[]
    customizationCtx: CustomizationContext
}

export const filterSchools = async ({
    customizationCtx,
    filterFunctions,
}: FilterSchoolsArgs) => {
    const initialWhereStatement = (schools, { eq }) =>
        eq(schools.project_id, customizationCtx.projectId)
    const getWhereStatements = (...whereArgs) => [
        initialWhereStatement(...whereArgs),
        ...filterFunctions.map((fn) => fn(...whereArgs)),
    ]

    const schools = await db.query.secondarySchools.findMany({
        where: (...whereArgs) => and(...getWhereStatements(...whereArgs)),
        with: {
            classes: {
                where: (classes, { eq }) => eq(classes.is_latest, true),
            },
        },
    })

    return createGeojson(schools.map(createFeature))
}

export default filterSchools
