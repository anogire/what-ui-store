import { EventBus } from '../pub-sub.js';

export default class ViewOrder {

  constructor() {
    this.selectorOrder = document.querySelector('#modalOrder');
    this.selectorOrder.addEventListener('click', e => this.handlerActions(e));
  }

  // обработчик событий для заказа
  handlerActions(event) {
    if (event.target.dataset.confirm) {
      const formData = this.selectorOrder.querySelectorAll('.field');

      if (this.isValid(formData)) {
        EventBus.publish('confirmOrder', {
          order: JSON.parse(event.target.value),
          customer: this.getCustomerFields(formData)
        });
      }
    }
  }

  showOrder(cart) {
    this.selectorOrder.innerHTML = '';
    const modalWindow = `
      <div class="modal-xl modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
          <h5 class="modal-title items-caption" id="modalLabelOrder">Order</h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body order-content container">
            ${this.buildTableOrder(cart)}
            ${this.getCustomerForm()}
          </div>
          <div class="modal-footer mt-3">
            <button type="button" class="secondary-btn" data-dismiss="modal" 
              aria-label="Back to the shop">
              Cancel
            </button>
            <button type="button" class="main-btn" data-confirm="true" value=${JSON.stringify(cart)} 
              aria-label="Confirm the order">
              Confirm
            </button>
          </div>
        </div>
      </div>
    `;
    this.selectorOrder.innerHTML = modalWindow;
  }

  //форма клиента
  getCustomerForm() {
    const customerData = ` 
      <form class="order-form">
        <h5 class="items-caption items-caption--alt text-right">Customer data</h5>
        <label class="form-group">Имя <sup>*</sup>
          <input type="text" name="name" maxlength="100" class="form-control mt-1 field" 
            placeholder="Min length is 3 characters">
        </label>
        <label class="form-group">Телефон <sup>*</sup>
          <input type="phone" name="phone" id="phone" class="form-control mt-1 field"
            placeholder="xxx xxx-xx-xx">
        </label>
        <label class="form-group">Email <sup>*</sup>
          <input type="email" name="email" id="email" class="form-control mt-1 field" 
            placeholder="@">
        </label>
        <small><sup>*</sup> обязательное поле</small>
      </form>`;
    return customerData;
  }

  // таблица с заказом
  buildTableOrder(cart) {
    const { inner: products, totalSum } = cart;

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
          <td class="text-right">${formatCurrency.format(product.price)}</td>
          <td class="text-right">${formatCurrency.format(product.total)}</td>
        </tr>`;
    });

    const innerCart = `
      <table class="table table-bordered table-striped table-sm order-cart">
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
            <th colspan="3" class="text-right items-caption">Total:</th>
            <th class="text-right items-caption">${formatCurrency.format(totalSum)}</th>
          </tr>
        </tfoot>
      </table>`;

    return innerCart;
  }

  // собрать данные пользователя для отправки заказа
  getCustomerFields(fields) {
    let data = {};
    fields.forEach(item => {
      data = {
        ...data,
        [item.name]: item.value
      }
    });
    return data;
  }

  // проверить валидность данных
  isValid(fields) {
    return this.checkRequired(fields) && this.checkEmail() && this.checkPhone();
  }

  checkRequired(fields) {
    let result = true;
    fields.forEach(item => {
      item.classList.remove('is-invalid');

      if (!item.value || item.value.length < 3) {
        item.classList.add('is-invalid');
        item.value = '';
        result = false;
      }
    });
    return result;
  }

  checkEmail() {
    const email = this.selectorOrder.querySelector('#email');
    const regexpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexpEmail.test(email.value)) {
      email.classList.add('is-invalid');
      email.value = '';
      return false;
    }
    return true;
  }

  checkPhone() {
    const phone = this.selectorOrder.querySelector('#phone');
    const regexpPhone = /^\d{3} \d{3}-\d{2}-\d{2}$|^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$/;
    if (!regexpPhone.test(phone.value)) {
      phone.classList.add('is-invalid');
      phone.value = '';
      return false;
    }
    return true;
  }
}