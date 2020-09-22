import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Table, Tag, Tooltip } from 'antd';
import { InfoCircleOutlined, BulbTwoTone, ClockCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import TaskUrlIco from '../TaskUrlIco';
import { IEvent } from '../../interfaces/serverData/serverData';
import { NOTIFICATION_PERIOD, SCHEDULE_PAGE_SIZE } from '../../constants/settings';
import { getTimeLeft, getSpecTags, getTagColorByEventType, getPlaceObject } from '../../helpers/schedule-utils';
import useStores from '../../mobx/context';

import style from './ScheduleTable.module.scss';

interface IScheduleTable {
  data: IEvent[];
}

const ScheduleTable = ({ data }: IScheduleTable): React.ReactElement => {
  const [selectedRows, setSelectRowKeys] = useState([] as string[] | number[]);
  const { Column } = Table;
  const currentTime = Date.now();
  const {
    settings: {
      settings: { columnsFilter, isHideOldEvents, isEditModeOn },
    },
  } = useStores();

  let dataSource = isHideOldEvents ? data.filter(({ dateTime }) => dateTime >= currentTime) : data;

  dataSource = !isEditModeOn ? dataSource.filter(({ isOpen }) => isOpen && !isEditModeOn) : dataSource;

  const rowClasses = (dateTime: number, isOpen: boolean): string => {
    return classNames(
      { [style['ScheduleTable--disabled-row']]: dateTime < currentTime },
      { [style['ScheduleTable--closed-row']]: !isOpen },
    );
  };

  const onSelectRows = (selectedRowKeys: any) => {
    setSelectRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRows,
    columnWidth: '25px',
    onChange: onSelectRows,
  };

  const renderSpecialTags = (specialTags: string): React.ReactFragment => {
    const tags = getSpecTags(specialTags);

    if (tags === undefined) {
      return '';
    }

    return (
      <>
        {tags.map((tag: string) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </>
    );
  };

  return (
    <div className={style.ScheduleTable}>
      <Table
        dataSource={dataSource}
        rowKey={(record) => record.id}
        rowClassName={({ dateTime, isOpen }) => rowClasses(dateTime, isOpen)}
        pagination={{ hideOnSinglePage: true, pageSize: SCHEDULE_PAGE_SIZE }}
        rowSelection={rowSelection}
      >
        {columnsFilter.lastUpdated && (
          <Column
            title={() => (
              <Tooltip title="Did event update this week?">
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
        )}
        <Column
          title="Date & time"
          dataIndex="dateTime"
          key="dateTime"
          render={(dateTime: number) => new Date(dateTime).toLocaleString()}
          width="10%"
          sorter={(a: IEvent, b: IEvent) => b.dateTime - a.dateTime}
          sortDirections={['descend', 'ascend']}
          defaultSortOrder="descend"
        />
        {columnsFilter.timeLeft && (
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
        )}
        <Column
          title="Type"
          dataIndex="type"
          key="type"
          render={(type) => <Tag color={getTagColorByEventType(type)}>{type.toUpperCase()}</Tag>}
          width="10%"
        />
        {columnsFilter.special && (
          <Column
            title="Special"
            dataIndex="specialTags"
            key="special"
            render={(specialTags) => renderSpecialTags(specialTags)}
          />
        )}
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          width="25%"
          render={(name, row: IEvent) => {
            const event = { ...row };
            const isAddNewEvent = false;

            return <Link to={{ pathname: `/task/${event.id}`, state: { event, isAddNewEvent } }}>{name}</Link>;
          }}
        />
        {columnsFilter.url && (
          <Column
            title="Url"
            dataIndex="descriptionUrl"
            key="url"
            width="5%"
            render={(url) => {
              return url ? (
                <Tooltip placement="topLeft" title={url}>
                  <a href={url} target="blank">
                    <TaskUrlIco url={url} />
                  </a>
                </Tooltip>
              ) : (
                ''
              );
            }}
            ellipsis
          />
        )}
        {columnsFilter.hours && (
          <Column
            title={() => (
              <Tooltip title="Event duration (hours)">
                <ClockCircleOutlined />
              </Tooltip>
            )}
            dataIndex="hours"
            key="hours"
            width="6%"
          />
        )}
        {columnsFilter.organizer && <Column title="Organizer" dataIndex="organizer" key="organizer" width="10%" />}
        {columnsFilter.place && (
          <Column
            title="Place"
            dataIndex="place"
            key="place"
            width="10%"
            render={(place) => {
              if (!place) {
                return '';
              }

              const { placeName, lat, lng } = getPlaceObject(place);

              return (
                <Tooltip placement="topLeft" title={`Coords: ${lat};${lng}`}>
                  <span>{placeName}</span>
                </Tooltip>
              );
            }}
          />
        )}
      </Table>
    </div>
  );
};

export default observer(ScheduleTable);
