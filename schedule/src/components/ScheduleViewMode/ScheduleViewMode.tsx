import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Tooltip } from 'antd';
import { CalendarOutlined, TableOutlined, UnorderedListOutlined } from '@ant-design/icons';

import { COUNT_VIEW_MODES } from '../../constants/settings';
import useStores from '../../mobx/context';

const ScheduleViewMode = (): React.ReactElement => {
  const { settings } = useStores();
  const { viewMode } = settings.settings;
  const { setViewMode } = settings;

  const [scheduleViewMode, setScheduleViewMode] = useState(viewMode);

  let mode = null;
  let modeTooltip = '';

  switch (scheduleViewMode) {
    case 1:
      mode = <UnorderedListOutlined style={{ fontSize: '24px' }} />;
      modeTooltip = 'List';
      break;
    case 2:
      mode = <CalendarOutlined style={{ fontSize: '24px' }} />;
      modeTooltip = 'Calendar';
      break;
    default:
      mode = <TableOutlined style={{ fontSize: '24px' }} />;
      modeTooltip = 'Table';
      break;
  }

  const changeViewMode = () => {
    const newViewMode = (scheduleViewMode + 1) % COUNT_VIEW_MODES;

    setViewMode(newViewMode);
    setScheduleViewMode(newViewMode);
  };

  return (
    <Tooltip title={`View mode: ${modeTooltip}`}>
      <Button onClick={changeViewMode}>{mode}</Button>
    </Tooltip>
  );
};

export default observer(ScheduleViewMode);
