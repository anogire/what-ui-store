import { EventBus } from '../pub-sub.js';
import { ITEMS_PER_PAGE } from '../consts.js';
import ModelPagination from '../models/pagination.model.js';
import ViewPagination from '../views/pagination.view.js';

export default class ControllerPagination {
  constructor() {
    this.model = new ModelPagination(ITEMS_PER_PAGE);
    this.view = new ViewPagination();

    EventBus.subscribe('load', this.init.bind(this));
    EventBus.subscribe('changeData', this.init.bind(this));
    EventBus.subscribe('getCurPage', this.getCurPage.bind(this));
  }

  init(params) {
    this.model.changeCollectionLength(params.quantity);
    this.view.curPage = params.curPage;
    const pages = this.model.pageCount();
    this.view.init(pages);
  }

  getCurPage(params) {
    EventBus.publish('changeData', {
      ...params,
      curPage: this.view.curPage,
    });
  }
}