import React, { useRef } from 'react';
import { Provider } from 'mobx-react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import ErrorFallback from './components/ErrorFallback';
import EventPage from './components/EventPage';
import ControlPanel from './components/ControlPanel';
import Schedule from './components/Schedule';
import Settings from './mobx/store/settings';
import Events from './mobx/store/events';
import Organizers from './mobx/store/organizers';

import 'antd/dist/antd.css';
import './App.css';

const settings = new Settings();
const events = new Events();
const organizers = new Organizers();

const App = (): React.ReactElement => {
  const scheduleRef = useRef<HTMLDivElement>(null);

  return (
    <Provider settings={settings} events={events} organizers={organizers}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
                <ControlPanel refSchedule={scheduleRef} />
                <div ref={scheduleRef}>
                  <Schedule />
                </div>
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
