'use client';

import React, { FC } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLeafletTileLayerProps } from '../../../../../../utils/map';
import { marker } from '../../../../../../utils/mapMarkers';

export interface SchoolLocationMapProps {
  position: LatLngExpression;
}

const SchoolLocationMap: FC<SchoolLocationMapProps> = ({ position }) => {
  const tileLayerProps = useLeafletTileLayerProps();
  return (
    <MapContainer center={position} zoom={13} className="w-full h-full rounded">
      <TileLayer {...tileLayerProps} />
      <Marker position={position} icon={marker} />
    </MapContainer>
  );
};

export default SchoolLocationMap;
