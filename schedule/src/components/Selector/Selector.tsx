import React from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';

const { Option } = Select;

interface ISelector {
  titles: { [index: string]: boolean };
  callback: (object: string[]) => void;
  placeholder: string;
}

const Selector = ({ titles, callback, placeholder }: ISelector): React.ReactElement => {
  const selectionTypes: JSX.Element[] = [];

  const defaultValuesMap = () => {
    const filters: string[] = [];
    Object.keys(titles).forEach((title: string) => {
      if (titles[title]) {
        filters.push(title);
      }
    });

    return filters;
  };

  Object.keys(titles).forEach((title) => {
    selectionTypes.push(
      <Option key={title} value={title}>
        {title}
      </Option>,
    );
  });

  const changeHandler = (actualTaskTypes: string[]) => {
    callback(actualTaskTypes);
  };

  return (
    <div style={{ minWidth: '250px' }}>
      <Select
        onChange={changeHandler}
        defaultValue={defaultValuesMap()}
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder={placeholder}
      >
        {selectionTypes}
      </Select>
    </div>
  );
};

export default Selector;
