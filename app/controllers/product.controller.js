import Model from '../models/product.model.js';
import View from '../views/product.view.js';
import { EventBus } from '../pub-sub.js';

export default class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();

    EventBus.subscribe('load', this.view.renderProducts.bind(this.view));
  }

  getAllProducts = () => {
    this.model.load();
    //.then(data => this.view.renderProducts(data));
  }




}
