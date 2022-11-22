import { FC, MouseEventHandler } from 'react';
import { FilterProps } from './types';
import { useController } from 'react-hook-form';
import WarsawDistrictsMap from '../../../../assets/app/svg/WarsawDistrictsMap';
import styles from './styles/WarsawDistrictsFilter.module.css';
import CollapsibleFilterWrapper from './CollapsibleFilterWrapper';
interface InstitutionTypeCardProps {
  name: string;
  icon: string;
  onClick: MouseEventHandler;
}

const InstitutionTypeCard: FC<InstitutionTypeCardProps> = ({ name, icon, onClick }) => (
  <button
    className="my-2 border border-gray-500 px-2 py-2 rounded-xl text-center"
    onClick={onClick}
  >
    <span className="text-2xl block">{icon}</span>
    <span className="block mt-2 text-sm ">{name}</span>
  </button>
);

const WarsawDistrictsFilter: FC<FilterProps> = ({ control }) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name: 'district',
  });

  const toggle = (val: boolean) => {
    if (value === val) onChange(null);
    else onChange(val);
  };

  return (
    <CollapsibleFilterWrapper title="Dzielnica">
      <div>
        <div className="h-72">
          <WarsawDistrictsMap className={styles.districtsMap} />
        </div>
      </div>
    </CollapsibleFilterWrapper>
  );
};

export default WarsawDistrictsFilter;
