export default class ViewOrdersHistory {

  constructor(history) {
    history.addEventListener('click', () => this.showHistory());
    this.selectorHistory = document.querySelector('#modalOrder');
  }

  showHistory() {
    this.selectorHistory.innerHTML = '';
    const modalWindow = `
      <div class="modal-xl modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
          <h5 class="modal-title items-caption" id="modalLabelOrder">History</h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body order-history">
            ${this.buildHistory()}
          </div>
          <div class="modal-footer mt-3">
            <button type="button" class="secondary-btn" data-dismiss="modal" 
              aria-label="Back to the shop">
              Ok
            </button>
          </div>
        </div>
      </div>
    `;
    this.selectorHistory.innerHTML = modalWindow;
  }

  // история из localStorage
  buildHistory() {
    if (!localStorage.length) {
      return `
        <div class="mt-5 mb-5 text-center w-100">
          <h5 class="items-caption">History is empty</h5>
        </div>`;
    }

    const keys = Object.keys(localStorage);
    let history = '';
    for (let key of keys) {
      history += `
        <h5 class="items-caption items-caption--alt">${key}</h5>
        ${this.buildTableOrder(JSON.parse(localStorage.getItem(key)))}`;
    }

    return history;
  }

  // список заказов заказов из localStorage
  buildTableOrder(order) {
    const { inner: products, totalSum } = order;

    const formatCurrency = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 2,
    });

    let items = '';
    products.forEach(product => {
      items += `
        <tr>
          <td>${product.name}</td>
          <td class="text-center">
            <div class="d-flex justify-content-center align-items-center">
              ${product.quantity} pc
            </div>
          </td>
          <td class="text-end">${formatCurrency.format(product.price)}</td>
          <td class="text-end">${formatCurrency.format(product.total)}</td>
        </tr>`;
    });

    const history = `
      <table class="table table-bordered table-striped table-sm">
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
            <th class="text-end items-caption">${formatCurrency.format(totalSum)}</th>
          </tr>
        </tfoot>
      </table>`;

    return history;
  }
}