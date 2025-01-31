import { focusAtom } from 'jotai-optics'
import filtersAtom from './filtersAtom'
import { useAtom } from 'jotai/index'
import { useRef, ComponentType, FC } from 'react'

interface FilterStateOuterWrapperProps {
    component: ComponentType<{
        value: unknown
        setValue: (value: unknown) => void
    }>
    queryParam: string
}

const FilterStateOuterWrapper: FC<FilterStateOuterWrapperProps> = ({
    component: FilterComponent,
    queryParam,
}) => {
    const focusedAtomRef = useRef(
        focusAtom(filtersAtom, (optic) => optic.prop(queryParam))
    )
    const [value, setValue] = useAtom(focusedAtomRef.current)
    return <FilterComponent value={value} setValue={setValue} />
}
export default FilterStateOuterWrapper
