import ModelCart from '../models/cart.model.js';
import { EventBus } from '../pub-sub.js';
import ViewCart from '../views/cart.view.js';


export default class ControllerCart {

  constructor(selector) {
    this.cart = new ModelCart();
    this.view = new ViewCart();

    selector.addEventListener('click', this.renderCart.bind(this));

    EventBus.subscribe('addToCart', this.cart.addToCart.bind(this.cart));
    EventBus.subscribe('incProductInCart', this.incProductInCart.bind(this));
    EventBus.subscribe('decProductInCart', this.decProductInCart.bind(this));
    EventBus.subscribe('removeFromCart', this.removeFromCart.bind(this));
  }

  renderCart() {
    this.view.showCart(this.cart.inner, this.cart.totalSum);
  }

  incProductInCart(params) {
    this.cart.plus(params.product);
    this.renderCart();
  }

  decProductInCart(params) {
    this.cart.minus(params.product);
    this.renderCart();
  }

  removeFromCart(params) {
    this.cart.remove(params.product);
    this.renderCart();
  }
}