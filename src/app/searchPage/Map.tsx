import { type FC, useRef, useLayoutEffect, useState } from 'react'
import { WebMercatorViewport } from '@deck.gl/core'
import { GeoJsonLayer, IconLayerProps } from '@deck.gl/layers'
import 'mapbox-gl/dist/mapbox-gl.css'
import DeckGL from '@deck.gl/react'
import { bbox } from '@turf/turf'
import mapPinImage from '../../assets/highschool-marker.png'
import OSMMTileLayer from '../../lib/map/OSMTileLayer'

const sampleViewState = {
    longitude: -122.45,
    latitude: 37.78,
    zoom: 12,
    pitch: 0,
    bearing: 0,
}

const iconConfig: ReturnType<IconLayerProps['getIcon']> = {
    url: mapPinImage,
    width: 512,
    height: 684,
    anchorY: 684,
    mask: true,
}

interface InstitutionMapProps {
    schools: Record<string, unknown>[]
}

const InstitutionsMap: FC<InstitutionMapProps> = ({ schools }) => {
    const mapContainerRef = useRef<HTMLDivElement>()

    const layers = [
        OSMMTileLayer,
        new GeoJsonLayer({
            id: 'GeoJsonLayer',
            data: schools,

            stroked: false,
            filled: true,
            pointType: 'icon',
            getIcon: () => iconConfig,
            getIconColor: () => [0, 0, 0],
            getIconSize: () => 30,
            iconSizeMinPixels: 30,
            pickable: true,

            getLineWidth: 20,
            getPointRadius: 3,
            pointRadiusUnits: 'pixels',
        }),
    ]
    const [viewState, setViewState] = useState(sampleViewState)

    useLayoutEffect(() => {
        if (mapContainerRef.current && schools) {
            const { width, height } =
                mapContainerRef.current.getBoundingClientRect()
            let viewport = new WebMercatorViewport({
                width,
                height,
            })
            const schoolsBbox = bbox(schools)
            viewport = viewport.fitBounds(
                [
                    [schoolsBbox[0], schoolsBbox[1]],
                    [schoolsBbox[2], schoolsBbox[3]],
                ],
                { maxZoom: 17 }
            )
            setViewState({
                longitude: viewport.longitude,
                latitude: viewport.latitude,
                zoom: viewport.zoom,
                pitch: 0,
                bearing: 0,
            })
        }
    }, [schools])

    return (
        <div
            className="w-full h-full relative overflow-hidden"
            ref={mapContainerRef}
        >
            <DeckGL
                viewState={viewState}
                onViewStateChange={({ viewState }) => setViewState(viewState)}
                controller
                layers={layers}
            ></DeckGL>
        </div>
    )
}

export default InstitutionsMap
