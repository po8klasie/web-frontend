'use client'

import React, { FC, useCallback, useRef, useState } from 'react';
import { LngLatBounds, Map as MapGL, MapRef, Popup } from 'react-map-gl';
import MapFeatures from './MapFeatures';
import { debounce } from 'lodash';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './styles/Map.module.css';
import { useAppDispatch } from "../../../../../store/hooks";
import { useProjectConfig } from "../../../../../api/projectConfig/projectConfigContext";
import { setCurrentMapPosition } from "../../../../../store/slices/mapSearchPageDataSlice";
import { IPopupState } from "../types";
import { useEnvironment } from "../../../../../environment/environmentContext";

const mapBoundsToBboxString = (bounds: LngLatBounds) => bounds.toArray().flat().join(',');

/* Warning! This is client-side only component. It needs to be imported using dynamic() */
const Map: FC = () => {
  const dispatch = useAppDispatch();
  const { searchViewConfig } = useProjectConfig();
  const {publicEnvironment: {MAPBOX_ACCESS_TOKEN}} = useEnvironment()
  const { defaultMapView } = searchViewConfig;
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

  const [popupState, setPopupState] = useState<IPopupState | null>(null);

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full rounded-t relative">
        <MapGL
          initialViewState={defaultMapView}
          ref={mapRef}
          onMove={debounce(handleViewStateChange, 300)}
          onLoad={handleMapLoad}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        >
          <MapFeatures setPopupState={setPopupState} />
          {popupState && (
            <Popup className={styles.popup} {...popupState} onClose={() => setPopupState(null)} />
          )}
        </MapGL>
      </div>
    </div>
  );
};

export default Map;
