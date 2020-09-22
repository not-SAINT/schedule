import React from 'react';
import { observer } from 'mobx-react';
import { Spin } from 'antd';

import ScheduleTable from '../ScheduleTable';
import ScheduleList from '../ScheduleList';
import ScheduleCalendar from '../ScheduleCalendar';
import { filterEvents } from '../../helpers/schedule-utils';
import useStores from '../../mobx/context';

import styles from './Schedule.module.scss';

const Schedule = (): React.ReactElement => {
  const { settings, events } = useStores();
  const { viewMode, tasksFilter, course } = settings.settings;

  let schedule = null;

  if (!events.events) {
    return (
      <div className={styles.Schedule}>
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  let data = filterEvents(events.events, tasksFilter);

  data = data.filter(({ course: eventCourse }) => eventCourse === course);

  switch (viewMode) {
    case 1:
      schedule = <ScheduleList data={data} />;
      break;
    case 2:
      schedule = <ScheduleCalendar data={data} />;
      break;
    default:
      schedule = <ScheduleTable data={data} />;
      break;
  }

  return schedule;
};

export default observer(Schedule);
