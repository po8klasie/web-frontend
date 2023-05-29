'use client';

import React, { FC } from 'react';
import useFilterValue from '../_hook/useFilterValue';
import CollapsibleFilterWrapper from '../_components/CollapsibleFilterWrapper';

type StringBool = 'true' | 'false';

const ZwztRankingFilter: FC = () => {
  const { value, setValue } = useFilterValue<StringBool>('featured_in_zwzt_ranking');
  const toggle = () => {
    if (value === 'true') setValue(null);
    else setValue('true');
  };

  return (
    <CollapsibleFilterWrapper title="Ranking Zwolnieni z Teorii">
      <div className="">
        <button
          onClick={toggle}
          className={[
            'flex border px-2 py-1 rounded-xl text-center',
            value === 'true' ? 'bg-gray-100' : '',
          ].join(' ')}
        >
          Szkoła znajdowała się w przynajmniej jednej edycji* Rankingu.
        </button>
        <span className="mt-2 block text-gray-600 text-sm">* - edycje: 2021, 2022, 2023</span>
      </div>
    </CollapsibleFilterWrapper>
  );
};

export default ZwztRankingFilter;
