export default class ViewProducts {

  constructor() {
    this.selectorProducts = document.querySelector('#productsList');
  }

  renderProducts(products, showDetails, addToCart) {
    this.selectorProducts.innerHTML = '';
    if (!products || !products.length) {
      this.notFound('no data yet');
      return;
    }

    const formatCurrency = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'UAH',
      minimumFractionDigits: 2,
    });

    products.map(product => {
      const item = document.createElement('div');
      item.setAttribute('class', 'card product-card');
      item.setAttribute('data-target', '#modalDetails');
      item.setAttribute('data-toggle', 'modal');
      item.innerHTML = `
        <img src="./img/product.jpg" class="card-img-top product-card__img" alt="..." loading="lazy">`;

      const addToCartBtn = document.createElement('button');
      addToCartBtn.setAttribute('class', 'main-btn');
      addToCartBtn.innerHTML = 'Buy';
      addToCartBtn.addEventListener('click', e => addToCart(e, product));

      const cardBody = document.createElement('div');
      cardBody.setAttribute('class', 'card-body');
      cardBody.innerHTML = `
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.category}</p>
        <p class="card-text">${formatCurrency.format(product.price)}</p>`;

      cardBody.append(addToCartBtn);

      item.addEventListener('click', () => showDetails(product));
      item.append(cardBody);

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