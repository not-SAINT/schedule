import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { Col, Row, Collapse } from 'antd';

import ScheduleViewMode from '../ScheduleViewMode';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import Switcher from '../Switcher/Switcher';
import Selector from '../Selector/Selector';
import useStores from '../../mobx/context';

import styles from './ControlPanel.module.scss';

const ControlPanel = observer(() => {
  const { Panel } = Collapse;
  const { settings } = useStores();
  const { isEditModeOn, isHideOldEvents, tasksFilter, columnsFilter } = settings.settings;
  const { toggleEditModeSwitcher, toggleHideOldEvents, setTaskFilter, setColumnFilter } = settings;

  const colClasses = classNames('gutter-row', styles.ControlPanel__element);
  const oldEventsText = isHideOldEvents ? 'Hide old events' : 'Show old events';
  const editText = isEditModeOn ? 'Edit: on' : 'Edit: off';

  return (
    <div className={styles.ControlPanel}>
      <Row gutter={[16, 8]}>
        <Col className={colClasses} span={6}>
          <ScheduleViewMode />
        </Col>

        <Col className={colClasses} span={6}>
          <Switcher text={oldEventsText} callback={toggleHideOldEvents} isEnable={isHideOldEvents} />
        </Col>

        <Col className={colClasses} span={6}>
          <Switcher text={editText} callback={toggleEditModeSwitcher} isEnable={isEditModeOn} />
        </Col>
        {isEditModeOn && (
          <Col className={colClasses} span={6}>
            <PrimaryButton text="Add event" callback={() => {}} />
          </Col>
        )}
      </Row>

      <Collapse ghost>
        <Panel header="Filters" key="1">
          <Row gutter={[16, 8]}>
            <Col className={colClasses}>
              <Selector titles={tasksFilter} callback={setTaskFilter} placeholder="Select events type" />
            </Col>
          </Row>
          <Row>
            <Col className={colClasses}>
              <Selector titles={columnsFilter} callback={setColumnFilter} placeholder="Select columns" />
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </div>
  );
});

export default ControlPanel;
