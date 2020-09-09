export interface IEvent {
  id: string;
  name: string;
  description: string;
  descriptionUrl: string;
  type: string;
  timeZone: string;
  dateTime: string;
  place: string;
  comment: string;
  deadline?: string;
  hours?: string;
  isEdited?: boolean;
}

export interface IOrganizer {
  id: string;
  name: string;
}

export interface IAllEvents {
  data: Array<IEvent>;
}

export interface IAllOrganizers {
  data: Array<IOrganizer>;
}
