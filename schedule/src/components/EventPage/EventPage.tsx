import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Row, Col, Tag, Typography, Divider, Button, Space, Popconfirm } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';

import Switcher from '../Switcher/Switcher';
import Map from '../Map';
import {
  getTagColorByEventType,
  getTimeLeft,
  checkEventOnMarkdownDescriptionUrl,
  convertEventUrlWithMakdown,
  getFeedback,
  getPlaceObject,
} from '../../helpers/schedule-utils';
import { FEEDBACK_LENGTH } from '../../constants/settings';
import useStores from '../../mobx/context';

import style from './EventPage.module.scss';

const EventPage: React.FC = ({ location: { state } }: any) => {
  const history = useHistory();
  const { Title, Text, Link, Paragraph } = Typography;
  const { event } = state;
  const {
    type,
    name,
    dateTime,
    deadline,
    description,
    descriptionUrl,
    place,
    comment,
    hours,
    isOpen,
    isFeedbackEnabled,
  } = event;
  const isEventOffline = place.length > 0;
  const hasEventMarkdownOnGithub = checkEventOnMarkdownDescriptionUrl(descriptionUrl);
  const feedback = getFeedback(comment);
  const { placeName, lat, lng } = getPlaceObject(place);

  const {
    settings: {
      settings: { isEditModeOn },
      toggleEditModeSwitcher,
    },
  } = useStores();

  const [eventName, setEventName] = useState(name);
  const [eventUrl, setEventUrl] = useState(descriptionUrl);
  const [eventOpen, setEventOpen] = useState(isOpen);
  const [eventDescription, setEventDescription] = useState('');
  const [isShowMap, setShowMap] = useState(isEventOffline);
  const [eventPlaceName, setEventPlaceName] = useState(placeName);
  const [eventPlaceCoords, setEventPlaceCoords] = useState(`${lat};${lng}`);
  const [isFeedbackNeeded, setFeedbackEnabled] = useState(isFeedbackEnabled);
  const [eventFeedback, setEventFeedback] = useState(
    `You can leave feedback here. Max length: ${FEEDBACK_LENGTH} symbols.`,
  );
  const [isEventEdited, setEventEdited] = useState(false);

  const editText = isEditModeOn ? 'Edit: on' : 'Edit: off';
  const openEventText = isEditModeOn ? 'Event visible' : 'Event hidden';
  const placeEventText = isShowMap ? 'Event online' : 'Event offline';
  const feedbackEventText = isFeedbackEnabled ? 'Enable feedback' : 'Disable feedback';
  const editEventName = isEditModeOn ? { onChange: setEventName } : false;
  const editEventUrl = isEditModeOn ? { onChange: setEventUrl } : false;
  const editEventPlaceName = isEditModeOn ? { onChange: setEventPlaceName } : false;
  const editEventPlaceCoords = isEditModeOn ? { onChange: setEventPlaceCoords } : false;

  useEffect(() => {
    if (name !== eventName) {
      console.log(eventName);
      setEventEdited(true);
    }
    if (descriptionUrl !== eventUrl) {
      console.log(eventUrl);
      setEventEdited(true);
    }
  }, [eventName, eventUrl, descriptionUrl, name]);

  useEffect(() => {
    if (hasEventMarkdownOnGithub) {
      fetch(convertEventUrlWithMakdown(descriptionUrl))
        .then((response) => response.text())
        .then((text) => setEventDescription(text));
    }
  }, [descriptionUrl, hasEventMarkdownOnGithub]);

  const toggleOpenEvent = () => {
    setEventOpen(!eventOpen);
  };

  const toggleEventPlace = () => {
    setShowMap(!isShowMap);
  };

  const toggleEventFeedback = () => {
    setFeedbackEnabled(!isFeedbackNeeded);
  };

  const onBackClick = () => {
    history.push('/');
  };

  const onSaveClick = () => {
    setEventEdited(false);
    console.log('Events saved!  Soon...');
  };

  const onSaveAsNewClick = () => {
    setEventEdited(false);
    console.log('Events saved as new!  Soon...');
  };

  return (
    <div className={style.EventPage}>
      <Row justify="space-between" align="middle" gutter={[16, 40]}>
        <Row gutter={[16, 8]} align="middle">
          <Col>
            <Switcher text={editText} callback={toggleEditModeSwitcher} isEnable={isEditModeOn} />
          </Col>
          {isEditModeOn && (
            <>
              <Col>
                <Switcher text={openEventText} callback={toggleOpenEvent} isEnable={eventOpen} />
              </Col>
              <Col>
                <Switcher text={placeEventText} callback={toggleEventPlace} isEnable={isShowMap} />
              </Col>
              <Col>
                <Switcher text={feedbackEventText} callback={toggleEventFeedback} isEnable={isFeedbackNeeded} />
              </Col>
              <Col>
                <Button onClick={onSaveClick} type="primary" disabled={!isEventEdited}>
                  Save
                </Button>
              </Col>
              <Col>
                <Button onClick={onSaveAsNewClick} type="primary" disabled={!isEventEdited}>
                  Save as new
                </Button>
              </Col>
            </>
          )}
        </Row>

        {isEventEdited && (
          <Popconfirm
            placement="leftBottom"
            title="Exit without save?"
            onConfirm={onBackClick}
            okText="Yes"
            cancelText="No"
          >
            <Button shape="circle" icon={<CloseOutlined />} />
          </Popconfirm>
        )}
        {!isEventEdited && <Button shape="circle" icon={<CloseOutlined />} onClick={onBackClick} />}
      </Row>
      <Row justify="space-between" align="middle" gutter={[16, 24]}>
        <Col span={4} flex="100px">
          <Tag color={getTagColorByEventType(type)}>{type}</Tag>
        </Col>
        <Col span={8} flex="auto">
          <Title editable={editEventName} style={{ textAlign: 'center' }}>
            {eventName}
          </Title>
        </Col>
        <Col span={8} flex="220px">
          <Text strong>{`Start: ${new Date(dateTime).toLocaleString()}`}</Text>
        </Col>
      </Row>
      <Row justify="space-between" align="middle" gutter={[16, 24]}>
        <Col span={4}>
          <Text strong>{`Hours: ${hours}`}</Text>
        </Col>
        <Col span={8}>
          <Text strong style={{ textAlign: 'center' }}>
            Organizer: ................
          </Text>
        </Col>
        <Col span={8} flex="220px">
          <Text strong>{`Deadline: ${new Date(deadline).toLocaleString()}`}</Text>
        </Col>
      </Row>
      <Row justify="space-between" align="middle" gutter={[16, 24]}>
        <Col span={4}>
          <Text strong>{getTimeLeft(deadline)}</Text>
        </Col>
        <Col span={20}>
          {!isEditModeOn && (
            <Link editable={editEventUrl} href={eventUrl} target="_blank" style={{ textAlign: 'right' }}>
              Event link
            </Link>
          )}
          {isEditModeOn && (
            <Text strong editable={editEventUrl} style={{ textAlign: 'right' }}>
              {eventUrl}
            </Text>
          )}
        </Col>
      </Row>
      <Row justify="space-between" align="middle" gutter={[16, 24]}>
        <Col span={24}>
          {description && (
            <>
              <Divider orientation="left">Event description</Divider>
              <ReactMarkdown source={description} />
            </>
          )}
          {hasEventMarkdownOnGithub && (
            <div className={style['EventPage__event-container']}>
              <Divider orientation="left">Event detailed description</Divider>
              <ReactMarkdown source={eventDescription} />
            </div>
          )}
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        {isEditModeOn && feedback && (
          <>
            <Divider orientation="left">Feedback</Divider>
            <Space direction="vertical">{feedback && feedback.map((text) => <Text>{text}</Text>)}</Space>
          </>
        )}
        {!isEditModeOn && isFeedbackNeeded && (
          <>
            <Divider orientation="left">Feedback</Divider>
            <Paragraph editable={{ onChange: setEventFeedback, maxLength: 300 }}>{eventFeedback}</Paragraph>
          </>
        )}
      </Row>
      {isShowMap && (
        <Row justify="center" align="middle" gutter={[16, 24]}>
          <Divider orientation="center">Location</Divider>
          <Space direction="vertical">
            <Text editable={editEventPlaceName}>{eventPlaceName}</Text>
            <Text editable={editEventPlaceCoords}>{eventPlaceCoords}</Text>
            <div className={style['EventPage__map-container']}>
              <Map lat={+eventPlaceCoords.split(';')[0]} lng={+eventPlaceCoords.split(';')[1]} eventName={eventName} />
            </div>
          </Space>
        </Row>
      )}
    </div>
  );
};

export default observer(EventPage);
