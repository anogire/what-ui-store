import ViewCategories from './categories.view.js';
import Publisher from '../pub-sub.js';

export default class ControllerCategories {
  constructor() {
    this.publisher = new Publisher();
    this.view = new ViewCategories(e => this.handlerActions(e));

    this.publisher.subscribe('loadData', data => this.load(data.categories));
  }

  load(data) {
    this.view.render(data);
  }

  handlerActions(e) {
    this.publisher.publish('getByCategory', { category: e.target.dataset.category });
  }

}