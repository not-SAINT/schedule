import React from 'react';
import { Provider } from 'mobx-react';

import Settings from './mobx/settings';
import './App.css';
import Test from './components/Test/Test';

const settings = new Settings();

function App() {
  return (
    <Provider settings={settings}>
      <Test />
    </Provider>
  );
}

export default App;
