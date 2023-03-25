import { FC } from 'react';
import { FilterProps } from './types';
import WarsawDistrictsMap from '../../../../assets/app/svg/WarsawDistrictsMap';
import styles from './styles/WarsawDistrictsFilter.module.css';
import CollapsibleFilterWrapper from './CollapsibleFilterWrapper';
import ComingSoonWrapper from '../../ComingSoonWrapper';

const WarsawDistrictsFilter: FC<FilterProps<string[]>> = () => {
  return (
    <CollapsibleFilterWrapper title="Dzielnica">
      <div>
        <ComingSoonWrapper>
          <div className="h-72">
            <WarsawDistrictsMap className={styles.districtsMap} />
          </div>
        </ComingSoonWrapper>
      </div>
    </CollapsibleFilterWrapper>
  );
};

export default WarsawDistrictsFilter;
