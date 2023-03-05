import { useEffect, useRef } from 'react';
import L from 'leaflet';
import highSchoolMarker from '../../../../assets/app/highschool-marker.png';
import selectedSchoolMarker from '../../../../assets/app/selected-school-marker.png';
import { useSelectedSchool } from '../../../../hooks/useSelectedSchool';
import { useMap } from 'react-leaflet';
import { Feature, Point } from 'geojson';
import { useAppSelector } from '../../../../store/hooks';

const highSchoolIcon = L.icon({
  iconUrl: highSchoolMarker,
  iconSize: [18, 25.3],
});

const selectedSchoolIcon = L.icon({
  iconUrl: selectedSchoolMarker,
  iconSize: [27, 38],
});

const InstitutionFeatures = ({ data }) => {
  const map = useMap();
  const geoJSONRef = useRef<L.GeoJSON>();
  const featuresRef = useRef<Record<string, L.Marker>>({});
  const selectedSchoolFeatureRef = useRef<L.Marker | null>(null);
  const currentMapPosition = useAppSelector((state) => state.mapSearchPageData.currentMapPosition);

  const { selectedSchoolRspo, setSelectedSchoolRspo } = useSelectedSchool();

  const pointToLayer = (feature: Feature<Point, { rspo: string }>, latLng: L.LatLng) => {
    const { rspo } = feature.properties;
    const isSelectedSchool = selectedSchoolRspo === rspo;
    const icon = isSelectedSchool ? selectedSchoolIcon : highSchoolIcon;

    const marker = L.marker(latLng, {
      icon,
    }).on('click', () => setSelectedSchoolRspo(rspo));

    featuresRef.current[rspo] = marker;
    if (isSelectedSchool) {
      selectedSchoolFeatureRef.current = marker;
    }
    return marker;
  };

  const updateSelectedSchool = () => {
    if (selectedSchoolFeatureRef.current) {
      selectedSchoolFeatureRef.current.setIcon(highSchoolIcon);
    }
    selectedSchoolFeatureRef.current = null;

    if (
      selectedSchoolRspo &&
      Object.prototype.hasOwnProperty.call(featuresRef.current, selectedSchoolRspo)
    ) {
      selectedSchoolFeatureRef.current = featuresRef.current[selectedSchoolRspo];
      selectedSchoolFeatureRef.current.setIcon(selectedSchoolIcon);
    }
  };

  useEffect(() => {
    if (data) {
      if (geoJSONRef.current) {
        geoJSONRef.current.clearLayers();
        featuresRef.current = {};
        geoJSONRef.current.addData(data);
        updateSelectedSchool();

        // filters were changed - bbox was reset
        if (!currentMapPosition) {
          const bounds = geoJSONRef.current.getBounds();
          if (bounds.isValid())
            map.fitBounds(bounds, {
              animate: true,
              padding: [2, 2],
            });
        }
      } else {
        geoJSONRef.current = L.geoJSON(data, {
          pointToLayer,
        }).addTo(map);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    updateSelectedSchool();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSchoolRspo]);

  return null;
};

export default InstitutionFeatures;
