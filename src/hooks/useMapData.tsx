import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useDebouncedValue from './useDebouncedValue';
import usePrevious from './usePrevious';
import L from 'leaflet';
import { useProjectConfig } from '../config/projectConfigContext';

export interface BasicMapData {
  zoom: number;
  center: [number, number];
  bboxString: string;
  layers: string[];
}

interface MapDataContextValue {
  basicMapData: BasicMapData;
  setBasicMapData: Dispatch<SetStateAction<BasicMapData>>;
}

const initialMapDataContextValue: MapDataContextValue = {
  basicMapData: {
    bboxString: '',
    zoom: 0,
    center: [0, 0],
    layers: [],
  },
  setBasicMapData: () => {
    /* noop */
  },
};

const mapDataContext = createContext<MapDataContextValue>(initialMapDataContextValue);

export const MapDataProvider: FC = ({ children }) => {
  const [basicMapData, setBasicMapData] = useState<BasicMapData>(
    initialMapDataContextValue.basicMapData,
  );

  return (
    <mapDataContext.Provider value={{ basicMapData, setBasicMapData }}>
      {children}
    </mapDataContext.Provider>
  );
};

const useMapData = () => {
  const { basicMapData, setBasicMapData } = useContext(mapDataContext);
  const { projectID } = useProjectConfig();
  const { bboxString } = basicMapData;

  const [debouncedBboxString] = useDebouncedValue(bboxString, 300);
  const prevDebouncedBboxString = usePrevious(debouncedBboxString);
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery<any>(
    [`/search/map_features?bbox=${debouncedBboxString}&project_id=${projectID}`],
    {
      enabled: !!debouncedBboxString,
      placeholderData: () => {
        return queryClient.getQueryData([
          `/search/map_features?bbox=${prevDebouncedBboxString}&project_id=${projectID}`,
        ]);
      },
    },
  );
  console.log(isFetching)
  const onUpdateMap = (map: L.Map) => {
    setBasicMapData((mapData) => ({
      ...mapData,
      bboxString: map.getBounds().toBBoxString().trim(),
      zoom: map.getZoom(),
      center: [map.getCenter().lat, map.getCenter().lng],
    }));
  };

  return {
    debouncedBboxString,
    mapFeatures: data,
    onUpdateMap,
    isFetching,
  };
};

export default useMapData;
