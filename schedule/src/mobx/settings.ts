import { observable, configure, decorate, action } from 'mobx';

import { ISettings, ITaskFilter, IColumnFilter } from '../interfaces/settings/settings';
import { ScheduleView, LOCAL_SETTINGS, DEFAULT_TIMEZONE } from '../constants/settings';

configure({ enforceActions: 'observed' });

const initSettings: ISettings = {
  viewMode: ScheduleView.Table,
  timeZone: DEFAULT_TIMEZONE,
  addEventButton: false,
  course: 'RS',
  hideOldEvents: false,
  editModeSwitcher: false,
  tasksFilter: {
    tasks: true,
    tests: true,
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

  getSettings() {
    const localSettings = localStorage.getItem(LOCAL_SETTINGS);
    if (localSettings !== null) {
      this.settings = JSON.parse(localSettings);
    }
  }

  setSettings() {
    localStorage.setItem('scheduleSettings', JSON.stringify(this.settings));
  }

  setViewMode(mode: ScheduleView) {
    this.settings.viewMode = mode;
    this.setSettings();
  }

  setTimeZone(newTimeZone: number) {
    this.settings.timeZone = newTimeZone;
    this.setSettings();
  }

  setCourse(course: string) {
    this.settings.course = course;
    this.setSettings();
  }

  toggleHideOldEvents() {
    this.settings.hideOldEvents = !this.settings.hideOldEvents;
    this.setSettings();
  }

  toggleEditModeSwitcher() {
    this.settings.editModeSwitcher = !this.settings.editModeSwitcher;
    this.setSettings();
  }

  setTaskFilter(taskFilter: ITaskFilter) {
    this.settings.tasksFilter = taskFilter;
    this.setSettings();
  }

  setColumnFilter(columnFilter: IColumnFilter) {
    this.settings.columnsFilter = columnFilter;
    this.setSettings();
  }

  settingsReset() {
    this.settings = initSettings;
    this.setSettings();
  }
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
