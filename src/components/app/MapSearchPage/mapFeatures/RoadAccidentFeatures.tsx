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

const pointToLayer = (geoJsonPoint: Feature<Point, { sewikId: string }>, latLng: LatLng): Layer => {
  return L.marker(latLng, {
    icon: roadAccidentIcon,
  }).bindPopup(`
    <a 
      target="_blank"
      href="http://sewik.pl/accident/${geoJsonPoint.properties.sewikId}">
      Zobacz zdarzenie w bazie SEWIK
    </a>
  `);
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
  const geoJSONRef = useRef<L.GeoJSON>();
  const clusterGroupRef = useRef<L.MarkerClusterGroup>(
    L.markerClusterGroup(markerClusterGroupOptions),
  );

  useEffect(() => {
    if (geoJSONRef.current) {
      clusterGroupRef.current.removeLayer(geoJSONRef.current);
    }
    if (data) {
      const geoJSON = new L.GeoJSON(data, geoJsonOptions);
      clusterGroupRef.current.addLayer(geoJSON);
      map.addLayer(clusterGroupRef.current);
      geoJSONRef.current = geoJSON;
    }
  }, [data, map]);

  return null;
};

export default RoadAccidentFeatures;
