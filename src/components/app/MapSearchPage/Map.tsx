import React, { FC, useCallback, useEffect, useState } from 'react';
import { Map as LeafletMap } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { useProjectConfig } from '../../../config/projectConfigContext';
import { SearchViewConfig } from '../../../config/types';
import { tileLayerProps } from '../../../utils/map';
import MapFeatures from './MapFeatures';
import useMapData from '../../../hooks/useMapData';
import { ClipLoader } from 'react-spinners';
import useDebouncedValue from '../../../hooks/useDebouncedValue';

const LoadingOverlay = () => {
  return (
    <div
      className="absolute w-full h-full bg-white bg-opacity-80 flex items-center justify-center"
      style={{ zIndex: 100000 }}
    >
      <ClipLoader size={50} color="#9D54BF" />
    </div>
  );
};

/* Warning! This is client-side only component. It needs to be imported using dynamic() */
const Map: FC = () => {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const { onUpdateMap, mapFeatures, isFetching } = useMapData();
  const { searchView: searchViewConfig } = useProjectConfig();
  const { mapOptions } = searchViewConfig as SearchViewConfig;

  const handleMapUpdate = useCallback(() => onUpdateMap(map), [map]);

  useEffect(() => {
    if (map) {
      map.on('moveend', handleMapUpdate);
      handleMapUpdate();
      return () => map.off('moveend', handleMapUpdate);
    }
    return () => {
      /* noop */
    };
  }, [map]);

  const debouncedIsFetching = useDebouncedValue(isFetching, 300);

  return (
    <div className="w-full h-full relative">
      {debouncedIsFetching && <LoadingOverlay />}
      <div className="w-full h-full">
        <MapContainer
          className="w-full h-full rounded-t-lg"
          zoomControl={false}
          whenCreated={setMap}
          fullscreenControl
          {...mapOptions}
        >
          <TileLayer {...tileLayerProps} />
          <MapFeatures data={mapFeatures} />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
