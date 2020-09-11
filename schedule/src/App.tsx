import React from 'react';
import { Provider } from 'mobx-react';
import { ErrorBoundary } from 'react-error-boundary';

import Settings from './mobx/store/settings';
import Events from './mobx/store/events';
import ErrorFallback from './components/ErrorFallback';
import './App.css';

const settings = new Settings();
const events = new Events();

const App = () => {
  return (
    <Provider settings={settings} events={events}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        <div />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
