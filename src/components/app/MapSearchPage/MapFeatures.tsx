import RoadAccidentFeatures from './mapFeatures/RoadAccidentFeatures';
import InstitutionFeatures from './mapFeatures/InstitutionFeatures';
import PublicTransportStopFeatures from './mapFeatures/PublicTransportStopFeatures';

const MapFeatures = ({ data }) => {
  return (
    <>
      <RoadAccidentFeatures data={data && data.roadAccidents} />
      <InstitutionFeatures data={data && data.institutions} />
      <PublicTransportStopFeatures data={data && data.publicTransportStops} />
    </>
  );
};

export default MapFeatures;
