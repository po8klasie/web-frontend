import React, { FC, useCallback, useEffect, useState } from 'react';
import { Map as LeafletMap } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { useProjectConfig } from '../../../config/projectConfigContext';
import { SearchViewConfig } from '../../../config/types';
import { tileLayerProps } from '../../../utils/map';
import MapFeatures from './MapFeatures';
import useMapData from '../../../hooks/useMapData';

/* Warning! This is client-side only component. It needs to be imported using dynamic() */
const SearchPageMap: FC = () => {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const { onUpdateMap, mapFeatures } = useMapData();
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
        <MapFeatures data={mapFeatures} />
      </MapContainer>
    </div>
  );
};

export default SearchPageMap;
