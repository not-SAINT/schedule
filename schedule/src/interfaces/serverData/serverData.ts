export interface IEvent {
  id: string;
  name: string;
  description: string;
  descriptionUrl: string;
  type: string;
  timeZone: string;
  dateTime: number;
  place: string;
  comment: string;
  deadline: number;
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
