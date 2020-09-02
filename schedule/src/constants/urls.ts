const TEAM_ID = 'teamId';

const urls = {
  getAllEvents: (): string => `https://rs-react-schedule.firebaseapp.com/api/${TEAM_ID}/events`,
  addNewEvent: (): string => `https://rs-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/event`,
  findEventById: (eventId: string): string =>
    `https://rs-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/event/${eventId}`,
  updateExistingEvent: (eventId: string): string =>
    `https://rs-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/event/${eventId}`,
  deleteEventById: (eventId: string): string =>
    `https://re-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/event/${eventId}`,
  getAllOrganizers: (): string => `https://rs-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/organizers`,
  addNewOganizer: (): string => `https://rs-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/organizer`,
  findOrganizerById: (organizerId: string): string =>
    `https://rs-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/organizer/${organizerId}`,
  updateExistingOrganizer: (organizerId: string): string =>
    `https://rs-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/organizer/${organizerId}`,
  deleteOrganizerById: (organizerId: string): string =>
    `https://rs-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/organizer/${organizerId}`,
};

export default urls;
