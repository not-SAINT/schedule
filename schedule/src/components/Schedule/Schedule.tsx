import React from 'react';
import { observer } from 'mobx-react';
import { Spin } from 'antd';

import ScheduleTable from '../ScheduleTable';
import ScheduleList from '../ScheduleList';
import ScheduleCalendar from '../ScheduleCalendar';
import { filterEvents } from '../../helpers/schedule-utils';
import useStores from '../../mobx/context';

import styles from './Schedule.module.scss';

// import { IEvent } from '../../interfaces/serverData/serverData';
// import { addDeadlineEvents } from '../../helpers/schedule-utils';

// const fakeScheduleTasks: IEvent[] = [
//   {
//     id: '1',
//     name: 'task1',
//     description: 'task1',
//     descriptionUrl: 'ya.ru',
//     type: 'task',
//     timeZone: '+3',
//     dateTime: 1598566266489,
//     place: '',
//     comment: 'test comment^js;optional',
//     deadline: 1599569258857,
//     lastUpdatedDate: 1598567266489,
//     isOpen: true,
//   },
//   {
//     id: '2',
//     name: 'task2',
//     description: 'task2',
//     descriptionUrl: 'https://youtu.be/2iCgf03rx1I',
//     type: 'task',
//     timeZone: '+3',
//     dateTime: 1599566266489,
//     place: '',
//     comment: 'test comment^js;optional',
//     deadline: 1599569258857,
//     isOpen: true,
//   },
//   {
//     id: '3',
//     name: 'task3',
//     description: 'event',
//     descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/schedule.md',
//     type: 'task',
//     timeZone: '+3',
//     dateTime: 1599566266489,
//     place: '',
//     comment: 'test comment',
//     deadline: 1599641395487,
//     isOpen: true,
//   },
//   {
//     id: '4',
//     name: 'task4',
//     description: 'test lection',
//     descriptionUrl: 'ya.ru',
//     type: 'webinar',
//     timeZone: '+3',
//     dateTime: 1599166246489,
//     place: '',
//     comment: 'test comment2',
//     deadline: 0,
//     hours: '3',
//     isOpen: true,
//   },
//   {
//     id: '5',
//     name: 'dfgf',
//     description: 'tgest test',
//     descriptionUrl: 'ya.ru',
//     type: 'test',
//     timeZone: '+3',
//     dateTime: 1599546166489,
//     place: '',
//     comment: 'test comment3',
//     deadline: 0,
//     lastUpdatedDate: 1599548166489,
//     isOpen: true,
//   },
//   {
//     id: '6',
//     name: 'task6',
//     description: 'test even fdg ',
//     descriptionUrl: 'ya.ru',
//     type: 'codewars',
//     timeZone: '+3',
//     dateTime: 1599966266489,
//     place: '',
//     comment: 'test ckg #egl jgh jflhj kldrtj#re gkhrekomment',
//     deadline: 1599996266489,
//     isOpen: true,
//     isFeedbackEnabled: true,
//     specialTags: 'js',
//   },
//   {
//     id: '7',
//     name: 'webdev direct url',
//     description: 'test 7 even fdg ',
//     descriptionUrl:
//       'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/markups/level-1/webdev/webdev-ru.md',
//     type: 'codewars',
//     timeZone: '+3',
//     dateTime: 1604966266489,
//     place: '',
//     hours: '9',
//     comment: 'test comkg #egl jgh jflhj kldrtj#re gkhrekment',
//     deadline: 1605966266489,
//     isOpen: true,
//     isFeedbackEnabled: true,
//     specialTags: 'js',
//   },
//   {
//     id: '8',
//     name: 'songbird direct url',
//     description: 'songbird direct url ',
//     descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/songbird.md',
//     type: 'task',
//     timeZone: '+3',
//     dateTime: 1604566266489,
//     place: 'Minsk, dsfwe r^53.9,27.566',
//     hours: '53',
//     comment: 'test comkg #egl jgh jflhj kldrtj#re gkhrekment',
//     deadline: 1605566266489,
//     isOpen: false,
//     isFeedbackEnabled: true,
//     specialTags: 'html',
//   },
//   {
//     id: '9',
//     name: 'webdev raw',
//     description: 'webdev raw ',
//     descriptionUrl:
//       'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/markups/level-1/webdev/webdev-ru.md',
//     type: 'task',
//     timeZone: '+3',
//     dateTime: 1604966266489,
//     place: 'Brest, dsfwe r^52.146793, 23.603838',
//     hours: '150',
//     comment: 'test #dkbjv sdfkghdjkg #egl jgh jflhj kldrtj#re gkhrekjgherwklj g@#4grlkhtjtl rjcomment',
//     deadline: 1605977266489,
//     isOpen: true,
//     isFeedbackEnabled: true,
//     specialTags: 'hrml;css',
//   },
// ];

// const tasks = addDeadlineEvents(fakeScheduleTasks);

const Schedule = (): React.ReactElement => {
  const { settings, events } = useStores();
  const { viewMode, tasksFilter } = settings.settings;

  let schedule = null;

  if (!events.events) {
    return (
      <div className={styles.Schedule}>
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  const data = filterEvents(events.events, tasksFilter);

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
