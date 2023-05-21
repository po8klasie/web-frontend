import QueryField from './QueryField';
import LayerSelector from './LayerSelector';
import dynamic from 'next/dynamic';
import { FC } from 'react';

const SearchPageMap = dynamic(() => import('./Map'), { ssr: false }) as FC;

const MapWrapper = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="absolute bottom-0 left-0 w-full" style={{ zIndex: 1000 }}>
        <LayerSelector />
      </div>
      <QueryField />
      <SearchPageMap />
    </div>
  );
};

export default MapWrapper;
