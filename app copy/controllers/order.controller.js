import ModelCart from '../models/cart.model.js';
import ModelOrder from '../models/order.model.js';
import { EventBus } from '../pub-sub.js';
import ViewOrder from '../views/order.view.js';


export default class ControllerOrder {

  constructor() {
    this.model = new ModelOrder();
    this.view = new ViewOrder();

    EventBus.subscribe('showOrder', this.showOrder.bind(this));
    EventBus.subscribe('confirmOrder', this.confirmOrder.bind(this));
  }

  showOrder() {
    this.view.showOrder(ModelCart._instance);
    $('#modalOrder').modal('show');
  }

  confirmOrder(params) {
    this.model.send(params);
    this.addToHistory(params.order);
    $('#modalOrder').modal('hide');
  }

  addToHistory(order) {
    const date = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    const key = date.toLocaleString("en", options);

    localStorage.setItem(key, JSON.stringify(order));
  }
}