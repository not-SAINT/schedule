import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { DEFAULT_ZOOM, YANDEX_KEY } from '../../constants/settings';

interface MapProps {
  lat: number;
  lng: number;
  eventName: string;
}

const YanMap: React.FC<MapProps> = ({ lat, lng, eventName }: MapProps) => {
  return (
    <YMaps query={{ apikey: YANDEX_KEY }}>
      <Map defaultState={{ center: [lat, lng], zoom: DEFAULT_ZOOM }} width="100%" height="100%">
        <Placemark
          geometry={[lat, lng]}
          properties={{
            iconContent: eventName,
          }}
          options={{
            preset: 'islands#blackStretchyIcon',
          }}
        />
      </Map>
    </YMaps>
  );
};

export default YanMap;
