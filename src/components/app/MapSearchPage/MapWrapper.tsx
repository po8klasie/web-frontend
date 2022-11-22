import QueryField from './QueryField';
import LayerSelector from './LayerSelector';
import dynamic from 'next/dynamic';

const SearchPageMap = dynamic(() => import('./SearchPageMap'), { ssr: false });

const MapWrapper = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="absolute bottom-0 left-0 w-full" style={{ zIndex: 99999999999 }}>
        <LayerSelector />
      </div>
      <QueryField />
      <SearchPageMap />
    </div>
  );
};

export default MapWrapper;
