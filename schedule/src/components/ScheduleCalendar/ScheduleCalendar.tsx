import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Space, Tag } from 'antd';

// import { getTagColorByEventType } from '../../helpers/schedule-utils';
import { IEvent } from '../../interfaces/serverData/serverData';
// import { TaskType } from '../../constants/settings';
import style from './ScheduleCalendar.module.scss';

interface IScheduleCalendar {
  data: IEvent[];
}

const getReadableFormat = (value: number) => {
  return String(value).padStart(2, '0');
};

const ScheduleCalendar = ({ data }: IScheduleCalendar): React.ReactElement => {
  const dateCellRender = (value: any) => {
    return (
      <ul className={style.Calendar__list}>
        {data.map((item) => {
          const date = new Date(item.dateTime);
          const day = date.getDate();
          const month = date.getMonth();
          const hours = date.getHours();
          const minutes = date.getMinutes();
          if (day === value.date() && month === value.month()) {
            return (
              <li key={Math.random()} className={style.Calendar__list}>
                <Space direction="vertical">
                  <div>
                    <Tag color="orange">{item.type}</Tag>
                    <Tag color="orange">{`${getReadableFormat(hours)}:${getReadableFormat(minutes)}`}</Tag>
                  </div>
                  <Link to={{ pathname: `/task/${item.id}`, state: { item } }}>{item.name}</Link>
                </Space>
              </li>
            );
          }
          return <></>;
        })}
      </ul>
    );
  };

  return (
    <div>
      <Calendar className={style.Calendar} dateCellRender={dateCellRender} />
    </div>
  );
};

export default ScheduleCalendar;
