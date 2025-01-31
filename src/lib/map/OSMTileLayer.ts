import { TileLayer } from '@deck.gl/geo-layers'
import { BitmapLayer, PathLayer } from '@deck.gl/layers'
import { Position } from '@deck.gl/core'

const showBorder = false

const OSMMTileLayer = new TileLayer<ImageBitmap>({
    // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
    data: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],

    // Since these OSM tiles support HTTP/2, we can make many concurrent requests
    // and we aren't limited by the browser to a certain number per domain.
    maxRequests: 20,

    pickable: true,
    autoHighlight: showBorder,
    highlightColor: [60, 60, 60, 40],
    // https://wiki.openstreetmap.org/wiki/Zoom_levels
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,
    renderSubLayers: (props) => {
        const [[west, south], [east, north]] = props.tile.boundingBox
        const { data, ...otherProps } = props

        return [
            new BitmapLayer(otherProps, {
                image: data,
                bounds: [west, south, east, north],
            }),
            showBorder &&
                new PathLayer<Position[]>({
                    id: `${props.id}-border`,
                    data: [
                        [
                            [west, north],
                            [west, south],
                            [east, south],
                            [east, north],
                            [west, north],
                        ],
                    ],
                    getPath: (d) => d,
                    getColor: [255, 0, 0],
                    widthMinPixels: 4,
                }),
        ]
    },
})

export default OSMMTileLayer
