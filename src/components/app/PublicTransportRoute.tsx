import { FC } from 'react';
import { IoMdBus } from '@react-icons/all-files/io/IoMdBus';
import { MdTrain } from '@react-icons/all-files/md/MdTrain';
import { MdTram } from '@react-icons/all-files/md/MdTram';
import { MdSubway } from '@react-icons/all-files/md/MdSubway';
import { IPublicTransportRoute } from '../../types';
import styles from './styles/PublicTransportRoute.module.css';

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

export default PublicTransportRoute;
