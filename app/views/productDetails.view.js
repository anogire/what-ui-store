import { EventBus } from '../pub-sub.js';

export default class ViewProductDetails {

  constructor() {
    this.selectorProduct = document.querySelector('#modalDetails');
    this.selectorProduct.addEventListener('click', e => this.handlerActions(e));
  }

  // обработчик событий
  handlerActions(event) {
    if (event.target.dataset.add) {
      EventBus.publish('addToCart', JSON.parse(event.target.value));
    }
    $('#modalDetails').modal('hide');
  }

  showDetails(product) {
    const { name, price, category } = product;
    this.selectorProduct.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabelDetails">${name}</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>${category}</p>
          <p>${price}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" data-add="true" value=${JSON.stringify(product)}>Buy</button>
        </div>
      </div>
    </div>`;
  }
}