import { LatLngTuple } from 'leaflet';
import { TileLayerProps } from 'react-leaflet';
import { useEnvironment } from '../environment/environmentContext';

export const parseCoords = (school: {
  latitude: string | number;
  longitude: string | number;
}): LatLngTuple => [parseFloat(`${school.latitude}`), parseFloat(`${school.longitude}`)];

export const getMapBoxTileLayerProps = (accessToken: string) => ({
  url: `https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
  tileSize: 512,
  zoomOffset: -1,
});

export const osmTileLayerProps: TileLayerProps = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
};

export const useLeafletTileLayerProps = () => {
  const {
    publicEnvironment: { MAPBOX_ACCESS_TOKEN },
  } = useEnvironment();
  return MAPBOX_ACCESS_TOKEN ? getMapBoxTileLayerProps(MAPBOX_ACCESS_TOKEN) : osmTileLayerProps;
};
