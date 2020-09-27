import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Collapse, Tag, Badge, Spin, Button, Row, Typography, Col, Tooltip } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { IEvent } from '../../interfaces/serverData/serverData';
import WEEK from '../../constants/week';
import MONTHS from '../../constants/months';
import { getTagColorByEventType, getFormatTime } from '../../helpers/schedule-utils';
import { TaskType } from '../../constants/settings';
import useStores from '../../mobx/context';

import styles from './ScheduleList.module.scss';

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

const dayEvents = (events: IEvent[], timeZone: number) => {
  return events.map((event: IEvent) => {
    const { id, type, dateTime, name } = event;
    const color = getTagColorByEventType(type as TaskType);
    const eventCopy = { ...event };
    const eventTime = getFormatTime(dateTime, timeZone);

    return (
      <tr key={id}>
        <th className={styles['ListTable--date']}>{eventTime}</th>
        <th className={styles['ListTable--type']}>
          <Tag color={color}>{type}</Tag>
        </th>
        <th className={styles['ListTable--name']}>
          <Link to={{ pathname: `/task/${id}`, state: { event: eventCopy } }}>{name}</Link>
        </th>
      </tr>
    );
  });
};

const weekElements = (events: IEvent[], currentWeekCount: number, timeZone: number) => {
  const currentWeek = events.filter((event: IEvent) => isCurrentWeek(event.dateTime, currentWeekCount));
  const weekMap = mapToWeek(currentWeek);
  const currentDate = Date.now();

  return weekMap.map((event: IEvent[], index: number) => {
    const eventCount = event.length;
    const eventCountElem = (
      <Badge count={eventCount}>
        <span className={styles.Day}>{WEEK[index]}</span>
      </Badge>
    );
    const className = styles[panelClassName(index + 1, currentWeekCount)];
    const key = currentDate + index;

    if (event.length) {
      return (
        <Panel className={className} header={eventCountElem} key={key}>
          <table className={styles.ListTable}>{dayEvents(event, timeZone)}</table>
        </Panel>
      );
    }

    return <Panel className={className} header={eventCountElem} key={key} disabled />;
  });
};

interface IScheduleList {
  data: IEvent[];
}

const ScheduleList = ({ data }: IScheduleList): React.ReactElement => {
  const { Text } = Typography;
  const [currentWeek, setCurrentWeek] = useState(0);

  const [startWeekDate, setStartWeekDate] = useState('');
  const [endWeekDate, setEndWeekDate] = useState('');
  const {
    settings: {
      settings: { timeZone },
    },
  } = useStores();

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

  if (data === null) return <Spin tip="Loading..." size="large" />;

  return (
    <div className={styles.List}>
      <Row justify="center" align="middle" gutter={[16, 16]}>
        <Col>
          <Tooltip title="Previous week">
            <Button shape="circle" icon={<LeftOutlined />} onClick={handleClickBack} />
          </Tooltip>
        </Col>
        <Col>
          <Text strong>{`${startWeekDate} - ${endWeekDate}`}</Text>
        </Col>
        <Col>
          <Tooltip title="Next week">
            <Button shape="circle" icon={<RightOutlined />} onClick={handleClickForward} />
          </Tooltip>
        </Col>
      </Row>
      <Collapse className={styles.Collapse}>{weekElements(data, currentWeek, timeZone)}</Collapse>
    </div>
  );
};

export default observer(ScheduleList);
