import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';
import { PopupProps, useControl } from 'react-map-gl';
import React, { FC, SetStateAction, useMemo } from 'react';
import useInstitutionFeaturesLayer from './mapFeatures/institutionFeatures';
import useRoadAccidentsFeaturesLayer from './mapFeatures/roadAccidents';
import { useAppSelector } from '../../../store/hooks';
import usePublicTransportStopFeaturesLayer from './mapFeatures/publicTransportStopFeatures';

function DeckGLOverlay(
  props: MapboxOverlayProps & {
    interleaved?: boolean;
  },
) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

interface MapFeaturesProps {
  setPopupState: React.Dispatch<SetStateAction<PopupProps | null>>;
}

const MapFeatures: FC<MapFeaturesProps> = ({ setPopupState }) => {
  const visibleLayerIds = useAppSelector((state) => state.mapSearchPageData.visibleLayersIds);

  const institutionsFeaturesLayer = useInstitutionFeaturesLayer();
  const roadAccidentsFeaturesLayer = useRoadAccidentsFeaturesLayer(setPopupState);
  const publicTransportStopFeaturesLayer = usePublicTransportStopFeaturesLayer(setPopupState);

  const requiredLayers = [institutionsFeaturesLayer];
  const nonRequiredLayers = [roadAccidentsFeaturesLayer, publicTransportStopFeaturesLayer];

  const layers = [
    ...nonRequiredLayers.filter((layer) => visibleLayerIds.includes(layer.id)),
    ...requiredLayers,
  ];

  return <DeckGLOverlay layers={layers} />;
};

export default MapFeatures;
