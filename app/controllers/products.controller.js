import ModelProducts from '../models/products.model.js';
import ViewProducts from '../views/products.view.js';
import ViewCategories from '../views/categories.view.js';
import { EventBus } from '../pub-sub.js';
import { ITEMS_PER_PAGE } from '../consts.js';
import ViewProductDetails from '../views/productDetails.view.js';

export default class ControllerProducts {
  constructor() {
    this.collection = {};
    this.filteredCollection = {};

    this.model = new ModelProducts();
    this.viewProducts = new ViewProducts();
    this.viewCategories = new ViewCategories();
    this.viewProductDetails = new ViewProductDetails();

    EventBus.subscribe('load', this.startRenderProducts.bind(this));
    EventBus.subscribe('changePage', this.reRenderProducts.bind(this));
    EventBus.subscribe('changeData', this.reRenderProducts.bind(this));
  }

  getAllProducts() {
    this.model.load()
      .then(data => {
        if (!data || data == "Not found") {
          this.viewProducts.notFound('no data yet');
        } else {
          this.collection = data;
          this.filteredCollection = data;
          EventBus.publish('load', {
            quantity: data.length,
            curPage: 1
          });
        }
      });
  }

  startRenderProducts() {
    const products = this.collection.slice(0, ITEMS_PER_PAGE);
    this.viewProducts.renderProducts(products,
      this.viewProductDetails.showDetails.bind(this.viewProductDetails),
      this.addToCart);

    const categories = new Set(this.collection.map((item) => item.category));
    this.viewCategories.renderCategories(categories, this.filterByCategory.bind(this));
  }

  reRenderProducts(params) {
    this.curPage = params.curPage;
    const startInd = ITEMS_PER_PAGE * (params.curPage - 1);
    const products = this.filteredCollection.slice(startInd, startInd + ITEMS_PER_PAGE);
    this.viewProducts.renderProducts(products,
      this.viewProductDetails.showDetails.bind(this.viewProductDetails),
      this.addToCart);
  }

  addToCart(e, product) {
    e.stopPropagation();
    EventBus.publish('addToCart', product);
  }

  sortByPrice(direction) {
    if (!this.collection.length) {
      return;
    }
    this.collection = this.sortMethod(this.collection, direction);
    this.filteredCollection = this.sortMethod(this.filteredCollection, direction);
    EventBus.publish('getCurPage', {
      quantity: this.filteredCollection.length,
    });
  }

  sortMethod(data, direction) {
    return data.sort((a, b) => (direction == 'up') ? a.price - b.price : b.price - a.price);
  }

  filterByCategory(category) {
    if (!this.collection.length) {
      return;
    }
    this.filterMethod('category', category);

  }

  searchByProductName(e) {
    e.preventDefault();
    if (!this.collection.length) {
      e.target.reset();
      return;
    }
    this.filterMethod('name', e.target[0].value);

    if (!this.filteredCollection.length) {
      this.viewProducts.notFound('product not found');
    }
    e.target.reset();
  }

  filterMethod(field, value) {
    this.filteredCollection = this.collection.filter(
      product => product[field].toLowerCase() == value.toLowerCase());

    EventBus.publish('changeData', {
      quantity: this.filteredCollection.length,
      curPage: 1
    });
  }

}