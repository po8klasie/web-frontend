import { lazy } from "react";
import LayerSelector from "./_components/LayerSelector";

const Map = lazy(() => import('./_components/Map'));

export default () => (
  <div className="h-full relative">
    <Map />
    <div className="absolute z-[100] bottom-2 left-2">
      <LayerSelector />
    </div>
  </div>
)
