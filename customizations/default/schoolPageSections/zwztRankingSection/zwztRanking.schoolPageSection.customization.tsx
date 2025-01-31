import SchoolInfoSection from '../SchoolInfoSection'
import zwztLogo from '../../assets/zwzt_logo.svg'
import { FC, ReactNode, useMemo } from 'react'
const verticalThClassName = 'text-left pr-4 whitespace-nowrap'
const numberCellClassName = 'text-center py-1 px-2'
const latestYearClassName = 'bg-primaryBg'

const renderTh = (
    propertyValue: number,
    i: number,
    extraClassName = ''
): ReactNode => (
    <th
        className={[
            numberCellClassName,
            i == 0 ? latestYearClassName : '',
            extraClassName,
        ].join(' ')}
    >
        {propertyValue}
    </th>
)
const renderTd = (
    propertyValue: number,
    i: number,
    extraClassName = ''
): ReactNode => (
    <td
        className={[
            numberCellClassName,
            i == 0 ? latestYearClassName : '',
            extraClassName,
        ].join(' ')}
    >
        {propertyValue}
    </td>
)
interface RankingTableProps {
    zwzt_rankingEntries: any[]
}
const RankingTable: FC<RankingTableProps> = ({ zwzt_rankingEntries }) => {
    const sortedRankingEntries = useMemo(() => {
        const clone = [...zwzt_rankingEntries]
        clone.sort((a, b) => b.year - a.year)
        return clone
    }, [zwzt_rankingEntries])

    const renderCellsForProperty = (
        propertyName: keyof any,
        fn: (propertyValue: number, i: number) => ReactNode,
        extraClassName = ''
    ) =>
        sortedRankingEntries.map((rankingEntry, i) =>
            fn(rankingEntry[propertyName], i, extraClassName)
        )

    return (
        <table className="inline-table">
            <tbody>
                <tr>
                    <th />
                    {renderCellsForProperty('year', renderTh, 'rounded-t')}
                </tr>
                <tr>
                    <th className={verticalThClassName}>Miejsce w Polsce</th>
                    {renderCellsForProperty('place_in_country', renderTd)}
                </tr>
                <tr>
                    <th className={verticalThClassName}>
                        Miejsce w województwie
                    </th>
                    {renderCellsForProperty('place_in_voivodeship', renderTd)}
                </tr>
                <tr>
                    <th className={verticalThClassName}>Wskaźnik</th>
                    {renderCellsForProperty(
                        'indicator_value',
                        renderTd,
                        'rounded-b'
                    )}
                </tr>
            </tbody>
        </table>
    )
}

const ZwztRankingSection = ({ school }) => {
    const { zwzt_ranking } = school
    return (
        <SchoolInfoSection
            overwriteFooter="Dane udostępnione przez Fundację Zwolnieni z Teorii"
            id="zwztRanking"
            updateTime={new Date().toDateString()}
        >
            <div className="p-3">
                <div className="flex items-center">
                    <h3 className="text-lg font-bold text-dark mr-2">
                        Ranking
                    </h3>
                    <a
                        href="https://zwolnienizteorii.pl"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <img src={zwztLogo} alt="Zwolnieni z Teorii" />
                    </a>
                </div>
                <div className="mt-4">
                    {zwzt_ranking && zwzt_ranking.length > 0 ? (
                        <div className="flex lg:flex-row flex-col">
                            <RankingTable zwzt_rankingEntries={zwzt_ranking} />
                            <div className="lg:ml-10 lg:pl-5 lg:border-l mt-4 lg:mt-0">
                                <p>
                                    Szkoła znajduje się w Rankingu Zwolnieni z
                                    Teorii. To znaczy, że:
                                    <ul className="mt-1 list-disc list-inside">
                                        <li>
                                            min. 2 uczniów w szkole zrealizowało
                                            projekt w Olimpiadzie Zwolnieni z
                                            Teorii oraz
                                        </li>
                                        <li>
                                            został zrealizowany min. 1 projekt,
                                            który jako swoją instytucję projektu
                                            wskazał daną szkołę
                                        </li>
                                    </ul>
                                    <a
                                        href="https://zwolnienizteorii.pl/ranking/metodyka"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="inline-block mt-2 text-sm text-gray-600 underline"
                                    >
                                        Przeczytaj więcej o metodyce rankingu
                                    </a>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="">Brak szkoły w zestawieniu</div>
                    )}
                </div>
            </div>
        </SchoolInfoSection>
    )
}

export default {
    id: 'zwztRanking',
    name: 'Zwolnieni z Teorii',
    component: ZwztRankingSection,
}
