export const DEFAULT_TIMEZONE = 180;
export const LOCAL_SETTINGS = 'scheduleSettingsTeam34';
export enum ScheduleView {
  Table,
  List,
  Calendar,
}
export const COUNT_VIEW_MODES = 3;

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
  'node',
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

export const NOTIFICATION_PERIOD = 7 * 24 * 3600 * 1000;
export const DEFAULT_ZOOM = 10;
export const YANDEX_KEY = '9d0214b0-7d03-4e6b-9632-373c90a90e0c';
export const FEEDBACK_LENGTH = 150;
export const DEFAULT_PLACE = {
  placeName: 'Minsk',
  lat: 53.9,
  lng: 27.566,
};
