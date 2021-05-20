export default class ViewStorage {

  constructor(handlerActions, showHistory) {
    this.selectorHistoryBtn = document.querySelector('#ordersHistory');
    this.selectorHistory = document.querySelector('#modalOrder');
    this.selectorBody = document.body;
    this.selectorBackdrop = document.querySelector('#backdrop');

    this.handlerActions = handlerActions;
    this.selectorHistoryBtn.addEventListener('click', showHistory);

    this._formatCurrency = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 2,
    });
  }

  render(storage) {
    this.selectorHistory.innerHTML = this.renderHistory(storage);
    this.addListeners();
    this.modalOpen();
  }

  renderHistory(storage) {
    const msg = `
      <div class="mt-5 mb-5 text-center w-100">
        <h5 class="items-caption">History is empty</h5>
      </div>`;
    const history = (!storage || !storage.length) ? msg : this.buildHistory(storage);

    return ` 
      <div class="modal-xl modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title items-caption" id="modalLabelOrder">History</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body order-history container">
          ${history}
        </div>
        <div class="modal-footer mt-3">
          <button type="button" class="secondary-btn" data-dismiss="modal" 
            aria-label="Back to the shop">
            Ok
          </button>
        </div>
      </div>
    </div>`;
  }

  buildHistory(storage) {
    return storage.map(item => `
      <h5 class="items-caption items-caption--alt">${item.date}</h5>
      ${this.buildTableHistory(item)}`).join('');
  }

  // таблица с заказами
  buildTableHistory({ data: products, totalSum }) {
    const items = products.map(item => this.renderProduct(item)).join('');
    return `
      <table class="table table-bordered table-striped">
        <thead>
          <tr class="text-center">
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${items}
        </tbody>
        <tfoot>
          <tr>
            <th colspan="3" class="text-end items-caption">Total:</th>
            <th class="text-end items-caption">${this._formatCurrency.format(totalSum)}</th>
          </tr>
        </tfoot>
      </table>`;
  }

  renderProduct({ PRODUCT_NAME: name, PRICE: price, quantity, total }) {
    return `
      <tr class="align-middle">
        <td>${name}</td>
        <td class="text-center">
          <div class="d-flex justify-content-center align-items-center">
            ${quantity} pc
          </div>
        </td>
        <td class="text-end">${this._formatCurrency.format(price)}</td>
        <td class="text-end">${this._formatCurrency.format(total)}</td>
      </tr>`;
  }

  addListeners() {
    this.selectorHistory.addEventListener('click', this.handlerActions);
    document.addEventListener('keydown', this.handlerActions);
  }

  removeListeners() {
    this.selectorHistory.removeEventListener('click', this.handlerActions);
    document.removeEventListener('keydown', this.handlerActions);
  }

  modalOpen() {
    this.selectorHistory.classList.add('show');
    this.selectorHistory.setAttribute('style', 'display: block; padding-left:0px;');
    this.selectorBody.classList.add('modal-open');
    this.selectorBackdrop.style.display = "block";
  }

  modalClose() {
    this.selectorHistory.classList.remove('show');
    this.selectorHistory.removeAttribute('style');
    this.selectorBody.classList.remove('modal-open');
    this.selectorBackdrop.style.display = "none";
  }

  closeHistory() {
    this.removeListeners();
    this.modalClose();
  }
}