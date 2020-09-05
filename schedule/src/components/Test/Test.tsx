import React from 'react';
import { observer, inject } from 'mobx-react';

const tes = (prop: any) => {
  prop.toggleHideOldEvents();
};

const Test = inject('settings')(
  observer(({ settings }: any) => {
    return (
      <>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div onClick={() => tes(settings)}>test</div>
      </>
    );
  }),
);

export default Test;
