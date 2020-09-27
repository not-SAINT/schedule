import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Table, Tag, Tooltip } from 'antd';
import { InfoCircleOutlined, BulbTwoTone, ClockCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import TaskUrlIco from '../TaskUrlIco';
import { IEvent } from '../../interfaces/serverData/serverData';
import { NOTIFICATION_PERIOD, PERIOD_IN_DAYS, SCHEDULE_PAGE_SIZE } from '../../constants/settings';
import {
  getTimeLeft,
  getSpecTags,
  getTagColorByEventType,
  getPlaceObject,
  getFormatDate,
} from '../../helpers/schedule-utils';
import useStores from '../../mobx/context';

import style from './ScheduleTable.module.scss';

interface IScheduleTable {
  data: IEvent[];
}

const ScheduleTable = ({ data }: IScheduleTable): React.ReactElement => {
  const { Column } = Table;
  const currentTime = Date.now();
  const {
    settings: {
      settings: { columnsFilter, isHideOldEvents, isEditModeOn, timeZone },
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
      >
        {columnsFilter.lastUpdated && (
          <Column
            title={() => (
              <Tooltip title={`Did event update last ${PERIOD_IN_DAYS} days?`}>
                <InfoCircleOutlined />
              </Tooltip>
            )}
            dataIndex="lastUpdatedDate"
            key="lastUpdatedDate"
            render={(lastUpdatedDate) => (
              <Tooltip title={`Last event update: ${getFormatDate(lastUpdatedDate, timeZone)}`}>
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
          render={(dateTime: number) => getFormatDate(dateTime, timeZone)}
          width="9%"
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
              <Tooltip title={`Deadline: ${getFormatDate(deadline, timeZone)}`}>
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
