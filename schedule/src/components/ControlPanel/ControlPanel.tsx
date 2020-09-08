import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { Col, Row } from 'antd';

import useStores from '../../mobx/context';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import Switcher from '../Switcher/Switcher';
import styles from './ControlPanel.module.scss';
import Selector from '../Selector/Selector';

const ControlPanel = observer(() => {
  const { settings } = useStores();
  const { isEditModeOn, isHideOldEvents, tasksFilter } = settings.settings;
  const { toggleEditModeSwitcher, toggleHideOldEvents, setTaskFilter } = settings;

  const colClasses = classNames('gutter-row', styles.ControlPanel__element);

  return (
    <div className={styles.ControlPanel}>
      <Row gutter={[16, 24]}>
        <Col className={colClasses} span={6}>
          <PrimaryButton text="Add event" callback={() => {}} />
        </Col>
        <Col className={colClasses} span={6}>
          <Switcher text="Edit" callback={toggleEditModeSwitcher} isEnable={isEditModeOn} />
        </Col>
        <Col className={colClasses} span={6}>
          <Switcher text="Old tasks" callback={toggleHideOldEvents} isEnable={isHideOldEvents} />
        </Col>
        <Col className={colClasses} span={6}>
          <Selector titles={tasksFilter} callback={setTaskFilter} />
        </Col>
      </Row>
    </div>
  );
});

export default ControlPanel;
