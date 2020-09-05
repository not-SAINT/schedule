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

  organizers: Array<IOrganizer> | null;

  error: Error | null;

  getOrganizers() {
    server.getAllOrganizers().then((response: Array<IOrganizer> | Error) => {
      if (response instanceof Error) {
        this.error = response;
      } else {
        this.organizers = response;
      }
    });
  }
}

decorate(Organizers, {
  organizers: observable,
  getOrganizers: action.bound,
});

export default Organizers;
