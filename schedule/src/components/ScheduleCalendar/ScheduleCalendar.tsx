import React from 'react';
import { Calendar } from 'antd';

import { IEvent } from '../../interfaces/serverData/serverData';

interface IScheduleCalendar {
  data: IEvent[];
}

function getListData(value: any) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [{ content: 'This is warning event.' }, { content: 'This is usual event.' }];
      break;
    case 10:
      listData = [
        { content: 'This is warning event.' },
        { content: 'This is usual event.' },
        { content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { content: 'This is warning event' },
        { content: 'This is very long usual event。。....' },
        { content: 'This is error event 1.' },
        { content: 'This is error event 2.' },
        { content: 'This is error event 3.' },
        { content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value: any) {
  console.log(value.month());
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map((item) => (
        <li key={item.content}>{item.content}</li>
      ))}
    </ul>
  );
}

const ScheduleCalendar = ({ data }: IScheduleCalendar): React.ReactElement => {
  console.log(data);
  return (
    <div>
      <Calendar dateCellRender={dateCellRender} />
    </div>
  );
};

export default ScheduleCalendar;
