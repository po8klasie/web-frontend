import { FC, MouseEventHandler } from 'react';
import { FilterProps } from './types';
import { useController } from 'react-hook-form';
import WarsawDistrictsMap from '../../../../assets/app/svg/WarsawDistrictsMap';
import styles from './styles/WarsawDistrictsFilter.module.css';
import CollapsibleFilterWrapper from './CollapsibleFilterWrapper';

const WarsawDistrictsFilter: FC<FilterProps> = ({ control }) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name: 'district',
  });

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
