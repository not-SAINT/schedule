import { ScheduleView } from '../../constants/settings';

export interface IColumnFilter {
  info: boolean;
  type: boolean;
  date: boolean;
  taskName: boolean;
  hours: boolean;
  lastTime: boolean;
  organizer: boolean;
  place: boolean;
  additional: boolean;
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
