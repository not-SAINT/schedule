import { observable, configure, decorate, action } from 'mobx';

import { ISettings } from '../../interfaces/settings/settings';
import { ScheduleView, LOCAL_SETTINGS, DEFAULT_TIMEZONE } from '../../constants/settings';

configure({ enforceActions: 'observed' });

const initSettings: ISettings = {
  viewMode: ScheduleView.Table,
  timeZone: DEFAULT_TIMEZONE,
  isShowAddEventButton: false,
  course: 'RS',
  isHideOldEvents: false,
  isEditModeOn: false,
  tasksFilter: {
    'code jam': false,
    codewars: false,
    'cross-check': false,
    interview: false,
    review: false,
    'self education': false,
    special: false,
    task: false,
    test: false,
    deadline: false,
    webinar: false,
  },
  columnsFilter: {
    lastUpdated: true,
    timeLeft: true,
    special: true,
    comment: true,
    url: true,
    hours: true,
    organizer: true,
    place: true,
  },
};

class Settings {
  constructor() {
    this.settings = initSettings;
    this.getSettings();
  }

  settings: ISettings;

  getSettings = () => {
    const localSettings = localStorage.getItem(LOCAL_SETTINGS);
    if (localSettings !== null) {
      this.settings = JSON.parse(localSettings);
    }
  };

  setSettings = () => {
    localStorage.setItem(LOCAL_SETTINGS, JSON.stringify(this.settings));
  };

  setViewMode = (mode: ScheduleView) => {
    this.settings.viewMode = mode;
    this.setSettings();
  };

  setTimeZone = (newTimeZone: number) => {
    this.settings.timeZone = newTimeZone;
    this.setSettings();
  };

  setCourse = (course: string) => {
    this.settings.course = course;
    this.setSettings();
  };

  toggleHideOldEvents = () => {
    this.settings.isHideOldEvents = !this.settings.isHideOldEvents;
    this.setSettings();
  };

  toggleEditModeSwitcher = () => {
    this.settings.isEditModeOn = !this.settings.isEditModeOn;
    this.setSettings();
  };

  setTaskFilter = (taskFilter: string[]) => {
    Object.keys(this.settings.tasksFilter).forEach((taskType: string) => {
      this.settings.tasksFilter[taskType] = taskFilter.includes(taskType.toString());
    });
    this.setSettings();
  };

  setColumnFilter = (columnFilter: string[]) => {
    Object.keys(this.settings.columnsFilter).forEach((column: string) => {
      this.settings.columnsFilter[column] = columnFilter.includes(column.toString());
    });
    this.setSettings();
  };

  settingsReset = () => {
    this.settings = initSettings;
    this.setSettings();
  };
}

decorate(Settings, {
  settings: observable,
  getSettings: action.bound,
  setViewMode: action,
  setTimeZone: action,
  setCourse: action,
  toggleHideOldEvents: action,
  toggleEditModeSwitcher: action,
  setTaskFilter: action,
  setColumnFilter: action,
  settingsReset: action,
});

export default Settings;
