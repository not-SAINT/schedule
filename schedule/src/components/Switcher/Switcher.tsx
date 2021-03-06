import React from 'react';
import 'antd/dist/antd.css';
import { Space, Switch, Typography } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ISwitcher {
  text: string;
  callback: () => void;
  isEnable: boolean;
}

const Switcher = ({ text, isEnable, callback }: ISwitcher): React.ReactElement => {
  return (
    <Space direction="horizontal">
      <Switch
        onClick={callback}
        checked={isEnable}
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        defaultChecked
      />
      <Text strong>{text}</Text>
    </Space>
  );
};

export default Switcher;
