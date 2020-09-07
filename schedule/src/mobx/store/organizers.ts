import { observable, configure, decorate, action } from 'mobx';
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
      this.organizers = allEvents;
    } catch (e) {
      this.error = e;
    }
  }
}

decorate(Organizers, {
  organizers: observable,
  getOrganizers: action.bound,
});

export default Organizers;
