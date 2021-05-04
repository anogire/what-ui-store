import ControllerProducts from './products.controller.js';
import ControllerPagination from '../controllers/pagination.controller.js';


export default class MainController {
  constructor(sortDirection, searchProduct) {
    this.controllerProduct = new ControllerProducts();
    this.controllerPagination = new ControllerPagination();

    this.sortDirection = sortDirection;
    this.searchProduct = searchProduct;

    this.sortDirection.addEventListener('change',
      () => this.controllerProduct.sortByPrice(this.sortDirection.value));

    this.searchProduct.addEventListener('submit',
      e => this.controllerProduct.searchByProductName(e));
  }

  init = () => {
    this.controllerProduct.getAllProducts();
  }

}
