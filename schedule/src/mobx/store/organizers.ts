import { observable, configure, decorate, action, runInAction } from 'mobx';
import server from '../../server/server';
import { IOrganizer } from '../../interfaces/serverData/serverData';

configure({ enforceActions: 'observed' });

class Organizers {
  constructor() {
    this.organizers = null;
    this.error = null;
    this.getOrganizers();
  }

  organizers: IOrganizer[] | null;

  error: Error | null;

  async getOrganizers() {
    try {
      const allEvents = await server.getAllOrganizers();
      runInAction(() => {
        this.organizers = allEvents;
      });
    } catch (e) {
      runInAction(() => {
        this.error = e;
      });
    }
  }
}

decorate(Organizers, {
  organizers: observable,
  getOrganizers: action.bound,
});

export default Organizers;
