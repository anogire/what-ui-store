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
    this.publisher.subscribe('changePage', data => this.getDataForPage(data.curPage));

    this.load();
  }

  load() {
    this.model.load()
      .then(data => {
        if (!data || !data.length) {
          this.view.notLoad('no data yet');
        } else {
          this.publisher.publish('loadData', {
            categories: this.model.getCategories(),
            productsQuantity: this.model.getProductsQuantity()
          });

          this.getDataForPage(1);
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
    this.model.filterByCategory(data.category);

    this.publisher.publish('filteredData', {
      productsQuantity: this.model.getProductsQuantity(),
      curPage: 1
    });

    this.getDataForPage(1);
  }

  sortByPrice(data) {
    this.model.sortByPrice(data.direction);

    this.publisher.publish('filteredData', {
      productsQuantity: this.model.getProductsQuantity(),
      curPage: this.model.curPage
    });

    this.getDataForPage(this.model.curPage);
  }

  searchProduct(data) {
    const finded = this.model.searchProduct(data.value);

    this.publisher.publish('filteredData', {
      productsQuantity: this.model.getProductsQuantity(),
      curPage: 1
    });

    (!finded) ? this.view.notLoad('product not found') : this.getDataForPage(1);
  }

  getDataForPage(pageNumber) {
    this.model.curPage = pageNumber;
    const dataOnePage = this.model.getDataForPage(pageNumber);
    this.view.render(dataOnePage);
  }
}