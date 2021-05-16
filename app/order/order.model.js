export default class ModelOrder {

  constructor() {
    this._order = {};
    this._customer = {};
  }

  set order(data) {
    this._order = data;
  }

  get order() {
    return this.copy(this._order);
  }

  set customer(data) {
    this._customer = data;
  }

  get customer() {
    return this.copy(this._customer);
  }

  copy(data) {
    return JSON.parse(JSON.stringify(data));
  }

  clear() {
    this._order = {};
    this._customer = {};
  }
}