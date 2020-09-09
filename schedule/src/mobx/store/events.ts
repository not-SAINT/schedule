import { observable, configure, decorate, action } from 'mobx';
import server from '../../server/server';
import { IEvent } from '../../interfaces/serverData/serverData';

configure({ enforceActions: 'observed' });

class Events {
  constructor() {
    this.events = null;
    this.error = null;
    this.getEvents();
  }

  events: IEvent[] | null;

  error: Error | null;

  async getEvents() {
    try {
      const allEvents = await server.getAllEvents();
      this.events = allEvents;
    } catch (e) {
      this.error = e;
    }
  }
}

decorate(Events, {
  events: observable,
  getEvents: action.bound,
});

export default Events;
