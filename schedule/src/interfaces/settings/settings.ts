import { ScheduleView } from '../../constants/settings';

export interface IColumnFilter {
  lastUpdated: boolean;
  timeLeft: boolean;
  special: boolean;
  comment: boolean;
  url: boolean;
  hours: boolean;
  organizer: boolean;
  place: boolean;
}

export interface IFilter {
  [index: string]: boolean;
}
export interface ISettings {
  viewMode: ScheduleView;
  timeZone: number;
  isShowAddEventButton: boolean;
  course: string;
  isHideOldEvents: boolean;
  isEditModeOn: boolean;
  tasksFilter: IFilter;
  columnsFilter: IFilter;
}

export interface IPlace {
  placeName: string;
  lat: number;
  lng: number;
}
