import { FC } from 'react';
import dynamic from 'next/dynamic';
import { MdHome } from '@react-icons/all-files/md/MdHome';
import { MdLink } from '@react-icons/all-files/md/MdLink';
import { MdEmail } from '@react-icons/all-files/md/MdEmail';
import { IconType } from 'react-icons';
import ReactMarkdown from 'react-markdown';
import { LatLngTuple } from 'leaflet';
import SchoolInfoSection from './SchoolInfoSection';
import { SectionComponentProps } from './types';
import { parseCoords } from '../../../../utils/map';
import { MdPhone } from '@react-icons/all-files/md/MdPhone';
import { SectionHeading } from './reusableUI';

const SchoolLocationMap = dynamic(() => import('../SchoolLocationMap'), { ssr: false });

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

const SchoolDescription = ({ description }) => {
  return (
    <div className="border-t border-light py-2 px-5">
      <h4 className="text-dark text-base font-semibold">O szkole</h4>
      <div className="my-2 mx-auto prose max-w-none">
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    </div>
  );
};

const OverviewSection: FC<SectionComponentProps> = ({ school }) => {
  const position: LatLngTuple = parseCoords(school);

  return (
    <SchoolInfoSection id="overview" overwriteFooter="" updateTime="">
      <div className="py-3 px-5">
        <div className="grid lg:grid-cols-6">
          <div className="col-span-3 xl:col-span-2">
            <SectionHeading title="Podstawowe informacje" />
            <ul className="mt-2 text-gray">
              <li className="my-2">
                <ItemWithIcon icon={MdHome}>
                  {school.street} {school.buildingNumber}, {school.postalCode} {school.city}
                </ItemWithIcon>
              </li>
              <li className="my-2">
                <a
                  href={school.website}
                  rel="noreferrer noopener"
                  target="_blank"
                  className={linkClassName}
                >
                  <ItemWithIcon icon={MdLink}>{school.website}</ItemWithIcon>
                </a>
              </li>
              <li className="my-2">
                <a
                  href={`tel:${school.phone}`}
                  rel="noreferrer noopener"
                  target="_blank"
                  className={linkClassName}
                >
                  <ItemWithIcon icon={MdPhone}>{school.phone}</ItemWithIcon>
                </a>
              </li>
              <li className="my-2">
                <a
                  href={`mailto:${school.email}`}
                  rel="noreferrer noopener"
                  target="_blank"
                  className={linkClassName}
                >
                  <ItemWithIcon icon={MdEmail}>{school.email}</ItemWithIcon>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-3 xl:col-span-4 h-72 xl:mt-0 mt-2">
            <SchoolLocationMap position={position} />
          </div>
        </div>
      </div>
      {school.description && <SchoolDescription description={school.description} />}
    </SchoolInfoSection>
  );
};

export default OverviewSection;
