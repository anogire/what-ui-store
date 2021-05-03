import { EventBus } from '../pub-sub.js';

export default class View {

  constructor() {

    this.selectorProducts = document.querySelector('#productsList');

    // document.querySelector('.btn-weather-search')
    //   .addEventListener('click', () => handleWeatherSearch(this.enterCity.value));
  }

  renderProducts({ products }) {
    this.selectorProducts.innerHTML = '';
    if (!products) {
      console.log("No data");
      return;
    }
    products.map(product => {
      const item = document.createElement('div');
      item.setAttribute('class', 'card');
      item.innerHTML = `
            <img class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.category}</p>
              <p class="card-text">${product.price}</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>`;
      //prev.addEventListener('click', e => this.changePage(this.curPage - 1));

      this.selectorProducts.append(item);
    })

  }

}