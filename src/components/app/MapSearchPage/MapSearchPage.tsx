import MapWrapper from '../../../components/app/MapSearchPage/MapWrapper';
import Filters from '../../../components/app/MapSearchPage/Filters';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect} from 'react';
import styles from './styles/MapPage.module.css';
import InstitutionListing from './InstitutionListing';
import useURLSerializer from "./hooks/useURLSerializer";
import useURLParser from "./hooks/useURLParser";

const updateURL = (serializedClientQueryString: string, serializedMapPosition: string) => {
  const qs = serializedClientQueryString ? `?${serializedClientQueryString}` : ''
  const hash = serializedMapPosition ? `#${serializedMapPosition}` : ''
  if(!qs && !hash) return;

  window.history.replaceState(
    null,
    '',
    [
      window.location.pathname,
      qs,
      hash
    ].join('')
  );
}

const MapSearchPage = () => {
  const formMethods = useForm();
  useURLParser()
  const { serializedAPIQueryString, serializedClientQueryString, serializedMapPosition } = useURLSerializer()

  useEffect(() => {
    updateURL(serializedClientQueryString, serializedMapPosition)
  }, [serializedClientQueryString, serializedMapPosition]);

  return (
    <FormProvider {...formMethods}>
      <div className="flex flex-col md:grid md:grid-cols-12 h-full pt-2">
        <div className={styles.filtersPane}>
          <Filters />
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
    </FormProvider>
  );
};
export default MapSearchPage;
