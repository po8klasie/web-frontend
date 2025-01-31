import React, { FC } from 'react'
import DeckGL from '@deck.gl/react'
import OSMTileLayer from '../../../../src/lib/map/OSMTileLayer'
import { IconLayer } from '@deck.gl/layers'
import mapPinImage from '../../../../src/assets/highschool-marker.png'

const ICON_SIZE = 40
const ZOOM = 13

const getIconLayer = (position) =>
    new IconLayer({
        id: 'school',
        data: [position],
        getIcon: () => ({
            url: mapPinImage,
            width: 512,
            height: 684,
            anchorY: 684,
        }),
        getPosition: (d) => [d.longitude, d.latitude],
        sizeMinPixels: ICON_SIZE,
        sizeUnits: 'pixels',
        pickable: true,
    })

export interface SchoolLocationMapProps {
    position: LatLngExpression
}

const SchoolLocationMapClient: FC<SchoolLocationMapProps> = ({ position }) => {
    return (
        <div className="w-full h-full rounded relative">
            <DeckGL
                initialViewState={{
                    longitude: position.longitude,
                    latitude: position.latitude,
                    zoom: ZOOM,
                }}
                controller
                layers={[OSMTileLayer, getIconLayer(position)]}
            ></DeckGL>
        </div>
    )
}

export default SchoolLocationMapClient
