import type { FC } from 'react';

import styles from './_styles/PublicTransportSection.module.css';
import { IoMdBus } from '@react-icons/all-files/io/IoMdBus';
import { MdTrain } from '@react-icons/all-files/md/MdTrain';
import { MdTram } from '@react-icons/all-files/md/MdTram';
import { MdSubway } from '@react-icons/all-files/md/MdSubway';
import { IPublicTransportRoute, IPublicTransportStop } from '../../../../../../types';
import { DataPresentGuard, SectionHeading } from '../reusableUI';
import { fetchInstitutionDetails } from "../../../../../../api/institutionDetails/institutionDetails";
import SchoolInfoSection from "../SchoolInfoSection";

const routeIconClassName = 'mr-2 opacity-70';

interface RouteTypeIconProps {
  type: string;
}

const RouteTypeIcon: FC<RouteTypeIconProps> = ({ type }) => {
  switch (type) {
    case 'bus':
    case 'trolleybus':
      return <IoMdBus className={routeIconClassName} />;
    case 'train':
      return <MdTrain className={routeIconClassName} />;
    case 'tram':
      return <MdTram className={routeIconClassName} />;
    case 'subway':
      return <MdSubway className={routeIconClassName} />;
    default:
      return null;
  }
};

interface PublicTransportRouteProps {
  route: IPublicTransportRoute;
}

const PublicTransportRoute: FC<PublicTransportRouteProps> = ({ route }) => (
  <div className={styles.routeWrapper}>
    <span className={styles.routeName}>
      <RouteTypeIcon type={route.type} />
      <span>{route.ref ?? route.name}</span>
    </span>
    <div className={styles.routeTooltip}>
      <table>
        <tr>
          <td>z: </td>
          <td>{route.routeFrom}</td>
        </tr>
        <tr>
          <td className="pr-2">do: </td>
          <td>{route.routeTo}</td>
        </tr>
      </table>
      <small className="mt-2 text-opacity-10">{route.operator}</small>
    </div>
  </div>
);

interface PublicTransportStopProps {
  stop: IPublicTransportStop;
  distance: number;
}

const PublicTransportStop: FC<PublicTransportStopProps> = ({ stop, distance }) => (
  <>
    <div className="mt-2 flex items-center">
      <span className="font-semibold font-primary text-gray-800 whitespace-nowrap">
        {stop.name} <small>({distance.toFixed(0)}m)</small>
      </span>
    </div>
    <div className="flex flex-wrap w-full">
      <DataPresentGuard
        data={stop.publicTransportRoutes}
        render={(data) => (
          <>
            {data.map((route) => (
              <PublicTransportRoute route={route} />
            ))}
          </>
        )}
      />
    </div>
  </>
);

const PublicTransportSection = async ({ params: {rspo} }) => {
  const institutionDetails = await fetchInstitutionDetails(rspo)

  return (
    <SchoolInfoSection id="publicTransport" overwriteFooter="Źródło: Open Street Map" updateTime="">
      <div className="p-3">
        <SectionHeading title="Dojazd komunikacją miejską" />
        <div className="mt-4">
          <DataPresentGuard
            data={institutionDetails.publicTransportStops}
            render={(data) => (
              <>
                {data.map(({ publicTransportStop, distance }) => (
                  <PublicTransportStop
                    stop={publicTransportStop}
                    distance={distance}
                    key={publicTransportStop.name}
                  />
                ))}
              </>
            )}
          />
        </div>
      </div>
    </SchoolInfoSection>
  );
};

export default PublicTransportSection;
