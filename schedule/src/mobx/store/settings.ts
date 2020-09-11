import { observable, configure, decorate, action } from 'mobx';

import { ISettings, IColumnFilter } from '../../interfaces/settings/settings';
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
    tasks: false,
    tests: false,
  },
  columnsFilter: {
    info: true,
    type: true,
    date: true,
    taskName: true,
    hours: true,
    lastTime: true,
    organizer: true,
    place: true,
    additional: true,
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

  setColumnFilter = (columnFilter: IColumnFilter) => {
    this.settings.columnsFilter = columnFilter;
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
