import { IEvent } from '../interfaces/serverData/serverData';

export const DEFAULT_TIMEZONE = 180;
export const LOCAL_SETTINGS = 'scheduleSettingsTeam34';
export enum ScheduleView {
  Table,
  List,
  Calendar,
}
export const COUNT_VIEW_MODES = 3;
export const SCHEDULE_PAGE_SIZE = 50;

export const EVENT_TYPES = [
  'code jam',
  'codewars',
  'cross-check',
  'interview',
  'review',
  'self education',
  'special',
  'task',
  'test',
  'webinar',
] as const;

export const SPECIAL_EVENT_TAGS = [
  'optional',
  'live',
  'record',
  'js',
  'node.js',
  'react',
  'angular',
  'css',
  'html',
  'git',
  'markdown',
  'task',
  'test',
];

export type TaskType = typeof EVENT_TYPES[number];

export const DEADLINE = 'deadline';
export const EVENT_PALETTE = {
  'code jam': 'lime',
  codewars: 'magenta',
  'cross-check': 'blue',
  deadline: 'red',
  interview: 'orange',
  review: 'yellow',
  'self education': 'cyan',
  special: 'gold',
  task: 'green',
  test: 'volcano',
  webinar: 'purple',
};

export const PERIOD_IN_DAYS = 7;
export const NOTIFICATION_PERIOD = PERIOD_IN_DAYS * 24 * 3600 * 1000;
export const DEFAULT_ZOOM = 10;
export const YANDEX_KEY = '9d0214b0-7d03-4e6b-9632-373c90a90e0c';
export const FEEDBACK_LENGTH = 150;
export const DEFAULT_PLACE = {
  placeName: 'Minsk',
  lat: 53.9,
  lng: 27.566,
};
export const EVENT_TEMPLATE = {
  id: `${Date.now()}`,
  name: 'new task',
  description: '',
  descriptionUrl: '',
  type: 'task',
  specialTags: '',
  timeZone: '',
  dateTime: Date.now(),
  place: '',
  comment: '',
  deadline: Date.now(),
  hours: '',
  lastUpdatedDate: 0,
  isOpen: false,
  isFeedbackEnabled: false,
} as IEvent;

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm';

export const COURSE_TYPES = ['RS2020Q1', 'RS2020Q3', 'React2020Q1', 'React2020Q3', 'NodeJS2020Q3'] as const;
