import filtersDefinitions from '../../../../customizations/filters'

const defaultFilterValues = filtersDefinitions.reduce(
    (acc, filter) => ({
        ...acc,
        [filter.name]: filter.defaultValue,
    }),
    {}
)

export default defaultFilterValues
