import { observable, configure, decorate, action, runInAction } from 'mobx';
import server from '../../server/server';
import { IEvent } from '../../interfaces/serverData/serverData';

configure({ enforceActions: 'observed' });

const addDeadlineEvents = (data: IEvent[]): void => {
  const taskWithDeadline = data.filter(({ deadline }) => deadline > 0);
  taskWithDeadline.forEach((task: IEvent, index: number) => {
    data.push({
      ...task,
      dateTime: task.deadline,
      type: 'deadline',
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
}

decorate(Events, {
  events: observable,
  getEvents: action.bound,
});

export default Events;
