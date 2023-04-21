import type { IconLayerProps } from '@deck.gl/layers/typed';
import { useSelectedSchool } from '../../../../hooks/useSelectedSchool';
import { useMap } from 'react-map-gl';
import { useAppSelector } from '../../../../store/hooks';
import { useProjectConfig } from '../../../../config/projectConfigContext';
import { useFiltersObjectWithoutDefaults } from '../hooks/useURLSerializer';
import { useCallback, useMemo } from 'react';
import { stringifyQueryString } from '../../../../utils/searchSerializer';
import { MVTLayer } from '@deck.gl/geo-layers/typed';
import { publicRuntimeConfig } from '../../../../runtimeConfig';
import mapPinImage from '../../../../assets/app/map-pin.png';

const primaryColorRgb = [157, 84, 191];
const black = [0, 0, 0];

const iconConfig: ReturnType<IconLayerProps['getIcon']> = {
  url: mapPinImage,
  width: 512,
  height: 684,
  anchorY: 684,
  mask: true,
};

const useInstitutionFeaturesLayer = () => {
  const { searchView: searchViewConfig } = useProjectConfig();
  const { selectedSchoolRspo, setSelectedSchoolRspo } = useSelectedSchool();
  const map = useMap();
  const query = useAppSelector((state) => state.mapSearchPageData.query);
  const { projectId } = useProjectConfig();

  const filtersObjectWithoutDefaults = useFiltersObjectWithoutDefaults();
  const qs = useMemo(
    () =>
      stringifyQueryString({
        ...filtersObjectWithoutDefaults,
        query,
        project_id: projectId,
      }),
    [filtersObjectWithoutDefaults, query, projectId],
  );

  const isSelectedSchool = useCallback((d) => d.properties.rspo === selectedSchoolRspo, [
    selectedSchoolRspo,
  ]);

  const onDataLoad = (d) => {
    if (d && map.current) {
      const b = d.bounds;

      if (b) {
        map.current.fitBounds(
          [
            [b[0], b[1]],
            [b[2], b[3]],
          ],
          {
            padding: 80,
          },
        );
        return;
      }
      const mapOptions = searchViewConfig?.mapOptions;
      map.current.flyTo({
        center: [mapOptions?.longitude, mapOptions?.latitude],
        zoom: mapOptions?.zoom,
      });
    }
  };

  return new MVTLayer({
    // XXX(micorix): Use dynamic id to ensure tiles reload after filters change
    id: `institutions-${qs}` as string,
    data: `${publicRuntimeConfig.API_URL}/search/map_features/institutions/tilejson?${qs}` as string,
    pointType: 'icon',
    pickable: true,
    getIcon: () => iconConfig,
    getIconColor: (d) => (isSelectedSchool(d) ? black : primaryColorRgb),
    getIconSize: (d) => (isSelectedSchool(d) ? 35 : 30),
    iconSizeMinPixels: 30,
    onClick: (info) => setSelectedSchoolRspo(info.object.properties.rspo),
    updateTriggers: {
      getIconColor: selectedSchoolRspo,
      getIconSize: selectedSchoolRspo,
    },
    onDataLoad,
  });
};
export default useInstitutionFeaturesLayer;
