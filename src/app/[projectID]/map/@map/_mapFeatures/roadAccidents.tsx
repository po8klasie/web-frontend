import roadAccidentMarker from '../../../../../assets/app/road-accident-icon.png';
import { MVTLayer } from '@deck.gl/geo-layers/typed';
import React, { SetStateAction } from 'react';
import { IPopupState } from '../types';
import { useEnvironment } from '../../../../../environment/environmentContext';

interface RoadAccidentProperties {
  sewikid: string;
}

const createPopupContent = ({ properties }: { properties: RoadAccidentProperties }) => (
  <a
    target="_blank"
    className="hover:underline"
    href={`http://sewik.pl/accident/${properties.sewikid}`}
  >
    Zobacz zdarzenie w bazie SEWIK
  </a>
);

const useRoadAccidentsFeaturesLayer = (
  setPopupState: React.Dispatch<SetStateAction<IPopupState | null>>,
) => {
  const {
    publicEnvironment: { API_URL },
  } = useEnvironment();
  return new MVTLayer({
    id: 'roadAccidents',
    data: `${API_URL}/search/map_features/road_accidents/tiles/{z}/{x}/{y}` as string,
    pointType: 'icon',
    pickable: true,
    getIcon: () => ({
      url: roadAccidentMarker.src,
      width: 30,
      height: 30,
      anchorY: 30,
    }),
    onClick: (info) => {
      setPopupState({
        children: createPopupContent(info.object),
        latitude: info.coordinate[1],
        longitude: info.coordinate[0],
      });
    },
    sizeScale: 1,
    iconSizeMinPixels: 20,
    iconAlphaCutoff: 0.1,
  });
};

export default useRoadAccidentsFeaturesLayer;
