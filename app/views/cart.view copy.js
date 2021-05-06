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
    }
  }

  showCart(products, totalSum) {
    this.selectorCart.innerHTML = '';
    const formatCurrency = new Intl.NumberFormat('ru', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 2,
    });
    const cartTable = document.createElement('table');
    cartTable.setAttribute('class', 'table table-bordered table-striped');
    cartTable.innerHTML = `
      <thead>
        <tr class="text-center">
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>`;

    const cartTableBody = document.createElement('tbody');


    products.forEach(product => {

      const line = document.createElement('tr');
      line.innerHTML = `<td>${product.name}</td>`;

      const colQuantity = document.createElement('td');
      colQuantity.setAttribute('class', 'text-center');

      const productMinusBtn = document.createElement('button');
      productMinusBtn.setAttribute('class', 'btn btn-sm btn-secondary mr-1');
      productMinusBtn.innerHTML = '-';
      productMinusBtn.setAttribute('data-action', 'minus');
      productMinusBtn.setAttribute('value', JSON.stringify(product));

      const productPlusBtn = document.createElement('button');
      productPlusBtn.setAttribute('class', 'btn btn-sm btn-secondary ml-1');
      productPlusBtn.innerHTML = '+';
      productPlusBtn.setAttribute('data-action', 'plus');
      productPlusBtn.setAttribute('value', JSON.stringify(product));

      const blockQuantity = document.createElement('div');
      blockQuantity.setAttribute('class', 'd-flex justify-content-center align-items-center');
      blockQuantity.append(productMinusBtn);
      blockQuantity.innerHTML += product.quantity;
      blockQuantity.append(productPlusBtn);

      colQuantity.append(blockQuantity);

      line.append(colQuantity);
      line.innerHTML += `
      <td class="text-right"> ${formatCurrency.format(product.price)} </td>
      <td class="text-right"> ${formatCurrency.format(product.total)} </td>
      <td class="text-center">
        <button class="btn btn-sm btn-danger" data-action="remove" value=${JSON.stringify(product)}>Remove</button>
      </td>`;

      cartTableBody.append(line);


    });

    const cartTableFoot = document.createElement('tfoot');
    cartTableFoot.innerHTML = `
      <tr>
        <th colspan="3" class="text-right items-caption">Total:</th>
        <th colspan="2" class="text-right items-caption">${formatCurrency.format(totalSum)}</th>
      </tr>`;

    cartTableBody.append(cartTableFoot);
    cartTable.append(cartTableBody);

    const modalWindow = document.createElement('div');
    modalWindow.setAttribute('class', 'modal-lg modal-dialog modal-dialog-centered modal-dialog-scrollable');

    const modalContent = document.createElement('div');
    modalContent.setAttribute('class', 'modal-content');

    modalContent.innerHTML = `
      <div class="modal-header">
        <h5 class="modal-title items-caption" id="modalLabelCart">Cart</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>`;

    const modalBody = document.createElement('div');
    modalBody.setAttribute('class', 'modal-body');
    modalBody.append(cartTable);

    modalContent.append(modalBody);

    modalContent.innerHTML += `
    <div class="modal-footer">
      <button type="button" class="secondary-btn" data-dismiss="modal">Cancel</button>
      <button type="button" class="main-btn">Order</button>
    </div>`;


    modalWindow.append(modalContent);

    this.selectorCart.append(modalWindow);
  }
}



