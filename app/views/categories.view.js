export default class ViewCategories {

  constructor() {
    this.selectorCategories = document.querySelector('#subCategories');
  }

  renderCategories(categories, filterByCategory) {
    this.selectorCategories.innerHTML = '';
    if (!categories) {
      console.log("No categories");
      return;
    }

    const list = document.createElement('ul');
    list.setAttribute('class', 'category-nav');

    for (const name of categories) {
      const itemList = document.createElement('li');
      itemList.setAttribute('class', 'mb-3');
      itemList.innerHTML = `
        <button type="button" value="${name}" class="category-nav__item"
          aria-label="go to ${name} category">
            ${name}
        </button>`;
      itemList.addEventListener('click', e => filterByCategory(e.target.value));

      list.append(itemList);
    }
    this.selectorCategories.append(list);
  }


  // renderCategories(categories, filterByCategory) {
  //   this.selectorCategories.innerHTML = '';
  //   if (!categories) {
  //     console.log("No data");
  //     return;
  //   }
  //   this.selectorCategories.innerHTML = `
  //     <button class="dropdown-toggle category-btn" type="button" data-toggle="dropdown" aria-haspopup="true"
  //       aria-expanded="false" aria-label="click to see our additional options">
  //         Choose
  //     </button>`;

  //   const list = document.createElement('ul');
  //   list.setAttribute('class', 'dropdown-menu category-nav');

  //   for (const name of categories) {
  //     const itemList = document.createElement('li');
  //     itemList.setAttribute('class', 'mb-3');
  //     itemList.innerHTML = `
  //       <button type="button" value="${name}" class="dropdown-item category-nav__item"
  //         aria-label="go to ${name} category">
  //           ${name}
  //       </button>`;
  //     itemList.addEventListener('click', e => filterByCategory(e.target.value));

  //     list.append(itemList);
  //   }
  //   this.selectorCategories.append(list);
  // }


}