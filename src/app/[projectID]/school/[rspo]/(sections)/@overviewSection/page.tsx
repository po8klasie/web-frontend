import { MdHome } from '@react-icons/all-files/md/MdHome';
import { MdLink } from '@react-icons/all-files/md/MdLink';
import { MdPhone } from '@react-icons/all-files/md/MdPhone';
import { MdEmail } from '@react-icons/all-files/md/MdEmail';
import type { IconType } from 'react-icons';
import { fetchInstitutionDetails } from '../../../../../../api/institutionDetails/institutionDetails';
import { FC } from 'react';
import { LatLngTuple } from 'leaflet';
import { parseCoords } from '../../../../../../utils/map';
import SchoolDescription from './SchoolDescription';
import dynamic from 'next/dynamic';
import { SchoolPageT } from '../../../../../../types';
import SchoolInfoSection from '../SchoolInfoSection';
import { SectionHeading } from '../reusableUI';
import { SchoolLocationMapProps } from './SchoolLocationMap';

const SchoolLocationMap = dynamic(() => import('./SchoolLocationMap'), {
  ssr: false,
}) as FC<SchoolLocationMapProps>;

const linkClassName = 'hover:underline';

interface ItemWithIconProps {
  icon: IconType;
}

const ItemWithIcon: FC<ItemWithIconProps> = ({ children, icon: Icon }) => (
  <span className="flex items-center">
    <span className="bg-primaryBg rounded-full p-1 text-lg">
      <Icon />
    </span>
    <span className="ml-3">{children}</span>
  </span>
);

const OverviewSection: SchoolPageT = async ({ params: { rspo } }) => {
  const institutionDetails = await fetchInstitutionDetails(rspo);
  const position: LatLngTuple = parseCoords(institutionDetails);

  return (
    <SchoolInfoSection id="overview" overwriteFooter="" updateTime="">
      <div className="py-3 px-5">
        <div className="grid lg:grid-cols-6">
          <div className="col-span-3 xl:col-span-2">
            <SectionHeading title="Podstawowe informacje" />
            <ul className="mt-2 text-gray">
              <li className="my-2">
                <ItemWithIcon icon={MdHome}>
                  {institutionDetails.street} {institutionDetails.buildingNumber},{' '}
                  {institutionDetails.postalCode} {institutionDetails.city}
                </ItemWithIcon>
              </li>
              <li className="my-2">
                <a
                  href={institutionDetails.website}
                  rel="noreferrer noopener"
                  target="_blank"
                  className={linkClassName}
                >
                  <ItemWithIcon icon={MdLink}>{institutionDetails.website}</ItemWithIcon>
                </a>
              </li>
              <li className="my-2">
                <a
                  href={`tel:${institutionDetails.phone}`}
                  rel="noreferrer noopener"
                  target="_blank"
                  className={linkClassName}
                >
                  <ItemWithIcon icon={MdPhone}>{institutionDetails.phone}</ItemWithIcon>
                </a>
              </li>
              <li className="my-2">
                <a
                  href={`mailto:${institutionDetails.email}`}
                  rel="noreferrer noopener"
                  target="_blank"
                  className={linkClassName}
                >
                  <ItemWithIcon icon={MdEmail}>{institutionDetails.email}</ItemWithIcon>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-3 xl:col-span-4 h-72 xl:mt-0 mt-2">
            <SchoolLocationMap position={position} />
          </div>
        </div>
      </div>
      {institutionDetails.description && institutionDetails.description.trim().length > 0 && (
        <SchoolDescription description={institutionDetails.description.trim()} />
      )}
    </SchoolInfoSection>
  );
};

export default OverviewSection;
