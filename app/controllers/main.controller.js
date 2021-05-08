import ControllerProducts from './products.controller.js';
import ControllerPagination from './pagination.controller.js';
import ControllerCart from './cart.controller.js';
import ControllerOrder from './order.controller.js';


export default class MainController {

  constructor(sortDirection, searchProduct, cart) {
    this.controllerProduct = new ControllerProducts();
    this.controllerPagination = new ControllerPagination();
    this.controllerCart = new ControllerCart(cart);
    this.controllerOrder = new ControllerOrder();

    sortDirection.addEventListener('change',
      () => this.controllerProduct.sortByPrice(sortDirection.value));

    searchProduct.addEventListener('submit',
      e => this.controllerProduct.searchByProductName(e));
  }

  init() {
    this.controllerProduct.getAllProducts();
  }


}
