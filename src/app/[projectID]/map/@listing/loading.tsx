import { nanoid } from 'nanoid';
import { SchoolCardPlaceholder } from '../../../../components/SchoolCard';

const InstitutionsListingLoadingUI = () =>
  new Array(3).fill(0).map(() => (
    <div className="p-1" key={nanoid()}>
      <SchoolCardPlaceholder />
    </div>
  ));

export default InstitutionsListingLoadingUI;
