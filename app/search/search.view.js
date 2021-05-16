export default class ViewSearch {

  constructor(handlerActions) {
    this.searchProduct = document.querySelector('#searchProduct');
    this.handlerActions = handlerActions;

    this.searchProduct.addEventListener('submit', e => this.sendData(e));
  }

  sendData(e) {
    e.preventDefault();
    const value = e.target[0].value;
    e.target.reset();
    return this.handlerActions(value);
  }
}