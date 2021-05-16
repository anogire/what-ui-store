import { EventBus } from '../pub-sub.js';

export default class ViewCart {

  constructor() {
    this.selectorCart = document.querySelector('#modalCart');
    this.selectorCart.addEventListener('click', e => this.handlerActions(e));
  }

  // обработчик событий в корзине
  handlerActions(event) {
    switch (event.target.dataset.action) {
      case 'plus':
        EventBus.publish('incProductInCart', {
          product: JSON.parse(event.target.value)
        });
        break;
      case 'minus':
        EventBus.publish('decProductInCart', {
          product: JSON.parse(event.target.value)
        });
        break;
      case 'remove':
        EventBus.publish('removeFromCart', {
          product: JSON.parse(event.target.value)
        });
        break;
      case 'order':
        $("#modalCart").modal("hide");
        EventBus.publish('showOrder', {});
        break;
    }
  }

  showCart(products, totalSum) {
    this.selectorCart.innerHTML = '';
    const modalWindow = `
      <div class="modal-lg modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title items-caption" id="modalLabelCart">Cart</h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${this.buildCart(products, totalSum)}
          </div>
          <div class="modal-footer">
            <button type="button" class="secondary-btn" data-dismiss="modal" 
              aria-label="Back to the shop">
              Cancel
            </button>
            <button type="button" class="main-btn" data-action="order" 
              aria-label="Go to the order page">
              Order
            </button>
          </div>
        </div>
      </div>
    `;
    this.selectorCart.innerHTML = modalWindow;
  }

  buildCart(products, totalSum) {
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
              <button class="btn btn-sm btn-secondary mr-1" data-action="minus" value=${JSON.stringify(product)} 
                aria-label="decrease product">
                -
              </button>
              ${product.quantity}
              <button class="btn btn-sm btn-secondary ml-1" data-action="plus" value=${JSON.stringify(product)} 
                aria-label="increase product">
                +
              </button>
            </div>
          </td>
          <td class="text-end">${formatCurrency.format(product.price)}</td>
          <td class="text-end">${formatCurrency.format(product.total)}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-danger" data-action="remove" value=${JSON.stringify(product)} 
              aria-label="remove product from cart">
              Remove
            </button>
          </td>
        </tr>`;
    });

    const innerCart = `
      <table class="table table-bordered table-striped">
          <thead>
            <tr class="text-center">
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${items}
          </tbody>
          <tfoot>
            <tr>
              <th colspan="3" class="text-end items-caption">Total:</th>
              <th colspan="2" class="text-end items-caption">${formatCurrency.format(totalSum)}</th>
            </tr>
          </tfoot>
        </table>
    `;

    return innerCart;
  }
}