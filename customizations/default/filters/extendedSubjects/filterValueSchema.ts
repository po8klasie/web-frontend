import { z } from 'zod'

const filterValueSchema = z.array(z.array(z.string()).min(1))

export type ExtendedSubjectsFilterValue = z.infer<typeof filterValueSchema>

export const defaultValue: ExtendedSubjectsFilterValue = []

export const normalizeInitialValue = (
    initialValue
): ExtendedSubjectsFilterValue => {
    if (!initialValue) return defaultValue
    try {
        const parsedJson = JSON.parse(initialValue)
        return filterValueSchema.parse(parsedJson)
    } catch {
        return defaultValue
    }
}
