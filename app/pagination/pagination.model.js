import { ITEMS_PER_PAGE } from '../consts.js';

export default class ModelPagination {
  constructor() {
    this._collectionLength = 0;
    this._curPage = 1;
  }

  set collectionLength(value) {
    if (value > 0) {
      this._collectionLength = value;
    }
  }

  get collectionLength() {
    return this._collectionLength;
  }

  set curPage(value) {
    if (value > 0) {
      this._curPage = +value;
    }
  }

  get curPage() {
    return this._curPage;
  }

  pageCount() {
    return Math.ceil(this._collectionLength / ITEMS_PER_PAGE);
  }

  clear() {
    this._collectionLength = 0;
    this.curPage = 1;
  }

  getRange() {
    const quantityPages = this.pageCount();
    let minimum, maximum;

    if (quantityPages == 1) {
      return [minimum = 1, maximum = 1];
    }

    if (this.curPage - 2 < 1) {
      minimum = 1;
    } else if (this.curPage + 2 > quantityPages) {
      minimum = Math.max(1, quantityPages - 4);
    } else {
      minimum = this.curPage - 2;
    }

    maximum = (minimum + 4 > quantityPages) ? quantityPages : minimum + 4;

    return [minimum, maximum];
  }
}