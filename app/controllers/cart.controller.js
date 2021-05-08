import ModelCart from '../models/cart.model.js';
import { EventBus } from '../pub-sub.js';
import ViewCart from '../views/cart.view.js';


export default class ControllerCart {

  constructor(selector) {
    this.cart = new ModelCart();
    this.view = new ViewCart();
    this.selector = selector;

    this.selector.addEventListener('click', this.renderCart.bind(this));

    EventBus.subscribe('addToCart', this.addToCart.bind(this));
    EventBus.subscribe('incProductInCart', this.incProductInCart.bind(this));
    EventBus.subscribe('decProductInCart', this.decProductInCart.bind(this));
    EventBus.subscribe('removeFromCart', this.removeFromCart.bind(this));
    EventBus.subscribe('closeEmptyCart', this.closeCart.bind(this));
    EventBus.subscribe('confirmOrder', this.clearCart.bind(this));
  }

  renderCart() {
    this.view.showCart(this.cart.inner, this.cart.totalSum);
  }

  addToCart(product) {
    this.selector.removeAttribute('disabled');
    this.selector.classList.add("customer-cart--active");
    this.cart.addToCart(product);
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

  closeCart() {
    this.selector.setAttribute('disabled', 'true');
    this.selector.classList.remove("customer-cart--active");
    $('#modalCart').modal('hide');
  }

  clearCart() {
    this.cart.clear();
    this.closeCart();
  }
}