import { FiLayers } from '@react-icons/all-files/fi/FiLayers';
import { Popover } from '@headlessui/react';
import { FiCheck } from '@react-icons/all-files/fi/FiCheck';
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setVisibleLayersIds } from "../../../store/slices/mapSearchPageDataSlice";
import { toggleElementInArray } from "../../../utils/misc";

const availableLayers = [
  {
    id: 'roadAccidents',
    name: 'Wypadki drogowe'
  }
];

const LayerSelector = () => {
  const dispatch = useAppDispatch()
  const visibleLayersIds = useAppSelector(state => state.mapSearchPageData.visibleLayersIds)
  const isLayerVisible = (layerId: string) => visibleLayersIds.includes(layerId)

  const handleLayerClick = (layerId: string) => {
    dispatch(setVisibleLayersIds(toggleElementInArray(visibleLayersIds, layerId)))
  }

  return (
    <Popover className="relative">
      <Popover.Button className="mb-2 ml-2 backdrop-blur-2xl bg-white bg-opacity-80 border-primary flex items-center justify-center px-2 py-1 rounded-lg text-lg">
        <FiLayers className="mr-2" />
        Warstwy
      </Popover.Button>

      <Popover.Panel className="absolute z-10 bottom-full mb-2 left-2 z-[9999] bg-white rounded-lg px-4 py-2">
        <ul className="">
          {availableLayers.map(({id, name}) => (
            <li key={id}>
              <button
                onClick={() => handleLayerClick(id)}
                className="flex items-center"
              >
                <span className="block w-4 h-4 bg-white border-2 border-gray-400 rounded flex items-center justify-center">
                {isLayerVisible(id) && <FiCheck className="text-primary w-6 h-6" />}
              </span>
                <span className="ml-2">{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </Popover.Panel>
    </Popover>
  );
};

export default LayerSelector;
