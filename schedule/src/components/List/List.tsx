import React from 'react';
import { observer } from 'mobx-react';

import useStores from '../../mobx/context';
import { IEvent } from '../../interfaces/serverData/serverData';

const isCurrentWeek = (date: number, currentWeek: number) => {
  const week = 7;
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const now = new Date(Date.now() + currentWeek * week * millisecondsPerDay);
  const day = now.getDay();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  const startWeek = now.getTime() - millisecondsPerDay * (day - 1);
  const endWeek = now.getTime() + millisecondsPerDay * (week - day + 1) - 1;

  return date > startWeek && date < endWeek;
};

const handleClick = (events: IEvent[]) => {
  events.forEach((event: IEvent) => {
    console.log(isCurrentWeek(event.dateTime, 0));
  });
};

const List = observer(() => {
  const { events } = useStores();
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={() => handleClick(events.events)}>test</div>
    </>
  );
});

export default List;
