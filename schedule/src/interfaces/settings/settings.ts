import { ScheduleView } from '../../constants/settings';

export interface IColumnFilter {
  lastUpdated: boolean;
  timeLeft: boolean;
  special: boolean;
  comment: boolean;
  url: boolean;
  hours: boolean;
  lastTime: boolean;
  organizer: boolean;
  place: boolean;
}

export interface ISettings {
  viewMode: ScheduleView;
  timeZone: number;
  isShowAddEventButton: boolean;
  course: string;
  isHideOldEvents: boolean;
  isEditModeOn: boolean;
  tasksFilter: { [index: string]: boolean };
  columnsFilter: IColumnFilter;
}
