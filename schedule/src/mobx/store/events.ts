import { observable, configure, decorate, action, runInAction } from 'mobx';

import server from '../../server/server';
import { IEvent } from '../../interfaces/serverData/serverData';
import { DEADLINE } from '../../constants/settings';

configure({ enforceActions: 'observed' });

const addDeadlineEvents = (data: IEvent[]): void => {
  const taskWithDeadline = data.filter(({ deadline }) => deadline > 0);

  taskWithDeadline.forEach((task: IEvent, index: number) => {
    data.push({
      ...task,
      dateTime: task.deadline,
      type: DEADLINE,
      id: `${Date.now() + index}`,
    });
  });
};

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

      addDeadlineEvents(allEvents);
      runInAction(() => {
        this.events = allEvents;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e;
      });
    }
  }

  assimilateEvent(event: IEvent) {
    runInAction(() => {
      if (this.events !== null) {
        this.events = this.events.filter((el) => el.id !== event.id);
        this.events.push(event);
      } else {
        this.events = [event];
      }
    });
  }

  delEventById(id: string) {
    runInAction(() => {
      if (this.events !== null) {
        this.events = this.events.filter((el) => el.id !== id);
      }
    });
  }
}

decorate(Events, {
  events: observable,
  getEvents: action.bound,
  assimilateEvent: action.bound,
  delEventById: action.bound,
});

export default Events;
