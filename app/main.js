import * as constant from './consts.js';
import Pagination from './pagination.js';
import { scrollNavbar } from './system-func.js';
import Controller from './controllers/product.controller.js';
import { EventBus } from './pub-sub.js';

window.addEventListener('scroll', scrollNavbar);

const controller = new Controller();
controller.getAllProducts();

const pagination = new Pagination(constant.ITEMS_PER_PAGE);
EventBus.subscribe('load', pagination.init.bind(pagination));