import moment from 'moment';

import { EVENT_PALETTE, TaskType, DEADLINE, DEFAULT_PLACE, DATE_FORMAT } from '../constants/settings';
import { IEvent } from '../interfaces/serverData/serverData';
import { IPlace, IFilter } from '../interfaces/settings/settings';

export const getTimeLeft = (deadline: number): string => {
  const now = Date.now();
  const deadlineTime = deadline;
  const timeLeft = deadlineTime - now;
  const daysLeft = Math.trunc(timeLeft / 1000 / 3600 / 24);

  if (deadline === undefined || timeLeft < 0) {
    return '';
  }

  if (daysLeft >= 1) {
    return `Days left: ${daysLeft}`;
  }

  return `Hours left: ${Math.trunc(timeLeft / 1000 / 3600)}`;
};

export const getSpecTags = (specialTags: string): string[] | undefined => {
  if (!specialTags) {
    return undefined;
  }

  return specialTags.split(',');
};

export const getFeedback = (comment: string): string[] | '' => {
  const index = comment.indexOf('^');

  if (index === -1) {
    return '';
  }

  const feedback = comment.slice(0, index);

  return feedback.split('#');
};

export const getTagColorByEventType = (taskType: TaskType): string => {
  return EVENT_PALETTE[taskType];
};

export const addDeadlineEvents = (data: IEvent[]): IEvent[] => {
  const tasksWithDeadline = data.filter(({ deadline }) => deadline > 0);
  const deadlineVirtualTasks = tasksWithDeadline.map((task, index) => {
    return {
      ...task,
      dateTime: task.deadline,
      type: DEADLINE,
      id: `${Date.now() + index}`,
    };
  });

  return data.concat(deadlineVirtualTasks);
};

export const checkEventOnMarkdownDescriptionUrl = (descriptionUrl: string): boolean => {
  return descriptionUrl.includes('.md') && descriptionUrl.includes('github');
};

export const convertEventUrlWithMakdown = (descriptionUrl: string): string => {
  let result = descriptionUrl;

  if (descriptionUrl.includes('github.com') && descriptionUrl.includes('.md')) {
    result = result.replace('github.com', 'raw.githubusercontent.com');
    result = result.replace('blob/', '');
  }

  return result;
};

export const getPlaceObject = (place: string): IPlace => {
  const index = place.indexOf('^');
  const coords = place.slice(index + 1).split(',');

  if (index === -1 || coords.length < 2) {
    return DEFAULT_PLACE;
  }

  return {
    placeName: place.slice(0, index),
    lat: +coords[0].trim(),
    lng: +coords[1].trim(),
  };
};

export const filterEvents = (data: IEvent[], filter: IFilter): IEvent[] => {
  let events = data;

  const excludedEventTypes = Object.keys(filter).filter((type) => !filter[type]);

  excludedEventTypes.forEach((key) => {
    events = events.filter(({ type }) => type !== key);
    return events;
  });

  return events;
};

export const getEventDates = (eventDateTime: number, eventDeadline: number): string => {
  const text = `${new Date(eventDateTime).toLocaleString()}`;

  if (eventDeadline > 0) {
    return text.concat(` - ${new Date(eventDeadline).toLocaleString()}`);
  }

  return text;
};

export const getDateTime = (dateTime: number): moment.Moment => {
  return moment(moment(dateTime).format(DATE_FORMAT));
};

interface IDateParts {
  day: number;
  month: number;
  time: string;
}

export const getDateParts = (dateTime: number): IDateParts => {
  const date = new Date(dateTime);
  const day = date.getDate();
  const month = date.getMonth();
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return {
    day,
    month,
    time,
  };
};

export const getFormatDate = (dateNumb: number, timeZone: number) => {
  const date = new Date(dateNumb + timeZone * 3600 * 1000);
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const year = date.getUTCFullYear();
  const hour = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${month}.${day}.${year}${'\u00A0'}${hour}:${minutes}`;
};
