import { useMap } from 'react-leaflet';
import { FC, useEffect, useRef } from 'react';
import L, { LatLng, Layer } from 'leaflet';
import { Feature, GeoJsonObject, Point } from 'geojson';
import busStopMarker from '../../../../assets/app/bus-stop-icon.png';
import busStopClusterMarker from '../../../../assets/app/bus-stop-cluster-icon.png';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import styles from './styles/PublicTransportStopFeatures.module.css';
import commonStyles from './styles/common.module.css';
import PublicTransportRoute from '../../PublicTransportRoute';
import { renderToString } from 'react-dom/server';
import useLinks from '../../../../hooks/useLinks';
import Link from 'next/link';

interface RouteInstitutionInfo {
  name: string
  rspo: string
  distance: number
}

interface RouteInfo {
  routeFrom: string
  routeTo: string
  ref: string
  name: string
  type: string
}

interface PublicTransportStopProperties {
  name: string
  routes: RouteInfo[]
  institutions: RouteInstitutionInfo[]
}

interface PopupProps {
  stopProperties: PublicTransportStopProperties
  getSchoolPath: (rspo: string) => string
}

const Popup: FC<PopupProps> = ({ stopProperties: { name, routes, institutions }, getSchoolPath }) => (
  <div className="">
    <span className="font-bold">{name}</span>
    <div className="flex flex-wrap text-xs">
      {routes.map((route) => (
        <PublicTransportRoute key={route.name} route={route} />
      ))}
    </div>
    <span className="block font-semibold mt-2 mb-1">Szkoły w pobliżu:</span>
    <div className="list-disc list-inside">
      {institutions.map((institution) => (
        <li className="my-0.5">
          <Link href={getSchoolPath(institution.rspo)}>
            <a>
              {institution.name}
              <span className="ml-1 text-xs">({institution.distance.toFixed(2)}m)</span>
            </a>
          </Link>
        </li>
      ))}
    </div>
  </div>
);

const busStopIcon = L.icon({
  iconUrl: busStopMarker,
  iconSize: [25, 25],
});

const createPointToLayer = (getSchoolPath: (rspo: string) => string) => (
  geoJsonPoint: Feature<Point, PublicTransportStopProperties>,
  latLng: LatLng,
): Layer => {
  return L.marker(latLng, {
    icon: busStopIcon,
  }).bindPopup(
    renderToString(
      <Popup getSchoolPath={getSchoolPath} stopProperties={geoJsonPoint.properties} />,
    ),
    { className: commonStyles.popup },
  );
};

const iconCreateFunction = (cluster: L.MarkerCluster) => {
  return L.divIcon({
    className: styles.clusterIcon,
    iconSize: [25, 25],
    html: `
              <div class="${styles.clusterIconInnerWrapper}">
                <span>${cluster.getChildCount()}</span>
                <img src="${busStopClusterMarker}" alt="" />
              </div>
            `,
  });
};

const markerClusterGroupOptions: L.MarkerClusterGroupOptions = {
  showCoverageOnHover: false,
  iconCreateFunction,
};

interface PublicTransportStopFeaturesProps {
  data?: GeoJsonObject;
}

const PublicTransportStopFeatures: FC<PublicTransportStopFeaturesProps> = ({ data }) => {
  const map = useMap();
  const geoJSONRef = useRef<L.GeoJSON>();
  const clusterGroupRef = useRef<L.MarkerClusterGroup>(
    L.markerClusterGroup(markerClusterGroupOptions),
  );
  const links = useLinks();

  useEffect(() => {
    if (geoJSONRef.current) {
      clusterGroupRef.current.removeLayer(geoJSONRef.current);
    }
    if (data) {
      const geoJSON = new L.GeoJSON(data, {
        pointToLayer: createPointToLayer(links.getSchoolPath),
      });
      clusterGroupRef.current.addLayer(geoJSON);
      map.addLayer(clusterGroupRef.current);
      geoJSONRef.current = geoJSON;
    }
  }, [data, map]);

  return null;
};

export default PublicTransportStopFeatures;
