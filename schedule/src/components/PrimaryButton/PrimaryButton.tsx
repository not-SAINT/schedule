import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

interface IPrimaryButton {
  text: string;
  callback: () => void;
}

const PrimaryButton = ({ text, callback }: IPrimaryButton) => {
  return (
    <Button onClick={callback} type="primary">
      {text}
    </Button>
  );
};

export default PrimaryButton;
