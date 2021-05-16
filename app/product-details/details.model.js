export default class ModelDetails {
  constructor() {
    this._data = {};
  }

  set data(data) {
    this._data = data;
  }

  get data() {
    return this.copy(this._data);
  }

  copy(data) {
    return JSON.parse(JSON.stringify(data));
  }
}