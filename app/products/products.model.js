import { URL, COUNT_PRODUCT_FIELDS, NO_CATEGORY, ITEMS_PER_PAGE } from '../consts.js';

export default class ModelProducts {
  constructor() {
    this._loadData = [];
    this._filteredData = [];
    this._sortered = "";
    this._curPage = 1;
  }

  async load() {
    try {
      const data = await fetch(URL)
        .then(res => res.json());
      this._loadData = this.parseData(data);
      return this.data;
    } catch (err) {
      console.log(err);
    }
  }

  get data() {
    this._filteredData = [];
    return this.copy(this._loadData);
  }

  copy(data) {
    return JSON.parse(JSON.stringify(data));
  }

  set curPage(value) {
    if (value > 0) {
      this._curPage = value;
    }
  }

  get curPage() {
    return this._curPage;
  }

  getById(id) {
    const product = this._loadData.find(item => item['ID'] == id);
    return this.copy(product);
  }

  getCategories() {
    const categories = new Set(this._loadData.map((item) => item['CATEGORY']));
    const categoriesList = [...categories, NO_CATEGORY];
    return this.copy(categoriesList);
  }

  getProductsQuantity() {
    const quantity = (!this._filteredData || !this._filteredData.length) ?
      this._loadData.length :
      this._filteredData.length;
    return quantity;
  }

  getDataForPage(numberPage = 1) {
    this._curPage = numberPage;
    const data = (!this._filteredData || !this._filteredData.length) ? this._loadData : this._filteredData;

    const startInd = ITEMS_PER_PAGE * (this._curPage - 1);
    const products = data.slice(startInd, startInd + ITEMS_PER_PAGE);

    return this.copy(products);
  }

  filterByCategory(category) {
    this._filteredData = (category == NO_CATEGORY) ?
      this.copy(this._loadData) :
      this.copy(this._loadData.filter(product => product['CATEGORY'].toLowerCase() == category.toLowerCase()));

    if (this._sortered) {
      this.sortByPrice(this._sortered);
    }
  }

  sortByPrice(direction) {
    const data = (!this._filteredData || !this._filteredData.length) ? this.copy(this._loadData) : this.copy(this._filteredData);
    switch (direction) {
      case "up":
        this._filteredData = data.sort((a, b) => a['PRICE'] - b['PRICE']);
        this._sortered = "up";
        break;
      case "down":
        this._filteredData = data.sort((a, b) => b['PRICE'] - a['PRICE']);
        this._sortered = "down";
        break;
      default:
        this._sortered = "";
        const curCategory = data[0]['CATEGORY'];
        const category = data.some(item => item['CATEGORY'] !== curCategory) ? NO_CATEGORY : curCategory;
        this.filterByCategory(category);
    }
  }

  searchProduct(value) {
    const finded = this._loadData.filter(item =>
      item['PRODUCT_NAME'].toLowerCase().includes(value.toLowerCase()) ||
      item['MANUFACTURE'].toLowerCase().includes(value.toLowerCase()));
    this._filteredData = this.copy(finded);

    this.sortByPrice(this._sortered);

    return (!finded || !finded.length) ? false : true;
  }

  parseData(data) {
    const entry = data['feed']['entry'];
    const countProducts = entry.length;

    const products = [];
    for (let i = COUNT_PRODUCT_FIELDS; i < countProducts; i = i + COUNT_PRODUCT_FIELDS) {
      let entryProduct = entry.slice(i, i + COUNT_PRODUCT_FIELDS);
      let j = 0;
      const product = entryProduct.reduce((prev, cur) => {
        return {
          ...prev,
          [entry[j++]['content']['$t']]: cur['content']['$t']
        }
      }, {});
      products.push(product);
    }

    return products;
  }
}