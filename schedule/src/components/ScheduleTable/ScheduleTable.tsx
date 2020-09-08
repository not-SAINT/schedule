import React from 'react';
import { Table, Tag, Tooltip } from 'antd';
import { InfoCircleOutlined, BulbTwoTone } from '@ant-design/icons';

import { IEvent } from '../../interfaces/serverData/serverData';
import style from './ScheduleTable.module.scss';

const { Column } = Table;

interface IScheduleTable {
  data: IEvent[];
}

const ScheduleTable: React.FC<IScheduleTable> = ({ data }: IScheduleTable): React.ReactElement => {
  const getTimeLeft = (deadline: string): string => {
    const currentTime = Date.now();
    const deadlineTime = +deadline;
    const timeLeft = deadlineTime - currentTime;
    const daysLeft = Math.trunc(timeLeft / 1000 / 3600 / 24);

    if (deadline === '') {
      return '';
    }

    if (timeLeft < 0) {
      return 'Expired';
    }

    if (daysLeft >= 1) {
      return `Days left: ${daysLeft}`;
    }

    return `Hours left: ${Math.trunc(timeLeft / 1000 / 3600)}`;
  };

  // const getTagColorByEventType = (type: string): string => {};

  return (
    <div className={style.ScheduleTable}>
      {/* <Tooltip title="prompt text" color="blue">
        <Button type="primary">Primary Button</Button>
      </Tooltip> */}
      <Table dataSource={data} rowKey="uid" rowClassName={() => style['ScheduleTable--disabled-row']}>
        <Column
          title={() => (
            <Tooltip title="Did event update?">
              <InfoCircleOutlined />
            </Tooltip>
          )}
          dataIndex="isEdited"
          key="isEdited"
          render={(isEdited) => (isEdited ? <BulbTwoTone twoToneColor="red" /> : '')}
          width="5%"
        />
        <Column
          title="Date & time"
          dataIndex="dateTime"
          key="dateTime"
          render={(dateTime: number) => new Date(+dateTime).toLocaleString()}
          width="10%"
        />
        <Column
          title="Time left"
          dataIndex="deadline"
          key="timeLeft"
          width="10%"
          render={(deadline: string) => getTimeLeft(deadline)}
        />
        <Column title="Type" dataIndex="type" key="type" render={(type) => <Tag color="blue">{type}</Tag>} width="7%" />
        <Column title="Name" dataIndex="name" key="name" width="25%" />
        <Column
          title="Url"
          dataIndex="descriptionUrl"
          key="url"
          width="10%"
          render={(url) => {
            return url ? (
              <Tooltip placement="topLeft" title={url}>
                <a href={url} target="blank">
                  {url}
                </a>
              </Tooltip>
            ) : (
              ''
            );
          }}
          ellipsis
        />
        <Column title="Comment" dataIndex="comment" key="comment" width="10%" ellipsis />
        <Column title="Hours" dataIndex="hours" key="hours" width="6%" />
        <Column title="Organizer" dataIndex="organizer" key="organizer" width="10%" />
        <Column title="Place" dataIndex="place" key="place" width="10%" />
      </Table>
    </div>
  );
};

export default ScheduleTable;
