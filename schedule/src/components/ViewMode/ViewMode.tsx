import React from 'react';
import 'antd/dist/antd.css';
import { Button, Space, Typography } from 'antd';
import { CalendarOutlined, TableOutlined, UnorderedListOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface IScheduleType {
  mode: number;
  callback: () => void;
}

const ScheduleType = ({ mode, callback }: IScheduleType): React.ReactElement => {
  let viewMode = null;
  if (mode === 0) {
    viewMode = <TableOutlined />;
  } else if (mode === 1) {
    viewMode = <UnorderedListOutlined />;
  } else {
    viewMode = <CalendarOutlined />;
  }
  return (
    <Space direction="horizontal">
      <Button onClick={callback}>
        <Text>View Mode:</Text>
        {viewMode}
      </Button>
    </Space>
  );
};

export default ScheduleType;
