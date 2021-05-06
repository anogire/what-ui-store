import ControllerProducts from './products.controller.js';
import ControllerPagination from './pagination.controller.js';
import ControllerCart from './cart.controller.js';


export default class MainController {

  constructor(sortDirection, searchProduct, cart) {
    this.controllerProduct = new ControllerProducts();
    this.controllerPagination = new ControllerPagination();
    this.controllerCart = new ControllerCart(cart);

    sortDirection.addEventListener('change',
      () => this.controllerProduct.sortByPrice(sortDirection.value));

    searchProduct.addEventListener('submit',
      e => this.controllerProduct.searchByProductName(e));

    // cart.addEventListener('click',
    //   () => this.controllerCart.getInnerCart());
  }

  init() {
    this.controllerProduct.getAllProducts();
  }

}
