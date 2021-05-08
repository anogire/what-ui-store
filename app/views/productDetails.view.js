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
      $('#modalDetails').modal('hide');
    }
  }

  showDetails(product) {
    const { name, price, category } = product;
    const formatCurrency = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 2,
    });

    this.selectorProduct.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabelDetails">${name}</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card product-card">
            <img src="./img/product.jpg" class="card-img-top product-card__img" alt="..." loading="lazy">
            <div class="card-body">
              <h5 class="card-title">${category}</h5>
              <p class="card-text">${name}</p>
              <p class="card-text">${formatCurrency.format(price)}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="secondary-btn" data-dismiss="modal" 
            aria-label="Back to the shop">
            Cancel
          </button>
          <button type="button" class="main-btn" data-add="true" value=${JSON.stringify(product)} 
            aria-label="Put to the cart">
            Buy
          </button>
        </div>
      </div>
    </div>`;
  }
}