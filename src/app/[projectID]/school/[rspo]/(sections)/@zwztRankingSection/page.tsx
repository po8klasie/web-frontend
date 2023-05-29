import SchoolInfoSection from '../SchoolInfoSection';
import { fetchInstitutionDetails } from '../../../../../../api/institutionDetails/institutionDetails';
import zwztLogo from '../../../../../../assets/app/zwzt_logo.svg?url';
import Image from 'next/image';
import { IInstitutionDetailsZwztRankingEntryData } from '../types';
import { FC, ReactNode, useMemo } from 'react';
const verticalThClassName = 'text-left pr-4 whitespace-nowrap';
const numberCellClassName = 'text-center py-1 px-2';
const latestYearClassName = 'bg-primaryBg';

const renderTh = (propertyValue: number, i: number, extraClassName = ''): ReactNode => (
  <th
    className={[numberCellClassName, i == 0 ? latestYearClassName : '', extraClassName].join(' ')}
  >
    {propertyValue}
  </th>
);
const renderTd = (propertyValue: number, i: number, extraClassName = ''): ReactNode => (
  <td
    className={[numberCellClassName, i == 0 ? latestYearClassName : '', extraClassName].join(' ')}
  >
    {propertyValue}
  </td>
);
interface RankingTableProps {
  zwztRankingEntries: IInstitutionDetailsZwztRankingEntryData[];
}
const RankingTable: FC<RankingTableProps> = ({ zwztRankingEntries }) => {
  const sortedRankingEntries = useMemo(() => {
    const clone = [...zwztRankingEntries];
    clone.sort((a, b) => b.year - a.year);
    return clone;
  }, [zwztRankingEntries]);

  const renderCellsForProperty = (
    propertyName: keyof IInstitutionDetailsZwztRankingEntryData,
    fn: (propertyValue: number, i: number) => ReactNode,
    extraClassName = '',
  ) =>
    sortedRankingEntries.map((rankingEntry, i) =>
      fn(rankingEntry[propertyName], i, extraClassName),
    );

  return (
    <table className="inline-table">
      <tbody>
        <tr>
          <th />
          {renderCellsForProperty('year', renderTh, 'rounded-t')}
        </tr>
        <tr>
          <th className={verticalThClassName}>Miejsce w Polsce</th>
          {renderCellsForProperty('placeInCountry', renderTd)}
        </tr>
        <tr>
          <th className={verticalThClassName}>Miejsce w województwie</th>
          {renderCellsForProperty('placeInVoivodeship', renderTd)}
        </tr>
        <tr>
          <th className={verticalThClassName}>Wskaźnik</th>
          {renderCellsForProperty('indicatorValue', renderTd, 'rounded-b')}
        </tr>
      </tbody>
    </table>
  );
};

const ZwztRankingSection = async ({ params: { rspo } }) => {
  const institutionDetails = await fetchInstitutionDetails(rspo);

  return (
    <SchoolInfoSection
      overwriteFooter="Dane udostępnione przez Fundację Zwolnieni z Teorii"
      id="zwztRanking"
      updateTime={new Date().toDateString()}
    >
      <div className="p-3">
        <div className="flex items-center">
          <h3 className="text-lg font-bold text-dark mr-2">Ranking</h3>
          <a href="https://zwolnienizteorii.pl" target="_blank" rel="noreferrer noopener">
            <Image src={zwztLogo} alt="Zwolnieni z Teorii" />
          </a>
        </div>
        <div className="mt-4">
          {institutionDetails.zwztRankingEntries.length > 0 ? (
            <div className="flex lg:flex-row flex-col">
              <RankingTable zwztRankingEntries={institutionDetails.zwztRankingEntries} />
              <div className="lg:ml-10 lg:pl-5 lg:border-l mt-4 lg:mt-0">
                <p>
                  Szkoła znajduje się w Rankingu Zwolnieni z Teorii. To znaczy, że:
                  <ul className="mt-1 list-disc list-inside">
                    <li>
                      min. 2 uczniów w szkole zrealizowało projekt w Olimpiadzie Zwolnieni z Teorii
                      oraz
                    </li>
                    <li>
                      został zrealizowany min. 1 projekt, który jako swoją instytucję projektu
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
  );
};

export default ZwztRankingSection;
