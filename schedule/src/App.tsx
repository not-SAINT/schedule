import React from 'react';
import { Provider } from 'mobx-react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import ErrorFallback from './components/ErrorFallback';
import EventPage from './components/EventPage';
import ControlPanel from './components/ControlPanel';
import Schedule from './components/Schedule';
import Settings from './mobx/store/settings';
import Events from './mobx/store/events';

import 'antd/dist/antd.css';
import './App.css';

const settings = new Settings();
const events = new Events();

const App = (): React.ReactElement => {
  return (
    <Provider settings={settings} events={events}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
                <ControlPanel />
                <Schedule />
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
