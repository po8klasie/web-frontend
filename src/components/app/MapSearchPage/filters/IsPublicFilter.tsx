import { FC } from 'react';
import { FilterProps } from './types';
import { useController } from 'react-hook-form';

const baseClassName = 'w-1/2 flex items-center justify-center py-1';
const activeClassName = 'bg-gray text-white';

const IsPublicFilter: FC<FilterProps> = ({ control }) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name: 'is_public',
  });

  const toggle = (val: boolean) => {
    if (value === val) onChange(null);
    else onChange(val);
  };

  return (
    <div className="border rounded-xl border-light flex mb-4">
      <button
        onClick={() => toggle(true)}
        className={[baseClassName, 'rounded-l-xl', value === true ? activeClassName : ''].join(' ')}
      >
        Publiczna
      </button>
      <button
        onClick={() => toggle(false)}
        className={[baseClassName, 'rounded-r-xl', value === false ? activeClassName : ''].join(
          ' ',
        )}
      >
        Niepubliczna
      </button>
    </div>
  );
};

export default IsPublicFilter;
