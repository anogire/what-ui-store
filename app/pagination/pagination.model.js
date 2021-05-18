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
      this._curPage = value;
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
    this._curPage = 1;
  }
}