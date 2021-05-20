export default class ViewDetails {
  constructor(handlerActions) {
    this.selectorProduct = document.querySelector('#modalDetails');
    this.selectorBackdrop = document.querySelector('#backdrop');
    this.selectorBody = document.body;

    this.handlerActions = handlerActions;

    this._formatCurrency = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 2,
    });
  }

  render(product) {
    if (!product) return;
    this.selectorProduct.innerHTML = this.detailsWindow(product);
    this.modalOpen();
  }

  detailsWindow({ PRODUCT_NAME: name, MANUFACTURE: manufacture, CATEGORY: category, INGRIDIENTS: ingridients, UNITS: units, PRICE: price, IMG_LINK: imgLink }) {
    return `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabelDetails">${name}</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card product-card" data-target="#modalDetails" data-toggle="modal">
            <img src="${imgLink}" class="card-img-top product-card__modal" alt="${name}" width="auto" height="auto" loading="lazy">
            <div class="card-body product-card__content">
              <div class="card-text mb-3">
                <span class="product-title">manufacture: </span><span class="product-text">${manufacture}</span>
              </div>
              <div class="card-text mb-3">
                <span class="product-title">category: </span><span class="product-text">${category}</span>
              </div>
              <div class="card-text mb-3">
                <span class="product-title">ingridients: </span><span class="product-text">${ingridients.toLowerCase()}</span>
              </div>
              <div class="card-text mb-2">
                <span class="product-title">units: </span><span class="product-text">${units}</span>
              </div>
              <div class="card-text text-end">
                <h5 class="product-caption">${this._formatCurrency.format(price)}</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="secondary-btn" data-dismiss="modal" 
            aria-label="Back to the shop">
            Cancel
          </button>
          <button type="button" class="main-btn" data-action="addToCart" aria-label="Put to the cart">
            Buy
          </button>
        </div>
      </div>
    </div>`;
  }

  modalOpen() {
    this.selectorProduct.classList.add('show');
    this.selectorProduct.setAttribute('style', 'display: block; padding-left:0px;');
    this.selectorBody.classList.add('modal-open');
    this.selectorBackdrop.style.display = "block";

    this.selectorProduct.addEventListener('click', this.handlerActions);
    document.addEventListener('keydown', this.handlerActions);
  }

  modalClose() {
    this.selectorProduct.classList.remove('show');
    this.selectorProduct.removeAttribute('style');
    this.selectorBody.classList.remove('modal-open');
    this.selectorBackdrop.style.display = "none";

    this.selectorProduct.removeEventListener('click', this.handlerActions);
    document.removeEventListener('keydown', this.handlerActions);
  }
}