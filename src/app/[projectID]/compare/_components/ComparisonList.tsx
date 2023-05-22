import { FC, PropsWithChildren } from 'react';
import { ComparisonResultT } from './types';

export const ComparisonList: FC<PropsWithChildren<Record<string, never>>> = ({ children }) => (
  <ul className="w-full rounded">{children}</ul>
);
const getComparisonListItemClassName = (state: ComparisonResultT) => {
  switch (state) {
    case 'match':
      return 'bg-primaryBg text-primary';
    case 'different':
      return 'bg-green-50 text-green-600';
    default:
      return 'even:bg-lightBlue';
  }
};

export const ComparisonListItem: FC<PropsWithChildren<{ state: ComparisonResultT }>> = ({
  children,
  state,
}) => (
  <li className={['px-2 py-1 my-0.5 rounded', getComparisonListItemClassName(state)].join(' ')}>
    {children}
  </li>
);

export const ComparisonListTitle: FC<PropsWithChildren<Record<string, never>>> = ({ children }) => (
  <span className="text-center font-bold text-gray-700 mb-2 mt-3 block">{children}</span>
);

interface ComparisonListBlankProps {
  blankItemsNo: number;
}
export const ComparisonListBlank: FC<ComparisonListBlankProps> = ({ blankItemsNo }) => (
  <>{Array(blankItemsNo).fill(<li className="py-1">&nbsp;</li>)}</>
);
