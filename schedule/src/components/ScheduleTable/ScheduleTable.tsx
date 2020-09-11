import React, { useState } from 'react';
import { Table, Tag, Tooltip } from 'antd';
import { InfoCircleOutlined, BulbTwoTone } from '@ant-design/icons';

import { IEvent } from '../../interfaces/serverData/serverData';
import { NOTIFICATION_PERIOD } from '../../constants/settings';
import { getTimeLeft, getSpecTags, getTagColorByEventType } from '../../helpers/schedule-utils';

import style from './ScheduleTable.module.scss';

const { Column } = Table;

interface IScheduleTable {
  data: IEvent[];
}

const ScheduleTable: React.FC<IScheduleTable> = ({ data }: IScheduleTable): React.ReactElement => {
  const [selectedRows, setSelectRowKeys] = useState([] as string[] | number[]);
  const currentTime = Date.now();

  const onSelectRows = (selectedRowKeys: any) => {
    setSelectRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRows,
    columnWidth: '25px',
    onChange: onSelectRows,
  };

  const renderSpecialTags = (comment: string): React.ReactFragment => {
    const tags = getSpecTags(comment);

    if (tags === '') {
      return '';
    }

    return (
      <>
        {tags.map((tag: string) => (
          <Tag key={tag}>{tag.toUpperCase()}</Tag>
        ))}
      </>
    );
  };

  return (
    <div className={style.ScheduleTable}>
      {/* <Tooltip title="prompt text" color="blue">
        <Button type="primary" onClick={onButtonClick}>
          Primary Button
        </Button>
      </Tooltip> */}
      <Table
        dataSource={data}
        rowKey={(record) => record.id}
        rowClassName={({ dateTime }) => {
          return +dateTime < currentTime ? style['ScheduleTable--disabled-row'] : '';
        }}
        pagination={{ hideOnSinglePage: true }}
        rowSelection={rowSelection}
      >
        <Column
          title={() => (
            <Tooltip title="Did event update?">
              <InfoCircleOutlined />
            </Tooltip>
          )}
          dataIndex="lastUpdatedDate"
          key="lastUpdatedDate"
          render={(lastUpdatedDate) => (
            <Tooltip title={`Last event update: ${new Date(lastUpdatedDate).toLocaleString()}`}>
              <span>
                {currentTime - lastUpdatedDate < NOTIFICATION_PERIOD ? <BulbTwoTone twoToneColor="red" /> : ''}
              </span>
            </Tooltip>
          )}
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
          render={(deadline: number) => (
            <Tooltip title={`Deadline: ${new Date(deadline).toLocaleString()}`}>
              <span>{getTimeLeft(deadline)}</span>
            </Tooltip>
          )}
        />
        <Column
          title="Type"
          dataIndex="type"
          key="type"
          render={(type) => <Tag color={getTagColorByEventType(type)}>{type}</Tag>}
          width="7%"
        />
        <Column
          title="Special"
          dataIndex="comment"
          key="special"
          render={(comment) => renderSpecialTags(comment)}
          width="9%"
        />
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
        <Column title="Hours" dataIndex="hours" key="hours" width="7%" />
        <Column title="Organizer" dataIndex="organizer" key="organizer" width="10%" />
        <Column title="Place" dataIndex="place" key="place" width="10%" />
      </Table>
    </div>
  );
};

export default ScheduleTable;
