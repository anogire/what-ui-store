export default class ViewProducts {

  constructor(handlerActions) {
    this._formatCurrency = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 2,
    });
    this.selectorProducts = document.querySelector('#productsList');
    this.handlerActions = handlerActions;
  }

  render(data) {
    if (!data) return;
    this.selectorProducts.innerHTML = data.map(el => this.renderProduct(el)).join('');
    this.selectorProducts.addEventListener('click', this.handlerActions);
  }

  renderProduct({ ID: id, PRODUCT_NAME: name, MANUFACTURE: manufacture, PRICE: price, IMG_LINK: imgLink }) {
    return ` 
      <div class="card product-card product-card--cursor" data-target="#modalDetails" data-toggle="modal" data-id=${id}>
        <img src="${imgLink}" class="card-img-top product-card__img" alt="${name}" width="auto" height="auto" loading="lazy">
        <div class="card-body product-card__content">
          <h5 class="product-caption mb-3">${name.toLowerCase()}</h5>
          <div class="card-text">
            <p class="product-text">${manufacture}</p>
          </div>
          <div class="card-text card-info">
            <span class="product-caption me-2 mt-2">${this._formatCurrency.format(price)}</span>
            <button type="button" class="main-btn mt-2" data-add_to_cart="true">Buy</button>
          </div>
        </div>
      </div>`;
  }

  notLoad(msg) {
    this.selectorProducts.innerHTML = `
      <div class="mt-5 mb-5 text-center w-100">
        <h2 class="items-caption">Sorry, ${msg}</h2>
      </div>`;
  }
}