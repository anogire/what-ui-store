export default class ViewOrder {

  constructor(handlerActions, handleForm) {
    this.selectorOrder = document.querySelector('#modalOrder');
    this.selectorBody = document.body;
    this.selectorBackdrop = document.querySelector('#backdrop');

    this.handlerActions = handlerActions;
    this.handleForm = handleForm;
    this.selectorForm;

    this._formatCurrency = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 2,
    });
  }

  render(cart) {
    if (!cart.data || !cart.data.length) {
      this.modalClose();
      return;
    }
    this.selectorOrder.innerHTML = this.renderOrder(cart);
    this.selectorForm = this.selectorOrder.querySelectorAll('.field');
    this.addListeners();
    this.modalOpen();
  }

  renderOrder(cart) {
    return ` 
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
          <button id="confirmOrder" type="button" class="main-btn" aria-label="Confirm the order">
            Confirm
          </button>
        </div>
      </div>
    </div>`;
  }

  // таблица с заказом
  buildTableOrder({ data: products, totalSum }) {
    const items = products.map(item => this.renderProduct(item)).join('');
    return `
      <div class="table-responsive w-100">
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
      </table>
      </div>`;
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

  //форма клиента
  getCustomerForm() {
    return ` 
      <form class="order-form">
        <h5 class="items-caption items-caption--alt text-end">Customer data</h5>
        <label class="form-group mb-3">Имя <sup>*</sup>
          <input type="text" name="name" maxlength="100" class="form-control field" 
            placeholder="Min length is 3 characters">
        </label>
        <label class="form-group mb-3">Телефон <sup>*</sup>
          <input type="phone" name="phone" id="phone" class="form-control field"
            placeholder="xxx xxx-xx-xx">
        </label>
        <label class="form-group mb-3">Email <sup>*</sup>
          <input type="email" name="email" id="email" class="form-control field" 
            placeholder="@">
        </label>
        <small><sup>*</sup> обязательное поле</small>
      </form>`;
  }

  addListeners() {
    const selectorConfirmBtn = this.selectorOrder.querySelector('#confirmOrder');
    selectorConfirmBtn.addEventListener('click', this.handleForm);

    this.selectorOrder.addEventListener('click', this.handlerActions);
    document.addEventListener('keydown', this.handlerActions);
  }

  removeListeners() {
    this.selectorOrder.removeEventListener('click', this.handlerActions);
    document.removeEventListener('keydown', this.handlerActions);
  }

  modalOpen() {
    this.selectorOrder.classList.add('show');
    this.selectorOrder.setAttribute('style', 'display: block; padding-left:0px;');
    this.selectorBody.classList.add('modal-open');
    this.selectorBackdrop.style.display = "block";
  }

  modalClose() {
    this.selectorOrder.classList.remove('show');
    this.selectorOrder.removeAttribute('style');
    this.selectorBody.classList.remove('modal-open');
    this.selectorBackdrop.style.display = "none";
  }

  closeOrder() {
    this.removeListeners();
    this.modalClose();
  }

  // собрать данные пользователя для отправки заказа
  getCustomerData() {
    let data = {};
    this.selectorForm.forEach(item => {
      data = {
        ...data,
        [item.name]: item.value
      }
    });
    return data;
  }

  // проверить валидность данных
  formIsValid() {
    return this.checkRequired(this.selectorForm) && this.checkPhone() && this.checkEmail();
  }

  // проверка всех полей на непустоту
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
    const regexpPhone = /^\d{3} \d{3}-\d{2}-\d{2}$|^\d{10}$/;
    if (!regexpPhone.test(phone.value)) {
      phone.classList.add('is-invalid');
      phone.value = '';
      return false;
    }
    return true;
  }

}