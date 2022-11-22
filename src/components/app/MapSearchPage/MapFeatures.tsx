import RoadAccidentFeatures from './mapFeatures/RoadAccidentFeatures';
import InstitutionFeatures from './mapFeatures/InstitutionFeatures';

const MapFeatures = ({ data }) => {
  return (
    <>
      <RoadAccidentFeatures data={data && data.roadAccidents} />
      <InstitutionFeatures data={data && data.institutions} />
    </>
  );
};

export default MapFeatures;
