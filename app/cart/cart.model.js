export default class ModelCart {

  constructor() {
    this._inner = {
      data: [],
      totalSum: 0
    };
  }

  set inner(product) {
    const existProduct = this._inner.data.find(item => item['ID'] === product['ID']);
    if (!existProduct) {
      const newPoduct = {
        ...product,
        quantity: 1,
        total: product['PRICE']
      };
      this._inner.data.push(newPoduct);
    } else {
      this.plus(product['ID']);
    }
    this.getTotalSum();
  }

  get inner() {
    return this.copy(this._inner);
  }

  copy(data) {
    return JSON.parse(JSON.stringify(data));
  }

  getById(productId) {
    return this._inner.data.find(item => item['ID'] === productId);
  }

  plus(productId) {
    const product = this.getById(productId);
    if (product.quantity > product['AMOUNT']) return;
    product.quantity++;
    product.total = this.getTotal(product);
    this.getTotalSum();
  }

  minus(productId) {
    const product = this.getById(productId);
    if (product.quantity <= 1) return;
    product.quantity--;
    product.total = this.getTotal(product);
    this.getTotalSum();
  }

  remove(productId) {
    this._inner.data = this._inner.data.filter(item => item['ID'] !== productId);
    this.getTotalSum();
  }

  getTotal(product) {
    return product.quantity * product['PRICE'];
  }

  getTotalSum() {
    if (!this._inner.data || !this._inner.data.length) {
      this._inner.totalSum = 0;
      return;
    }
    this._inner.totalSum = this._inner.data.reduce((sum, cur) => sum += +cur.total, 0);
  }

  clear() {
    this._inner = {
      data: [],
      totalSum: 0
    };
  }
}