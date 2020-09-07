import React, { useRef } from 'react';
import { Provider } from 'mobx-react';
import { ErrorBoundary } from 'react-error-boundary';

import Settings from './mobx/store/settings';
import Test from './components/Test/Test';
import ErrorFallback from './components/ErrorFallback';
import ExportAsPdf from './components/ExportAsPdf';
import './App.css';

const settings = new Settings();

const App = () => {
  const testRef = useRef(document.body);

  return (
    <Provider settings={settings}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        <ExportAsPdf ref={testRef} label=".pdf" orientation="l" />
        <Test />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
