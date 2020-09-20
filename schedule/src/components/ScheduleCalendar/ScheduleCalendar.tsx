import React from 'react';
import { Calendar } from 'antd';

import { IEvent } from '../../interfaces/serverData/serverData';
import style from './ScheduleCalendar.module.scss';

interface IScheduleCalendar {
  data: IEvent[];
}

const getMin = (value: number) => {
  if (value < 10) {
    return `0${value}`;
  }
  return value;
};

const ScheduleCalendar = ({ data }: IScheduleCalendar): React.ReactElement => {
  const dataArray = data.map(({ descriptionUrl, type, dateTime, name }) => ({ descriptionUrl, type, dateTime, name }));

  const dateCellRender = (value: any) => {
    return (
      <ul className={style.Calendar__list}>
        {dataArray.map((item) => {
          const date = new Date(item.dateTime);
          const day = date.getDate();
          const month = date.getMonth();
          const hours = date.getHours();
          const minutes = date.getMinutes();
          if (day === value.date() && month === value.month()) {
            return (
              <li key={Math.random()} className={style.Calendar__list}>
                <a href={item.descriptionUrl} target="_blank" rel="noreferrer" title={item.type}>
                  {`${hours}:${getMin(minutes)} ${item.name}`}
                </a>
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
