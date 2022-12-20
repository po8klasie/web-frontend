import { FC, MouseEventHandler } from 'react';
import { FilterProps } from './types';
import WarsawDistrictsMap from '../../../../assets/app/svg/WarsawDistrictsMap';
import styles from './styles/WarsawDistrictsFilter.module.css';
import CollapsibleFilterWrapper from './CollapsibleFilterWrapper';

const WarsawDistrictsFilter: FC<FilterProps<string[]>> = ({ name }) => {
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
