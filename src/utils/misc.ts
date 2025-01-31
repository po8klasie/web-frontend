export const toggleInArray = <T = unknown>(array: T[], value: T) => {
    if (array.includes(value)) {
        return array.filter((v) => v !== value)
    }
    return [...array, value]
}
