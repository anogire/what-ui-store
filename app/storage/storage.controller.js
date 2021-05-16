import ModelStorage from './storage.model.js';
import ViewStorage from './storage.view.js';
import Publisher from '../pub-sub.js';

export default class ControllerOrder {
  constructor() {
    this.publisher = new Publisher();
    this.model = new ModelStorage();
    this.view = new ViewStorage(e => this.handlerActions(e), () => this.showHistory());

    this.publisher.subscribe('confirmOrder', data => this.addToStorage(data));
  }

  addToStorage(data) {
    this.model.history = data;
  }

  showHistory() {
    const data = this.model.history;
    this.view.render(data);
  }

  handlerActions(e) {
    if (e.key == "Escape" || e.target.dataset.dismiss == "modal") {
      this.view.closeHistory();
    }
  }
}