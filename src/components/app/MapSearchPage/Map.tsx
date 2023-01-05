import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import L, { Map as LeafletMap } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { useProjectConfig } from '../../../config/projectConfigContext';
import { SearchViewConfig } from '../../../config/types';
import { tileLayerProps } from '../../../utils/map';
import MapFeatures from './MapFeatures';
import { ClipLoader } from 'react-spinners';
import useDebouncedValue from '../../../hooks/useDebouncedValue';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  markMapAsInitiated,
  setCurrentMapPosition,
  setDesiredMapPosition,
  setMapData
} from "../../../store/slices/mapSearchPageDataSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import useDebouncedBbox from "./hooks/useDebouncedBbox";
import usePrevious from "../../../hooks/usePrevious";
import { stringify } from "query-string";
import { stringifyQueryString } from "../../../utils/searchSerializer";
import useURLSerializer, { useFiltersObjectWithoutDefaults } from "./hooks/useURLSerializer";

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
  const dispatch = useAppDispatch()
  const { projectID } = useProjectConfig()
  const { searchView: searchViewConfig } = useProjectConfig();
  const { mapOptions } = searchViewConfig as SearchViewConfig;
  const debouncedBbox = useDebouncedBbox()
  const [map, setMap] = useState<LeafletMap | null>(null);
  const desiredMapPosition = useAppSelector(state => state.mapSearchPageData.desiredMapPosition)
  const visibleLayersIds = useAppSelector(state => state.mapSearchPageData.visibleLayersIds)
  const query = useAppSelector(state => state.mapSearchPageData.query)

  const handleMapUpdate = useCallback(() => {
   if (map) {
     dispatch(setCurrentMapPosition({
         bbox: map.getBounds().toBBoxString().trim(),
         zoom: map.getZoom(),
         center: [map.getCenter().lat, map.getCenter().lng],
       })
     )
   }
  }, [map]);

  useEffect(() => {
    if(map && desiredMapPosition) {
      map.setView(desiredMapPosition.center, desiredMapPosition.zoom);
      dispatch(setDesiredMapPosition(null));
    }
  }, [map, desiredMapPosition])



  const filtersObjectWithoutDefaults = useFiltersObjectWithoutDefaults()
  const qs = useMemo(() => stringifyQueryString({
    ...filtersObjectWithoutDefaults,
    bbox: debouncedBbox,
    query,
    project_id: projectID,
    layers_ids: visibleLayersIds
  }), [filtersObjectWithoutDefaults, debouncedBbox, query, projectID, visibleLayersIds])

  const { data: mapFeatures, isLoading } = useQuery<any>(
    [`/search/map_features?${qs}`],
  );

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

  const [debouncedIsLoading] = useDebouncedValue(isLoading, 300);

  return (
    <div className="w-full h-full relative">
      {isLoading && <LoadingOverlay />}
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
