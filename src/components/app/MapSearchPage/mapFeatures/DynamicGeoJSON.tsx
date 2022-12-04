import React, { FC, useMemo } from 'react';
import { GeoJSON, GeoJSONProps } from 'react-leaflet';
import objectHash from 'object-hash';
type DynamicGeoJSONProps = Pick<GeoJSONProps, 'data' | 'style' | 'pointToLayer'>;

const DynamicGeoJSON: FC<DynamicGeoJSONProps> = ({ data, style, pointToLayer }) => {
  return useMemo(() => {
    if (!data) return null;
    return <GeoJSON key={objectHash(data)} data={data} style={style} pointToLayer={pointToLayer} />;
  }, [data, style, pointToLayer]);
};

export default DynamicGeoJSON;
