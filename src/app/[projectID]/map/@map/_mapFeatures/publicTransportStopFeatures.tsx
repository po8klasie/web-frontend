import React, { FC, SetStateAction } from 'react';
import PublicTransportRoute from '../../../../../components/PublicTransportRoute';
import Link from 'next/link';
import { MVTLayer } from '@deck.gl/geo-layers/typed';
import { useQuery } from '@tanstack/react-query';
import busStopMarker from '../../../../../assets/app/bus-stop-icon.png';
import { IPopupState } from '../types';
import { useProjectConfig } from "../../../../../api/projectConfig/projectConfigContext";
import { useEnvironment } from "../../../../../environment/environmentContext";

interface IRouteInstitutionInfo {
  name: string;
  rspo: string;
  distance: number;
}

interface IRouteInfo {
  routeFrom: string;
  routeTo: string;
  ref: string;
  name: string;
  type: string;
}

interface IPublicTransportStopProperties {
  osmid: string;
  name: string;
  routes: IRouteInfo[];
  institutions: IRouteInstitutionInfo[];
}

export interface PopupDataProps {
  data: IPublicTransportStopProperties;
  getSchoolPath: (rspo: string) => string;
}

const PopupData: FC<PopupDataProps> = ({ data: { routes, institutions }, getSchoolPath }) => (
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

export interface PublicTransportPopupProps {
  stopProperties: IPublicTransportStopProperties;
  getSchoolPath: (rspo: string) => string;
}

const Popup: FC<PublicTransportPopupProps> = ({
  stopProperties: { osmid, name },
  getSchoolPath,
}) => {
  const { data, status } = useQuery<IPublicTransportStopProperties>([
    `/search/map_features/public_transport_stops/stop_popup_info/${osmid}`,
  ]);
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
  setPopupState: React.Dispatch<SetStateAction<IPopupState | null>>,
) => {
  const { projectId } = useProjectConfig();
  const {publicEnvironment: {API_URL}} = useEnvironment()
  return new MVTLayer({
    id: 'publicTransportStops',
    data: `${API_URL}/search/map_features/public_transport_stops/tiles/{z}/{x}/{y}/?project_id=${projectId}` as string,
    pointType: 'icon',
    pickable: true,
    getIcon: () => ({
      url: busStopMarker.src,
      width: 15,
      height: 15,
      anchorY: 15,
    }),
    onClick: (info) => {
      if (!info.coordinate) return;

      setPopupState({
        children: (
          <Popup stopProperties={info.object.properties} getSchoolPath={() => 'abc'} />
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