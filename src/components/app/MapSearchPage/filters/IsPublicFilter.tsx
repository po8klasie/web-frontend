import { FC } from 'react';
import { FilterProps } from './types';
import { useController } from 'react-hook-form';

const baseClassName = 'w-1/2 flex items-center justify-center py-1';
const activeClassName = 'bg-light';

const IsPublicFilter: FC<FilterProps> = ({ control, name, defaultValue }) => {
  const {
    field: { value, onChange },
  } = useController({ control, name, defaultValue });

  const toggle = (val: string) => {
    if (value === val) onChange(null);
    else onChange(val);
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
