import { z } from 'zod'

const defaultMapViewConfigSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
    zoom: z.number(),
})

const filterGroupConfigSchema = z.object({
    id: z.string(),
    filters: z.array(
        z.object({
            id: z.string(),
            queryParam: z.string(),
            inline: z.boolean().default(false),
        })
    ),
})

const searchViewConfigSchema = z.object({
    defaultMapView: defaultMapViewConfigSchema,
    filtersConfig: z.array(filterGroupConfigSchema),
})

const schoolViewConfigSchema = z.object({
    sectionsConfig: z.array(
        z.object({
            id: z.string(),
            options: z.record(z.unknown()),
        })
    ),
})

export const projectConfigSchema = z.object({
    projectId: z.string(),
    projectName: z.string(),
    customizationVariant: z.string().default('default'),
    searchViewConfig: searchViewConfigSchema,
    schoolViewConfig: schoolViewConfigSchema,
})

export type ProjectConfig = z.infer<typeof projectConfigSchema>
