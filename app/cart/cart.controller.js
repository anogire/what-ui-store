import ModelCart from './cart.model.js';
import ViewCart from './cart.view.js';
import Publisher from '../pub-sub.js';

export default class ControllerCart {
  constructor() {
    this.publisher = new Publisher();
    this.model = new ModelCart();
    this.view = new ViewCart(e => this.handlerActions(e), e => this.showCart(e));

    this.publisher.subscribe('addToCart', data => this.addToCart(data));
    this.publisher.subscribe('confirmOrder', () => this.removeCart());
  }

  showCart() {
    const data = this.model.inner;
    this.view.render(data);
  }

  removeCart() {
    this.model.clear();
    this.view.inactiveCart();
  }

  addToCart(data) {
    if (!this.model.inner.data.length) {
      this.view.activeCart();
    }
    this.model.inner = data;
  }

  handlerActions(e) {
    const productId = e.target.dataset.id;
    if (e.key == "Escape" || e.target.dataset.dismiss == "modal" || e.target.dataset.action == "order") {
      this.view.closeCart();
    }
    switch (e.target.dataset.action) {
      case 'plus':
        this.model.plus(productId);
        this.showCart();
        break;
      case 'minus':
        this.model.minus(productId);
        this.showCart();
        break;
      case 'remove':
        this.model.remove(productId);
        const data = this.model.inner.data;
        (!data || !data.length) ? this.view.inactiveCart() : this.showCart();
        //this.showCart();
        break;
      case 'order':
        this.publisher.publish('makeOrder', this.model.inner);
        break;
    }
  }
}