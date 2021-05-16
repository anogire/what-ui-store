export default class ViewCart {

  constructor(handlerActions, showCart) {
    window.addEventListener('scroll', () => this.scrollNavbar());

    this.selectorCartBtn = document.querySelector('#customerCart');
    this.selectorCart = document.querySelector('#modalCart');
    this.selectorBackdrop = document.querySelector('#backdrop');
    this.selectorHead = document.querySelector('.navbar');
    this.selectorBody = document.getElementsByTagName('body')[0];

    this.handlerActions = handlerActions;
    this.selectorCartBtn.addEventListener('click', showCart);

    this._formatCurrency = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 2,
    });
  }

  render(cart) {
    if (!cart.data || !cart.data.length) {
      this.inactiveCart();
      return;
    }
    this.selectorCart.innerHTML = this.renderCart(cart);
    this.addListeners();
    this.modalOpen();
  }

  renderCart({ data: products, totalSum }) {
    return ` 
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
    </div>`;
  }

  buildCart(products, totalSum) {
    const items = products.map(item => this.renderProduct(item)).join('');
    return `
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
            <th colspan="2" class="text-end items-caption">${this._formatCurrency.format(totalSum)}</th>
          </tr>
        </tfoot>
      </table>`;
  }

  renderProduct(product) {
    const { ID: id, PRODUCT_NAME: name, PRICE: price, quantity, total } = product;
    return `
      <tr class="align-middle">
        <td>${name}</td>
        <td class="text-center">
          <button class="btn btn-sm btn-secondary me-1" data-action="minus"} data-id=${id} aria-label="decrease product">
            - 
          </button>
          ${quantity}
          <button class="btn btn-sm btn-secondary ms-1" data-action="plus" data-id=${id} aria-label="increase product">
            +
          </button>
        </td>
        <td class="text-end">${this._formatCurrency.format(price)}</td>
        <td class="text-end">${this._formatCurrency.format(total)}</td>
        <td class="text-center">
          <button class="btn btn-sm btn-danger" data-action="remove" data-id=${id} aria-label="remove product from cart">
            Remove
          </button>
        </td>
      </tr>`;
  }

  addListeners() {
    this.selectorCart.addEventListener('click', this.handlerActions);
    document.addEventListener('keydown', this.handlerActions);
  }

  removeListeners() {
    this.selectorCart.removeEventListener('click', this.handlerActions);
    document.removeEventListener('keydown', this.handlerActions);
  }

  scrollNavbar() {
    (window.scrollY > 200) ?
      this.selectorHead.classList.add('navb-scroll') :
      this.selectorHead.classList.remove('navb-scroll');
  }

  activeCart() {
    this.selectorCartBtn.removeAttribute('disabled');
    this.selectorCartBtn.classList.add("customer-cart--active");
  }

  inactiveCart() {
    this.selectorCartBtn.setAttribute('disabled', 'true');
    this.selectorCartBtn.classList.remove("customer-cart--active");
    this.closeCart();
  }

  closeCart() {
    this.removeListeners();
    this.modalClose();
  }

  modalOpen() {
    this.selectorCart.classList.add('show');
    this.selectorCart.setAttribute('style', 'display: block; padding-left:0px;');
    this.selectorBody.classList.add('modal-open');
    this.selectorBackdrop.style.display = "block";
  }

  modalClose() {
    this.selectorCart.classList.remove('show');
    this.selectorCart.removeAttribute('style');
    this.selectorBody.classList.remove('modal-open');
    this.selectorBackdrop.style.display = "none";
  }

}