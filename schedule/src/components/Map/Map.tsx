import React from 'react';
import { YMaps, Map, Placemark, SearchControl } from 'react-yandex-maps';
import { DEFAULT_ZOOM, YANDEX_KEY } from '../../constants/settings';

interface MapProps {
  lat: number;
  lng: number;
}

const YanMap: React.FC<MapProps> = (coords) => {
  return (
    <YMaps query={{ apikey: YANDEX_KEY }}>
      <Map defaultState={{ center: [coords.lat, coords.lng], zoom: DEFAULT_ZOOM }} width="100%" height="100%">
        <Placemark geometry={[coords.lat, coords.lng]} />
        <SearchControl options={{ float: 'right' }} />
      </Map>
    </YMaps>
  );
};

export default YanMap;
