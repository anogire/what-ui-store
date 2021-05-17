import { scrollNavbar } from './system-func.js';
import MainController from './controllers/main.controller.js';

const sortDirection = document.querySelector('#sortByPrice');
const searchProduct = document.querySelector('#searchProduct');
const cart = document.querySelector('#customerCart');
const history = document.querySelector('#ordersHistory');

const mainController = new MainController(sortDirection, searchProduct, cart, history);

window.addEventListener('scroll', scrollNavbar);
mainController.init();