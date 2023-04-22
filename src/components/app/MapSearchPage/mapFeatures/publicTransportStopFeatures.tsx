import React, { FC, PropsWithChildren, SetStateAction } from 'react';
import PublicTransportRoute from '../../PublicTransportRoute';
import Link from 'next/link';
import useLinks from '../../../../hooks/useLinks';
import { MVTLayer } from '@deck.gl/geo-layers/typed';
import { useQuery } from '@tanstack/react-query';
import { publicRuntimeConfig } from '../../../../runtimeConfig';
import { useProjectConfig } from '../../../../config/projectConfigContext';
import busStopMarker from '../../../../assets/app/bus-stop-icon.png';

interface RouteInstitutionInfo {
  name: string;
  rspo: string;
  distance: number;
}

interface RouteInfo {
  routeFrom: string;
  routeTo: string;
  ref: string;
  name: string;
  type: string;
}

interface PublicTransportStopProperties {
  name: string;
  routes: RouteInfo[];
  institutions: RouteInstitutionInfo[];
}

const PopupData = ({ data: { routes, institutions }, getSchoolPath }) => (
  <div>
    <div className="flex flex-wrap text-xs">
      {routes && routes.map((route) => <PublicTransportRoute key={route.name} route={route} />)}
    </div>
    <span className="block font-semibold mt-2 mb-1">Szkoły w pobliżu:</span>
    <div className="list-disc list-inside">
      {institutions &&
        institutions.map((institution) => (
          <li className="my-0.5">
            <Link href={getSchoolPath(institution.rspo)}>

              {institution.name}
              <span className="ml-1 text-xs">({institution.distance.toFixed(2)}m)</span>

            </Link>
          </li>
        ))}
    </div>
  </div>
);

interface PopupProps {
  stopProperties: PublicTransportStopProperties;
  getSchoolPath: (rspo: string) => string;
}

const Popup: FC<PopupProps> = ({ stopProperties: { osmid, name }, getSchoolPath }) => {
  const { data, status } = useQuery([
    `/search/map_features/public_transport_stops/stop_popup_info/${osmid}`,
  ]);
  console.log(data);
  return (
    <div className="">
      <span className="font-bold">{name}</span>
      {status == 'success' && <PopupData data={data} getSchoolPath={getSchoolPath} />}
      {status == 'loading' && <span>Ładowanie...</span>}
      {status == 'error' && <span>Wystąpił błąd</span>}
    </div>
  );
};

const usePublicTransportStopsFeaturesLayer = (
  setPopupState: React.Dispatch<SetStateAction<PropsWithChildren<PopupProps> | null>>,
) => {
  const links = useLinks();
  const { projectId } = useProjectConfig();
  return new MVTLayer({
    id: 'publicTransportStops',
    data: `${publicRuntimeConfig.API_URL}/search/map_features/public_transport_stops/tiles/{z}/{x}/{y}/?project_id=${projectId}` as string,
    pointType: 'icon',
    pickable: true,
    getIcon: () => ({
      url: busStopMarker,
      width: 15,
      height: 15,
      anchorY: 15,
    }),
    onClick: (info) => {
      setPopupState({
        children: (
          <Popup stopProperties={info.object.properties} getSchoolPath={links.getSchoolPath} />
        ),
        latitude: info.coordinate[1],
        longitude: info.coordinate[0],
      });
    },
    sizeScale: 1,
    iconSizeMinPixels: 15,
  });
};

export default usePublicTransportStopsFeaturesLayer;
