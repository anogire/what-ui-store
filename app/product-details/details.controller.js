import ModelDetails from './details.model.js';
import ViewDetails from './details.view.js';
import Publisher from '../pub-sub.js';

export default class ControllerDetails {
  constructor() {
    this.publisher = new Publisher();
    this.model = new ModelDetails();
    this.view = new ViewDetails(e => this.handlerActions(e));

    this.publisher.subscribe('showDetails', data => this.load(data));

  }

  load(data) {
    this.model.data = data;
    this.view.render(data);
  }

  handlerActions(e) {
    if (e.target.dataset.add_to_cart) {
      this.publisher.publish('addToCart', this.model.data);
    }
    if (e.key == "Escape" || e.target.dataset.dismiss == "modal" || e.target.dataset.add_to_cart) {
      this.view.modalClose();
    }
  }

}