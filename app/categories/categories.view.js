export default class ViewCategories {

  constructor(handlerActions) {
    this.selectorCategories = document.querySelector('#subCategories');
    this.handlerActions = handlerActions;
  }

  render(categories) {
    if (!categories) {
      console.log("No categories");
      return;
    }
    const subCategories = categories.map(category => this.renderCategory(category)).join('');
    this.selectorCategories.innerHTML = `<ul class="category-nav">${subCategories}</ul>`;
    this.selectorCategories.addEventListener('click', this.handlerActions);
  }

  renderCategory(item) {
    return `
      <li class="mb-3">
        <button type="button" class="category-nav__item" data-category="${item}"
          aria-label="go to ${item} category">
          ${item}
        </button>
      </li>`;
  }
}