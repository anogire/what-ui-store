import * as constant from './consts.js';
import Pagination from './pagination.js';
import { scrollNavbar } from './system-func.js';
import Controller from './controllers/products.controller.js';
import MainController from './controllers/main.controller.js';
import { EventBus } from './pub-sub.js';

window.addEventListener('scroll', scrollNavbar);

// const controller = new Controller();
// controller.getAllProducts();

const sortDirection = document.querySelector('#sortByPrice');
const searchProduct = document.querySelector('#searchProduct');
const mainController = new MainController(sortDirection, searchProduct);
mainController.init();

// const pagination = new Pagination(constant.ITEMS_PER_PAGE);
// EventBus.subscribe('load', pagination.init.bind(pagination));
// EventBus.subscribe('changeData', pagination.init.bind(pagination));


// sortDirection.addEventListener('change', () => controller.sortByPrice(sortDirection.value));