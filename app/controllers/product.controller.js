import Model from '../models/product.model.js';
import View from '../views/product.view.js';
import ViewCategories from '../views/categories.view.js';
import { EventBus } from '../pub-sub.js';
import { ITEMS_PER_PAGE } from '../consts.js';

export default class Controller {
  constructor() {
    this.collection = {};
    this.curPage = 1;
    this.model = new Model();
    this.view = new View();
    this.viewCategories = new ViewCategories();

    EventBus.subscribe('load', this.startRenderProducts.bind(this));
    EventBus.subscribe('changePage', this.reRenderProducts.bind(this));
    EventBus.subscribe('sort', this.reRenderProducts.bind(this));
  }

  getAllProducts = () => {
    this.model.load()
      .then(data => this.collection = data);
  }

  startRenderProducts(params) {
    const products = params.products.slice(0, ITEMS_PER_PAGE);
    this.view.renderProducts({ products });

    const categories = new Set(params.products.map((item) => item.category));
    this.viewCategories.renderCategories(categories, this.filterByCategory.bind(this));
  }

  reRenderProducts(params) {
    this.curPage = params.curPage;
    const startInd = ITEMS_PER_PAGE * (params.curPage - 1);
    const products = this.collection.slice(startInd, startInd + ITEMS_PER_PAGE);
    this.view.renderProducts({ products });
  }

  sortByPrice(direction) {
    this.collection.sort((a, b) => (direction == 'up') ? a.price - b.price : b.price - a.price);

    EventBus.publish('sort', {
      curPage: this.curPage,
    });
  }

  filterByCategory(category) {
    const products = this.collection.filter(item => item.category == category);

    this.view.renderProducts({ products });

    // EventBus.publish('filterByCategory', {
    //   products: filteredCollection,
    // });
  }


}
