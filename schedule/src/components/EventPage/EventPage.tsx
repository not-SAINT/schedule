import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import {
  Row,
  Col,
  Tag,
  Typography,
  Divider,
  Button,
  Space,
  Popconfirm,
  Select,
  Tooltip,
  Input,
  DatePicker,
} from 'antd';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
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
  getSpecTags,
  getEventDates,
  getDateTime,
} from '../../helpers/schedule-utils';
import { FEEDBACK_LENGTH, SPECIAL_EVENT_TAGS, EVENT_TYPES, DATE_FORMAT, COURSE_TYPES } from '../../constants/settings';
import server from '../../server/server';
import { ORGANIZER_URL } from '../../constants/urls';
import { IEvent } from '../../interfaces/serverData/serverData';
import useStores from '../../mobx/context';

import style from './EventPage.module.scss';

const EventPage: React.FC = ({
  location: {
    state: { event, isAddNewEvent },
  },
}: any) => {
  const history = useHistory();
  const { Title, Text, Link, Paragraph } = Typography;
  const { Option } = Select;
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

  const {
    id,
    type,
    specialTags,
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
    organizerId,
    course,
  } = event;
  const isEventOffline = place.length > 0;
  const feedback = getFeedback(comment);
  const { placeName, lat, lng } = getPlaceObject(place);
  const placeCoords = lat !== 0 && lng !== 0 ? `${lat},${lng}` : '';
  const eventWithDeadline = deadline > 0;

  const {
    settings: {
      settings: { isEditModeOn },
      toggleEditModeSwitcher,
    },
  } = useStores();

  const [eventName, setEventName] = useState(name);
  const [eventType, setEventType] = useState(type);
  const [eventSpecialTags, setEventSpecialTags] = useState(specialTags);
  const [eventDateTime, setEventDateTime] = useState(dateTime);
  const [eventDeadline, setEventDeadline] = useState(deadline);
  const [eventDescription, setEventDescription] = useState(description);
  const [eventDetailedDescription, setEventDetailedDescription] = useState('');
  const [eventUrl, setEventUrl] = useState(descriptionUrl);
  const [isShowMap, setShowMap] = useState(isEventOffline);
  const [eventPlaceName, setEventPlaceName] = useState(placeName);
  const [eventPlaceCoords, setEventPlaceCoords] = useState(placeCoords);
  const [isFeedbackNeeded, setFeedbackEnabled] = useState(isFeedbackEnabled);
  const [hasDeadline, setHasDeadline] = useState(eventWithDeadline);
  const [eventFeedback, setEventFeedback] = useState(
    `You can leave feedback here. Max length: ${FEEDBACK_LENGTH} symbols.`,
  );
  const [eventHours, setEventHours] = useState(hours);
  const [eventOpen, setEventOpen] = useState(isOpen);
  const [isEventEdited, setEventEdited] = useState(false);
  const [eventOrganizerId, setEventOrganizer] = useState(organizerId);
  const [eventCourse, setEventCourse] = useState(course);

  const editText = isEditModeOn ? 'Edit: on' : 'Edit: off';
  const openEventText = isEditModeOn ? 'Event visible' : 'Event hidden';
  const placeEventText = isShowMap ? 'Event online' : 'Event offline';
  const feedbackEventText = isFeedbackEnabled ? 'Enable feedback' : 'Disable feedback';
  const deadlineEventText = hasDeadline ? 'With deadline' : 'Without deadline';
  const editEventName = isEditModeOn ? { onChange: setEventName } : false;
  const editEventUrl = isEditModeOn ? { onChange: setEventUrl } : false;
  const editOrganizer = isEditModeOn ? { onChange: setEventOrganizer } : false;
  const editEventPlaceName = isEditModeOn ? { onChange: setEventPlaceName } : false;
  const editEventPlaceCoords = isEditModeOn ? { onChange: setEventPlaceCoords } : false;
  const editEventHours = isEditModeOn ? { onChange: setEventHours } : false;
  const eventDateText = getEventDates(eventDateTime, eventDeadline);
  const splittedSpecialTags = getSpecTags(eventSpecialTags);
  const hasEventMarkdownOnGithub = checkEventOnMarkdownDescriptionUrl(eventUrl);

  useEffect(() => {
    if (
      !isEventEdited &&
      (name !== eventName ||
        descriptionUrl !== eventUrl ||
        dateTime !== eventDateTime ||
        deadline !== eventDeadline ||
        description !== eventDescription ||
        descriptionUrl !== eventUrl ||
        placeName !== eventPlaceName ||
        eventPlaceCoords !== `${lat},${lng}` ||
        isFeedbackEnabled !== isFeedbackNeeded ||
        type !== eventType ||
        specialTags !== eventSpecialTags ||
        organizerId !== eventOrganizerId ||
        course !== eventCourse ||
        isEventOffline !== isShowMap ||
        isOpen !== eventOpen)
    ) {
      setEventEdited(true);
    }
  }, [
    eventName,
    eventUrl,
    eventDateTime,
    eventDeadline,
    eventDescription,
    eventUrl,
    placeName,
    eventPlaceName,
    eventPlaceCoords,
    isFeedbackNeeded,
    eventType,
    eventSpecialTags,
    eventOrganizerId,
    eventCourse,
    isShowMap,
    eventOpen,
  ]);

  useEffect(() => {
    if (hasEventMarkdownOnGithub) {
      fetch(convertEventUrlWithMakdown(descriptionUrl))
        .then((response) => response.text())
        .then((text) => setEventDetailedDescription(text));
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

  const toggleHasDeadline = () => {
    setHasDeadline(!hasDeadline);

    if (hasDeadline) {
      setEventDeadline(0);
    } else {
      setEventDeadline(eventDateTime);
    }
  };

  const onBackClick = () => {
    history.push('/');
  };

  const saveEvent = (eventId = id) => {
    const hasNewPlace = eventPlaceName.length > 0 || eventPlaceCoords.length > 0;
    const newPlace = isShowMap && hasNewPlace ? `${eventPlaceName}^${eventPlaceCoords}` : '';

    return {
      id: eventId,
      type: eventType,
      specialTags: eventSpecialTags,
      name: eventName,
      dateTime: eventDateTime,
      deadline: eventDeadline,
      description: eventDescription,
      descriptionUrl: eventUrl,
      place: newPlace,
      comment: eventFeedback,
      hours: eventHours,
      isOpen: eventOpen,
      isFeedbackEnabled: isFeedbackNeeded,
      organizerId: eventOrganizerId,
      course: eventCourse,
      lastUpdatedDate: Date.now(),
    } as IEvent;
  };

  const onSaveClick = () => {
    const updatedEvent = saveEvent();

    server.updateExistingEvent(id, updatedEvent);
    setEventEdited(false);
  };

  const onSaveAsNewClick = () => {
    const newEventId = Date.now();
    const newEvent = saveEvent(newEventId);

    server.addNewEvent(newEvent);
    setEventEdited(false);
  };

  const onDeleteClick = () => {
    server.deleteEventById(id);
    history.push('/');
  };

  const onChangeSpecialTags = (value: any) => {
    setEventSpecialTags(`${value}`);
  };

  const onDescriptionChange = ({ target: { value } }: { target: { value: string } }) => {
    setEventDescription(value);
  };

  const onEventDatetimePicked = (value: any) => {
    setEventDateTime(value.valueOf());
  };

  const onEventRangeDatetimePicked = (value: any) => {
    setEventDateTime(value[0].valueOf());
    setEventDeadline(value[1].valueOf());
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
                <Switcher text={deadlineEventText} callback={toggleHasDeadline} isEnable={hasDeadline} />
              </Col>
              {isAddNewEvent && (
                <Col>
                  <Button onClick={onSaveAsNewClick} type="primary" disabled={!isEventEdited}>
                    Create new event
                  </Button>
                </Col>
              )}
              {!isAddNewEvent && (
                <>
                  <Col>
                    <Button onClick={onSaveClick} type="primary" disabled={!isEventEdited}>
                      Update
                    </Button>
                  </Col>
                  <Col>
                    <Button onClick={onSaveAsNewClick} type="primary" disabled={!isEventEdited}>
                      Create new as copy
                    </Button>
                  </Col>
                  <Col>
                    <Tooltip title="Delete event">
                      <Popconfirm
                        placement="leftBottom"
                        title="Are you sure you want to delete this event?"
                        onConfirm={onDeleteClick}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button shape="circle" icon={<DeleteOutlined />} />
                      </Popconfirm>
                    </Tooltip>
                  </Col>
                </>
              )}
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

      <Row justify="center" align="middle" gutter={[40, 8]}>
        <Col>
          <Title editable={editEventName}>{eventName}</Title>
        </Col>
      </Row>

      <Row justify="center" align="middle" gutter={[40, 16]}>
        {!isEditModeOn && (
          <Col>
            <Title level={3}>{eventDateText}</Title>
          </Col>
        )}
        {isEditModeOn && (
          <>
            {!hasDeadline && (
              <DatePicker
                showTime
                defaultValue={getDateTime(eventDateTime)}
                format={DATE_FORMAT}
                onOk={onEventDatetimePicked}
                allowClear={false}
              />
            )}
            {hasDeadline && (
              <RangePicker
                showTime
                defaultValue={[getDateTime(eventDateTime), getDateTime(eventDeadline)]}
                format={DATE_FORMAT}
                onOk={onEventRangeDatetimePicked}
                allowClear={false}
              />
            )}
          </>
        )}
      </Row>

      <Row justify="center" align="middle" gutter={[16, 16]}>
        <Col>
          {isEditModeOn && (
            <Select showSearch onChange={setEventCourse} style={{ width: '150px' }} defaultValue={eventCourse}>
              {COURSE_TYPES.map((tag: string) => (
                <Option key={tag} value={tag}>
                  {tag}
                </Option>
              ))}
            </Select>
          )}
          {!isEditModeOn && (
            <Tooltip title="GitHub username">
              <Text strong>{eventCourse}</Text>
            </Tooltip>
          )}
        </Col>
        <Col>
          {isEditModeOn && (
            <Select showSearch onChange={setEventType} style={{ width: '150px' }} defaultValue={eventType}>
              {EVENT_TYPES.map((tag: string) => (
                <Option key={tag} value={tag}>
                  {tag}
                </Option>
              ))}
            </Select>
          )}
          {!isEditModeOn && <Tag color={getTagColorByEventType(eventType)}>{eventType.toUpperCase()}</Tag>}
        </Col>

        {isEditModeOn && (
          <Select
            mode="tags"
            defaultValue={splittedSpecialTags}
            style={{ width: '50%' }}
            onChange={onChangeSpecialTags}
            tokenSeparators={[',']}
            allowClear
            placeholder="Add special tags for event if it needs"
          >
            {SPECIAL_EVENT_TAGS.map((tag: string) => (
              <Option key={tag} value={tag}>
                {tag}
              </Option>
            ))}
          </Select>
        )}
        {!isEditModeOn && splittedSpecialTags && (
          <Col>
            {splittedSpecialTags.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Col>
        )}
      </Row>

      <Row justify="center" align="middle" gutter={[24, 16]}>
        <Col>
          <Space>
            <Tooltip title="GitHub username">
              <Text strong style={{ textAlign: 'center' }}>
                {'Organizer: '}
              </Text>
            </Tooltip>

            {!isEditModeOn && eventOrganizerId && (
              <>
                <Link href={`${ORGANIZER_URL}${eventOrganizerId}`} target="_blank" style={{ textAlign: 'right' }}>
                  {eventOrganizerId}
                </Link>
              </>
            )}
            {isEditModeOn && (
              <Text strong editable={editOrganizer} style={{ textAlign: 'right' }}>
                {eventOrganizerId}
              </Text>
            )}
          </Space>
        </Col>
        <Col>
          <Space>
            <Text strong>{'Hours: '}</Text>
            <Text editable={editEventHours} strong>
              {eventHours}
            </Text>
          </Space>
        </Col>
        <Col>
          <Tooltip title={`Event deadline: ${new Date(eventDeadline).toLocaleString()}`}>
            <Text strong>{getTimeLeft(eventDeadline)}</Text>
          </Tooltip>
        </Col>
      </Row>

      <Row justify="center" align="middle" gutter={[16, 8]}>
        {!isEditModeOn && eventUrl && (
          <Link
            className={style['EventPage--link-text']}
            href={eventUrl}
            target="_blank"
            style={{ textAlign: 'right' }}
          >
            Event main link
          </Link>
        )}
        {isEditModeOn && (
          <div className={style['EventPage__event-paragraph']}>
            <Space>
              <Text strong>{'Event main link: '}</Text>
              <Text strong editable={editEventUrl} style={{ textAlign: 'right' }}>
                {eventUrl}
              </Text>
            </Space>
          </div>
        )}
      </Row>

      <Row justify="space-between" align="middle" gutter={[16, 24]}>
        {(eventDescription || isEditModeOn) && <Divider orientation="left">Event description</Divider>}
        {!isEditModeOn && eventDescription && <ReactMarkdown source={eventDescription} />}
        {isEditModeOn && (
          <>
            <div className={style['EventPage__event-paragraph']}>
              <TextArea
                onBlur={onDescriptionChange}
                placeholder="Enter event description (Markdown is supported and recommend)"
                autoSize={{ minRows: 3 }}
                defaultValue={eventDescription}
              />
            </div>
          </>
        )}

        {hasEventMarkdownOnGithub && (
          <div className={style['EventPage__event-container']}>
            <Divider orientation="left">Event detailed description</Divider>
            <ReactMarkdown source={eventDetailedDescription} />
          </div>
        )}
      </Row>
      <Row gutter={[24, 24]}>
        {isEditModeOn && feedback && (
          <>
            <Divider orientation="center">Feedback</Divider>
            <Space direction="vertical">
              {feedback.map((text) => (
                <Text>{text}</Text>
              ))}
            </Space>
          </>
        )}
        {!isEditModeOn && isFeedbackNeeded && (
          <>
            <Divider orientation="center">Feedback</Divider>
            <div className={style['EventPage__event-paragraph']}>
              <Paragraph
                editable={{
                  onChange: setEventFeedback,
                  maxLength: 300,
                  autoSize: { minRows: 3, maxRows: 7 },
                }}
              >
                {eventFeedback}
              </Paragraph>
            </div>
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
              <Map lat={+eventPlaceCoords.split(',')[0]} lng={+eventPlaceCoords.split(',')[1]} eventName={eventName} />
            </div>
          </Space>
        </Row>
      )}
    </div>
  );
};

export default observer(EventPage);
