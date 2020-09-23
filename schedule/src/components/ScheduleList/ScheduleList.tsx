import React, { useEffect, useState } from 'react';
import { Collapse, Tag, Badge } from 'antd';

import { Link } from 'react-router-dom';
import { IEvent } from '../../interfaces/serverData/serverData';
import WEEK from '../../constants/week';
import MONTHS from '../../constants/months';
import styles from './ScheduleList.module.scss';
import { getTagColorByEventType } from '../../helpers/schedule-utils';
import { TaskType } from '../../constants/settings';

const { Panel } = Collapse;

const week = WEEK.length;
const millisecondsPerDay = 24 * 60 * 60 * 1000;

const getStartAndEndWeekTime = (currentWeek: number) => {
  const now = new Date(Date.now() + currentWeek * week * millisecondsPerDay);
  const day = now.getDay();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  const startWeek = now.getTime() - millisecondsPerDay * (day - 1);
  const endWeek = now.getTime() + millisecondsPerDay * (week - day + 2) - 1;
  // setStartWeekDate(new Date(startWeek).toDateString());
  // setEndWeekDate(new Date(endWeek).toDateString());
  return [startWeek, endWeek];
};

const isCurrentWeek = (date: number, currentWeek: number) => {
  const startAndEnd = getStartAndEndWeekTime(currentWeek);
  return date > startAndEnd[0] && date < startAndEnd[1];
};

const panelClassName = (daySelected: number, currentWeek: number) => {
  const now = new Date(Date.now());
  const dayNow = now.getDay();
  if (currentWeek > 0) {
    return 'Panel--future';
  }
  if (currentWeek < 0) {
    return 'Panel--past';
  }
  if (dayNow > daySelected) {
    return 'Panel--past';
  }
  if (dayNow < daySelected) {
    return 'Panel--future';
  }
  if (dayNow === daySelected) {
    return 'Panel--current';
  }
  return 'Panel';
};

const mapToWeek = (events: IEvent[]) => {
  const weekMap = new Array(week).fill([]);

  events.forEach((event: IEvent) => {
    const time = event.dateTime;
    const date = new Date(+time);
    let eventDay = date.getDay();

    if (eventDay === 0) {
      eventDay = 6;
    } else {
      eventDay -= 1;
    }

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

const dayEvents = (events: IEvent[]) => {
  return events.map((event: IEvent) => {
    const { id, type, dateTime, name } = event;
    const timeSymbolsCount = 8;
    let date = new Date(+dateTime).toLocaleString();
    date = date.substr(date.length - timeSymbolsCount, date.length - 1);
    const color = getTagColorByEventType(type as TaskType);

    return (
      <tr key={id}>
        <th className={styles['ListTable--date']}>{date}</th>
        <th className={styles['ListTable--type']}>
          <Tag color={color}>{type}</Tag>
        </th>
        <th className={styles['ListTable--name']}>
          <Link to={{ pathname: `/task/${id}`, state: { event } }}>{name}</Link>
        </th>
      </tr>
    );
  });
};

const weekElements = (events: IEvent[], currentWeekCount: number) => {
  const currentWeek = events.filter((event: IEvent) => isCurrentWeek(event.dateTime, currentWeekCount));
  const weekMap = mapToWeek(currentWeek);
  return weekMap.map((event: IEvent[], index: number) => {
    const eventCount = event.length;
    const eventCountElem = (
      <Badge count={eventCount}>
        <span className={styles.Day}>{WEEK[index]}</span>
      </Badge>
    );
    const className = styles[panelClassName(index + 1, currentWeekCount)];

    if (event.length) {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <Panel className={className} header={eventCountElem} key={Date.now() + index}>
          <table className={styles.ListTable}>{dayEvents(event)}</table>
        </Panel>
      );
    }

    // eslint-disable-next-line react/no-array-index-key
    return <Panel className={className} header={eventCountElem} key={Date.now() + index} />;
  });
};

interface IScheduleList {
  data: IEvent[];
}

const ScheduleList = ({ data }: IScheduleList) => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const [startWeekDate, setStartWeekDate] = useState('');
  const [endWeekDate, setEndWeekDate] = useState('');
  // use effect дата каждый раз меняется начала и конца недели и
  useEffect(() => {
    const startAndEnd = getStartAndEndWeekTime(currentWeek);
    const startWeek = new Date(startAndEnd[0]);
    const endWeek = new Date(startAndEnd[1]);
    const startWeekText = `${startWeek.getDate()} ${MONTHS[startWeek.getMonth()]}`;
    const endWeekText = `${endWeek.getDate()} ${MONTHS[endWeek.getMonth()]}`;
    setStartWeekDate(startWeekText);
    setEndWeekDate(endWeekText);
  }, [currentWeek]);

  const handleClickBack = () => {
    setCurrentWeek(currentWeek - 1);
  };

  const handleClickForward = () => {
    setCurrentWeek(currentWeek + 1);
  };

  if (data === null) return <div />;

  return (
    <div className={styles.List}>
      <div className={styles.Dates}>
        <span>{startWeekDate}</span>
        <span> - </span>
        <span>{endWeekDate}</span>
      </div>
      <div className={styles.Buttons}>
        <button className={styles['Buttons--left']} type="button" onClick={handleClickBack} />
        <button className={styles['Buttons--right']} type="button" onClick={handleClickForward} />
      </div>
      <Collapse className={styles.Collapse}>{weekElements(data, currentWeek)}</Collapse>
    </div>
  );
};

export default ScheduleList;
