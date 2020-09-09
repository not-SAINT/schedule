import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

interface MapProps {
  lat: number;
  lng: number;
}

const YanMap: React.FC<MapProps> = (coords) => {
  return (
    <YMaps>
      <Map defaultState={{ center: [coords.lat, coords.lng], zoom: 12 }} width="100%" height="100%">
        <Placemark geometry={[coords.lat, coords.lng]} />
      </Map>
    </YMaps>
  );
};

export default YanMap;
