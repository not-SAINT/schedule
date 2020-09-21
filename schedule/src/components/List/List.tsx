import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Collapse } from 'antd';

import useStores from '../../mobx/context';
import { IEvent, IOrganizer } from '../../interfaces/serverData/serverData';
import Week from '../../constants/week';
import styles from './List.module.scss';

const { Panel } = Collapse;

const week = Week.length;

const isCurrentWeek = (date: number, currentWeek: number) => {
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

const mapToWeek = (events: IEvent[]) => {
  const weekMap = new Array(week).fill([]);

  events.forEach((event: IEvent) => {
    const eventDay = new Date(+event.dateTime).getDay();

    if (weekMap[eventDay].length) {
      weekMap[eventDay].push(event);
    } else {
      const dayMap = [];
      dayMap.push(event);
      weekMap[eventDay] = dayMap;
    }
  });

  return weekMap;
};

const organizerSearch = (organizers: IOrganizer[], id: string) => {
  let name = '';

  organizers.forEach((org: IOrganizer) => {
    if (org.id === id) {
      name = org.name;
    }
  });

  return name;
};

const dayEvents = (events: IEvent[], organizers: IOrganizer[]) => {
  return events.map((event: IEvent) => {
    const { id, type, dateTime, name, descriptionUrl, comment, place, organizerId } = event;

    return (
      <div key={id} className={styles.DayElement}>
        <span>{new Date(+dateTime).toLocaleString()}</span>
        <span>{type}</span>
        <span>{name}</span>
        <a href={descriptionUrl}>{descriptionUrl}</a>
        <span>{comment}</span>
        <span>{place}</span>
        <span>{organizerSearch(organizers, organizerId)}</span>
      </div>
    );
  });
};

const weekElements = (events: IEvent[], currentWeekCount: number, organizers: IOrganizer[]) => {
  const currentWeek = events.filter((event: IEvent) => isCurrentWeek(event.dateTime, currentWeekCount));
  const weekMap = mapToWeek(currentWeek);

  return weekMap.map((event: IEvent[], index: number) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <Panel header={Week[index]} key={Date.now() + index}>
        {dayEvents(event, organizers)}
      </Panel>
    );
  });
};

const List = observer(() => {
  const { events, organizers } = useStores();
  const [currentWeek, setCurrentWeek] = useState(0);

  const handleClickBack = () => {
    setCurrentWeek(currentWeek - 1);
  };

  const handleClickForward = () => {
    setCurrentWeek(currentWeek + 1);
  };

  if (events.events === null || organizers.organizers === null) return <div />;

  return (
    <>
      <button type="button" onClick={handleClickBack}>
        back
      </button>
      <Collapse>{weekElements(events.events, currentWeek, organizers.organizers)}</Collapse>
      <button type="button" onClick={handleClickForward}>
        forward
      </button>
    </>
  );
});

export default List;
