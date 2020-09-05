import React from 'react';
import { Provider } from 'mobx-react';

import Settings from './mobx/store/settings';
import Test from './components/Test/Test';
import './App.css';

const settings = new Settings();

function App() {
  return (
    <Provider settings={settings}>
      <Test />
    </Provider>
  );
}

export default App;
