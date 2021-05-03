import { EventBus } from '../pub-sub.js';

export default class ViewCategories {

  constructor() {

    this.selectorCategories = document.querySelector('#subCategories');

    // document.querySelector('.btn-weather-search')
    //   .addEventListener('click', () => handleWeatherSearch(this.enterCity.value));
  }

  renderCategories(categories, filterByCategory) {
    this.selectorCategories.innerHTML = '';
    if (!categories) {
      console.log("No data");
      return;
    }
    const btnDropdown = document.createElement('button');
    btnDropdown.setAttribute('class', "dropdown-toggle category-btn");
    btnDropdown.setAttribute('type', "button");
    btnDropdown.setAttribute('data-toggle', "dropdown");
    btnDropdown.setAttribute('aria-haspopup', "true");
    btnDropdown.setAttribute('aria-expanded', "false");
    btnDropdown.setAttribute('aria-label', "click to see our additional options");
    btnDropdown.innerHTML = 'Choose';
    this.selectorCategories.append(btnDropdown);

    const list = document.createElement('ul');
    list.setAttribute('class', 'dropdown-menu category-nav');

    for (const name of categories) {
      const itemList = document.createElement('li');
      itemList.setAttribute('class', 'mb-3');

      // const btnItemList = document.createElement('button');
      // btnItemList.setAttribute('class', "dropdown-item category-nav__item");
      // btnItemList.setAttribute('type', "button");
      // btnItemList.setAttribute('value', name);
      // btnItemList.setAttribute('aria-label', `go to ${name} category`);
      // btnItemList.innerHTML = name;

      // itemList.append(btnItemList);
      // btnItemList.setAttribute('onclick', e => filterByCategory('asd'));

      itemList.innerHTML = `
        <button 
          type="button" 
          value="${name}" 
          class="dropdown-item category-nav__item"
          aria-label="go to ${name} category">
          ${name}
        </button>`;

      //itemList.addEventListener('click', e => this.filterByCategory('asd'));
      list.append(itemList);

    }
    this.selectorCategories.append(list);

    this.selectorCategories.innerHTML += '</ul>';

    this.selectorCategories.addEventListener('click', e => filterByCategory(e.target.value));
  }


}