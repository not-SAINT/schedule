import React from 'react';
import { Provider } from 'mobx-react';
import { ErrorBoundary } from 'react-error-boundary';

import Settings from './mobx/store/settings';
import ErrorFallback from './components/ErrorFallback';
import ScheduleTable from './components/ScheduleTable';
import { IEvent } from './interfaces/serverData/serverData';

import 'antd/dist/antd.css';
import './App.css';

const settings = new Settings();

const fakeScheduleTasks: IEvent[] = [
  {
    id: '1',
    name: 'First event',
    description: 'test event',
    descriptionUrl: 'ya.ru',
    type: 'task',
    timeZone: '+3',
    dateTime: 1598566266489,
    place: 'online',
    comment: 'test comment^js;optional',
    deadline: 1599569258857,
    lastUpdatedDate: 1598567266489,
  },
  {
    id: '2',
    name: 'First event',
    description: 'test event',
    descriptionUrl: 'ya.ru',
    type: 'task',
    timeZone: '+3',
    dateTime: 1599566266489,
    place: 'online',
    comment: 'test comment^js;optional',
    deadline: 1599569258857,
  },
  {
    id: '3',
    name: 'First event',
    description: 'test event',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/schedule.md',
    type: 'task',
    timeZone: '+3',
    dateTime: 1599566266489,
    place: 'online',
    comment: 'test comment',
    deadline: 1599641395487,
  },
  {
    id: '4',
    name: 'fgh event dfsg sdfg sdf hgsh fgh ',
    description: 'test lection',
    descriptionUrl: 'ya.ru',
    type: 'webinar',
    timeZone: '+3',
    dateTime: 1599166246489,
    place: 'online',
    comment: 'test comment2',
    hours: '3',
  },
  {
    id: '5',
    name: 'dsfg dr fffffffffffffffffff event',
    description: 'tgest test',
    descriptionUrl: 'ya.ru',
    type: 'test',
    timeZone: '+3',
    dateTime: 1599546166489,
    place: 'online',
    comment: 'test comment3',
    lastUpdatedDate: 1599548166489,
  },
  {
    id: '6',
    name: 'First event',
    description: 'test even fdg dffffffffffffffft',
    descriptionUrl: 'ya.ru',
    type: 'task',
    timeZone: '+3',
    dateTime: 1599966266489,
    place: 'online',
    comment: 'test comment^js',
    deadline: 1599996266489,
  },
];

const App = (): React.ReactElement => {
  return (
    <Provider settings={settings}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        <div />
      </ErrorBoundary>
      <ScheduleTable data={fakeScheduleTasks} />
    </Provider>
  );
};

export default App;
