import React, { FC, useCallback, useRef, useState } from 'react';
import { LngLatBounds, Map as MapGL, MapRef, Popup, PopupProps } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import 'leaflet/dist/leaflet.css';
import { useProjectConfig } from '../../../config/projectConfigContext';
import { SearchViewConfig } from '../../../config/types';
import MapFeatures from './MapFeatures';
import { setCurrentMapPosition } from '../../../store/slices/mapSearchPageDataSlice';
import { useAppDispatch } from '../../../store/hooks';
import { publicRuntimeConfig } from '../../../runtimeConfig';
import { debounce } from 'lodash';

const { MAPBOX_ACCESS_TOKEN } = publicRuntimeConfig;

const mapBoundsToBboxString = (bounds: LngLatBounds) => bounds.toArray().flat().join(',');

/* Warning! This is client-side only component. It needs to be imported using dynamic() */
const Map: FC = () => {
  const dispatch = useAppDispatch();
  const { searchView: searchViewConfig } = useProjectConfig();
  const { mapOptions } = searchViewConfig as SearchViewConfig;
  const mapRef = useRef<MapRef>(null);

  const handleMapLoad = useCallback(
    ({ target: map }) => {
      const center = map.getCenter();
      dispatch(
        setCurrentMapPosition({
          bbox: mapBoundsToBboxString(map.getBounds()),
          zoom: map.getZoom(),
          center: [center.lat, center.lng],
        }),
      );
    },
    [dispatch],
  );
  const handleViewStateChange = useCallback(
    ({ viewState, target: map }) => {
      dispatch(
        setCurrentMapPosition({
          bbox: mapBoundsToBboxString(map.getBounds()),
          zoom: viewState.zoom,
          center: [viewState.latitude, viewState.longitude],
        }),
      );
    },
    [dispatch],
  );

  const [popupState, setPopupState] = useState<PopupProps | null>(null);

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full rounded-t relative">
        <MapGL
          initialViewState={mapOptions}
          ref={mapRef}
          onMove={debounce(handleViewStateChange, 300)}
          onLoad={handleMapLoad}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        >
          {popupState && <Popup {...popupState} />}
          <MapFeatures setPopupState={setPopupState} />
        </MapGL>
      </div>
    </div>
  );
};

export default Map;
