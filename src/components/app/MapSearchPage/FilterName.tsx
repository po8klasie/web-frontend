import { FC } from 'react';

interface FilterNameProps {
  name: string;
}

const FilterName: FC<FilterNameProps> = ({ name }) => (
  <h4 className="px-2 font-primary font-semibold text-lg text-dark hover:underline mb-2">{name}</h4>
);

export default FilterName;
