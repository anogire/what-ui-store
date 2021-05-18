import ModelPagination from './pagination.model.js';
import ViewPagination from './pagination.view.js';
import Publisher from '../pub-sub.js';

export default class ControllerPagination {
  constructor() {
    this.publisher = new Publisher();
    this.model = new ModelPagination();
    this.view = new ViewPagination(e => this.handlerActions(e));

    this.publisher.subscribe('loadData', data => this.init(data));
    this.publisher.subscribe('filteredData', data => this.init(data));
  }

  init({ productsQuantity, curPage }) {
    this.model.collectionLength = productsQuantity;
    this.model.curPage = curPage;
    this.render();
  }

  render() {
    const pages = this.model.pageCount();
    this.view.render(this.model.curPage, pages);
  }

  handlerActions(e) {
    if (e.target.dataset.change_page) {
      this.model.curPage = e.target.dataset.id;

      this.publisher.publish('changePage', { curPage: this.model.curPage });
      this.render();
    }
  }

}