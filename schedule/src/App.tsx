import React from 'react';
import { Provider } from 'mobx-react';
import { ErrorBoundary } from 'react-error-boundary';

import Settings from './mobx/store/settings';
import Test from './components/Test/Test';
import ErrorFallback from './components/ErrorFallback';
import './App.css';

const settings = new Settings();

const App = () => {
  return (
    <Provider settings={settings}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}
      >
        <Test />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
