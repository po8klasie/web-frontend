import React from 'react';
import L from 'leaflet';
import highSchoolMarker from '../../../../assets/app/highschool-marker.png';
import selectedSchoolMarker from '../../../../assets/app/selected-school-marker.png';
import { useSelectedSchool } from '../../../../hooks/useSelectedSchool';
import DynamicGeoJSON from './DynamicGeoJSON';

const highSchoolIcon = L.icon({
  iconUrl: highSchoolMarker,
  iconSize: [18, 25.3],
});

const selectedSchoolIcon = L.icon({
  iconUrl: selectedSchoolMarker,
  iconSize: [27, 38],
});

const pointToLayer = (selectedSchoolRspo, setSelectedSchoolRspo) => (feature, latlng) => {
  return L.marker(latlng, {
    icon: selectedSchoolRspo === feature.properties.rspo ? selectedSchoolIcon : highSchoolIcon,
  }).on('click', () => setSelectedSchoolRspo(feature.properties.rspo));
};

const style = (feature) => {
  return {
    // fillColor: '',
    weight: 3,
    opacity: 1,
    color: 'red',
    dashArray: '3',
    fillOpacity: 0.0,
  };
};

const InstitutionFeatures = ({ data }) => {
  const { selectedSchoolRspo, setSelectedSchoolRspo } = useSelectedSchool();

  return (
    <DynamicGeoJSON
      data={data}
      style={style}
      pointToLayer={pointToLayer(selectedSchoolRspo, setSelectedSchoolRspo)}
    />
  );
};

export default InstitutionFeatures;
