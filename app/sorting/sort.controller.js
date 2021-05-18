import ViewSort from './sort.view.js';
import Publisher from '../pub-sub.js';

export default class ControllerSort {
  constructor() {
    this.publisher = new Publisher();
    this.view = new ViewSort(e => this.handlerActions(e));

    this.publisher.subscribe('getSearch', () => this.view.clearSorting());
  }

  handlerActions(e) {
    this.publisher.publish('sortByPrice', { direction: e.target.value });
  }

}