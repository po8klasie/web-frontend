import { useMap } from 'react-leaflet';
import { FC, useEffect, useRef } from 'react';
import L, { GeoJSONOptions, LatLng, Layer } from 'leaflet';
import { Feature, GeoJsonObject, Point } from 'geojson';
import roadAccidentMarker from '../../../../assets/app/road-accident-icon.png';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import styles from './styles/RoadAccidentsFeatures.module.css';

const roadAccidentIcon = L.icon({
  iconUrl: roadAccidentMarker,
  iconSize: [30, 30],
});

const pointToLayer = (geoJsonPoint: Feature<Point, any>, latLng: LatLng): Layer => {
  return L.marker(latLng, {
    icon: roadAccidentIcon,
  });
};

const iconCreateFunction = (cluster: L.MarkerCluster) => {
  return L.divIcon({
    className: styles.clusterIcon,
    iconSize: [30, 30],
    html: `
              <div class="${styles.clusterIconInnerWrapper}">
                <span>${cluster.getChildCount()}</span>
                <img src="${roadAccidentMarker}" alt="" />
              </div>
            `,
  });
};

const geoJsonOptions: GeoJSONOptions = {
  pointToLayer,
};

const markerClusterGroupOptions: L.MarkerClusterGroupOptions = {
  showCoverageOnHover: false,
  iconCreateFunction,
};

interface RoadAccidentFeaturesProps {
  data?: GeoJsonObject;
}

const RoadAccidentFeatures: FC<RoadAccidentFeaturesProps> = ({ data }) => {
  const map = useMap();
  const clusterGroupRef = useRef<null | L.MarkerClusterGroup>(null);

  useEffect(() => {
    if (data) {
      const geoJson = new L.GeoJSON(data, geoJsonOptions);

      clusterGroupRef.current = L.markerClusterGroup(markerClusterGroupOptions);

      clusterGroupRef.current.addLayer(geoJson);

      map.addLayer(clusterGroupRef.current);
    }

    return () => {
      if (clusterGroupRef.current) map.removeLayer(clusterGroupRef.current);
    };
  }, [data, map]);

  return null;
};

export default RoadAccidentFeatures;
