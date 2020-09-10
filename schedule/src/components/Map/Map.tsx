import React from 'react';
import { YMaps, Map, Placemark, SearchControl } from 'react-yandex-maps';

interface MapProps {
  lat: number;
  lng: number;
}

const YanMap: React.FC<MapProps> = (coords) => {
  return (
    <YMaps query={{ apikey: '9d0214b0-7d03-4e6b-9632-373c90a90e0c' }}>
      <Map defaultState={{ center: [coords.lat, coords.lng], zoom: 12 }} width="100%" height="100%">
        <Placemark geometry={[coords.lat, coords.lng]} />
        <SearchControl options={{ float: 'right' }} />
      </Map>
    </YMaps>
  );
};

export default YanMap;
