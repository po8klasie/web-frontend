import MapWrapper from '../../../components/app/MapSearchPage/MapWrapper';
import Filters from '../../../components/app/MapSearchPage/Filters';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import styles from './styles/MapPage.module.css';
import InstitutionListing from './InstitutionListing';
import useURLSerializer from './hooks/useURLSerializer';
import useURLParser from './hooks/useURLParser';
import { FiFilter } from '@react-icons/all-files/fi/FiFilter';
import { FiX } from '@react-icons/all-files/fi/FiX';

const updateURL = (serializedClientQueryString: string, serializedMapPosition: string) => {
  const qs = serializedClientQueryString ? `?${serializedClientQueryString}` : '';
  const hash = serializedMapPosition ? `#${serializedMapPosition}` : '';
  if (!qs && !hash) return;

  window.history.replaceState(null, '', [window.location.pathname, qs, hash].join(''));
};

const MapSearchPage = () => {
  const formMethods = useForm();
  useURLParser();
  const {
    serializedAPIQueryString,
    serializedClientQueryString,
    serializedMapPosition,
  } = useURLSerializer();
  const [isFiltersPaneOpened, setIsFiltersPaneOpened] = useState(false);

  useEffect(() => {
    updateURL(serializedClientQueryString, serializedMapPosition);
  }, [serializedClientQueryString, serializedMapPosition]);

  return (
    <FormProvider {...formMethods}>
      <div className="flex flex-col md:grid md:grid-cols-12 h-full pt-2">
        <div className={isFiltersPaneOpened ? styles.filtersPageOpened : styles.filtersPane}>
          <div className={styles.filtersInnerWrapper}>
            <Filters />
          </div>
        </div>
        <div className={styles.mapPane}>
          <MapWrapper />
        </div>
        <div className={styles.institutionsPaneExpanded}>
          <div className="px-2">
            <InstitutionListing serializedAPIQueryString={serializedAPIQueryString} />
          </div>
        </div>
      </div>
      <button className={styles.filtersFab} onClick={() => setIsFiltersPaneOpened(true)}>
        <FiFilter />
      </button>
      <button
        className={
          isFiltersPaneOpened ? styles.closeFiltersButtonActive : styles.closeFiltersButton
        }
        onClick={() => setIsFiltersPaneOpened(false)}
      >
        <FiX className="mr-1 text-gray-500" />
        Zamknij filtry
      </button>
    </FormProvider>
  );
};
export default MapSearchPage;
