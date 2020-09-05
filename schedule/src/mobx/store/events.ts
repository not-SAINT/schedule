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

  events: Array<IEvent> | null;

  error: Error | null;

  getEvents() {
    server.getAllEvents().then((response: Array<IEvent> | Error) => {
      if (response instanceof Error) {
        this.error = response;
      } else {
        this.events = response;
      }
    });
  }
}

decorate(Events, {
  events: observable,
  getEvents: action.bound,
});

export default Events;
