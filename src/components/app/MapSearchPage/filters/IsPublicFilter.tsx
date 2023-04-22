import { FC } from 'react';
import { FilterProps } from './types';

const baseClassName = 'w-1/2 flex items-center justify-center py-1';
const activeClassName = 'bg-light';

type StringBool = 'true' | 'false';

const IsPublicFilter: FC<FilterProps<StringBool | null>> = ({ value, setValue }) => {
  const toggle = (val: StringBool) => {
    if (value === val) setValue(null);
    else setValue(val);
  };

  return (
    <div className="border rounded-xl border-light flex mb-4">
      <button
        role="checkbox"
        aria-checked={value === 'true'}
        onClick={() => toggle('true')}
        className={[baseClassName, 'rounded-l-xl', value === 'true' ? activeClassName : ''].join(
          ' ',
        )}
      >
        Publiczna
      </button>
      <button
        role="checkbox"
        aria-checked={value === 'false'}
        onClick={() => toggle('false')}
        className={[baseClassName, 'rounded-r-xl', value === 'false' ? activeClassName : ''].join(
          ' ',
        )}
      >
        Niepubliczna
      </button>
    </div>
  );
};

export default IsPublicFilter;
