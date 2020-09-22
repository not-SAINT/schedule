const TEAM_ID = '34';

export const urls = {
  getAllEvents: (): string => `https://rs-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/events`,
  addNewEvent: (): string => `https://rs-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/event`,
  getEventById: (eventId: string): string =>
    `https://rs-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/event/${eventId}`,
  updateExistingEvent: (eventId: string): string =>
    `https://rs-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/event/${eventId}`,
  deleteEventById: (eventId: string): string =>
    `https://re-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/event/${eventId}`,
  getAllOrganizers: (): string => `https://rs-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/organizers`,
  addNewOrganizer: (): string => `https://rs-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/organizer`,
  getOrganizerById: (organizerId: string): string =>
    `https://rs-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/organizer/${organizerId}`,
  updateExistingOrganizer: (organizerId: string): string =>
    `https://rs-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/organizer/${organizerId}`,
  deleteOrganizerById: (organizerId: string): string =>
    `https://rs-react-schedule.firebaseapp.com/api/team/${TEAM_ID}/organizer/${organizerId}`,
};

export const ORGANIZER_URL = 'https://app.rs.school/profile?githubId=';
