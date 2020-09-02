import { getRequest, postRequest, putRequest, deleteRequest } from '../helpers/fetch-utils';
import urls from '../constants/urls';

import { IEvent, IOrganizer, IAllEvents } from '../interfaces/serverData/sereverData';

const server = {
  getAllEvents: async (): Promise<Array<IEvent> | string> => {
    const url = urls.getAllEvents();
    const allEvents: IAllEvents | string = await getRequest(url);
    const events = typeof allEvents === 'string' ? allEvents : allEvents.data; // very bad line! imho
    return events;
  },

  addNewEvent: async (newEvent: IEvent): Promise<{ id: string }> => {
    const url = urls.addNewEvent();
    const response = await postRequest(url, JSON.stringify(newEvent));
    return response;
  },

  findEventById: async (eventId: string): Promise<IEvent> => {
    const url = urls.findEventById(eventId);
    const response = await getRequest(url);
    return response;
  },

  updateExistingEvent: async (eventId: string, newEvent: IEvent): Promise<{ id: string }> => {
    const url = urls.updateExistingEvent(eventId);
    const response = await putRequest(url, JSON.stringify(newEvent));
    return response;
  },

  deleteEventById: async (eventId: string): Promise<IEvent> => {
    const url = urls.deleteEventById(eventId);
    const response = await deleteRequest(url);
    return response;
  },

  getAllOrganizers: async (): Promise<Array<IOrganizer> | string> => {
    const url = urls.getAllOrganizers();
    const allOrganizers = await getRequest(url);
    return allOrganizers;
  },

  addNewOganizer: async (newOrganizer: IOrganizer) => {
    const url = urls.addNewOganizer();
    const response = await postRequest(url, JSON.stringify(newOrganizer));
    return response;
  },

  findOrganizerById: async (organizerId: string): Promise<IOrganizer> => {
    const url = urls.findOrganizerById(organizerId);
    const organizer = await getRequest(url);
    return organizer;
  },

  updateExistingOrganizer: async (organizerId: string, newOrganizer: IOrganizer) => {
    const url = urls.updateExistingOrganizer(organizerId);
    const response = await putRequest(url, JSON.stringify(newOrganizer));
    return response;
  },

  deleteOrganizerById: async (organizerId: string): Promise<{ id: string }> => {
    const url = urls.deleteOrganizerById(organizerId);
    const response = await deleteRequest(url);
    return response;
  },
};

export default server;
