import { useComponentCustomization } from '../../lib/customizations/isomorphic/resolveIsomorphicCustomization'
import { CUSTOMIZATION_NAME } from '../../lib/customizations/customizationName'
import { Virtuoso } from 'react-virtuoso'
import { type FC } from 'react'

interface LoadingSearchResultsProps {
    SchoolCard: FC
}

const LoadingSearchResults: FC<LoadingSearchResultsProps> = ({
    SchoolCard,
}) => {
    return <>{new Array(3).fill(<SchoolCard />)}</>
}

interface VirtualizedResultsListProps {
    schoolFeatures: Record<string, unknown>[]
    SchoolCard: FC
}

const VirtualizedResultsList: FC<VirtualizedResultsListProps> = ({
    schoolFeatures,
    SchoolCard,
}) => (
    <Virtuoso
        style={{
            height: 'calc(100vh - var(--navbar-height) * 2)',
            padding: '1rem 0',
            width: '100%',
        }}
        data={schoolFeatures}
        itemContent={(index, { properties: { school } }) => (
            <SchoolCard school={school} />
        )}
    />
)

interface SearchResultsProps {
    schoolFeatures: Record<string, unknown>[]
}

const SearchResults: FC<SearchResultsProps> = ({ schoolFeatures }) => {
    const SchoolCard = useComponentCustomization(
        CUSTOMIZATION_NAME.COMPONENTS__SCHOOL_CARD
    )

    return (
        <div>
            {!schoolFeatures ? (
                <LoadingSearchResults SchoolCard={SchoolCard} />
            ) : (
                <VirtualizedResultsList
                    schoolFeatures={schoolFeatures}
                    SchoolCard={SchoolCard}
                />
            )}
        </div>
    )
}

export default SearchResults
