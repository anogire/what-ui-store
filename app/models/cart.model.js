import { EventBus } from '../pub-sub.js';

export default class ModelCart {

  constructor() {
    if (ModelCart._instance) {
      return ModelCart._instance;
    }
    ModelCart._instance = this;

    this.totalSum = 0;
    this.inner = [];
  }


  addToCart(product) {
    const existProduct = this.inner.find(item => item.id === product.id);
    if (!existProduct) {
      const newPoduct = {
        ...product,
        quantity: 1,
        total: product.price
      };
      this.inner.push(newPoduct);
    } else {
      this.plus(existProduct);
    }
    this.getTotalSum();
  }

  plus(product) {
    if (product.quantity > 10) return;
    const curProduct = this.inner.find(item => item.id === product.id);
    curProduct.quantity++;
    curProduct.total = this.getTotal(curProduct);
    //this.totalSum += +curProduct.price;
    this.getTotalSum();
  }

  minus(product) {
    if (product.quantity <= 1) return;
    const curProduct = this.inner.find(item => item.id === product.id);
    curProduct.quantity--;
    curProduct.total = this.getTotal(curProduct);
    //this.totalSum -= +curProduct.price;
    this.getTotalSum();
  }

  remove(product) {
    this.inner = this.inner.filter(item => item.id !== product.id);
    //this.totalSum -= +product.total;
    this.getTotalSum();
  }

  getTotal(product) {
    return product.quantity * +product.price;
  }

  getTotalSum() {
    this.totalSum = this.inner.reduce((sum, cur) => sum += +cur.total, 0);
    if (!this.totalSum) {
      EventBus.publish('cartEmpty', {});
    }
  }
}