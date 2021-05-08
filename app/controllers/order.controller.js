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
    $('#modalOrder').modal('hide');
  }
}