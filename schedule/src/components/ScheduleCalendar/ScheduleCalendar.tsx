import React from 'react';

import { IEvent } from '../../interfaces/serverData/serverData';

interface IScheduleCalendar {
  data: IEvent[];
}

const ScheduleCalendar = ({ data }: IScheduleCalendar): React.ReactElement => {
  return <div>{`Schedule as CALENDAR: count events ${data.length}`}</div>;
};

export default ScheduleCalendar;
