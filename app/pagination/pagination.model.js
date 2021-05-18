import { URL, COUNT_PRODUCT_FIELDS, NO_CATEGORY } from '../consts.js';

export default class ModelProducts {
  constructor() {
    this._loadData = [];
    this._filteredData = [];
    this._sortered = "";
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

  getById(id) {
    const product = this._loadData.find(item => item['ID'] == id);
    return this.copy(product);
  }

  getCategories() {
    const categories = new Set(this._loadData.map((item) => item['CATEGORY']));
    const categoriesList = [...categories, NO_CATEGORY];
    return this.copy(categoriesList);
  }

  filterByCategory(category) {
    this._filteredData = (category == NO_CATEGORY) ?
      this._loadData :
      this._loadData.filter(product => product['CATEGORY'].toLowerCase() == category.toLowerCase());
    return (this._sortered) ? this.sortByPrice(this._sortered) : this.copy(this._filteredData);
  }

  sortByPrice(direction) {
    const data = (!this._filteredData || !this._filteredData.length) ?
      this.copy(this._loadData) :
      this.copy(this._filteredData);
    switch (direction) {
      case "up":
        data.sort((a, b) => a['PRICE'] - b['PRICE']);
        this._sortered = "up";
        break;
      case "down":
        data.sort((a, b) => b['PRICE'] - a['PRICE']);
        this._sortered = "down";
        break;
      default:
        this._sortered = "";
    }
    return data;
  }

  searchProduct(value) {
    const finded = this._loadData.filter(item =>
      item['PRODUCT_NAME'].toLowerCase().includes(value.toLowerCase()) ||
      item['MANUFACTURE'].toLowerCase().includes(value.toLowerCase()));
    this._filteredData = finded;
    return (this._sortered) ? this.sortByPrice(this._sortered) : this.copy(this._filteredData);
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
      }, {})
      products.push(product);
    }
    return products;
  }
}