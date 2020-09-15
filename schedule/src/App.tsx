import React from 'react';
import { Provider } from 'mobx-react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Settings from './mobx/store/settings';
import ErrorFallback from './components/ErrorFallback';
import EventPage from './components/EventPage';
import ScheduleTable from './components/ScheduleTable';
import ControlPanel from './components/ControlPanel';
import { IEvent } from './interfaces/serverData/serverData';
import { addDeadlineEvents } from './helpers/schedule-utils';

import 'antd/dist/antd.css';
import './App.css';

const settings = new Settings();

const fakeScheduleTasks: IEvent[] = [
  {
    id: '1',
    name: 'task1',
    description: 'task1',
    descriptionUrl: 'ya.ru',
    type: 'task',
    timeZone: '+3',
    dateTime: 1598566266489,
    place: '',
    comment: 'test comment^js;optional',
    deadline: 1599569258857,
    lastUpdatedDate: 1598567266489,
    isOpen: true,
  },
  {
    id: '2',
    name: 'task2',
    description: 'task2',
    descriptionUrl: 'https://youtu.be/2iCgf03rx1I',
    type: 'task',
    timeZone: '+3',
    dateTime: 1599566266489,
    place: '',
    comment: 'test comment^js;optional',
    deadline: 1599569258857,
    isOpen: true,
  },
  {
    id: '3',
    name: 'task3',
    description: 'event',
    descriptionUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/schedule.md',
    type: 'task',
    timeZone: '+3',
    dateTime: 1599566266489,
    place: '',
    comment: 'test comment',
    deadline: 1599641395487,
    isOpen: true,
  },
  {
    id: '4',
    name: 'task4',
    description: 'test lection',
    descriptionUrl: 'ya.ru',
    type: 'webinar',
    timeZone: '+3',
    dateTime: 1599166246489,
    place: '',
    comment: 'test comment2',
    deadline: 0,
    hours: '3',
    isOpen: true,
  },
  {
    id: '5',
    name: 'dfgf',
    description: 'tgest test',
    descriptionUrl: 'ya.ru',
    type: 'test',
    timeZone: '+3',
    dateTime: 1599546166489,
    place: '',
    comment: 'test comment3',
    deadline: 0,
    lastUpdatedDate: 1599548166489,
    isOpen: true,
  },
  {
    id: '6',
    name: 'task6',
    description: 'test even fdg ',
    descriptionUrl: 'ya.ru',
    type: 'codewars',
    timeZone: '+3',
    dateTime: 1599966266489,
    place: '',
    comment: 'test comment^js',
    deadline: 1599996266489,
    isOpen: true,
  },
  {
    id: '7',
    name: 'task7',
    description: 'test 7 even fdg ',
    descriptionUrl: 'https:\\ya.ru',
    type: 'codewars',
    timeZone: '+3',
    dateTime: 1604966266489,
    place: '',
    comment: 'test comment^js',
    deadline: 1605966266489,
    isOpen: true,
  },
  {
    id: '8',
    name: 'task8',
    description: 'test 8 even fdg ',
    descriptionUrl: 'https:\\aya.ru',
    type: 'task',
    timeZone: '+3',
    dateTime: 1604566266489,
    place: '',
    comment: 'test comment^html',
    deadline: 1605566266489,
    isOpen: false,
  },
];

const tasks = addDeadlineEvents(fakeScheduleTasks);

const App = (): React.ReactElement => {
  return (
    <Provider settings={settings}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
                <ControlPanel />
                <ScheduleTable data={tasks} />
              </ErrorBoundary>
            )}
          />
          <Route path="/task/:id" component={EventPage} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
