import { data } from '../data.js';
import { URL, COUNT_PRODUCT_FIELDS, NO_CATEGORY, ITEMS_PER_PAGE } from '../consts.js';

export default class ModelProducts {
  constructor() {
    this._loadData = [];
    this._filteredData = [];
    this._sortered = "";
    this._curPage = 1;
    this._curCategory = NO_CATEGORY;
  }

  async load() {
    this._loadData = this.parseData(data);
    return this.loadData;
    /*
    try {
      return await fetch(URL)
        .then(res => res.json())
        .then(data => {
          this._loadData = this.parseData(data);
          return this.loadData;
        });
    } catch (err) {
      console.log(err);
    }
    */
  }

  get loadData() {
    return this.copy(this._loadData);
  }

  get filteredData() {
    return this.copy(this._filteredData);
  }

  copy(data) {
    return JSON.parse(JSON.stringify(data));
  }

  set curPage(value) {
    if (value > 0) {
      this._curPage = +value;
    }
  }

  get curPage() {
    return this._curPage;
  }

  isFilteredExist() {
    return !!(this._filteredData && this._filteredData.length);
  }

  getById(id) {
    const product = this._loadData.find(item => item.ID == id);
    return this.copy(product);
  }

  getCategories() {
    const categories = new Set(this._loadData.map((item) => item.CATEGORY));
    const categoriesList = [...categories, NO_CATEGORY];
    return this.copy(categoriesList);
  }

  getProductsQuantity() {
    const quantity = this.isFilteredExist() ? this._filteredData.length : this._loadData.length;
    return quantity;
  }

  getDataForPage(numberPage = 1) {
    this.curPage = numberPage;
    const data = this.isFilteredExist() ? this._filteredData : this._loadData;

    const startInd = ITEMS_PER_PAGE * (this._curPage - 1);
    const products = data.slice(startInd, startInd + ITEMS_PER_PAGE);

    return this.copy(products);
  }

  filterByCategory(category = NO_CATEGORY) {
    this._curCategory = category;

    this._filteredData = (category == NO_CATEGORY) ?
      this.loadData :
      this.loadData.filter(product => product.CATEGORY.toLowerCase() == category.toLowerCase());

    return (this._sortered) ? this.sortByPrice(this._sortered) : this.filteredData;
  }

  sortByPrice(direction) {
    this._sortered = direction;

    const data = this.isFilteredExist() ? this.filteredData : this.loadData;

    switch (direction) {
      case "up":
        this._filteredData = data.sort((a, b) => a.PRICE - b.PRICE);
        break;
      case "down":
        this._filteredData = data.sort((a, b) => b.PRICE - a.PRICE);
        break;
      default:
        this.filterByCategory(this._curCategory);
    }
  }

  isSearchedProduct(value) {
    this._curCategory = NO_CATEGORY;
    this._sortered = "";

    this._filteredData = this.loadData.filter(item =>
      item.PRODUCT_NAME.toLowerCase().includes(value.toLowerCase()) ||
      item.MANUFACTURE.toLowerCase().includes(value.toLowerCase()));

    return this.isFilteredExist();
  }

  parseData(data) {
    const entry = data.feed.entry;
    const countProducts = entry.length;

    const products = [];
    for (let i = COUNT_PRODUCT_FIELDS; i < countProducts; i = i + COUNT_PRODUCT_FIELDS) {
      let entryProduct = entry.slice(i, i + COUNT_PRODUCT_FIELDS);
      let j = 0;
      const product = entryProduct.reduce((prev, cur) => {
        return {
          ...prev,
          [entry[j++].content.$t]: cur.content.$t
        }
      }, {});
      products.push(product);
    }

    return products;
  }
}