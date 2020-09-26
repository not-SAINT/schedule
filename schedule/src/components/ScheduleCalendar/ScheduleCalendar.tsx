import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Calendar, Space, Tag, Typography, Col, Tooltip } from 'antd';

import { getTagColorByEventType, getDateParts, getFormatTime } from '../../helpers/schedule-utils';
import { IEvent } from '../../interfaces/serverData/serverData';
import { TaskType } from '../../constants/settings';
import useStores from '../../mobx/context';

import style from './ScheduleCalendar.module.scss';

interface IScheduleCalendar {
  data: IEvent[];
}

const ScheduleCalendar = ({ data }: IScheduleCalendar): React.ReactElement => {
  const { Text } = Typography;
  const {
    settings: {
      settings: { timeZone },
    },
  } = useStores();

  const dateCellRender = (value: any) => {
    return (
      <>
        {data.map((item, index) => {
          const { day, month } = getDateParts(item.dateTime);
          const time = getFormatTime(item.dateTime, timeZone);
          const event = { ...item };
          const key = `${event.id}__${index}`;
          const color = getTagColorByEventType(item.type as TaskType);

          if (day !== value.date() || month !== value.month()) {
            return <></>;
          }

          return (
            <Space direction="vertical" key={key}>
              <Tooltip title={event.name}>
                <Link to={{ pathname: `/task/${event.id}`, state: { event } }}>
                  <Col>
                    <Text strong>{time}</Text>
                    {' - '}
                    <Tag color={color}>{event.type}</Tag>
                  </Col>
                </Link>
              </Tooltip>
            </Space>
          );
        })}
      </>
    );
  };

  return <Calendar className={style.Calendar} dateCellRender={dateCellRender} />;
};

export default observer(ScheduleCalendar);
