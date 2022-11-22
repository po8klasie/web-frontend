import { FiLayers } from '@react-icons/all-files/fi/FiLayers';
import { Popover, Switch } from '@headlessui/react';
import { useState } from 'react';
import { FiCheck } from '@react-icons/all-files/fi/FiCheck';

const layers = ['Wypadki drogowe', 'Komunikacja miejska'];

const LayerSelector = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <Popover className="relative">
      <Popover.Button className="mb-2 ml-2 backdrop-blur-2xl bg-white bg-opacity-80 border-primary flex items-center justify-center px-2 py-1 rounded-lg text-lg">
        <FiLayers className="mr-2" />
        Warstwy
      </Popover.Button>

      <Popover.Panel className="absolute z-10 bottom-full mb-2 left-2 z-[9999] bg-white rounded-lg px-4 py-2">
        <ul className="">
          {layers.map((layer) => (
            <li className="flex items-center" key={layer}>
              <span className="block w-4 h-4 bg-white border-2 border-gray-400 rounded flex items-center justify-center">
                <FiCheck className="text-primary w-6 h-6" />
              </span>
              <span className="ml-2">{layer}</span>
            </li>
          ))}
        </ul>
      </Popover.Panel>
    </Popover>
  );
};

export default LayerSelector;
