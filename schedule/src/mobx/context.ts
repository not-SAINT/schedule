import React from 'react';
import { MobXProviderContext } from 'mobx-react';

const useStores = () => {
  return React.useContext(MobXProviderContext);
};

export default useStores;
