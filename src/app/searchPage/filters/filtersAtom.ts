import { atom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'

const filtersAtom = atom(null) // to be hydrated

export const useHydrateFiltersAtom = (filterValuesFromServer) =>
    useHydrateAtoms([[filtersAtom, filterValuesFromServer]])

export default filtersAtom
