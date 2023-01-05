import { ChangeEventHandler, FC, MouseEventHandler, useEffect, useState } from 'react';
import { FilterProps } from './types';
import { useController, useFormContext } from 'react-hook-form';
import CollapsibleFilterWrapper from './CollapsibleFilterWrapper';
import { AiOutlineQuestionCircle } from '@react-icons/all-files/ai/AiOutlineQuestionCircle';
import { BsQuestionCircle } from '@react-icons/all-files/bs/BsQuestionCircle';
import Link from 'next/link';
import { AiOutlineWarning } from '@react-icons/all-files/ai/AiOutlineWarning';
import { getTrackBackground, Range } from 'react-range';
import { IRenderThumbParams, IRenderTrackParams } from 'react-range/lib/types';

const RecruitmentPointsAlert = () => (
  <span
    role="alert"
    className="bg-yellow-100 border-l-4 border-yellow-600 p-1 rounded block text-sm"
  >
    <AiOutlineWarning className="inline-block text-xl text-yellow-600" /> Progi punktowe zmieniają
    się co roku i zależą od wielu czynników.{' '}
    <Link href="/">
      <a className="underline">Dowiedz się więcej</a>
    </Link>
  </span>
);

const MIN = 0;
const MAX = 200;

const createTrackRenderer = (values: number[]): FC<IRenderTrackParams> => ({ props, children }) => (
  <div
    {...props}
    className="h-1 w-full rounded"
    style={{
      ...props.style,
      background: getTrackBackground({
        min: MIN,
        max: MAX,
        values,
        colors: ['rgb(229 231 235)', 'rgb(156 163 175)', 'rgb(229 231 235)'],
      }),
    }}
  >
    {children}
  </div>
);

const renderThumb: FC<IRenderThumbParams> = ({ props }) => (
  <div {...props} className="relative border-2 rounded-full w-3 h-3 border-primary bg-white" />
);

const inputClassName =
  'bg-gray-200 p-1 w-10 text-center rounded outline-none border-2 focus:border-gray-300';

const RecruitmentPointsFilter: FC<FilterProps<[number, number]>> = ({ value, setValue }) => {
  const [range, setRange] = useState<[number, number]>(value);

  useEffect(() => {
    setRange(value);
  }, [value]);

  const handleFinalChange = () => {
    setValue(range);
  };

  const createInputChangeHandler = (i: 0 | 1): ChangeEventHandler<HTMLInputElement> => (e) => {
    const updatedVal = parseInt(e.target.value, 10);
    if (updatedVal > MAX) return;
    const updatedRange = [...range];
    updatedRange[i] = Number.isNaN(updatedVal) ? 0 : updatedVal;
    setRange(updatedRange as [number, number]);
  };

  return (
    <CollapsibleFilterWrapper title="Najniższy próg punktowy">
      <RecruitmentPointsAlert />
      <div className="mt-2 flex items-center">
        <input className={inputClassName} onChange={createInputChangeHandler(0)} value={range[0]} />
        <div className="px-2 w-full">
          <Range
            step={1}
            min={MIN}
            max={MAX}
            values={range}
            onChange={setRange}
            onFinalChange={handleFinalChange}
            renderTrack={createTrackRenderer(range)}
            renderThumb={renderThumb}
          />
        </div>
        <input className={inputClassName} onChange={createInputChangeHandler(1)} value={range[1]} />
      </div>
    </CollapsibleFilterWrapper>
  );
};

export default RecruitmentPointsFilter;
