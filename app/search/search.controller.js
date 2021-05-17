import ViewSearch from './search.view.js';
import Publisher from '../pub-sub.js';

export default class ControllerSearch {
  constructor() {
    this.publisher = new Publisher();
    this.view = new ViewSearch(e => this.handlerActions(e));
  }

  handlerActions(product) {
    this.publisher.publish('searchByProductName', { value: product });
  }

}