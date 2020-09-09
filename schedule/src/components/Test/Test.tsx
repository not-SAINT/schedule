import React from 'react';
import { observer } from 'mobx-react';

import useStores from '../../mobx/context';
import { ISettings } from '../../interfaces/settings/settings';

const tes = (settings: ISettings) => {
  console.log(settings.viewMode);
};

const Test = observer(() => {
  const { settings } = useStores();
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={() => tes(settings.settings)}>test</div>
    </>
  );
});

export default Test;
