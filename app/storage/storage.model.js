export default class ModelStorage {

  constructor() {
    this._history = this.loadFromStorage();
  }

  set history(data) {
    const order = {
      ...data.order,
      date: this.getDate()
    };
    this._history.push(order);
    localStorage.setItem('orders', JSON.stringify(this._history));
  }

  get history() {
    return this._history;
  }

  loadFromStorage() {
    return JSON.parse(localStorage.getItem('orders') || "[]");
  }

  getDate() {
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
    return date.toLocaleString("en", options);
  }
}