import React, { FC, useEffect, useMemo, useState } from 'react';
import { Map as LeafletMap, latLngBounds } from 'leaflet';
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { BsChevronRight } from '@react-icons/all-files/bs/BsChevronRight';
// import { marker } from '../SearchPage/../../utils/mapMarkers';
import styles from '../SearchPage/styles/SchoolsMap.module.css';
import 'leaflet/dist/leaflet.css';
import { useProjectConfig } from '../../../config/projectConfigContext';
import { SearchViewConfig } from '../../../config/types';
import { ISchoolSearchData } from '../../../types';
import { parseCoords, tileLayerProps } from '../../../utils/map';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import MapFeatures from './MapFeatures';
import useDebouncedValue from '../../../hooks/useDebouncedValue';
import usePrevious from '../../../hooks/usePrevious';

interface SchoolsMapProps {
  results: ISchoolSearchData[];
  onExpandToggle: () => void;
  isExpanded: boolean;
  hideExpandBtn: boolean;
}

/* Warning! This is client-side only component. It needs to be imported using dynamic() */
const SearchPageMap: FC<SchoolsMapProps> = ({
  results,
  onExpandToggle,
  isExpanded,
  hideExpandBtn,
}) => {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const [bboxString, setBboxString] = useState('');
  const { searchView: searchViewConfig } = useProjectConfig();
  const { register, watch } = useFormContext();
  const { mapOptions } = searchViewConfig as SearchViewConfig;

  const debouncedBboxString = useDebouncedValue(bboxString, 300);
  const prevDebouncedBboxString = usePrevious(debouncedBboxString);
  const queryClient = useQueryClient();
  const { data } = useQuery<any>([`/search/map_features?bbox=${debouncedBboxString}`], {
    enabled: !!debouncedBboxString,
    placeholderData: () => {
      return queryClient.getQueryData([`/search/map_features?bbox=${prevDebouncedBboxString}`]);
    },
  });

  const updateBbox = () => {
    setBboxString(map.getBounds().toBBoxString().trim());
  };

  useEffect(() => {
    if (map) {
      map.on('moveend', updateBbox);
      updateBbox();
      return () => map.off('moveend', updateBbox);
    }
    return () => {
      /* noop */
    };
  }, [map]);

  return (
    <div className="w-full h-full">
      <MapContainer
        className="w-full h-full rounded-t-lg"
        zoomControl={false}
        whenCreated={setMap}
        fullscreenControl
        {...mapOptions}
      >
        <TileLayer {...tileLayerProps} />
        <MapFeatures data={data} />
      </MapContainer>
    </div>
  );
};

export default SearchPageMap;
