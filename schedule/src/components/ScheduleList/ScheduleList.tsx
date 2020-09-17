import React from 'react';

import { IEvent } from '../../interfaces/serverData/serverData';

interface IScheduleList {
  data: IEvent[];
}

const ScheduleList = ({ data }: IScheduleList): React.ReactElement => {
  return <div>{`Schedule as LIST: count events ${data.length}`}</div>;
};

export default ScheduleList;
