import { getRequest, postRequest, putRequest, deleteRequest } from '../helpers/fetch-utils';
import urls from '../constants/urls';

import { IEvent, IOrganizer, IAllEvents, IAllOrganizers } from '../interfaces/serverData/serverData';

const server = {
  getAllEvents: async (): Promise<IEvent[]> => {
    const url = urls.getAllEvents();
    const allEvents: IAllEvents = await getRequest<IAllEvents>(url);
    const events = allEvents.data;
    return events;
  },

  addNewEvent: async (newEvent: IEvent): Promise<{ id: string }> => {
    const url = urls.addNewEvent();
    const response = await postRequest<{ id: string }>(url, JSON.stringify(newEvent));
    return response;
  },

  getEventById: async (eventId: string): Promise<IEvent> => {
    const url = urls.getEventById(eventId);
    const response = await getRequest<IEvent>(url);
    return response;
  },

  updateExistingEvent: async (eventId: string, newEvent: IEvent): Promise<{ id: string }> => {
    const url = urls.updateExistingEvent(eventId);
    const response = await putRequest<{ id: string }>(url, JSON.stringify(newEvent));
    return response;
  },

  deleteEventById: async (eventId: string): Promise<{ id: string }> => {
    const url = urls.deleteEventById(eventId);
    const response = await deleteRequest<{ id: string }>(url);
    return response;
  },

  getAllOrganizers: async (): Promise<IOrganizer[]> => {
    const url = urls.getAllOrganizers();
    const allOrganizersRaw = await getRequest<IAllOrganizers>(url);
    const allOrganizers = allOrganizersRaw.data;
    return allOrganizers;
  },

  addNewOganizer: async (newOrganizer: IOrganizer): Promise<{ id: string }> => {
    const url = urls.addNewOrganizer();
    const response = await postRequest<{ id: string }>(url, JSON.stringify(newOrganizer));
    return response;
  },

  getOrganizerById: async (organizerId: string): Promise<IOrganizer> => {
    const url = urls.getOrganizerById(organizerId);
    const organizer = await getRequest<IOrganizer>(url);
    return organizer;
  },

  updateExistingOrganizer: async (organizerId: string, newOrganizer: IOrganizer): Promise<{ id: string }> => {
    const url = urls.updateExistingOrganizer(organizerId);
    const response = await putRequest<{ id: string }>(url, JSON.stringify(newOrganizer));
    return response;
  },

  deleteOrganizerById: async (organizerId: string): Promise<{ id: string }> => {
    const url = urls.deleteOrganizerById(organizerId);
    const response = await deleteRequest<{ id: string }>(url);
    return response;
  },
};

export default server;
