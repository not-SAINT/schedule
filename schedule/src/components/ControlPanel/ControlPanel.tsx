import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { Col, Row, Collapse, Select, Typography, Button } from 'antd';

import { COURSE_TYPES, EVENT_TEMPLATE, ScheduleView } from '../../constants/settings';
import ScheduleViewMode from '../ScheduleViewMode';
import Switcher from '../Switcher/Switcher';
import ExportAsPdf from '../ExportAsPdf';
import Selector from '../Selector/Selector';
import useStores from '../../mobx/context';

import styles from './ControlPanel.module.scss';

const ControlPanel = observer(({ refSchedule }: { refSchedule: any }) => {
  const { Panel } = Collapse;
  const { Option } = Select;
  const { Text } = Typography;
  const { settings } = useStores();
  const { isEditModeOn, isHideOldEvents, tasksFilter, columnsFilter, course, viewMode, timeZone } = settings.settings;
  const {
    toggleEditModeSwitcher,
    toggleHideOldEvents,
    setTaskFilter,
    setColumnFilter,
    setCourse,
    setTimeZone,
  } = settings;

  const colClasses = classNames('gutter-row', styles.ControlPanel__element);
  const oldEventsText = isHideOldEvents ? 'Hide old events' : 'Show old events';
  const editText = isEditModeOn ? 'Edit: on' : 'Edit: off';

  const event = EVENT_TEMPLATE;
  const isAddNewEvent = true;
  const isTableView = viewMode === ScheduleView.Table;

  const onChangeTimeZone = (value: number) => {
    setTimeZone(value);
  };

  return (
    <div className={styles.ControlPanel}>
      <Row align="middle" gutter={[16, 8]}>
        <Col className={colClasses} span={6}>
          <ScheduleViewMode />
        </Col>

        {isTableView && (
          <>
            <Col className={colClasses} span={6}>
              <Switcher text={oldEventsText} callback={toggleHideOldEvents} isEnable={isHideOldEvents} />
            </Col>

            <Col className={colClasses} span={6}>
              <Switcher text={editText} callback={toggleEditModeSwitcher} isEnable={isEditModeOn} />
            </Col>
            {isEditModeOn && (
              <Col className={colClasses} span={6}>
                <Button type="primary">
                  <Link to={{ pathname: `/task/${event.id}`, state: { event, isAddNewEvent } }}>Add new event</Link>
                </Button>
              </Col>
            )}

            <Col>
              <Select defaultValue={timeZone} style={{ width: 230 }} onChange={onChangeTimeZone}>
                <Option value={+1}>(GMT+1)London</Option>
                <Option value={+2}>(GMT+2)Warsaw</Option>
                <Option value={+3}>(GMT+4)Minsk, Kiev, Moscow</Option>
                <Option value={+4}>(GMT+4)Volgograd, Tbilisi</Option>
                <Option value={+5}>(GMT+5)Yekateringurg, Tashkent</Option>
              </Select>
            </Col>
            <Row>
              <Col>
                <ExportAsPdf label=".pdf" orientation="portrait" ref={refSchedule} />
              </Col>
            </Row>
          </>
        )}
      </Row>
      {isTableView && (
        <Collapse ghost>
          <Panel header="Filters" key="1">
            <Row gutter={[16, 8]}>
              <Col className={colClasses}>
                <Text strong>{'Course: '}</Text>
                <Select showSearch onChange={setCourse} style={{ width: '150px' }} defaultValue={course}>
                  {COURSE_TYPES.map((tag: string) => (
                    <Option key={tag} value={tag}>
                      {tag}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row gutter={[16, 8]}>
              <Col className={colClasses}>
                <Text strong>{'Tasks: '}</Text>
                <Selector titles={tasksFilter} callback={setTaskFilter} placeholder="Select events type" />
              </Col>
            </Row>
            <Row>
              <Col className={colClasses}>
                <Text strong>{'Columns: '}</Text>
                <Selector titles={columnsFilter} callback={setColumnFilter} placeholder="Select columns" />
              </Col>
            </Row>
          </Panel>
        </Collapse>
      )}
    </div>
  );
});

export default ControlPanel;
