export interface ITaskFilter {
  tasks: boolean;
  tests: boolean;
}

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
  viewMode: string;
  timeZone: number;
  addEventButton: boolean;
  course: string;
  hideOldEvents: boolean;
  editModeSwitcher: boolean;
  tasksFilter: ITaskFilter;
  columnsFilter: IColumnFilter;
}
