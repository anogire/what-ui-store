import ModelProducts from './products.model.js';
import ViewProducts from './products.view.js';
import Publisher from '../pub-sub.js';

export default class ControllerProducts {
  constructor() {
    this.publisher = new Publisher();
    this.model = new ModelProducts();
    this.view = new ViewProducts(e => this.handlerActions(e));

    this.publisher.subscribe('getByCategory', data => this.filterByCategory(data));
    this.publisher.subscribe('sortByPrice', data => this.sortByPrice(data));
    this.publisher.subscribe('searchByProductName', data => this.searchProduct(data));

    this.load();
  }

  load() {
    this.model.load()
      .then(data => {
        if (!data || !data.length) {
          this.view.notLoad('no data yet');
        } else {
          this.publisher.publish('loadData', {
            categories: this.model.getCategories()
          });
          this.view.render(data);
        }
      });
  }

  handlerActions(e) {
    const productId = e.target.offsetParent.dataset.id;
    const product = this.model.getById(productId);
    if (e.target.dataset.add_to_cart) {
      this.publisher.publish('addToCart', product);
    }
    else {
      this.publisher.publish('showDetails', product);
    }
  }

  filterByCategory(data) {
    const filtered = this.model.filterByCategory(data.category);
    this.view.render(filtered);
  }

  sortByPrice(data) {
    const sorted = this.model.sortByPrice(data.direction);
    this.view.render(sorted);
  }

  searchProduct(data) {
    const finded = this.model.searchProduct(data.value);
    (!finded || !finded.length) ? this.view.notLoad('product not found') : this.view.render(finded);
  }

}