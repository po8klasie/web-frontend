import useDebouncedValue from '../../../../hooks/useDebouncedValue';
import { useAppSelector } from '../../../../store/hooks';

const DEBOUNCE_TIME = 300;

const useDebouncedBbox = () => {
  const bbox = useAppSelector((state) => state.mapSearchPageData.currentMapPosition?.bbox);
  const [debouncedBbox] = useDebouncedValue(bbox, DEBOUNCE_TIME);
  if (!bbox) return null;

  return debouncedBbox;
};

export default useDebouncedBbox;
