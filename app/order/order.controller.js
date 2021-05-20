import ModelOrder from './order.model.js';
import ViewOrder from './order.view.js';
import Publisher from '../pub-sub.js';

export default class ControllerOrder {
  constructor() {
    this.publisher = new Publisher();
    this.model = new ModelOrder();
    this.view = new ViewOrder(e => this.handlerActions(e), () => this.handleForm());

    this.publisher.subscribe('makeOrder', data => this.showOrder(data));
  }

  showOrder(data) {
    this.model.order = data;
    this.view.render(data);
  }

  removeOrder() {
    this.model.clear();
    this.view.closeOrder();
  }

  handlerActions(e) {
    if (e.key == 'Escape' || e.target.dataset.dismiss == 'modal') {
      this.view.closeOrder();
    }
  }

  handleForm() {
    if (this.view.formIsValid()) {
      this.model.customer = this.view.getCustomerData();

      this.publisher.publish('confirmOrder', {
        order: this.model.order,
        customer: this.model.customer
      });
      this.removeOrder();
    }
  }
}