export default class ViewProducts {

  constructor() {
    this.selectorProducts = document.querySelector('#productsList');
  }

  renderProducts(products, showDetails) {
    this.selectorProducts.innerHTML = '';
    if (!products || !products.length) {
      this.notFound('no data yet');
      return;
    }

    products.map(product => {
      const item = document.createElement('div');
      item.setAttribute('class', 'card');

      item.setAttribute('data-target', '#modalDetails');
      item.setAttribute('data-toggle', 'modal');


      item.innerHTML = `
            <img class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.category}</p>
              <p class="card-text">${product.price}</p>
              <button class="main-btn">Buy</button>
            </div>`;

      item.addEventListener('click', () => showDetails(product));
      this.selectorProducts.append(item);
    })

  }

  notFound(msg) {
    this.selectorProducts.innerHTML = `
    <div class="mt-5 mb-5 text-center w-100">
      <h5 class="items-caption">Sorry, ${msg}</h5>
    </div>`;
  }
}